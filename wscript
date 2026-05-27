from sh import jshint
import json
import os
import re

top = '.'
out = 'build'

def options(ctx):
    ctx.load('pebble_sdk')

def configure(ctx):
    ctx.load('pebble_sdk')
    jshint.bake(['--config', 'pebble-jshintrc'])

def parse_languages(header_path):
    """Parse Language enum from num2words.h.

    Each entry must have a comment in the form:
        ENUM_NAME = VALUE,  /* js_key | Display Name */

    Returns a list of (js_key, display_label, int_value) tuples in enum order.
    """
    with open(header_path, 'r') as f:
        content = f.read()
    pattern = re.compile(
        r'\b\w+\s*=\s*(0x[0-9a-fA-F]+|\d+)[,\s]*/\*\s*([a-zA-Z_]+)\s*\|\s*([^*]+?)\s*\*/'
    )
    return [
        (m.group(2).strip(), m.group(3).strip(), int(m.group(1), 0))
        for m in pattern.finditer(content)
    ]

def build(ctx):
    ctx.load('pebble_sdk')

    root      = ctx.path.abspath()
    pkjs_dir  = os.path.join(root, 'src', 'pkjs')
    header    = os.path.join(root, 'src', 'c', 'num2words.h')

    languages = parse_languages(header)

    # --- Patch config.html: replace content between <!-- LANGUAGES --> markers ---
    html_options = '\n'.join(
        '        <option value="{}">{}</option>'.format(code, label)
        for code, label, _ in languages
    )
    with open(os.path.join(pkjs_dir, 'config.html'), 'r') as f:
        html = f.read()
    html = re.sub(
        r'<!-- LANGUAGES -->.*?<!-- /LANGUAGES -->',
        '<!-- LANGUAGES -->\n{}\n        <!-- /LANGUAGES -->'.format(html_options),
        html,
        flags=re.DOTALL
    )

    # --- Generate config-html.js from the patched HTML ---
    with open(os.path.join(pkjs_dir, 'config-html.js'), 'w') as f:
        f.write('var configHTML = ' + json.dumps(html) + ';\n')

    # --- Generate langs-gen.js from the parsed enum ---
    js_entries = ',\n'.join(
        '  {:6s} {}'.format(code + ':', value)
        for code, _, value in languages
    )
    with open(os.path.join(pkjs_dir, 'langs-gen.js'), 'w') as f:
        f.write('var langs = {{\n{}\n}};\n'.format(js_entries))

    jshint(['--config', 'pebble-jshintrc', 'src/pkjs/pebble-js-app.js'])

    ctx.pbl_program(source=ctx.path.ant_glob('src/**/*.c'),
                    target='pebble-app.elf')

    ctx.pbl_bundle(elf='pebble-app.elf',
                   js=[ctx.path.find_resource('src/pkjs/config-html.js'),
                       ctx.path.find_resource('src/pkjs/langs-gen.js'),
                       ctx.path.find_resource('src/pkjs/pebble-js-app.js')])

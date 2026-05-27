from sh import jshint
import json
import os

top = '.'
out = 'build'

def options(ctx):
    ctx.load('pebble_sdk')

def configure(ctx):
    ctx.load('pebble_sdk')
    jshint.bake(['--config', 'pebble-jshintrc'])

def build(ctx):
    ctx.load('pebble_sdk')

    # Generate config-html.js from config.html so the HTML stays in its own file.
    pkjs_dir = os.path.join(ctx.path.abspath(), 'src', 'pkjs')
    with open(os.path.join(pkjs_dir, 'config.html'), 'r') as f:
        html_content = f.read()
    with open(os.path.join(pkjs_dir, 'config-html.js'), 'w') as f:
        f.write('var configHTML = ' + json.dumps(html_content) + ';\n')

    jshint(['--config', 'pebble-jshintrc', 'src/pkjs/pebble-js-app.js'])

    ctx.pbl_program(source=ctx.path.ant_glob('src/**/*.c'),
                    target='pebble-app.elf')

    ctx.pbl_bundle(elf='pebble-app.elf',
                   js=[ctx.path.find_resource('src/pkjs/config-html.js'),
                       ctx.path.find_resource('src/pkjs/pebble-js-app.js')])

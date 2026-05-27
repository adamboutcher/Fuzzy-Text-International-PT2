var VERSION = "1.3";

var isReady = false;
var callbacks = [];

var alignments = {
  center: 0,
  left:   1,
  right:  2
};

var langs = {
  ca:    0,
  de:    1,
  en_GB: 2,
  en_US: 3,
  es:    4,
  fr:    5,
  no:    6,
  sv:    7
};

var fontSizes = {
  small:  0,
  medium: 1,
  large:  2
};

// Config page is self-hosted as a data URI so no external server is needed.
var configHTML = [
  '<!DOCTYPE html><html lang="en"><head>',
  '<meta charset="utf-8">',
  '<title>Configure Fuzzy Text</title>',
  '<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">',
  '<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">',
  '</head><body><div class="container">',
  '<header><h1>Configure Fuzzy Text Int\'l</h1></header>',
  '<form id="config" role="form" class="input-lg">',

  '<fieldset><legend>Colors:</legend>',
  '<div class="checkbox"><label>',
  '<input type="checkbox" name="invert" value="on"> invert colors',
  '</label></div></fieldset>',

  '<fieldset><legend>Shake to show date:</legend>',
  '<div class="checkbox"><label>',
  '<input type="checkbox" name="show_date" value="on" checked> enable shake to show date',
  '</label></div></fieldset>',

  '<fieldset><legend>Text align:</legend>',
  '<div class="radio-inline"><label><input type="radio" name="align" value="left"> left</label></div>',
  '<div class="radio-inline"><label><input type="radio" name="align" value="center" checked> center</label></div>',
  '<div class="radio-inline"><label><input type="radio" name="align" value="right"> right</label></div>',
  '</fieldset>',

  '<fieldset><legend>Font size:</legend>',
  '<div class="radio-inline"><label><input type="radio" name="font_size" value="small"> small</label></div>',
  '<div class="radio-inline"><label><input type="radio" name="font_size" value="medium"> medium</label></div>',
  '<div class="radio-inline"><label><input type="radio" name="font_size" value="large" checked> large</label></div>',
  '</fieldset>',

  '<fieldset><legend>Language:</legend>',
  '<div class="radio"><label><input type="radio" name="lang" value="ca"> Català</label></div>',
  '<div class="radio"><label><input type="radio" name="lang" value="de"> Deutsch</label></div>',
  '<div class="radio"><label><input type="radio" name="lang" value="en_GB"> English (Great Britain)</label></div>',
  '<div class="radio"><label><input type="radio" name="lang" value="en_US" checked> English (United States)</label></div>',
  '<div class="radio"><label><input type="radio" name="lang" value="es"> Español</label></div>',
  '<div class="radio"><label><input type="radio" name="lang" value="fr"> Français</label></div>',
  '<div class="radio"><label><input type="radio" name="lang" value="no"> Norsk</label></div>',
  '<div class="radio"><label><input type="radio" name="lang" value="sv"> Svenska</label></div>',
  '</fieldset>',

  '<fieldset>',
  '<a href="pebblejs://close" class="btn btn-lg btn-default">Cancel</a>',
  '<button type="button" class="btn btn-lg btn-primary" id="b-submit">Save</button>',
  '</fieldset>',
  '</form></div>',

  '<script src="https://code.jquery.com/jquery-1.11.0.min.js"><\/script>',
  '<script>',
  'function getParam(k){var val;window.location.hash.replace(/(?:^|[#&])([a-z_]+)=([^&]+)/ig,function(_,key,v){if(k===key)val=decodeURIComponent(v);});return val;}',
  'function saveOptions(){var p={};$("#config").serializeArray().forEach(function(x){p[x.name]=x.value;});',
  'return{invert:p.invert==="on",show_date:p.show_date==="on",text_align:p.align||"center",font_size:p.font_size||"large",lang:p.lang};}',
  'function applyOptions(){var o=JSON.parse(getParam("options")||"{}");',
  'if(o.invert)$("[name=invert]").prop("checked",true);',
  'if(o.show_date===false)$("[name=show_date]").prop("checked",false);',
  'if(o.text_align)$("[name=align]").filter(function(i,b){return b.value===o.text_align;}).prop("checked",true);',
  'if(o.font_size)$("[name=font_size]").filter(function(i,b){return b.value===o.font_size;}).prop("checked",true);',
  'if(o.lang)$("[name=lang]").filter(function(i,b){return b.value===o.lang;}).prop("checked",true);}',
  '$("#b-submit").click(function(){document.location="pebblejs://close#"+encodeURIComponent(JSON.stringify(saveOptions()));});',
  'applyOptions();',
  '<\/script>',
  '</body></html>'
].join('');

function readyCallback(event) {
  isReady = true;
  var callback;
  while (callbacks.length > 0) {
    callback = callbacks.shift();
    callback(event);
  }
}

function showConfiguration(event) {
  onReady(function() {
    var opts = getOptions();
    var url = 'data:text/html,' + encodeURIComponent(configHTML) +
              '#v=' + encodeURIComponent(VERSION) +
              '&options=' + encodeURIComponent(opts);
    Pebble.openURL(url);
  });
}

function webviewclosed(event) {
  var resp = event.response;
  console.log('configuration response: ' + resp + ' (' + typeof resp + ')');

  var options = JSON.parse(resp);
  if (typeof options.invert     === 'undefined' &&
      typeof options.show_date  === 'undefined' &&
      typeof options.text_align === 'undefined' &&
      typeof options.font_size  === 'undefined' &&
      typeof options.lang       === 'undefined') {
    return;
  }

  onReady(function() {
    setOptions(resp);
    transmitConfiguration(prepareConfiguration(resp));
  });
}

function getOptions() {
  return localStorage.getItem('options') || '{}';
}

function setOptions(options) {
  localStorage.setItem('options', options);
}

function prepareConfiguration(serialized_settings) {
  var settings = JSON.parse(serialized_settings);
  return {
    '0': settings.invert ? 1 : 0,
    '1': alignments[settings.text_align] || 0,
    '2': langs[settings.lang] !== undefined ? langs[settings.lang] : langs.en_US,
    '3': fontSizes[settings.font_size] !== undefined ? fontSizes[settings.font_size] : fontSizes.large,
    '4': settings.show_date === false ? 0 : 1
  };
}

function transmitConfiguration(settings) {
  console.log('sending message: ' + JSON.stringify(settings));
  Pebble.sendAppMessage(settings, function() {}, logError);
}

function logError(event) {
  console.log('Unable to deliver message with transactionId=' +
    event.data.transactionId + '; Error is ' + event.error.message);
}

function onReady(callback) {
  if (isReady) {
    callback();
  } else {
    callbacks.push(callback);
  }
}

Pebble.addEventListener('ready', readyCallback);
Pebble.addEventListener('showConfiguration', showConfiguration);
Pebble.addEventListener('webviewclosed', webviewclosed);

onReady(function() {
  transmitConfiguration(prepareConfiguration(getOptions()));
});

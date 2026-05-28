var VERSION = "1.3";

var isReady = false;
var callbacks = [];

var alignments = {
  center: 0,
  left:   1,
  right:  2
};

// langs values must match the Language enum in src/c/num2words.h
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


// configHTML is defined in config-html.js — edit that file to change the settings UI.

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
    '0': (settings.invert === true || settings.invert === 'yes') ? 1 : 0,
    '1': alignments[settings.text_align] || 0,
    '2': langs[settings.lang] !== undefined ? langs[settings.lang] : langs.en_US,
    '3': fontSizes[settings.font_size] !== undefined ? fontSizes[settings.font_size] : fontSizes.large,
    '4': (settings.show_date === false || settings.show_date === 'no') ? 0 : 1
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

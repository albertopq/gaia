'use strict';
/* exported MockSettingsHelper */

var prefs = {};

var MockSettingsHelper = function(id) {
  return {
    get: function(callback) {
      callback(prefs[id]);
    },
    set: function(value) {
      prefs[id] = value;
    }
  };
};

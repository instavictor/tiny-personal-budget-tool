var app = require('js/controllers/Poo');

if (__DEV__) {
  console.warn('Dev enabled: extra logging');
}

module.exports = window.app = app;
// exports.app = test;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  request: true
};
Object.defineProperty(exports, "request", {
  enumerable: true,
  get: function get() {
    return _request.default;
  }
});
exports.plugin = void 0;

var _request = _interopRequireDefault(require('request.js'));

var _helpers = require('helpers.js');

Object.keys(_helpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helpers[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugin = {
  install: function install(wepy) {
    wepy.$reqest = _request.default;
  }
};
exports.plugin = plugin;
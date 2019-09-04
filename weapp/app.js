"use strict";

var _core = _interopRequireDefault(require('vendor.js')(0));

var _usePromisify = _interopRequireDefault(require('vendor.js')(1));

var _x = _interopRequireDefault(require('vendor.js')(7));

var _services = require('services/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_core.default.use(_usePromisify.default);

_core.default.use(_x.default);

_core.default.use(_services.plugin);

_core.default.app({
  hooks: {},
  onLaunch: function onLaunch() {},
  methods: {}
}, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {} }, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {} }, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {} }, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {} }, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {} }, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {} }, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {} }, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {} });
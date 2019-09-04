"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regeneratorRuntime2 = _interopRequireDefault(require('../vendor.js')(13));

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _toast = _interopRequireDefault(require('../vendor.js')(5));

var _login = _interopRequireWildcard(require('login.js'));

var _helpers = require('helpers.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var defaultDataTransformer = function defaultDataTransformer(data) {
  return data;
};

var _default =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime2.default.mark(function _callee() {
  var config,
      _config,
      _config$transformData,
      transformData,
      _config$__needValidat,
      __needValidation,
      _config$__needAuth,
      __needAuth,
      _config$__showError,
      __showError,
      _config$__showIndicat,
      __showIndicator,
      _config$__showLoading,
      __showLoading,
      requestConfig,
      token,
      loadingConfig,
      data,
      requestTask,
      response,
      errorConfig,
      _args = arguments;

  return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          config = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

          if (typeof config === 'string') {
            config = {
              url: config
            };
          }

          _config = config, _config$transformData = _config.transformData, transformData = _config$transformData === void 0 ? true : _config$transformData, _config$__needValidat = _config.__needValidation, __needValidation = _config$__needValidat === void 0 ? true : _config$__needValidat, _config$__needAuth = _config.__needAuth, __needAuth = _config$__needAuth === void 0 ? true : _config$__needAuth, _config$__showError = _config.__showError, __showError = _config$__showError === void 0 ? true : _config$__showError, _config$__showIndicat = _config.__showIndicator, __showIndicator = _config$__showIndicat === void 0 ? true : _config$__showIndicat, _config$__showLoading = _config.__showLoading, __showLoading = _config$__showLoading === void 0 ? false : _config$__showLoading, requestConfig = _objectWithoutProperties(_config, ["transformData", "__needValidation", "__needAuth", "__showError", "__showIndicator", "__showLoading"]);

          if (!__needAuth) {
            _context.next = 19;
            break;
          }

          _context.prev = 4;
          _context.next = 7;
          return _core.default.wx.checkSession();

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](4);
          _context.next = 13;
          return (0, _login.default)();

        case 13:
          token = _core.default.wx.getStorageSync(_login.LOGIN_AUTH_KEY);

          if (token) {
            _context.next = 17;
            break;
          }

          _context.next = 17;
          return (0, _login.default)();

        case 17:
          requestConfig.data = requestConfig.data || {};
          requestConfig.data.token = token;

        case 19:
          if (__showIndicator) {
            _core.default.wx.showNavigationBarLoading();
          }

          if (__showLoading) {
            loadingConfig = {
              duration: 0
            };

            if (_typeof(__showLoading) === 'object') {
              loadingConfig = _objectSpread({}, __showLoading, {}, loadingConfig);
            } else if (typeof __showLoading === 'string') {
              loadingConfig.message = __showLoading;
            } else {
              loadingConfig.text = '加载中...';
            }

            _toast.default.loading(loadingConfig);
          }

          _context.prev = 21;
          requestTask = _core.default.wx.request(requestConfig);
          _context.next = 25;
          return requestTask;

        case 25:
          response = _context.sent;

          if (__needValidation) {
            data = (0, _helpers.validateResponse)(response, requestConfig);
          } else {
            data = response.data;
          }

          if (typeof transformData === 'function') {
            data = transformData(response.data);
          } else if (transformData === true) {
            data = defaultDataTransformer(response.data);
          }

          return _context.abrupt("return", data);

        case 31:
          _context.prev = 31;
          _context.t1 = _context["catch"](21);
          console.error(_context.t1);

          if (!__showError) {
            _context.next = 40;
            break;
          }

          errorConfig = {
            duration: 2000,
            mask: true
          };

          if (_typeof(__showError) === 'object') {
            errorConfig = _objectSpread({}, __showError, {}, errorConfig);
          } else if (typeof __showError === 'string') {
            errorConfig.text = __showError;
          } else {
            errorConfig.text = _context.t1.message;
          }

          _toast.default.fail(errorConfig);

          _context.next = 41;
          break;

        case 40:
          throw _context.t1;

        case 41:
          _context.prev = 41;

          if (__showIndicator) {
            _core.default.wx.hideNavigationBarLoading();
          }

          if (__showLoading) {
            _toast.default.clear();
          }

          return _context.finish(41);

        case 45:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[4, 9], [21, 31, 41, 45]]);
}));

exports.default = _default;
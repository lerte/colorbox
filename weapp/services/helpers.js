"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateStatus = exports.validateResponse = exports.log = void 0;

var _isPlainObject = _interopRequireDefault(require('../vendor.js')(18));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var log = function log(message) {
  if ("development" === 'development') {
    console.log(message);
  }
};

exports.log = log;

var validateResponse = function validateResponse(response) {
  if (!(0, _isPlainObject.default)(response)) {
    return response;
  }

  var _response$code = response.code,
      code = _response$code === void 0 ? 200 : _response$code,
      _response$message = response.message,
      message = _response$message === void 0 ? '未知错误' : _response$message,
      rest = _objectWithoutProperties(response, ["code", "message"]);

  switch ("".concat(code)) {
    case '200':
      return rest;

    default:
      {
        throw new Error(message);
      }
  }
};

exports.validateResponse = validateResponse;

var validateStatus = function validateStatus(_ref) {
  var statusCode = _ref.statusCode;
  return "\u670D\u52A1\u5F02\u5E38: ".concat(statusCode);
};

exports.validateStatus = validateStatus;
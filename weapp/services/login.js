"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getUserInfo = exports.wxLogin = exports.LOGIN_AUTH_KEY = exports.WX_LOGIN_CODE = void 0;

var _regeneratorRuntime2 = _interopRequireDefault(require('../vendor.js')(13));

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _toast = _interopRequireDefault(require('../vendor.js')(5));

var _dialog = _interopRequireDefault(require('../vendor.js')(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var WX_LOGIN_CODE = 'WX_LOGIN_CODE';
exports.WX_LOGIN_CODE = WX_LOGIN_CODE;
var LOGIN_AUTH_KEY = 'LOGIN_AUTH_KEY';
exports.LOGIN_AUTH_KEY = LOGIN_AUTH_KEY;
var isDev = "development" === 'development';

var onLoginFailure =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime2.default.mark(function _callee(error, context) {
    return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _toast.default.fail({
              context: context,
              message: '登录失败！',
              mask: true,
              forbidClick: true
            });

            if (isDev) {
              console.error(error);
            }

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function onLoginFailure(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var promptForUserInfo =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime2.default.mark(function _callee2(context) {
    var setting, response;
    return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _dialog.default.alert({
              context: context,
              title: '提示',
              message: '不登录无法正常使用~\n\n请允许获取您的用户信息...',
              confirmButtonText: '去允许'
            });

          case 2:
            _context2.prev = 2;
            _context2.next = 5;
            return _core.default.wx.openSetting();

          case 5:
            setting = _context2.sent;

            if (!setting.authSetting['scope.userInfo']) {
              _context2.next = 13;
              break;
            }

            _context2.next = 9;
            return _core.default.ex.getUserInfo();

          case 9:
            response = _context2.sent;
            return _context2.abrupt("return", response.userInfo);

          case 13:
            return _context2.abrupt("return", null);

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", null);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 16]]);
  }));

  return function promptForUserInfo(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var wxLogin =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime2.default.mark(function _callee3(context) {
    var code, response;
    return _regeneratorRuntime2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _core.default.wx.removeStorageSync(WX_LOGIN_CODE);

            code = ''; // get login code

            _context3.prev = 2;
            _context3.next = 5;
            return _core.default.wx.login();

          case 5:
            response = _context3.sent;
            code = response.code;

            _core.default.wx.setStorageSync(LOGIN_AUTH_KEY, code);

            return _context3.abrupt("return", code);

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](2);
            onLoginFailure(_context3.t0, context);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 11]]);
  }));

  return function wxLogin(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.wxLogin = wxLogin;

var getUserInfo =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime2.default.mark(function _callee4(context) {
    var userInfo, response;
    return _regeneratorRuntime2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userInfo = null; // get userInfo

            _context4.prev = 1;
            _context4.next = 4;
            return _core.default.wx.getUserInfo();

          case 4:
            response = _context4.sent;
            userInfo = response.userInfo;
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            userInfo = promptForUserInfo(context);

          case 11:
            if (!userInfo) {
              onLoginFailure(new Error('用户未授权'), context);
            }

            return _context4.abrupt("return", userInfo);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function getUserInfo(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getUserInfo = getUserInfo;

var _default =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime2.default.mark(function _callee5(context) {
    var code, userInfo;
    return _regeneratorRuntime2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _core.default.wx.removeStorageSync(LOGIN_AUTH_KEY);

            _context5.next = 3;
            return wxLogin(context);

          case 3:
            code = _context5.sent;
            _context5.next = 6;
            return getUserInfo(context);

          case 6:
            userInfo = _context5.sent;
            userInfo.code = code; // TODO: remote login

            _core.default.wx.setStorageSync(LOGIN_AUTH_KEY, 'get token from remote');

            return _context5.abrupt("return", userInfo);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x6) {
    return _ref5.apply(this, arguments);
  };
}();

exports.default = _default;
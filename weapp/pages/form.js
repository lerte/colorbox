"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

_core.default.page({
  data: {
    show: false,
    name: null,
    mobile: null,
    age: '3岁',
    sex: '男',
    address: '',
    columns: [{
      values: _toConsumableArray(Array(21).keys()).map(function (item) {
        return item + '岁';
      }),
      className: 'column1'
    }, {
      values: _toConsumableArray(Array(12).keys()).map(function (item) {
        return item + '个月';
      }),
      className: 'column2'
    }]
  },
  computed: {
    disabled: function disabled() {
      return this.name && /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.mobile);
    }
  },
  created: function created() {
    wx.cloud.init();
  },
  methods: {
    handleClick: function handleClick() {
      var db = wx.cloud.database({
        env: 'colorbox-5ivf1'
      });
      db.collection('children').add({
        data: {
          name: this.name,
          mobile: this.mobile,
          age: this.age,
          sex: this.sex,
          address: this.address
        },
        success: function success(res) {
          wx.showToast({
            title: '提交成功'
          });
        },
        fail: function fail(err) {
          wx.showToast({
            icon: 'none',
            title: '提交失败'
          });
          console.error('[数据库] [新增记录] 失败：', err);
        }
      });
    },
    selectAge: function selectAge(event) {
      this.age = event.$wx.detail.value.join('');
    },
    showSelectAge: function showSelectAge(event) {
      this.show = true;
    },
    onChange: function onChange(event) {
      this.sex = event.$wx.detail;
    }
  }
}, {info: {"components":{"van-row":{"path":"..\\$vendor\\vant-weapp\\dist\\row\\index"},"van-col":{"path":"..\\$vendor\\vant-weapp\\dist\\col\\index"},"van-field":{"path":"..\\$vendor\\vant-weapp\\dist\\field\\index"},"van-radio":{"path":"..\\$vendor\\vant-weapp\\dist\\radio\\index"},"van-radio-group":{"path":"..\\$vendor\\vant-weapp\\dist\\radio-group\\index"},"van-icon":{"path":"..\\$vendor\\vant-weapp\\dist\\icon\\index"},"van-button":{"path":"..\\$vendor\\vant-weapp\\dist\\button\\index"},"van-picker":{"path":"..\\$vendor\\vant-weapp\\dist\\picker\\index"},"van-popup":{"path":"..\\$vendor\\vant-weapp\\dist\\popup\\index"}},"on":{"24-266":["tap"],"24-267":["change"],"24-268":["tap"],"24-269":["cancel","confirm","change"]}}, handlers: {'24-266': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.showSelectAge($event)
      })();
    
  }},'24-267': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onChange($event)
      })();
    
  }},'24-268': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleClick($event)
      })();
    
  }},'24-269': {"cancel": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.show = false
      })();
    
  }, "confirm": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.show = false
      })();
    
  }, "change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.selectAge($event)
      })();
    
  }}}, models: {'9': {
      type: "input",
      expr: "name",
      handler: function set ($v) {
      var _vm=this;
        _vm.name = $v;
      
    }
    },'10': {
      type: "input",
      expr: "mobile",
      handler: function set ($v) {
      var _vm=this;
        _vm.mobile = $v;
      
    }
    },'11': {
      type: "input",
      expr: "address",
      handler: function set ($v) {
      var _vm=this;
        _vm.address = $v;
      
    }
    }} });
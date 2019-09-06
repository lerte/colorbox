"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_core.default.page({
  data: {
    latitude: 22.503866519308442,
    longitude: 113.9168517730026,
    markers: [{
      id: 1,
      latitude: 22.503866519308442,
      longitude: 113.9168517730026,
      name: '彩色盒子美术馆'
    }]
  },
  created: function created() {
    wx.getLocation({
      type: 'gcj02',
      //返回可以用于wx.openLocation的经纬度
      success: function success(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.openLocation({
          latitude: 22.503866519308442,
          longitude: 113.9168517730026,
          name: "彩色盒子美术馆",
          scale: 20
        });
      }
    });
  }
}, {info: {"components":{},"on":{}}, handlers: {}, models: {} }, {info: {"components":{},"on":{}}, handlers: {}, models: {} });
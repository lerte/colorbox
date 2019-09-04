<template>
  <div
    class="tw-flex tw-flex-col tw-items-center tw-h-screen tw-bg-cover"
    style="background-image: url(/static/images/bg.jpg);"
  >
    <div
      class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-mt-16 tw-w-40 tw-h-40 tw-rounded-full tw-bg-white"
    >
      <img class="tw-w-24 tw-h-24" src="/static/images/logo.png" />
    </div>

    <div class="tw-self-stretch tw-mt-auto tw-mb-12 tw-px-16">
      <div class="tw-pb-2">
        <van-button
          class="tw-w-full"
          color="#3182CE"
          type="info"
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
          size="small"
          :hairline="true"
          :round="true"
          :block="true"
        >
          微信授权登录
        </van-button>
      </div>
      <van-button
        class="tw-w-full"
        color="#3182CE"
        type="info"
        size="small"
        :hairline="true"
        :plain="true"
        :round="true"
        :block="true"
        @tap="handleLogin"
      >
        手机账号登录
      </van-button>
    </div>
  </div>
</template>

<config>
{
  navigationBarTitleText: '小程序',
  usingComponents: {
    'van-button': 'module:vant-weapp/lib/button',
    'logo': '~@/components/logo'
  }
}
</config>

<script>
import wepy from '@wepy/core';

import { wxLogin } from '@/services/login';

wepy.page({
  computed: {},

  methods: {
    getPhoneNumber(event) {
      console.log(event);
      wepy.wx.navigateTo({
        url: 'user-home',
      });
    },

    handleLogin() {
      wepy.wx.navigateTo({
        url: 'login',
      });
    },
  },

  created() {
    wxLogin();
  },

  onShareAppMessage() {
    return {
      path: 'welcome',
    };
  },
});
</script>

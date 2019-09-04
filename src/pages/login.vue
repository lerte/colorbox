<template>
  <div
    class="login tw-flex tw-flex-col tw-items-center tw-h-screen tw-bg-cover"
    style="background-image: url(/static/images/bg.jpg);"
  >
    <div
      class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-mt-16 tw-w-40 tw-h-40 tw-rounded-full tw-bg-white"
    >
      <img class="tw-w-24 tw-h-24" src="/static/images/logo.png" />
    </div>

    <form class="tw-self-stretch tw-px-12 tw-mt-16">
      <div class="login__input-wrapper tw-flex tw-items-center tw-py-2">
        <input
          class="tw-appearance-none tw-bg-transparent tw-border-none tw-w-full tw-text-white tw-mr-3 tw-py-1 tw-px-2 tw-leading-normal"
          v-model="mobile"
          placeholder-class="tw-text-white"
          type="text"
          placeholder="手机号码"
          aria-label="手机号码"
          @input="clearError"
        />
      </div>

      <div class="login__input-wrapper tw-flex tw-items-center tw-py-2 tw-mt-2">
        <input
          class="tw-appearance-none tw-bg-transparent tw-border-none tw-w-full tw-text-white tw-mr-3 tw-py-1 tw-px-2 tw-leading-normal"
          v-model="captcha"
          placeholder-class="tw-text-white"
          type="text"
          placeholder="验证码"
          aria-label="验证码"
          @input="clearError"
        />
        <span
          :class="{ 'login__captcha-sender': canSendMessage }"
          class="tw-flex-shrink-0 tw-text-white tw-py-1 tw-mr-2 tw-text-xs tw-border-white tw-border-t-0 tw-border-l-0 tw-border-r-0"
          @tap="getCaptcha"
        >
          {{ captchaText }}
        </span>
      </div>

      <div class="tw-mt-4 tw-text-xs tw-text-red-500" style="height: 2rem; line-height: 2rem;">
        {{ error ? error : '' }}
      </div>

      <button
        class="tw-mt-12 tw-border tw-border-solid tw-border-blue-600 tw-text-blue-600 tw-text-base tw-bg-transparent"
        @tap="handleLogin"
      >
        提交
      </button>
    </form>
  </div>
</template>

<script>
import wepy from '@wepy/core';
import trim from 'lodash/trim';

wepy.page({
  data: {
    mobile: '13323332333',
    captcha: '',
    error: '',

    captchaText: '获取验证码',
    canSendMessage: true,
  },

  computed: {},

  methods: {
    clearError() {
      this.error = '';
    },

    checkMobile() {
      if (!trim(this.mobile)) {
        this.error = '请输入手机号';
        return false;
      } else if (!/^1\d{10}$/.test(this.mobile)) {
        this.error = '手机号格式错误';
        return false;
      }

      return true;
    },

    checkCaptcha() {
      if (!trim(this.captcha)) {
        this.error = '请输入验证码';
        return false;
      }

      return true;
    },

    async getCaptcha() {
      if (this.checkMobile()) {
        this.canSendMessage = false;

        await this.initiateCountDown(60);

        this.captchaText = '获取验证码';
        this.canSendMessage = true;
      }
    },

    async initiateCountDown(timeleft) {
      this.captchaText = `${timeleft}s后再次获取`;

      return new Promise((resolve, reject) => {
        const countdownTimer = setInterval(() => {
          timeleft--;
          this.captchaText = `${timeleft}s后再次获取`;

          if (timeleft <= 0) {
            clearInterval(countdownTimer);
            resolve(true);
          }
        }, 1000);
      });
    },

    async handleLogin() {
      if (this.checkMobile() && this.checkCaptcha()) {
        const payload = {
          mobile: this.mobile,
          captcha: this.captcha,
        };

        console.log(payload);

        wepy.wx.navigateTo({
          url: 'user-home',
        });
      }
    },
  },

  onShareAppMessage() {
    return {
      path: 'welcome',
    };
  },
});
</script>

<style lang="scss">
@mixin hairline-border($color: white) {
  border-width: 1px;
  border-style: solid;
  border-color: $color;

  @media (min-resolution: 2dppx) {
    border-width: 0.5px;
  }

  @media (min-resolution: 3dppx) {
    border-width: 0.33333333px;
  }

  @media (min-resolution: 4dppx) {
    border-width: 0.25px;
  }
}

.login {
  &__input-wrapper {
    @include hairline-border;
  }

  &__captcha-sender {
    @include hairline-border;
  }
}
</style>

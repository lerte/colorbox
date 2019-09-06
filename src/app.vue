<config>
{
  pages: [
    'pages/form',
  ],
  "permission": {
    "scope.userLocation": {
      "desc": "导航到彩色盒子美术馆"
    }
  },
  style: "v2",
  window: {
    navigationBarTitleText: '彩色盒子美术馆',
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black'
  }
}
</config>

<script>
import wepy from '@wepy/core';
import promisify from '@wepy/use-promisify';
import vuex from '@wepy/x';
import { plugin } from '@/services';

wepy.use(promisify);
wepy.use(vuex);
wepy.use(plugin);

wepy.app({
  hooks: {},

  onLaunch() {},

  methods: {},
});
</script>

<style lang="postcss">
@import 'vant-weapp/lib/common/index.wxss';

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<style lang="scss">
.container {
  height: 100%;
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
</style>

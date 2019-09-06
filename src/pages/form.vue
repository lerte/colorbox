<style lang="scss">
.header{
  width: 100%;
  margin: 20rpx;
  border-radius: 6px;
  box-shadow: 0px 2px 8px 3px #ababab;
  .logo{
    margin: 20rpx;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
  }
}
.form-group >input{
  border: 1rpx solid #ababab;
  border-radius: 6px;
  padding: 18rpx;
  margin: 10rpx 0;
}
.form-group .van-cell{
  border: 1rpx solid #ababab;
  border-radius: 6px;
  padding: 18rpx;
  margin: 10rpx 0;  
}
</style>

<template>
  <div class="container">
    <div class="header" @click="goMap">
      <van-row>
        <van-col span="4">
          <img class="logo" src="/static/images/logo.png">
        </van-col>
        <van-col span="20">
          <div style="padding-top: 20rpx;">南山壹栈校区</div>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="2">
          <van-icon name="location-o" style="padding-left:25rpx;" />
        </van-col>
        <van-col offset="2" span="20">
          <div style="padding-bottom: 20rpx;">
            深圳市南山区工业八路280号 壹栈林下 一层A号商铺（燕巢咖啡屋对面）
          </div>
        </van-col>        
      </van-row>
    </div>
    <div style="padding:15px 0;">——— 填写信息 ———</div>
    <div class="form" style="width: 100%;">
      <div class="form-group">
        <label for="childName">*孩子姓名</label>
        <input id="childName" type="text" required v-model="name" placeholder="请输入您孩子的姓名" />
      </div>
      <div class="form-group">
        <label for="cellphone">*手机号</label>
        <input id="cellphone" type="number" required v-model="mobile" placeholder="请输入您的手机号" />
      </div>
      <div class="form-group">
        <label for="childAge">孩子年龄</label>
        <van-field
          size="large"
          readonly="true"
          value="{{ age }}"
          icon="arrow-down"
          @click="showSelectAge"
        />
      </div>
      <div class="form-group">
        <label for="childSex">孩子性别</label>
        <van-radio-group value="{{ sex }}" bind:change="onChange">
          <van-radio name="男">男</van-radio>
          <van-radio name="女">女</van-radio>
        </van-radio-group>
      </div>
      <div class="form-group">
        <label for="address">地址</label>
        <input type="text" v-model="address" placeholder="请输入您所在的地址" />
      </div>                    
    </div>

    <van-button block="true" style="width: 100%;padding:15px 0;" type="primary" @click="submit">提交</van-button>

    <div style="font-size:11px;">——— 一个用艺术激发孩子的无限可能的神奇盒子 ———</div>
    <van-popup show="{{ show }}" position="bottom">
      <van-picker
        show-toolbar="true"
        columns="{{ columns }}"
        default-index="{{ 2 }}"
        @cancel="show = false"
        @confirm="show = false"
        @change="selectAge"
      />
    </van-popup>    
  </div>
</template>

<config>
{
  navigationBarTitleText: '彩色盒子美术馆',
  usingComponents: {
    'van-row': 'module:vant-weapp/dist/row',
    'van-col': 'module:vant-weapp/dist/col',
    'van-field': 'module:vant-weapp/dist/field',
    'van-radio': 'module:vant-weapp/dist/radio',
    'van-radio-group': 'module:vant-weapp/dist/radio-group',
    'van-icon': 'module:vant-weapp/dist/icon',
    'van-button': 'module:vant-weapp/dist/button',
    'van-picker': 'module:vant-weapp/dist/picker',
    'van-popup': 'module:vant-weapp/dist/popup',
  }
}
</config>

<script>
import wepy from '@wepy/core'

wepy.page({
  data: {
    show: false,
    name: null,
    mobile: null,
    age: '3岁',
    sex: '男',
    address: '',
    columns: [
      {
        values: [...Array(21).keys()].map(item=>item+'岁'),
        className: 'column1'
      },
      {
        values: [...Array(12).keys()].map(item=>item+'个月'),
        className: 'column2'
      }
    ]
  },
  computed: {
    disabled(){
      return Boolean(this.name && /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.mobile))
    }
  },
  created(){
    wx.cloud.init()
  },
  methods: {
    goMap(){
    wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success: function(res) {
      var latitude = res.latitude
      var longitude = res.longitude
      wx.openLocation({
        latitude: 22.503866519308442,
        longitude: 113.9168517730026,
        name: "彩色盒子美术馆",
        scale: 20
      })
      }
    }) 
    },
    submit() {
      if(!this.disabled){
        wx.showToast({
          icon: 'none',
          title: '请填写完整'
        })
        return
      }
      const db = wx.cloud.database({
        env: 'colorbox-5ivf1'
      })
      db.collection('children').add({
        data: {
          name: this.name,
          mobile: this.mobile,
          age: this.age,
          sex: this.sex,
          address: this.address
        },
        success(res){
          wx.showModal({
            title: '提交成功',
            showCancel: false
          })
        },
        fail(err){
          wx.showModal({
            title: '提交失败',
            showCancel: false
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    },
    selectAge(event){
      this.age = event.$wx.detail.value.join('')
    },
    showSelectAge(event){
      this.show = true
    },
    onChange(event){
      this.sex = event.$wx.detail
    }
  }
})
</script>

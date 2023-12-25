var user = require('../utils/user')
Page({
  data: {
    page_top_height: 0,
    info: {}
  },
  async onLoad() {
    const app=getApp()
    const height=app.globalData.page_top_height
    console.log(height)
    this.setData({
      page_top_height:height
    })
    my.hideBackHome();
    my.setNavigationBar({
      backgroundColor: '#FFFFFF', // 想使用frontColor 这个字段必填
      frontColor: '#000000' // 设置文字及状态栏电量、日期等文字颜色
    })
    // const context = await my.cloud.createCloudContext({
    //   env: 'env-00jx4obkh2l9'
    // });
    // await context.init();
    // my.cloudFunction = context;
    // my.setStorageSync({key: '_id', data: '658428204950fd82ff91e8d8'})
    let id = my.getStorageSync({key: '_id'}).data
    my.showLoading()
    my.cloudFunction.callFunction({
      name:"me",
      data: {
        userId: id
      },
      success: (res) => {
        console.log('me', res);
        this.setData({
          info: res.result.data
        })
        my.hideLoading()
      },
      fail: function(res) {
        console.log('fail', res);
      }
    })
  },
});

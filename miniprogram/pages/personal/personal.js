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
    this.getInfo()
  },
  getInfo(){
    my.showLoading()
    let id = my.getStorageSync({key: '_id'}).data
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
  onShow(){
    this.getInfo()
  },
  editInfo(){
    my.navigateTo({
      url:`/pages/personal/edit/edit?isLawyer=${this.data.info.isLawyer ? 1 : 0}`
    })
  },
  changeRole(){
    let id = my.getStorageSync({key: "_id"}).data
    my.cloudFunction.callFunction({
      name: "updateUserInfo",
      data: {
        id: id,
        isLawyer: !this.data.info.isLawyer
      },
      success: (res) => {
        console.log('updateUserInfo', res);
        this.getInfo()
      },
      fail: function (res) {
        console.log('updateUserInfo', res);
      }
    })
  }
});

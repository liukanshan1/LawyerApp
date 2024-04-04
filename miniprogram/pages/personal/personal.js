var user = require('../utils/user')
Page({
  data: {
    page_top_height: 0,
    info: {},
    isLawyer: false
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
    //this.getInfo()
  },
  onShow(){
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
          info: res.result.data,
        })
        my.hideLoading()
      },
      fail: function(res) {
        console.log('fail', res);
      }
    })
  },
  editInfo(){
    my.navigateTo({
      url:`/pages/personal/edit/edit?isLawyer=${this.data.isLawyer ? 1 : 0}`
    })
  },
  changeRole(){
    let id = my.getStorageSync({key: "_id"}).data
    let isLawyer = this.data.isLawyer
    if(!isLawyer){
      if(!this.data.info.isLawyer){
        //需要去认证Lawyer
        my.navigateTo({
          url:`/pages/personal/edit/edit?isLawyer=1`
        })//认证成功后跳转回来就切换
      }else{
        this.setData({
          isLawyer:!isLawyer
        })
        my.setStorageSync({key:'isLawyer',data:!isLawyer})
      }
    }
    else{
      this.setData({
        isLawyer:!isLawyer
      })
      my.setStorageSync({key:'isLawyer',data:!isLawyer})

    }
    // my.cloudFunction.callFunction({
    //   name: "updateUserInfo",
    //   data: {
    //     id: id,
    //     isLawyer: !this.data.info.isLawyer
    //   },
    //   success: (res) => {
    //     console.log('updateUserInfo', res);
    //     this.getInfo()
    //   },
    //   fail: function (res) {
    //     console.log('updateUserInfo', res);
    //   }
    // })
  },
  toDoc(e){
    let id = my.getStorageSync({key: "_id"}).data
    my.navigateTo({
      url:"/pages/case/docManageNew/docManageNew?userId="+id   //
    })
  },
});

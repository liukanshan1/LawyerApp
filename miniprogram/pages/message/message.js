var msg = require('../utils/msg')
Page({
  data: {
    tab_index: 1,
  },
  onLoad() {
    // let id = my.getStorageSync({key: 'id'}).data
    // msg.getMsg(id).then(res => {
    //   console.log('getMsg', res);
    // })
    my.cloudFunction.callFunction({
      name:"me",
      success:function(res){
        console.log('me', res);
      },
      fail: function(res) {
        console.log('fail', res);
      }
    })
  },
  changeTab(e){
    this.setData({
      tab_index: e.currentTarget.dataset.i
    })
  }
});

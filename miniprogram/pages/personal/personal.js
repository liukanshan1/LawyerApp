var user = require('../utils/user')
Page({
  data: {
    info: {}
  },
  async onLoad() {
    // const context = await my.cloud.createCloudContext({
    //   env: 'env-00jx4obkh2l9'
    // });
    // await context.init();
    // my.cloudFunction = context;
    my.setStorageSync({key: '_id', data: '658428204950fd82ff91e8d8'})
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
      },
      fail: function(res) {
        console.log('fail', res);
      }
    })
  },
});

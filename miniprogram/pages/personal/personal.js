var user = require('../utils/user')
Page({
  data: {
    info: {}
  },
  onLoad() {
    // request(GET_USER_INFO, 'GET').then(res=>{
    //   console.log(res)
    // })
    let id = my.getStorageSync({key: 'id'}).data
    user.getById(id).then(res => {
      console.log('getById',res);
      this.setData({
        info: res.data.data
      })
    })
  },
});

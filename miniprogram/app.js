// App({
//   globalData:{
//     host:"http://119.91.73.179:7554/"
//   },
//   onLaunch(options) {
//     // 第一次打开
//     // options.query == {number:1}
//     console.info('App onLaunch');
//     let res = my.setStorageSync({
//       key:'token',
//       data: '9a09b209e7fa4023a354d2552a9a8245'
//     })
//     const systemInfo = my.getSystemInfoSync(); // 获取设备信息
//     const statusHeight = systemInfo.statusBarHeight // 状态栏高度
//     this.globalData.page_top_height=statusHeight
//   },
//   onShow(options) {
    
//   },
//   globalData: {
//     userInfo: null,
//     page_top_height:40
//   }
  
// });
App({
  globalData: {
    userInfo: null,
    page_top_height:40
  },
  async onLaunch(options) {
    // const context = await my.cloud.createCloudContext({
    //   env: 'env-00jx4obkh2l9'
    // });
    // // 初始化云环境
    // console.log('初始化云环境');
    // await context.init();
    // // 设置context的调用方法,my.后面的名称可以自定义
    // my.cloudFunction = context;
    // my.getAuthCode({
    //   scopes: 'auth_base', 
    //   success:(res) =>{
    //   	console.log('auth',res);
    //   }
    // })
    
  },
  onShow(options) {

  },
});

Page({
  data: {
    page_top_height:0
  },
  async onLoad() {
    const app=getApp()
    console.log(app);
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
    const context = await my.cloud.createCloudContext({
      env: 'env-00jx4obkh2l9'
    });
    await context.init();
    my.cloudFunction = context;
    
    my.cloudFunction.callFunction({
      name:"me",
      // data: {参数写在这里面},
      success:function(res){
        console.log('me', res);
      },
      fail: function(res) {
        console.log('fail', res);
      }
    })
  },
  check_task_detail(){
    console.log("查看任务详细")
    my.navigateTo({
      url: ''
    })
  },

  recent_message(){
    console.log("最近消息")
  },
});

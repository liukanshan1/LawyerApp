Page({
  data: {
    page_top_height:0,
    todayTimestampZero: 0,
    today: "",
    tasklist: [],
    msgList: [],
    canIUseAuthButton: my.canIUse('button.open-type.getAuthorize'),
    showMask: true
  },
  async onLoad() {
    const app=getApp()
    const height=app.globalData.page_top_height
    console.log(height)
    this.setData({
      page_top_height:height,
      todayTimestampZero: this.getTodayStampZero(),
      today: this.formatDate(new Date().getTime(), true)
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
    let isLawyer = my.getStorageSync({key:'isLawyer'}).data
    console.log('isLawyer',isLawyer)
    if(isLawyer===null){
      my.setStorage({key:'isLawyer',data:false})
    }
    this.createUser()
  },
  onShow(){
    if(my.cloudFunction === undefined) return
    this.getTaskList()
    this.getNewestMes()
  },
  createUser(){
    let id = my.getStorageSync({key:"_id"}).data;
    console.log(id)
    if(id!==null) {
      this.getTaskList()
      this.getNewestMes()
      return
    }
    my.showLoading({content:'获取授权信息...'})
    my.getAuthCode({
      scopes: 'auth_user', 
      success:(res) =>{
      	console.log('code',res);
        my.cloudFunction.callFunction({
          name:"createUser",
          data: { 
            authCode: res.authCode
          },
          success: (res) => {
            console.log('createUser', res);
            //my.setStorageSync({key:"_id", data: "658428204950fd82ff91e8d8"}) // 客户
            // my.setStorageSync({key:"_id", data: "658584160f8bdfbed7423e86"}) // 律师
            
            my.setStorageSync({key:"_id", data: res.result.data}) // 正式使用
            
            this.getTaskList()
            this.getNewestMes()
          },
          fail: function(res) {
            console.log('createUser', res);
          }
        })
      }
    })
  },
  check_task_detail(){
    console.log("查看任务详细")
    my.navigateTo({
      url: `/pages/homepage/scheduleDay/scheduleDay?todayTimestampZero=${this.data.todayTimestampZero}&today=${this.data.today}`
    })
  },

  recent_message(){
    my.navigateTo({
      url: "/pages/message/message"
    })
  },
  formatDate(time, flag){
    let date = new Date(time);
    if(flag) {
      let YY = date.getFullYear();
      let MM = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1);
      let DD = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
      let day = date.getDay()
      let week = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]
      return YY + '-' + MM + '-' + DD + ' ' + week[day]
    }
    else {
      let hh = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours());
      let mm = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
      let ss = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
      return hh + ':' + mm + ':' + ss;
    }
  },
  getTodayStampZero(){
    let date = new Date();
    let YY = date.getFullYear();
    let MM = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1);
    let DD = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
    let format = YY + '-' + MM + '-' + DD
    return new Date(format).getTime() - 28800000
  },
  getTaskList(){
    my.showLoading()
    let id = my.getStorageSync({key: '_id'}).data
    console.log(id, this.data.todayTimestampZero,this.data.todayTimestampZero+86399000);
    my.cloudFunction.callFunction({
      name:"getSchedules",
      data: { 
        userId: id,
        start: this.data.todayTimestampZero,
        end: this.data.todayTimestampZero + 86399000 // 今天23点59分59秒
      },
      success: (res) => {
        console.log('日程', res);
        res.result.data.map(item => { 
          item.time = this.formatDate(item.time, false)
        })
        console.log(res.result.data);
        this.setData({
          tasklist: res.result.data
        })
        my.hideLoading()
      },
      fail: function(res) {
        console.log('日程', res);
      }
    })
  },
  getNewestMes(){
    my.showLoading()
    let id = my.getStorageSync({key: '_id'}).data
    my.cloudFunction.callFunction({
      name: "getNewestMes",
      data: {
        userId: id,
        unRead: false
      },
      success: (res) => {
        console.log('getNewestMes', res);
        this.setData({
          msgList: res.result
        })
        my.hideLoading()
      },
      fail: function (res) {
        console.log('getNewestMes fail', res);
      }
    })
  }
});

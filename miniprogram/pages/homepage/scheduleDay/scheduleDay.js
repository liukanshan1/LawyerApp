Page({
  data: {
    today: "2023-12-23",
    selectdateTimestamp: 1699833600000,
    list: []
  },
  onLoad(e) {
    console.log('e', e);
    this.setData({
      selectdateTimestamp: parseInt(e.todayTimestampZero),
      today: e.today
    })
    this.getList()
  },
  formatDate(time, flag){
    let date = new Date(time);
    let YY = date.getFullYear();
    let MM = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1);
    let DD = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
    if(flag) { //flag为true，显示时分秒格式
      var hh = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours());
      var mm = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
      var ss = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
      //返回时间格式： 2020-11-09 13:14:52
      return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
    } else {
      //返回时间格式： 2020-11-09
      return YY + '-' + MM + '-' + DD;
    }
  },
  dateChange(e){
    console.log(e.detail);
    this.setData({
      today: e.detail.value,
      selectdateTimestamp: new Date(e.detail.value).getTime()
    })
    this.getList()
  },
  getList(){
    console.log(this.data.selectdateTimestamp, this.data.selectdateTimestamp + 86399000);
    let id = my.getStorageSync({key: '_id'}).data
    my.cloudFunction.callFunction({
      name:"getSchedules",
      data: { 
        userId: id,
        start: this.data.selectdateTimestamp,
        end: this.data.selectdateTimestamp + 86399000 // 今天23点59分59秒
      },
      success: (res) => {
        console.log('日程', res);
        res.result.data.map(item => { 
          item.time = this.formatDate(item.time, true)
        })
        console.log(res.result.data);
        this.setData({
          list: res.result.data
        })
      },
      fail: function(res) {
        console.log('日程', res);
      }
    })
  },
  addSchedule(){
    my.navigateTo({
      url: "/pages/createtodo/createtodo"
    })
  }
});

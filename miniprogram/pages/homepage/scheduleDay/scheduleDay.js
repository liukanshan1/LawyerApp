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
  formatDate(time, flag) {
    let date = new Date(time);
    let YY = date.getFullYear();
    let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let DD = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    let day = date.getDay()
    let week = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
    return YY + '-' + MM + '-' + DD + ' ' + week[day]
  },
  dateChange(e) {
    console.log(e.detail);
    this.setData({
      today: this.formatDate(e.detail.value),
      selectdateTimestamp: new Date(e.detail.value).getTime()
    })
    this.getList()
  },
  getList() {
    console.log(this.data.selectdateTimestamp, this.data.selectdateTimestamp + 86399000);
    let id = my.getStorageSync({
      key: '_id'
    }).data
    my.cloudFunction.callFunction({
      name: "getSchedules",
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
      fail: function (res) {
        console.log('日程', res);
      }
    })
  },
  addSchedule() {
    my.navigateTo({
      url: "/pages/createtodo/createtodo"
    })
  }
});
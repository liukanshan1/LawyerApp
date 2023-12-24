var msg = require('../utils/msg')
Page({
  data: {
    tab_index: 0,
    msgList: [],
    oneCaseMsgs: [],
    msgListClick: false,
    schduleList: []
  },
  onLoad() {
    my.cloudFunction.callFunction({
      name:"me",
      success:function(res){
        console.log('me', res);
      },
      fail: function(res) {
        console.log('fail', res);
      }
    })
    this.getNewestMes()
    this.getScheduleList()
  },
  changeTab(e){
    let index = e.currentTarget.dataset.i
    if(this.data.tab_index === index) return
    this.setData({
      tab_index: index,
      msgListClick: index === 1 ? false : this.data.msgListClick
    })
  },
  formatDate(time){
    let date = new Date(time);
    let YY = date.getFullYear();
    let MM = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1);
    let DD = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
    
    return YY + '-' + MM + '-' + DD
  },
  getNewestMes(){
    let id = my.getStorageSync({key: '_id'}).data
    my.cloudFunction.callFunction({
      name: "getNewestMes",
      data: {
        userId: id,
        unRead: false
      },
      success: (res) => {
        console.log('getNewestMes', res);
        res.result.map(item => {
          item.time = this.formatDate(parseInt(item.sendTime))
        })
        this.setData({
          msgList: res.result
        })
      },
      fail: function (res) {
        console.log('getNewestMes fail', res);
      }
    })
  },
  getMsgByCaseId(e){
    if(this.data.msgListClick) return;
    this.setData({
      msgListClick: true
    })
    let userId = my.getStorageSync({key: '_id'}).data
    my.cloudFunction.callFunction({
      name: "getMessageByCaseId",
      data: {
        userId: userId,
        caseId: this.data.msgList[e.currentTarget.dataset.i].caseId,
        unRead: 0
      },
      success: (res) => {
        console.log('getMessageByCaseId', res);
        res.result.map(item => {
          item.time = this.formatDate(parseInt(item.sendTime))
        })
        this.setData({
          oneCaseMsgs: res.result
        })
      },
      fail: function (res) {
        console.log('getMessageByCaseId fail', res);
      }
    })
  },
  getScheduleList(){
    let id = my.getStorageSync({key: '_id'}).data
    my.cloudFunction.callFunction({
      name:"getSchedules",
      data: { 
        userId: id,
        start: new Date('1970-01-01').getTime(),
        end: new Date('2100-01-01').getTime()
      },
      success: (res) => {
        console.log('日程', res);
        res.result.data.map(item => { 
          item.time = this.formatDate(item.time, true)
        })
        console.log(res.result.data);
        this.setData({
          schduleList: res.result.data
        })
      },
      fail: function(res) {
        console.log('日程', res);
      }
    })
  },
});

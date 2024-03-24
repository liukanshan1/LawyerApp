var msg = require('../utils/msg')
Page({
  data: {
    tab_index: 1,
    msgList: [],
    oneCaseMsgs: [],
    msgListClick: false,
    schduleList: [],
    content: "",
    caseIndex: -1
  },
  onLoad() {
    // my.showLoading()
    this.setData({
      schduleList:[this.get_test_object()]
    })
    this.getNewestMes()
    // this.getScheduleList()
  },
  changeTab(e) {
    let index = e.currentTarget.dataset.i
    if (this.data.tab_index === index) return
    this.setData({
      tab_index: index,
      msgListClick: index === 1 ? false : this.data.msgListClick
    })
  },
  formatDate(time) {
    let date = new Date(time);
    let YY = date.getFullYear();
    let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let DD = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

    return YY + '-' + MM + '-' + DD
  },
  getNewestMes() {
    let id = my.getStorageSync({
      key: '_id'
    }).data
    my.cloudFunction.callFunction({
      name: "getNewestMes",
      data: {
        userId: id,
        unRead: false
      },
      success: (res) => {
        console.log('getNewestMes', res);
        res.result.map(item => {
          item.time = this.formatDate(item.sendTime)
        })
        this.setData({
          msgList: res.result
        })
        my.hideLoading()
      },
      fail: function (res) {
        console.log('getNewestMes fail', res);
      }
    })
  },
  getMsgByCaseId(e) {
    if (this.data.msgListClick && e.currentTarget.dataset.flag) return;
    this.setData({
      msgListClick: true,
      caseIndex: e.currentTarget.dataset.i
    })
    let userId = my.getStorageSync({
      key: '_id'
    }).data
    my.showLoading()
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
        my.hideLoading()
      },
      fail: function (res) {
        console.log('getMessageByCaseId fail', res);
      }
    })
  },
  getScheduleList() {
    let id = my.getStorageSync({
      key: '_id'
    }).data
    my.cloudFunction.callFunction({
      name: "getSchedules",
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
      fail: function (res) {
        console.log('日程', res);
      }
    })
  },
  inputContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  sendMsg() {
    if (this.data.content.trim() === "") my.showModal({
      title: "请输入消息内容"
    });
    else {
      my.showLoading()
      console.log(this.data.msgList[this.data.caseIndex].caseId)
      my.cloudFunction.callFunction({
        name: "getCaseById",
        data: {
          caseId: this.data.msgList[this.data.caseIndex].caseId
        },
        success: (res) => {
          console.log('案件byid', res);
          this.addMessage(res.result.data.userIds)
        },
        fail: function (res) {
          console.log('案件byid', res);
        }
      })
    }
  },
  addMessage(userIds) {
    console.log("参数", userIds, this.data.msgList[this.data.caseIndex].caseId, this.data.content);
    my.cloudFunction.callFunction({
      name: "addMessage",
      data: {
        userIds: userIds,
        caseId: this.data.msgList[this.data.caseIndex].caseId,
        content: this.data.content
      },
      success: (res) => {
        console.log('addMessage', res);
        my.hideLoading()
        my.showModal({
          title: "提示",
          content: "发送成功",
          complete: () => {
            // my.navigateTo({
            //   url: "/pages/message/message"
            // })
            console.log('complete', this);
            this.getMsgByCaseId({
              currentTarget: {
                dataset: {
                  i: this.data.caseIndex,
                  flag: false
                }
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log('addMessage', res);
      }
    })
  },

  get_test_object(){
    return {
      _id:"6586a581e2a1c9ee460f68e7",
      _openid:"081N9i_gPYAMzmxIwMx8I3936GkOFXEg9YWayBl9MH8Gpwa",
      address:"华工",
      caseId:1,
      description:"测试1",
      time:"2023-1-1",
      title:"日程1",
      type:"其他",
      userIds:["658428204950fd82ff91e8d8"]
    }
  }
});
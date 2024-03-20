Page({
  data: {
    page_top_height: 0,
    label: [{
      name: "会议",
      style: "label_style1"
    }, {
      name: "开庭",
      style: "label_style2"
    }, {
      name: "自定义",
      style: "label_style3"
    }],
    label_index: 0,
    caseList: [],
    caseIndex: 0,
    attendUserList: [],
    attendedUserIndexs: [],
    attendedUserIds: [], // 只用于表单提交
    address_value: "",
    content_value: "",
    remark_value: "",
    start_time: "08:00",
    start_date: "",
  },
  onLoad() {
    const app = getApp()
    const height = app.globalData.page_top_height
    console.log(height)
    this.setData({
      page_top_height: height
    })
    my.hideBackHome({
      success: res => {
        console.log("success")
      }
    });
    my.setNavigationBar({
      backgroundColor: '#FFFFFF', // 想使用frontColor 这个字段必填
      frontColor: '#000000' // 设置文字及状态栏电量、日期等文字颜色
    })
    this.setData({
      start_date: this.initDate()
    })
    let id = my.getStorageSync({
      key: "_id"
    }).data
    my.cloudFunction.callFunction({
      name: "getCases",
      data: {
        userId: id
      },
      success: (res) => {
        console.log('getCases', res);
        this.setData({
          caseList: [...res.result.data, "无"]
        })
        if (res.result.data.length !== 0) this.getUsernamesByIds(this.data.caseList[this.data.caseIndex].userIds)
      },
      fail: function (res) {
        console.log('getCases', res);
      }
    })
  },
  getUsernamesByIds(ids) {
    my.cloudFunction.callFunction({
      name: "getUsernamesByIds",
      data: {
        ids: ids
      },
      success: (res) => {
        console.log('getUsernamesByIds', res);
        res.result.data.map(item => {
          item.name = item.name ? item.name : item.nickname
        })
        this.setData({
          attendUserList: res.result.data
        })
      },
      fail: function (res) {
        console.log('getUsernamesByIds', res);
      }
    })
  },
  caseChange(e) {
    this.setData({
      caseIndex: e.detail.value,
      attendedUserIndexs: [],
      attendedUserIds: []
    })
    this.getUsernamesByIds(this.data.caseList[this.data.caseIndex].userIds)
  },
  changeLabel(e) {
    this.setData({
      label_index: e.currentTarget.dataset.i
    })
  },
  attendUserChange(e) {
    if (this.data.attendedUserIndexs.indexOf(e.detail.value) !== -1) return
    let temp = this.data.attendedUserIndexs
    temp.push(e.detail.value)
    let tempIds = this.data.attendedUserIds
    tempIds.push(this.data.attendUserList[e.detail.value]._id)
    this.setData({
      attendedUserIndexs: temp,
      attendedUserIds: tempIds
    })
  },
  address_input(e) {
    this.setData({
      address_value: e.detail.value
    })
  },
  content_input(e) {
    this.setData({
      content_value: e.detail.value
    })
  },
  remark_input(e) {
    this.setData({
      remark_value: e.detail.value
    })
  },
  setDate1(date, name) {
    this.setData({
      start_date: date
    })
  },
  setTime1(time, name) {
    console.log('start', time);
    this.setData({
      start_time: time
    })
  },
  cancel(e) {
    console.log("cancel")
  },
  initDate(){
    let date = new Date();
    let YY = date.getFullYear();
    let MM = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1);
    let DD = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
    
    return YY + '-' + MM + '-' + DD
  },
  confirm(e) {
    if(this.data.attendedUserIds.length === 0 || this.data.content_value === "" || this.data.address_value === "" || this.data.remark_value === "") {
      my.showModal({
        title: "提示",
        content: "信息未填写完整！"
      })
      return
    }
    let time = new Date(this.data.start_date + " " + this.data.start_time).getTime()
    console.log('time', time);
    // return
    my.cloudFunction.callFunction({
      name: "addSchedule",
      data: {
        caseId: this.data.caseList[this.data.caseIndex]._id,
        caseTitle: this.data.caseList[this.data.caseIndex].title,
        userIds: this.data.attendedUserIds,
        title: this.data.content_value,
        address: this.data.address_value,
        time: time,
        description:this.data.remark_value,
        type: this.data.label[this.data.label_index].name
      },
      success: (res) => {
        console.log('addSchedule', res);
        my.navigateBack();
      },
      fail: function (res) {
        console.log('addSchedule fail', res);
      }
    })
    
  }
});
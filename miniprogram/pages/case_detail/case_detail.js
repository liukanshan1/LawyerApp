Page({
  data: {
    case:{},
    process_map_item: ["审理法院","拟定法院文书","客户盖章确认","第一次洽谈","第二次洽谈"],
    nextProcessList: [],
    nextProcessIndex: 0,
    file_item: [
    //   {
    //   file_name: "死刑通知书.docx",
    //   file_date: "2023.10.31"
    // }, {
    //   file_name: "死刑通知书.docx",
    //   file_date: "2023.10.31"
    // }
  ],
    address_item: [
    //   {
    //   image: "",
    //   username: "warth"
    // }, {
    //   image: "",
    //   username: "warth"
    // }
    ]
  },
  onLoad(e) {
    my.showLoading()
    console.log(e)
    this.getCaseById(e.caseId)
    // let id = my.getStorageSync({key: '_id'}).data
    my.cloudFunction.callFunction({
      name:"getScheduleByCaseId",
      data: { 
        caseId: e.caseId,
        // start: this.data.selectdateTimestamp,
        // end: this.data.selectdateTimestamp + 86399000 // 今天23点59分59秒
      },
      success: (res) => {
        // console.log('日程', res);
        // res.result.data.map(item => { 
        //   item.time = this.formatDate(item.time, true)
        // })
        console.log('日程',res.result)
        if(res.result.data.length>0){
          this.setData({
            list: [res.result.data[0]]
          })
        }
      },
      fail: function(res) {
        console.log('日程', res);
      }
    })
  },
  formatDate(time){
    let date = new Date(time);
    let YY = date.getFullYear();
    let MM = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1);
    let DD = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
    
    return YY + '-' + MM + '-' + DD
  },
  getCaseById(caseId) {
    console.log('caseId',caseId);
    my.cloudFunction.callFunction({
      name: "getCaseById",
      data: {
        caseId: caseId
      },
      success: (res) => {
        console.log('案件byid', res);
        res.result.data.time = this.formatDate(res.result.data.createTime)
        this.setData({
          case: res.result.data
        })
        my.cloudFunction.callFunction({
          name: "getProcessesByIds",
          data: {
            ids: this.data.case.processIds
          },
          success: (res) => {
            this.setData({
              process_map_item: res.result.data
            })
            this.getNextProcessById()
            my.hideLoading()
            console.log('案件进程', res);
          },
          fail: function (res) {
            console.log('案件进程', res);
          }
        })
      },
      fail: function (res) {
        console.log('案件byid', res);
      }
    })
  },
  getNextProcessById(){
    let fatherId = -1
    // if(this.data.process_map_item.length !== 0) fatherId = this.data.process_map_item.at(-1).id
    if(this.data.process_map_item.length !== 0) fatherId = this.data.process_map_item[this.data.process_map_item.length - 1].id
    console.log('fatherId', fatherId);
    my.cloudFunction.callFunction({
      name: "getNextProcessById",
      data: {
        fatherId: fatherId
      },
      success: (res) => {
        console.log('getNextProcessById', res);
        this.setData({
          nextProcessList: res.result.data
        })
      },
      fail: function (res) {
        console.log('getNextProcessById', res);
      }
    })
  },
  nextChange(e){
    console.log(e);
    let temp = this.data.process_map_item
    temp.push(this.data.nextProcessList[e.detail.value])
    this.setData({
      process_map_item: temp,
      nextProcessIndex: e.detail.value
    })
    this.updateProcessIdsByCaseId()
    this.getNextProcessById()
  },
  updateProcessIdsByCaseId(){
    my.cloudFunction.callFunction({
      name: "updateProcessIdsByCaseId",
      data: {
        caseId: this.data.case._id,
        processId: this.data.nextProcessList[this.data.nextProcessIndex].id,
      },
      success: (res) => {
        console.log('updateProcessIdsByCaseId', res);
      },
      fail: function (res) {
        console.log('updateProcessIdsByCaseId', res);
      }
    })
  },

  tap_today_agenda(e) {
    my.navigateTo({
      url: `/pages/case/processTrack/processTrack?caseId=${this.data.case._id}&tabIndex=${1}`
    })
  },

  tap_process_trace(e) {
    my.navigateTo({
      url: `/pages/case/processTrack/processTrack?caseId=${this.data.case._id}&tabIndex=${0}`
    })
  },
  tap_all_file(e) {
    console.log("全部文档点击")
    my.navigateTo({
      url:"/pages/case/docManage/docManage?caseId="+this.data.case._id
    })
  },

  tap_documnet(e) {
    console.log("文件点击，文件编号：" + e.currentTarget.dataset.doc_index)
  },

  tap_address_book(e) {
    console.log("通讯录点击")
  },

  tap_user(e) {
    console.log("通讯人点击，通讯人编号：" + e.currentTarget.dataset.user_index)
  },
});
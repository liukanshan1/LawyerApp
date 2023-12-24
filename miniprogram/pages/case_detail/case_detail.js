Page({
  data: {
    case:{},
    process_map_item: ["审理法院","拟定法院文书","客户盖章确认","第一次洽谈","第二次洽谈"],
    file_item: [{
      file_name: "死刑通知书.docx",
      file_date: "2023.10.31"
    }, {
      file_name: "死刑通知书.docx",
      file_date: "2023.10.31"
    }],
    address_item: [{
      image: "",
      username: "warth"
    }, {
      image: "",
      username: "warth"
    }],
    page_top_height: 0,
  },
  onLoad(e) {
    const app = getApp()
    const height = app.globalData.page_top_height
    console.log(height)
    this.setData({
      page_top_height: height
    })
    my.setNavigationBar({
      backgroundColor: '#FFFFFF', // 想使用frontColor 这个字段必填
      frontColor: '#000000' // 设置文字及状态栏电量、日期等文字颜色
    })
    this.getCaseById(e.caseId)
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
        id: caseId
      },
      success: (res) => {
        console.log('案件byid', res);
        res.result.data.time = this.formatDate(res.result.data.createTime)
        this.setData({
          case: res.result.data
        })
      },
      fail: function (res) {
        console.log('案件byid', res);
      }
    })
  },
  tap_case_item(e) {
    console.log("案件信息详细点击")
  },

  tap_today_agenda(e) {
    console.log("今日日程点击")
  },

  tap_process_trace(e) {
    console.log("进程追踪导图点击")
  },

  tap_all_file(e) {
    console.log("全部文档点击")
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
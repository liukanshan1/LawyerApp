// pages/case_detail/case_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_top_height:0,
    this_case:{
      name:"xxx人格纠纷案",
      info_line:[{info_name:"案件是否完结",value:"否"},
                 {info_name:"案件编号",value:"20210517"},
                 {info_name:"案由",value:"人格权纠纷"},
                 {info_name:"创建时间",value:"2023.10.30"},
                 {info_name:"案件类型",value:"诉讼案"}]
    },
    process_map_item:["开庭","宣判","死刑:)"],
    current_process_index:1,
    file_item:[{file_name:"死刑通知书.docx",file_date:"2023.10.31"},{file_name:"死刑通知书.docx",file_date:"2023.10.31"}],
    address_item:[{image:"",username:"warth"},{image:"",username:"warth"}]
  },

  tap_case_item(e){
    console.log("案件信息详细点击")
  },

  tap_today_agenda(e){
    console.log("今日日程点击")
  },

  tap_process_trace(e){
    console.log("进程追踪导图点击")
  },

  tap_all_file(e){
    console.log("全部文档点击")
  },

  tap_documnet(e){
    console.log("文件点击，文件编号："+e.currentTarget.dataset.doc_index)
  },

  tap_address_book(e){
    console.log("通讯录点击")
  },

  tap_user(e){
    console.log("通讯人点击，通讯人编号："+e.currentTarget.dataset.user_index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app=getApp()
    const height=app.globalData.page_top_height
    this.setData({
      page_top_height:height
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
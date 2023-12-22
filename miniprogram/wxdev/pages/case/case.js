// pages/case/case.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_top_height:0,
    case_type_list:["诉讼案","仲裁案","非诉讼"],
    case_num:2,
    case_item:[{
      name:"xxx人格纠纷案",
      info_line:[{info_name:"案件是否完结",value:"否"},
                 {info_name:"案件编号",value:"20210517"},
                 {info_name:"案由",value:"人格权纠纷"},
                 {info_name:"创建时间",value:"2023.10.30"},
                 {info_name:"案件类型",value:"诉讼案"}]
    },
    {
      name:"xxx人格纠纷案",
      info_line:[{info_name:"案件是否完结",value:"否"},
                 {info_name:"案件编号",value:"20210517"},
                 {info_name:"案由",value:"人格权纠纷"},
                 {info_name:"创建时间",value:"2023.10.30"},
                 {info_name:"案件类型",value:"诉讼案"}]
    }],
    
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
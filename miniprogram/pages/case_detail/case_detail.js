Page({
  data: {
    this_case:{
      name:"xxx人格纠纷案",
      info_line:[{info_name:"案件是否完结",value:"否"},
                 {info_name:"案件编号",value:"20210517"},
                 {info_name:"案由",value:"人格权纠纷"},
                 {info_name:"创建时间",value:"2023.10.30"},
                 {info_name:"案件类型",value:"诉讼案"}]
    },
    process_map_item:["开庭1","开庭2","开庭3","开庭4","宣判","死刑:)"],
    current_process_index:2,
    file_item:[{file_name:"死刑通知书.docx",file_date:"2023.10.31"},{file_name:"死刑通知书.docx",file_date:"2023.10.31"}],
    address_item:[{image:"",username:"warth"},{image:"",username:"warth"}],
    page_top_height:0,
  },
  onLoad() {
    const app=getApp()
    const height=app.globalData.page_top_height
    console.log(height)
    this.setData({
      page_top_height:height
    })
    // my.hideBackHome({
    //   success:res=>{
    //     console.log("success")
    //   }
    // });
    my.setNavigationBar({
      backgroundColor: '#FFFFFF', // 想使用frontColor 这个字段必填
      frontColor: '#000000' // 设置文字及状态栏电量、日期等文字颜色
    })
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
});

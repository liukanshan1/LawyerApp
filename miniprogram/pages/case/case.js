Page({

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
    onLoad() {
      const app=getApp()
      const height=app.globalData.page_top_height
      console.log(height)
      this.setData({
        page_top_height:height
      })
      // request(GET_CASE_LIST,'GET',[]).then(res=>{
      //   console.log(res)
      // })
      my.hideBackHome({
        success:res=>{
          console.log("success")
        }
      });
      my.setNavigationBar({
        backgroundColor: '#FFFFFF', // 想使用frontColor 这个字段必填
        frontColor: '#000000' // 设置文字及状态栏电量、日期等文字颜色
      })
    },
  })

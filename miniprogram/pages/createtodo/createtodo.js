Page({
  data: {
    page_top_height:0,
    label:[{name:"开会",style:"label_style1"},{name:"开会",style:"label_style2"},{name:"开会",style:"label_style3"}],
    repeat_selection:["从不","一直重复"],
    repeat_index:0,
    remind_selection:["5分钟前","10分钟前"],
    remind_index:0,
    remind_method_selection:["通知提醒","短信提醒"],
    remind_method_index:0,
    case_selection:["案件1","案件2"],
    case_index:0,
    content_value:"",
    remark_value:"",
    start_time:"",
    start_date:"",
    end_time:"",
    end_date:"",
  },
  onLoad() {
    const app=getApp()
    const height=app.globalData.page_top_height
    console.log(height)
    this.setData({
      page_top_height:height
    })
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
  repeat_change(e){
    console.log(e)
    this.setData({
      repeat_index:e.detail.value
    })
  },
  remind_change(e){
    console.log(e)
    this.setData({
      remind_index:e.detail.value
    })
  },
  remind_method_change(e){
    console.log(e)
    this.setData({
      remind_method_index:e.detail.value
    })
  },
  content_input(e){
    // console.log(e.detail)
    this.setData({
      content_value:e.detail.value
    })
  },
  remark_input(e){
    // console.log(e.detail)
    this.setData({
      remark_value:e.detail.value
    })
  },
  setDate1(date,name){
    if(name=="start"){
      this.setData({
        start_date:date
      })
    }else if(name=="end"){
      this.setData({
        end_date:date
      })
    }else{
      console.log("incorrect name")
    }    
  },
  setTime1(time,name){
    if(name=="start"){
      this.setData({
        start_time:time
      })
    }else if(name=="end"){
      this.setData({
        end_time:time
      })
    }else{
      console.log("incorrect name")
    }    
  },
  cancel(e){
    console.log("cancel")
  },
  confirm(e){
    console.log("confirm")
  }

});

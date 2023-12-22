import {getDay} from '../utils/date.js'
Page({
  data: {
    dateList: [
      {
        date: "12月18日",
        week: "星期一",
        lunar: "冬月初六"
      },
      {
        date: "12月19日",
        week: "星期二",
        lunar: "冬月初七"
      },
      {
        date: "12月20日",
        week: "星期三",
        lunar: "冬月初八",
        festival: "冬至"
      },
    ]
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
  },
  gotoDay(){
    my.navigateTo({
      url: "/pages/schedule/scheduleDay/scheduleDay"
    })
  }
})



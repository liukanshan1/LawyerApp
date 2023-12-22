Page({

  data:{
    // prefix:"http://119.91.73.179:7554/",
    page_top_height:0,
  },

  onLoad(query) {
    const app=getApp()
    const height=app.globalData.page_top_height
    console.log(height)
    this.setData({
      page_top_height:height
    })
  },
  check_task_detail(){
    let that=this
    let acode="";
    my.getAuthCode({
      scopes: "auth_user",
      success(res){
        console.log(res)
        // /user/createUserWithOpenUserInfo/authCode
        acode=res.authCode;
        my.request({
          // url:that.data.prefix+"user/createUserWithOpenUserInfo/"+acode,
          url:"http://119.91.73.179:7554/user/createUserWithOpenUserInfo/"+acode,
          method:"POST",
          success(res){
            console.log(acode)
            console.log(res)
          },
          fail(e){
            console.log(acode)
            console.log("fail")
            console.log(e)
          }
        })
      },
      fail(res){
        console.log(res)
      }
    });
    
    console.log("查看任务详细")
  },

  recent_message(){
    console.log("最近消息")
  },

});

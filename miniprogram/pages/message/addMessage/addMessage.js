Page({
  data: {
    content: ""
  },
  onLoad(e) {
    console.log(e);
  },
  inputContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  cancel(){
    my.navigateBack()
  },
  addCusProcess(){
    if(this.data.content.trim() === "") my.showModal({title:"请输入消息内容"});
    
    my.showModal({
      title: "提示",
      content: "发送成功",
      complete:()=>{
        my.navigateTo({
          url: "/pages/message/message"
        })
      }
    })
  }
});

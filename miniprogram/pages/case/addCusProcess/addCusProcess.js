Page({
  data: {
    name:"",
    processId: "",
    fatherId: "",
    caseId: ""
  },
  onLoad(e) {
    console.log(e);
    this.setData({
      processId: parseInt(e.processId),
      fatherId: e.fatherId === "-1" ? -1 : e.fatherId,
      caseId: e.caseId
    })
  },
  inputProcess(e) {
    this.setData({
      name: e.detail.value
    })
  },
  cancel(){
    my.navigateBack()
  },
  addCusProcess(){
    if(this.data.name.trim() === "") my.showModal({title:"请填写进程名称"});
    let id = my.getStorageSync({key: "_id"}).data
    my.cloudFunction.callFunction({
      name: "addCusProcess",
      data: {
        name: this.data.name,
        processId: this.data.processId,
        userId: id,
        fatherId: this.data.fatherId,
        caseId: this.data.caseId,
      },
      success: (res) => {
        console.log('addCusProcess', res);
      },
      fail: function (res) {
        console.log('addCusProcess', res);
      }
    })
    my.showModal({
      title: "提示",
      content: "添加成功",
      complete:()=>{
        my.navigateTo({
          url: `/pages/case/processTrack/processTrack?caseId=${this.data.caseId}`
        })
      }
    })
  }
});

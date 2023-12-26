Page({
  data: {
    list:[]
  },
  async onLoad() {
    const context = await my.cloud.createCloudContext({
      env: 'env-00jx4obkh2l9'
    });
    await context.init();
    my.cloudFunction = context;
    my.setStorageSync({key: '_id', data: '658428204950fd82ff91e8d8'})
    let id=my.getStorageSync({key:'_id'}).data
    // this.getCases()
    let that=this
    console.log(id)
    my.cloudFunction.callFunction({
      name:"getCasesName",
      data:{
        userId:id,
      },
      success:function(res){
        that.setData({
          list:res.result.data
        })
        console.log(res)
      },
      fail:function(e){
        console.log("fail:")
        console.log(e)
      }
    })
  },
  getCases(){
    let id = my.getStorageSync({key: '_id'}).data
    my.cloudFunction.callFunction({
      name:"getCases",
      data: {
        userId: id,
        type: this.data.tab_index
      },
      success: (res) => {
        console.log('案件', res);
        res.result.data.map(item => {
          item.time = this.formatDate(item.createTime)
        })
        this.setData({
          caseList: res.result.data
        })
      },
      fail: function(res) {
        console.log('案件', res);
      }
    })
  },
  tapCase(e){
    console.log(this.data.list[e.currentTarget.dataset.i]._id)
    my.navigateTo({
      url:"/pages/case/docManage/docManage?caseId="+this.data.list[e.currentTarget.dataset.i]._id
    })
  }
});

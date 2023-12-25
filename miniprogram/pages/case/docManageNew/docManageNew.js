Page({
  data: {},
  async onLoad() {
    const context = await my.cloud.createCloudContext({
      env: 'env-00jx4obkh2l9'
    });
    await context.init();
    my.cloudFunction = context;
    my.setStorageSync({key: '_id', data: '658428204950fd82ff91e8d8'})
    
    this.getCases()
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
});

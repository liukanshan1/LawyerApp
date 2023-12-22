Page({
  data: {
    page_top_height: 0,
    isEncrypt: false
  },
  onLoad() {
    const app=getApp()
      const height=app.globalData.page_top_height
      console.log(height)
      this.setData({
        page_top_height:height
      })
  },
  encrypt(e){
    this.setData({
      isEncrypt: !this.data.isEncrypt
    })
    console.log(this.data.isEncrypt);
  }
});

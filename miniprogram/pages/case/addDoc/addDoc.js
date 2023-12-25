Page({
  data: {
    isEncrypt: false
  },
  onLoad() {
  },
  encrypt(e){
    this.setData({
      isEncrypt: !this.data.isEncrypt
    })
    console.log(this.data.isEncrypt);
  }
});

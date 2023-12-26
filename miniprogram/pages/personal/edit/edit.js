Page({
  data: {
    name: "",
    address: "",
    lawyerOfficeName: "",
    lawyerNum: "",
    startTime: "08:00",
    endTime: "18:00"
  },
  onLoad() {
  },
  inputName(e){
    this.setData({
      name: e.detail.value
    })
  },
  inputAddress(e){
    this.setData({
      address: e.detail.value
    })
  },
  inputLawyerOfficeName(e){
    this.setData({
      lawyerOfficeName: e.detail.value
    })
  },
  inputLawyerNum(e){
    this.setData({
      lawyerNum: e.detail.value
    })
  },
  startInput(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  endInput(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  cancel(){
    my.navigateBack()
  },
  save(){
    let id = my.getStorageSync({key: "_id"}).data
    my.cloudFunction.callFunction({
      name:"updateUserInfo",
      data: {
        id: id,
        name: this.data.name,
        // avatar: "",
        address: this.data.address,
        nickName: this.data.name,
        lawyerOfficeName: this.data.lawyerOfficeName,
        lawyerNum: this.data.lawyerNum,
        activeTime: `${this.data.startTime}-${this.data.endTime}`
      },
      success: (res) => {
        console.log('me', res);
        this.setData({
          info: res.result.data
        })
        my.hideLoading()
        my.navigateBack()
      },
      fail: function(res) {
        console.log('fail', res);
      }
    })
  }
});

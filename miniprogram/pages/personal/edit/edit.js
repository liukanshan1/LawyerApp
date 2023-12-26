Page({
  data: {
    name: "",
    address: "",
    lawyerOfficeName: "",
    lawyerNum: "",
    startTime: "08:00",
    endTime: "18:00",
    telephone: "",
    gender: "男",
    genderItems: [
      { name: '男', value: '男', checked: true},
      { name: '女', value: '女'}
    ],
    career: "",
    isLawyer: false
  },
  onLoad(e) {
    this.setData({
      isLawyer: e.isLawyer === "0" ? false : true
    })
  },
  inputName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  inputLawyerOfficeName(e) {
    this.setData({
      lawyerOfficeName: e.detail.value
    })
  },
  inputLawyerNum(e) {
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
  inputTelephone(e){
    this.setData({
      telephone: e.detail.value
    })
  },
  inputCareer(e){
    this.setData({
      career: e.detail.value
    })
  },
  genderChange(e){
    console.log(e.detail.value);
    this.setData({
      gender: e.detail.value
    })
  },
  cancel() {
    my.navigateBack()
  },
  save() {
    let id = my.getStorageSync({
      key: "_id"
    }).data
    let requestData = {}
    if (this.data.isLawyer) {
      requestData = {
        id: id,
        name: this.data.name,
        address: this.data.address,
        nickName: this.data.name,
        lawyerOfficeName: this.data.lawyerOfficeName,
        lawyerNum: this.data.lawyerNum,
        activeTime: `${this.data.startTime}-${this.data.endTime}`
      }
    } else {
      requestData = {
        id: id,
        name: this.data.name,
        address: this.data.address,
        telephone: this.data.telephone,
        gender: this.data.gender,
        career: this.data.career
      }
    }
    my.cloudFunction.callFunction({
      name: "updateUserInfo",
      data: requestData,
      success: (res) => {
        console.log('me', res);
        this.setData({
          info: res.result.data
        })
        my.hideLoading()
        my.navigateBack()
      },
      fail: function (res) {
        console.log('fail', res);
      }
    })
  }
});
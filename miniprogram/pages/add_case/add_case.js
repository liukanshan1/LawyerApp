Page({
  data: {
    selectdate: "2023-11-30",
    label: [{
      name: "诉讼案",
      style: "label_style1"
    }, {
      name: "仲裁案",
      style: "label_style2"
    }, {
      name: "劳动争议仲裁案",
      style: "label_style3"
    }, {
      name: "法律顾问",
      style: "label_style2"
    }, {
      name: "非诉讼",
      style: "label_style3"
    }],
    label_index: 0,
    role: ["被告", "原告"],
    roleIndex: 1,
    process: ["test", "test1"],
    processIndex: 0,
    reason_input: "",
    remark_input: "",
    name_focus:false,
    name_items:["zz","jj"]
  },
  async onLoad() {
    const context = await my.cloud.createCloudContext({
      env: 'env-00jx4obkh2l9'
    });
    await context.init();
    my.cloudFunction = context;
    
    // my.cloudFunction.callFunction({
    //   name: "getUserByName",
    //   data: {
    //     name: "律师"
    //   },
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // })
  },
  dateChange(e) {
    // console.log(e.detail);
    this.setData({
      selectdate: e.detail.value
    })
    // this.$page.setDate1(this.data.selectdate,this.props.name)
  },
  changeLabel(e) {
    this.setData({
      label_index: e.currentTarget.dataset.i
    })
  },
  roleChange(e) {
    this.setData({
      roleIndex: e.detail.value
    })
  },
  processChange(e) {
    this.setData({
      processIndex: e.detail.value
    })
  },
  reason_input(e) {
    this.setData({
      reason_input: e.detail.value
    })
  },
  remark_input(e) {
    this.setData({
      remark_input: e.detail.value
    })
  },
  cancel(e) {
    my.cloudFunction.callFunction({
      name: "getUserByName",
      data: {
        name: "律师"
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res.result)
      }
    })
  },
  confirm(e) {
    fake={"_id":"65869fd0017aa11e26001ffe","title":"40404离婚纠纷","isDone":0,"_openid":"081N9i_gPYAMzmxIwMx8I3936GkOFXEg9YWayBl9MH8Gpwa","userIds":["658428204950fd82ff91e8d8","658584160f8bdfbed7423e86"],"caseType":0,"lawyerId":"658428204950fd82ff91e8d8","caseReason":"离婚纠纷","createTime":1703417547823,"processIds":[1,2,3,4,6,8],"isPlaintiff":true,"caseSerialNumber":"123","oppositePartyName":"小红","caseDescription":""}
  },
  name_focus(e){
    this.setData({
      name_focus:true
    })
  },
  name_blur(e){
    this.setData({
      name_focus:false
    })
  }
});
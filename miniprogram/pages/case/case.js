Page({

  data: {
    page_top_height:0,
    case_type_list:["诉讼案","仲裁案","劳动争议仲裁案","法律顾问","非诉讼"],
    processLabels: ["审理法院","拟定法院文书","客户盖章确认","第一次洽谈","第二次洽谈"],
    tab_index: 0,
    caseList: []
    // case_num:2,
    // case_item:[{
    //   name:"xxx人格纠纷案",
    //   info_line:[{info_name:"案件是否完结",value:"否"},
    //              {info_name:"案件编号",value:"20210517"},
    //              {info_name:"案由",value:"人格权纠纷"},
    //              {info_name:"创建时间",value:"2023.10.30"},
    //              {info_name:"案件类型",value:"诉讼案"}]
    // },
    // {
    //   name:"xxx人格纠纷案",
    //   info_line:[{info_name:"案件是否完结",value:"否"},
    //              {info_name:"案件编号",value:"20210517"},
    //              {info_name:"案由",value:"人格权纠纷"},
    //              {info_name:"创建时间",value:"2023.10.30"},
    //              {info_name:"案件类型",value:"诉讼案"}]
    // }],
    },
    async onLoad() {
      const app=getApp()
      const height=app.globalData.page_top_height
      console.log(height)
      this.setData({
        page_top_height:height
      })
      my.hideBackHome({
        success:res=>{
          console.log("success")
        }
      });
      my.setNavigationBar({
        backgroundColor: '#FFFFFF', // 想使用frontColor 这个字段必填
        frontColor: '#000000' // 设置文字及状态栏电量、日期等文字颜色
      })

      // const context = await my.cloud.createCloudContext({
      //   env: 'env-00jx4obkh2l9'
      // });
      // await context.init();
      // my.cloudFunction = context;
      // my.setStorageSync({key: '_id', data: '658428204950fd82ff91e8d8'})
    },
    onShow(){
      this.getCases()
    },
    changeTab(e){
      console.log(e);
      this.setData({
        tab_index: e.currentTarget.dataset.i
      })
      this.getCases()
    },
    formatDate(time){
      let date = new Date(time);
      let YY = date.getFullYear();
      let MM = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1);
      let DD = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
      
      return YY + '-' + MM + '-' + DD
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
    toCaseDetail(e){
      let index = e.currentTarget.dataset.i
      my.navigateTo({
        url: `/pages/case_detail/case_detail?caseId=${this.data.caseList[index]._id}`
      })
    },
    goAddCase(e){
      my.navigateTo({
        url:"/pages/add_case/add_case"
      })
    }
  })

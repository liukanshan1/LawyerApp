Page({

  data: {
    page_top_height:0,
    case_type_list:["诉讼案","仲裁案","劳动争议仲裁案","法律顾问","非诉讼"],
    processLabels: ["诉前保全","起诉","等待法院受理","受理","驳回起诉","审理","撤诉","庭前准备"],
    tab_index: 0,
    caseList: []
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
      //this.getProcesses()
      this.getCases()
    },
    changeTab(e){
      console.log(e);
      //this.getProcesses()
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
    getProcesses(){
      my.cloudFunction.callFunction({
        name:"getProcesses",
        data:{
          type: this.data.tab_index
        },
        success: (res)=>{
            console.log("获取进程全表",res)
            let temp = []
            res.result.data.forEach(item=>{
              temp.push(item.processName)
            })
            this.setData({
              processLabels: temp
            })
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

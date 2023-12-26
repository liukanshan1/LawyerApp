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
    processIndex: 0,
    reason_input: "",
    remark_input: "",
    name_focus:false,
    name_items:[
    ],
    exist_item:{},
    party:[],
    opposite_input_temp:"",
    opposite_name:[],
    query_content:"",
  },
  async onLoad() {
    // const context = await my.cloud.createCloudContext({
    //   env: 'env-00jx4obkh2l9'
    // });
    // await context.init();
    // my.cloudFunction = context;
    let date=new Date()
    let today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    this.setData({
      selectdate:today
    })
    
    
    // my.setStorage({
    //   key:"myId",
    //   data:{
    //     id:"658584160f8bdfbed7423e86"
    //   }
    // })
    // console.log(my.getStorage("myId"))
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
    my.navigateBack();
  },

  async confirm(e) {
    let userId=[];
    let myId=my.getStorageSync({key: "_id"}).data
    let opname=this.data.opposite_name.join('、')
    let form={
      isDone:0,
      userIds:userId,
      lawyerId:myId,
      caseType:this.data.label_index,
      caseReason:this.data.reason_input,
      createTime:new Date(this.data.selectdate).getTime(),
      isPlaintiff:this.data.roleIndex,
      oppositePartyName:opname,

    }
    for(const i in this.data.exist_item){
      // console.log(i)
      userId.push(this.data.exist_item[i].id)
    }
    userId.push(myId)
    
    

    
    console.log(form)
    let flag=true;
    console.log(userId.length)
    if(this.data.reason_input.length==0){
      flag=false
      my.showToast({
        content:"案由未填",
        type:"fail",
        duration:1000,
        success:function(e){
          flag=false
        }
      })
    }else if(userId.length==0){
      flag=false
      my.showToast({
        content:"当事人未选择",
        type:"fail",
        duration:1000,
        success:function(e){
          flag=false
        }
      })
    }else if(opname==""){
      flag=false
      my.showToast({
        content:"对方当事人未输入",
        type:"fail",
        duration:1000,
        success:function(e){
          
        }
      })
    }
    // console.log(form)
    // console.log(await this.callForm(form));
    if(flag){
      // return
      // console.log(userId)
      await this.callForm(form);
  }
  },
  callForm(form){
    // return new Promise(
    //   (resolve,reject)=>{
    //     resolve(form)
    // }
    // )
    return new Promise(
      (resolve,reject)=>{
        my.cloudFunction.callFunction({
          name:"addCase",
          data:{
            isDone:0,
            lawyerId:form.lawyerId,
            userIds:form.userIds,
            caseType:form.caseType,
            caseReason:form.caseReason,
            createTime:new Date(this.data.selectdate).getTime(),
            isPlaintiff:form.isPlaintiff,
            oppositePartyName:form.oppositePartyName,
            processIds:[],
          },
          success:function(res){
            console.log(res)
            my.cloudFunction.callFunction({
              name:"addMessage",
              data:{"userIds":form.userIds, "caseId":res.result.data, "content":"创建了一个案件"},
              success:function(e){
                console.log(e)
              },
              fail:function(e){
                console.log(e)
              }
            })
            // my.alert("案件提交成功！")
            my.showToast({
              content:"提交成功",
              type:"success",
              duration:"1000",
              success:function(e){
    
                // my.redirectTo({
                //   url:"/pages/homepage/homepage"
                // })
                my.navigateBack()
              }
            })
        },
        fail:function(res){
          console.log(res)
        }
        })
      }
    )
    
  },
  name_focus(e){
    this.setData({
      name_focus:true
    })
  },
  name_blur(e){
    
    this.setData({
      name_focus:false,
      query_content:""

    })
  },
  select_items(e){
    this.setData({
      query_content:""
    })
    console.log(e.currentTarget.dataset.i)
    let index=e.currentTarget.dataset.i
    let data=this.data
    let exist=data.exist_item
    if(exist[data.name_items[index].id]==null||exist[data.name_items[index].id].exist==false){
      exist[data.name_items[index].id]={
        name:data.name_items[index].name,
        exist:true,
        id:data.name_items[index].id
      }
      this.setData({
        exist_item:exist
      })
    }
    
  },
  cancel_item(e){
    console.log(e.currentTarget.dataset.i)
    let item=e.currentTarget.dataset.i
    item.exist=false
    let exist=this.data.exist_item
    exist[item.id]=item
    this.setData({
      exist_item:exist
    })
  },
  opposite_input(e){
    console.log(e.detail.value)
    this.setData({
      opposite_input_temp:e.detail.value
    })
  },
  add_opposite(e){
    let temp=this.data.opposite_input_temp
    let name_list=this.data.opposite_name
    name_list.push(temp)
    this.setData({
      opposite_name:name_list,
      opposite_input_temp:""
    })
  },
  cancel_opposite_item(e){
    let name_list=this.data.opposite_name
    name_list.splice(e.currentTarget.dataset.i,1)
    this.setData({
      opposite_name:name_list
    })
  },
  name_input(e){
    console.log(e.detail.value)
    this.setData({
      query_content:e.detail.value
    })
    if(e.detail.value==""){
      this.setData({
        name_focus:false,
        name_items:[],
        
      })

      return
    }
    this.setData({
      name_focus:true
    })
    let that=this;
    my.cloudFunction.callFunction({
      name:"getUserByName",
      data:{
        "name":e.detail.value
      },
      success:function(res){
        console.log(res)
        let ans=[]
        for(let a of res.result){
          let n=a.name;
          if(a.name==null||a.name==undefined){
            n=a.nickname
          }
          ans.push({
            name:n,
            id:a._id,
          })
        }
        console.log(ans)
        that.setData({
          name_items:ans
        })
      },
      fail:function(res){
        console.log(res)
      }
    })
  }
});
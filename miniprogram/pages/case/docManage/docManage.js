Page({
  data: {
    files: [
      {
        name: "子文件夹1"
      },
      {
        name: "子文件夹2"
      },
      {
        name: "子文件夹3"
      },
      {
        name: "子文件夹4"
      },
      {
        name: "子文件夹5"
      },
      {
        name: "子文件夹66666666666666"
      },
    ],
    list:null,
  },
  onLoad(e) {
    console.log(e.caseId)
    this.setData({
      caseId:e.caseId
    })
    let that=this
    my.cloudFunction.callFunction({
      name:"getDir",
      success:function(res){
        console.log(res)
        let data=res.result.data
        that.setData({
          list:data
        })
        // let list = new Map
        // let a=[]
        // list.set(1,1)
        // let flag=0
        // let sset=new Set();
        // for(const i in data){
        //   console.log(data)
        //   // let stage=data[i].stage
        //   // sset.add(stage)
        //   if(list.get(data[i].stage)==null){
        //     // console.log(1)
        //     list.set(data[i].stage,[])
        //     list.get(data[i].stage).push(data[i])
        //     console.log(list.get(data[i].stage))
        //     a.push(data[i].stage)
        //   }else{
        //     console.log(2)
        //     list.get(data[i].stage).push(data[i])
        //     flag=1
        //   }
        //   console.log(list.get(data[i].stage))
          
        // }
        // console.log(list)
        // that.setData({
        //   list:a
        // })
        // for(const i of sset){
          
        // }
        // for(const i in data){
        // }
      }
    })
  },
  selectDir(e){
    console.log(e.currentTarget.dataset.id)
    let caseId=this.data.caseId
    // my.cloudFunction.callFunction({
    //   name:"getPhotos",
    //   data:{
    //     caseId:caseId,
    //     dirId:e.currentTarget.dataset.id,
    //   },
    //   success:function(res){
        
    //   }
    // })
    my.navigateTo({
      url:"/pages/case/photoList/photoList?caseId="+caseId+"&dirId="+e.currentTarget.dataset.id
    })
  },
});

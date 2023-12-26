Page({
  data: {},
  async onLoad(e) {
    my.showLoading()
    console.log(e.caseId)
    console.log(e.dirId)
    this.setData({
      caseId:e.caseId,
      dirId:e.dirId,
    })
    // let that=this
    // my.cloudFunction.callFunction({
    //   name:"getPhotos",
    //   data:{
    //     caseId:e.caseId,
    //     dirId:e.dirId,
    //   },
    //   success:function(res){
    //     console.log(res)
    //     that.setData({
    //       list:res.result
    //     })
    //     for(const i of res.result){
    //       my.cloudFunction.downloadFile({
    //         fileID:i.path,
    //         success:function(res){
    //           res.tempFilePath
    //         }
    //       })
    //     }
    //   }      
    // })
    let photos=await this.get_photo(e.caseId,e.dirId)    
    this.setData({
      list:photos.result
    })
    let l=[]
    for(const i of photos.result){
      l.push(await this.download_photo(i.path))
    }
    my.hideLoading()
    this.setData({
      path_list:l
    })
        
  },

download_photo(path){
    return new Promise(
      (resolve,reject)=>{
        my.cloudFunction.downloadFile({
          fileID:path,
          success:function(res){
            resolve(res.tempFilePath)
          }
        })
      }
    )
  }
,
 get_photo(caseId,dirId){
    return new Promise(
      (resolve,reject)=>{
        my.cloudFunction.callFunction({
          name:"getPhotos",
          data:{
            caseId:caseId,
            dirId:dirId,
          },
          success:function(res){
            resolve(res)
          }
        })
      }
    )
  },

  onhold_main(){

  },
  selectPhoto(e){
    // console.log(e.currentTarget.dataset.path)
    // my.cloudFunction.downloadFile({
    //   fileID:e.currentTarget.dataset.path,
    //   success:function(e){
    //     console.log(e)
    //     my.previewImage({
    //       urls:[e.tempFilePath,e.tempFilePath],
    //       current:e.currentTarget.dataset.index,
    //       enablesavephoto:true,
    //       // fileType:"png",
    //       success:function(){
    //         console.log("开香槟咯")
    //       },
    //       fail:function(){
    //         console.log(0)
    //       }
    //     })
    //   }
    // })
    my.previewImage({
      urls:this.data.path_list,
      current:e.currentTarget.dataset.index,
      enablesavephoto:true,
      success:function(){
        console.log("开香槟咯")
        },
        fail:function(){
          console.log(0)
        }
    })
  },
  addDoc(e){
    my.navigateTo({
      url:"/pages/case/addDoc/addDoc?caseId="+this.data.caseId+"&dirId="+this.data.dirId
    })
  }
});

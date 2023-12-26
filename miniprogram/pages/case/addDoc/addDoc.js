Page({
  data: {
    isEncrypt: false,
    fileName:"",
    title_hint:"上传案件图片"
  },
  onLoad(e) {
    this.setData({
      caseId:e.caseId,
      dirId:e.dirId,
    })
  },
  encrypt(e){
    this.setData({
      isEncrypt: !this.data.isEncrypt
    })
    console.log(this.data.isEncrypt);
  },
  uploadImage(e){
    let that=this
    my.chooseImage({
      count:1,
      success: res => {
        that.setData({
          title_hint:"图片加载完毕，点击\"上传\""
        })
    my.showToast({
      content:"上传成功",
      duration:1000,
      type:"success",
      
    })
    that.setData({
      file_path:res.apFilePaths[0]
    })
    
  }})},
  nameInput(e){
    this.setData({
      fileName:e.detail.value
    })
  },
  create(e){
    console.log("开始")
    const fs = my.getFileSystemManager();
    let that=this
    console.log("半场")
    my.cloudFunction.uploadFile({
      // name:"uploadFile",
      cloudPath:that.data.caseId+"/"+that.data.dirId+"/"+that.data.fileName+".png",
      filePath:that.data.file_path,
      success: (res)=>{
        console.log(res)
        my.cloudFunction.callFunction({
          name:"addPhoto",
          data:{
            fileName:that.data.fileName+".png",
            // base64:base64,
            caseId:that.data.caseId,
            dirId:that.data.dirId,
          },
          success:function(res){
            console.log(res)
            my.showToast({
              content:"上传完毕",
              type:"success",
              duration:1000,
              success:function(e){
                my.navigateBack()
              }
            });
          },
          fail:function(e){
            console.log(e)
          }
        })
      }})
    // fs.readFile({
      
    //   filePath: `${}`,
    //   // readFile 不传入 encodding 参数，则以 ArrayBuffer 方式读取
    //   success:({ data }) => {
    //     const base64 = my.arrayBufferToBase64(data);
      
        
    //       data:{
    //         fileName:that.data.fileName+".png",
    //         base64:base64,
    //         caseId:that.data.caseId,
    //         dirId:that.data.dirId,
    //       },
    //       success:function(res){
    //         console.log("开香槟")
    //         console.log(res)
    //         my.showToast({
    //           content:"上传完毕",
    //           type:"success",
    //           duration:1000,
    //           success:function(e){
    //             my.navigateBack()
    //           }
    //         });
    //       },
    //       fail:function(e){
    //         console.log(e)
    //         my.showToast({
    //           content:"上传失败",
    //           type:"fail",
    //           duration:2000,
    //           // success:function(e){
    //           //   my.navigateBack()
    //           // }
    //         });
    //       }
    //     })
    // }
  },
  cancel(e){
    my.navigateBack()
  }
});

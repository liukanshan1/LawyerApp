Page({
  data: {
    isEncrypt: false,
    fileName:""
  },
  onLoad() {
  },
  encrypt(e){
    this.setData({
      isEncrypt: !this.data.isEncrypt
    })
    console.log(this.data.isEncrypt);
  },
  uploadImage(e){
    my.chooseImage({
      count:1,
      success: res => {
    const fs = my.getFileSystemManager();
    fs.readFile({
      filePath: `${res.apFilePaths[0]}`,
      // readFile 不传入 encodding 参数，则以 ArrayBuffer 方式读取
      success:({ data }) => {
        const base64 = my.arrayBufferToBase64(data);
        my.cloudFunction.callFunction({
          name:"uploadFile",
          data:{
            fileName:that.data.fileName,
            base64:base64,
            caseId:that.data.caseId,
            dirId:that.data.dirId,
          }
        })
    }
  })
  }})},
  nameInput(e){
    this.setData({
      fileName:e.detail.value
    })
  }
});

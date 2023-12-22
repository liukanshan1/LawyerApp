const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  if(event.messageId){
    let message = await db.collection('message').doc(event.messageId).update({
      data: {
        is_read: true,
      }
    });
  }else{
    return {
      success: false,
      message: 'messageId is required'
    };
  }
  // 返回成功信息
  return {
    success: true,
    message: '已设置消息已读！'
  };
}
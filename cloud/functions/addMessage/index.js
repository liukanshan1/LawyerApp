const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  const sendTime = new Date();
  // 格式化时间为字符串
  const formattedTime = sendTime.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  let newMessage = await db.collection('message').add({
    data:{
      content: event.content,
      is_read: false,
      send_time: formattedTime,
      user_id: event.userId,
      case_id: event.caseId,
    }
  });
  if(!newMessage){
    return {
      success: false,
      message: '消息添加失败！'
    };
  }
  return {
    success: true,
    message: '消息添加成功！'
  };
}
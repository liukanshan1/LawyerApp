const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  let messageList;
  let userId = event.userId;
  unRead = event.unRead;
  // 根据传入的用户id查询用户信息
  if (userId) {
    if(unRead){
      messageList = await db.collection('message').where({
        user_id: userId,
        is_read: false
      }).get();
    }else{
      messageList = await db.collection('message').where({
        user_id: userId
      }).get();
    }
  } else {
    messageList = {
      success: false,
      message: 'userId is required'
    };
  }
  //根据event查询用户名字
  var user = await db.collection('user').doc(userId).get();
  user_name = user.nickName;
  // 遍历messageList，删去user_id属性，添加user_name属性
  for (var i = 0; i < messageList.length; i++) {
    messageList[i].user_name = user_name;
    delete messageList[i].user_id;
    var user_case = await db.collection('case').doc(messageList[i].case_id).get();
    messageList[i].case_name = user_case.case_reason;
    delete messageList[i].case_id;
  }
  return messageList;
}

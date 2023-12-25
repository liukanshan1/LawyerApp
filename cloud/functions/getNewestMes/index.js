const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  let messageList = [];
  let userId = event.userId;
  unRead = event.unRead;
  var user = await db.collection('user').doc(userId).get();
  user_name = user.nickName;
  caseIds = user.caseIds;
  console.log(caseIds);
  // 根据传入的用户id查询用户信息
  if (userId) {
    if(unRead){
      for (var i = 0; i < caseIds.length; i++) {
        // 找到最新的未读消息
        message = await db.collection('message').where({
          user_id: userId,
          case_id: caseIds[i],
          is_read: false
        }).orderBy('send_time', 'desc').limit(1).get();
        console.log(message);
        messageList = messageList.concat(message);
      }
    }else{
      for (var i = 0; i < caseIds.length; i++) {
        // 找到最新的消息
        message = await db.collection('message').where({
          user_id: userId,
          case_id: caseIds[i]
        }).orderBy('send_time', cloud.Sort.DESC).limit(1).get();
        messageList = messageList.concat(message);
      }
    }
  } else {
    messageList = {
      success: false,
      message: 'userId is required'
    };
  }
  //根据event查询用户名字
  // 遍历messageList，删去user_id属性，添加user_name属性
  for (var i = 0; i < messageList.length; i++) {
    messageList[i].userName = user_name;
    delete messageList[i].user_id;
    var user_case = await db.collection('case').doc(messageList[i].case_id).get();
    messageList[i].caseName = user_case.caseReason;
    console.log(user_case)
    messageList[i].title = user_case.title;
    messageList[i].caseId = messageList[i].case_id;
    delete messageList[i].case_id;
    messageList[i].isRead = messageList[i].is_read;
    delete messageList[i].is_read;
    messageList[i].sendTime = messageList[i].send_time;
    delete messageList[i].send_time;

  }
  return messageList;
}

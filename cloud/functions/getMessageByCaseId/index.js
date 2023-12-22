const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();

  let messageList;
  let userId = event.userId;
  let caseId = event.caseId;
  let unRead = event.unRead;
  // 根据传入的用户id查询用户信息
  if (userId && caseId) {
    if(unRead){
      messageList = await db.collection('message').where({
        user_id: userId,
        case_id: caseId,
        is_read: false
      }).get();
    }else{
      messageList = await db.collection('message').where({
        user_id: userId,
        case_id: caseId
      }).get();
    }
  } else {
    messageList = {
      success: false,
      message: 'userId and caseId is required'
    };
  }
  //根据event查询用户名字
  var user = await db.collection('user').doc(userId).get();
  userName = user.nickName;
  var userCase = await db.collection('case').doc(caseId).get();
  caseName = userCase.case_reason;
  // 遍历messageList，删去user_id属性，添加user_name属性
  for (var i = 0; i < messageList.length; i++) {
    messageList[i].user_name = userName;
    messageList[i].case_name = caseName;
    delete messageList[i].user_id;
    delete messageList[i].case_id;
  }
  return messageList;
}

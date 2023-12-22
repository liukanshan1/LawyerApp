const crypto = require('crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();

  // 根据传入的用户id查询用户信息
  
  let userList;

  let openId = event.openId;

  if (openId) {
    userList = await db.collection('user').where({
      openId: openId
    }).get();
  } else {
    userList = {
      success: false,
      message: 'openId is required'
    };
  }

  return userList;

}
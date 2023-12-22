const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();

  let userId = event.userId;

  if (!userId) {
    return {
      success: false,
      message: 'userId is required'
    };
  }else{
    const userList = await db.collection('user').where({
      _id: userId
    }).get();
    console.log('当前查询的user信息:', userList);
    return {
      success: true,
      data: userList
    };
  }

};
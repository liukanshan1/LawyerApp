const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  if (!event) {
    return {
      success: false,
      message: '请传入参数'
    };
  }
  var customerId = [];
  var customerName = [];
  for (var i = 0; i < event.userIds.length; i++) {
    if(event.lawyerId == event.userIds[i]) continue;
    customerId.push(event.userIds[i]);
  }
  await db.collection('user').where({
    _id: db.command.in(customerId)
  }).field({
    name: true,
  }).get().then(res => {
    customerName = res.data;
  });

  // 向 collection 添加 doc
  const doc = await db.collection('case').add({
    data: event,
  });
  await db.collection('user').where({
    _id: db.command.in(customerId)
  }).update({
    data: {
      caseId: db.command.push(doc._id)
    }
  });
  return {
    success: true,
    data: doc._id,
  };
};
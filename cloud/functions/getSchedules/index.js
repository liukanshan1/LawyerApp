const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

const getCollectionName = () => {
  return 'cl-' + crypto.randomBytes(5).toString('hex');
};

exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  const user =await db.collection("user").where({
    _id:event.userId
  }).get();
  if(user.length==0) return null;
  const scheduleIds = user[0].scheduleIds;
  const schedules = await db.collection("schedule").where({
      _id : db.command.in(scheduleIds)
  }).get();
  return schedules;
};
const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

const getCollectionName = () => {
  return 'cl-' + crypto.randomBytes(5).toString('hex');
};

exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  if (!event.caseId) {
    return {
      success: false,
      message: 'caseId 不能为空'
    }
  }
  const docList = await db.collection('schedule').where({
    caseId: event.caseId,
  }).get();
  
  return { success: true, data: docList };
};
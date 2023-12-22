const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

const getCollectionName = () => {
  return 'cl-' + crypto.randomBytes(5).toString('hex');
};

exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  // 生成 collection 名称
  const collectionName = getCollectionName();
  console.log('新建 collection:', collectionName);
  
  const count = await db.collection('cusProcess').doc(event._id).remove();
  if (count === 0) {
    return {
      success: false,
      message: '删除失败'
    }
  }
  return { success: true };
};
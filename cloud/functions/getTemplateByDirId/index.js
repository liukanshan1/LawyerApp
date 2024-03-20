const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  const docList = await db.collection("template").where({
    directoryId : event.directoryId
  }).get();
  console.log('当前 collection 中的 doc 列表:', docList);
  
  return { 
    success: true,
    data:docList 
  };
};
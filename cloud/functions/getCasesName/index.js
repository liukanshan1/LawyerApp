const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  console.log(event);
  // 查询 collection 中的 doc 列表，默认返回 100 条
  const doc = await db.collection('user').field({
    caseIds: true
  }).where({
    _id: event.userId,
  }).get();
  console.log('当前caseIds:', doc);
  if (doc.length === 0) {
    return {
      success: false,
      msg: "用户不存在"
    };
  }
  if (doc[0].caseIds === undefined||doc[0].caseIds.length===0) {
    const temp =await db.collection('case').doc('6586cd7aa7218fc18680bf44').get();
    console.log('当前 collection 中的 doc 列表:', temp);
    return {
      success: true,
      data: [temp]
    };
  }
  const docList = await db.collection('case').where({
    _id: db.command.in(doc[0].caseIds),
  }).field({
    title: true,
    _id: true
  }).get();
  console.log('当前 collection 中的 doc 列表:', docList);
  return {
    success: true,
    data: docList
  };
  
};
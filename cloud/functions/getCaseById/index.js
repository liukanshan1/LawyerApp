const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

const getCollectionName = () => {
  return 'cl-' + crypto.randomBytes(5).toString('hex');
};

exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  console.log(event.caseId)
  // 查询 collection 中的 doc 列表，默认返回 100 条
  const aCase = await db.collection("case").where({
    _id: event.caseId
  }).get();
  console.log('当前 collection 中的 doc 列表:', aCase);
  const users = await db.collection("user").field({
    name:true,
    is_lawyer:true,
    avatar:true,
    is_plaintiff:true
  }).where({
    id:db.command.in(aCase.user_ids)
  }).get();
  console.log("用户List：",users)
  return { case: aCase,users: users };
};
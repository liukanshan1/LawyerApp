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
  
  // 新建 collection
  const collection = await db.createCollection(collectionName);
  console.log('新建 collection id:', collection.coll_id);
  
  // 向 collection 添加 doc
  const doc = await db.collection(collectionName).add({
    data: {
      class: 'one',
      done: false,
    },
  });
  console.log('新建 doc id:', doc._id);
  
  // 查询 collection 中的 doc 列表，默认返回 100 条
  const docList = await db.collection(collectionName).get();
  console.log('当前 collection 中的 doc 列表:', docList);
  
  // 更新 docId 对应 doc 的内容
  const res = await db.collection(collectionName).doc(doc._id).update({
    data: {
      done: true,
    },
  });
  console.log(`成功更新 ${res.count} 个 doc`, res.count);
  
  return { message: '示例运行成功，请在运行日志中查询详情' };
};
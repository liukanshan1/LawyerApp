const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

const getCollectionName = () => {
  return 'cl-' + crypto.randomBytes(5).toString('hex');
};

exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  if(!event){
    return{
      success:false,
      message:"参数为空"
    };
  }
  const doc = await db.collection("user").field({
    name:true,
    nickname:true
  }).where({
    _id:db.command.in(event.ids)
  }).get();

  return { 
    success:true,
    data:doc
   };
};
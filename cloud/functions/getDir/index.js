const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

const getCollectionName = () => {
  return 'cl-' + crypto.randomBytes(5).toString('hex');
};

exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  const docList = await db.collection("directory").get()
  let data=docList
  //将相同的stage合并成一个list
  let map = new Map();
  for(let i=0;i<data.length;i++){
    let item=data[i]
    if(map.get(item.stage)){
      map.get(item.stage).push(item)
    }else{
      map.set(item.stage,[item])
    }
  }
  const keys = map.keys();
  let list = []
  for(let key of keys){
    list.push({
      stage:key,
      list:map.get(key)
    })
  }
  return { success: true,data:list };
};
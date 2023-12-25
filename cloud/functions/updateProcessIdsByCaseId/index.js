const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');


exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  if(!event){
    return {
      success:false,
      message:"请传入参数"
    }
  }
  //根据案件id插入案件的processIds数组
  const caseId = event.caseId
  const processId = event.processId
  const caseDoc = await db.collection('case').where({
    _id: caseId
  }).get()
  const processIds = caseDoc[0].processIds
  processIds.push(processId)
  await db.collection('case').doc(caseDoc[0]._id).update({
    data: {
      processIds: processIds
    }
  })
  
  return { success: true};
};
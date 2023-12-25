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
  // 插入日程表
  const scheduleId = await db.collection("schedule").add({
    data: event
  });
  // 用户添加日程
  db.collection("user").where({
    _id:db.command.in(event.userIds)
  }).get().then(res=>{
    console.log(res);
    res.forEach(doc =>{
      const newIds = doc.scheduleIds.concat(scheduleId._id);
      // 更新用户的日程数组
      db.collection("user").doc(doc._id).update({
        data:{
          scheduleIds: newIds
        }
      });
    })
  });
  return {success:true,data:scheduleId._id};
};
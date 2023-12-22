const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  // 根据传入的用户信息创建用户
  // 根据openId查询用户是否存在
  let userList = await db.collection('user').where({
    openId: event.openId
  }).get();
  // 如果存在则返回信息：用户已存在
  if (userList && userList.length > 0) {
    return {
      success: false,
      message: '用户已存在'
    };
  } else {
    // 如果不存在则创建用户
    let user = await db.collection('user').add({
      data:{
        name: event.name,
        openId: event.openId,
        avatar: event.avatar,
        address: event.address,
        nickName: event.nickName,
        isLawyer: false,
        caseIds: [],
        lawyerNum: -1,
        activeTime: "9:00-19:00",
        isPlaintiff: false,
        scheduleIds: [],
        lawyerOfficeName: "",
      }
    }
    );
    // 返回用户信息
    return {
      success: true,
      message: '用户创建成功'
    };
  }
};
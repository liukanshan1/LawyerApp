const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  // 根据传入的用户信息修改用户信息
  id = event.id;
  let user = await db.collection('user').doc(id).update({
    data: {
      name: event.name,
      avatar: event.avatar,
      address: event.address,
      nickName: event.nickName,
    }
  });
  // 返回成功信息
  return {
    success: true,
    message: '用户信息修改成功'
  };
};

const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  let name = event.name;
  // name为用户的name或者nickName，故需要同时查询两个字段，并作模糊查询
  var user = await db.collection('user').where({
    name: db.RegExp({
      regexp: name,
      options: 'i',
    }),
  }).get();
  var user2 = await db.collection('user').where({
    nickName: db.RegExp({
      regexp: name,
      options: 'i',
    }),
  }).get();
  user = user.concat(user2);
  return user;
}
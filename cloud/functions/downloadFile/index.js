const fs = require('fs');
const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  let photoId = event.photoId;
  const temp = await db.collection('template').doc(photoId).get();
  var fileID = temp.fileID;
  const res = await cloud.downloadFile({
    fileID: fileID,
  });
  console.log(res);
  return res.fileContent.toString('base64');
};
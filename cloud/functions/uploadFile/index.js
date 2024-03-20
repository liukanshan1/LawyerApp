const fs = require('fs');
const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {
  cloud.init();
  fileName = event.fileName;
  base64 = event.base64;
  fileContent = Buffer.from(base64, 'base64');
  caseId = event.caseId;
  dirId = event.dirId;
  // 拼接成caseId/dirId/fileName
  fileName = caseId + '/' + dirId + '/' + fileName;
  // 写入云环境
  const result = await cloud.uploadFile({
    cloudPath: fileName,
    fileContent
  });
  photo = {
    caseId: caseId,
    dirId: dirId,
    path: result.fileID,
    photoName: event.fileName,
  };
  // 写入数据库
  const db = cloud.database();
  const res = await db.collection("photo").add({
    data: photo
  });
  let photoId = res._id;
  result.photoId = photoId;
  return {
    success: true,
    data: result
  };
};

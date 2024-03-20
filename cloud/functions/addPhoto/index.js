const fs = require('fs');
const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  env = cloud.getAlipayContext().ENV;
  let fileName = event.fileName;
  let caseId = event.caseId;
  let dirId = event.dirId;
  // 拼接成caseId/dirId/fileName
  path = "cloud://" + env + "/"  + caseId + '/' + dirId + '/' + fileName;
  const newPhoto = await db.collection("photo").add({
    data: {
      path: path,
      photoName: fileName,
      caseId: caseId,
      dirId: dirId
    }
  });
  return {
    success: true,
    data: newPhoto._id
  };
};

const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {
  cloud.init();
  let photoList;
  const db = cloud.database();
  let caseId = event.caseId;
  let dirId = event.dirId;
  photoList = await db.collection('photo').where({
    caseId: caseId,
    dirId: dirId
  }).get();
  for (var i = 0; i < photoList.length; i++) {
    photoList[i].photoId = photoList[i]._id;
    delete photoList[i]._id;
    delete photoList[i]._openid;
    delete photoList[i].caseId;
    delete photoList[i].dirId;
  }
  return photoList;
}
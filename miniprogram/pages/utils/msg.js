var { request } = require('./http')

function getMsg(id){
  return request('/message/getMessageListByUserId/' + id)
}
module.exports = {
  getMsg
}
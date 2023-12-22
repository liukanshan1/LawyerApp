var { request } = require('./http')

function getMe(){
  return request('/user/me','GET')
}
function getById(id) {
  return request('/user/queryUserInfoById/' + id)
}
module.exports = {
  getMe,
  getById,
}

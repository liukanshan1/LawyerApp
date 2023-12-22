var BASE_URL = 'http://119.91.73.179:7554'
console.log('token', my.getStorageSync({ key: 'token' }).data);
function request(url, method, data, contentType = 'application/json') {
  return new Promise((resolve, reject) => {
    my.request({
      url: BASE_URL + url,
      data: data,
      method: method,
      //添加请求头
      header: {
        'Content-Type': contentType,
        'Authorization':  my.getStorageSync({ key: 'token' }).data
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

module.exports = {
  request
}
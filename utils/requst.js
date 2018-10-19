let serverPath = 'https://www.xiaochengzi.xyz';
export function post(url, body) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverPath + url,
      data: body,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        resolve(res.data)
      },
      fail: function (ret) {
        reject(ret)
      }
    })
  })
}
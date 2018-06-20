var base = 'http://test.kanlouyi.com'
// var base = 'https://h5.kanlouyi.com'
module.exports = {
  httpGet: function (url, params = {}){
    if (!url) {
      return false
    }
    wx.request({
      url: base + url, //仅为示例，并非真实的接口地址
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log({url, params, res})
        if (res.data.code === 200) {
          let data = res.data.data
          return data
        }else {

        }
      },
      fail: function (error) {
        console.log({ url, params, error })
      }
    })
  },

  httpPost: function (url, params = {}) {
    if (!url) {
      return false
    }
    wx.request({
      url: base + url, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log({ url, params, res })
        if (res.data.code === 200) {
          let data = res.data.data
          return data
        } else {

        }
      },
      fail: function (error) {
        console.log({ url, params, error })
      }
    })
  }

}
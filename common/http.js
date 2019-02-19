module.exports = {
  httpGet: function (url, params = {}) {
    if (!url) {
      return false
    }
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: params,
      success: function (res) {
        console.log({ url, params, res })
        if (res.data.code === 200) {
          let data = res.data.data
          return data
        } else if (res.data.errcode === 2) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else if (res.data.errcode === 401) {
          wx.navigateTo({
            url: '/pages/auth/auth',
          })
        } else {
          wx.showToast({
            title: data,
            icon: 'none'
          })
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
      url: url, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: params,
      success: function (res) {
        console.log({ url, params, res })
        if (res.data.code === 200) {
          let data = res.data.data
          return data
        } else if (res.data.errcode === 2) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else if (res.data.errcode === 401) {
          wx.navigateTo({
            url: '/pages/auth/auth',
          })
        } else {
          wx.showToast({
            title: data,
            icon: 'none'
          })
        }
      },
      fail: function (error) {
        console.log({ url, params, error })
      }
    })
  }

}
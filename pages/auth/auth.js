// pages/auth/auth.js
const app = getApp()
const API = require('../../common/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromUrl: '',
    isLogin: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fromUrl: options.url || '',
      isLogin: options.isLogin || true
    })
    
  },

  /**
 * 点击授权按钮
 */
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮， 登录发送数据到后台
      app.globalData.userInfo = e.detail.userInfo
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          let params = {
            code: res.code,
            userInfo: e.detail.userInfo
          }
          wx.request({
            url: API.auth,
            data: params,
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: (res) => {
              if (res.data.code === 200) {
                let data = res.data.data
                if (data.status === 1) {
                  wx.setStorage({
                    key: 'token',
                    data: data.token
                  })
                  wx.showToast({
                    title: '授权成功',
                    icon: 'none'
                  })
                  // 如果需要手机登录，跳转到手机登录页，如果不需要，跳转回原来的页面
                  setTimeout(() => {
                    if (this.data.isLogin) {
                      wx.redirectTo({ url: '/pages/login/login' })
                    } else {
                      wx.redirectTo({ url: this.data.fromUrl })
                    }
                  }, 1500)
                } else {
                  wx.showToast({
                    title: '登录失败',
                    icon: none
                  })
                }
              }
            },
            fail: function (res) {
              console.log('fail::', res)
            }
          })
        }
      })
    } else {
      //用户按了拒绝按钮
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
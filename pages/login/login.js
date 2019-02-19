const API = require('../../common/api')
const app = getApp()
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      mobile: '',
      verifyCode: ''
    },
    codeBtnName: '获取验证码',
    codeBtnDisable: false,
    codeMinutes: 60,
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

/**
 * 登录
 */
  formSubmit: function (e) {
    console.log(e.detail)
    this.setData({
      params: e.detail.value
    })
    if (!this.check(true)) {
      return
    }
    wx.getStorage({
      key: 'token',
      success: (res) => {
        this.setData({
          token: res.data
        })
        let url = API.login + '?token=' + this.data.token
        wx.request({
          url: url,
          data: this.data.params,
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: (res) => {
            if (res.data.code == 200) {
              wx.showToast({
                title: res.data.data,
                icon: 'none'
              })
              setTimeout(() => {
                console.log('setTimeout')
                wx.switchTab({ url: '/pages/index/index' })
              }, 1500)
            } else if (res.data.errcode === 2) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            } else if (res.data.errcode === 401) {
              wx.showToast({
                title: res.data.data,
                icon: 'none'
              })
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/auth/auth',
                })
              }, 1500)
            } else {
              wx.showToast({
                title: res.data.data,
                icon: 'none'
              })
            }
          }
        })
      }
    })
  },

  /**
   * 获取验证码
   */
  getCode: function() {
    var that = this
    if (!this.check(false)) {
      return
    }
    var changeCodeTime = function() {
      setTimeout(function() {
        that.setData({
          codeBtnDisable: true,
          codeMinutes: that.data.codeMinutes - 1,
          codeBtnName: '已发送(' + that.data.codeMinutes + 's)'
        })
        if (that.data.codeMinutes >= 1) {
          changeCodeTime()
        } else {
          that.setData({
            codeBtnDisable: false,
            codeMinutes: 60,
            codeBtnName: '重新发送'
          })
        }
      }, 1000)
    }
    wx.request({
      url: API.code,
      data: that.data.params,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        if (res.data.code == 200) {
          changeCodeTime()
          wx.showToast({
            title: res.data.data,
            icon: 'none'
          })
        }
      }
    })
  },

  check: function (isVerifyCode) {
    if (this.data.codeBtnDisable && !isVerifyCode) {
      return
    }
    if (!this.data.params.mobile) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return false
    }
    if (/^^((13[0-9])|(15[^4])|(18[0235-9])|(17[0-8])|(147))\d{8}$$/.test(this.data.params.mobile) === false) {
      wx.showToast({
        title: '手机号码格式错误',
        icon: 'none'
      })
      return false
    }
    if (!this.data.params.verifyCode && isVerifyCode) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return false
    }
    return true
  },

  bindKeyInput: function (e) {
    this.setData({
      ['params.mobile']: e.detail.value
    })
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
// pages/auth/auth.js
const app = getApp()
const API = require('../../common/api')
const http = require('../../common/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromUrl: '',
    barHeight: app.globalData.barHeight,
    codeBtnName: '获取验证码',
    codeBtnDisable: false,
    codeMinutes: 60,
    mobile: '',
    verifyCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fromUrl: decodeURIComponent(options.fromUrl) || ''
    })
    console.log("this.data.fromUrl::", this.data.fromUrl)
  },

  /**
 * 点击授权按钮
 */
  bindGetUserPhone: function (e) {
    let userRes = e.detail
    //用户按了允许授权按钮， 登录发送数据到后台
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let params = {
          code: res.code,
          encryptedData: userRes.encryptedData,
          iv: userRes.iv
        }
        this.auth(params)
      }
    })
  },

/**
 * 微信手机号一键登录
 */
  auth(params) {
    http.wxRequest({
      url: API.bindMobile,
      params: params,
      method: 'POST',
      success: (data) => {
        if (this.data.fromUrl === '/pages/user/user' || this.data.fromUrl === '/pages/experts/experts') {
          wx.reLaunch({ url: this.data.fromUrl })
        } else {
          wx.redirectTo({ url: this.data.fromUrl })
        }
      },
      fail: function (res) {
        console.log('fail::', res)
      }
    })
  },

  /**
   * 获取验证码
   */
  getCode(e) {
    //阻止事件冒泡
    let mobile = this.data.mobile.trim()
    if (!mobile) {
      wx.showToast({
        title: '您还没有填写手机号码',
        icon: 'none'
      })
      return false
    }
    if (/^^(1)\d{10}$$/.test(mobile) === false) {
      wx.showToast({
        title: '手机号码格式错误',
        icon: 'none'
      })
      return false
    }
    this.setData({
      codeBtnDisable: true
    })
    let changeCodeTime = () => {
      setTimeout(() => {
        this.setData({
          codeBtnDisable: true,
          codeMinutes: this.data.codeMinutes - 1,
          codeBtnName: '已发送(' + this.data.codeMinutes + 's)'
        })
        if (this.data.codeMinutes >= 1) {
          changeCodeTime()
        } else {
          this.setData({
            codeBtnDisable: false,
            codeMinutes: 60,
            codeBtnName: '重新发送'
          })
        }
      }, 1000)
    }
    http.wxRequest({
      url: API.userGetCode,
      params: { mobile: mobile },
      method: 'POST',
      success: (data) => {
        changeCodeTime()
      }
    })
  },

/**
 * 绑定手机号
 */
  formSubmit: function (e) {
    let mobile = e.detail.value.mobile.trim()
    let verifyCode = e.detail.value.verifyCode.trim()
    if (!mobile) {
      wx.showToast({
        title: '您还没有填写手机号码',
        icon: 'none'
      })
      return false
    }
    if (/^^(1)\d{10}$$/.test(mobile) === false) {
      wx.showToast({
        title: '手机号码格式错误',
        icon: 'none'
      })
      return false
    }
    if (!verifyCode) {
      wx.showToast({
        title: '请先填写验证码',
        icon: 'none'
      })
      return false
    }
    http.wxRequest({
      url: API.userUpdateMobile,
      params: { mobile: mobile, verifyCode: verifyCode},
      method: 'POST',
      success: (data) => {
        wx.showToast({
          title: '授权成功',
          icon: 'none'
        })
        setTimeout(() => {
          if (this.data.fromUrl === '/pages/user/user') {
            wx.reLaunch({ url: this.data.fromUrl })
          } else {
            wx.redirectTo({ url: this.data.fromUrl })
          }
        }, 1500)
      }
    })
  },
  bindMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
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
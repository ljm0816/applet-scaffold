// pages/houseNews/houseNews.js
var API = require('../../common/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseNewsHeight: 0,
    params: {
      lp_id: null,
      page: 1,
      limit: 10
    },
    houseNews: [
      {
        addtime: '2018-05-31 22:29:00',
        con:'与自己对话，与灵魂对话，如果你喜欢带带的读书，中外故事，经典童话，亲子共度时光，沧海碧波，天地悠悠吧，借一杯酒，爱恨两种，天地广阔，相思谁与共，心中不留一丝惶恐，在你手里握住了明天，系于万千，谁是谁曾经的原点，在一瞬间温柔了双眼。'
      }
    ],
    totalPage: 0,
    allCount: 0,
    allLoaded: false,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWindowHeight()
   // this.getHouseNews()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 获取楼盘动态
   */
  getHouseNews: function () {
    let that = this
    if (that.data.allLoaded) {
      return false
    }
    that.setData({
      loading: true
    })
  
    wx.request({
      url: API.lpnews,
      header: {
        'content-type': 'application/json'
      },
      data: that.data.params,
      success: function (res) {
        console.log('楼盘动态::', res.data)
        if (res.data.code === 200) {
          that.setData({
            loading: false
          })
          let data = res.data.data
          data.list.forEach(function(item, index){
            item.showAll = false
          })
          that.setData({
            houseNews: that.data.houseNews.concat(data.list),
            allCount: data.total,
            totalPage: Math.ceil(data.total / that.data.params.limit),
            ['params.page']: (that.data.params.page + 1)
          })
          if (that.data.params.page > that.data.totalPage) {
            that.setData({
              allLoaded: true
            })
          }
        } else {
          wx.showToast({
            title: res.data.error,
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 是否展示全部
   */
  isShowAll: function (e) {
    let that = this
    console.log(e)
    let id = e.currentTarget.dataset.id
    this.data.houseNews.forEach(function (item, index) {
      if (item.id == id) {
        that.setData({
          ['houseNews[' + index + '].showAll']: !that.data.houseNews[index].showAll
        })
      }
    })
  },

  getWindowHeight: function () {
    let that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          houseNewsHeight: res.windowHeight
        })
      }
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
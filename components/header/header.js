// components/header/header.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentPages: {
      type: Number,
      value: 1
    },
    isShare: {
      type: Number || String,
      value: 0
    },
    title: {
      type: String,
      value: '房知了'
    },
    showHome: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    barHeight: app.globalData.barHeight,
    currentPages: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready: function () {
    this.setData({
      currentPages: getCurrentPages().length
    })
    console.log('header currentPages::', this.data.currentPages)
  }
})

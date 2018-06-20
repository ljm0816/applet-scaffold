// pages/house/house.js
var http = require('../../common/http')
var API = require('../../common/api')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    houseListHeight: 0,
    windowHeight: 0,
    topHeight: 0,
    selectedMore: '',
    houseList: [],
    filterObj: {
      area:[
        { 
          id: 1, 
          post_value:'南沙',
          show_value:'南沙'
        },
        {
          id: 2,
          post_value: '越秀',
          show_value: '越秀'
        },
        {
          id: 3,
          post_value: '天河',
          show_value: '天河'
        },
        {
          id: 4,
          post_value: '黄埔',
          show_value: '黄埔'
        },
        {
          id: 5,
          post_value: '海珠',
          show_value: '海珠'
        }
      ]
    },
    isScroll: true,
    tempParams: {
      area: '',
      lp_sell_status: '',
      lP_tags: '',
      lp_type: '',
      rooms: [],
      price: '',
      price_type: 1
    },
    selectedParams: {
      area: null,
      price: null,
      type: null,
      tags: null,
      status: null,
      rooms: []
    },
    params: {
      keywords: '',
      area: '',
      lp_sell_status: '',
      lP_tags: '',
      lp_type: '',
      rooms: '',
      total_price: '',
      unit_price: '',
      price: '',
      page: 1,
      limit: 10
    },
    totalPage: 0,
    allCount: 0,
    allLoaded: false,
    loading: true,
    selectedfilter: {
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.keywords) {
      this.setData({
        ['params.keywords']: options.keywords
      })
    }
    this.getWindowHeight()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得popup组件
    this.area = this.selectComponent("#area")
    this.resetFiexd()
  },
  
  resetFiexd: function () {
    let that = this
    var topHeight = 0  //第一部分的高度
    var pageHeight = 0 //页面的高度
     
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#top-part').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      // console.log(res)
      //取高度
      topHeight = res[0].height
      // 可使用窗口宽度、高度
      let secondPartHeight = that.data.windowHeight - topHeight
      that.setData({
        houseListHeight: secondPartHeight,
        topHeight: topHeight
      })
      // console.log("houseListHeight:", that.data.houseListHeight, "topHeight:", topHeight)
    })
  },

  getWindowHeight: function () {
    let that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
  },

  /**
   * 选择区域
   */
  selectArea: function (e) {
    this.setData({
      ['tempParams.area']: e.currentTarget.dataset.area
    })
  },

  /**
   * 选择价格
   */
  selectPrice: function (e) {
    this.setData({
      ['tempParams.price']: e.currentTarget.dataset.price
    })
  },

  /**
  * 删除选中的帅选条件
  */
  delFilter: function (e) {
    let that = this
    let del = e.currentTarget.dataset.del
    if (del == 'keywords') {
      this.setData({
        ['params.keywords']: ''
      })
    }
    if (del == 'area') {
      this.setData({
        ['selectedParams.area']: '',
        ['tempParams.area']: ''
      })
    }
    if (del == 'price') {
      this.setData({
        ['selectedParams.price']: '',
        ['tempParams.price']: ''
      })
    }
    if (del == 'type') {
      this.setData({
        ['selectedParams.type']: '',
        ['tempParams.type']: ''
      })
    }
    if (del == 'tags') {
      this.setData({
        ['selectedParams.tags']: '',
        ['tempParams.tags']: ''
      })
    }
    if (del == 'status') {
      this.setData({
        ['selectedParams.status']: '',
        ['tempParams.status']: ''
      })
    }
    if (del == 'rooms') {
      let room = e.currentTarget.dataset.room
      let remain = []
      this.data.selectedParams.rooms.forEach(function(item,index) {
        if (room.post_value == item.post_value) {
        } else {
          remain.push(item)
        }
      })
      this.data.filterObj.rooms.forEach(function (item, index) {
        if (room.post_value == item.post_value) {
          that.setData({
            ['filterObj.rooms[' + index + '].selected']: false
          })
        } 
      })
      this.setData({
        ['selectedParams.rooms']: remain
      })
    }
    this.resetFiexd()
    this.getHouseList(true)
  },

  /**
  * 上拉加载更多
  */
  loadMore: function () {
    
  },

  /**
   * 设置参数
   */
  setParams: function (){
    this.setData({
      ['params.area']: this.data.selectedParams.area ? this.data.selectedParams.area.post_value : '',
      ['params.lp_type']: this.data.selectedParams.type ? this.data.selectedParams.type.post_value : ''
    })

    if (this.data.selectedParams.price) {
      if (this.data.tempParams.price_type == 1) {
        this.setData({
          ['params.total_price']: this.data.selectedParams.price.post_value
        })
      } else {
        this.setData({
          ['params.unit_price']: this.data.selectedParams.price.post_value
        })
      }
    } else {
      this.setData({
        ['params.total_price']: '',
        ['params.unit_price']: ''
      })
    }

    if (this.data.selectedParams.rooms.length > 0) {
      let roomIds = ''
      this.data.selectedParams.rooms.forEach(function(item, index){
        roomIds += (item.post_value + ',')
      })
      roomIds = roomIds.substring(0,roomIds.length-1)
      this.setData({
        ['params.rooms']: roomIds
      })
    } else {
      this.setData({
        ['params.rooms']: ''
      })
    }

    if (this.data.selectedParams.tags) {
      this.setData({
        ['params.lp_tags']: this.data.selectedParams.tags.post_value
      })
    } else{
      this.setData({
        ['params.lp_tags']: ''
      })
    }

    if (this.data.selectedParams.status) {
      this.setData({
        ['params.lp_sell_status']: this.data.selectedParams.status.post_value
      })
    } else {
      this.setData({
        ['params.lp_sell_status']: ''
      })
    }
  },

  showArea: function (e) {
    // 打开popup
    this.area.showPopup(e)
  },

  /**
   * 区域清空
   */
  emptyArea: function (e) {
    this.area.showPopup(e)
    this.setData({
      ['tempParams.area']: this.data.selectedParams.area,
      isScroll: true
    })
  },

  /**
   * 选择区域
   */
  confirmArea: function (e) {
    this.area.showPopup(e)
    this.setData({
      ['selectedParams.area']: this.data.tempParams.area,
      isScroll: true
    })
    this.resetFiexd()
    this.getHouseList(true)
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
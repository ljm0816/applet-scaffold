Component({
  /**
   * 组件的属性列表
   */
  properties: {
    parentHeight: {
      type: Number,
      value: 125
    },
    content: {
      type: String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowAll: true,
    showHandleBtn: true, // 是否显示'展开'/'收起'按钮
    btnText: '查看全部',
    parentHeight: 0,
    overflow: 'hidden',
    contentParentH: 0
  },

  ready: function () {
    this.setData({
      contentParentH: this.data.parentHeight
    })
    this.getContentHeight()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 获取文字容器的高度
     */
    getContentHeight: function () {
      let that = this
      //创建节点选择器
      var query = this.createSelectorQuery();
      //选择id
      query.select("#content").boundingClientRect()
      let contentHeight = 0
      query.exec(function (res) {
        console.log('content::', res)
        contentHeight = res[0].height
        if (that.data.parentHeight < contentHeight * 2) {
          that.setData({
            isShowAll : false,
            showHandleBtn: true
          })
        } else {
          that.setData({
            isShowAll: true,
            showHandleBtn: false
          })
        }
      })
    },
    /**
     * 展开，收起
     */
    showAll() {
      this.setData({
        isShowAll: !this.data.isShowAll,
      })
      if (this.data.btnText == '查看全部') {
        this.setData({
          btnText: '收起',
          overflow: 'auto',
          contentParentH: null
        })
      } else {
        this.setData({
          btnText: '查看全部',
          overflow: 'hidden',
          contentParentH: this.data.parentHeight
        })
      }
    }
  }
})

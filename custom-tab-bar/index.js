Component({
  data: {
    selected: 0,
    selectedColor: "#0078D8",
    list: [
      {
        "pagePath": "/pages/index/index",
        "iconPath": "/assets/img/home.png",
        "selectedIconPath": "/assets/img/home-active.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/poster/poster",
        "iconPath": "/assets/img/user.png",
        "selectedIconPath": "/assets/img/user-active.png",
        "text": "生成海报"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      if (data.index === 2){
        wx.navigateToMiniProgram({
          appId: 'wx90e6c70dcfd70d2f'
        })
      } else {
        // wx.switchTab({ url })
        wx.reLaunch({ url })
      }
      this.setData({
        selected: data.index
      })
    }
  }
})
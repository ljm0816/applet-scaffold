// components/navTab/navTab.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: "自定义标题"
        },
        customBackStyle: {
            type: Boolean,
            value: false
        },
        iconStyle: { // 1透明，2黑色，3白色
            type: Number,
            value: 1
        },
        hack: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        navHeight: 62,
        realNavHeight:56,
        navTitleHeight: 30,
        navTop: 0,
        back: false,
        home: false
    },

    ready: function () {
        this.setNavTab()
        this.setBackStatus()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 头部导航栏自适应
         */
        setNavTab() {
            let that = this
            // 获取胶囊位置信息
            let menuButtonObject = wx.getMenuButtonBoundingClientRect();
            wx.getSystemInfo({
                success(res) {
                    let statusBarHeight = res.statusBarHeight;
                    let navTop = menuButtonObject.top;
                    let realNavHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight);
                    let navHeight = realNavHeight + 6
                    that.setData({
                        navHeight: navHeight,
                        navTitleHeight: menuButtonObject.height,
                        navTop: navTop,
                        realNavHeight: realNavHeight
                    })
                    wx.setStorageSync('navTabInfo', { navHeight: navHeight,  navTitleHeight: menuButtonObject.height, navTop: navTop, realNavHeight: realNavHeight})
                }
            })
        },
        setBackStatus() {
            let pages = getCurrentPages()
            // console.log(pages);
            let index = pages.length - 2 >= 0 ? pages.length - 2 : 0
            this.setData({
                back: pages.length >= 2 ? true : false,
                home: pages[index].route.indexOf('pages/home/home') === -1 ? true : false
            })  
        },
        goBack() {
            wx.navigateBack({
              delta: 0,
            })
        },
        goHome() {
            wx.reLaunch({
              url: '/pages/home/home',
            })
        }
    }
})

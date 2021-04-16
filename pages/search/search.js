const createRecycleContext = require('miniprogram-recycle-view')
const app = getApp()
import { axios, API } from '../../common/http.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        parentHeight: 164, // 单位是rpx
        contentParentH: 0,
        contentWidth: 0,
        contentHeight: 0,
        isShowAll: false,
        showHandleBtn: true, // 是否显示'展开'/'收起'按钮
        historyList: [],
        breakpoint: 10,
        headerParams: '',
        showClear: false,
        keyWord: '',
        page: 1,
        pageSize: 20,
        totalPage: 10,
        loaded: false,
        focus: false,
        classStyle: '',
        scrollHeight: 0,
        clickHistoryPanel: false, 
        searchHistoryHeight: 57,
        from: ''
    },
    /**
     * 清除
     */
    clearInput: function (e) {
        this.setData({
            keyWord: ''
        })
        this.getRealMoreHeight(true)
    },
    /**
     * 搜索框获取焦点
     */
    handleFocus: function (e) {
        this.setData({
            showClear: true,
            focus: true
        })
        this.setData({
            historyList:  wx.getStorageSync('historyList') || []
        }) 
        if(!this.data.keyWord) {
            this.getRealMoreHeight(true)
        }  
    },
    /**
     * 搜索框失去焦点
     */
    handleBlur: function (e) {
        setTimeout(() => {
            this.setData({
                showClear: false,
                focus: false
            })
        }, 100)
    },
    getKeyword: function (e) {
        this.setData({
            keyWord: e.detail.value
        })
        if(!e.detail.value) {
            this.getRealMoreHeight(true)
        }
    },
    /**
     * 处理搜索历史的 展开 -> 收起
     */
    handleMore: function (noSetShowAll) {
        if (this.data.parentHeight < this.data.contentHeight) {
            if(!noSetShowAll) {
                this.setData({
                    isShowAll:false,
                })
            }
            this.setData({
                showHandleBtn: true
            })
        } else {
            this.setData({
                showHandleBtn: false
            })
        }
    },
    /**
     * 重新计算parentHeight的高度
     */
    resetParentHeight: function(row) {
        if (!row) {
            return false
        }
        let rowHeight = this.data.contentHeight / row
        if (row >=2 && rowHeight > 0 && this.data.parentHeight !== rowHeight * 2) {
            this.setData({
                parentHeight:  rowHeight * 2
            })
        }
    },
    getRealMoreHeight: function(noSetShowAll) {
        let that = this  
        const query = wx.createSelectorQuery()
        query.select('#container').boundingClientRect()
        query.exec(function (res) {
            let historyList = wx.getStorageSync('historyList') || []
            if (res[0].width === 0 && historyList.length > 0) {
                that.getRealMoreHeight()
            } else  {
                that.setData({
                    contentHeight: res[0].height * 2,
                    contentWidth: res[0].width * 2
                })
                that.countHistoryItem(noSetShowAll)
                that.handleMore(noSetShowAll)
            }  
        })
    },

    countHistoryItem: function(noSetShowAll) {
        let that = this
        const query = wx.createSelectorQuery()
        query.selectAll('.opacity-item').boundingClientRect()
        query.exec( (res) => {
            let row = 1 // 第一行
            let width = 0
            let currentIndex = 10
            let oldWidth = 0
            let falg = false
            res[0].forEach((item, index) => {
                oldWidth = width
                width = width + (item.width * 2 + 14)
                // 如果是第二行
                if (width > that.data.contentWidth) {
                    width =  item.width * 2 + 20 // 换行了
                    row++
                    if (row === 3) {
                        falg = true
                        currentIndex = index -1
                        if (oldWidth + 133 > that.data.contentWidth) {
                            currentIndex--
                        }
                        if (!noSetShowAll || !this.data.isShowAll) {
                            that.setData({
                                breakpoint: currentIndex
                            })
                        }
                        // console.log(this.data.breakpoint, currentIndex)
                        wx.setStorageSync('breakpoint', currentIndex)
                    }
                }
            })
            // 如果没有超过两行
            // if (!falg) {
            //     that.setData({
            //         breakpoint: res[0].length
            //     })
            //     wx.setStorageSync('breakpoint', res[0].length)
            // }
            // 
            this.resetParentHeight(row)
            console.log(this.data.breakpoint, currentIndex)
        })
    },
    showMore: function() {
        this.setData({
            isShowAll: !this.data.isShowAll,
        })
        if (this.data.isShowAll) {
            this.setData({
                breakpoint: 10,
            })
        } else {
            let index =  wx.getStorageSync('breakpoint')
            index ? index = parseInt(index) : index = 10
            this.setData({
                breakpoint: index,
            })
        }
    },
    /**
     * 搜索
     */
    search: function() {
        if (!this.data.keyWord) {
            return
        }
        this.setData({
            page: 1
        })
        this.setHistory(this.data.keyWord)
    },
    /**
     *  接口查找数据
     */
    searchFiles: function () {
        this.setData({
            loaded: false
        })
        axios({
            method: 'post',
            data: {
            },
            url: API.searchFile
        }).then((res) => {
            this.setData({
                totalPage: Math.ceil(res.totalCount / 20),
                loaded: true
            })
            if (this.data.page === 1) {
                this.ctx.splice(0,  this.ctx.comp.sizeArray.length)
            }
             this.setData({
                totalPage: Math.ceil(res.totalCount / 20),
                loaded: true
            })
            res.attachmentFolderList.length > 0 ? this.ctx.append(res.attachmentFolderList) : ''
            res.attachmentInfoList.length > 0 ? this.ctx.append(res.attachmentInfoList) : ''
        })
    },
    /**
     * 历史搜索
     */
    historySearch: function(e) {
        let keyWord = e.currentTarget.dataset.keyword
        this.setData({
            keyWord: keyWord
        })
        this.search()
    },
    /**
     * 设置搜索历史，最多保留10个
     */
    setHistory: function(keyWord) {
        let list =  this.data.historyList
        let idx = list.indexOf(keyWord)
        if (idx != -1) {
            list.splice(idx, 1)
        }
        if (list.length === 10) {
            list.pop()
        }
        list.unshift(keyWord)
        wx.setStorageSync('historyList', list)
    },
    /**
     *  删除
     */
    deleteHistory: function() {
        wx.setStorageSync('historyList',  [])
        this.setData({
            historyList: [],
            showHandleBtn: false,
            isShowAll: false,
            breakpoint: 10
        })
    },
    classSelectOpen: function (e) {
        let navTabInfo = wx.getStorageSync('navTabInfo')
        this.setData({
            navTabInfo: navTabInfo
        })
        this.setData({
            classStyle: `top:${navTabInfo.navHeight * 2 + 120}rpx;`
        })
        this.getClassSelectTop()
       
        if (e.detail.active) {
            this.miniSelect.close()
        }  
    },
    /**
     *  获取筛选弹窗距离顶部的高度
     */
    getClassSelectTop: function (e) {
        const query = wx.createSelectorQuery()
        query.select('#js-class-select').boundingClientRect()
        query.exec( (res) => {
            this.setData({
                classStyle: 'top:' + (res[0].top + res[0].height) + 'px'
            })
        })
    },
    /**
     * 加载更多
     */
    loadMore: function() {
        // 已经加载完了
        if (this.data.page >= this.data.totalPage) {
            return
        }
        this.setData({
            page: this.data.page + 1
        })
        this.search()
    },
    getSearchHistoryHeight() {
        const query = wx.createSelectorQuery()
        query.select('#js-search-panel').boundingClientRect()
        query.exec((res) => {
            this.setData({
                searchHistoryHeight: res[0].bottom
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载 
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            historyList:  wx.getStorageSync('historyList') || [],
        })
        let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
        this.setData({
        scrollHeight: windowHeight
        })
        this.initRecycleView()
    },

    /**
     * 初始化长列表组件
     */
    initRecycleView() {
        let that = this
        this.ctx = createRecycleContext({
            id: `recycleSearchId${this.data.folderId}`,
            dataKey: `recycleList`,
            page: this,
            itemSize: function(item, index) {
                let height = (item.fileId || item.fileId == 0) ? that.ctx.transformRpx(205) : that.ctx.transformRpx(139)
                console.log('height::', height)
               return { 
                    width: that.ctx.transformRpx(720),
                    height: height
                }
            }
        })
    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getRealMoreHeight()
        this.getSearchHistoryHeight()
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
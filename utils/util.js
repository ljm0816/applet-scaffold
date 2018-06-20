const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取系统的宽和高
 */
const getWindowInfo = (that) => {
  // 获取系统信息
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth
      })
    }
  })
}

/**
 * 计算第二部分的高度, elemId='#top-panel'
 */
const resetFiexd = (elemId, that) => {
    var topHeight = 0  //第一部分的高度
    var pageHeight = 0 //页面的高度

    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select(elemId).boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      //取高度
      topHeight = res[0].height
      // 可使用窗口宽度、高度
      let secondPartHeight = that.data.windowHeight - topHeight
      that.setData({
        topHeight: topHeight,
        secondPartHeight: secondPartHeight
      })
    })
  }

module.exports = {
  formatTime: formatTime,
  getWindowInfo: getWindowInfo,
  resetFiexd: resetFiexd
}

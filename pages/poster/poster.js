// pages/poster/poster.js
// 生成海报的
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasImgs: {},
    canvasHeight: 0,
    canvasWidth: 0,
    canvasImage: '',
    showCanvas: false,
    detailObj: {
      answer:"你好，谢谢你的提问，让你久等了。↵↵对于你提出的问题，属于比较综合性且专业的问题，里面包含了：交易流程、房贷税费、法律风险等，我的知识面不一定能全部覆盖，不过我会尽力回答。↵↵首先，我们不妨假设一下↵一、以首套首贷为例，假设：↵【原价为150w】首付为45w，贷款金额为105w，首付最低为3成。↵【网签价为100w】首付为80w（30w+50w），贷款金额为70w，首付相当于为5.3成。↵↵二、经过对比，做低网签价：↵1、税费少了↵目前购房所产生的税费，在多数情况下，原业主会要求买家支付，所以你支付的税费会减少。↵↵2、月供少了↵虽然月供金额减少了，但是首付是增加了，相当于购房门槛高了，与一手的双合同情况相差无异。↵↵3、短期不确定性问题↵差价直接付给他个人，以什么的名义支付呢？如果是私人名义，那就与购房没有关联。↵↵因为这属于阴阳合同，一旦在交易过程中产生纠纷，有关部门也只能按网签价（合同价）计算相关的违约金。至于你们三方约定的阴阳合同，就需要你们私下解决，或走民事诉讼。↵↵4、未来不确定性问题↵目前购房的个人所得税有两种计算方式：↵↵一：计税价格的1%↵二：是房子买入价与卖出价差额的20%↵↵看哪种比较划算就选择哪一种；满5唯一的可以免该征个税。但将来计税政策会否改变呢？不知道，所以不排除你将来卖出的时候，差额税较高。↵↵5、建议↵不建议这样做，没有必要，对买卖双方都会存在风险。首付低一点不是更好吗？如果你很喜欢，非买不可，则：↵↵建议一、找房产类的专业律师把关。↵建议二、如业主不同意，则你宁愿总价加多一点儿，但按照正常的首付比例，正常的流程交易。↵↵以上，是我能想到的点，希望对你有所帮助。预祝你置业顺利！恭喜发财！",
      expert:"市场分析预测、政策解读、规划利好、地铁与房价、买入卖出时机、板块/地段/项目/具体户型分析",
      qas_title:"二手房网签价做低，是否可行？有什么风险？",
      question:"火哥你好，请教一下，我们看中一套二手房，业主主动建议我们可以把网签价做低，减少我们的税费，剩下的差价直接付给他个人。请问这样是否可行呢？有什么潜在的风险呢？",
      question_filter:"火哥你好，请教一下，我们看中一套二手房，业主主动建议我们可以把网签价做低，减少我们的税费，剩下的差价直接付给他个人。请问这样是否可行呢？有什么潜在的风险呢？",
      s_headimgurl_path:"https://m.gdfangpin.com//uploads/20190109/674d577dee46136d8862c6716690e1f8.jpeg",
      s_name:"火龙果",
      s_tags:"市场分析,买房建议",
      small_class:"买房风险",
      title:"知名房产博主",
    }
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
    this.loadImg('https://fcpdlpk.oss-cn-shenzhen.aliyuncs.com/apps/applet-wechat/quesbg-c.png', 'bgImg')
    this.loadImg('https://fcpdlpk.oss-cn-shenzhen.aliyuncs.com/apps/applet-wechat/fzl-code.jpg', 'codeImg')
    this.loadImg(this.data.detailObj.s_headimgurl_path, 'headImg')
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

  },

  /***
 * 加载图片
 */
  loadImg(url, key) {
    if (!url) {
      return false;
    }
    let that = this
    wx.downloadFile({
      url: url, // 仅为示例，并非真实的资源
      success(res) {
        if (res.statusCode === 200) {
          let imgs = that.data.canvasImgs || {}
          imgs[key] = res.tempFilePath
          that.setData({
            canvasImgs: imgs
          })
          // 图片加载完成后，开始绘制
          if (Object.keys(that.data.canvasImgs).length === 3) {
            that.setCanvasWidthHeight()
          }
        }
      },
      fail(err) {
        console.log('图片：', err)
      }
    })
  },

  creatContext() {
    let ctx = wx.createCanvasContext("postercanvas")
    // this.resetCanvasHeight(ctx)
    // 画出白色背景
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight)

    //绘制阴影
    ctx.setFillStyle('#fff')
    ctx.setShadow(0, 3, 17, '#888')
    ctx.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight)
    ctx.setShadow(0, 0, 0, '#fff')

    // 画背景图片
    if (this.data.canvasImgs['bgImg']) {
      ctx.drawImage(this.data.canvasImgs['bgImg'], 0, 0, this.data.canvasWidth, 200)
    }

    // 问题
    let question = this.data.detailObj.qas_title || this.data.detailObj.question
    if (question) {
      ctx.setTextAlign('left')
      ctx.setFillStyle('#fff')
      ctx.setFontSize(18)
      let x = this.data.canvasWidth * 0.1 // 文字的x轴的距离
      let y = 80 // 绘制字体距离canvas顶部初始的高度
      let textMaxWidth = this.data.canvasWidth * 0.8
      // this.drawText(ctx, question, x, y, textMaxWidth)
      this.clipText(ctx, question, x, y, textMaxWidth, 25, 25) //标题最多显示两行
    }

    //绘制头像
    if (this.data.canvasImgs['headImg']) {
      let imgWidth = 40    //绘制的头像宽度
      let imgHeight = 40  //绘制的头像高度
      let imgX = 30   //绘制的头像在画布上的位置
      let imgY = 180  //绘制的头像在画布上的位置

      ctx.save() //先保存绘制上下文，画完圆后要恢复
      ctx.beginPath() //开始绘制
      // 画个圆
      ctx.arc(imgWidth / 2 + imgX, imgHeight / 2 + imgY, imgWidth / 2, 0, Math.PI * 2, false)
      ctx.clip() //剪切，原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
      ctx.drawImage(this.data.canvasImgs['headImg'], imgX, imgY, imgWidth, imgHeight)
      ctx.restore() //恢复之前保存的绘图上下文状态,继续绘制
    }

    // 绘制名称 和 头衔
    if (this.data.detailObj.s_name && this.data.detailObj.title) {
      ctx.setFillStyle('#000')
      ctx.setFontSize(18)
      ctx.fillText(this.data.detailObj.s_name, 90, 207)
      let nameWidth = ctx.measureText(this.data.detailObj.s_name).width

      ctx.setFillStyle('rgba(178,186,190,1)')
      ctx.setFontSize(14)
      ctx.fillText(this.data.detailObj.title, 110 + nameWidth, 207)
    }

    // 绘制答案
    if (this.data.detailObj.answer) {
      ctx.setTextAlign('left')
      ctx.setFillStyle('#000')
      ctx.setFontSize(16)
      let x = this.data.canvasWidth * 0.1  // 文字的x轴的距离
      let y = 260 // 绘制字体距离canvas顶部初始的高度
      let textMaxWidth = parseInt(this.data.canvasWidth * 0.8)
      let lineH = 25
      let maxH = this.data.canvasHeight - 260 - 40 - 100 - 20
      this.clipText(ctx, this.data.detailObj.answer, x, y, textMaxWidth, lineH, maxH)
    }

    // 绘制小程序码
    if (this.data.canvasImgs['codeImg']) {
      let codeWidth = 100    //绘制的头像宽度
      let codeHeight = 100  //绘制的头像高度
      let codeX = 50   //绘制的头像在画布上的位置
      let codeY = this.data.canvasHeight - 100 - 20  //距离底部40px处
      ctx.drawImage(this.data.canvasImgs['codeImg'], codeX, codeY, codeWidth, codeHeight)
    }
    // 绘制
    ctx.setFillStyle('rgba(178,186,190,1)')
    ctx.setFontSize(14)
    ctx.fillText('长按小程序码查看详情', 180, this.data.canvasHeight - 75)
    ctx.fillText('分享来自房知了', 180, this.data.canvasHeight - 55)

    ctx.draw()
    // 等待canvas绘制完成再生成图片
    setTimeout(() => {
      this.makeCanvasImg()
    }, 1000)
  },
  /**
   * 多行显示文字
   */
  drawText(ctx, text, x, y, textMaxWidth, lineH) {
    let totalHeight = 0 // 多行文本的总高度
    let lineWidth = 0 // 每一行的长度
    let lastSubStrIndex = 0 // 每次开始截取的字符串的索引
    for (let i = 0; i < text.length; i++) {
      lineWidth += ctx.measureText(text[i]).width
      if ((lineWidth > textMaxWidth) || text[i] == '\n') {
        ctx.fillText(text.substring(lastSubStrIndex, i), x, y)
        lineWidth = 0
        y += lineH || 25
        totalHeight += (lineH || 25)
        lastSubStrIndex = i
      }
      if (i == text.length - 1) {
        ctx.fillText(text.substring(lastSubStrIndex, i + 1), x, y)
        totalHeight += (lineH || 25)
      }
    }
    return totalHeight
  },
  /**
   * 在固定高度中显示多行文字，如果超出高度，超出部分裁剪掉
   */
  clipText(ctx, text, x, y, textMaxWidth, lineH, maxH) {
    let totalHeight = 0 // 多行文本的总高度
    let arrText = text.split('\n')
    arrText.forEach((item) => {
      if (!item) {
        totalHeight += (lineH || 25)
        y += (lineH || 25)
        return false
      }
      if (maxH && (totalHeight >= maxH)) {
        return false
      }
      let lastSubStrIndex = 0 // 每次开始截取的字符串的索引
      let lineWidth = 0 // 每一行的长度
      for (let i = 0; i < item.length; i++) {
        lineWidth += ctx.measureText(item[i]).width
        if ((lineWidth > textMaxWidth)) {
          if (maxH && (totalHeight >= maxH)) {
            let rowText = item.substring(lastSubStrIndex, i - 3) + '...'
            ctx.fillText(rowText, x, y)
            break
          } else {
            ctx.fillText(item.substring(lastSubStrIndex, i), x, y)
            lastSubStrIndex = i
            lineWidth = 0
            totalHeight += (lineH || 25)
            y += (lineH || 25)
          }
        } else if (i == item.length - 1) {
          if (maxH && (totalHeight > maxH)) {
            // let rowText = item.substring(lastSubStrIndex, i - 2) + '...'
            ctx.fillText(item.substring(lastSubStrIndex, i + 1), x, y)
          } else {
            ctx.fillText(item.substring(lastSubStrIndex, i + 1), x, y)
            totalHeight += (lineH || 25)
            y += (lineH || 25)
          }
        }
      }
    })
  },
  /**
   * 计算多行文本的高度
   * text  文本
   * rowMaxWidth  每行的长度
   * lineH  每行的高度
   */
  countTextHeight(ctx, text, textMaxWidth, lineH) {
    let totalHeight = 0 // 多行文本的总高度
    let lineWidth = 0 // 每一行的长度
    let lastSubStrIndex = 0 // 每次开始截取的字符串的索引
    for (let i = 0; i < text.length; i++) {
      lineWidth += ctx.measureText(text[i]).width
      if ((lineWidth > textMaxWidth) || text[i] == '\n') {
        lineWidth = 0
        totalHeight += (lineH || 25)
        lastSubStrIndex = i

      }
      if (i == text.length - 1) {
        totalHeight += (lineH || 25)
      }
    }
    return totalHeight
  },
  /***
   * 设置canvas的width和height
   */
  setCanvasWidthHeight() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          canvasHeight: res.windowHeight,
          canvasWidth: res.windowWidth
        })
        this.creatContext()
        // this.creatContext2()
      }
    })
  },
  // 重置canvasHeight
  resetCanvasHeight(ctx) {
    ctx.setFontSize(14)
    let rowMaxWidth = parseInt(this.data.canvasWidth * 0.75)
    let lineH = 20
    let answerHeight = this.countTextHeight(ctx, this.data.detailObj.answer, rowMaxWidth, lineH) // 计算出答案的高度
    // 280是答案开始绘制的y位置；100是小程序码的高度；30是小程序码距离answer部分的top值；40是距离底部的距离
    let realCanvasH = 280 + answerHeight + 100 + 30 + 40
    //如果答案很长超过了windowHeight的高度，需要重新设置canvasHeight的高度
    if (realCanvasH > this.data.canvasHeight) {
      this.setData({
        canvasHeight: realCanvasH
      })
    }
  },
  /**
   * 生成图片
   */
  makeCanvasImg() {
    let that = this
    wx.canvasToTempFilePath({
      canvasId: 'postercanvas',
      quality: 1,
      fileType: 'jpg',
      destWidth: that.data.canvasWidth * 2,
      destHeight: that.data.canvasHeight * 2,
      success(res) {
        that.setData({
          canvasImage: res.tempFilePath
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  /**
   * 保存图片
   */
  saveCanvasImg() {
    let that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.canvasImage,
      success(res) {
        wx.showToast({
          title: '图片已保存',
        })
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生成海报
   */
  makePoster() {
    wx.showLoading({
      title: '海报生成中...',
      mask: true
    })
    let myInterval = setInterval(() => {
      if (this.data.canvasImage) {
        clearInterval(myInterval)
        this.showCanvasModal()
        wx.hideLoading()
      }
    }, 500)
  },
  showCanvasModal() {
    this.setData({
      showCanvas: true
    })
  },
  closeCanvasModal() {
    this.setData({
      showCanvas: false
    })
  },
})
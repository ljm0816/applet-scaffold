let animationShowHeight = 300
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  data: {
    isShow: false,
    obj: null
  },
  properties: {
    paddingTop: {
      type: Number,
      value: 0
    }
  },
  methods: {
    _cancelEvent(e) {
      //触发取消回调
      this.triggerEvent("cancelEvent")
      this.showPopup(e)
    },

    _confirmEvent(e) {
      //触发成功回调
      this.triggerEvent("confirmEvent")
      this.showPopup(e)
    },

    closePopup: function () {
      this.setData(
        {
          isShow: false,
          isScroll: true
        }
      )
    },

    showPopup(e) {
      var currentStatus = e.currentTarget.dataset.status;
      //如果已经是打开的状态了，就不需要在执行下面的代码
      if (currentStatus == "open" && this.data.isShow) {
        return;
      }
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      });

      this.animation = animation;

      animation.translateY(-300).step();

      this.setData({
        animationData: animation.export()
      });

      setTimeout(function () {
        // 执行第二组动画：Y轴不偏移，停  
        animation.translateY(0).step()
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
        this.setData({
          animationData: animation
        })
        //关闭抽屉  
        if (currentStatus == "close") {
          this.setData({
              isShow: false,
              isScroll: true
            });
        }
      }.bind(this), 200)

      // 显示抽屉  
      if (currentStatus == "open") {
        this.setData({
          isShow: true,
          isScroll: false
        });
      }
    },
    move: function () {
    }
  }
})

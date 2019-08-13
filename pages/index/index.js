//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    position: '定位中...'
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.userLocation']) {
          // wx.startLocationUpdate({
          //   success: function() {
          //     console.log('success')
          //   },
          //   fail: function() {
          //     console.log('fail')
          //   },
          //   complete: function() {
          //     console.log('complete')
          //   }
          // })
        }
      }
    })
    const self = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log('success', latitude)
        self.setData({
          position: '融科.蜂巢工厂'
        })
      },
      fail: function() {
        console.log('获取位置信息失败！')
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tapScan: function() {
    wx.scanCode({
      success: function(res) {
        var number = res.result
      }
    })
  },
  handleClick (event) {
    wx.navigateTo({
      url: '../../pages/postion/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })

    // wx.showLoading({
    //   title: '加载中',
    // })

    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success (res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail (res) {
    //     console.log(res.errMsg)
    //   }
    // })

    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
  }
})

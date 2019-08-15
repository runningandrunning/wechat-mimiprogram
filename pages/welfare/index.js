//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    list: [
      {
        name: '',
        status: ''
      },
      {
        name: '',
        status: ''
      },
      {
        name: '',
        status: ''
      },
      {
        name: '',
        status: ''
      },
      {
        name: '',
        status: ''
      },
      {
        name: '',
        status: ''
      }
    ],
    showLoading: false
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  onLoad: function () {
    this.setData({
      // logs: (wx.getStorageSync('logs') || []).map(log => {
      //   return util.formatTime(new Date(log))
      // })
    })

  },

  handleClick () {
    console.log('123')
    wx.pageScrollTo({
      scrollTop: 30,
      duration: 300
    })
  },
  onReachBottom () {
    this.setData({
      showLoading: true
    })
    console.log('下拉到最下面了~')
  },

  handleScroll () {
    this.setData({
      showLoading: true
    })

    // 线上环境接口需要进行配置
    wx.request({
      url: 'http://www.zhangdachun.vip/dbjb/user/code2Session',
      data: {
        code: '111'
      },
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res)
      },
      fail (error) {
        console.log(error)
      }
    })
  }
})

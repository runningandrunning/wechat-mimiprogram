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
    ],
    showLoading: false,
    noData: false,
    noMore: false
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
    const self = this
    this.setData({
      height: wx.getSystemInfoSync().windowHeight - 48
    })
    this.fetchList((result) => {
      // 判断，如果无数据的时候
      if (result.length > 0) {
        self.setData({
          list: result
        })
      } else {
        self.setData({
          noData: true
        })
      }
    })
  },

  fetchList (callback) {
    const self = this
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
        const result = res.data.data || []
        callback(result)
      },
      fail (error) {
        console.log(error)
      }
    })
  },

  handleClick () {
    wx.pageScrollTo({
      scrollTop: 30,
      duration: 300
    })
  },

  handleScroll () {
    const self = this
    this.setData({
      showLoading: true
    })
    // 线上环境接口需要进行配置
    this.fetchList((result) => {
      this.setData({
        showLoading: false
      })
      // 判断，如果无数据的时候
      if (result.length > 0) {
        self.setData({
          list: result
        })
      } else {
        self.setData({
          noMore: true
        })
      }
    })
  }
})

// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    const systemInfo = wx.getSystemInfoSync(); // 获取设备信息
    const statusHeight = systemInfo.statusBarHeight // 状态栏高度
    this.globalData.page_top_height=statusHeight
  },
  globalData: {
    userInfo: null,
    page_top_height:40
  }
})

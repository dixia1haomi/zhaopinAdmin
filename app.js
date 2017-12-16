import {Config} from './utils/config.js'

App({
  onLaunch: function () {
    this.checkToken()
  },

  // 管理员登录，检查token是否有效，无效再次请求
  checkToken() {
    let that = this
    // 检查token是否有效
    wx.request({
      url: Config.url + 'api/token/verify',
      method: 'POST',
      data: { token: wx.getStorageSync('token_key') },
      success(res) {
        console.log('登录态', res.data.isValid)
        if (!res.data.isValid) {
          that.login()
        }
      }
    })
  },

  // 登录
  login() {
    let ac = 'admin'
    let se = 'admin'
    wx.request({
      url: Config.url + 'api/token/app',
      method: 'POST',
      data: { ac: ac, se: se },
      success(res) {
        console.log('登录换取token', res)
        wx.setStorageSync('token_key', res.data.token)
        wx.showToast({ title: '登录成功' })
      }
    })
  },



  globalData: {
    userInfo: null
  }
})
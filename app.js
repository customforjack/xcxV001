//app.js
import {ajax} from "./utils/request.js";
wx.ajax = ajax
// 校验登陆态
wx.checkLogin = (params) => {
  let opt = Object.assign({
    toLogin: false
  }, params)
  return new Promise((resolve, reject) => {
    ajax({
      url: '/api/Member/checklogin',
      params: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        const pages = getCurrentPages() //获取加载的页面
        const currentPage = pages[pages.length - 1] //获取当前页面的对象
        const url = currentPage.route //当前页面url
        const options = currentPage.options //如果要获取url中所带的参数可以查看options
        if(res.code === 400){
          wx.setStorageSync('backUrl', `/${url}`)
        }
        resolve(res.code === 1 ? true : false)
      },
      fail(res) {
        reject(res)
      }
    })
  })

}
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        console.log('res', res)
        wx.setStorageSync('code', res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
    //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
    //虽然最后解决了，但是花费了不少时间
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
      }
    })
  },
  globalData: {
    height:0
  }
})
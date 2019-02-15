//app.js
import { ajax, getMd5} from "./utils/request.js";
wx.ajax = ajax
wx.getMd5 = getMd5
wx.getParams = (params) => {
  let str = ''
  Object.keys(params).forEach(key => {
    str += `${key}=${params[key]}&`
  })
  return str.substr(0,str.length-1)
}
wx.tranNumber = (params) => {
  let Obj = {}
  Object.keys(params).forEach(key =>{
    if (key === 'id' || key === 'character_id' || key === 'classify_id'){
      Obj[key] = parseInt(params[key])
    } else {
      Obj[key] = params[key]
    }
  })
  return Obj
}

// 校验登陆态
wx.checkLogin = () => {
  return wx.ajax({
    url: '/api/Member/checklogin',
    params: {
      token: wx.getStorageSync('token')
    }
  }).then(res => {
    if (res.code === 1) {
      wx.setStorageSync('loginData', res.data)
      console.log('checkLOGIN', res)
    }
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
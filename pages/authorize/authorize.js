// pages/authorize/authorize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    // wx.login({
    //   success: res => {
    //     wx.request({
    //       url: config.loginUrl, //后台接口
    //       method: 'POST',
    //       data: {
    //         code: res.code,
    //       },
    //       header: {
    //         'content-type': 'application/json' // 默认值
    //       },
    //       success: function (res) {
    //         wx.setStorageSync('token_type', res.data.data.token_type)
    //         wx.setStorageSync('openid', res.data.data.openid)
    //         wx.setStorageSync('access_token', res.data.data.access_token)
    //         wx.getSetting({
    //           success: res => {
    //             if (res.authSetting['scope.userInfo'] && wx.getStorageSync('access_token') == null) {
    //               // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //             }
    //           }
    //         })
    //       }
    //     })
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
   

        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.setStorageSync('userInfo', e.detail.userInfo);
      //用户按了允许授权按钮
      console.log(e.detail.userInfo)
      wx.ajax({
        url: '/api/Member/getInfoMP',
        checkRole: false,
        params: {
          code: wx.getStorageSync('code')
        },
        type: 'POST',
        success(res) {
          console.log(res)
          if (res.code === 1) {
            // 登陆成功
          } else if (res.code === 201) {
            // 未注册 跳转到注册页
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    } 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  }
})
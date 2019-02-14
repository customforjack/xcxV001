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
 
        }
      }).then(res => {
        if (res.code === 1) {
          // 登陆成功
          console.log(' res.data.token', res.data.token)
          wx.setStorageSync('token', res.data.token)
          wx.checkLogin()
          const backUrl = wx.getStorageSync('backUrl')
          if (backUrl) {
            wx.redirectTo({
              url: backUrl,
              success() {
                wx.removeStorageSync('backUrl')
              }
            })
          } else {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        } else if (res.code === 201) {
          // 未注册 跳转到注册页
          wx.setStorageSync('open_id', res.data.open_id)
          wx.setStorageSync('session_key', res.data.session_key)
          wx.navigateTo({
            url: '/pages/login/login',
          })

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
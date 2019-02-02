// pages/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member_mobile: '',
    code: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  getphone(e) {
    console.log(e)
    this.setData({
      member_mobile: e.detail.value
    })
    console.log(this.data.member_mobile)
  },
  code(e) {
    this.setData({
      code: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  sendCode() {
    console.log('send')
    // 手机号校验
    if (this.data.member_mobile === '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return false
    }
    wx.ajax({
      url: '/api/Member/sendCode',
      checkRole: false,
      params: {
        member_mobile: this.data.member_mobile
      },
      type: 'POST',
      success(res) {
        if (res.code === 1) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
        if (res.code === 400) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  to(){
    console.log('to')
  },
  login() {
    const _this = this
    // 手机号校验
    if (this.data.member_mobile === '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return false
    }
    if (this.data.code === '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return false
    }
    const userInfo = wx.getStorageSync('userInfo')
    wx.ajax({
      url: '/api/Member/registerMP',
      type: 'POST',
      checkRole: false,
      params: {
        member_mobile: _this.data.member_mobile,
        member_name: userInfo.nickName,
        member_img: userInfo.avatarUrl,
        mp_openid: wx.getStorageSync('open_id'),
        code: _this.data.code,
        union_id: ''
      },
      success (res) {
        if(res.code === 1){
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          wx.setStorageSync('token', res.data.token)
          const backUrl = wx.getStorageSync('backUrl')
          if (backUrl){
            wx.navigateTo({
              url: backUrl,
              success(){
                wx.removeStorageSync('backUrl')
              }
            })
          } else {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        } else {
          wx.showToast({
            title: res.msg,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
// pages/sendInvita/sendInvita.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    this.setData({
      options: options
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toAccept(){
    // 接受邀请
    wx.setStorageSync('backUrl', '/pages/acceptInvita/acceptInvita?' + wx.getParams(this.data.options))
    const _this = this
    const token = wx.getStorageSync('token')
    if (!token){
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      })
      return false
    }
    wx.ajax({
      url:'/api/Product/inviteSupervisor',
      params:{
        member_habit_id: _this.data.options.member_habit_id,
        token:wx.getStorageSync('token'),
        type: _this.data.options.type
      }
    }).then(res => {
      if(res.code === 1){
        wx.showToast({
          title:res.msg,
          icon: 'none'
        })
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/index/index',
          })

        },1000)
      }
      if (res.code === 400) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index',
          })

        }, 1000)
      }
      wx.removeStorageSync('backUrl')
    })
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
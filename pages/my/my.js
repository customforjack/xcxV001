// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  /**
   * 跳转账户
   */
  goAccount(){
    wx.navigateTo({
      url: '/pages/my/my_account/my_account',
    })
  },
  goOrder(){
    wx.navigateTo({
      url: '/pages/my/my_order/my_order',
    })
  },
  goRole() {
    wx.navigateTo({
      url: '/pages/my_role/my_role',
    })
  },
  goStudy() {
    wx.navigateTo({
      url: '/pages/my_study/my_study',
    })
  },
  goCollection() {
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },
  goRanking() {
    wx.navigateTo({
      url: '/pages/ranking/ranking',
    })
  },
  goSupervisor() {
    wx.navigateTo({
      url: '/pages/supervisor/supervisor',
    })
  },
  goRecommend() {
    wx.navigateTo({
      url: '/pages/recommend/recommend',
    })
  },
  goGroup() {
    wx.navigateTo({
      url: '/pages/group/group',
    })
  },
  goActivity() {
    wx.navigateTo({
      url: '/pages/my_activity/my_activity',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('userInfo'))
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
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
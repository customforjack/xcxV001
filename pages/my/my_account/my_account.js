// pages/my/my_account/my_account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0
  },
  changeTab(e){
    var tab = e.currentTarget.dataset.tab
    this.setData({
      flag: tab
    })
  },
  // 提现
  tixian(){
    var that=this;
    wx.navigateTo({
      url: '/pages/my/withdraw/withdraw?available=' + that.data.available_balance + "&freeze=" + that.data.freeze_balance,
    })
  },
  
  //账单明细
  my_orderDetail(){
    wx.navigateTo({
      url: '/pages/my/my_orderDetail/my_orderDetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that=this;
    
   return wx.ajax({
      url: '/api/Member/checklogin',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token')
      }
   }).then(res => {
    
       console.log("验证登陆", res);
       if (res.code === 1) {
         that.setData({
           available_balance: res.data.available_balance,
           freeze_balance: res.data.freeze_balance
         })
       }
     
   })
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
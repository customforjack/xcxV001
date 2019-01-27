// pages/my/withdraw/withdraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  numInput:function(e){
    this.setData({
      cash: e.detail.value
    })
  },
  drawing:function(){

    var that = this;
    var cash=that.data.cash;
    console.log(cash);
    /*提现*/
    wx.ajax({
      url: '/api/Member/withdraw',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        price: cash,
      },
      type: 'POST',
      success(res) {
        console.log("提现", res);
      
      }
    });
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
// pages/my/my_orderDetail/my_orderDetail.js
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
    var that= this;
   that.orderDetail();
  },
  orderDetail:function(){
    var that = this;
    wx.ajax({
      url: '/api/Member/myPayments',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        page: 1,
        pageSize: 20
      },
      type: 'POST',
      success(res) {
        console.log("账单明细", res.data);
        if (res.code === 1) {

          var orderDetail = res.data.data;

          that.setData({
            orderDetail: orderDetail
          })
        }
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
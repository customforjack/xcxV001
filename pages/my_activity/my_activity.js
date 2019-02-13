// pages/my_activity/my_activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    tabx: 0
  },
  changeTab(e) {
    var tab = e.currentTarget.dataset.tab
    this.setData({
      flag: tab
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.participation();



  },
//我参与的
  participation : function () {
    var that = this;
    // wx.ajax({
    //   url: '/api/Activity/getList',
    //   checkRole: false,
    //   params: {
    //     token: wx.getStorageSync('token'),
    //     start_time: "asc",//倒序desc
    //     join_num: "asc",//倒序desc
    //     price: "asc",//倒序desc
    //     page: 1,
    //     pageSize: 20
    //   },
    //   type: 'POST',
    //   success(res) {
    //     if (res.code === 1) {
    //       console.log(res);
    //     }
    //   }
    // });
  },
  //我发起的
  sponsor:function(){

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
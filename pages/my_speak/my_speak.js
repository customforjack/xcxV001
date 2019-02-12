// pages/my_speak/my_speak.js
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
    });
    var that = this;
    that.speak();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.speak();
  },
  speak: function () {
    var that = this;
    var type = that.data.flag;
    console.log(type);
    /*我的发言*/
    wx.ajax({
      url: '/api/Topic/getMyTopicList',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        type: type,
        page:1,
        pageSize:20
      },
      type: 'POST',
      success(res) {
        console.log("发言列表", res);
        if (res.code == 1) {
        
         
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
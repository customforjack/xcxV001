// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1,
    tabx: 0
  },
  changeTab(e) {
    var that=this;
    var tab = e.currentTarget.dataset.tab
    this.setData({
      flag: tab
    })
    that.rankbang(tab)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.rankbang(1);
  },
  rankbang: function (type){
      var that=this;
    wx.ajax({
      url: '/api/Member/myRanking',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        type: type,
        page:1,
        pageSize:20,
      },
      type: 'POST',
      success(res) {
        console.log("排行榜",res);
        if (res.code === 1) {
          var rankingList=res.data.data;
          that.setData({
            rankingList: rankingList
          })
        }
      }
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
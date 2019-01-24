// pages/my_roles/myRoles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://imgc.woyaoxunpai.com/data/banner/2018082417365510328.jpeg',
      'https://imgc.woyaoxunpai.com/data/banner/2018082417313292666.jpg',
      'https://imgc.woyaoxunpai.com/data/banner/2018082417365510328.jpeg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration:300,
    tabs:[
      {
        name: '好妻子的12堂必修课',
        checked: true
      },
      {
        name: '好妻子的12个习惯',
        checked: false
      },
      {
        name: '好妻子的12个习惯',
        checked: false
      }
    ]
  },
  toggleTab(e){
    this.data.tabs.forEach(item => {
      item.checked = false
    })
    this.data.tabs[e.currentTarget.dataset.idx].checked = true
    this.setData({
      tabs: this.data.tabs
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
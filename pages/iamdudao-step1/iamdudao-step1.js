// pages/iamdudao/iamdudao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        name:"我督导的",
        select:true
      },
      {
        name: "督导我的",
        select: false
      }
    ]
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
  toggleTab(e){
    console.log(e.currentTarget.dataset.idx)
    this.data.tabs.forEach(item => {
      item.select = false
    })
    this.data.tabs[e.currentTarget.dataset.idx].select = true
    this.setData({
      tabs: this.data.tabs
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
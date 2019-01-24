// pages/toPay/toPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act: 0,
    num:0,
    flag:0,
  },
  showModal:function(e){
    this.component.close(e);
  },
  changeBack:function(e){
    console.log(e);
    var back_flage = e.currentTarget.dataset.tab;
    this.setData({
      flag:back_flage
    })
    if (back_flage == "0") {
      console.log(back_flage);
      this.component.showModal(2);
    }
  },
  addition:function(){
    var that=this;
    var all_num = that.data.num;
    if (that.data.num >= 0){
      that.setData({
        num: all_num+1
      })
    }
  },
  reduce: function () {
    var that = this;
    var all_num = that.data.num;
    if (that.data.num > 0) {
      that.setData({
        num: all_num -1
      })
    }
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
    this.component = this.selectComponent("#component");
    console.log(this.component)
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
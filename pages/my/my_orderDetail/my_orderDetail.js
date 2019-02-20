// pages/my/my_orderDetail/my_orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    orderDetail:[]
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
    return  wx.ajax({
      url: '/api/Member/myPayments',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        page: that.data.page,
        pageSize: 20
      }
    }).then(res =>{
      
        console.log("账单明细", res.data);
       
        if (res.code === 1) {
          let array = that.data.orderDetail.concat(res.data.data); 
          console.log(array);
          this.setData({
            orderDetail: array
          })
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
    console.log(this.data.page + 1) 
    var page_new = this.data.page + 1;
    this.setData({
      page: page_new
    })
   this.orderDetail()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
     
  }
})
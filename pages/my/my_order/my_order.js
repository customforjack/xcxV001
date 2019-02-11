// pages/my/my_order/my_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act:0
  },
  /**
   * 改变Tab
   */
  changeTab(e){
    var that = this;
    var act = e.currentTarget.dataset.act
    this.setData({
      act:act
    })
    that.myOrder(act);
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.myOrder(that.data.act);
  },
//订单列表
  myOrder: function (act) {
    var that = this;
    wx.ajax({
      url: '/api/Member/getOrderList',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        order_status: act,
        page: 1,
        pageSize: 20
      },
      type: 'POST',
      success(res) {
        console.log("订单", res);
        if (res.code === 1) {
          var orderList = res.data.data;
          // 订单
          that.setData({
            orderList: orderList
          })
        }
      }
    })
  },
//支付
  pay: function(e){
      console.log(e.currentTarget.dataset.ordernum);
    var order_sn = e.currentTarget.dataset.ordernum;
    wx.ajax({
      url: '/api/Order/wxPayMP',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        order_sn: order_sn
      },
      type: 'POST',
      success(res) {
        console.log("支付参数", res);
        const params = JSON.parse(res.data)
        if (res.code === 1) {
          wx.requestPayment({
            timeStamp: params.timeStamp,
            nonceStr: params.nonceStr,
            package: params.package,
            signType: params.signType,
            paySign: params.paySign,
            success(data) {
              console.log('succcess', data)
              // wx.navigateTo({
              //   url: '/pages/my/my_order/my_order',
              // })
            },
            fail(res) {
              // wx.showToast({
              //   title: JSON.stringify(res),
              // })
            }
          })
          
        }
      }
    })
  },
//取消订单
  cancel_order: function(e){

    console.log(e);
    var order_sn = e.currentTarget.dataset.ordernum;

    wx.showModal({
      title: '提示',
      content: '确定取消订单吗?',
      success(res) {
        if (res.confirm) {
          wx.ajax({
            url: '/api/Order/cancelOrder',
            checkRole: false,
            params: {
              token: wx.getStorageSync('token'),
              order_sn: order_sn
            },
            type: 'POST',
            success(res) {
              console.log("取消订单", res);
              
              if (res.code === 1) {
                console.log("取消成功");
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
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
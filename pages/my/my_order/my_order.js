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
  showModal: function (e) {
    console.log(e)
    this.setData({
      song: false,
    })
  },
  //赠送
  give: function (options) {
    var that = this;
    console.log(options);

    that.setData({
      song: true,
      forward_data: options.currentTarget.dataset.ordernum.order_detail
    })
    console.log(that.data.forward_data)
    wx.ajax({
      url: '/api/Order/createPresent',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        character_id: that.data.forward_data.id
      },
      type: 'POST',
      success(res) {
        console.log("赠送", res.data);
        if (res.code === 1) {
          var forward2 = 'forward_data.zs_id'
          that.setData({
            [forward2]: res.data.id
          })
          console.log(that.data.forward_data)
        }
      }
    });

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
    let that=this;
      console.log(e.currentTarget.dataset.ordernum);
    var order_sn = e.currentTarget.dataset.ordernum;
    wx.ajax({
      url: '/api/Order/balancePay',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        order_sn: order_sn
      },
      type: 'POST',
      success(res) {
        console.log(res);
        if (res.code===1){
          that.setData({
            act:2
          })
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
         
          setTimeout(function () {
            that.myOrder(that.data.act)
          }, 2000)
        } else if (res.code === 400){
          that.wx_pay(order_sn);
        }
        
      }
      })
   
  },
  wx_pay: function (order_sn){
    let that=this;
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
              if (res.code === 1) {
                that.setData({
                  act: 2
                })
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function () {
                  that.myOrder(that.data.act)
                }, 2000)
              } else if (res.code === 400) {
                that.wx_pay(order_sn);
              }
            },
            fail(res) {
             console.log(res);
            }
          })

        }
      }
    })
  },
//取消订单
    cancel_order: function(e){
      let that=this;
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
                that.setData({
                  act: 3
                })
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 1000
                })
                setTimeout(function(){
                  that.myOrder(that.data.act)
                },2000)
               
               
              }else{
                wx.showToast({
                  title: '取消失败',
                  icon: 'none',
                  duration: 1000
                })
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
// pages/my/my_order/my_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act:0,
    orderList:[],
    page_all: 1,
    page_p:1,
    page_y:1,
    page_c:1

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
   return wx.ajax({
      url: '/api/Order/createPresent',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        character_id: that.data.forward_data.id
      }
    }).then(res =>{
     
        console.log("赠送", res.data);
        if (res.code === 1) {
          var forward2 = 'forward_data.zs_id'
          that.setData({
            [forward2]: res.data.id
          })
          console.log(that.data.forward_data)
        
      }
    });

  },
//订单列表
  myOrder: function (act) {
    var that = this;
    var pages=1;
    that.setData({
      orderList: []
    })
    if (act==0){
      pages = that.data.page_all;
     
      console.log(0)
    } else if (act == 1){
      pages = that.data.page_p;
      console.log(1)
    }
    else if (act == 2) {
      pages = that.data.page_y;
      console.log(2)
    }
    else if (act == 3) {
      pages = that.data.page_c;
      console.log(3)
    }
    console.log(pages, act);
    that.myOrders(pages, act)
    
  },
  myOrders:function(pages,act){
    var that=this;
    return wx.ajax({
      url: '/api/Member/getOrderList',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        order_status: act,
        page: pages,
        pageSize: 20
      }
    }).then(res => {
      console.log("订单", res);
      if (res.code === 1) {
        let array = that.data.orderList.concat(res.data.data);
      
        // 订单
        that.setData({
          orderList: array
        })
      }
    })
  },
//支付
  pay: function(e){
    let that=this;
      console.log(e.currentTarget.dataset.ordernum);
    var order_sn = e.currentTarget.dataset.ordernum;
   return wx.ajax({
      url: '/api/Order/balancePay',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        order_sn: order_sn
      }
      }).then(res =>{
       
          console.log(res);
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

        
      })
   
  },
  wx_pay: function (order_sn){
    let that=this;
   return wx.ajax({
      url: '/api/Order/wxPayMP',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        order_sn: order_sn
      }
    }).then(res =>{
      
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
         return wx.ajax({
            url: '/api/Order/cancelOrder',
            checkRole: false,
            params: {
              token: wx.getStorageSync('token'),
              order_sn: order_sn
            }
          }).them(res =>{
        
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
                setTimeout(function () {
                  that.myOrder(that.data.act)
                }, 2000)


              } else {
                wx.showToast({
                  title: '取消失败',
                  icon: 'none',
                  duration: 1000
                })
              }
            
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //跳转角色详情
  details: function (e) {
    console.log(e);
    var roleId = e.currentTarget.dataset.id
    var that = this;
    wx.navigateTo({
      url: '../../my_roles/myRoles?id=' + roleId
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
    console.log(this.data.act)
    // var page_new = this.data.page + 1;
    // this.setData({
    //   page: page_new
    // })
    // this.withthdraw()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
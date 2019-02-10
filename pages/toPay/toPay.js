// pages/toPay/toPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    act: 0,
    num:1,
    flag:0,
    total:0,
    loginData:wx.getStorageSync('loginData')
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
      that.setData({
        total:parseInt(that.data.detail.price) * parseInt(that.data.num)
      })
    }
  },
  toPay(){
    // 支付
    let params = []
    params.push({
      id: this.data.detail.id,
      number: this.data.num
    })
    console.log('params', params)
    // 创建订单
    wx.ajax({
      url:'/api/Order/createOrder',
      params: {
         order_detail: JSON.stringify(params),
         token:wx.getStorageSync('token')
         } 
    }).then(res => {
      console.log('res',res)
      if(res.code === 1){
        wx.showToast({
          title: res.msg
        })
        // 获取支付参数
        wx.ajax({
          url:'/api/Order/wxPayMP',
          params:{
            order_sn: res.data.order_sn,
            token:wx.getStorageSync('token')
          }
        }).then(res=>{
          console.log(res.data)
          if(res.code === 1){
            const params = JSON.parse(res.data)
            wx.requestPayment({
              timeStamp: params.timeStamp,
              nonceStr: params.nonceStr,
              package: params.package,
              signType: params.signType,
              paySign: params.paySign,
              success(res) {
                console.log('succcess',res)
                wx.navigateTo({
                  url: '/pages/my/my_order/my_order',
                })
               },
              fail(res) {
                wx.showToast({
                  title: JSON.stringify(res),
                })
               }
            })
          }
        })
      }
    })
  },
  reduce: function () {
    var that = this;
    var all_num = that.data.num;
    if (that.data.num > 1) {
      that.setData({
        num: all_num -1
      })
      that.setData({
        total: parseInt(that.data.detail.price) * parseInt(that.data.num)
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', wx.getStorageSync('payList'))
    this.setData({
      detail: wx.getStorageSync('payList')
    })
    this.setData({
      total: parseInt(this.data.detail.price) * parseInt(this.data.num)
    })
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
// pages/toPay/toPay.js
const app = getApp()
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
    loginData:wx.getStorageSync('loginData'),
    system: app.globalData.system
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
  addition:function(e){
    console.log('e +++',e)
    const index = e.currentTarget.dataset.idx
    var that=this;
    var all_num = that.data.detail[index].number;
    if (all_num >= 0){
      that.data.detail[index].number = that.data.detail[index].number+1
      that.setData({
        detail: that.data.detail
      })

      // 计算总价
      let totalMoney = 0
      that.data.detail.forEach(item => {
        totalMoney += item.number * parseFloat(item.price)
        console.log('totalMoney', totalMoney)
      })
      that.setData({
        total:totalMoney
      })
    }
  },
  toPay(){
    // 支付
    let params = []
    this.data.detail.forEach((item,i) => {
      params.push({
        id:item.id,
        number:item.number
      })
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
                wx.checkLogin()
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
  yePay(){
    // 校验是否够支付
    if (parseFloat(this.data.loginData.available_balance) < this.data.total){
      wx.showToast({
        title: '余额不足,请充值,或者使用微信支付',
        icon:'none'
      })
      return false
    }
    // 创建订单
    // 支付
    let params = []
    this.data.detail.forEach((item, i) => {
      params.push({
        id: item.id,
        number: item.number
      })
    })
    wx.ajax({
      url: '/api/Order/createOrder',
      params: {
        order_detail: JSON.stringify(params),
        token: wx.getStorageSync('token')
      }
    }).then(res => {
      console.log('res', res)
      if (res.code === 1) {
        wx.showToast({
          title: res.msg
        })

        wx.ajax({
          url: '/api/Order/balancePay',
          params: {
            order_sn: res.data.order_sn
          }
        }).then(res => {
          if(res.code === 1){
            wx.showToast({
              title: res.msg,
            })
            wx.checkLogin()
            setTimeout(()=>{
              wx.navigateTo({
                url: '/pages/my/my_order/my_order',
              })
            },500)
          }
        })
      }
    })


  },
  reduce: function (e) {
    console.log('e ---',e)
    const index = e.currentTarget.dataset.idx
    var that = this;
    var all_num = that.data.detail[index].number;
    if (all_num >= 2) {
      that.data.detail[index].number = that.data.detail[index].number - 1
      that.setData({
        detail: that.data.detail
      })

      // 计算总价
      let totalMoney = 0
      that.data.detail.forEach(item => {
        totalMoney += item.number * parseFloat(item.price)
      })
      that.setData({
        total: totalMoney
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const list = wx.getStorageSync('payList')
    list.forEach(item => {
      item.number = 1
    })
    let total = 0
    list.forEach(item =>{
      total += item.number * parseFloat(item.price)
    })
    this.setData({
      detail: list,
      total: total
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
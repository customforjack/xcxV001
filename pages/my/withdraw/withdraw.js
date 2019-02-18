// pages/my/withdraw/withdraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this;
    that.setData({
      available_balance: options.available,
      freeze_balance: options.freeze
    })
  },
  all_money:function(e){
    console.log(e);
    var all_money =this.data.available_balance;
    console.log(all_money);
    this.setData({
      cash: all_money
    })
    console.log(this.data)
  },
  numInput:function(e){
    console.log(e);
    var input_money = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
    input_money = input_money.replace(/^\./g, "").replace(/[^\d.]/g, "")
    if (input_money > this.data.available_balance){
      this.setData({
        cash: this.data.available_balance
      })
    } 
    // else if (input_money==0){
    //   this.setData({
    //     cash: 10
    //   })
    // }
    else{
      this.setData({
        cash: input_money
      })
    }
    
  },
  drawing:function(){

    var that = this;
    var cash=that.data.cash;
    console.log(cash);
    /*提现*/
  return  wx.ajax({
      url: '/api/Member/withdraw',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        price: cash,
      }
    }).then(res =>{
     
        if (res.code == 1) {
          var yue = that.data.available_balance - that.data.cash;
          that.setData({
            available_balance: yue
          })

          wx.showToast({
            title: '提现成功',
            icon: 'success',
            duration: 2000,
            success: setTimeout(
              function () {

                wx.navigateTo({
                  url: '/pages/my/my_withdrawDetail/my_withdrawDetail',
                })
              }, 1000
            )
          })

        } else if (res.code == 400) {
          wx.showToast({
            title: '金额不能为0',
            icon: 'none',
            duration: 2000
          })
        }
        console.log("提现", res);

    });
  },
  //提现明细
  my_withdrawDetail() {
    wx.navigateTo({
      url: '/pages/my/my_withdrawDetail/my_withdrawDetail',
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

    var that = this;
    if (that.data.cash > that.data.available_balance){
        that.setData({
          cash:""
        })
    }
    // wx.ajax({
    //   url: '/api/Member/checklogin',
    //   checkRole: false,
    //   params: {
    //     token: wx.getStorageSync('token')
    //   },
    //   type: 'POST',
    //   success(res) {
    //     console.log("验证登陆", res);
    //     if (res.code === 1) {
    //       that.setData({
    //         available_balance2: res.data.available_balance,
    //         freeze_balance2: res.data.freeze_balance
    //       });
    //       if (that.data.available_balance2 != that.data.available_balance){
    //         that.setData({
    //           available_balance: that.data.available_balance2,
    //           freeze_balance: that.data.freeze_balance2
    //         });
    //       }
    //     }else{
    //           console.log("登陆失败");
    //     }
    //   }
    // })
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
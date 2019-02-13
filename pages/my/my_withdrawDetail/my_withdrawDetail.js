// pages/my/my_withdrawDetail/my_withdrawDetail.js
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
    var that = this;
    that.withthdraw();
  },
  //提现列表
  withthdraw: function () {
    var that = this;
    wx.ajax({
      url: '/api/Member/withdrawList',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        page: 1,
        pageSize: 20
      },
      type: 'POST',
      success(res) {
        console.log("提现明细", res.data);
        if (res.code === 1) {

          var withthdrawDetail = res.data.data;

          that.setData({
            withthdrawDetail: withthdrawDetail
          })
        }
      }
    });
  },
  //撤回提现
  back:function(e){
    console.log(e);
    var witdrawId = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.location.status;
    if (status==1){
      wx.showModal({
        title: '提示',
        content: '确定撤销提现吗？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.ajax({
              url: '/api/Member/undoDeposit',
              checkRole: false,
              params: {
                token: wx.getStorageSync('token'),
                id: witdrawId
              },
              type: 'POST',
              success(res) {
                console.log("撤回提现", res);
                if (res.code === 1) {
                  console.log("撤回提现成功", res);
                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1000
                  })
                }
              }
            });


          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      return false;
    }
  
  
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
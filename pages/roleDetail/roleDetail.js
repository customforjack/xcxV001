// pages/roleDetail/roleDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options 课程', options)
    var that=this;
    var roleId = options.id;
    console.log(roleId);
    that.details(roleId)
  },
  todo(){
    console.log('todo')
  },
  //获取详情
  details: function (roleId){
    var that = this;
     wx.ajax({
       url: '/api/Product/getCourseDetail',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        id: roleId
      },
      type: 'POST',
      success(res) {

        console.log("角色详情", res);
        if (res.code === 1) {
          // 角色获取成功
        
          that.setData({
            detail:res.data
          })
        }
        if(res.code === 601){
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
          setTimeout(()=>{
            wx.navigateBack()
          },1000)
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
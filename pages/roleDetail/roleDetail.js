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
    that.setData({
      p_id: roleId
    })
    that.details(options.id);
  },
  todo(e){
    var that=this;
    var params={
        p_id: that.data.p_id,
        type:2
      };
    wx.navigateTo({
      url: '/pages/leavingMsg/leavingMsg?' + wx.getParams(params),
    })
    console.log(e)
  },
  //进入课堂
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
        console.log("课程详情", res.data);
        if (res.code === 1) {
          // 课程详情获取成功
          that.setData({
            detail:res.data
          })
          // wx.setNavigationBarTitle({
          //   title: that.data.detail.name
          // })
          that.comment(roleId);
        }
        if(res.code === 601){
          wx.showToast({
              title: res.msg,
              icon: 'none'
          })
          setTimeout(()=>{
            wx.navigateBack()
          },1000)
        }
      }
    })
  },
  //跳转角色详情
  role_detail:function(e){
    console.log(e);
    var role_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my_roles/myRoles?id=' + role_id
    })
  },
  //获取评论
  comment: function (roleId){
    var that = this;
    wx.ajax({
      url: '/api/Topic/getTopicList',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        type: 2,
        p_id: roleId,
        page:1,
        pageSize:20
      },
      type: 'POST',
      success(res) {
        console.log("评论", res.data);
        if (res.code === 1) {
          // 评论获取成功
          that.setData({
            comment: res.data
          })
          console.log(that.data.comment);
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
    if (this.data.detail.id){
      this.onLoad(this.data.detail)
    }
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
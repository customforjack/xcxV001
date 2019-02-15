// pages/iamdudao/iamdudao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      options: options
    })
    
    Promise.all([this.getDetail(options), this.getTopicList()]).then(arr => {
      console.log('arr', arr)
      this.getCalendar()
    })
  },
  //我也要养成
  new_habit:function(){
    wx.navigateTo({
      url: '/pages/add_habit_step1/addHabitStep1'
    })
  },
  //袭ta一下
  hint: function () {
    this.setData({
      model: true
    })

  },
  // 获取日历信息
  getCalendar() {
    const _this = this
    return wx.ajax({
      url: '/api/Product/getSignDate',
      params: {
        member_habit_id: _this.data.detail.member_habit_id,
        year: 2019,
        month: 2,
        token: wx.getStorageSync('token')
      }
    })
  },
  //发言列表
  getTopicList() {
    const _this = this
    return wx.ajax({
      url: '/api/Topic/getTopicList',
      params: {
        type: _this.data.detail.type,
        p_id: _this.data.detail.habit_id,
        page: '1',
        pageSize: '20',
        token: wx.getStorageSync('token')
      }
    }).then(res => {
      _this.setData({
        talkList: res.data.data
      })
    })
  },
  //习惯详情
  getDetail(params) {
    return wx.ajax({
      url: '/api/Product/getHabitDetail',
      params: {
        member_habit_id: params.member_habit_id,
        token: wx.getStorageSync('token')
      }
    }).then(res => {
      console.log(res);
      this.setData({
        detail: res.data
      })
      wx.setNavigationBarTitle({
        title: this.data.detail.habit_name
      })
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
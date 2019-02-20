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
    options.member_habit_id
    Promise.all([this.getHabitDetail(options)]).then(arr => {
      console.log('arr', arr)
      this.getTopicList()
      // this.getCalendar()
    })
  },
  //我也要养成
  new_habit:function(){
    console.log(this.data.options);
    const _this = this
    this.getDetail(this.data.options.member_habit_id).then(res => {
      console.log('res:', res)

      if (res.code === 601) {
        // 则给出提示，并跳转至对应角色详情页
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/my_roles/myRoles?character_id=' + e.currentTarget.dataset.character_id,
          })
        }, 1000)
      }
      if (res.code === 1) {
        wx.navigateTo({
          url: '/pages/add_habit_step1/addHabitStep1?' + wx.getParams(res.data),
        })
      }
      if (res.code === 400) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      if (res.code === 602) {
        // 则跳转至对应我的习惯详情
        console.log('则跳转至对应我的习惯详情')
        wx.navigateTo({
          url: '/pages/habitDetail/habitDetail?' + wx.getParams(res.data),
        })
      }
    })



    // wx.navigateTo({
    //   url: '/pages/add_habit_step1/addHabitStep1?' + wx.getParams(this.data.detail)
    // })
  },


  getDetail(_id) {
    return new Promise((resolve, reject) => {
      wx.ajax({
        url: '/api/Product/getHabitAuth',
        params: {
          token: wx.getStorageSync('token'),
          id: _id
        },
        success(res) {
          resolve(res)
        }
      })
    })
  },
  //袭ta一下
  hint: function () {
    this.setData({
      model: true
    })

  },
  addLeavingMsg() {
    // 留言
    wx.navigateTo({
      url: '/pages/leavingMsg/leavingMsg?type=' + this.data.detail.type + '&p_id=' + this.data.detail.habit_id,
    })
  },
  // 获取日历信息
  getCalendar() {
    const _this = this
    
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
  getHabitDetail(params) {
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
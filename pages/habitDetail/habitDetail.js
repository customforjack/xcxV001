// pages/habitDetail/habitDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    options:{},
    talkList:[],
    model:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    this.setData({
      options: options
    })
    this.getDetail(options).then(()=>{
      this.getTopicList()
    })
  },
  addLeavingMsg(){
    // 留言
    wx.navigateTo({
      url: '/pages/leavingMsg/leavingMsg?type=' + this.data.detail.type + '&p_id=' + this.data.detail.habit_id,
    })
  },
  getDetail (params) {
    return wx.ajax({
      url: '/api/Product/getHabitDetail',
      params: {
        member_habit_id: params.member_habit_id,
        token: wx.getStorageSync('token')
      }
    }).then(res => {
      this.setData({
        detail: res.data
      })
      wx.setNavigationBarTitle({
        title:this.data.detail.habit_name
      })
    })
  },
  toYQdd(){
// 邀请督导
  wx.navigateTo({
    url: '/pages/sendInvita/sendInvita?member_habit_id=' + this.data.options.member_habit_id,
  })
  },
  getTopicList(){
    const _this = this
    wx.ajax({
      url:'/api/Topic/getTopicList',
      params:{
        type: _this.data.detail.type,
        p_id: _this.data.detail.habit_id,
        page:'1',
        pageSize:'20',
        token:wx.getStorageSync('token')
      }
    }).then(res =>{
      _this.setData({
        talkList: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  todk(){
    console.log('daka')
    const _this = this
    wx.ajax({
      url:'/api/Product/signMyHabit',
      params:{
        member_habit_id: _this.data.detail.member_habit_id,
        token:wx.getStorageSync('token')
      }
    }).then(res =>{
      console.log(res)
      if (res.code === 1){
        _this.setData({
          model:true
        })
      }
      if(res.code === 400){
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
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
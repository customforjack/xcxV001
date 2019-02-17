// pages/habitDetail/habitDetail.js
var util = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    options:{},
    talkList:[],
    model:false,
    mak_time:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    console.log('options', options)
    this.setData({
      options: options
    })
    Promise.all([this.getDetail(options)]).then(arr => {
      console.log('arr',arr)
      this.getTopicList()
      // this.getCalendar()
    })
  },



  //监听日历变化
  numChange:function(e){
      console.log(e);
    var year_time=  e.year;
    var month_time = e.month;
    var day_time = e.day;    
  },
  
  addLeavingMsg(){
    // 留言
    wx.navigateTo({
      url: '/pages/leavingMsg/leavingMsg?type=' + this.data.detail.type + '&p_id=' + this.data.detail.habit_id,
    })
  },
  //习惯详情
  getDetail (params) {
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
  //发言列表
  getTopicList(){
    const _this = this
    return wx.ajax({
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
  getCalendar() {
    const _this = this
    // 获取日历信息
    // return wx.ajax({
    //   url: '/api/Product/getSignDate',
    //   params: {
    //     member_habit_id: _this.data.detail.member_habit_id,
    //     year: "",
    //     month: "",
    //     token: wx.getStorageSync('token')
    //   }
    // }).then(res => {
    //   console.log("获取日历",res);
   
    //   _this.setData({
    //     mak_time:res.data
       
    //   })
    // })
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
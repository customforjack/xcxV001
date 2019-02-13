// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_hide:0,
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '我的主页', //导航栏 中间的标题
    },
    showLen:3,
    roleChecked:0,
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    act:0,
    vip:[],
    checkxg: ['热门习惯','热门角色'],
    xgCheck:0,
    detail:{},
    indicatorDots: true,
    autoplay: false,
    interval: 1000,
    duration: 300,
    todayCheck:0,
    moreBtnFlag:false,
    mode:false
  },
  search (e) {
      console.log('s',e)
  },
  /**
     * 跳转vip训练营
     */
  dkSuccess(){
    console.log('爸爸收到啦')
    this.setData({
      model:true
    })
    this.getHomeData()
  },
  goMe() {
    wx.navigateTo({
      url: '/pages/add_habit/addHabit',
    })
  },
  /**
   * 跳转vip训练营
   */
  goVip(){
    wx.navigateTo({
      url: '/pages/add_habit/addHabit',
    })
  },
  toRoleDetail(e){
    wx.navigateTo({
      url: '/pages/my_roles/myRoles?id=' + e.currentTarget.dataset.id,
    })
  },
  toaddStepOne(e) {
    console.log(e.currentTarget.dataset.id)
    this.getDetail(e.currentTarget.dataset.id).then(res => {
      console.log('res:', res)
      if (res.code === 601) {
        // 则给出提示，并跳转至对应角色详情页
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/my_roles/myRoles?id=' + e.currentTarget.dataset.id,
          })
        }, 1000)

      }
      if (res.code === 1) {
        wx.navigateTo({
          url: '/pages/add_habit_step1/addHabitStep1',
        })
      }
      if (res.code === 602) {
        // 则跳转至对应我的习惯详情
        wx.navigateTo({
          url: '/pages/habitDetail/habitDetail?member_habit_id=' + res.data.member_habit_id,
        })
      }
    })
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
  /**
   * 训练营切换tab
   */
  moeRole(){
  this.setData({
    showLen:1000
  })
  },
  checkRole(e){
    console.log(e.currentTarget.dataset.idx);
    console.log(this.data.detail)
    if (this.data.detail.today_habit[e.currentTarget.dataset.idx].habit.length > this.data.showLen){
      this.setData({
        moreBtnFlag: true
      })
    }else{
      this.setData({
        moreBtnFlag:false
      })
    }
    this.setData({
      roleChecked: e.currentTarget.dataset.idx,
      showLen:3,
      show_hide: e.currentTarget.dataset.idx
    })
    
  },
  changeTab(e){
    var act = e.currentTarget.dataset.act
    this.setData({
      act:act
    })
  },
  // 习惯切换
  toCheck (e) {
    this.setData({
      xgCheck: e.currentTarget.dataset.idx
    })
    console.log(e.currentTarget.dataset.idx)

  },
  toMore(){
    // 判断是热门习惯pages/add_habit/addHabit  还是热门角色
    wx.navigateTo({
      url: '/pages/add_habit/addHabit',
    })
  },
  toMoreRole(){
    wx.navigateTo({
      url: '/pages/buyRoles/buyRoles',
    })
  },
  toMyHabit(){
    wx.navigateTo({
      url: '/pages/my_study/my_study'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('ready')
  },
  getHomeData(){
    const _this = this
    wx.ajax({
      url: '/api/Home/home',
      params: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        if (res.code === 1) {
          _this.setData({
            detail: res.data
          })
          if (_this.data.detail.today_habit && _this.data.detail.today_habit.length){
            if (_this.data.detail.today_habit[0].habit.length > _this.data.showLen) {
              _this.setData({
                moreBtnFlag: true
              })
            } else {
              _this.setData({
                moreBtnFlag: false
              })
            }
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.checkLogin().then(()=>{
      this.getHomeData()
    })
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
    console.log('aaa')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
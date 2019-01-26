// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '我的主页', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    act:0,
    vip:[{
      title:'陪孩子一小时',
      num:'2.6万人'
    }, {
        title: '陪孩子一小时',
        num: '2.6万人'
      }, {
        title: '陪孩子一小时',
        num: '2.6万人'
      }, {
        title: '陪孩子一小时',
        num: '2.6万人'
      }, {
        title: '陪孩子一小时',
        num: '2.6万人'
      }],
    checkxg: ['热门习惯','热门角色'],
    xgCheck:0
  },
  search (e) {
      console.log('s',e)
  },
  /**
     * 跳转vip训练营
     */
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
      url: '/pages/vip/vip',
    })
  },
  /**
   * 训练营切换tab
   */
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
    console.log(this.data.xgCheck)
    if (this.data.xgCheck === 0){
      wx.navigateTo({
        url: '/pages/add_habit/addHabit',
      })
    } else if (this.data.xgCheck === 1){
      wx.navigateTo({
        url: '/pages/buyRoles/buyRoles',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.ajax({
      url: '/api/Home/home',
      params: {
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
    console.log('aaa')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
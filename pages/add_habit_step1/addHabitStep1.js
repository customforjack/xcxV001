// pages/add_habit_step1/addHabitStep1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeArr:[],
    name: '',
    myPromise1: '',
    myPromise2: '',
    otherPromise1: '',
    otherPromise2: '',
    weekArr: [
     {
       name:'周一',
       select: true
     },
      {
        name: '周二',
        select: true
      },
      {
        name: '周三',
        select: true
      },
      {
        name: '周四',
        select: true
      },
      {
        name: '周五',
        select: true
      },
      {
        name: '周六',
        select: false
      },
      {
        name: '周日',
        select: false
      }
    ]
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

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  checkMyPro1(e){
    this.setData({
      myPromise1: e.detail.value
    })
  },
  checkMyPro2(e){
    this.setData({
      myPromise2: e.detail.value
    })
  },
  checkOtherPro1(e){
    this.setData({
      otherPromise1: e.detail.value
    })
  },
  checkOtherPro2(e){
    this.setData({
      otherPromise2: e.detail.value
    })
  },
  checkWeek(e){
    //选择重复时间
    this.data.weekArr[e.currentTarget.dataset.idx].select = !this.data.weekArr[e.currentTarget.dataset.idx].select
    this.setData({
      weekArr: this.data.weekArr
    })
  },
  deleteTime(e){
    // 删除时间
    this.data.timeArr.splice(e.currentTarget.dataset.idx, 1)
    this.setData({
      timeArr: this.data.timeArr
    })
  },
  bindTimeChange (e) {
    // 选择时间
    if (this.data.timeArr.length < 4) {
      this.data.timeArr.push(e.detail.value)
      this.setData({
        timeArr: this.data.timeArr
      })
    } else {
      wx.showToast({
        title: '最多设置4个',
        icon: 'none'
      })
    }
  },
  habitName (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
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
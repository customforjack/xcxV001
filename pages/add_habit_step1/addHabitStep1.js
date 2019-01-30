// pages/add_habit_step1/addHabitStep1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params :{},
    timeArr:[],
    name: '',
    myPromise1: '',
    myPromise2: '',
    otherPromise1: '',
    otherPromise2: '',
    date:'',
    date1:'',
    weekArr: [
     {
       name:'周一',
       select: true,
       value:'1'
     },
      {
        name: '周二',
        select: true,
        value: '2'

      },
      {
        name: '周三',
        select: true,
        value: '3'
      },
      {
        name: '周四',
        select: true,
        value: '4'

      },
      {
        name: '周五',
        select: true,
        value: '5'
      },
      {
        name: '周六',
        select: false,
        value: '6'
      },
      {
        name: '周日',
        select: false,
        value: '7'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', wx.tranNumber(options))
    const params = wx.tranNumber(options)
    if (params.customType){
      // 自定义习惯
    }else{
      this.setData({
        name: params.name
      })
    }
    this.setData({
      params: params
    })
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
    this.setData({
      name: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    this.setData({
      date1: e.detail.value
    })
  },
  subFrom (){
    const _this = this
    // 校验非空
    if (_this.data.name === ''){
      wx.showToast({
        title: '名称不能为空',
        icon:'none'
      })
      return false
    } 
    if (_this.data.date === '') {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none'
      })
      return false
    } 
    if (_this.data.date1 === '') {
      wx.showToast({
        title: '请选择结束时间',
        icon: 'none'
      })
      return false
    } 
    if (_this.data.timeArr.length === 0) {
      wx.showToast({
        title: '请添加提醒时间',
        icon: 'none'
      })
      return false
    } 
    if (_this.data.weekArr.length === 0) {
      wx.showToast({
        title: '请选择重复时间',
        icon: 'none'
      })
      return false
    } 
    if (this.data.params.character_id !== 0){
      if (_this.data.myPromise1 === '') {
        wx.showToast({
          title: '请填写自我承诺 成功',
          icon: 'none'
        })
        return false
      }
      if (_this.data.myPromise2 === '') {
        wx.showToast({
          title: '请填写自我承诺 失败',
          icon: 'none'
        })
        return false
      } 
    }
    //提醒时间处理
    let time = this.data.timeArr.join(',')
    let weekList = []
    this.data.weekArr.forEach(item =>{
      if(item.select){
        weekList.push(item.value)
      }
    })
    wx.ajax({
      url: '/api/Product/createMyHabit',
      params: {
        id: _this.data.params.id,
        habit_name: _this.data.name,
        start_time: _this.data.date,
        end_time: _this.data.date1,
        my_promise_success: this.data.myPromise1,
        my_promise_fail: this.data.myPromise2,
        their_promise_success: this.data.otherPromise1,
        their_promise_fail: this.data.otherPromise2,
        remind_time: time,
        remind_week: weekList.join(','),
        token: wx.getStorageSync('token')
      }
    }).then(res => {
      if(res.code === 1){
        wx.showToast({
          title: '新建成功',
        })
      }
      if (res.code === 602){
        wx.showToast({
          title: res.msg,
        })
      }
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/habitDetail/habitDetail?' + wx.getParams(res.data),
        })
      }, 1000)
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
// pages/my_roles/myRoles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    showTab:0,
    tabs:[
      {
        name: '12堂必修课',
        checked: true
      },
      {
        name: '12个好习惯',
        checked: false
      }
    ],
    detail:{},
    showArr:[]
  },
  toggleTab(e){
    this.data.tabs.forEach(item => {
      item.checked = false
    })
    this.data.tabs[e.currentTarget.dataset.idx].checked = true
    this.setData({
      tabs: this.data.tabs,
      showTab: e.currentTarget.dataset.idx
    })
    if (parseInt(e.currentTarget.dataset.idx) === 0){
      this.setData({
        showArr: this.data.detail.course
      })
    }
    if (parseInt(e.currentTarget.dataset.idx) === 1){
      this.setData({
        showArr: this.data.detail.habit
      })
    }
  },
  getDetail(_id){
    return wx.ajax({
      url:'/api/Product/getCharacterDetail',
      params:{
        id:_id
      }
    })
  },
  toDetail(e){
    console.log('e', e)
    console.log('type', this.data.showTab)
    if(this.data.showTab == 0){
      wx.navigateTo({
        url: '/pages/roleDetail/roleDetail?id='+e.currentTarget.dataset.id
      })
    }
    if (this.data.showTab == 1) {
      this.toaddStepOne(e)
    }
  },
  toaddStepOne(e) {
    console.log(e.currentTarget.dataset.id)
    this.getHabitDetail(e.currentTarget.dataset.id).then(res => {
      console.log('res:', res)
      if (res.code === 601) {
        // 则给出提示，并跳转至对应角色详情页
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
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
  getHabitDetail(_id) {
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
  toBuy(){
    wx.setStorageSync('payList', this.data.detail)
    wx.navigateTo({
      url: '/pages/toPay/toPay',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this 
    this.setData({
      id: parseInt(options.id)
    })
    this.getDetail(this.data.id).then(res => {
      console.log("角色详情列表",res)
      _this.setData({
        detail: res.data,
       // showArr: res.data.course
        showArr: [
          {
            "id": 3,
            "name": "测试课程",
            "description": "啊啊啊",
            "thumbnail": "http://img.jiangtang360.com/15459782555c25c18f6b1aa.jpg",
            "video_url": "http://47.99.45.172/mmv/7.mp4",
            "content": "2222",
            "teacher_id": 1,
            "character_id": 1,
            "is_free": 0,
            "collection_view": 0,
            "page_view": 0,
            "share_vew": 0
          }
        ]
      })
      wx.setNavigationBarTitle({
        title: res.data.name
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
// pages/add_habit/addHabit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    list: [],
    sportList: [],
    quanziArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('load ...')
    const _this = this
    this.getHabitList()
   setTimeout(()=>{
     this.getQuanList()
   },200)
 
  },
  // 获取习惯列表
  getHabitList() {
    const _this = this
    return wx.ajax({
        url: '/api/Product/getHabitListAll',
        params: {
          token: wx.getStorageSync('token')
        }
      }).then(res => {
        const arr = []
        const sArr = []
        res.data.forEach((item, i) => {
          if (i === 0) {
            arr.push({
              label: item.name,
              select: true
            })
          } else {
            arr.push({
              label: item.name,
              select: false
            })
          }
          sArr.push(item.habit_list)
        })
        _this.setData({
          tabs: arr,
          sportList: sArr
        })
      })

  },
  getQuanList () {
    const _this = this
     return wx.ajax({
        url: '/api/Topic/getTopicList',
        params: {
          type: 3,
          p_id: 0,
          page: 1,
          pageSize: 10,
          token: wx.getStorageSync('token')
        }
     }).then(res => {
       _this.setData({
         quanziArr:res.data.data
       })
     })
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/add_habit_step1/addHabitStep1',
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
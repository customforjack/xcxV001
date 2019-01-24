// pages/add_habit/addHabit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        label:'运动',
        select:true
      },
      {
        label: '健康',
        select: false
      },
      {
        label: '职场',
        select: false
      }
    ],
    list:[
      {
        name:'锻炼',
        img:'buxing.png'
      },
      {
        name: '步行',
        img: 'football.png'
      },
      {
        name: '跑步',
        img: 'jianshen-.png'
      },
      {
        name: '乒乓球',
        img: 'jianshenfang.png'
      },
      {
        name: '健身',
        img: 'jianshenfang.png'
      },
      {
        name: '瑜伽',
        img: 'jianshenfang.png'
      },
      {
        name: '拳击',
        img: 'jianshenfang.png'
      },
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
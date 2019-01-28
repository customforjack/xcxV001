// pages/buyRoles/buyRoles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        name:'家庭',
        checked:true
      },
      {
        name: '职场',
        checked: false
      },
      {
        name: '艺术',
        checked: false
      },
      {
        name: '家庭',
        checked: false
      },
      {
        name: '职场',
        checked: false
      },
      {
        name: '艺术',
        checked: false
      }, {
        name: '家庭',
        checked: true
      },
      {
        name: '职场',
        checked: false
      },
      {
        name: '艺术',
        checked: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toNext(){
    wx.navigateTo({
      url: '/pages/my_roles/myRoles',
    })
  },
  toBuy () {
      wx.navigateTo({
        url: '/pages/vip/vip',
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
  toggleTab(e){
    console.log(e)
    let list = this.data.tabs
    list.forEach(item => {
      item.checked = false
    })
    list[e.currentTarget.dataset.idx].checked = true
    this.setData({
      tabs: this.data.tabs
    })
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
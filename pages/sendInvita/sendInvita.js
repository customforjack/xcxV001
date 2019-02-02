// pages/sendInvita/sendInvita.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:{},
    icon: wx.getStorageSync('userInfo').avatarUrl,
    nickName:wx.getStorageSync('userInfo').nickName,
    type:1,
    tabs:[
      {
        id:0,
        name:'邀请TA督导我本角色（全部12个习惯）',
        select:true,
        type:1
      },
      {
        id:1,
        name: '邀请TA督导我本习惯',
        select: false,
        type: 2
      }
    ]
  },
  toggleTab(e){
    console.log(e.currentTarget.dataset.id)
    this.data.tabs.forEach(item => {
      item.select = false
    })
    this.data.tabs[e.currentTarget.dataset.id].select = true
    this.setData({
      tabs: this.data.tabs,
      type: e.currentTarget.dataset.type
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log()
    this.setData({
      options: options
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
  onShareAppMessage: function (option) {
    const params = {
      nickName: this.data.nickName,
      member_habit_id: this.data.options.member_habit_id,
      type: this.data.type,
      icon: this.data.icon
    }

    return {
      title: `${this.data.nickName}邀请您成为督导`,
      path: '/pages/acceptInvita/acceptInvita?' + wx.getParams(params), //这里设定都是以"/page"开头,并拼接好传递的参数
      success: function (res) {
        // 转发成功
        console.log(res);
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})
// pages/my_class/my_class/my_class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    vipDetail:[],
    classDetail: [],
    params:{
      page:1,
      pageSize:20,
      token:wx.getStorageSync('token')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this 
    this.data.params.type = 1
    this.getDetail(this.data.params).then(res => {
      console.log('data', res.data.data)
      _this.setData({
        vipDetail: res.data.data
      })
    })
  },
  changeTab(e) {
    var tab = e.currentTarget.dataset.tab
    const _this = this 
    console.log('tab', tab)
    console.log(typeof tab)
    this.setData({
      flag: parseInt(tab)
    })
    this.data.params.type = parseInt(tab) === 0 ? 1 : 2
    this.getDetail(this.data.params).then(res=>{
      const data = res.data.data
      if(parseInt(tab) === 0){
        console.log('data',data)
        _this.setData({
          vipDetail:data
        })
      }else if(parseInt(tab) === 1){
        console.log('data',data)
        _this.setData({
          classDetail:data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getDetail(_params){
   return wx.ajax({
      url:'/api/Product/getCourseList',
      params:_params
    })
  },
  toDetail(e){
    console.log('e',e)
    wx.navigateTo({
      url: '/pages/roleDetail/roleDetail?id='+e.currentTarget.dataset.id,
    })
  },
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
    console.log('load...')
    this.data.params.page ++;
    this.getDetail(this.data.params)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
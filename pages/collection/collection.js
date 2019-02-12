// pages/collection/collection.js
// pages/my_class/my_class/my_class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 2
  },
  changeTab(e) {
    var that=this;
    var tab = e.currentTarget.dataset.tab
    this.setData({
      flag: tab
    });
    if (tab==2){
      that.myCollection(2);
    } else if (tab == 1){
      that.myCollection(1);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.myCollection(2);
  },
   /*我的习惯2/课堂1*/
  myCollection: function (type) {
    var that = this;
    wx.ajax({
      url: '/api/Member/getCollectionList',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        type: type,
        page: 1,
        pageSize: 20
      },
      type: 'POST',
      success(res) {
        console.log("我的课堂", res);
        if (res.code === 1) {
          // 角色获取成功
          // res.data.data = [
          //   {
          //     "id": 1,
          //     "name": "陪孩子一小时",
          //     "description": "陪孩子一小时",
          //     "thumbnail": "http://img.jiangtang360.com/15459782555c25c18f6b1aa.jpg",
          //     "collection_view": "2222",
          //     "page_view": 1,
          //     "share_view": 1
          //   },
          //   {
          //     "id": 1,
          //     "name": "测试课程222",
          //     "description": "啊啊啊222",
          //     "thumbnail": "http://img.jiangtang360.com/15459782555c25c18f6b1aa.jpg",
          //     "collection_view": "2222",
          //     "page_view": 1,
          //     "share_view": 1
          //   }
          // ];
          var habitList = res.data.data;
          that.setData({
              habitList: habitList,
            page_habit: res.data.count.page,
            pageSize_habit: res.data.count.pageSize
          })
        }
      }
    });
  },
  //加入习惯,跳转详情
    habitDetails:function(e){
        console.log(e);
        var habitId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../habitDetail/habitDetail?id='+habitId
        })
    },
  //课堂详情跳转
    classDetails:function(e){
        console.log(e);
        var habitId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../roleDetail/roleDetail?id='+habitId
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
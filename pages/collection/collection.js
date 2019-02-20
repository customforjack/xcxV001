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
   return wx.ajax({
      url: '/api/Member/getCollectionList',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        type: type,
        page: 1,
        pageSize: 20
      }
    }).then(res =>{
     
        console.log("我的课堂", res);
        if (res.code === 1) {
         
          var habitList = res.data.data;
          that.setData({
            habitList: habitList,
            page_habit: res.data.count.page,
            pageSize_habit: res.data.count.pageSize
          })
        }
      
    });
  },
  //加入习惯,跳转详情
    habitDetails:function(e){
        console.log('详情id',e);
      const _this = this
      this.getDetail(e.currentTarget.dataset.id).then(res => {
        console.log('res:', res)
        
        if (res.code === 601) {
          // 则给出提示，并跳转至对应角色详情页
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/my_roles/myRoles?character_id=' + e.currentTarget.dataset.character_id,
            })
          }, 1000)
        }
        if (res.code === 1) {
          wx.navigateTo({
            url: '/pages/add_habit_step1/addHabitStep1?' + wx.getParams(res.data),
          })
        }
        if (res.code === 400) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
        if (res.code === 602) {
          // 则跳转至对应我的习惯详情
          console.log('则跳转至对应我的习惯详情')
          wx.navigateTo({
            url: '/pages/habitDetail/habitDetail?' + wx.getParams(_this.data.item),
          })
        }
      })


        // var habitId = {
        //   member_habit_id:e.currentTarget.dataset.id
        //   };

        // wx.navigateTo({
        //   url: '../habitDetail/habitDetail?' + wx.getParams(habitId)
        // })
    },
    getDetail(_id) {
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
// pages/supervisor/supervisor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    tabx: 0,
    model: false
  },
  changeTab(e) {
    var that=this;
    var tab = e.currentTarget.dataset.tab;
    this.setData({
      flag: tab
    });
    if (tab==1){
      console.log(that.data)
      that.supervisorMeList();
      wx.setNavigationBarTitle({
        title: '督导我的'
      })
    } else if(tab == 0){
      that.mySupervisorList();
      wx.setNavigationBarTitle({
        title: '我督导的'
      })
    };
  },
  dkSuccess(e){
    console.log(e)
    this.setData({
      model: e.detail
    })
  },
//组建传值
  numChange(e) {
    console.log(e);
    // const numi = e.detail;

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      that.mySupervisorList();
  },
    /*我督导的*/
    mySupervisorList:function(){
        var that=this;

      return  wx.ajax({
            url: '/api/Member/mySupervisorList',
            checkRole: false,
            params: {
                token: wx.getStorageSync('token'),
                page:1,
                pageSize: 20
            }
      }).then(res => {
       
          console.log("我的督导", res);
          if (res.code === 1) {
            var supervisorList = res.data;
            that.setData({
              supervisorList: supervisorList,

            })
            wx.setNavigationBarTitle({
              title: '我督导的'
            })
          
        }
      });
    },
    /*督导我的*/
    supervisorMeList: function () {
    var that = this;
  return  wx.ajax({
      url: '/api/Member/supervisorMeList',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        page: 1,
        pageSize: 20
      }
    }).then(res => {
    
        console.log("督导我的", res);
        if (res.code === 1) {

          var supervisorMeList = res.data;
          that.setData({
            supervisorMeList: supervisorMeList,
           
          })
        }
      
    });
  },
  //  更多督导
    moreDudao:function(){
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
  // 督导详情
    dudaoDetail:function(e){
      console.log(e);
      var super_id = { member_habit_id: e.currentTarget.dataset.id };
      console.log(super_id);
        wx.navigateTo({
           url: '../dudaoDetail/dudaoDetail?' + wx.getParams(super_id)
         // url: '/pages/habitDetail/habitDetail?' + wx.getParams(super_id)
          
        })

    },
    //袭ta一下
  hint:function(){
    this.setData({
      model:true
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
    
    // var that = this;
    // console.log(that.data.flag);
    // if (this.data.flag == 1) {
    //   that.supervisorMeList();
    // }
    // else if (this.data.flag == 0) {
    //   that.mySupervisorList();
    // } 
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
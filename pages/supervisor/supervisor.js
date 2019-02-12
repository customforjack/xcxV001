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
    } else if(tab == 0){
    
      that.mySupervisorList();
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      that.mySupervisorList();
  },
    /*我的督导*/
    mySupervisorList:function(){
        var that=this;

        wx.ajax({
            url: '/api/Member/mySupervisorList',
            checkRole: false,
            params: {
                token: wx.getStorageSync('token'),
                page:1,
                pageSize: 20
            },
            type: 'POST',
            success(res) {
                console.log("我的督导",res);
                if (res.code === 1) {
                    var supervisorList= res.data;
                    that.setData({
                        supervisorList:supervisorList,
                        
                    })
                }
            }
        });
    },
    /*督导我的*/
    supervisorMeList: function () {
    var that = this;
    wx.ajax({
      url: '/api/Member/supervisorMeList',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        page: 1,
        pageSize: 20
      },
      type: 'POST',
      success(res) {
        console.log("督导我的", res);
        if (res.code === 1) {
          
          var supervisorMeList = res.data;
          that.setData({
            supervisorMeList: supervisorMeList,
            // page_habit:res.data.count.page,
            // pageSize_habit:res.data.count.pageSize
          })
        }
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
      var super_id = e.currentTarget.id;
        wx.navigateTo({
          url: '../dudaoDetail/dudaoDetail?' + wx.getParams(super_id)
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
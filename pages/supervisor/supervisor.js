// pages/supervisor/supervisor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    tabx: 0
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
    mySupervisorList:function(){
        var that=this;
        /*我的督导*/
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
                    // 角色获取成功
                    res.data=[
                        {
                            "id": 1,
                            "habit_name": "去去去111",
                            "page_view": "1",
                          "thumbnail":"http://img.jiangtang360.com/15459782555c25c18f6b1aa.jpg",
                            "member_name": "去去去111",
                            "sign_num": "1"
                        },
                        {
                            "id": 2,
                            "habit_name": "去去去222",
                            "page_view": "1",
                            "thumbnail": "http://img.jiangtang360.com/15459782555c25c18f6b1aa.jpg",
                            "member_name": "去去去222",
                            "sign_num": "1"
                        },
                    ];
                    var supervisorList= res.data;
                    that.setData({
                        supervisorList:supervisorList,
                        // page_habit:res.data.count.page,
                        // pageSize_habit:res.data.count.pageSize
                    })
                }
            }
        });
    },
  supervisorMeList: function () {
    var that = this;
    /*督导我的*/
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
          // 角色获取成功
          res.data = [
            {
              "id": 1,
              "habit_name": "督导我的",
              "page_view": "1",
              "thumbnail": "http://img.jiangtang360.com/15459782555c25c18f6b1aa.jpg",
              "member_name": "督导我的",
              "sign_num": "1",
              "supervisor_list": [
                {
                  member_name: "小罗",
                  member_img: "http://img.jiangtang360.com/15459782555c25c18f6b1aa.jpg"
                }
              ]
            },
            {
              "id": 2,
              "habit_name": "去去去222",
              "page_view": "1",
              "thumbnail": "http://img.jiangtang360.com/15459782555c25c18f6b1aa.jpg",
              "member_name": "去去去222",
              "sign_num": "1",
              "supervisor_list": [
                {
                  member_name: "小李",
                  member_img: "http://img.jiangtang360.com/15459782555c25c18f6b1aa.jpg"
                },
                 {
                  member_name: "小李",
                  member_img: "http://img.jiangtang360.com/15459782555c25c18f6b1aa.jpg"
                }
              ]
            },
          ];
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
// pages/my_role/my_role.js
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
      if(tab==1){
          that.myCharacterUnused();
          console.log(that.data)
      }else if(tab==0){
          that.myCharacterUsed();
      }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that= this;
      that.myCharacterUsed();

  },
  //获取已使用角色列表
    myCharacterUsed:function(){
        var that= this;
        /*获取已使用角色*/
        wx.ajax({
            url: '/api/Member/myCharacterUsed',
            checkRole: false,
            params: {
                token: wx.getStorageSync('token'),
                page:1,
                pageSize: 20
            },
            type: 'POST',
            success(res) {
                console.log("角色",res.data);
                console.log("角色",res);
                if (res.code === 1) {
                    // 角色获取成功
                    res.data=[
                        {
                            "id": 1,
                            "name": "测试角色",
                            "thumbnail": "../../img/advertisement.jpg",
                            "description": "阿斯顿撒",
                            "end_time": "2018-01-11",
                            "time_status": 1
                        },
                        {
                            "id": 2,
                            "name": "测试角色",
                            "thumbnail": "../../img/advertisement.jpg",
                            "description": "阿斯顿撒",
                            "end_time": "2018-01-11",
                            "time_status": 1
                        },
                    ];
                    var roleList= res.data;

                    that.setData({
                        roleList:roleList
                    })
                }
            }
        });
    },
  //获取未使用的角色列表
    myCharacterUnused:function(){
        var that= this;
        wx.ajax({
            url: '/api/Member/myCharacterUnused',
            checkRole: false,
            params: {
                token: wx.getStorageSync('token'),
                page:1,
                pageSize: 20
            },
            type: 'POST',
            success(res) {
                console.log("未使用角色",res.data);
                console.log("未使用角色",res);
                if (res.code === 1) {
                    // 角色获取成功
                    res.data=[
                        {
                            "id": 1,
                            "name": "未使用角色",
                            "thumbnail": "../../img/advertisement.jpg",
                            "description": "阿斯顿撒",
                            "end_time": "2018-01-01",
                            "number2":3,
                            "time_status": 1
                        },
                        {
                            "id": 2,
                            "name": "未使用角色",
                            "thumbnail": "../../img/advertisement.jpg",
                            "description": "阿斯顿撒",
                            "end_time": "2018-01-01",
                            "number2":1,
                            "time_status": 1
                        },
                    ];
                    var roleList_no= res.data;

                    that.setData({
                        roleList_no:roleList_no
                    })
                }
            }
        })
    },

  //跳转角色详情
  details:function(e){
    console.log(e);
    var roleId = e.currentTarget.dataset.id
    var that = this;
    wx.navigateTo({
      url: '../roleDetail/roleDetail?id='+roleId
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
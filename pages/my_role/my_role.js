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
                console.log("已使用角色",res.data);
                if (res.code === 1) {
                    
                  var roleList = res.data.data;

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
                console.log("未使用角色",res);
                if (res.code === 1) {
                   
                  var roleList_no = res.data.data;

                    that.setData({
                        roleList_no:roleList_no
                    })
                }
            }
        })
    },
  //点击使用/延长
  employ:function(e){
    var character_id = e.currentTarget.dataset.id;
    console.log(e.currentTarget.dataset.id);
    wx.ajax({
      url: '/api/Order/useStock',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        character_id: character_id,
        number: 1
      },
      type: 'POST',
      success(res) {
        if (res.code === 1) {
          console.log("使用成功", res);
        } else if (res.code === 400){
          //无库存跳转购买页面
        }
      }
    })
  },
  //点击延长
  longTime:function(e){

  },
  //跳转角色详情
  details:function(e){
    console.log(e);
    var roleId = e.currentTarget.dataset.id
    var that = this;
    wx.navigateTo({
      url: '../my_roles/myRoles?id='+roleId
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
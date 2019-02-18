// pages/my_role/my_role.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    tabx: 0,

    icon: wx.getStorageSync('userInfo').avatarUrl,
    nickName: wx.getStorageSync('userInfo').nickName,
    forward_data:{},
    song:false
  },
  changeTab(e) {
    var that=this;
    var tab = e.currentTarget.dataset.tab;
    this.setData({
      flag: tab
    });
      if(tab==0){
          that.myCharacterUnused();
          console.log(that.data)
      }else if(tab==1){
          that.myCharacterUsed();
      }
  },
  showModal:function(e){
    console.log(e)
    this.setData({
      song: false,
    })
  },
  give: function (options) {
    var that=this;
    console.log(options);
   
    that.setData({
      song:true,
      forward_data: options.currentTarget.dataset.id
      })
   return wx.ajax({
      url: '/api/Order/createPresent',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        character_id: that.data.forward_data.id
      }
    }).then(res =>{
     
        console.log("赠送", res.data);
        if (res.code === 1) {
          var forward2 = 'forward_data.zs_id'
          that.setData({
            [forward2]: res.data.id
          })
          console.log(that.data.forward_data)
        
      }
    });
   
  },
  //转发
  onShareAppMessage(res) {
    console.log(res);

    if (res.from === 'button') {
      // 来自页面内转发按钮
     
      console.log(this.data.forward_data);
    
    }
    var params = this.data.forward_data

    return {
      title: `${this.data.nickName}赠送你礼物`,
      path: '/pages/test/test?' + wx.getParams(params),
      imageUrl: this.data.forward_data.thumbnail,
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that= this;
      that.myCharacterUnused();

  },
 
  //获取已使用角色列表
    myCharacterUsed:function(){
        var that= this;
        /*获取已使用角色*/
       return wx.ajax({
            url: '/api/Member/myCharacterUsed',
            checkRole: false,
            params: {
                token: wx.getStorageSync('token'),
                page:1,
                pageSize: 20
            }
        }).then(res =>{
          
            console.log("已使用角色", res.data);
            if (res.code === 1) {

              var roleList = res.data.data;

              that.setData({
                roleList: roleList
              })
            
          }
        });
    },
  //获取未使用的角色列表
    myCharacterUnused:function(){
        var that= this;
       return wx.ajax({
            url: '/api/Member/myCharacterUnused',
            checkRole: false,
            params: {
                token: wx.getStorageSync('token'),
                page:1,
                pageSize: 20
            }
        }).then(res =>{
        
            console.log("未使用角色", res);
            if (res.code === 1) {

              var roleList_no = res.data.data;

              that.setData({
                roleList_no: roleList_no
              })
            }
          
        })
    },
  //点击使用/延长
  employ:function(e){
    var that=this;
    var character_id = e.currentTarget.dataset.id;
    console.log(e.currentTarget);
   return wx.ajax({
      url: '/api/Order/useStock',
      checkRole: false,
      params: {
        token: wx.getStorageSync('token'),
        character_id: character_id,
        number: 1
      }
    }).then(res =>{
      
        if (res.code === 1) {
          console.log("使用成功", res);
          if (that.data.flag == 1) {
            if (getCurrentPages().length != 0) {
              //刷新当前页面的数据
              getCurrentPages()[getCurrentPages().length - 1].onLoad();
              wx.showToast({
                title: '延长成功',
                icon: 'success',
                duration: 2000,
              })
            }
          } else {
            wx.showToast({
              title: '使用成功',
              icon: 'success',
              duration: 1000,
              success:
                setTimeout(
                  function () {
                    wx.navigateTo({
                      url: '../my_roles/myRoles?id=' + character_id
                    })

                  }, 1000)
            })

          }


        } else if (res.code === 400) {
          wx.showToast({
            title: '库存不足',
            icon: 'none',
            duration: 1000
          })
        }
      
    })
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

 

})
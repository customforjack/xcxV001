// pages/test/test.js
Page({
  data: {
    options:{}
   },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      options: options
      })
    wx.ajax({
      url: '/api/Order/getPresent',
      checkRole: true,
      params: {
        token: wx.getStorageSync('token'),
        id: that.data.options.zs_id
      },
      type: 'POST',
      success(res) {
        console.log("赠送", res.data);
        if (res.code === 1) {
         that.setData({
           zs_data:res.data
         })
          console.log(res)
        }
      }
    });
  },
  
  accept:function(){
    var that=this;
    wx.ajax({
      url: '/api/Order/submitPresent',
      checkRole: true,
      params: {
        token: wx.getStorageSync('token'),
        id: that.data.options.zs_id
      },
      type: 'POST',
      success(res) {
        console.log("接受", res);
        if (res.code === 1) {
          console.log(res)
          wx.navigateTo({
            url: '/pages/my_role/my_role.js'
          })
        }else{
          wx.showToast({
            title: '接受失败',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index'
            })
          },2000)
          
        }
      }
    });
  }
 
})
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
  }
  
  
 
})
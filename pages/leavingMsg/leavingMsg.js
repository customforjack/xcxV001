// pages/leavingMsg/leavingMsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{},
    images: '',
    video: '',
    audio: '',
    content:'',
    files: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    this.setData({
      params: options
    })
  },
  say(e){
    console.log(e)
    this.setData({
      content: e.detail.value
    })
  },
  subForm(){
    const _this = this
    //提交数据
    if (this.data.content === ''){
      wx.showToast({
        title: '感想不能为空',
        icon:'none'
      })
      return false
    }
    if (this.data.images || this.data.audio || this.data.video) {


      return
      wx.ajax({
        url: '/api/Topic/topicAdd',
        params : {
          token:wx.getStorageSync('token'),
          type: parseInt(_this.data.params.type),
          p_id: parseInt(_this.data.params.p_id),
          content: _this.data.content,
          images: _this.data.images,
          video: _this.data.video,
          audio: _this.data.audio
        }
      }).then(res => {
        console.log(_this.data.images)
        if(res.code === 1){
          wx.showToast({
            title: '提交成功',
            icon:'none'
          })
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })

    } else {
      wx.showToast({
        title: '图片、视频和音频必须提交一项',
        icon: 'none'
      })
      return false
    }
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
  upImg(){
    const _this =this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log('file', res.tempFiles)

        res.tempFilePaths.forEach(item => {
          console.log('item', item)
          const uploadTask = wx.uploadFile({
            url: 'http://124.225.68.169:7777/api/Topic/upload',
            filePath:item,
            name: 'file',
            formData: wx.getMd5({token: wx.getStorageSync('token')}),
            success(res) {
              console.log('upload img', res.data)
              // do something
            }
          })
        })
        // 先上传文件

        _this.setData({
          tempFiles: res.tempFiles
        })
        console.log('....', tempFilePaths)
        const arr = []
        tempFilePaths.forEach(item => {
          console.log(item)
          arr.push(item)
        })
        const imgUrls = tempFilePaths.join(',')
        _this.setData({
          images: imgUrls
        })
      }
    })
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
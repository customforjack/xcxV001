// pages/leavingMsg/leavingMsg.js
const RecorderManager = wx.getRecorderManager()
const InnerAudioContext = wx.createInnerAudioContext()
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
    imgArr: [],
    audioArr: [],
    audioFlag:false
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
    if (this.data.imgArr.length || this.data.audioArr.length || this.data.video) {
      wx.ajax({
        url: '/api/Topic/topicAdd',
        params : {
          token:wx.getStorageSync('token'),
          type: parseInt(_this.data.params.type),
          p_id: parseInt(_this.data.params.p_id),
          content: _this.data.content,
          images: _this.data.imgArr.join(','),
          video: _this.data.audioArr[0].src,
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
  saveAudio () {
    RecorderManager.stop();
  },
  delAudio(e){
    this.data.audioArr.splice(e.currentTarget.dataset.idx, 1)
    this.setData({
      audioArr: this.data.audioArr
    })
  },
  playAudio(){
    InnerAudioContext.autoplay = true
    InnerAudioContext.src = this.tempFilePath,
      InnerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    InnerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  toUpAudio(file, duration){
    const _this = this
          wx.uploadFile({
            url: 'https://admin.habit21.com.cn/api/Topic/upload',
            filePath:file,
            name: 'file',
            formData: wx.getMd5({token: wx.getStorageSync('token')}),
            success(res) {
              console.log('upload audio', res.data)
              const d = JSON.parse(res.data)
              if (d.code === 1){
                _this.data.audioArr.push({
                  src: d.data.src,
                  duration: duration/1000
                })
                _this.setData({
                  audioArr: _this.data.audioArr
                })
              }else{
                wx.showToast({
                  title: d.msg,
                })
              }
              // do something
            },
            fail(err){
              console.log(err)
            }
          })
  },
  upAudio (){
    if (this.data.audioArr.lenght>0){
      this.showToast({
        title:'您已经有一段录音了'
      })
      return false
    }
    this.setData({
      audioFlag:true
    })
    const options = {
      duration: 60000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    RecorderManager.start(options)
    RecorderManager.onStop((res) => {
      console.log('audio', res)
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
      this.setData({
        audioFlag: false
      })
      this.toUpAudio(tempFilePath, res.duration)
    })
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
        console.log('params', wx.getMd5({ token: wx.getStorageSync('token') }))        
        res.tempFilePaths.forEach((item,i) => {
          console.log('item', item)
          // 最多只能上传9张校验
          if(_this.data.imgArr.length >= 9){
            wx.showToast({
              title: '最多只能上传9张',
              icon:'none'
            })
            return false
          }
          wx.uploadFile({
            url: 'https://admin.habit21.com.cn/api/Topic/upload',
            filePath:item,
            name: 'file',
            formData: wx.getMd5({token: wx.getStorageSync('token')}),
            success(res) {
              console.log('upload img', res.data)
              const d = JSON.parse(res.data)
              if (d.code === 1){
                _this.data.imgArr.push(d.data.src)
                _this.setData({
                  imgArr:_this.data.imgArr
                })
              }else{
                wx.showToast({
                  title: d.msg,
                })
              }
              // do something
            },
            fail(err){
              console.log(err)
            }
          })
        })
        // 先上传文件


      }
    })
  },
  delImg(e){
    console.log(e.currentTarget.dataset.idx)
    this.data.imgArr.splice(e.currentTarget.dataset.idx, 1)
    this.setData({
      imgArr: this.data.imgArr
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
// components/showCard/showCard.js
const RecorderManager = wx.getRecorderManager()
const InnerAudioContext = wx.createInnerAudioContext()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer(newVal, oldVal, changedPath) {

  
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    playAudio(e){
      console.log('e', e.currentTarget.dataset.src)
      InnerAudioContext.autoplay = true
      InnerAudioContext.src = e.currentTarget.dataset.src,
        InnerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
      InnerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    },
    previewImage: function (e) {
      const current = e.target.dataset.src;
      wx.previewImage({
        current: current, // 当前显示图片的http链接  
        urls: this.data.item.images // 需要预览的图片http链接列表  
      })
    }
  }
})

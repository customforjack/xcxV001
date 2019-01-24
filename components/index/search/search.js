// components/index/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value:'',
      observer: function (newVal, oldVal, changedPath) {
        this.setData({
          text: newVal
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    focus:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focus(){
      this.setData({
        focus: true
      })
    },
    blur(){
      if (this.data.text === '') {
        this.setData({
          focus: false
        })
      }
    },
    comfirm(){
      this.triggerEvent('comfirm', { text: this.data.text})
    },
    input (e){
      this.setData({
        text: e.detail.value
      })
    }
    }
})

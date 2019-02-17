// components/dakaSuccess/dakaSuccess.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:true,
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        console.log('newVal', newVal)
        return newVal     
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
    close(){
      this.setData({
        show:false
      })
    //  this.triggerEvent('showTab', this.data.show);
    }
  }
})

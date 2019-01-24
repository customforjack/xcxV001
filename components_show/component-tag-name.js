// components/component-tag-name.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    showModal: function (res) {
      console.log(res);
      this.setData({
        show: true,
        mark: res,
        pay: res
      })
    },
    close: function (res) {
      console.log(3);
      this.triggerEvent('showModal', res.data);
      this.setData({
        show: false
      })
    }
  }
   
   
})
// const temp={
//   close: function () {
//     this.setDate({
//       show: false
//     })
//   }
// }
// module.exports = temp;


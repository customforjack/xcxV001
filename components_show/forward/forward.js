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
    show:true
  },
  //转发
  // onShareAppMessage(res) {
  //     console.log(this.data);
  //   if (res.from === 'button') {
  //     // 来自页面内转发按钮
  //     console.log(res);
     
  //   }


  //   return {
  //     title: `赠送你礼物`,
  //     path: '/pages/test/test',
  //     imageUrl: '',
  //     success: function (res) {
  //       // 转发成功
  //       console.log(res);
  //       console.log("转发成功:" + JSON.stringify(res));
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //       console.log("转发失败:" + JSON.stringify(res));
  //     }
  //   }
  // },
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
      this.triggerEvent('showModal', res.data);
  
    }
  }


})



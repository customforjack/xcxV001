// components/roles-card/roles-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      default:{}
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
    scBtn(e){
      console.log(e)
      const _this = this
      wx.ajax({
        url:'/api/Product/collection',
        params:{
          id: e.currentTarget.dataset.id,
          type: e.currentTarget.dataset.type
        }
      }).then(res => {
  
        if(res.code === 1){
          _this.triggerEvent('scSuccess',{msg:res.msg})
        }
      })
    }
  }
})

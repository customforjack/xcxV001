// components/index/renmenItem/remmenItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type: Object
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
    toaddStepOne() {
      wx.navigateTo({
        url: '/pages/add_habit_step1/addHabitStep1',
      })
    }
  }
})

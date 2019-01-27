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
    toaddStepOne(e) {
      console.log(e.currentTarget.dataset.id)
      this.getDetail(e.currentTarget.dataset.id).then(res => {
        console.log('res:', res)
        if (res.code === 601){
          // 则给出提示，并跳转至对应角色详情页
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '/pages/roleDetail/roleDetail',
          })
        }
        if(res.code === 1){
          wx.navigateTo({
            url: '/pages/add_habit_step1/addHabitStep1',
          })
        }
        if (res.code === 602){
          // 则跳转至对应我的习惯详情
          wx.navigateTo({
            url: 'pages/habitDetail/habitDetail',
          })
        }
      })
    },
    getDetail(_id){
      return new Promise((resolve,reject) => {
        wx.ajax({
          url: '/api/Product/getHabitAuth',
          params: {
            token:wx.getStorageSync('token'),
            id: _id
          },
          success (res){
            resolve(res)
          }
        })
      })
    }
  }
})

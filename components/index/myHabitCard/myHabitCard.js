// components/index/myHabitCard/myHabitCard.js
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
        if (res.code === 601) {
          // 则给出提示，并跳转至对应角色详情页
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/my_roles/myRoles?character_id=' + e.currentTarget.dataset.character_id,
            })
          }, 1000)
        }
        if (res.code === 1) {
          wx.navigateTo({
            url: '/pages/add_habit_step1/addHabitStep1',
          })
        }
        if (res.code === 400) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
        if (res.code === 602) {
          // 则跳转至对应我的习惯详情
          console.log('则跳转至对应我的习惯详情')
          wx.navigateTo({
            url: '/pages/habitDetail/habitDetail?member_habit_id=' + res.data.member_habit_id,
          })
        }
      })
    },
    getDetail(_id) {
      return new Promise((resolve, reject) => {
        wx.ajax({
          url: '/api/Product/getHabitAuth',
          params: {
            token: wx.getStorageSync('token'),
            id: _id
          },
          success(res) {
            resolve(res)
          }
        })
      })
    },
    todaka(e){
      const _this = this
      console.log('e',e.currentTarget.dataset.id)
      wx.ajax({
        url:'/api/Product/signMyHabit',
        params:{
          member_habit_id: e.currentTarget.dataset.id,
          token:wx.getStorageSync('token')
        }
      }).then(res=>{
        wx.showToast({
          title: res.msg,
        })
        if(res.code === 1){
          console.log('child ok...')
          try{
            _this.triggerEvent('myEvent', { val: 'ok' })
          }catch(err){
            console.error(err)
          }
        }
      })
    },
    toDetail(e){
      console.log(e)
      if (e.currentTarget.dataset.ismine == 1){
        wx.navigateTo({
          url: '/pages/habitDetail/habitDetail?member_habit_id=' + e.currentTarget.dataset.id,
        })
      }
      if (e.currentTarget.dataset.ismine == 0) {
        this.toaddStepOne(e)
      }
    }

  }
})

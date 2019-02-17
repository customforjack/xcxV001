// pages/buyRoles/buyRoles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTab:0,
    tabs:[],
    showArr:[],
    duoxuanflag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    this.getRoles()
  },
  toNext(){
    wx.navigateTo({
      url: '/pages/my_roles/myRoles',
    })
  },
  duoxuan(){
    this.setData({
      duoxuanflag: !this.data.duoxuanflag
    })
  },
  toDetail(e){
    wx.navigateTo({
      url: '/pages/my_roles/myRoles?id='+e.currentTarget.dataset.id,
    })
  },
  toCheck(e){
    const index = e.currentTarget.dataset.fidx
    const idx = e.currentTarget.dataset.idx
    // 清空选中项
    this.data.showArr.forEach((item,i) =>{
      if(i != this.data.showTab){
        item.forEach(child => {
          child.checked = false
        })
      }
    })
    this.data.showArr[index][idx].checked = !this.data.showArr[index][idx].checked
    this.setData({
      showArr:this.data.showArr
    })
  },
  toBuy () {
    // 判断是否有选中项
    const checkArr = []
    this.data.showArr[this.data.showTab].forEach(item => {
      if(item.checked){
        checkArr.push(item)
      }
    })
    if(checkArr.length === 0){
      wx.showToast({
        title: '最少选择一项',
        icon:'none'
      })
      return false
    }
    // 存储订单数据 跳转到订单确认页
    const arr= []
    this.data.showArr[this.data.showTab].forEach(item=>{
      if(item.checked){
        arr.push(item)
      }
    })
    wx.setStorageSync('payList', arr)
    console.log('arr', arr)
      wx.navigateTo({
        url: '/pages/toPay/toPay',
      })
  },
  getRoles(){
    const _this = this
    return wx.ajax({
      url:'/api/Product/getCharacterListAll',
      params:{

      }
    }).then(res => {
      const arr = []
      const showArr = []
      res.data.forEach((item,i) => {
        if(i === 0){
          arr.push({
            checked:true,
            name:item.name
          })
        }else{
          arr.push({
            checked:false,
            name:item.name
          })
        }
        item.character_list.forEach(item =>{
          item.checked = false
        })
        showArr.push(item.character_list)
      })
      _this.setData({
        tabs:arr,
        showArr:showArr
      })
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  toggleTab(e){
    console.log(e)
    let list = this.data.tabs
    // 清空选中项
    this.data.showArr.forEach((item, i) => {
      item.forEach(child => {
        child.checked = false
      })
    })

    list.forEach(item => {
      item.checked = false
    })
    list[e.currentTarget.dataset.idx].checked = true
  
    this.setData({
      tabs: this.data.tabs,
      showTab:e.currentTarget.dataset.idx,
      showArr: this.data.showArr
    })
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
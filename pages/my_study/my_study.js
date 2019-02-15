// pages/my_study/my_study.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    tabx: 0,
    card:1
  },
  changeTab(e) {
      var that=this;
      var tab = e.currentTarget.dataset.tab;
      that.setData({
      flag: tab
    })
      if(tab==1){
         that.myHabit();
      }else if(tab==0){
          that.myCourse();
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      that.myCourse();
  },
  /*我的课堂*/
    myCourse:function(){
        var that=this;
        wx.ajax({
            url: '/api/Member/myCourse',
            checkRole: false,
            params: {
                token: wx.getStorageSync('token'),
                page:1,
                pageSize: 20
            },
            type: 'POST',
            success(res) {
              console.log(res);
                console.log("我的课堂",res.data.data);
                console.log("页码",res.data.count);
                if (res.code === 1) {
                   
                    var studyList= res.data.data;
                    console.log(studyList);
                    that.setData({
                        studyList:studyList,
                        page_study:res.data.count.page,
                        pageSize_study:res.data.count.pageSize
                    })
                }
            }
        });
    },
  /*我的习惯*/
    myHabit:function(){
        var that=this;
        wx.ajax({
            url: '/api/Member/myHabit',
            checkRole: false,
            params: {
                token: wx.getStorageSync('token'),
                page:1,
                pageSize: 20
            },
            type: 'POST',
            success(res) {
                console.log("我的习惯1",res.data.data);
                console.log("我的习惯1",res.data.count);
                console.log("我的习惯", res);
                if (res.code === 1) {
                    
                    var habitList= res.data.data;
                    that.setData({
                        habitList:habitList,
                        page_habit:res.data.count.page,
                        pageSize_habit:res.data.count.pageSize
                    })
                }
            }
        });
},
  /*跳转课堂详情页*/
  classDetails: function (e) {
    console.log(e);
    var roleId = e.currentTarget.dataset.id
    var that = this;
    var role={
      id:roleId
    };
    wx.navigateTo({
      url: '../roleDetail/roleDetail?' + wx.getParams(role)
    })
  },
  /*跳转习惯详情页*/
  habitDetails:function(e){
        console.log(e);
    var habitId = {
      member_habit_id: e.currentTarget.dataset.id
      };
    console.log(habitId);
        wx.navigateTo({
          url: '../habitDetail/habitDetail?' + wx.getParams(habitId)
      })
    },
    //打卡
    daka:function(e){
        console.log(e);
        var that=this;
        var index = e.currentTarget.dataset.index;
        var habit_id = e.currentTarget.dataset.id;
        var up = "habitList[" + index + "].is_sign";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

        if(that.data.habitList[index].is_sign==0){
            that.setData({
                [up]:1
            })
          wx.ajax({
            url: '/api/Product/signMyHabit',
            checkRole: false,
            params: {
              token: wx.getStorageSync('token'),
              member_habit_id: habit_id
            },
            type: 'POST',
            success(res) {
              console.log("打卡", res);
              if (res.code == 1) {
                // 打卡成功
                // if(that.data.habitList[index].is_sign==0){
                that.setData({
                  [up]: 1
                })
                // }

              } else if (res.code == 400) {
                wx.showToast({
                  title: '已打卡',
                  icon: 'none',
                  duration: 1000
                })
              }
            }
          });
        }else {
          wx.showToast({
            title: '已打卡',
            icon: 'none',
            duration: 1000
          })
            console.log("已经点赞")
        }
        
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
    var that=this;
    console.log(that.data.flag);
    if (this.data.flag==1){
      that.myHabit();
    }
    else if (this.data.flag == 0){
      that.myCourse();
    } 
     },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
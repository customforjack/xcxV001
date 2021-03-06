// components/calendar/calendar.js
/**
 * 日历选择组件
 * 2018-03-04
 * mehaotian
 * github ：https://github.com/mehaotian
 */
Component({
  /**
   * 组件的属性列表
   * data [Date] 当前现实的月份
   * selected [Array] 所有被选择的天
   */
  externalClasses: ["reqi"],
  properties: {
    itemn:{
      type: Object,
      value:{}
    },
    date: {
      type: null,
      value:"",
        observer(newVal, oldVal, changedPath) {
        console.log("newVal",newVal);
          var new_data2 = newVal.replace(/-/g, "")
          this.setData({
            new_data2: new_data2
          })
          console.log(new_data2)
          this.all_daka()
        }
    },
    date1: {
        type: null,
        value: "",
        observer(newVal, oldVal, changedPath) {
            console.log("newVal",newVal)
          var new_data = newVal.replace(/-/g, "")
            this.setData({
              new_data: new_data
            })
          console.log(new_data)
        }
    },
    selected: {
      type: Array,
      value: [],
      observer(newVal, oldVal) {
        this.getWeek(new Date())
      }
    },
    isOpen: {
      type: Boolean,
      value: false,
    },
    mak_time: {  
      type: null,
      value: '',
      observer: function (newData, oldData) {
      
      }
    },
    show:{
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        console.log('newVal', newVal)
        return newVal
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    calShow: true, // 日历组件是否打开
    dateShow: false, // 日期是否选择
    selectDay: '', // 当前选择日期
    canlender: {
      "weeks": []
    },
    cousedis:0

  },
  ready() {
    console.log("传过来的值", this.properties);
     this.all_daka()
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    all_daka(current,all){
        var that = this
      if (!current){
          current=["",""]
        }
        //获取打卡日期
        if(that.data.date){
          if(!all){
              all=new Date(Date.parse(that.data.date.replace(/-/g,"/")));
          }
          
            that.getWeek(all)
        }else {
            return  wx.ajax({
                url: '/api/Product/getSignDate',
                params: {
                    token: wx.getStorageSync('token'),
                    member_habit_id: that.properties.mak_time,
                    year: current[0],
                    month: current[1]
                }
            }).then(res => {
                console.log("打卡日期",res);
                that.setData({
                    mak_time2: res.data
                })
                console.log(all);
                if(!all){
                        all=new Date()
                }
                console.log("渲染日历传值",all);
                that.getWeek(all)
            })
        }

      },
    selectDay(e) {
      console.log(e);
      var rowNum = e.currentTarget.dataset.week
      var rowNum2 = e.currentTarget.dataset.index
      console.log(this.data.canlender.weeks)
      console.log(this.data.canlender.weeks[rowNum][rowNum2])
      console.log(this.data.canlender.year)
      var clickYear = this.data.canlender.year;
      var clickMonth=this.data.canlender.weeks[rowNum][rowNum2].month;
      
      if (clickMonth<10){
        console.log(clickMonth);
        clickMonth = '0' + clickMonth
      }
      var clickDay=this.data.canlender.weeks[rowNum][rowNum2].date;
      if (clickDay < 10) {
        console.log(clickMonth);
        clickDay = '0' + clickDay
      }
      //传值到页面
      var clickDate = clickYear + '-' + clickMonth + '-' + clickDay;
      console.log(clickDate);
      this.triggerEvent('clickDate', clickDate)
      if (this.data.canlender.weeks[rowNum][rowNum2].col==0){
        console.log("选中");
          // console.log(this.data.canlender.year)
          // console.log(this.data.canlender.weeks[rowNum][rowNum2].month)
          // console.log(this.data.canlender.weeks[rowNum][rowNum2].date)

        this.data.canlender.weeks[rowNum][rowNum2].col=1
        console.log(this.data);    
      }else {
        console.log("未选中");
        this.data.canlender.weeks[rowNum][rowNum2].col = 0
      }
      console.log(this.data.canlender)
      this.setData({
        canlender: this.data.canlender
      })
      console.log(this.data);
      let index = e.currentTarget.dataset.index;
      let week = e.currentTarget.dataset.week;
      let ischeck = e.currentTarget.dataset.ischeck;
      let canlender = this.data.canlender;
      if (!ischeck) return false;
      let month = canlender.weeks[week][index].month < 10 ? "0" + canlender.weeks[week][index].month : canlender.weeks[week][index].month
      let date = canlender.weeks[week][index].date < 10 ? "0" + canlender.weeks[week][index].date : canlender.weeks[week][index].date
     // this.getWeek(canlender.year + "-" + month + "-" + date);
  
    },

    // 返回今天
    backtoday() { this.getWeek(new Date()); },
    // 前一天|| 后一天
    dataBefor(e) {
      let num = 0;
      let types = e.currentTarget.dataset.type;

      if (e.currentTarget.dataset.id === "0") {
        num = -1;
      } else {
        num = 1
      }
      let year = this.data.canlender.year + "-" + this.data.canlender.month + "-" + this.data.canlender.date
      let _date = this.getDate(year, num, types === 'month' ? "month" : "day");
      console.log(_date)
      console.log(_date.split("-"));
      let _datef = _date.split("-")
      this.all_daka(_datef, _date)
     // this.getWeek(_date);
    },
    // 获取日历内容
      getWeek(dateData) {
      let selected = this.data.selected
      let a = new Date()
      // console.log("im date ", a, typeof a === 'object')
      // 判断当前是 安卓还是ios ，传入不容的日期格式
      if (typeof dateData !== 'object') {
        dateData = dateData.replace(/-/g, "/")
      }
      let _date = new Date(dateData);
      let year = _date.getFullYear(); //年
      let month = _date.getMonth() + 1;  //月
      let date = _date.getDate();//日
      let day = _date.getDay();// 天
      let canlender = [];
      let dates = {
        firstDay: new Date(year, month - 1, 1).getDay(),
        lastMonthDays: [],// 上个月末尾几天
        currentMonthDys: [], // 本月天数
        nextMonthDays: [], // 下个月开始几天
        endDay: new Date(year, month, 0).getDay(),
        weeks: []
      }
        console.log("11111111111111",year)
      // 循环上个月末尾几天添加到数组
      for (let i = dates.firstDay; i > 0; i--) {
        dates.lastMonthDays.push({
          'date': new Date(year, month, -i).getDate() + '',
          'month': month - 1
        })
      }
      // 循环本月天数添加到数组
      //将求情拿到的打卡日期和当前渲染的日期对比插入到数组一个状态
      console.log("需要显示的红点", this.data.mak_time2)
          if(this.data.mak_time2){
              var mark_list = this.data.mak_time2.day.map(Number);
            var mark_list2 = this.data.mak_time2.day_fail.map(Number);
          }else {
              mark_list=[];
              mark_list2 = [];
          }

      let mark = false;
      let mark_fail=false;
      console.log(mark_list);
      for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
       
        if (mark_list.indexOf(i) != -1) {
          mark = true;
        } else { 
          mark = false;
          }
        if (mark_list2.indexOf(i) != -1) {
          mark_fail = true;
        } else {
          mark_fail = false;
        }


        let have = false;
        for (let j = 0; j < selected.length; j++) {
          let selDate = selected[j].date.split('-');

          if (Number(year) === Number(selDate[0]) && Number(month) === Number(selDate[1]) && Number(i) === Number(selDate[2])) {
            have = true;
          }
          
        }
        // console.log("258888",year)
        // console.log("258888",month)
        // console.log("258888",i)
          var month_ao=''
          var day_ao=''
          if(month<10){
            month_ao="0"+month
          }else {
              month_ao=month
          }
          if(i<10){
              day_ao="0"+i
          }else {
              day_ao=i;
          }
          var q=year.toString();
          var w=month_ao.toString();
          var e = day_ao.toString();
          var duibi=q+w+e;
          // console.log(duibi)
        dates.currentMonthDys.push({
          'date': i + "",
          'month': month,
          'year': duibi,
          col:0,
          mark,
          mark_fail,
          have
        })
      }
      
      // 循环下个月开始几天 添加到数组
      for (let i = 1; i < 7 - dates.endDay; i++) {
        dates.nextMonthDays.push({
          'date': i + '',
          'month': month + 1
        })
      }
      
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays)
      // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
      for (let i = 0; i < canlender.length; i++) {
        if (i % 7 == 0) {
          dates.weeks[parseInt(i / 7)] = new Array(7);
        }
        dates.weeks[parseInt(i / 7)][i % 7] = canlender[i]
      }
      // 渲染数据
      this.setData({
        selectDay: month + "月" + date + "日",
        "canlender.weeks": dates.weeks,
        'canlender.month': month,
        'canlender.date': date,
        "canlender.day": day,
        'canlender.year': year
        // 'mak_y': 2019,
        // 'mak_m': 2,
        // 'mak_d': [11,12,13]
      })
      
      month = month < 10 ? "0" + month : month
      date = date < 10 ? "0" + date : date
      this.triggerEvent('getdate', { year, month, date })
    },

    /**
     * 时间计算
     */
    getDate(date, AddDayCount, str = 'day') {
      if (typeof date !== 'object') {
        date = date.replace(/-/g, "/")
      }
      let dd = new Date(date)
      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount)// 获取AddDayCount天后的日期
          break;
        case 'month':
          dd.setMonth(dd.getMonth() + AddDayCount)// 获取AddDayCount天后的日期
          break;
        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount)// 获取AddDayCount天后的日期
          break;
      }
      let y = dd.getFullYear()
      let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1)// 获取当前月份的日期，不足10补0
      let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()// 获取当前几号，不足10补0
      return y + '-' + m + '-' + d
    }
  }
})

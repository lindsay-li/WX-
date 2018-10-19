// pages/start/start.js
let tool = require("../..//utils/requst.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paused: true,
    currentDay: 1,
    currentMonth: 1,
    currentYear: 1970,
    currentWeek: 1,
    days: [],
    year: "",
    moth: "",
    day: "",
    forget: "",
    focus: false
  },
  getdays: function () {
    let now = new Date()
    this.setData({
      year: now.getFullYear(),
      moth: now.getMonth() + 1,
      day: now.getDate()
    })
  },
  getFlag: function () {
    tool.post('/flag')
      .then((res)=>{
        console.log(res)
        if (res.data == 1) {
          this.setData({
            paused: true
          })
        } else {
          this.setData({
            paused: false
          })
        }
      })
  },
  goIndex: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  confirm: function (e) {
    this.setData({
      forget: e.detail.value.textarea
    })
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  initData: function (cur) {
    let that = this;
    let leftcount = 0; //存放剩余数量
    let date;
    if (cur) {
      date = new Date(cur);
    } else {
      let now = new Date();
      let d = new Date(that.formatDate(now.getFullYear(), now.getMonth(), 1));
      d.setDate(35);
      date = new Date(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    }
    that.setData({
      currentDay: date.getDate(),
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth() + 1,
      currentWeek: date.getDay()
    })
    // that.currentDay = date.getDate();
    // that.currentYear = date.getFullYear();
    // that.currentMonth = date.getMonth() + 1;
    // that.currentWeek = date.getDay(); // 1...6,0
    if (that.data.currentWeek == 0) {
      that.setData({
        currentWeek: 7
      })
      // that.currentWeek = 7;
    }
    let str = that.formatDate(that.data.currentYear, that.data.currentMonth, that.data.currentDay);
    that.data.days.length = 0;
    // 今天是周日，放在第一行第7个位置，前面6个
    //初始化本周
    for (let i = that.data.currentWeek - 1; i >= 0; i--) {
      let d = new Date(str);
      d.setDate(d.getDate() - i);
      let s = d.getDate()
      let m = d.getMonth() + 1
      let y = d.getFullYear()
      let dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
      dayobject.day = s;
      dayobject.m = m;
      dayobject.y = y;
      that.data.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
      that.setData({
        days: that.data.days
      })
    }
    //其他周
    for (let i = 1; i <= 35 - that.data.currentWeek; i++) {
      let d = new Date(str);
      d.setDate(d.getDate() + i);
      let s = d.getDate()
      let m = d.getMonth() + 1
      let y = d.getFullYear()
      let dayobject = {};
      dayobject.day = s;
      dayobject.m = m;
      dayobject.y = y;
      that.data.days.push(dayobject);
      that.setData({
        days: that.data.days
      })
    }
  },
  pickPre: function (e) {
    let that = this;
    // setDate(0); 上月最后一天
    // setDate(-1); 上月倒数第二天
    // setDate(dx) 参数dx为 上月最后一天的前后dx天
    let year = this.data.currentYear
    let month = this.data.currentMonth
    let d = new Date(that.formatDate(year, month, 1));
    d.setDate(0);
    that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
  },
  pickNext: function (e) {
    let year = this.data.currentYear
    let month = this.data.currentMonth
    let that = this;
    let d = new Date(that.formatDate(year, month, 1));
    d.setDate(35);
    that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
  },
  // // 返回 类似 2016-01-02 格式的字符串
  formatDate: function (year, month, day) {
    let y = year;
    let m = month;
    if (m < 10) m = "0" + m;
    let d = day;
    if (d < 10) d = "0" + d;
    return y + "-" + m + "-" + d
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFlag()
    this.initData(null);
    this.getdays()
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
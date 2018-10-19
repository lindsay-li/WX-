// pages/artists/artists.js
let tool = require("../..//utils/requst.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singer:[]
  },
  getHotAr: function () {
    tool.post('/top/artists?offset=0&limit=200')
    .then((res)=>{
      this.setData({
        singer: res.artists
      })
    })
  },
  goSinger: function (e) {
    wx.navigateTo({
      url: '/pages/singer/singer?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotAr()
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
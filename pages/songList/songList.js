// pages/songList/songList.js
let tool = require("../..//utils/requst.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: []
  },
  getSonglist: function () {
    let that = this;
    tool.post('/personalized').then((res)=>{
      let songLists = res.result
      /*提前改变播放数量的值*/
      let newsongs = [];
      /*提前改变播放数量的值*/
      songLists.map(item => {
        let num = item.playCount;
        let n = num.toString().split(".")[0]
        if (n.length < 6) {
          item.playCount = n;
          newsongs.push(item)
        } else {
          item.playCount = n.slice(0, -4) + "万";
          newsongs.push(item)
        }
        that.setData({
          songList: newsongs
        })
      })
    })
  },
  goList: function (e) {
    wx.navigateTo({
      url: '/pages/songsDetail/songsDetail?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSonglist()
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
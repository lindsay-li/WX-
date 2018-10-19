// pages/users/users.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "",
    user_name: "",
    playUrl: "https://www.xiaochengzi.xyz/image/play.png",
    likeList: [],
    show_login: true
  },
  getUser(e) {
    if (!e.detail.userInfo) {
      wx.showModel({
        showCancel: false,
        title: "",
        content: "登录失败"
      })
      return
    }
    this.setData({
      show_login:false,
      imgUrl: e.detail.userInfo.avatarUrl,
      user_name: e.detail.userInfo.nickName
    })
    
    wx.setStorage({
      key: 'user_info',
      data: e.detail.userInfo,
    })    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'user_info',
      success: (e) => {
        this.setData({
          show_login: false,
          imgUrl: e.data.avatarUrl,
          user_name: e.data.nickName
        })
      },
      fail: ()=>{
        this.setData({
          show_login: true
        })
      }
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
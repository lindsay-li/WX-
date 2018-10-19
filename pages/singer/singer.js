// pages/singer/singer.js
let tool = require("../..//utils/requst.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singerUrl: "",
    newSong: [],
    flag: true,
    content: "",
    names: "",
    id:""
  },
  getSingerDetail: function (n) {
    tool.post('/artists?',
      {
        id: n
      })
    .then((res)=>{
      console.log(res)
      this.setData({
        singerUrl : res.artist.picUrl,
        newSong : res.hotSongs,
        names : res.artist.name,
        content : res.artist.briefDesc,
        id:res.artist.id
      })
    })
  },
  swit: function () {
    this.setData({
      flag:true
    })
  },
  swits: function () {
    this.setData({
      flag: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id != undefined) {
      this.getSingerDetail(options.id)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
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
    return {
      title: this.data.names,
      imageUrl: this.data.singerUrl,
      path: '/pages/songsDetail/main?id=' + this.data.id,
      success: function (res) {
        // 转发成功
      }
    }
  },
  player: function (e) {
    wx.navigateTo({
      url: '/pages/player/playser?id=' + e.currentTarget.dataset.id
    })
  },
  addSonglist: function (e) {
    let songList = [];
    wx.getStorage({
      key: 'song_list',
      success: (res) => {
        songList = res.data || [];
      }
    })
    tool.post('/song/detail?', {
      ids: e.currentTarget.dataset.id
    })
      .then((res) => {
        let songs = {};
        songs.picUrl = res.songs[0].al.picUrl
        songs.name = res.songs[0].name
        songs.id = res.songs[0].id,
          songs.singer = res.songs[0].ar[0].name
        songList.push(songs)
        wx.setStorage({
          key: 'song_list',
          data: songList,
          success() {
            wx.showToast({
              title: '已添加到播放列表',
              icon: "none",
              duration: 1000
            })
            // store.commit('increment')
          }
        })
      })
  }
})
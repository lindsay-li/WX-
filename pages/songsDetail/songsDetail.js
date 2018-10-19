// pages/songsDetail/songsDetail.js
let tool = require("../..//utils/requst.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "",
    userUrl: "",
    coment: "https://www.xiaochengzi.xyz/image/coment.png",
    wenjian: "https://www.xiaochengzi.xyz/image/wenjian.png",
    share: "https://www.xiaochengzi.xyz/image/share.png",
    newSong: [],
    playCounts: 0,
    title: "",
    users: "",
    commentCounts: "评论",
    shareCounts: "分享",
    collects: "收藏",
    id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id != undefined) {
      this.getDetail(options.id)
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /*激活分享功能*/
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      return {
        title: this.data.title,
        imageUrl: this.data.imgUrl,
        path: '/pages/songsDetail/main?id=' + this.data.id,
        success: function (res) {
          // 转发成功
        }
      }
    }
  },
  getDetail: function (n) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    tool.post('/playlist/detail?',
      {
        id: n
      })
    .then((res)=>{
      let coll = res.result.subscribedCount.toString()
      let count = res.result.playCount.toString()
      this.setData({
        id : res.result.id,
        imgUrl : res.result.coverImgUrl,
        userUrl : res.result.creator.avatarUrl,
        newSong : res.result.tracks,
        title : res.result.name,
        users : res.result.creator.nickname,
        commentCounts : res.result.commentCount,
        shareCounts : res.result.shareCount,
        collects : this.counts(coll),
        playCounts : this.counts(count)
      })
      wx.hideLoading()
    })
  },
  counts: function (n) {
    if (n.length < 6) {
      return n;
    } else {
      return n.slice(0, -4) + "万";
    }
  },
  plays:function(){
    let songList = [];
    let newsongs = this.data.newSong
    for (let i = 0; i < newsongs.length;i++){
      (function(i){
          tool.post('/song/detail?', {
            ids: newsongs[i].id
          }).then((res) => {
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
              }
            })
          })
      }(i)) 
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
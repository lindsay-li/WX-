//index
let tool = require("../..//utils/requst.js");
let audio = getApp().globalData.audio;
Page({
  /*
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logoUrl: "https://www.xiaochengzi.xyz/image/logo.png",
    searchUrl: "https://www.xiaochengzi.xyz/image/search.png",
    rightUrl: "https://www.xiaochengzi.xyz/image/right.png",
    bannerUrl: [],
    flag: true,
    songList: [],
    newSong: [],
    artists: [],
    hotTXT: ["防弹少年团", "我们", "溯游从歌", "李志", "没有理由", "渺小却伟大", "谢春花", "炎亚纶", "偶像练习生", "慢慢喜欢你"],
    values: "",
    isFoucs: false,
    s_result: [],
    paused: false,
    s_list: [],
    flagClass:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner()
    this.getSonglist()
    this.getNewSong()
    this.getHotAr()
    
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
    if (getApp().globalData.globelAudio){
      this.setData({
        paused: true
      })
    }else{
      this.setData({
        paused: false
      })
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

  },
  /*获取banner*/
  getBanner:function () {
    let that = this;
    tool.post('/banner').then((res)=>{
      let resbanner = that.removeByValue(res.banners, 4)
      console.log(res)
      that.setData({
        bannerUrl: resbanner
      })
    }) 
  },
  removeByValue: function (arr, i) {
    arr.splice(i, 1);
    return arr
  },
  /*获取热门歌单*/
  getSonglist: function () {
    let that = this;
    tool.post('/personalized').then((res)=>{
      let songLists = res.result.slice(-6, )
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
  /*热门歌曲*/
  getNewSong:function () {
    tool.post('/top/list?idx=1').then((res)=>{
      this.setData({
        newSong: res.playlist.tracks
      })
    })
  },
  /*热门歌手*/
  getHotAr: function () {
    tool.post('/top/artists?offset=0&limit=6').then((res)=>{
      this.setData({
        artists: res.artists
      })
    })
  },
  /*热门推荐tab*/
  hot() {
    this.setData({
      flag: true
    })
  },
  /*搜索tab */
  searchs() {
    this.setData({
      flag: false,
      flagClass:true
    })
  },
  /*搜索歌曲*/
  getSearchResult: function (val) {
    tool.post('/search/suggest?', {
      keywords: val
    })
    .then((res)=>{
      this.setData({
        s_result: res.result.songs,
        s_list: res.result.playlists
      })
    })
  },
  changes: function (e) {
    // this.values = e.target.value
    this.setData({
      values: e.detail.value
    })
    if (e.detail.value !== ""){
      this.setData({
        isFoucs:true
      })
    }else{
      this.setData({
        isFoucs: false
      })
    }
  },
  confirms: function (e) {
    this.getSearchResult(this.data.values)
  },
  player: function (e) {
    wx.navigateTo({
      url: '/pages/player/playser?id=' + e.currentTarget.dataset.id
    })
  },
  songs: function () {
    wx.navigateTo({
      url: '/pages/songList/songList'
    })
  },
  arList: function () {
    wx.navigateTo({
      url: '/pages/artists/artists'
    })
  },
  goList: function (e) {
    wx.navigateTo({
      url: '/pages/songsDetail/songsDetail?id=' + e.currentTarget.dataset.id
    })
  },
  goSinger:function(e){
    wx.navigateTo({
      url: '/pages/singer/singer?id=' + e.currentTarget.dataset.id
    })
  },
  goplayer:function(){
    wx.navigateTo({
      url: '/pages/player/playser'
    })
  },
  addSonglist:function(e){
    let songList=[];
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
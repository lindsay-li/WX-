// pages/player/playser.js
let tool = require("../..//utils/requst.js");
let timer1=null;
let timer2=null;
// let audio = getApp().globalData.audio;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: "",
    imgUrl: "",
    needle: "https://www.xiaochengzi.xyz/image/needle-ip6.png",
    disc: "https://www.xiaochengzi.xyz/image/disc-ip6.png",
    like: "https://www.xiaochengzi.xyz/image/like.png",
    coment: "https://www.xiaochengzi.xyz/image/coment.png",
    list: "https://www.xiaochengzi.xyz/image/list.png",
    next: "https://www.xiaochengzi.xyz/image/next.png",
    pause: "https://www.xiaochengzi.xyz/image/paused.png",
    playing: "https://www.xiaochengzi.xyz/image/playing.png",
    paused: false,
    deg: "",
    songList: [],
    current: 0,
    slide: 0,
    duration: "00:00",
    startTime: "00:00",
    p_width: 0,
    nums: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id != undefined) {
      this.getSongDetail(options.id)
    }
    wx.getStorage({
      key: 'song_list',
      success: (res) => {
        this.setData({
          songList: res.data
        }) 
        getApp().globalData.songList = res.data
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getOnplay(){
    let that = this;
    // getApp().globalData.audio.onPlay(() => {
      // console.log("音乐在播放了")
      that.setData({
        paused: true,
        playing: "https://www.xiaochengzi.xyz/image/paused.png",
        deg: 0,
      })
      getApp().globalData.paused = true
      getApp().globalData.playing = "https://www.xiaochengzi.xyz/image/paused.png"
      getApp().globalData.deg = 0
      getApp().globalData.globelAudio = true;
      let endTime;
      timer1 = setInterval(() => {
        endTime = parseInt(getApp().globalData.audio.duration)
        let e_minutes = '0' + parseInt(endTime / 60) + ':'
        let e_seconds = endTime % 60 >= 10 ? endTime % 60 : '0' + endTime % 60
        // this.duration = `${e_minutes}${e_seconds}`
        that.setData({
          duration: `${e_minutes}${e_seconds}`
        })
        getApp().globalData.duration = `${e_minutes}${e_seconds}`
        /*计算每秒进度条走的宽度*/
        let p_seconds = parseInt(getApp().globalData.audio.duration)
        that.setData({
          nums: Number((562 / p_seconds).toFixed(1))
        })
        getApp().globalData.nums = Number((562 / p_seconds).toFixed(1))
        // this.nums = Number((562 / p_seconds).toFixed(1))
        if (endTime) {
          clearInterval(timer1)
        }
      }, 200)

      timer2 = setInterval(() => {
        if (endTime) {
          let s_Time = this.data.startTime.split(":");
          let s_minutes = s_Time[0];
          let s_seconds = s_Time[1];
          s_seconds++;
          let p_width = that.data.p_width
          p_width += this.data.nums
          that.setData({
            p_width: p_width
          })
          getApp().globalData.p_width = p_width
          if (that.data.p_width >= 562) {
            this.p_width = 562
            that.setData({
              p_width: 562
            })
            getApp().globalData.p_width = 562
          }
          if (s_seconds >= 60) {
            s_seconds = '00'
            s_minutes++
            s_minutes = '0' + s_minutes
          } else if (s_seconds < 10) {
            s_seconds = '0' + s_seconds
          }
          // this.startTime = `${s_minutes}:${s_seconds}`
          that.setData({
            startTime: `${s_minutes}:${s_seconds}`
          })
          getApp().globalData.startTime = `${s_minutes}:${s_seconds}`
        }
      }, 1000)
    // })
  },
  getOnpause(){
    let that = this;
    // getApp().globalData.audio.onPause(() => {
      // console.log("音乐暂停了")
      that.setData({
        paused: false,
        playing: "https://www.xiaochengzi.xyz/image/playing.png",
        deg: -22
      })
      getApp().globalData.paused = false
      getApp().globalData.playing = "https://www.xiaochengzi.xyz/image/playing.png"
      getApp().globalData.deg = -22
      getApp().globalData.globelAudio = false;
      clearInterval(timer2)
      clearInterval(timer1)
    // })
  },
  getOnended(){
    let that = this;
    // getApp().globalData.audio.onEnded((e) => {
      // console.log("歌曲结束了")
      getApp().globalData.globelAudio = false;
      clearInterval(timer1)
      clearInterval(timer2)
      that.setData({
        paused: false
      })
      getApp().globalData.paused = false
      that.nextBtn()
    // })
  },
  onReady: function () {
    let that = this;
    getApp().globalData.audio.onPlay(()=>{
      that.getOnplay()
    })
    getApp().globalData.audio.onPause(()=>{
      that.getOnpause()
    })
    getApp().globalData.audio.onEnded(()=>{
      that.getOnended()
    })
    getApp().globalData.audio.onError((e) => {
      // console.log("音频出错了")
      console.log(e)
    })
    /*激活分享功能*/
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    this.getScreen()
    that.setData({
      imgUrl: getApp().globalData.imgUrl,
      paused: getApp().globalData.paused,
      deg: getApp().globalData.deg,
      songList: getApp().globalData.songList,
      current: getApp().globalData.current,
      duration: getApp().globalData.duration,
      startTime: getApp().globalData.startTime,
      p_width: getApp().globalData.p_width,
      nums: getApp().globalData.nums
    })
    if (getApp().globalData.globelAudio){
      that.getOnplay()
    }else{
      that.getOnpause()
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    getApp().globalData.audio.onNext(()=>{
      this.nextBtn()
    })
    getApp().globalData.audio.onPrev(()=>{
      this.prevBtn()
    })
    clearInterval(timer1)
    clearInterval(timer2)
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
  // 获取歌曲详情
  getSongDetail: function (n) {
    let that = this;
    // let newsongs =that.data.songList;
    tool.post('/song/detail?', {
      ids: n
    }).then((res)=>{
      let songs = {};
      songs.picUrl = res.songs[0].al.picUrl
      songs.name = res.songs[0].name
      songs.id = res.songs[0].id,
      songs.singer = res.songs[0].ar[0].name
      if (that.data.songList.length == 0) {
        that.data.songList.push(songs)
        getApp().globalData.songList = that.data.songList
        that.setData({
          songList: that.data.songList
        })
        wx.setStorage({
          key: 'song_list',
          data: that.data.songList,
        })
        // console.log("length=0")
      }else{
        let arr = [];
        let ng = n + '';
        for (let i = 0; i < that.data.songList.length; i++) {
          arr.push(that.data.songList[i].id + "")
        }
        if (arr.indexOf(ng) == -1) {
          that.data.songList.push(songs)
          getApp().globalData.songList = that.data.songList
          that.setData({
            songList: that.data.songList
          })
          wx.setStorage({
            key: 'song_list',
            data: that.data.songList,
          })
        }
      }
      this.getSongList()
    })
  },
  /*设置封面信息*/
  setInfo: function () {
    let that = this;
    clearInterval(timer2)
    clearInterval(timer1)
    that.setData({
      startTime: '00:00',
      p_width:0,
      imgUrl: that.data.songList[that.data.current].picUrl
    })
    getApp().globalData.imgUrl = that.data.songList[that.data.current].picUrl
  },
  /*获取歌曲URL*/
  getSongUrl: function (n) {
    let that = this;
    // tool.post('/music/url?',
    //   {
    //     id: n,
    //     br: 128000
    //   })
    //   .then((res)=>{
    //     console.log(res)
    //     if (res.data[0].url == null) {
    //       wx.showToast({
    //         icon: "none",
    //         title: "此歌曲暂无版权",
    //         mask: true,
    //         duration:1500,
    //         success: () => {
    //           setTimeout(()=>{
    //             that.nextBtn()
    //           },1500)
    //         }
    //       })
    //       return
    //     }
    //     that.setData({
    //       startTime:"00:00",
    //       p_width:0,

    //     })
    //     // console.log(that.data.songList[that.data.current])
    //     getApp().globalData.audio.title = that.data.songList[that.data.current].name
    //     getApp().globalData.audio.singer = that.data.songList[that.data.current].singer
    //     getApp().globalData.audio.coverImgUrl = that.data.songList[that.data.current].picUrl
    //     getApp().globalData.audio.src = res.data[0].url
    //     wx.setNavigationBarTitle({
    //       title: that.data.songList[that.data.current].name
    //     });
    //   })
    getApp().globalData.audio.title = that.data.songList[that.data.current].name
    getApp().globalData.audio.singer = that.data.songList[that.data.current].singer
    getApp().globalData.audio.coverImgUrl = that.data.songList[that.data.current].picUrl
    getApp().globalData.audio.src = `http://music.163.com/song/media/outer/url?id=${n}.mp3`
    wx.setNavigationBarTitle({
      title: that.data.songList[that.data.current].name
    });
  },
  /*顺序播放*/
  getSongList: function () {
    let that = this;
    let newsongs = that.data.songList
    if (newsongs.length <= 0) {
      return
    }
    getApp().globalData.current = newsongs.length - 1
    that.setData({
      current: newsongs.length-1
    })
    that.setInfo()
    that.getSongUrl(newsongs[that.data.current].id)
  },
  /*获取手机屏幕尺寸*/
  getScreen: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight || res.screenHeight
        }) 
      }
    })
  },
  /*暂停和播放*/
  playbtn: function () {
    if (this.data.paused) {
      getApp().globalData.audio.pause()

    } else {
      getApp().globalData.audio.play()
    }
  },
  /*下一曲*/
  nextBtn: function () {
    // let songLength = this.data.songList.length
    getApp().globalData.audio.pause()
    if (this.data.songList.length > 1) {
      this.data.current++
      this.setData({
        current: this.data.current 
      })
      
      if (this.data.current > this.data.songList.length - 1) {
        this.setData({
          current : 0
        })
      }
      getApp().globalData.current = this.data.current 
      this.setInfo()
      this.getSongUrl(this.data.songList[this.data.current].id)
    }
  },
  /*上一曲*/
  prevBtn: function () {
    // let songLength = this.songList.length
    getApp().globalData.audio.pause()
    if (this.data.songList.length > 1) {
      this.data.current--
      this.setData({
        current:this.data.current 
      })
      if (this.data.current < 0) {
        this.setData({
          current: this.data.songList.length - 1
        })
      }
      getApp().globalData.current = this.data.current 
      this.setInfo()
      this.getSongUrl(this.data.songList[this.data.current].id)
    }
  },
  /*苹果手机专用 */
  /*关闭音乐列表*/
  closeBox: function () {
    this.setData({
      slide:2
    })
  },
  /*打开音乐列表*/
  turnBox: function () {
    this.setData({
      slide: 1
    })
  },
  /*点击列表播放*/
  plays: function (e) {
    this.setData({
      current: e.currentTarget.dataset.i
    })
    getApp().globalData.current = e.currentTarget.dataset.i
    this.setInfo()
    this.getSongUrl(e.currentTarget.dataset.id)
  },
  /*清空歌曲列表*/
  clearSong: function () {
    wx.setStorageSync('song_list', []);
    this.setData({
      songList:[]
    })
    getApp().globalData.songList = []
  },
  /*删除歌曲*/
  deletes: function (e) {
    let i = e.currentTarget.dataset.index
    let newSongs = this.data.songList
    // this.songList.splice(i, 1);
    newSongs.splice(i, 1);
    this.setData({
      songList:newSongs
    })
    getApp().globalData.songList = newSongs
    wx.setStorage({
      key: 'song_list',
      data: newSongs,
    })
  }
})
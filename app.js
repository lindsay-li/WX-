//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // }
    // })
    // 获取用户信息
    // wx.getSetting({
      // success: res => {
        // if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
            // success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
    //             // this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    wx.getStorage({
      key: 'song_list',
      success: (res) => {
        this.globalData.songList = res.data
      },
      fail:()=>{
        this.globalData.songList = []
      }
    })
  },
  globalData: {
    userInfo: null,
    audio: wx.getBackgroundAudioManager(),
    globelAudio:false,
    songList:[],
    current:0,
    height: "",
    imgUrl: "",
    paused: false,
    deg: -22,
    duration: "00:00",
    startTime: "00:00",
    p_width: 0,
    nums: 0,
    playing:"",
  },
  
})

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    message: 'Hello, world, Hello, django',
    array:[
      {
        message: "Hello World",
        test: "好好学习"
      },
      {
        message: "Hello Django",
        test: "天天向上"
      }
    ]
  },

  testStorage: function(){
    wx.setStorage({ // 设置缓存，键值对
      key: 'test',
      data: 'data',
    })
    wx.getStorage({
      key: 'test',
      success: function(res) { // 这个success也是异步的，不管它后面执行怎么样，都会先执行后面的命令
        var data = res.data
        console.log('data from storage 1: ', data)
      },
    })
    var data = wx.getStorageSync('test') // 同步获取缓存接口
    console.log('data from storage 2: ', data)
  },

  testNetwork: function(event){
    var data = 'undefined'
    wx.request({
      url: 'http://www.imooc.com',
      method: 'GET',
      header: {},
      success: function(res){
        console.log(' in success')
        data = res.data
      },
      fail: function(res){
        console.log('request failed.')
      }
    })
    console.log('data:', data)//先执行这句，再执行第30行，因为异步特性，http请求得到响应request才会继续执行，会先执行下面的   
  },
  tapName: function(event){
    console.log(' in tabName function')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

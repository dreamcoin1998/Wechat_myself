// pages/backup/backup.js

const app = getApp()
const imageUrl = app.globalData.serverUrl + app.globalData.apiVersion + '/service/image'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    needUploadFiles: [], 
    downloadedBackupedFiles: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  chooseImage: function(e){
    var that = this;
    wx.chooseImage({
      sizeType:['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          needUploadFiles: that.data.needUploadFiles.concat(res.tempFilePaths)
        })
      },
    })
  },

  uploadFiles: function(){
    for (var i=0; i < this.data.needUploadFiles.length; i++){
      var filePath = this.data.needUploadFiles[i]
      wx.uploadFile({
        url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/image',
        filePath: filePath,
        name: 'test',
        success: function(res){
          console.log(res)
        }
      })
    }
  },

  downloadFile: function(imgItem){
    var that = this
    wx.downloadFile({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/image' + '?md5=' + '90b0df8bf4a5c5bd084844da8ca52577',
      success: function(res){
        var tmpPath = res.tempFilePath
        var newDownloadedBackupedFiles = that.data.downloadedBackupedFiles
        newDownloadedBackupedFiles.push(tmpPath)
        that.setData({
          downloadedBackupedFiles: newDownloadedBackupedFiles
        })
      }
    })
  },
  
  deleteBackup:function(imgItem){
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/image' + '?md5=' + '90b0df8bf4a5c5bd084844da8ca52577',
      method: 'DELETE',
      success: function(res){
        console.log(res.data)
        wx.showToast({
          title: 'test',
        })
      }
    })
  }

})
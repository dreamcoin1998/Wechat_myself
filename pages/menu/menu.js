const app = getApp()

Page({
  data: {
    grids: [
    {
      'name': '应用1'
    },
    {
      'name': '应用2'
    }]
  },

  onLoad: function(options){
    this.updateMenuData()
  },

  updateMenuData: function(){
    var that = this
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/menu',
      success: function(res){
        var menuData = res.data.data
        that.setData({
          grids: menuData
        })
      }
    })
  },
  onNavigatorTap: function(e){
    var index = e.currentTarget.dataset.index
    var appItem = this.data.grids[index]
    if(appItem.app.application == 'weather'){
      wx.navigateTo({
        url: '../weather/weather',
      })
    }
  }
});
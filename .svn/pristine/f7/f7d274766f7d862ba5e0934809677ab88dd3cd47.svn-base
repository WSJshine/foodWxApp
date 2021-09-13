const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    detailData:{},
  },
  onShow: function () {
    var dd={};
    var this_ = this;
    wx.getStorage({
      key: 'key',
      success (res) {
        console.log('我是结22222果页面',res.data)
        dd = res.data;
        this_.setData({
          detailData: dd,
      });
      } 
    })
      
  },
  onLoad: function () { 
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});

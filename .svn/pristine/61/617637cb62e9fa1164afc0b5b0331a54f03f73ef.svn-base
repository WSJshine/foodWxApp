const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    detailData:{},
  },
  onShow: function(){
    var dd={};
    var this_ = this;
    wx.getStorage({
      key: 'rightkey',
      success (res) {
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

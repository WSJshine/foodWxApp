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
      key: 'detialkey',
      success (res) {
        dd = res.data;
        console.log('给客户见客户',dd)
        this_.setData({
          detailData: dd,
      });
      } 
    })
  },
  onLoad: function () { 
    console.log('进第22222222个子页面了')
    // var aaa = JSON.parse(options);
    // console.log('我是结果页面',aaa)
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});

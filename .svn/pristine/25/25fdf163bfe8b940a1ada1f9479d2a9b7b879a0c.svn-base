const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    // detailData:{},
  },
  onShow: function(){
    wx.removeStorageSync('detialkey');
    var dd={};
    var this_ = this;
    wx.getStorage({
      key: 'vegetkey',
      success (res) {
        dd = res.data;
        console.log('个非官方的广泛地',dd)
        this_.setData({
          detailData: dd,
        });
      } 
    })
    // console.log('还好啦',dd)
    // console.log('第一个子页面数据',this_.data.detailData)
    // wx.showToast({
    //   title: this.data.purProData.productName,
    //   icon: 'none',
    //   duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
    //   success: function () {
    //   //   setTimeout(function () {
    //   //    wx.navigateTo({
    //   //      url: '/pages/index/index'
    //   //    })
    //   //  }, 1000)
    //   }
    // })
      
  },
  onLoad: function () { 
    // console.log('进第一个子页面了')
    // var aaa = JSON.parse(options);
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  setStorage(e) {
      console.log('要传入子子页面的数据', e.currentTarget.dataset.link)
    wx.setStorageSync('detialkey', e.currentTarget.dataset.link) 
    wx.navigateTo({
      url: '/pages/vegetAbout/resultDetail/resultDetail'
    })
  },
});

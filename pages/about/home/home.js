const app = getApp();
const baseUrl = app.globalData.baseUrl;
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    codeName:'',
    purProData:'',
    dishFlag:'',
    processFlag:'',
    // starCount: 0,
    // forksCount: 0,
    // visitTotal: 0,
    // resultInfo:''
  },
  onShow: function () {
    var this_=this;
    if(this_.data.resultInfo.dishFlag==true){//菜品小程序扫码后
     wx.request({
       url:baseUrl+'/food/getDishInfo', //服务器地址
       method: "get",   
       header: {
         'content-type': 'application/json'
       },
       data:this_.data.resultInfo,
       success:function (res) {
        
       }  
     });
    }else{
     wx.request({
       url:baseUrl+'/food/getTraceabilityInfo', //服务器地址
       method: "post",   
       header: {
         'content-type': 'application/x-www-form-urlencoded'
       },
       data:this_.data.resultInfo,
       success:function (res) {
        this_.setData({
           purProData:res.data.data,
        })
       }  
     });
    }
  },
  onLoad: function (data) {
    wx.removeStorageSync('key');
    var aaa = JSON.parse(data.res);
    this.setData({
      resultInfo:aaa,
      codeName:aaa.productName,
   })
  
  },
  setStorage(e) {
    wx.setStorageSync('key', e.currentTarget.dataset.link)
    wx.navigateTo({
      url: '/pages/about/result/result'
    })
  },
})
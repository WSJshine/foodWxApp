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
  onShow: function(){
    var this_=this;
   if(this_.data.resultInfo.dishFlag==true){//菜品小程序扫码后
    wx.request({
      url:baseUrl+'/food/getDishInfo', //服务器地址
      method: "get",   
      header: {
        'content-type': 'application/json',
        'accept-encoding':''
      },
      data:this_.data.resultInfo,
      success:function (res) {
        this_.setData({
          purProData:res.data.data,
       })
       console.log('home页面数据',this_.data.purProData)
        // wx.showToast({
        //   title: this_.data.purProData.productName,
        //   icon: 'none',
        //   duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
        //   success: function () {
      
        //   }
        // })
      }
    });
   }else{
    wx.request({
      url:baseUrl+'/food/getTraceabilityInfo', //服务器地址
      method: "get",   
      header: {
        'content-type': 'application/json',
        'accept-encoding':''
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
    wx.removeStorageSync('vegetkey');
    var aaa = JSON.parse(data.res);
    this.setData({
      resultInfo:aaa,
      codeName:aaa.productName,
   })
  },
  setStorage(e) {
    wx.setStorageSync('vegetkey', e.currentTarget.dataset.link)
    if(e.currentTarget.dataset.link.processings[0].type == 2){
          wx.showToast({
            title: '暂无加工信息',
            icon: 'none',
            duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
            success: function () {
        
            }
          })
    }else{
        wx.navigateTo({
         url: '/pages/vegetAbout/result/result'
        })
    }
    
    var dd={};
    wx.getStorage({
      key: 'vegetkey',
      success (res) {
        dd = res.data;
        console.log('发过的的风格方好啦',dd)
      } 
    })
    console.log('还发的鬼地方好啦',dd)
  },
  // attached() {
  //   let that = this;
  //   wx.showLoading({
  //     title: '数据加载中',
  //     mask: true,
  //   })
  //   let i = 0;
  //   numDH();
  //   function numDH() {
  //     if (i < 20) {
  //       setTimeout(function () {
  //         that.setData({
  //           starCount: i,
  //           forksCount: i,
  //           visitTotal: i
  //         })
  //         i++
  //         numDH();
  //       }, 20)
  //     } else {
  //       that.setData({
  //         starCount: that.coutNum(3000),
  //         forksCount: that.coutNum(484),
  //         visitTotal: that.coutNum(24000)
  //       })
  //     }
  //   }
  //   wx.hideLoading()
  // },
  // methods: {
    // coutNum(e) {
    //   if (e > 1000 && e < 10000) {
    //     e = (e / 1000).toFixed(1) + 'k'
    //   }
    //   if (e > 10000) {
    //     e = (e / 10000).toFixed(1) + 'W'
    //   }
    //   return e
    // },
    // CopyLink(e) {
    //   wx.setClipboardData({
    //     data: e.currentTarget.dataset.link,
    //     success: res => {
    //       wx.showToast({
    //         title: '已复制',
    //         duration: 1000,
    //       })
    //     }
    //   })
    // },
    // showModal(e) {
    //   this.setData({
    //     modalName: e.currentTarget.dataset.target
    //   })
    // },
    // hideModal(e) {
    //   this.setData({
    //     modalName: null
    //   })
    // },
    // showQrcode() {
    //   wx.previewImage({
    //     urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
    //     current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
    //   })
    // },
  // }
})
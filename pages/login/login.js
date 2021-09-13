// 获取应用实例
const app = getApp();
const baseUrl = app.globalData.baseUrl;
//function


Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  options: {
    addGlobalClass: true,
  },
  data: {
    nextPage:'',
  },
  onLoad(options) {
    // if(wx.getStorageSync('token')){
    //   wx.navigateTo({
    //     url: '/pages/newIndex/newIndex'
    //   })
    // }else{
    //    var str = options.str
    //     this.setData({
    //       nextPage: str
    //     })
    // }
   
  },
  onShow(){
    
  },
  onReady: function () {
    // if(wx.getStorageSync('token')){
    //   wx.navigateTo({
    //     url: '/pages/newIndex/newIndex'
    //   })
    // }else{
    //    var str = options.str
    //     this.setData({
    //       nextPage: str
    //     })
    // }
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    e.detail.value.openId = wx.getStorageSync('openId')
    var this_ = this;
    wx.request({
      url:baseUrl+'api/updInfo', //新增用户
      method: "post",   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:e.detail.value,
      success:(res) => {
        if(res.data.code == 200){
          this_.login(e)
          // wx.showToast({
          //   title: res.data.msg,
          //   icon: 'none',
          //   duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
          //   success: function () {
          //     setTimeout(function () {
          //       wx.setStorageSync('token', res.data.data.token)
          //       wx.setStorageSync('supName', res.data.data.supName)
          //       wx.setStorageSync('userName', res.data.data.userName)
          //       wx.setStorageSync('role', res.data.data.role)
          //          wx.navigateTo({
          //           url: '/pages/newIndex/newIndex'
          //         })
          //     }, 1000)
          //  }
          // })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
            success: function () {
              setTimeout(function () {
              
             }, 1000)
           } 
          })
        }
      }
    })
   
  },
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  login(e){
    wx.request({
      url:baseUrl+'api/login', //登录
      method: "post",   
      header: {
        'content-type': 'application/json'
      },
      data:e.detail.value,
      success:(res) => {
        if(res.data.code == 200){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
            success: function () {
              setTimeout(function () {
                wx.setStorageSync('token', res.data.data.token)
                wx.setStorageSync('supName', res.data.data.supName)
                wx.setStorageSync('userName', res.data.data.userName)
                wx.setStorageSync('role', res.data.data.role)
                wx.setStorageSync('loginType', 'name')
                   wx.navigateTo({
                    url: '/pages/newIndex/newIndex'
                  })
              }, 1000)
           }
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
            success: function () {
              setTimeout(function () {
              
             }, 1000)
           } 
          })
        }
      }
    })
  }
})


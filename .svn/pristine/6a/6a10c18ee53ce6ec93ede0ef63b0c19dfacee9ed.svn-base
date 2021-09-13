// 获取应用实例
const app = getApp();
const baseUrl = app.globalData.baseUrl;
Page({
  data: {
    userInfo: {},
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorageSync('loginType', 'wx')
        console.log('获取用户个人信息',res.userInfo)
        this.setData({
          userInfo: res.userInfo
        })
        wx.navigateTo({
          // url: '/pages/login/login'
          url: '/pages/newIndex/newIndex'
        })
      }
    });
    wx.login({
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      success:function(res){
        console.log('合力科技了',res)
        wx.setStorageSync('wxCode', res.code)
        //发送请求
        wx.request({
          url: baseUrl+'api/wxLogin', //接口地址
          method:'post',
          data: {
            code:res.code,
            userName:''
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' //默认值
          },
          success: function (res) {
            console.log('哥好几块很快就好看',res.data)
            wx.setStorageSync('openId', res.data.openId)
            wx.setStorageSync('token', res.data.data.token)
            wx.setStorageSync('supName', res.data.data.supName)
            wx.setStorageSync('userName', res.data.data.userName)
            wx.setStorageSync('role', res.data.data.role)
          }
        })
      }
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var this_ = this;
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
   
  },
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
})

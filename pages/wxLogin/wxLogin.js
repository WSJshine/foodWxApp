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
        console.log('获取用户个人信息',res.userInfo)
        this.setData({
          userInfo: res.userInfo
        })
              wx.navigateTo({
                url: '/pages/newIndex/newIndex'
              })
      }
    })
  },
  getUserInfo(e){
    console.log('会尽快哈',e)
    wx.login({
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      success:function(res){
        console.log('合力科技了',res)
        wx.setStorageSync('wxCode', res.code)
        //发送请求
        wx.request({
          url: 'https://172.168.10.109:9292/api/wxLogin', //接口地址
          method:'post',
          data: {
            code:res.code,
            // userName:'',
            iv:e.detail.iv,
            encryptedData:e.detail.encryptedData
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' //默认值
          },
          success: function (res) {
            console.log(res.data)
            wx.setStorageSync('openId', res.data.openId)
          }
        })
      }
  })
  },
  getPhoneNumber(e){
    console.log('刚开机航飞的',e)
  }
})

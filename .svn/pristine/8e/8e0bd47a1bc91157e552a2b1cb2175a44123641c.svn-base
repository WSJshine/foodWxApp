const app = getApp();
const baseUrl = app.globalData.baseUrl;
Page({
  data: {
    userInfo: {},
    canIUseGetUserProfile: false,
    checkbox:[]
  },
  onLoad() {
    this.getRole();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getRole(){
    let loginType = wx.getStorageSync('loginType')
    console.log('和客户口红看',loginType,wx.getStorageSync('openId'))
    let userName = '';
    let openId = '';
    let that = this;
    if(loginType == 'wx'){
        openId = wx.getStorageSync('openId');
   
    }else{
      userName = wx.getStorageSync('userName')
    }
    wx.request({
      url: baseUrl+'api/checkUser', //接口地址
      method:'post',
      data: {
        openId: openId,
        userName:userName
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      success: function (res) {
        that.setData({
          checkbox: res.data.data.roles,
          userName: res.data.data.userName,
          type: res.data.data.type
        })
      }
    })
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
  radioChange(e){ 
    console.log('还贷款是返回',e.detail.value)
    this.setData({
      checkedList: e.detail.value
    })
  },
  submit(){
    let openId='';
    if(wx.getStorageSync('loginType') == 'wx'){
      openId = wx.getStorageSync('openId')
    }
    if(this.data.checkedList.length === 0){
      wx.showToast({
        title: '请选择权限',
        icon: 'none',
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
      })
      return;
    }
    wx.request({
      url: baseUrl+'api/updateUserRole', //接口地址
      method:'post',
      data: {
        openId:openId,
        userName:this.data.userName,
        roleStr:this.data.checkedList
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/newIndex/newIndex'
              })
            }, 2000)
          }
        })
    
      }
    })
  },
  upInput(e){
    console.log('和客户',e)
    this.setData({
      userName: e.detail.value
    })
  }
})

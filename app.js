// app.js
App({
  onLaunch() {
    // if(wx.getStorageSync('token')){
    //   wx.navigateTo({
    //     url: '/pages/newIndex/newIndex'
    //   })
    // }else{
    //   wx.navigateTo({
    //     url: '/pages/login/login'
    //   })
    // }
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
console.log('很快就好看科技豪你看看',wx.getStorageSync('token'))
    // // 登录
    // wx.login({
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     success:function(res){
    //       console.log('合力科技了',res)
    //       wx.setStorageSync('wxCode', res.code)
    //       //发送请求
    //       wx.request({
    //         url: 'https://172.168.10.109:9292/api/wxLogin', //接口地址
    //         method:'post',
    //         data: {
    //           code:res.code,
    //           userName:''
    //         },
    //         header: {
    //           'content-type': 'application/x-www-form-urlencoded' //默认值
    //         },
    //         success: function (res) {
    //           console.log(res.data)
    //           wx.setStorageSync('openId', res.data.openId)
    //         }
    //       })
    //     }
    // })


    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // baseUrl:'https://172.168.10.109:9292/',
    baseUrl:'https://weixin.kdkjyxgs.com:9292/',
    checkUnit:['斤','袋','件','包','桶','瓶','盒','kg'],
    index:'0',
    unit:'斤',
    userInfo: null,
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    {
      title: '宝石绿',
      name: 'gemGreen',
      color: '#00C17E'
    },
  ]
  }
})
// app.js
// App({
//   onLaunch() {
//     // 展示本地存储能力
//     const logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)

//     // 登录
//     wx.login({
//       success: res => {
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//         console.log('app.js得到 login code:',res.code);
//         if (res.code) {
//           //发起网络请求
//           wx.request({
//             url: '',
//             data: {
//               code: res.code
//             }
//           })
//         } else {
//           console.log('登录失败！' + res.errMsg)
//         }
//       }
//     })
//   },
//   globalData: {
//     userInfo: null
//   }
// })


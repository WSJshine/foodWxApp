const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    }, 
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    backLogin:{
      type: [Boolean, String],
      default: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      if(this.data.backLogin){
        console.log('捡鼎折覆餗来了')
        wx.reLaunch({
          url: '/pages/testLogin/testLogin',
        })
      }else{
        console.log('第三方士大夫发')
        wx.navigateBack({
          delta: 1
        });
      }
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/newIndex/newIndex',
      })
    }
  }
})
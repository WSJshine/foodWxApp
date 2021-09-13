// index.js
// 获取应用实例
const app = getApp()
const baseUrl = app.globalData.baseUrl;
import * as echarts from '../../ec-canvas/echarts';
var util = require('../../utils/util');
//function
function getBarOption(nameArr, dataArr) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['商品']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: nameArr,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: dataArr
      }
    ]
  };
}

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
    flag:true,
    traceability:'',//多加工品code拼接
    picker: [],
    checkUnit:['斤','袋','件','包','桶'],
    unit:'',
    list: [
      {
        title: ' 原料加工',
        img: 'https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg',
        url: '2',
        color: 'white',
        icon:'/images/031.png'
      },
      {
        title: ' 扫　　码',
        img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
        url: '1',
        color: 'yellow',
        icon:'/images/032.png'
      },
    ],
    productList: [],
    // hasProduct:true,
  },
  // 事件处理函数
  SetBorderSize(e) {
    console.log('很快乐哈家里的事',e.detail.value)
    this.setData({
      flag: e.detail.value
    })
  },
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // addproduct: function() {
  //   wx.navigateTo({
  //     url: '../addproduct/addproduct'
  //   })
  // },
  // clickMe: function() {
  //   wx.navigateTo({
  //     url: '../process/process'
  //   })
  // },
  onLoad() {
    console.log('垃圾分类圣诞节发')
    var TIME = util.formatTime(new Date());
    this.setData({
      productTime: TIME,
      });
  },

  
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  previewImage: function (e){
    var current = e.target.dataset.src;   //这里获取到的是一张本地的图片
    wx.previewImage({
      current: current,//需要预览的图片链接列表
      urls: [current]  //当前显示图片的链接
    })
  },
  showModal(e) {
    this.setData({
      modalName: 'Modal'
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
    this.getProject();
  },
  scanCode() {
    var this_ = this;
    // this_.showModal();
    wx.scanCode({
      success(res) {
        var aaa = JSON.parse(res.result);
        console.log('输出扫到的', aaa)
        let oldData = this_.data.traceability;
        if(this_.data.flag == true){//是多原料加工
          if(aaa.purchaseFlag == true){
            if(oldData == ''){
              this_.setData({
                traceability: aaa.code,
              })
            }else{
              this_.setData({
                traceability: oldData + '-'+ aaa.code,
              })
            }
            this_.setData({
              productName: aaa.productName,
              productType: aaa.specifications
            })
            this_.showModal();
          }else{
            wx.showToast({
              title: '请扫原料信息码',
              icon: 'none',
              duration: 1500
           })
          }
        }else{//不是多原料加工
          if(aaa.purchaseFlag == true){
            this_.setData({
              productName: aaa.productName,
              traceability: aaa.code,
              productType: aaa.specifications,
            })
            this_.showModal();
          }else{
            wx.showToast({
              title: '请扫原料信息码',
              icon: 'none',
              duration: 1500
           })
          }
        }
        // this_.getProject();
        this_.setData({
         codeData: aaa.code,
         maxNum:aaa.inventory,
         maxNumUnit:aaa.specifications
        })
      }
    })
  },
  getProject(){
    console.log('有厚厚')
    wx.request({
      url:baseUrl+'ingredients/getSelectProcess', //获取加工产品
      method: "get",   
      header: {
        'content-type': 'application/json'
      },
      data:{
        traceability:  this.data.traceability
      },
      success:(res) => {
        this.setData({ picker: res.data.data })
      }  
    })
  },
  PickerChange(e) {
    console.log('会尽快哈',e.detail);
    this.setData({
      index: e.detail.value
    })
  },
  UnitPickerChange(e) {
    console.log(e.detail.value);
    // var index = e.detail.value
    this.setData({
      // index: e.detail.value,
      unit: this.data.checkUnit[index]
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let num = parseInt(e.detail.value.productNum)
   if(num > this.data.maxNum){
    wx.showToast({
      title: '最大库存量为：'+ this.data.maxNum + this.data.maxNumUnit,
      icon: 'none',
    })
   }else{//小于库存量的时候再提交
    if(this.data.productList.length !== 0){
      let list = [{
        productName:this.data.productName,
        productNum:e.detail.value.productNum,
        productType:this.data.productType,
        traceability:this.data.codeData
      }];
      let arrList = this.data.productList.concat(list);
      this.setData({
        productList:arrList
      });
      
    }else{
      this.setData({
          productList: [{
            productName:this.data.productName,
            productNum:e.detail.value.productNum,
            productType:this.data.productType,
            traceability:this.data.traceability
          }]
      })
    }
    
    this.hideModal();
   }
    
    console.log('很多时间卡粉红色',this.data.productList)
    // this.getProject();
  },
  productFormSubmit(e) {
    console.log('productFormSubmit发生了submit事件，携带数据为：', e.detail.value);
    let arr = '';
    for(let i = 0;i<this.data.productList.length;i++){
      arr += this.data.productList[i].traceability +'-'+ this.data.productList[i].productNum +','
      console.log('最终的国防生的的数组',arr)
    }
    arr = arr.substring(0 , arr.length-1);
    console.log('最终的数组',arr)
    e.detail.value.codeWeight = arr;
    e.detail.value.traceability = this.data.traceability;
    e.detail.value.processingTime = this.data.productTime;
    // e.detail.value.procuctUnit = this.data.unit;
    e.detail.value.processedProducts = this.data.picker[this.data.index].name;
    wx.request({
      url:baseUrl+'food/addProcess', //服务器地址
      method: "post",   
      header: {
        'content-type': 'application/json'
      },
      data:e.detail.value,
      success:function (res) {
        // this.setData({ msg: res })
        //  wx.showToast({
        //   icon: 'loading',
        //   title: '提交成功',
        //   duration: 1000
        // })
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
          success: function () {
             setTimeout(function () {
              wx.navigateTo({
                url: '/pages/index/index'
              })
            }, 1000)
          }
        });
        // wx.navigateTo({
        //   url: '/pages/index/index'
        // })
        console.log('.....回调函数.....');
      }  
    })
  },
  productFormReset(e) {
    console.log('productFormReset发生了reset事件，携带数据为：', e.detail.value)
    var TIME = util.formatTime(new Date());
    this.setData({
      chosen: '',
      date: TIME,
      date1: TIME,
      codeData:'',
      merchant:'',
      picker:[]
    })
  },
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },
  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },
  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },
  toChild(e) {
    var this_ = this;
    if(e.currentTarget.dataset.url === '1'){
      console.log('华东师范',this_.data.flag)
      console.log('华东搞活动费个师范',this_.data.productList)
      if(this_.data.flag == 'false' && this_.data.productList.length != 0){
        console.log('喉咙可结婚了')
        wx.showToast({
          title:'单原料加工只能选择一个原料',
          icon: 'none',
          duration: 1500, //提示的延迟时间，单位毫秒，默认：1500
        })
      }else{
        this_.scanCode();
      }
      
    }
    // else if(e.currentTarget.dataset.url === '2' || e.currentTarget.dataset.url === '3'){
    //   var this_ = this;
    //   wx.getStorage({
    //     key: 'token',
    //     success (res) {
    //       if(e.currentTarget.dataset.url === '2' ){
    //         wx.navigateTo({
    //           url: '/pages/processNew/processNew'
    //         })
    //       }else{
    //         wx.navigateTo({
    //           url: '/pages/addproduct/addproduct'
    //         })
    //       }
    //     },
    //     fail (res){
    //       console.log('token获取失败')
    //       wx.navigateTo({
    //         url: '/pages/login/login?str='+e.currentTarget.dataset.url
    //       })
    //     }
    //   })
    // }
    
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
})


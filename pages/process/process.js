var util = require('../../utils/util');
const app = getApp();
Page({
  data:{
    resultInfo:'',
    time: '12:01',
    date: '',
    date1: '',
    checkbox: [],
    picker: [],
    traceability:'',
    flag:true,
    codeData:'',
    checkUnit:['斤','袋','件','包','桶'],
    unit:''
  },
   // 事件处理函数
   bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getProject(){
    console.log('有厚厚')
    wx.request({
      url:'https://weixin.kdkjyxgs.com:9292/ingredients/getSelectProcess', //获取加工产品
      method: "get",   
      header: {
        'content-type': 'application/json'
      },
      data:{
        traceability: this.data.traceability
      },
      success:(res) => {
        this.setData({ picker: res.data.data })
        // wx.navigateTo({
        //   url: '/pages/thress/thress'
        // })
      }  
    })
  },
  onLoad: function (options) {
    
    var TIME = util.formatTime(new Date());
    console.log('进来了333333333333',TIME)
    this.setData({
      date: TIME,
      date1: TIME
      });
    wx.request({
      url:'https://weixin.kdkjyxgs.com:9292/supplier/getSelectGroup', //获取商户
      method: "get",   
      header: {
        'content-type': 'application/json'
      },
      success:(res) => {
        // let arr = res.data.data ;
        // for(let i = 0;i<arr.length;i++){
        //     arr[i].checked = false;
        // }
        this.setData({ checkbox: res.data.data })
      }  
    })
  },
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
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
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    let merchant = ''
    for(let i = 0;i<this.data.checkbox.length;i++){
      if(this.data.checkbox[i].checked === true){
        merchant +=this.data.checkbox[i].supName+','
      }
    }
    this.setData({
      modalName: null,
      merchant: merchant
    })
  },
  showModal1(e) {
    this.setData({
      modalName1: e.currentTarget.dataset.target
    })
  },
  hideModal1(e) {
    this.setData({
      modalName1: null
    })
  },
  ChooseCheckbox(e) {
    console.log('点击了',this.data.checkbox)
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    console.log('点1111击了',values)
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].id == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    
    this.setData({
      checkbox: items
    })
    console.log('哈哈',this.data.checkbox)
  },
  PickerChange(e) {
    console.log('会尽快哈',e.detail);
    this.setData({
      index: e.detail.value
    })
  },
  handleChange(e) {
    console.log(e)
    this.setData({
      value: e.detail.dateString
    })
  },
  changeSwitch(e){
    // console.log('数据为：', e.detail.value)
    this.setData({
      flag: e.detail.value
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if(e.detail.value.processingType===true){
      e.detail.value.processingType=1;
    }else{
      e.detail.value.processingType=2;
    }
    let merchant = ''
    for(let i = 0;i<this.data.checkbox.length;i++){
      if(this.data.checkbox[i].checked === true){
        merchant +=this.data.checkbox[i].supName+','
      }
    }
    merchant = merchant.substring(0, merchant.lastIndexOf(','));
    e.detail.value.merchant = merchant;
    e.detail.value.traceability = this.data.traceability;
    e.detail.value.processingTime = this.data.date;
    e.detail.value.storageTime = this.data.date1;
    e.detail.value.procuctUnit = this.data.unit;
    e.detail.value.processedProducts = this.data.picker[this.data.index].name;
    wx.request({
      url:'https://weixin.kdkjyxgs.com:9292/food/addProcess', //服务器地址
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
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  DateChange1(e) {
    this.setData({
      date1: e.detail.value
    })
  },
  //扫码
  scanCode() {
    // var myThis = this;
    wx.scanCode({
      success:(res) => {
        var aaa = JSON.parse(res.result);
        console.log('输出扫到的', aaa)
        let oldData = this.data.traceability;
        if(this.data.flag == true){//是多原料加工
          if(aaa.purchaseFlag == true){
            if(oldData == ''){
              this.setData({
                traceability: aaa.code
              })
            }else{
              this.setData({
                traceability: oldData + '-'+ aaa.code
              })
            }
          }else{
            wx.showToast({
              title: '请扫原料信息码',
              icon: 'loading',
              duration: 1500
           })
          }
        }else{//不是多原料加工
          this.setData({
            traceability: aaa.code
          })
          if(aaa.purchaseFlag == true){
            this.setData({
              traceability: aaa.code
            })
          }else{
            wx.showToast({
              title: '请扫原料信息码',
              icon: 'loading',
              duration: 1500
           })
          }
        }
        
         this.getProject();
         this.setData({
          codeData: aaa.code
        })
      // myThis.setData({
      //     result: res.result,
      //     scanType: res.scanType
      //   })
      console.log('回到家溯源码的', this.data.traceability)
      // console.log('qd ddf',res.result)
      // wx.navigateTo({
      //   url: '../second/second?res=' + res.result
      // })
      },
      fail: (res) => {//扫码失败后
        wx.showToast({
           title: '扫码失败',
           icon: 'loading',
           duration: 1500
        })
     },
    })
    // getProject()
  },
  PickerChange(e) {
    console.log(e.detail.value);
    var index = e.detail.value
    this.setData({
      index: e.detail.value,
      unit: this.data.checkUnit[index]
    })
  },
})
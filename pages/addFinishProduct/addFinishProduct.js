// pages/addFinishProduct/addFinishProduct.js
var util = require('../../utils/util');
const app = getApp();
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('国际更好的化',options)
    let data =  JSON.parse(options.option); 
    var TIME = util.formatTime(new Date());
    console.log('进来了333333333333',data)
    this.setData({
      date: TIME,
      date1: TIME,
      code:data.code,
      processId: data.processId
    });
    this.getProcess();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getProcess(){
    wx.request({ 
      url:baseUrl+'food/getTraceabilityInfo',//获取成品详细信息
      method: "post",   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        purchaseFlag:false,
        processFlag:true,
        code:this.data.code,
        processId:this.data.processId
      },
      success:(res) => {
        this.setData({
          showData: res.data.data
        })
console.log('黑科技',this.data.showData)
        
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
  submit(e){
    if(this.data.showData.isUpdate == 1){
      wx.showToast({
        title: '该原料重量信息有正在审核的修改申请，无法入库！',
        icon: 'none',
        duration:2000,//显示时长
        success:function(){ 
          setTimeout(function(){
            return;
          },1000)
        },
      })
    }else{
      // let weight = '';
      // if(this.data.showData.isPass == 1){
      //   weight = this.data.showData.warehouseNumber
      // }else{
      //   weight = this.data.showData.productWeight
      // }
      wx.request({ 
        url:baseUrl+'food/updProcess',//确定成品入库
        method: "post",   
        header: {
          'content-type': 'application/json'
        },
        data:{
          storageWeight: this.data.showData.storageWeight,
          productWeight: this.data.showData.productWeight,
          processingTime:this.data.showData.processingTime,
          processedProducts:this.data.showData.processedProducts ,
          id:this.data.showData.id,
          productUnit:this.data.showData.productUnit
        },
        success:(res) => {
          if(res.data.code == 200){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration:2000,//显示时长
              success:function(){ 
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1 //返回上一级页面
                  })
                },1000)
              },
          })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }  
      })
    }
    
  },
  showModal(e) {
    if(this.data.showData.isUpdate == 1){
      wx.showToast({
        title: '该原料重量信息有正在审核的修改申请，无法再次申请！',
        icon: 'none',
        duration:2000,//显示时长
        success:function(){ 
          setTimeout(function(){
            return;
          },1000)
        },
      })
    }else{
       this.setData({
          modalName: e.currentTarget.dataset.target
       })
    }
   
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value.productWeight)
    if(!e.detail.value.productWeight){
      return;
    }
    
    wx.request({ 
      url:baseUrl+'food/updProcessWeight',//确定成品入库
      method: "post",   
      header: {
        'content-type': 'application/json'
      },
      data:{
        productWeight:this.data.showData.productWeight,
        updWeight:e.detail.value.productWeight,
        processingTime:this.data.showData.processingTime,
        processedProducts:this.data.showData.processedProducts,
        productUnit:this.data.showData.productUnit ,
        id:this.data.showData.id
      },
      success:(res) => {
        let that = this;
        if(res.data.code == 200){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration:2000,//显示时长
            success:function(){ 
              that.getProcess();
              // setTimeout(function(){
              //   wx.navigateBack({
              //     delta: 1 //返回上一级页面
              //   })
              // },1000)
            },
         })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }  
    })
  },
  handleInput(e) {
    console.log('见客户可',e.detail.value)
    let value = this.validateNumber(e.detail.value)
    this.setData({
      productWeight : value
    })
  },
  validateNumber(val) {
    return val.replace(/\D/g, '')
  },
})
// pages/addMaterial/addMaterial.js
// 获取应用实例
var util = require('../../utils/util');
const app = getApp();
const baseUrl = app.globalData.baseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkbox: [],
    snapList:[],
    // showList:[],//原料信息回显的数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var TIME = util.formatTime(new Date());
    console.log('进来了333333333333',TIME)
    this.setData({
      date: TIME,
      date1: TIME
    });
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
  showModal(e) {
    console.log('和客户黑科技',e.currentTarget.dataset.detail)
    //e.currentTarget.dataset.target,
    if(e.currentTarget.dataset.detail.isUpdate == 1){
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
          showData: e.currentTarget.dataset.detail,
          modalName: e.currentTarget.dataset.target
       })
    }
   
  },
  updateFormSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value.productWeight)
    if(!e.detail.value.productWeight){
      return;
    }
    wx.request({ 
      url:baseUrl+'purchase/updProcessWeight',//修改重量
      method: "post",   
      header: {
        'content-type': 'application/json'
      },
      data:{
        productWeight:this.data.showData.productWeight,
        ups1:e.detail.value.productWeight,
        batch:this.data.showData.batch,
        productName:this.data.showData.productName,
        productUnit:this.data.showData.productUnit ,
        id:this.data.showData.id
      },
      success:(res) => {
        let that = this;
        that.setData({
          productWeight:''
        })
        if(res.data.code == 200){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration:2000,//显示时长
            success:function(){ 
              setTimeout(function(){
                that.hideModal();
                // wx.navigateBack({
                //   delta: 1 //返回上一级页面
                // })
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
  selectMaterial(e){

    wx.request({ 
      // url:baseUrl+'purchase/getSelectPurchase',//原料信息
      url: baseUrl +'purchase/getSelectPurchase',
      method: "get",   
      header: {
        'content-type': 'application/json'
      },
      // data:{
      //   traceability: aaa.code
      // },
      success:(res) => {
        if(res.data.data.length == 0){
          wx.showToast({
            title: '目前没有待入库的原料',
            icon: 'none',
          })
        }else{
          this.setData({
            modalName: e.currentTarget.dataset.target,
            checkbox:res.data.data,
          })
        }
        
      }  
    })
    
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      showList: this.data.snapList
    })
  },
  radioChange(e){
      console.log('还贷款是返回',e.detail.value)
      let list = e.detail.value;
      // let show = []
      this.setData({
        snapList: []
      })
      for(let i = 0; i < list.length;i++){
        for(let j = 0; j<this.data.checkbox.length; j++){
          if(list[i] == this.data.checkbox[j].traceability){
            this.data.snapList.push(this.data.checkbox[j])
          }
        }
      }
      console.log('要显示的数组',this.data.showList)
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
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', this.data.showList)
    // let jsonObj = e.detail.value;
    let traceabilityWeight = '';
    
    for(let i = 0;i<this.data.showList.length;i++){
      traceabilityWeight += this.data.showList[i].traceability + '-' + this.data.showList[i].productWeight + ','
      // for(var item in jsonObj){  
      //   if(item==this.data.showList[i].traceability){ 
      //     if(jsonObj[item]){
      //       var jValue=jsonObj[item];//key所对应的value  
      //     traceabilityWeight += item + '-' + jValue + ','
      //     }else{
      //       console.log('梵蒂冈',jsonObj[item])
      //       traceabilityWeight += this.data.showList[i].traceability + '-' + this.data.showList[i].productWeight + ','
      //     }  
      //   }
      // }
    }
    traceabilityWeight = traceabilityWeight.substring(0, traceabilityWeight.lastIndexOf(','));
    console.log('梵蒂冈',traceabilityWeight)
    wx.request({ 
      url:baseUrl+'purchase/updPurchase',//原料信息
      method: "post",   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        traceabilityWeight: traceabilityWeight
      },
      success:(res) => {
        // wx.showToast({
        //   title: res.data.msg,
        //   icon: 'none',
        // })
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel:false,//是否显示取消按钮  false 不显示
          cancelText:"取消",//更改取消
          confirmText:"确定",
          success(res) {
            wx.navigateTo({
              url: '/pages/newIndex/newIndex'
            })
          }
        })
        // setTimeout(function () {
        //   wx.navigateTo({
        //     url: '/pages/newIndex/newIndex'
        //   })
        // }, 1500)
      }  
    })
  }
})
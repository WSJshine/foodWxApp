// pages/outStockForm/outStockForm.js
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
    this.getShowList();
  },
  getShowList(){
    wx.request({
      url: baseUrl+'purchase/getDeliveryList', //服务器地址
      method: "get",   
      header: {
        'content-type': 'application/json'
      },
      data:{
        type:1
      },
      success:(res) => {
        this.setData({ 
          showList: res.data.data,
        });
      }  
    })
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
  toOutStockt(e){
    console.log('很快就好看就',e)
    this.setData({
      foodModalName:'Modal',
      toOutBatch: e.currentTarget.dataset.target,
      toOutId: e.currentTarget.dataset.id,
      toOutName: e.currentTarget.dataset.toOutName,
      toOutdeliveryWeight: e.currentTarget.dataset.deliveryweight
    })
    
  },
  foodHideModal(e) {
    this.getShowList();
    this.setData({
      foodModalName: null,
      productsWeight:'',
    })
  },
  foodFormReset(e) {
    console.log('form发生了reset事件，携带数据为：', e)
    this.setData({
      chosen: ''
    })
    
  },
  foodFormSubmit(e) {
    console.log('添加食材form发生了submit事件，携带数据为：', e)
    if(parseFloat(e.detail.value.toOutdeliveryWeight)  > parseFloat(this.data.toOutdeliveryWeight)){
      wx.showToast({
        title: '修改重量不能大于应出库重量',
        icon: 'none',
      })
      return;
    }
    wx.request({
      url: baseUrl+'purchase/purchaseDelivery',//去出库
      method: "post",   
      data:{
        batch: this.data.toOutBatch,
        id: this.data.toOutId,
        updWeight: e.detail.value.toOutdeliveryWeight,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:res=>{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
        this.getShowList();
      }
    })
  }
})
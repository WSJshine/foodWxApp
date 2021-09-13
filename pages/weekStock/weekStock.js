// pages/weekStock/weekStock.js
const app = getApp()
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    twoList: [],
    threeList: [],
    fourList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestTopOneData();

  },
  requestTopOneData(){
    var this_ = this;
      wx.request({
        url:baseUrl+'order/weeklyPurchaseOrder', //服务器地址
        method: "get",   
        header: {
          'content-type': 'application/json'
        },
        success:function (res) {
          this_.setData({ 
            oneList: res.data.data
          });
          if(res.data.data.length !== 0){
            this_.requestBottomData();
          }
          
        }  
      });
  },
  requestBottomData(){
    let this_ = this;
  
    let orderTime = this_.data.oneList[0].orderTime;
    console.log('G骷髅精灵',orderTime)
      wx.request({
        url:baseUrl+'order/weeklyOrderAddPurchase', //服务器地址
        method: "post",   
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          orderTime: orderTime
        },
        success:function (res) {
          this_.setData({ 
            twoList: res.data.orderAdd,
            threeList: res.data.orderUpd,
            fourList: res.data.orderDel,
          });
        }  
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
  detailShowModal(e){
    console.log('Gjk 搬家',e)

    this.setData({
      modalName: 'showModal',
      detailList :  e.currentTarget.dataset.target,
    });
  },
  hideModal(){
    this.setData({
      modalName: null,
    });
  },
  showModal(e) {
    wx.redirectTo({
      url: '/pages/dayList/dayFirstList/dayFirstList'
    })
   
  },
  
})
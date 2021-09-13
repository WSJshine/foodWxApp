
const app = getApp()
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left:0,
    center:0,
    right:1,
    isIntention:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  changeData(){
    wx.request({
      url: baseUrl+'order/merchantOrderList',
      method: "post",
      data:{
        // supName: wx.getStorageSync('supName'),
        type: 3
      },   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res) => {
        this.setData({
          showList: res.data.data
        })
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
    this.changeData()
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
  setStorage(e) {
    wx.navigateTo({
      url: '/pages/treasury/treasuryAllList/treasuryAllList'
     })
  },
  changeLeft(e){
    if(this.data.left == 0 ){
      this.setData({
        left: 1,
        right: 0,
        center:0,
        isIntention:0
      })
      this.changeData();
    }
  },
  changeCenter(e){
    if(this.data.center == 0 ){
      this.setData({
        left: 0,
        right: 0,
        center:1,
        isIntention:1
      })
      this.changeData();
    }
  },
  changeRight(e){
    if(this.data.right == 0 ){
      this.setData({
        left: 0,
        center:0,
        right: 1,
        isIntention:2
      })
      this.changeData();
    }
  },
  toConfirm(e){//确认订单
    console.log('户籍科',e)
    wx.request({
      url: baseUrl+'order/confirmOrder',
      method: "post",
      data:{
        orderId: e.currentTarget.dataset.target,
      },   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res) => {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
        })
        this.changeData()
      }
    })
  },
  toReceipt(e){//确认收货
    wx.request({
      url: baseUrl+'order/confirmReceipt',
      method: "post",
      data:{
        id:  e.currentTarget.dataset.target,
      },   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res) => {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
        })
        this.changeData()
      }
    })
  },
  toReceipt(e){
    console.log('好看',e)
    wx.navigateTo({
      url: '/pages/treasury/toOutStock/toOutStock?option='+e.currentTarget.dataset.orderid,
    })
  }
})
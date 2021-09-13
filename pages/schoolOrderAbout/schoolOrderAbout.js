
const app = getApp()
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left:0,
    right:1,
    isIntention:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeData()
  },
  changeData(){
    wx.request({
      url: baseUrl+'order/advanceOrderList',
      method: "post",
      data:{
        supName: wx.getStorageSync('supName'),
        // isIntention: this.data.isIntention
      },   
      header: {
        'content-type': 'application/json'
      },
      success:(res) => {
        // barChart.setOption(getBarOption(res.data.data.类别, res.data.data.数量));
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
      url: '/pages/schoolOrderAbout/schoolOrderAbout'
     })
  },
  changeLeft(e){
    if(this.data.left == 0 ){
      this.setData({
        left: 1,
        right: 0,
        isIntention:0
      })
      this.changeData();
    }
  },
  changeRight(e){
    if(this.data.right == 0 ){
      this.setData({
        left: 0,
        right: 1,
        isIntention:1
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
    if(e.currentTarget.dataset.distribute !== 2){
      let this_ = this;
      wx.showModal({
        title: '是否确认收货',
        content: '您的订单还未完成配送，要确定收货吗？',
        success (res) {
          if (res.confirm) {
            //确定的操作
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
                this_.changeData()
              }
            })
          } else if (res.cancel) {
            //取消的操作
          }
        }
      })
      
    }
   
  },
  toChangeOrder(e){
    console.log('好看',e)
    wx.navigateTo({
      url: '/pages/schoolOrderChange/schoolOrderChange?option='+e.currentTarget.dataset.orderid,
    })
  }
})
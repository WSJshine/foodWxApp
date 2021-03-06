// pages/dayList/daySecondList/daySecondList.js
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
    this.setData({    
      title: options.title    
    })  
    this.getDataList()
  },
  getDataList(){
    let that = this;
    wx.request({
      url:baseUrl+'purchase/selectPurchaseTodayInfo', //服务器地址
      method: "get",   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function (res) {
        
        that.setData({
          showList: res.data.data[''+that.data.title+'']
        })
        console.log('会尽快汇款',that.data.showList)
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

  }
})
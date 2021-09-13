// pages/message/message.js
const app = getApp();
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftPage:1,
    leftLimit:12,
    messageList:[],//加工商品列表
    type: '',
    isComplete: '',
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData();
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
    this.setData({
      leftPage : this.data.leftPage+1
    })
    this.requestData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  requestData(){
    let this_ = this;
      wx.request({
        url:baseUrl+'message/getMessageList', //服务器地址
        method: "post",   
        header: {
          'content-type': 'application/json'
        },
        data:{
          role:wx.getStorageSync('role'),
          limit: this_.data.leftLimit *this_.data.leftPage,
          page: 1
        },
        success:function (res) {
          this_.setData({ 
            // messageList: this_.data.messageList.concat(res.data.data)
            messageList:res.data.data
          });
        }  
      });
  },
  getDetail(e){
    console.log('高科房东技和',e)
    const { type, iscomplete } = e.currentTarget.dataset
    this.setData({
      messageId : e.currentTarget.dataset.target,
      modalName: 'Modal',
      detailContent: e.currentTarget.dataset.content,
      type: e.currentTarget.dataset.type,
      isComplete: e.currentTarget.dataset.iscomplete,
      isShow: (type == 0 && iscomplete == 0) || (type == 2 && iscomplete == 0)
    })
    let that = this;
    wx.request({
      url:baseUrl+'message/updMessage', //服务器地址
      method: "post",   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        id: e.currentTarget.dataset.target
      },
      success:function (res) {
        that.requestData();
      }  
    });
    console.log('高科技和',that.data.type , that.data.isComplete)
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  toPass(e){
    let that = this;
    wx.request({
      url:baseUrl+'message/examineMessage', //服务器地址
      method: "post",   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        id: that.data.messageId,
        flag:e.currentTarget.dataset.target,
      },
      success:function (res) {
        wx.showToast({
          title: res.data.msg,
          success: function(res) {
            setTimeout(function(){
              that.requestData();
              that.hideModal();
            },1200)
          }
        })
        
      }  
    });
  },
  
})
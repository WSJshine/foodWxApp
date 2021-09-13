const app = getApp();
const baseUrl = app.globalData.baseUrl;
Page({
  data:{
    leftPage:1,
    leftLimit:10,
    rightPage:1,
    rightLimit:10,
    resultInfo:'',
    TabCur: 0,
    scrollLeft:0,
    tabName:[{
        index:1,
        name:'成品库存列表'
    },{
      index:2,
      name:'原料库存列表'
    }],
    processList:[],//加工商品列表
    purchaseList:[],//未加工商品列表
    purchaseImg:'',
    purchaseCode:'',
    productName:'',
  },
   // 事件处理函数
   bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  requestLeftData(){
    var this_ = this;
      wx.request({
        url:baseUrl+'stock/getProcessInventory', //服务器地址
        // url:'https://192.168.1.120:9292/food/getHistoryProcess', //服务器地址
        method: "get",   
        header: {
          'content-type': 'application/json'
        },
        success:function (res) {
          this_.setData({ 
            processList: this_.data.processList.concat(res.data.data)
          });
        }  
      });
  },
  requestRightData(){
    var this_ = this;
      wx.request({
        url:baseUrl+'stock/getPurchaseInventory', //服务器地址
        // url:'https://192.168.1.120:9292/food/getHistoryPurchase', //服务器地址
        method: "get",   
        header: {
          'content-type': 'application/json'
        },
        success:function (res) {
          this_.setData({ 
            // purchaseList: res.data.data
            purchaseList: this_.data.purchaseList.concat(res.data.data)
          });
        }  
      });
  },
  onLoad: function (options) {
    this.requestLeftData();
    this.requestRightData();
  },
  onReachBottom: function(e){
    console.log('加载更多')
    if(this.data.TabCur == 0){
      this.setData({
        leftPage : this.data.leftPage+1
      })
      this.requestLeftData();
    }else{
      this.setData({
        rightPage : this.data.rightPage+1
      })
      this.requestRightData();
    }
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  noProcessShowModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
    });
    wx.request({
      url: baseUrl+'stock/getPurchaseList',
      method: "get",   
      data:{
        name:e.currentTarget.dataset.name,
      },
      header: {
        'content-type': 'application/json'
      },
      success:res=>{
        this.setData({
          noProcessDetailList: res.data.data
        })
      }
    })
  },
  noProcessHideModal(e) {
    this.setData({
      modalName: null
    })
  },
  processShowModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
    });
    wx.request({
      url: baseUrl+'stock/getProcessList',
      method: "get",   
      data:{
        name:e.currentTarget.dataset.name,
      },
      header: {
        'content-type': 'application/json'
      },
      success:res=>{
        this.setData({
          processDetailList: res.data.data
        })
      }
    })
  },
  processHideModal(e) {
    this.setData({
      processModalName: null,
      modalName:null
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})
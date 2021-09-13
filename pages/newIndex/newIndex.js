// pages/newIndex/newIndex.js
const app = getApp();
const baseUrl = app.globalData.baseUrl;
import * as echarts from '../../ec-canvas/echarts';
//function
function getBarOption(nameArr, dataArr) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['商品']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: nameArr,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: dataArr
      }
    ]
  };
}
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    bottomIndex:'1',
    TabCur: 0,
    scrollLeft:0,
    menuList: [{
      title: '扫码',
      img: '/ICON/code.png',
      url: '1',
      color: 'blue',
      isShow:true,
      icon:'/ICON/扫码.png'
    },
    {
      title: '食材采购',
      img: '/ICON/addproduct.png',
      url: '/addproduct/addproduct',
      color: 'blue',
      isShow:false,
      icon:'/images/purchase.png'
    },
    {
      title: '原料入库',
      img: '/ICON/addMaterial.png',
      url: '/addMaterial/addMaterial',
      color: 'blue',
      isShow:false,
      icon:'/images/list.png'
    },
    {
      title: '加工清单',
      img: '/ICON/processingOrder.png',
      url: '/processingOrder/processingOrder',
      color: 'blue',
      isShow:false,
      icon:'/images/list.png'
    },
    {
      title: '原料出库',
      img: '/ICON/outStockForm.png',
      url: '/outStockForm/outStockForm',
      color: 'blue',
      isShow:false,
      icon:'/images/list.png'
    },
    {
      title: '成品入库',
      img: '/ICON/innerLibrary.png',
      url: '/innerLibrary/innerLibrary',
      color: 'blue',
      isShow:false,
      icon:'/images/list.png'
    },
    
    // {
    //   title: '预订单',
    //   img: '/ICON/orderForm.png',
    //   url: '/orderForm/orderForm',
    //   color: 'blue',
    //   isShow:false,
    //   icon:'/images/list.png'
    // },
    {
      title: '预订单',
      img: '/ICON/orderForm.png',
      url: '/orderForm_new/orderForm_new',
      color: 'blue',
      isShow:false,
      icon:'/images/list.png'
    },
    {
      title: '订单列表',
      img: '/ICON/OrderList.png',
      // url: '/schoolOrderList/schoolOrderList',
      url: '10',
      color: 'green',
      isShow:false,
      icon:'/images/list.png'
    },
    {
      title: '学校订单',
      img: '/ICON/OrderList.png',
      url: '/schoolOrderList/schoolOrderList',
      color: 'red',
      isShow:false,
      icon:'/images/list.png'
    },
    {
      title: '配送员订单',
      img: '/ICON/OrderList.png',
      url: '/courier/courierList/courierList',
      color: 'red',
      isShow:false,
      icon:'/images/list.png'
    },
    {
      title: '库管订单',
      img: '/ICON/OrderList.png',
      url: '/treasury/treasuryList/treasuryList',
      color: 'red',
      isShow:false,
      icon:'/images/list.png'
    },
    {
      title: '产品库存',
      img: '/ICON/stockList.png',
      url: '/stockList/stockList',
      color: 'blue',
      isShow:false,
      icon:'/images/list.png'
    },
    {
      title: '周采购单',
      img: '/ICON/weekStock.png',
      url: '/weekStock/weekStock',
      color: 'blue',
      isShow:false,
      icon:'/images/process.png'
    },
    // {
    //   title: '原料加工',
    //   img: '/ICON/processNew.png',
    //   url: '/processNew/processNew',
    //   color: 'blue',
    //   isShow:false,
    //   icon:'/images/process.png'
    // },
    ],
    ecBar: {
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        wx.request({
          // url:'https://weixin.kdkjyxgs.com:9292/food/getTodayInfo', //获取图表数据
          url:baseUrl+'food/getTodayInfo', //获取图表数据
          method: "get",   
          header: {
            'content-type': 'application/json'
          },
          success:(res) => {
            barChart.setOption(getBarOption(res.data.data.类别, res.data.data.数量));
          }  
        })
        return barChart;
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    
  },
  // wxGetLogin(){
  //   wx.request({
  //     url: 'https://172.168.10.109:9292/api/wxLogin', //接口地址
  //     method:'post',
  //     data: {
  //       code:wx.getStorageSync('wxCode'),
  //       userName:'',
  //       iv:wx.getStorageSync('key')
  //     },
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded' //默认值
  //     },
  //     success: function (res) {
  //       console.log(res.data)
  //       wx.setStorageSync('openId', res.data.openId)
  //     }
  //   })
  // },
    getMessageCont(){
      let role = '';
      if( wx.getStorageSync('role')){
        role = wx.getStorageSync('role')
      }else{
        role = '6';
      }
      let this_ = this;
      wx.request({
        url:baseUrl+'message/getCount', //服务器地址
        method: "post",   
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          role: role
        },
        success:function (res) {
          this_.setData({
            messageCount: res.data.data
          })
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
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    };
    // this.wxGetLogin();
    this.getMessageCont();
    this.setData({
      bottomIndex: '1'
    })
    if( wx.getStorageSync('role')){
      console.log('国际化个估计也还感觉',wx.getStorageSync('role'))
      let role = wx.getStorageSync('role')
      console.log('灰空间户籍科',role)
      let list = this.data.menuList;
      for(let i = 0;i<list.length;i++){
        if(list[i].title === '产品库存' && role.indexOf('5') == -1){
          list[i].isShow = true;
        }
        if(role == '0'){
          list[i].isShow = true;
          if(list[i].color == 'green'){
            list[i].isShow = false;
          }
        }
        if(role.indexOf('1') !== -1){
          if(list[i].title === '食材采购' || list[i].title === '周采购单'){
            list[i].isShow = true;
          }
        }
         if(role.indexOf('2') !== -1){
          console.log('感觉很好看')
          if(list[i].title === '原料入库' || list[i].title === '原料出库'){
            console.log('第三方胜多负少的水电费水电费')
            list[i].isShow = true;
          }
        }
         if(role.indexOf('4') !== -1){
          if(list[i].title === '加工清单'){
            list[i].isShow = true;
          }
        }
         if(role.indexOf('3') !== -1){
          if(list[i].title === '成品入库' || list[i].title === '库管订单'){
            list[i].isShow = true;
          }
        }
         if(role.indexOf('5') !== -1){
          if(list[i].title === '配送员订单' ){
            list[i].isShow = true;
          }
        }
         if(role.indexOf('6') !== -1){
          if(list[i].title === '产品库存'){
            list[i].isShow = false;
          }
          if(list[i].title === '学校订单'){
            list[i].isShow = true;
          }
          if(list[i].title === '预订单'){
            list[i].isShow = true;
          }
        }
         if(role.indexOf('7') !== -1){
          if(list[i].title === '产品库存'){
            list[i].isShow = false;
          }
        }
       
      }
      
      this.setData({
        menuList:list
      })
    }
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
  changeBottom(e){
    console.log('更何况',e.currentTarget.dataset.target)
    this.setData({
      bottomIndex: e.currentTarget.dataset.target
    })
    if(e.currentTarget.dataset.target == '2'){
      wx.navigateTo({
        url: '/pages/messageList/messageList'
      })
    }
    if(e.currentTarget.dataset.target == '3'){
      wx.navigateTo({
        url: '/pages/morePage/morePage'
      })
      // if(wx.getStorageSync('token')){
      //       wx.navigateTo({
      //         url: '/pages/morePage/morePage'
      //       })
      // }else{
      //      wx.navigateTo({
      //         url: '/pages/login/login'
      //       })
      // }
   
    }
  },
  tabSelect(e) {
    console.log('公交卡个',e)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  toChild(e) {
    console.log('会尽快哈', e.currentTarget.dataset.url)
    var this_ = this;
    if(e.currentTarget.dataset.url === '1'){
      this_.scanCode();
    }else{
      wx.getStorage({
        key: 'token',
        success (res) {
          if(e.currentTarget.dataset.url === '10'){
            if(wx.getStorageSync('role').indexOf('5')!== -1){
              wx.navigateTo({
                url: '/pages/courier/courierList/courierList'
              })
            }else if(wx.getStorageSync('role').indexOf('6')!== -1){
              wx.navigateTo({
                url: '/pages/schoolOrderList/schoolOrderList'
              })
            }else if(wx.getStorageSync('role').indexOf('3')!== -1){
              wx.navigateTo({
                url: '/pages/treasury/treasuryList/treasuryList'
              })
            }
          }else{
            wx.navigateTo({
              url: '/pages'+e.currentTarget.dataset.url
            })
          }
          
        },
        fail (res){
          console.log('token获取失败')
          wx.navigateTo({
            url: '/pages/login/login?str='+e.currentTarget.dataset.url
          })
        }
      })
    }
    
  },
  scanCode() {
    wx.scanCode({
      success(res) {
        var aaa = JSON.parse(res.result)
        if(aaa.processFlag == true){//加工商品--左边的
          wx.navigateTo({
            // url: '../detailPage/detailPage?res=' + res.result
            url: '/pages/about/home/home?res=' + res.result
          })
        }else if(aaa.purchaseFlag == true){//进货商品--右边的
          wx.navigateTo({
            // url: '../detailPage/detailPage?res=' + res.result
            url: '/pages/rightAbout/home/home?res=' + res.result
          })
        }else if(aaa.dishFlag == true){//菜品码
          wx.navigateTo({
            url: '/pages/vegetAbout/home/home?res=' + res.result
          })
        }
      
      }
    })
  },
})
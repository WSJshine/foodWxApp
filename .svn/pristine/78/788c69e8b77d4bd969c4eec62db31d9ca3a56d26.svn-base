
// var address = require('./city.js')
const app = getApp();
const baseUrl = app.globalData.baseUrl;
Page({
  data: {
    readyGetList:[],
    purchaseImg:'',
  },
  onLoad(options) {
   
    
  },
  onShow(){
    this.getProcessList();
  },
  getProcessList(){
    wx.request({ 
      // url:'https://weixin.kdkjyxgs.com:9295/food/processList',//获取加工单
      url: baseUrl+ '/food/getProcessToPut',//获取入库单
      method: "get",   
      header: {
        'content-type': 'application/json'
      },
      success:(res) => {
        this.setData({ 
          showList: res.data.data,
         });
      }  
    })
  },
  toCollect(e){
    wx.request({ 
      url: baseUrl+ 'purchase/addDeliveryList',
      method: "post",   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        batch: e.currentTarget.dataset.target
      },
      success:(res) => {
        this.getProcessList();
         
      }  
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      readyGetList:[]
    })
  },
  toGet(e){
    // this.setData({
    //   modalName: e.currentTarget.dataset.target,
    //   batch: e.currentTarget.dataset.batch
    // })
    wx.request({ 
      url: baseUrl+ 'purchase/receiveList',
      method: "get",   
      header: {
        'content-type': 'application/json'
      },
      data:{
        batch: e.currentTarget.dataset.batch
      },
      success:(res) => {
        if(res.data.data.length == 0){
          wx.showToast({
            title: '原料还未出库',
            icon: 'none',
          })
        }else{
          this.setData({
            modalName: e.currentTarget.dataset.target,
            batch: e.currentTarget.dataset.batch,
            toGetShowList: res.data.data
          })
        }
      }  
    })
  },
  readyGet(e){
    console.log('好欢乐',e);
    if(e.detail.value == true){
      this.data.readyGetList.push(e.currentTarget.dataset.target)
    }else{
      for(let i = 0 ; i <this.data.readyGetList.length;i++){
        if(e.currentTarget.dataset.target == this.data.readyGetList[i]){
          this.data.readyGetList.splice(i,1)
        }
      }
    }
    
    // console.log('好欢大富大贵乐',this.data.readyGetList);
   
  },
  toFinishGet(){
    var isReceive = '';
    for(let j = 0;j<this.data.toGetShowList.length;j++){
      for(let m = 0;m<this.data.readyGetList.length;m++){
        if(this.data.readyGetList[m] == this.data.toGetShowList[j].id){
          isReceive += this.data.toGetShowList[j].productName +'-'+ this.data.toGetShowList[j].deliveryWeight +','
        }
      }
    }
    isReceive = isReceive.substring(0,isReceive.length-1);
    wx.request({ 
      url: baseUrl+ 'purchase/receiveMaterial',
      method: "post",   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        batch: this.data.batch,
        isReceive:isReceive
      },
      success:(res) => {
        this.hideModal();
      }  
    })
  },
  selectDetail(e){
    console.log('公交卡',e)
    this.setData({
      detailTitle: e.currentTarget.dataset.productname
     
    })
    wx.request({ 
      url: baseUrl+ 'food/getProcessOrder',//详情
      method: "post",   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        batch: e.currentTarget.dataset.batch,
        productName: e.currentTarget.dataset.productname,
      },
      success:(res) => {
        this.setData({
          modalName: e.currentTarget.dataset.target,
          detailList: res.data.data
        })
      }  
    })
  },
  showCode1(e){
    console.log('黑科技',e)
    this.setData({
      modalName: e.currentTarget.dataset.target,
    });
    wx.navigateTo({
      url: '/pages/addFinishProduct/addFinishProduct?option=' +  e.currentTarget.dataset.target,
    })
  },
  processHideModal(e) {
    this.setData({
      modalName:null
    })
  },
  scanCode(e) {//扫码--加工码
    wx.scanCode({
      success(res) {
        var aaa = JSON.parse(res.result)
        console.log('扫到的内容',aaa)
        if(aaa.processFlag == true){
          if(aaa.code === e.currentTarget.dataset.target){
            let option={
              code:aaa.code,
              processId:aaa.processId
            }
            wx.navigateTo({
              url: '/pages/addFinishProduct/addFinishProduct?option=' +  JSON.stringify(option),
            })
          }else{
            wx.showToast({
              title: '请扫对应成品码',
              icon: 'none',
              duration: 1500
           })
          }
        }else{
          wx.showToast({
            title: '请扫成品信息码',
            icon: 'none',
            duration: 1500
         })
        }
      
      }
    })
  },
  //点击保存图片
  save () {
    let that = this
    //若二维码未加载完毕，加个动画提高用户体验
    // wx.showToast({
    //   icon: 'loading',
    //   title: '正在保存图片',
    //   duration: 1000
    // })
    //判断用户是否授权"保存到相册"
    wx.getSetting({
      success (res) {
        //没有权限，发起授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success () {//用户允许授权，保存图片到相册
              that.savePhoto();
            },
            fail () {//用户点击拒绝授权，跳转到设置页，引导用户授权
              wx.openSetting({
                success () {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success() {
                      that.savePhoto();
                    }
                  })
                }
              })
            }
          })
        } else {//用户已授权，保存到相册
          that.savePhoto()
          // that.downloadImage()
        }
      }
    })
  },
  //下载图片地址并保存到相册，提示保存成功
  savePhoto() {
    console.log('要保持图片了',this.data.purchaseImg.slice(22))
    var imgSrc = this.data.purchaseImg.slice(22)
    var save = wx.getFileSystemManager();
    var number = ''

    for (var i = 0; i < 8; i++) {
      number += Math.floor(Math.random() * 10);
  }
    save.writeFile({
        filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
        data: imgSrc,
        encoding: 'base64',
        success: res => {
            wx.saveImageToPhotosAlbum({ //保存为png格式到相册
                filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
                success: function (res) {
                    wx.showToast({
                        title: '下载成功',
                        icon: 'none',
                        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
                    })
                },
                fail: function (err) {
                    console.log(err)
                }
            })
        }, 
        fail: err => {
            console.log('错误：', err)
        }
    })
  }
})
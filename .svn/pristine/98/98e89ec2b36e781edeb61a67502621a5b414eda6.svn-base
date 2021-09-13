
// var address = require('./city.js')
var util = require('../../utils/util');
const app = getApp();
const baseUrl = app.globalData.baseUrl;
const baseCheckUnit = app.globalData.checkUnit;
const baseIndex = app.globalData.index;
const baseUnit = app.globalData.unit;
Page({
  data: {
    readyGetList:[],
    purchaseImg:'',
    origin:'',//产地回显
    // checkUnit:['斤','袋','件','包','桶'],
    // index:'0',
    // unit:'斤',
    multiIndex: [0, 0, 0],
    prov:[],
    city:[][8],
    // areas:[8][0][0],

    address: '', //详细收货地址（四级）
    value: [0, 0, 0], // 地址选择器省市区 暂存 currentIndex
    region: '', //所在地区
    regionValue: [0, 0, 0], // 地址选择器省市区 最终 currentIndex
    provinces: [], // 一级地址
    citys: [], // 二级地址
    // areas: [], // 三级地址
    visible: false,
    isCanConfirm: true //是否禁止在第一列滚动期间点击确定提交数据
  },
  onLoad(options) {
    this.getProcessList();
    this.setData({
      checkUnit:baseCheckUnit,
      index:baseIndex,
      unit:baseUnit,
    })
  },
  getProcessList(){
    wx.request({ 
      // url:'https://weixin.kdkjyxgs.com:9295/food/processList',//获取加工单
      url: baseUrl+ 'food/processList',//获取加工单
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
  isCard(e) {
    console.log('户籍科',e)
    wx.request({ 
      url: baseUrl+ 'food/processEnd',
      method: "post",   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        processId: e.currentTarget.dataset.target
      },
      success:(res) => {
        if(res.data.code == 500){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }else{
          // this.setData({
          //   isCard1: e.detail.value,
          //   isCard2: false
          // })
        }
        this.getProcessList();
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
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
      })
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
          isReceive += this.data.toGetShowList[j].productName +'-'+ this.data.toGetShowList[j].deliveryWeight +'-'+ this.data.toGetShowList[j].id +','
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
    wx.request({
      url: baseUrl+'food/getProcessCode',//二维码
      method: "post",   
      data:{
        processId: e.currentTarget.dataset.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      responseType: 'arraybuffer',
      success:res=>{
        let url ='data:image/png;base64,'+wx.arrayBufferToBase64(res.data)
        this.setData({
          purchaseImg: url
        })
      }
    })
  },
  processHideModal(e) {
    this.setData({
      modalName:null
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
    // console.log('要保持图片了',this.data.purchaseImg.slice(22))
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
  },
  foodHideModal(e) {
    this.setData({
      foodModalName: null,
      region:'',
      productsWeight:''
    })
  },
  selectMaterial(e){
    wx.request({ 
      // url:'https://weixin.kdkjyxgs.com:9295/ingredients/getSelectMulti',//获取食材加工产品
      url: baseUrl+'ingredients/getSelectMulti',//获取食材加工产品
      method: "get",   
      header: {
        'content-type': 'application/json'
      },
      data:{
        name: ''
      },
      success:(res) => {
        var id = res.data.pro[0].id 
        this.setData({
          provinces: res.data.pro, // 34省
          citys: res.data.city[id], //默认北京市辖区
          // areas: res.data.area[res.data.city[id][0].id],
          address: res.data,
          foodModalName: e.currentTarget.dataset.target,
        })
         
      }  
    })
  
  },
  PickerChange(e) {
    console.log(e.detail.value);
    var index = e.detail.value
    this.setData({
      index: e.detail.value,
      unit: this.data.checkUnit[index]
    })
  },
 // 三级下拉
 closePopUp() {
  this.setData({
    visible: false
  })
},
pickAddress() {
  this.setData({
    visible: true,
    value:[0,0,0],
    // value: [...this.data.regionValue]
  })
},
// 处理省市县联动逻辑 并保存 value
cityChange(e) {
  console.log('会尽快哈',e.detail.value)
  var value = e.detail.value
  let {
    provinces,
    citys
  } = this.data
  var provinceNum = value[0]
  var cityNum = value[1]
  var areaNum = value[2]

  if (this.data.value[0] !== provinceNum) {
    var id = provinces[provinceNum].id
    this.setData({
      value: [provinceNum, 0, 0],
      citys: this.data.address.city[id],
      areas: this.data.address.area[this.data.address.city[id][0].id]
    })
  } else if (this.data.value[1] !== cityNum) {
    var id = citys[cityNum].id
    this.setData({
      value: [provinceNum, cityNum, 0],
      areas: this.data.address.area[citys[cityNum].id]
    })
  } else {
    this.setData({
      value: [provinceNum, cityNum, areaNum]
    })
  }
},
preventTouchmove() {},
// 城市选择器
// 点击地区选择取消按钮
cityCancel(e) {
  var id = this.data.address.pro[0].id 
  this.setData({
    citys: this.data.lastCitys ||  this.data.address.city[id], //默认北京市辖区,
    areas: this.data.lastAreas || this.data.address.area[this.data.address.city[id][0].id],
    value: [...this.data.regionValue],
    visible: false
  })
},
// 提交时由序号获取省市区id
getRegionId(type) {
  let value = this.data.regionValue
  let provinceId = this.data.address.pro[value[0]].id
  let townId = this.data.address.city[provinceId][value[1]].id
  let areaId = ''
  if (this.data.address.area[townId][value[2]].id) {
    areaId = this.data.address.area[townId][value[2]].id
  } else {
    areaId = 0
  }

  if (type === 'provinceId') {
    return provinceId
  } else if (type === 'townId') {
    return townId
  } else {
    return areaId
  }
},
chooseStart(e) {
  this.setData({
    isCanConfirm: false
  })
},
chooseEnd(e) {
  this.setData({
    isCanConfirm: true
  })
},
// 点击地区选择确定按钮
citySure(e) {
  if (this.data.isCanConfirm) {
    var value = this.data.value
    this.setData({
      visible: false
    })
    // 将选择的城市信息显示到输入框
    try {
      // var region = (this.data.provinces[value[0]].name || '') + (this.data.citys[value[1]].name || '')
      var region = this.data.citys[value[1]].name || ''
      if (this.data.areas.length > 0) {
        if(this.data.areas[value[2]].name){
          region = this.data.areas[value[2]].name 
        }else{
          region = region +  ''
        }
        // region = region + this.data.areas[value[2]].name || ''
      } else {
        this.data.value[2] = 0
      }
    } catch (error) {
      console.log('adress select something error')
    }

    this.setData({
      region: region,
      lastCitys: this.data.citys,
      lastAreas: this.data.areas,
      regionValue: [...this.data.value],
    }, () => {
      console.log(`省份ID：${this.getRegionId('provinceId')}: 市区ID：${this.getRegionId('townId')}：城区ID：${this.getRegionId('areas')}`)
      this.setData({
        myAreaId: this.getRegionId('areas')
      })
    })
  }
},
foodFormSubmit(e) {
  console.log('添加食材form发生了submit事件，携带数据为：', e);
  var dishName = '';

  if(this.data.myAreaId == 0){
    var id = this.data.address.pro[this.data.regionValue[0]].id;
    // console.log('户籍科好',this.data.address.city.id,this.data.regionValue[1])
    dishName=this.data.address.city[id][this.data.regionValue[1]].name;
  }else{
    var id = this.data.address.pro[this.data.regionValue[0]].id;
    var idd=this.data.address.city[id][this.data.regionValue[1]].id;
    dishName=this.data.address.area[idd][this.data.regionValue[2]].name;
  }
  let i = this.data.index;
  let unit = this.data.checkUnit[i]
  console.log('好看',dishName+e.detail.value.productsWeight+unit)
 let that = this;
  wx.request({
    url: baseUrl+'order/addProcess', //服务器地址
    method: "post",   
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:{
      processedProducts:dishName,
      productWeight:e.detail.value.productsWeight,
      productUnit: unit
    },
    success:function (res) {
      wx.showToast({
        title: '提交成功',
        icon: 'none',
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
        success: function () {
          that.foodHideModal();
          that.onLoad();
        //   setTimeout(function () {
        //    wx.navigateTo({
        //      url: '/pages/newIndex/newIndex'
        //    })
        //  }, 1000)
       }
      })
    }  
  })
 

},

})
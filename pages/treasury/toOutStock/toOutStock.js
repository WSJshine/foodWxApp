// pages/schoolOrderChange/schoolOrderChange.js
const app = getApp()
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkUnit:['斤','袋','件','包','桶'],
    unit:'',

    address: '', //详细收货地址（四级）
    value: [0, 0, 0], // 地址选择器省市区 暂存 currentIndex
    region: '', //所在地区
    regionValue: [0, 0, 0], // 地址选择器省市区 最终 currentIndex
    provinces: [], // 一级地址
    citys: [], // 二级地址
    areas: [], // 三级地址
    visible: false,
    isCanConfirm: true //是否禁止在第一列滚动期间点击确定提交数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('黑科技',options)
    this.setData({
      orderId: options.option
    })
this.getDetail()
  },
// 查订单详情
  getDetail(){
    wx.request({
      url: baseUrl+'order/getModifyOrder',
      method: "post",
      data:{
        orderId: this.data.orderId,
      },   
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res) => {
        this.setData({
          showList: res.data.data
        })
        console.log('刚开机',this.data.showList)
      }
    })
  },
  deleteFood(e){
    wx.request({
      url: baseUrl+'order/deleteChild',
      method: "post",
      data:{
        id: e.currentTarget.dataset.target,
      },   
      header: {
        'content-type': 'application/json'
      },
      success:(res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
        this.getDetail();
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
  inputWeight(e){
    let list = this.data.showList;
    for(let i = 0;i<list.length;i++){
      if(list[i].id == e.currentTarget.dataset.target){
        list[i].dishWeight = e.detail.value
      }
    }
    this.setData({
      modifyList: list
    })
    console.log('黑科技刚开机',list)
  },
  foodModify(){//确定
    wx.request({ 
      url:baseUrl+'user/getDistributor',//配送员
      method: "get",   
      header: {
        'content-type': 'application/json'
      },
      // data:{
      //   traceability: aaa.code
      // },
      success:(res) => {
          this.setData({
            modalName: 'bottomModal',
            courierList:res.data.data,
          })
      }  
    })
  },
  radioChange(e){
    console.log('还贷款是返回',e)
    // let list = e.detail.value;
    // let show = []
    this.setData({
      checkedCourier: e.currentTarget.dataset.target
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
  selectProduct(e){
    wx.request({ 
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
          areas: res.data.area[res.data.city[id][0].id],
          address: res.data
        })
      }  
    })
  },
  foodShowModal(e) {
    this.selectProduct();
    this.setData({
      foodModalName: e.currentTarget.dataset.target,
      // addFoodIndex: e.currentTarget.dataset.index
    })
  },
  foodFormAddReset(e) {
    console.log('form发生了reset事件，携带数据为：', e)
    this.setData({
      chosen: '',
      index:'',
      region:'',

    })
  },
  foodHideModal(e) {
    this.foodFormAddReset(e);
    this.setData({
      foodModalName: null,
      // index:'',
      // region:''
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  hideModal1(e){
    if(this.data.checkedCourier){
      this.setData({
        modalName: null
      })
      wx.request({ 
        url: baseUrl+'food/processDelivery',//出库
        method: "post",   
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          distributor: this.data.checkedCourier,
          json:JSON.stringify(this.data.showList)
        },
        success:(res) => {
          if(res.data.code == 200){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000,
              success:function(){
                wx.navigateBack({
                  delta: 1
                });
              }
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
          }
          // var id = res.data.pro[0].id 
          // this.setData({
          //   provinces: res.data.pro, // 34省
          //   citys: res.data.city[id], //默认北京市辖区
          //   areas: res.data.area[res.data.city[id][0].id],
          //   address: res.data
          // })
        }  
      })
    }else{
        wx.showToast({
          title: '请选择配送人',
          icon: 'none',
        })
    }

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
      value: [...this.data.regionValue]
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
  foodFormAddSubmit(e) {
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
    console.log('好看',dishName+e.detail.value.productsWeight+this.data.unit)
    wx.request({
      url: baseUrl+'order/addChild',
      method: "post",
      data:{
        orderId: this.data.orderId,
        dishName: dishName,
        dishWeight: e.detail.value.productsWeight,
        dishType: this.data.unit
      },   
      header: {
        'content-type': 'application/json'
      },
      success:(res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
        this.getDetail();
        this.foodFormAddReset();
      }
    })
    // var showData = dishName+e.detail.value.productsWeight+this.data.unit;
    // this.data.addFoodIndex={
    //   dishName:'',//名称
    // }
    // let index = this.data.addFoodIndex;
    // let list = this.data.showList;
    // // console.log('离开',index,list)
    // var aa={
    //   show : dishName+e.detail.value.productsWeight+this.data.unit,
    //   dishName: dishName,
    //   dishWeight: e.detail.value.productsWeight,
    //   dishType:this.data.unit,
    //   // distributionTime:list[index].time
    // }
    // // list[index].showData.push(aa);
    // this.setData({
    //   showList:list
    // })
   
    // console.log('和海陆空',this.data.showList)
  },
  formSubmit(){
    var json ={
      // su : this.data.showList[0].showData,
      // mo : this.data.showList[1].showData,
      // tu : this.data.showList[2].showData,
      // we : this.data.showList[3].showData,
      // th : this.data.showList[4].showData,
      // fr : this.data.showList[5].showData
    }
    var aa = JSON.stringify(json)
    wx.request({
      url: baseUrl+'order/addIntentionOrder', //服务器地址
      method: "post",   
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data:{
        json:aa,
        supName: wx.getStorageSync('supName')//这个要传学校名
      },
      success:function (res) {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
          success: function () {
            setTimeout(function () {
             wx.navigateTo({
               url: '/pages/index/index'
             })
           }, 1000)
         }
        })
      }  
    })
  },
  scanCode(e) {//扫码  
    let index = e.currentTarget.dataset.index;
    let that = this;
    console.log('很快乐和',e)
    wx.scanCode({
      success(res) {
        console.log('和好看厉害了',res)
        var aaa = JSON.parse(res.result)
        console.log('扫出来的', aaa)
        wx.request({
          url: baseUrl+'food/checkScan',
          method: "post",
          data:{
            str: e.currentTarget.dataset.str,
            id: e.currentTarget.dataset.target,
            dishName: aaa.productName,
            traceability: aaa.code
          },   
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res){
            if(res.data.code == 200){
              let list = that.data.showList;
              if(list[index].traceability){
                if(list[index].traceability.indexOf(aaa.code)!== -1){
                  wx.showToast({
                    title: '扫码重复',
                    icon: 'none',
                  })
                }else{
                   list[index].traceability+='\n'+aaa.code
                }
              }else{
                list[index].traceability = aaa.code;
              }
              that.setData({
                showList:list
              })
            }else{
                wx.showToast({
                title: res.data.msg,
                icon: 'none',
              })
            }
          }
        })
      
      }
    })
  },
})
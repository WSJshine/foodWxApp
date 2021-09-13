// pages/orderForm/orderForm.js
const app = getApp();
const baseUrl = app.globalData.baseUrl;
const baseCheckUnit = app.globalData.checkUnit;
const baseIndex = app.globalData.index;
const baseUnit = app.globalData.unit;
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
    showList:[
      {
        time: '07:00',
        day:'周日',
        showData:[],
        distributionTime:''
      },
      {
        time: '07:00',
        day:'周一',
        showData:[],
        distributionTime:''
      },
      {
        time: '07:00',
        day:'周二',
        showData:[],
        distributionTime:''
      },
      {
        time: '07:00',
        day:'周三',
        showData:[],
        distributionTime:''
      },
      {
        time: '07:00',
        day:'周四',
        showData:[],
        distributionTime:''
      },
      {
        time: '07:00',
        day:'周五',
        showData:[],
        distributionTime:''
      },
  ],
  ColorList: [{
    title: '嫣红',
    name: 'red',
    color: '#e54d42'
  },
  {
    title: '桔橙',
    name: 'orange',
    color: '#f37b1d'
  },
  ],
  // checkUnit:['斤','袋','件','包','桶'],
  // index:'0',
  // unit:'',
  multiIndex: [0, 0, 0],
    // multiArray: [
    //   ['面条', '冻货', '蛋类', '干调', '糕点', '粮油', '青菜', '肉类'],
    //   ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
    //   ['猪肉绦虫', '吸血虫']
    // ],
    pro:[],
    city:[][8],
    showFoodList:[],

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
    this.setData({
      checkUnit:baseCheckUnit,
      index:baseIndex,
      unit:baseUnit,
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
  TimeChange(e) {
    let index = e.currentTarget.dataset.target;
    let list = this.data.showList;
    list[index].time = e.detail.value;
    this.setData({
      showList:list
    })
  },
  foodShowModal(e) {
    this.selectProduct();
    this.setData({
      foodModalName: e.currentTarget.dataset.target,
      addFoodIndex: e.currentTarget.dataset.index
    })
  },
  foodFormReset(e) {
    console.log('form发生了reset事件，携带数据为：', e)
    this.setData({
      chosen: ''
    })
  },
  foodHideModal(e) {
    this.foodFormReset(e);
    this.setData({
      foodModalName: null,
      checkUnit:baseCheckUnit,
      index:baseIndex,
      unit:baseUnit,
    })
  },
  foodAdd(e){
    this.setData({
      foodModalName: null,
      // index:'',
      // region:''
    })
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
      // value: [...this.data.regionValue]上一次选中的值
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
    console.log('好看',dishName+e.detail.value.productsWeight+this.data.unit)
    // var showData = dishName+e.detail.value.productsWeight+this.data.unit;
    // this.data.addFoodIndex={
    //   dishName:'',//名称
    // }
    let index = this.data.addFoodIndex;
    let list = this.data.showList;
    console.log('离开',index,list)
    var aa={
      show : dishName+e.detail.value.productsWeight+this.data.unit,
      dishName: dishName,
      dishWeight: e.detail.value.productsWeight,
      dishType:this.data.unit,
      distributionTime:list[index].time
    }
    list[index].showData.push(aa);
    this.setData({
      showList:list,
      region:'',
      productsWeight:'',
      index:''
    })
   this.foodHideModal();
    console.log('和海陆空',this.data.showList)
  },
  formSubmit(){
    var json ={
      su : this.data.showList[0].showData,
      mo : this.data.showList[1].showData,
      tu : this.data.showList[2].showData,
      we : this.data.showList[3].showData,
      th : this.data.showList[4].showData,
      fr : this.data.showList[5].showData
    }
    var aa = JSON.stringify(json)
    wx.request({
      // url:'https://weixin.kdkjyxgs.com:9292/purchase/addPurchase', //服务器地址
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
               url: '/pages/newIndex/newIndex'
             })
           }, 1000)
         }
        })
      }  
    })
  }
})
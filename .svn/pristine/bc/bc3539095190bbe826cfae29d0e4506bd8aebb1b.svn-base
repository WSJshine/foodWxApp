var util = require('../../utils/util');
const app = getApp();
const baseUrl = app.globalData.baseUrl;
const baseCheckUnit = app.globalData.checkUnit;
const baseIndex = app.globalData.index;
const baseUnit = app.globalData.unit;
Page({
  data:{
    resultInfo:'',
    time: '12:01',
    date: '',
    date1: '',
    checkbox: [],
    checkbox1: [],
    checkbox2: [],
    checkbox3: [],
    iftrue:'true',
    picker: [],
    selectName:'',
    productionList:[],
    showProList:[],//食材及重量下边回显的数组
    supplier:'',//供应商回显
    origin:'',//产地回显
    // checkUnit:['斤','袋','件','包','桶'],
    // index:'0',
    // unit:'斤',
    multiIndex: [0, 0, 0],
    // multiArray: [
    //   ['面条', '冻货', '蛋类', '干调', '糕点', '粮油', '青菜', '肉类'],
    //   ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
    //   ['猪肉绦虫', '吸血虫']
    // ],
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
   // 事件处理函数
   bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var TIME = util.formatTime(new Date());
    console.log('进来了333333333333',TIME)
    this.setData({
      date: TIME,
      date1: TIME,
      checkUnit:baseCheckUnit,
      index:baseIndex,
      unit:baseUnit,
    });
    // wx.request({
    //     url:baseUrl+'/supplier/getSelectSupplier', //供应商
    //     method: "get",   
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success:(res) => {
    //       this.setData({ checkbox1: res.data.data })
    //       console.log('地方官的观点',this.data.checkbox1)
    //     }  
    // })
    // // wx.request({
    // //   url:'https://weixin.kdkjyxgs.com:9292/supplier/getSelectGroup', //商户
    // //   method: "get",   
    // //   header: {
    // //     'content-type': 'application/json'
    // //   },
    // //   success:(res) => {
    // //     this.setData({ checkbox: res.data.data })
    // //   }  
    // // })
    // wx.request({
    //   url:'https://weixin.kdkjyxgs.com:9292/supplier/getSelectBase', //产地
    //   method: "get",   
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success:(res) => {
    //     this.setData({ checkbox2: res.data.data })
    //   }  
    // })
    //商品
    // wx.request({
    //   url:'https://weixin.kdkjyxgs.com:9292/ingredients/getSelect', //商品
    //   method: "get",   
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success:(res) => {
    //     this.setData({ checkbox3: res.data.data })
    //   }  
    // })
  },
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  radios:function(e){
     
    this.setData({
      originName: e.detail.value
    })   
    this.hideModal();
    console.log('海军和',this.data.originName)   
  },
  talks:function(e){
    this.setData({
      selectName:e.detail.value
    })           
  },
  selectProduct(e){
    wx.request({ 
      // url:'https://weixin.kdkjyxgs.com:9295/ingredients/getSelectMulti',//获取食材加工产品
      url: baseUrl+'ingredients/getSelectTwo',//获取食材加工产品
      method: "get",   
      header: {
        'content-type': 'application/json'
      },
      // data:{
      //   name: this.data.selectName
      // },
      success:(res) => {
        // this.setData({ 
        //   prov: res.data.prov,
        //   city: res.data.city,
        //   area: res.data.area,
        //   multiArray:[res.data.pro,res.data.city,res.data.area]
        //  });
        var id = res.data.pro[0].id 
        this.setData({
          provinces: res.data.pro, // 34省
          citys: res.data.city[id], //默认北京市辖区
          // areas: res.data.area[res.data.city[id][0].id],
          address: res.data
        })
         
      }  
    })
  },
  MultiChange(e) {
    if(e.detail.value[2] == 0){
      this.setData({
        multiIndex: e.detail.value,
        arr: this.data.multiArray[1][e.detail.value[1]]
      })
    }else{
      this.setData({
        multiIndex: e.detail.value,
        arr: this.data.multiArray[2][e.detail.value[2]]
      })
    }
  },
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    console.log('city',this.data.city);
    console.log('area',this.data.area);
    switch (e.detail.column) {
      case 0:
        console.log('动了第一列时第一列的值',data.multiIndex[0])
        // console.log('选取的第二列',this.data.city.length)
        if(this.data.city[data.multiIndex[0]] != null){
          data.multiArray[1] = this.data.city[data.multiIndex[0]];
        }
        data.multiArray[2] = this.data.area[data.multiIndex[0]][0];

        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        console.log('动了第二列时第一列的值',data.multiIndex[0])
        data.multiArray[2] = this.data.area[data.multiIndex[0]][data.multiIndex[1]];
        break;
    }
    this.setData(data);
  },
  foodShowModal(e) {
    this.selectProduct();
    this.setData({
      foodModalName: e.currentTarget.dataset.target,
      checkUnit:baseCheckUnit,
      index:baseIndex,
      unit:baseUnit,
    })
    console.log('好了好了',this.data.foodModalName);
    // this.foodFormReset();
  },
  foodHideModal(e) {
    this.setData({
      foodModalName: null,
      region:'',
      productsWeight:'',
      ups1:'',
      index:'',
      guaranteePeriod:'',
      manufactureTime:''
    })
  },
  showModal1(e) {
    this.setData({
      modalName1: e.currentTarget.dataset.target
    })
  },
  hideModal1(e) {
    this.setData({
      modalName1: null
    })
  },
  showModal2(e) {
    this.setData({
      modalName2: e.currentTarget.dataset.target
    })
  },
  hideModal2(e) {
    this.setData({
      modalName2: null
    })
  },
  showModal3(e) {
    this.setData({
      modalName3: e.currentTarget.dataset.target
    })
  },
  hideModal3(e) {
    this.setData({
      modalName3: null
    })
  },
  ChooseCheckbox(e) {
    console.log('点击了',this.data.checkbox)
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].id == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    
    this.setData({
      checkbox: items
    })
    console.log('哈哈',this.data.checkbox)
  },
  ChooseCheckbox1(e) {
    this.hideModal1();
    console.log('点击了',e)
    let index = e.detail.value;
    let items = this.data.checkbox1;
    let values = this.data.checkbox1[index].id;
    let label = this.data.checkbox1[index].supName;
    this.setData({
      supplier: label,
      cheIndex: e.detail.value
    })
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].id == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox1: items
    })
    console.log('哈1111哈',this.data.checkbox1)
  },
  ChooseCheckbox2(e) {
    console.log('点击了',this.data.checkbox2)
    this.hideModal()
    let index = e.detail.value;
    let items = this.data.checkbox2;
    let values = this.data.checkbox2[index].id;
    let label = this.data.checkbox2[index].supName;
    this.setData({
      origin: label,
      cheIndex2:index
    })
    console.log('点1111击了',values)
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].id == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox2: items
    })
    console.log('哈1111哈',this.data.checkbox2)
  },
  ChooseCheckbox3(e) {
    console.log('点击了',this.data.checkbox3)
    let items = this.data.checkbox3;
    let values = e.currentTarget.dataset.value;
    console.log('点1111击了',values)
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].id == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox3: items
    })
    console.log('哈333哈',this.data.checkbox3)
  },
   // ListTouch触摸开始
   ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },
  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  handleChange(e) {
    console.log(e)
    this.setData({
      value: e.detail.dateString
    })
  },
  formSubmit(e) {//checkbox2
    console.log('form发生了s111ubmit事件，携带数据为：', e.detail.value)
    // if(this.data.iftrue === 'true'){
    //   e.detail.value.type=1;
    // }else{
    //   e.detail.value.type=2;
    // }
    if(this.data.iftrue == 'false'){
      let originName = '';//产地
      for(let i = 0;i<this.data.checkbox2.length;i++){
        if(this.data.checkbox2[i].checked === true){
          originName +=this.data.checkbox2[i].supName+','
        }
      }
      originName = originName.substring(0, originName.lastIndexOf(','));
      e.detail.value.originName = originName;
      e.detail.value.type=2;
    }else{
      e.detail.value.type=1;
      e.detail.value.originName = e.detail.value.originArea;
    }
    
    let supplierName = '';//供应商
    let supplierPhone = '';//供应商联系方式
    for(let i = 0;i<this.data.checkbox1.length;i++){
      if(this.data.checkbox1[i].checked === true){
        supplierName +=this.data.checkbox1[i].supName+',';
        supplierPhone +=this.data.checkbox1[i].phone+','
      }
    }
    supplierName = supplierName.substring(0, supplierName.lastIndexOf(','));
    supplierPhone = supplierPhone.substring(0, supplierPhone.lastIndexOf(','));
    let ingredients = '';
    for(let i = 0;i<this.data.showProList.length;i++){
        ingredients +=this.data.showProList[i].originName + '#' + this.data.showProList[i].productsWeight + '#' + this.data.showProList[i].procuctsUnit + '#' + this.data.showProList[i].manufactureTime+ '#' + this.data.showProList[i].guaranteePeriod+ '#' + this.data.showProList[i].ups1+','
    }
    ingredients = ingredients.substring(0, ingredients.lastIndexOf(','));
   
    e.detail.value.supplierName = supplierName;
    e.detail.value.supplierPhone = supplierPhone;
    e.detail.value.ingredients = ingredients;
    e.detail.value.purchaseTime = this.data.date;
    // e.detail.value.deliveryTime = this.data.date1;
    
    wx.request({
      url:baseUrl+'purchase/addPurchase', //服务器地址
      // url:'https://172.168.10.109:9295/purchase/addPurchase', //服务器地址
      method: "post",   
      header: {
        'content-type': 'application/json'
      },
      data:e.detail.value,
      success:function (res) {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
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
  },
  foodFormReset(e) {
    console.log('form发生了reset事件，携带数据为：', e)
    this.setData({
      chosen: ''
    })
  },
  getWeightInputValue(e){
    console.log('输入框里的重量',e.detail)
    this.setData({
      productsWeight : e.detail.value
    })
  },
  foodFormSubmit(e) {
    console.log('添加食材form发生了submit事件，携带数据为：', e)
    if(e.detail.value.productsWeight === ""){
      wx.showToast({
        title: '采购重量不能为空',
        icon: 'none',
      })
      return;
    }
    // if(this.data.productsWeight == ''){
    //   wx.showToast({
    //     title: '采购重量不能为空',
    //     icon: 'none',
    //   })
    //   return;
    // }
   
    var aa={
      procuctsUnit:this.data.unit,
      productsWeight: e.detail.value.productsWeight,
      // originName:this.data.arr,
      ups1:e.detail.value.ups1,
      originName:this.data.regionDetail,
      manufactureTime:e.detail.value.manufactureTime,
      guaranteePeriod:e.detail.value.guaranteePeriod,
    }
    this.data.showProList.push(aa)
    this.setData({
      showProList:this.data.showProList
    })
    console.log('和海陆空',this.data.showProList)
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  DateChange1(e) {
    this.setData({
      date1: e.detail.value
    })
  },
  setStorage(e) {
    
    let deletName = e.currentTarget.dataset.link.originName
    let array = this.data.showProList;
    for(let i = 0;i<array.length;i++){
      if (array[i].originName == deletName) {
        array.splice(i, 1);
      }
    }
    this.setData({
      showProList: array
    })
   
  },
   /**
   * switch开关监听
   */
  listenerSwitch: function(e) {
    console.log('和第三极开发好', e.detail.value)
    this.setData({
      iftrue: e.detail.value
    })
    if(this.data.iftrue == 'false'){
      wx.request({
        url:baseUrl+'/supplier/getSelectSupplier', //供应商
        method: "get",   
        header: {
          'content-type': 'application/json'
        },
        success:(res) => {
          this.setData({ checkbox1: res.data.data })
          console.log('地方官的观点',this.data.checkbox1)
        }  
      })
      wx.request({
        url:'https://weixin.kdkjyxgs.com:9292/supplier/getSelectBase', //产地
        method: "get",   
        header: {
          'content-type': 'application/json'
        },
        success:(res) => {
          this.setData({ checkbox2: res.data.data })
        }  
      })
    }
    console.log('iftrue的值',this.data.iftrue);
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
    // var areaNum = value[2]
    if (this.data.value[0] !== provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0],
        citys: this.data.address.city[id],
        // areas: this.data.address.area[this.data.address.city[id][0].id]
      })
    } else if (this.data.value[1] !== cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum],
        // areas: this.data.address.area[citys[cityNum].id]
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum]
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
      // areas: this.data.lastAreas || this.data.address.area[this.data.address.city[id][0].id],
      value: [...this.data.regionValue],
      visible: false
    })
  },
  // 提交时由序号获取省市区id
  getRegionId(type) {
    let value = this.data.regionValue
    let provinceId = this.data.address.pro[value[0]].id
    let townId = this.data.address.city[provinceId][value[1]].id
    // let areaId = ''
    // if (this.data.address.area[townId][value[2]].id) {
    //   areaId = this.data.address.area[townId][value[2]].id
    // } else {
    //   areaId = 0
    // }

    if (type === 'provinceId') {
      return provinceId
    } else if (type === 'townId') {
      return townId
    }
    //  else {
    //   return areaId
    // }
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
          // if(this.data.areas[value[2]].name){
          //   region = this.data.areas[value[2]].name 
          // }else{
          //   region = region +  ''
          // }
          // region = region + this.data.areas[value[2]].name || ''
        } else {
          this.data.value[2] = 0
        }
      } catch (error) {
        console.log('adress select something error')
      }
  
      this.setData({
        region: region,
        regionDetail:region,
        lastCitys: this.data.citys,
        // lastAreas: this.data.areas,
        regionValue: [...this.data.value],
      }, () => {
        console.log(`省份ID：${this.getRegionId('provinceId')}: 市区ID：${this.getRegionId('townId')}`)
        // this.setData({
        //   myAreaId: this.getRegionId('areas')
        // })
      })
    }
  },
})
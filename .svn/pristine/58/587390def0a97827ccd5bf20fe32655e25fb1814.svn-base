const app = getApp();
const baseUrl = app.globalData.baseUrl;
const baseCheckUnit = app.globalData.checkUnit;
const baseIndex = app.globalData.index;
const baseUnit = app.globalData.unit;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    // list: [],
    load: true,
    list:[
      {
        id: 0,
        day:'周日',
        showData:[],
        distributionTime:'',
        show:true
      },
      {
        id: 1,
        day:'周一',
        showData:[],
        distributionTime:'',
        show:false
      },
      {
        id: 2,
        day:'周二',
        showData:[],
        distributionTime:'',
        show:false
      },
      {
        id: 3,
        day:'周三',
        showData:[],
        distributionTime:'',
        show:false
      },
      {
        id: 4,
        day:'周四',
        showData:[],
        distributionTime:'',
        show:false
      },
      {
        id: 5,
        day:'周五',
        showData:[],
        distributionTime:'',
        show:false
      },
      {
        id: 6,
        day:'周六',
        showData:[],
        distributionTime:'',
        show:false
      },
  ],
    multiIndex: [0, 0, 0],
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
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    // var timestamp = Date.parse(new Date());
    // var date = new Date(timestamp);
    // //获取年份  
    // var Y =date.getFullYear();
    // //获取月份  
    // var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    // //获取当日日期 
    // var D = date.getDate()+1 < 10 ? '0' + date.getDate()+1 : date.getDate()+1; //明天
    // console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' );

    let list = this.data.list;
    for(var i=0;i<list.length+1;i++){
     var weekDayArr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]//星期映射数组
     var myDate = new Date()
     var milliseconds=myDate.getTime()+1000*60*60*24*i; //当i为0代表当前日期，为1时可以得到明天的日期，以此类推
     var newMyDate = new Date(milliseconds);
     var weekDay=newMyDate.getDay(); //获取当前星期X(0-6,0代表星期天)
     var year = newMyDate.getFullYear();//获取当前年
     var month = (newMyDate.getMonth() + 1 < 10 ? '0' + (newMyDate.getMonth() + 1) : newMyDate.getMonth() + 1);//获取当前月
     var newDay = newMyDate.getDate();//获取当前日
     console.log(year+'/'+month+'/'+newDay+weekDayArr[weekDay])
      if(i != 0){
        list[i-1].day = month+'-'+newDay;
      }
    }


    this.setData({
      checkUnit:baseCheckUnit,
      index:baseIndex,
      unit:baseUnit,
      listCur: this.data.list[0],
      list:list
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    let list = this.data.list;
    for(let i =0;i<list.length;i++){
      list[i].show = false;
      if(list[i].id === e.currentTarget.dataset.id){
        list[i].show = true;
      }
      this.setData({
        list:list
      })
    }
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = that.data.list;
    let tabHeight = 0;
    if (that.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          console.log('可好看懒得',data)
          list[i].top = tabHeight;
          // tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
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
  if(this.data.region == ''){
    wx.showToast({
      title: '请选择食材',
      icon: 'none',
    })
    return;
  }
  if(e.detail.value.breakfastWeight == '' && e.detail.value.lunchWeight =="" && e.detail.value.dinnerWeight ==""){
    wx.showToast({
      title: '选购重量不能全为空',
      icon: 'none',
    })
    return;
  }
    if(this.data.myAreaId == 0){
      var id = this.data.address.pro[this.data.regionValue[0]].id;
      dishName=this.data.address.city[id][this.data.regionValue[1]].name;
    }else{
      var id = this.data.address.pro[this.data.regionValue[0]].id;
      var idd=this.data.address.city[id][this.data.regionValue[1]].id;
      dishName=this.data.address.area[idd][this.data.regionValue[2]].name;
    }
 
    let index = this.data.addFoodIndex;
    let list = this.data.list;
    let bw='';
    (e.detail.value.breakfastWeight == '') ? bw="0" : bw=e.detail.value.breakfastWeight;
    let lw='';
    (e.detail.value.lunchWeight == '') ? lw="0" : lw=e.detail.value.lunchWeight;
    let dw='';
    (e.detail.value.dinnerWeight == '') ? dw="0" : dw=e.detail.value.dinnerWeight;
    var aa={
      show : dishName+e.detail.value.breakfastWeight+this.data.unit,
      dishName: dishName,
      breakfastWeight: bw,
      lunchWeight: lw,
      dinnerWeight: dw,
      dishType:this.data.unit,
      distributionTime:list[index].day
    }
    list[index].showData.push(aa);
    this.setData({
      list:list,
      region:'',
      breakfastWeight:'',
      lunchWeight: '',
      dinnerWeight: '',
      index:''
    })
   this.foodHideModal();
    console.log('和海陆空',this.data.list)
  },
  submit(){
    console.log('赶快个好看',this.data.list)
    var json ={
      su : this.data.list[0].showData,
      mo : this.data.list[1].showData,
      tu : this.data.list[2].showData,
      we : this.data.list[3].showData,
      th : this.data.list[4].showData,
      fr : this.data.list[5].showData,
      sa : this.data.list[6].showData
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
          title: res.data.msg,
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
  },
  addExcel(){//上传Excel
    //从本地挑选文件
    wx.chooseMessageFile({
      count:1,
      type: 'file',
      success(res) {
        var path = res.tempFiles[0].path;//文件资源地址
        wx.showModal({
          title: '提示',
          content: '确认您的选择:' + res.tempFiles[0].name,
          success(res) {
            if (res.confirm) {
            console.log('用户点击确定')
              //将文件传给开发者服务器
              wx.uploadFile({
                url: baseUrl+'order/import',//后台接口
                header: { "Content-Type": "multipart/form-data" },//类型
                filePath: path,//文件路径
                name: 'file',//文件名
                success(res) {
                  console.log('传输成功')
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                  })
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        }
      })

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
  delShowList(e){
    console.log('高合金钢',e)
    let outIndex = e.currentTarget.dataset.target.id;
    let innderIndex = e.currentTarget.dataset.index;
    let array = this.data.list;
    array[outIndex].showData.splice(innderIndex, 1);
    this.setData({
      list: array
    })
  }
})
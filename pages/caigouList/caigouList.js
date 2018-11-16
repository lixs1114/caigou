// pages/caigouList/caigouList.js
var webContext = getApp().globalData.webContext
var index =1
var proCat=''
var city=''
var verity=''
var productCat=[]
var verifyJson = [{
  "code":'',
  "name": "全部"
}, {
  "code": 1,
  "name": "手机号码已验证"
}
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifyList: verifyJson ,
    productCatList: productCat
  },
  bindPickerChange1: function (e) {
    proCat = productCat[e.detail.value].classify_id;
    this.loadData();
  },
  bindPickerChange2: function (e) {
    verity=verifyJson[e.detail.value].code;
    this.loadData();
  },
  chooseCity: function (e) {
    wx.navigateTo({
      url: '../../pages/city/city'
    })
  },
  loadData:function(){
    var _this = this
    wx.request({
      url: webContext + '/ebridge_h5/caigou/getListByPage',//json数据地址
      data: {
        index: index,
        city: city,
        verity: verity,
        proCat: proCat
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        //console.log(res.data.imgListData[0].tag)
        //将获取到的json数据，存在名字叫list_data的这个数组中
        _this.setData({
          list_data: res.data.data.purchase,
          //res代表success函数的事件对，data是固定的，imgListData是上面json数据中imgListData
        })
      }
    })
  },
  toDetails:function(e){
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '../../pages/caigouDetails/caigouDetails?id=' + id
    })
  },
  toReleaseCaigou: function (e) {
    wx.navigateTo({
      url: '../../pages/releaseCaigou/releaseCaigou'
    })
  },
  loadproCat: function () {
    var _this = this
    wx.request({
      url: webContext + '/ebridge_h5/caigou/proCategory',//json数据地址
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          productCatList: res.data.data.pro_classify
        })
        productCat = res.data.data.pro_classify
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.city) {
      city = options.city
    }
    this.loadproCat();
    this.loadData();
 
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
    index = 1;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadData();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    index++;
    this.loadData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
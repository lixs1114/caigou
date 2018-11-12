// pages/caigouList/caigouList.js
var webContext = getApp().globalData.webContext
var index =1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifyList: ['全部', '手机号码已验证'],
    productCatList: ['电脑主机','电脑配件']
  },
  changeBoxBtn: function (e) {
    var num = e.target.dataset.num;
    var states = null;
    states= num;
    this.setData({
      states: states
    })
  },

  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
     
    })

  }, 
  closeView: function (e) {
    this.setData({
      states: null
    })
  },
  chooseCity: function (e) {
    wx.navigateTo({
      url: '../../pages/city/city'
    })
  },
  loadData:function(){
    var _this = this
    wx.request({
      url: webContext + '/ebridge_h5/caigou/getListByPage?user_id=2069&index='+index,//json数据地址
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
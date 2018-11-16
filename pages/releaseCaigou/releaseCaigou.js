// pages/releaseCaigou/releaseCaigou.js
var webContext = getApp().globalData.webContext;
var phoneNo='';
var countdown = 60; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productCatList: [],
    captcha:'获取验证码',
    flag:false
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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
      }
    })
  },
  getPhoneNo:function(e){
    console.log('手机号为：', e.detail.value)
    phoneNo = e.detail.value;
  },
  getCaptcha:function(){
    var _this = this
  
    _this.settime();
  },
 
settime:function() { 
  var _this = this
 
  //发送验证码倒计时
    if (countdown == 0) { 
      _this.setData({
        captcha: '获取验证码',
        flag: false
      })
      countdown = 60; 
      return;
    } else { 
      _this.setData({
        captcha: "重新发送(" + countdown + ")",
         flag: true
      })
        countdown--; 
    } 
setTimeout(function() { 
  _this.settime();  }
    ,1000) 
},
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var _this = this
    wx.request({
      url: webContext + '/ebridge_h5/caigou/releaseCaigou',//json数据地址
      data: e.detail.value,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.data.collection=='1'){
          wx.navigateBack({
            delta: 1
          })
        }   
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadproCat();
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

  }
})
// pages/caigouDetails/caigouDetails.js
var webContext = getApp().globalData.webContext;
var phoneNo='';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  phoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: phoneNo,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var id = options.id
    wx.request({
      url: webContext + '/ebridge_h5/caigou/caigouDetails?id=' + id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        phoneNo = res.data.data.contact_phone;
        _this.setData({
          title: res.data.data.purchase_title,
          quantity: res.data.data.release_number,
          createTime: res.data.data.release_time,
          validDay: res.data.data.valid_day,
          contactMan: res.data.data.contact_man,
          mobile: res.data.data.contact_phone
        })
      }
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

  }
 
})
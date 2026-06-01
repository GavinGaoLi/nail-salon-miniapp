Page({
  enterCustomer() {
    wx.setStorageSync('userRole', 'customer')
    getApp().globalData.role = 'customer'
    wx.switchTab({ url: '/pages/c-home/c-home' })
  },
  enterAdmin() {
    wx.navigateTo({ url: '/pages/a-dashboard/a-dashboard' })
  }
})
Page({
  data: {
    shopName: 'NAIL STUDIO',
    phone: '138-0000-0000',
    businessHours: '10:00 - 20:00',
    address: 'XX市XX区XX路XX号'
  },
  changePassword() { wx.showToast({ title: '修改密码开发中', icon: 'none' }) },
  clearData() {
    wx.showModal({
      title: '确认清除', content: '清除后数据不可恢复',
      success: (res) => { if (res.confirm) wx.showToast({ title: '已清除', icon: 'success' }) }
    })
  },
  about() { wx.showToast({ title: '关于页面开发中', icon: 'none' }) },
  logout() {
    wx.showModal({
      title: '确认退出', content: '退出后需要重新输入密码',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userRole')
          wx.reLaunch({ url: '/pages/startup/startup' })
        }
      }
    })
  }
})
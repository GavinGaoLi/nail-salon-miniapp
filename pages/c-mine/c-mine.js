Page({
  data: { nickName: '', balance: 200, points: 350 },
  onShow() {
    const info = wx.getStorageSync('userInfo')
    if (info) this.setData({ nickName: info.nickName })
  },
  recharge() { wx.showToast({ title: '充值功能开发中', icon: 'none' }) },
  goOrders() { wx.showToast({ title: '预约记录开发中', icon: 'none' }) },
  goRecords() { wx.navigateTo({ url: '/pages/c-records/c-records' }) },
  goPoints() { wx.showToast({ title: '积分功能开发中', icon: 'none' }) },
  goAbout() { wx.showToast({ title: '关于我们开发中', icon: 'none' }) }
})
App({
  globalData: {
    role: '', // 'customer' or 'admin'
    userInfo: null
  },
  onLaunch() {
    // Check if role is already selected
    const role = wx.getStorageSync('userRole')
    if (role) {
      this.globalData.role = role
    }
  }
})
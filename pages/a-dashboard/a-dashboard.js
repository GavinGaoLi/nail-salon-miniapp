Page({
  data: {
    today: '', todayOrders: 5, todayIncome: 680, totalCustomers: 128, pendingOrders: 2,
    todayList: [
      { id: 1, customer: '小美', time: '10:00', service: '法式美甲', price: 98, status: 'confirmed', statusText: '已确认' },
      { id: 2, customer: '小丽', time: '14:00', service: '渐变美甲', price: 128, status: 'pending', statusText: '待确认' },
      { id: 3, customer: '小芳', time: '16:00', service: '基础美甲', price: 68, status: 'confirmed', statusText: '已确认' }
    ],
    adminMenus: [
      { name: '预约管理', icon: '📅', path: '/pages/a-booking/a-booking', bg: '#FDF5ED' },
      { name: '客户管理', icon: '👥', path: '/pages/a-customers/a-customers', bg: '#EDF5FD' },
      { name: '项目管理', icon: '💅', path: '/pages/a-projects/a-projects', bg: '#F5EDFD' },
      { name: '数据统计', icon: '📊', path: '/pages/a-stats/a-stats', bg: '#EDFDF5' },
      { name: '原材料', icon: '🧴', path: '/pages/a-inventory/a-inventory', bg: '#FDEDF5' },
      { name: '设置', icon: '⚙️', path: '/pages/a-settings/a-settings', bg: '#F5F5F5' }
    ]
  },
  onLoad() { this.setData({ today: new Date().toISOString().slice(0,10) }) },
  goPage(e) { wx.navigateTo({ url: e.currentTarget.dataset.url }) },
  goBookingDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/a-booking-detail/a-booking-detail?id=' + id })
  }
})
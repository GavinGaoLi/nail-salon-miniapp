Page({
  data: {
    activeTab: 0,
    allBookings: [
      { id: 1, customer: '小美', service: '法式美甲', date: '2026-06-01', time: '10:00', price: 98, status: 'confirmed', statusText: '已确认' },
      { id: 2, customer: '小丽', service: '渐变美甲', date: '2026-06-01', time: '14:00', price: 128, status: 'pending', statusText: '待确认' },
      { id: 3, customer: '小芳', service: '基础美甲', date: '2026-06-01', time: '16:00', price: 68, status: 'confirmed', statusText: '已确认' },
      { id: 4, customer: '小雪', service: '彩绘美甲', date: '2026-06-02', time: '11:00', price: 158, status: 'pending', statusText: '待确认' }
    ],
    bookings: []
  },
  onLoad() { this.filterBookings(0) },
  onTabChange(e) { this.filterBookings(e.detail.index) },
  filterBookings(tab) {
    const today = new Date().toISOString().slice(0,10)
    let filtered = this.data.allBookings
    if (tab === 0) filtered = filtered.filter(b => b.date === today)
    if (tab === 1) filtered = filtered.filter(b => b.status === 'pending')
    this.setData({ activeTab: tab, bookings: filtered })
  },
  confirmBooking(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '已确认', icon: 'success' })
  },
  cancelBooking(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '已取消', icon: 'none' })
  }
})
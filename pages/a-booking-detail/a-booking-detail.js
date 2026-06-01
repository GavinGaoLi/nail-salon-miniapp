Page({
  data: { booking: {} },
  onLoad(options) {
    const id = parseInt(options.id) || 1
    const bookings = {
      1: { id: 1, customer: '小美', phone: '138****1234', service: '法式美甲', date: '2026-06-01', time: '10:00', price: 98, status: 'confirmed', statusText: '已确认', note: '' },
      2: { id: 2, customer: '小丽', phone: '139****5678', service: '渐变美甲', date: '2026-06-01', time: '14:00', price: 128, status: 'pending', statusText: '待确认', note: '想要樱花粉渐变' },
      3: { id: 3, customer: '小芳', phone: '137****9012', service: '基础美甲', date: '2026-06-01', time: '16:00', price: 68, status: 'confirmed', statusText: '已确认', note: '' }
    }
    this.setData({ booking: bookings[id] || bookings[1] })
  },
  confirm() {
    wx.showModal({
      title: '确认预约', content: '确认此预约？',
      success: (res) => { if (res.confirm) { wx.showToast({ title: '已确认', icon: 'success' }) } }
    })
  },
  cancel() {
    wx.showModal({
      title: '取消预约', content: '确认取消此预约？',
      success: (res) => { if (res.confirm) { wx.showToast({ title: '已取消', icon: 'none' }) } }
    })
  }
})
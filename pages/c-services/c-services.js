Page({
  data: {
    services: [
      { id: 1, name: '基础美甲', desc: '纯色/跳色/猫眼', price: 68, duration: 60, icon: '💅', bg: '#FDF5ED' },
      { id: 2, name: '法式美甲', desc: '经典法式/微笑线', price: 98, duration: 90, icon: '✨', bg: '#F5EDFD' },
      { id: 3, name: '渐变美甲', desc: '双色渐变/多色渐变', price: 128, duration: 90, icon: '🎨', bg: '#EDF5FD' },
      { id: 4, name: '彩绘美甲', desc: '手绘图案/3D立体', price: 158, duration: 120, icon: '🌸', bg: '#FDEDF5' },
      { id: 5, name: '卸甲', desc: '安全卸甲/甲面修复', price: 30, duration: 30, icon: '🧴', bg: '#EDFDF5' },
      { id: 6, name: '手部护理', desc: '保湿/美白/去角质', price: 58, duration: 45, icon: '🤲', bg: '#FDF5ED' }
    ]
  },
  goCase(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/c-case/c-case?id=' + id })
  },
  goBook() { wx.switchTab({ url: '/pages/c-book/c-book' }) }
})
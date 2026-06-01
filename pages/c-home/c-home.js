Page({
  data: {
    hotServices: [
      { id: 1, name: '基础美甲', price: 68, icon: '💅' },
      { id: 2, name: '法式美甲', price: 98, icon: '✨' },
      { id: 3, name: '渐变美甲', price: 128, icon: '🎨' },
      { id: 4, name: '彩绘美甲', price: 158, icon: '🌸' }
    ],
    works: [
      { id: 1, name: '法式简约白', bg: '#F5E6D3' },
      { id: 2, name: '樱花渐变粉', bg: '#F5D3E6' },
      { id: 3, name: '星空猫眼', bg: '#D3E6F5' },
      { id: 4, name: '复古格纹', bg: '#E6D3F5' }
    ]
  },
  goBook() { wx.switchTab({ url: '/pages/c-book/c-book' }) },
  goService() { wx.switchTab({ url: '/pages/c-service/c-service' }) }
})
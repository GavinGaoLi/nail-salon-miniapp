Page({
  data: {
    activeTag: 'all',
    tags: [
      { id: 'all', name: '全部' },
      { id: 'french', name: '法式' },
      { id: 'gradient', name: '渐变' },
      { id: 'art', name: '彩绘' },
      { id: 'simple', name: '简约' },
      { id: 'wedding', name: '新娘' },
      { id: 'cute', name: '可爱' },
      { id: 'cool', name: '酷飒' }
    ],
    allImages: [
      { id: 1, title: '法式简约白边', likes: 2341, source: '小红书', tag: 'french', bg: '#F5F0EB', emoji: '⚪', height: 280 },
      { id: 2, title: '樱花粉渐变', likes: 1856, source: '小红书', tag: 'gradient', bg: '#F5D3E6', emoji: '🌸', height: 320 },
      { id: 3, title: '星空猫眼蓝', likes: 1523, source: '小红书', tag: 'gradient', bg: '#D3E6F5', emoji: '🌙', height: 260 },
      { id: 4, title: '手绘小雏菊', likes: 3210, source: '小红书', tag: 'art', bg: '#F5E6D3', emoji: '🌼', height: 300 },
      { id: 5, title: '裸色系简约', likes: 987, source: '小红书', tag: 'simple', bg: '#F0EBE0', emoji: '🤎', height: 240 },
      { id: 6, title: '新娘白纱甲', likes: 2890, source: '小红书', tag: 'wedding', bg: '#F5F0F5', emoji: '💍', height: 340 },
      { id: 7, title: '卡通兔子甲', likes: 1654, source: '小红书', tag: 'cute', bg: '#F5E0E6', emoji: '🐰', height: 270 },
      { id: 8, title: '黑色酷飒风', likes: 1120, source: '小红书', tag: 'cool', bg: '#E0E0E0', emoji: '🖤', height: 290 },
      { id: 9, title: '彩色法式拼接', likes: 2015, source: '小红书', tag: 'french', bg: '#E6F5D3', emoji: '🌈', height: 310 },
      { id: 10, title: '紫色渐变星河', likes: 1780, source: '小红书', tag: 'gradient', bg: '#E0D3F5', emoji: '✨', height: 280 },
      { id: 11, title: '小清新叶子', likes: 1432, source: '小红书', tag: 'art', bg: '#D3F5E6', emoji: '🍃', height: 260 },
      { id: 12, title: '极简线条', likes: 890, source: '小红书', tag: 'simple', bg: '#F5F0EB', emoji: '〰️', height: 250 }
    ],
    leftList: [],
    rightList: []
  },
  onLoad() { this.filterImages('all') },
  switchTag(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ activeTag: id })
    this.filterImages(id)
  },
  filterImages(tag) {
    const images = tag === 'all' ? this.data.allImages : this.data.allImages.filter(img => img.tag === tag)
    const left = [], right = []
    images.forEach((img, i) => { i % 2 === 0 ? left.push(img) : right.push(img) })
    this.setData({ leftList: left, rightList: right })
  },
  previewImage(e) {
    wx.showToast({ title: '图片预览开发中', icon: 'none' })
  }
})
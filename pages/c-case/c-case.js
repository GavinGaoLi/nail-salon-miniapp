Page({
  data: {
    service: {},
    cases: []
  },
  onLoad(options) {
    const id = parseInt(options.id) || 1
    const services = {
      1: {
        name: '基础美甲', desc: '纯色/跳色/猫眼', price: 68,
        intro: '基础美甲是最经典的服务，包含甲型修整、死皮处理、底胶+色胶+封层全套流程。采用进口甲油胶，持久不脱落，色泽饱满。可选纯色、跳色或猫眼效果。',
        cases: [
          { id: 1, name: '经典纯色', bg: '#F5E6D3', label: '💅' },
          { id: 2, name: '跳色搭配', bg: '#E6F5D3', label: '🎨' },
          { id: 3, name: '猫眼效果', bg: '#D3E6F5', label: '✨' },
          { id: 4, name: '磨砂质感', bg: '#F5D3E6', label: '🌸' }
        ]
      },
      2: {
        name: '法式美甲', desc: '经典法式/微笑线', price: 98,
        intro: '法式美甲以优雅著称，标志性的白色微笑线搭配透明或裸粉色底，展现极致简约之美。适合职场、婚礼等正式场合。',
        cases: [
          { id: 1, name: '经典法式', bg: '#F5F0EB', label: '⚪' },
          { id: 2, name: '彩色法式', bg: '#EBF0F5', label: '🌈' },
          { id: 3, name: 'V型法式', bg: '#F0EBF5', label: '💎' },
          { id: 4, name: '渐变法式', bg: '#F5EBF0', label: '✨' }
        ]
      },
      3: {
        name: '渐变美甲', desc: '双色渐变/多色渐变', price: 128,
        intro: '渐变美甲通过色彩的自然过渡打造梦幻效果。从指尖到甲根的颜色渐变，可选双色、多色或闪粉渐变，展现独特个性。',
        cases: [
          { id: 1, name: '樱花渐变', bg: '#F5D3E6', label: '🌸' },
          { id: 2, name: '星空渐变', bg: '#D3D3F5', label: '🌙' },
          { id: 3, name: '日落渐变', bg: '#F5E0D3', label: '🌅' },
          { id: 4, name: '海洋渐变', bg: '#D3E8F5', label: '🌊' }
        ]
      },
      4: {
        name: '彩绘美甲', desc: '手绘图案/3D立体', price: 158,
        intro: '彩绘美甲是最高级的美甲艺术，由资深美甲师手工绘制精美图案。支持定制设计，可选花卉、卡通、几何等风格，也可做3D立体装饰。',
        cases: [
          { id: 1, name: '花卉手绘', bg: '#F5E6D3', label: '🌺' },
          { id: 2, name: '卡通图案', bg: '#E6F5D3', label: '🐰' },
          { id: 3, name: '3D立体', bg: '#D3E6F5', label: '💎' },
          { id: 4, name: '几何艺术', bg: '#F5D3E6', label: '🔷' }
        ]
      }
    }
    const s = services[id] || services[1]
    this.setData({ service: s, cases: s.cases })
  },
  goBook() { wx.switchTab({ url: '/pages/c-book/c-book' }) }
})
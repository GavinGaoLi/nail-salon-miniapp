Page({
  data: {
    period: 'week',
    summary: { income: 3680, orders: 28, customers: 18, avgPrice: 131 },
    topServices: [
      { name: '法式美甲', count: 12, revenue: 1176, percent: 100 },
      { name: '渐变美甲', count: 8, revenue: 1024, percent: 67 },
      { name: '基础美甲', count: 5, revenue: 340, percent: 42 },
      { name: '彩绘美甲', count: 3, revenue: 474, percent: 25 }
    ]
  },
  setPeriod(e) { this.setData({ period: e.currentTarget.dataset.p }) }
})
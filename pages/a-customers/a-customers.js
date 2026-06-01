Page({
  data: {
    keyword: '',
    customers: [
      { id: 1, name: '小美', phone: '138****1234', visitCount: 12, totalSpent: 1580 },
      { id: 2, name: '小丽', phone: '139****5678', visitCount: 8, totalSpent: 960 },
      { id: 3, name: '小芳', phone: '137****9012', visitCount: 5, totalSpent: 580 },
      { id: 4, name: '小雪', phone: '136****3456', visitCount: 3, totalSpent: 320 }
    ]
  },
  onSearch(e) { this.setData({ keyword: e.detail.value }) }
})
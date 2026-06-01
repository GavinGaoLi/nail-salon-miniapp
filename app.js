/**
 * 美甲店小程序 - 全局配置
 * 粉色玫瑰金主题
 */
App({
  onLaunch() {
    // 初始化本地存储数据
    this.initStorage();
  },

  globalData: {
    // 主题色
    primaryColor: '#E8879B',
    primaryLight: '#F5C6D0',
    primaryDark: '#C96B7F',
    goldColor: '#D4A574',
    // 美甲师列表
    nailArtists: [
      { id: 1, name: '小美', avatar: '/images/avatar1.png', specialty: '日式美甲' },
      { id: 2, name: '小丽', avatar: '/images/avatar2.png', specialty: '法式美甲' },
      { id: 3, name: '小雅', avatar: '/images/avatar3.png', specialty: '3D立体美甲' },
    ],
    // 服务项目
    services: [
      { id: 1, name: '基础美甲', price: 98, duration: 60, category: '基础' },
      { id: 2, name: '法式美甲', price: 168, duration: 90, category: '经典' },
      { id: 3, name: '日式美甲', price: 198, duration: 120, category: '经典' },
      { id: 4, name: '3D立体美甲', price: 298, duration: 150, category: '高端' },
      { id: 5, name: '光疗美甲', price: 188, duration: 100, category: '经典' },
      { id: 6, name: '渐变美甲', price: 228, duration: 120, category: '经典' },
      { id: 7, name: '手部护理', price: 128, duration: 60, category: '护理' },
      { id: 8, name: '卸甲服务', price: 38, duration: 30, category: '基础' },
    ]
  },

  /**
   * 初始化本地存储
   */
  initStorage() {
    const keys = ['customers', 'bookings', 'inventory', 'transactions'];
    keys.forEach(key => {
      if (!wx.getStorageSync(key)) {
        wx.setStorageSync(key, []);
      }
    });
    // 初始化库存数据（如果是空的）
    const inventory = wx.getStorageSync('inventory');
    if (inventory.length === 0) {
      const defaultInventory = [
        { id: 1, name: 'OPI指甲油 - 经典红', category: '指甲油', quantity: 25, unit: '瓶', costPrice: 35, sellPrice: 68, minStock: 5 },
        { id: 2, name: 'OPI指甲油 - 裸粉色', category: '指甲油', quantity: 30, unit: '瓶', costPrice: 35, sellPrice: 68, minStock: 5 },
        { id: 3, name: '光疗胶 - 透明', category: '光疗产品', quantity: 20, unit: '瓶', costPrice: 45, sellPrice: 88, minStock: 5 },
        { id: 4, name: '光疗胶 - 粉色系', category: '光疗产品', quantity: 15, unit: '瓶', costPrice: 45, sellPrice: 88, minStock: 5 },
        { id: 5, name: '美甲贴纸 - 花朵系列', category: '装饰材料', quantity: 50, unit: '张', costPrice: 5, sellPrice: 15, minStock: 10 },
        { id: 6, name: '美甲贴纸 - 星空系列', category: '装饰材料', quantity: 40, unit: '张', costPrice: 5, sellPrice: 15, minStock: 10 },
        { id: 7, name: '美甲钻饰 - 水钻套装', category: '装饰材料', quantity: 35, unit: '套', costPrice: 12, sellPrice: 28, minStock: 8 },
        { id: 8, name: '底胶', category: '基础产品', quantity: 18, unit: '瓶', costPrice: 28, sellPrice: 58, minStock: 5 },
        { id: 9, name: '封层胶', category: '基础产品', quantity: 18, unit: '瓶', costPrice: 30, sellPrice: 58, minStock: 5 },
        { id: 10, name: '卸甲水', category: '基础产品', quantity: 12, unit: '瓶', costPrice: 15, sellPrice: 38, minStock: 3 },
        { id: 11, name: '手部磨砂膏', category: '护理产品', quantity: 22, unit: '支', costPrice: 20, sellPrice: 48, minStock: 5 },
        { id: 12, name: '护手霜', category: '护理产品', quantity: 25, unit: '支', costPrice: 18, sellPrice: 45, minStock: 5 },
      ];
      wx.setStorageSync('inventory', defaultInventory);
    }
    // 初始化示例客户
    const customers = wx.getStorageSync('customers');
    if (customers.length === 0) {
      const defaultCustomers = [
        { id: 1, name: '张小花', phone: '13800138001', preferences: { colors: ['粉色', '红色'], styles: ['法式', '日式'], nailShape: '椭圆形' }, visits: 8, totalSpent: 1584, lastVisit: '2026-05-25', notes: '喜欢简约风格' },
        { id: 2, name: '李美丽', phone: '13900139002', preferences: { colors: ['紫色', '蓝色'], styles: ['3D立体', '渐变'], nailShape: '方形' }, visits: 5, totalSpent: 1190, lastVisit: '2026-05-28', notes: '过敏体质，需注意产品成分' },
        { id: 3, name: '王甜甜', phone: '15000150003', preferences: { colors: ['裸色', '白色'], styles: ['光疗', '法式'], nailShape: '圆形' }, visits: 12, totalSpent: 2376, lastVisit: '2026-05-29', notes: 'VIP客户，喜欢预约小美' },
      ];
      wx.setStorageSync('customers', defaultCustomers);
    }
    // 初始化示例交易记录
    const transactions = wx.getStorageSync('transactions');
    if (transactions.length === 0) {
      const today = '2026-05-30';
      const defaultTransactions = [
        { id: 1, date: '2026-05-28', customerId: 1, customerName: '张小花', serviceId: 3, serviceName: '日式美甲', amount: 198, cost: 65, artistId: 1, artistName: '小美' },
        { id: 2, date: '2026-05-28', customerId: 2, customerName: '李美丽', serviceId: 6, serviceName: '渐变美甲', amount: 228, cost: 72, artistId: 2, artistName: '小丽' },
        { id: 3, date: '2026-05-29', customerId: 3, customerName: '王甜甜', serviceId: 5, serviceName: '光疗美甲', amount: 188, cost: 58, artistId: 1, artistName: '小美' },
        { id: 4, date: '2026-05-29', customerId: 1, customerName: '张小花', serviceId: 7, serviceName: '手部护理', amount: 128, cost: 38, artistId: 3, artistName: '小雅' },
        { id: 5, date: today, customerId: 2, customerName: '李美丽', serviceId: 4, serviceName: '3D立体美甲', amount: 298, cost: 95, artistId: 3, artistName: '小雅' },
      ];
      wx.setStorageSync('transactions', defaultTransactions);
    }
    // 初始化示例预约
    const bookings = wx.getStorageSync('bookings');
    if (bookings.length === 0) {
      const defaultBookings = [
        { id: 1, customerId: 3, customerName: '王甜甜', customerPhone: '15000150003', serviceId: 3, serviceName: '日式美甲', date: '2026-05-31', time: '10:00', artistId: 1, artistName: '小美', status: 'confirmed', createdAt: '2026-05-29 15:30' },
        { id: 2, customerId: 1, customerName: '张小花', customerPhone: '13800138001', serviceId: 2, serviceName: '法式美甲', date: '2026-05-31', time: '14:00', artistId: 2, artistName: '小丽', status: 'pending', createdAt: '2026-05-30 10:00' },
        { id: 3, customerId: 2, customerName: '李美丽', customerPhone: '13900139002', serviceId: 5, serviceName: '光疗美甲', date: '2026-06-01', time: '11:00', artistId: 1, artistName: '小美', status: 'confirmed', createdAt: '2026-05-30 12:00' },
      ];
      wx.setStorageSync('bookings', defaultBookings);
    }
  }
});

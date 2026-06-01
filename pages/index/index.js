/**
 * 首页逻辑
 */
const util = require('../../utils/util');

Page({
  data: {
    todayStats: {
      income: '¥0',
      orders: 0,
      bookings: 0,
      customers: 0
    },
    todayBookings: [],
    recentCustomers: [],
    lowStockItems: []
  },

  onShow() {
    this.loadData();
  },

  /**
   * 加载页面数据
   */
  loadData() {
    const today = util.getToday();
    const transactions = util.getStorage('transactions');
    const bookings = util.getStorage('bookings');
    const customers = util.getStorage('customers');
    const inventory = util.getStorage('inventory');

    // 今日统计
    const todayTransactions = transactions.filter(t => t.date === today);
    const todayIncome = todayTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    const pendingBookings = bookings.filter(b => b.status === 'pending');

    this.setData({
      todayStats: {
        income: '¥' + todayIncome.toFixed(0),
        orders: todayTransactions.length,
        bookings: pendingBookings.length,
        customers: customers.length
      }
    });

    // 今日预约
    const todayBookings = bookings
      .filter(b => b.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
    this.setData({ todayBookings });

    // 最近客户（按最后到店时间排序）
    const recentCustomers = [...customers]
      .sort((a, b) => (b.lastVisit || '').localeCompare(a.lastVisit || ''))
      .slice(0, 5);
    this.setData({ recentCustomers });

    // 库存预警
    const lowStockItems = inventory.filter(item => item.quantity <= item.minStock);
    this.setData({ lowStockItems });
  },

  /**
   * 跳转到预约页
   */
  goToBooking() {
    wx.switchTab({ url: '/pages/booking/booking' });
  },

  /**
   * 跳转到客户页
   */
  goToCustomers() {
    wx.switchTab({ url: '/pages/customers/customers' });
  },

  /**
   * 跳转到库存页
   */
  goToInventory() {
    wx.switchTab({ url: '/pages/inventory/inventory' });
  },

  /**
   * 跳转到统计页
   */
  goToStatistics() {
    wx.switchTab({ url: '/pages/statistics/statistics' });
  }
});

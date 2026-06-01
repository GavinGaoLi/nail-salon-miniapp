/**
 * 财务统计逻辑
 */
const util = require('../../utils/util');

Page({
  data: {
    dateRange: 'today',
    startDate: '',
    endDate: '',
    dateRangeText: '',
    stats: {
      totalIncome: 0,
      totalCost: 0,
      totalProfit: 0,
      totalOrders: 0,
      profitRate: 0
    },
    dailyStats: [],
    topServices: [],
    artistStats: []
  },

  onLoad() {
    const today = util.getToday();
    this.setData({
      startDate: today,
      endDate: today
    });
  },

  onShow() {
    this.loadStats();
  },

  /**
   * 设置日期范围
   */
  setDateRange(e) {
    const range = e.currentTarget.dataset.range;
    const today = new Date();
    let startDate, endDate;

    switch (range) {
      case 'today':
        startDate = util.formatDate(today);
        endDate = startDate;
        break;
      case 'week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay() + 1);
        startDate = util.formatDate(weekStart);
        endDate = util.formatDate(today);
        break;
      case 'month':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        startDate = util.formatDate(monthStart);
        endDate = util.formatDate(today);
        break;
      case 'custom':
        startDate = this.data.startDate;
        endDate = this.data.endDate;
        break;
    }

    this.setData({ dateRange: range, startDate, endDate });
    this.loadStats();
  },

  /**
   * 自定义开始日期
   */
  onStartDate(e) {
    this.setData({ startDate: e.detail.value });
    this.loadStats();
  },

  /**
   * 自定义结束日期
   */
  onEndDate(e) {
    this.setData({ endDate: e.detail.value });
    this.loadStats();
  },

  /**
   * 加载统计数据
   */
  loadStats() {
    const { startDate, endDate, dateRange } = this.data;
    const transactions = util.getStorage('transactions');

    // 筛选日期范围内的交易
    const filtered = transactions.filter(t => {
      return t.date >= startDate && t.date <= endDate;
    });

    // 计算总览
    const totalIncome = filtered.reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalCost = filtered.reduce((sum, t) => sum + (t.cost || 0), 0);
    const totalProfit = totalIncome - totalCost;
    const profitRate = totalIncome > 0 ? Math.round((totalProfit / totalIncome) * 100) : 0;

    // 日期范围文本
    let dateRangeText = '';
    switch (dateRange) {
      case 'today': dateRangeText = '今日'; break;
      case 'week': dateRangeText = '本周'; break;
      case 'month': dateRangeText = '本月'; break;
      case 'custom': dateRangeText = startDate + ' 至 ' + endDate; break;
    }

    this.setData({
      stats: {
        totalIncome: totalIncome.toFixed(0),
        totalCost: totalCost.toFixed(0),
        totalProfit: totalProfit.toFixed(0),
        totalOrders: filtered.length,
        profitRate
      },
      dateRangeText
    });

    // 每日明细
    const dailyStats = util.groupByDate(filtered);
    this.setData({ dailyStats });

    // 热门服务统计
    const serviceMap = {};
    filtered.forEach(t => {
      const name = t.serviceName || '未知服务';
      if (!serviceMap[name]) {
        serviceMap[name] = { name, count: 0, amount: 0 };
      }
      serviceMap[name].count++;
      serviceMap[name].amount += t.amount || 0;
    });
    const topServices = Object.values(serviceMap).sort((a, b) => b.count - a.count);
    this.setData({ topServices });

    // 美甲师业绩统计
    const artistMap = {};
    filtered.forEach(t => {
      const name = t.artistName || '未知';
      if (!artistMap[name]) {
        artistMap[name] = { name, count: 0, amount: 0 };
      }
      artistMap[name].count++;
      artistMap[name].amount += t.amount || 0;
    });
    const artistStats = Object.values(artistMap).sort((a, b) => b.amount - a.amount);
    this.setData({ artistStats });
  }
});

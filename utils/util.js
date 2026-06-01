/**
 * 工具函数库
 */

/**
 * 生成唯一ID
 */
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

/**
 * 格式化日期
 * @param {Date|string} date
 * @param {string} format - 格式字符串，如 'YYYY-MM-DD'
 */
function formatDate(date, format = 'YYYY-MM-DD') {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
}

/**
 * 获取今天日期字符串
 */
function getToday() {
  return formatDate(new Date());
}

/**
 * 格式化金额
 * @param {number} amount
 */
function formatMoney(amount) {
  return '¥' + Number(amount).toFixed(2);
}

/**
 * 显示提示
 */
function showToast(title, icon = 'none') {
  wx.showToast({ title, icon, duration: 2000 });
}

/**
 * 显示加载
 */
function showLoading(title = '加载中...') {
  wx.showLoading({ title, mask: true });
}

/**
 * 隐藏加载
 */
function hideLoading() {
  wx.hideLoading();
}

/**
 * 确认对话框
 */
function confirm(title, content) {
  return new Promise((resolve) => {
    wx.showModal({
      title,
      content,
      confirmColor: '#E8879B',
      success: (res) => resolve(res.confirm)
    });
  });
}

/**
 * 获取存储数据
 */
function getStorage(key) {
  return wx.getStorageSync(key) || [];
}

/**
 * 保存存储数据
 */
function setStorage(key, data) {
  wx.setStorageSync(key, data);
}

/**
 * 添加记录
 */
function addRecord(key, record) {
  const list = getStorage(key);
  record.id = generateId();
  record.createdAt = formatDate(new Date(), 'YYYY-MM-DD HH:mm');
  list.unshift(record);
  setStorage(key, list);
  return record;
}

/**
 * 更新记录
 */
function updateRecord(key, id, updates) {
  const list = getStorage(key);
  const index = list.findIndex(item => item.id === id);
  if (index !== -1) {
    list[index] = { ...list[index], ...updates };
    setStorage(key, list);
    return list[index];
  }
  return null;
}

/**
 * 删除记录
 */
function deleteRecord(key, id) {
  let list = getStorage(key);
  list = list.filter(item => item.id !== id);
  setStorage(key, list);
}

/**
 * 查找记录
 */
function findRecord(key, id) {
  const list = getStorage(key);
  return list.find(item => item.id === id);
}

/**
 * 计算统计
 */
function calculateStats(transactions) {
  const totalIncome = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalCost = transactions.reduce((sum, t) => sum + (t.cost || 0), 0);
  const totalProfit = totalIncome - totalCost;
  return { totalIncome, totalCost, totalProfit };
}

/**
 * 按日期分组统计
 */
function groupByDate(transactions) {
  const groups = {};
  transactions.forEach(t => {
    const date = t.date;
    if (!groups[date]) {
      groups[date] = { date, income: 0, cost: 0, profit: 0, count: 0 };
    }
    groups[date].income += t.amount || 0;
    groups[date].cost += t.cost || 0;
    groups[date].profit += (t.amount || 0) - (t.cost || 0);
    groups[date].count++;
  });
  return Object.values(groups).sort((a, b) => b.date.localeCompare(a.date));
}

module.exports = {
  generateId,
  formatDate,
  getToday,
  formatMoney,
  showToast,
  showLoading,
  hideLoading,
  confirm,
  getStorage,
  setStorage,
  addRecord,
  updateRecord,
  deleteRecord,
  findRecord,
  calculateStats,
  groupByDate
};

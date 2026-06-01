/**
 * 个人中心逻辑
 */
const util = require('../../utils/util');
const app = getApp();

Page({
  data: {
    artists: []
  },

  onLoad() {
    this.setData({
      artists: app.globalData.nailArtists
    });
  },

  /**
   * 导出数据
   */
  exportData() {
    const data = {
      customers: util.getStorage('customers'),
      bookings: util.getStorage('bookings'),
      inventory: util.getStorage('inventory'),
      transactions: util.getStorage('transactions'),
      exportTime: util.formatDate(new Date(), 'YYYY-MM-DD HH:mm')
    };
    
    // 在小程序中，这里可以使用 wx.setClipboardData 复制到剪贴板
    wx.setClipboardData({
      data: JSON.stringify(data, null, 2),
      success: () => {
        util.showToast('数据已复制到剪贴板');
      }
    });
  },

  /**
   * 导入数据
   */
  importData() {
    wx.showModal({
      title: '导入数据',
      content: '请将导出的 JSON 数据粘贴到剪贴板，然后点击确认导入',
      confirmColor: '#E8879B',
      success: (res) => {
        if (res.confirm) {
          wx.getClipboardData({
            success: (clipRes) => {
              try {
                const data = JSON.parse(clipRes.data);
                if (data.customers) wx.setStorageSync('customers', data.customers);
                if (data.bookings) wx.setStorageSync('bookings', data.bookings);
                if (data.inventory) wx.setStorageSync('inventory', data.inventory);
                if (data.transactions) wx.setStorageSync('transactions', data.transactions);
                util.showToast('数据导入成功');
              } catch (e) {
                util.showToast('数据格式错误');
              }
            }
          });
        }
      }
    });
  },

  /**
   * 清除数据
   */
  async clearData() {
    const confirmed = await util.confirm('清除数据', '确定要清除所有数据吗？此操作不可恢复！');
    if (confirmed) {
      wx.setStorageSync('customers', []);
      wx.setStorageSync('bookings', []);
      wx.setStorageSync('inventory', []);
      wx.setStorageSync('transactions', []);
      util.showToast('数据已清除');
    }
  },

  /**
   * 关于系统
   */
  showAbout() {
    wx.showModal({
      title: '关于系统',
      content: '美甲时光 v1.0.0\n\n专为美甲店打造的管理系统，集客户管理、预约管理、库存管理和财务统计于一体。',
      showCancel: false,
      confirmColor: '#E8879B'
    });
  },

  /**
   * 使用帮助
   */
  showHelp() {
    wx.showModal({
      title: '使用帮助',
      content: '1. 首页：查看今日概览和快捷操作\n2. 预约：管理客户预约\n3. 客户：管理客户信息\n4. 库存：管理产品库存\n5. 统计：查看财务报表',
      showCancel: false,
      confirmColor: '#E8879B'
    });
  },

  /**
   * 意见反馈
   */
  showFeedback() {
    wx.showModal({
      title: '意见反馈',
      content: '如有任何问题或建议，请联系我们：\n\n电话：400-888-8888\n邮箱：feedback@nailsalon.com',
      showCancel: false,
      confirmColor: '#E8879B'
    });
  }
});

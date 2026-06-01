/**
 * 预约管理逻辑
 */
const util = require('../../utils/util');
const app = getApp();

Page({
  data: {
    currentTab: 'list',
    filterDate: '',
    filteredBookings: [],
    // 新建预约相关
    customerNames: [],
    selectedCustomerIndex: -1,
    selectedCustomerName: '',
    newCustomerName: '',
    newCustomerPhone: '',
    serviceNames: [],
    selectedServiceIndex: -1,
    selectedServiceName: '',
    selectedService: null,
    artistNames: [],
    selectedArtistIndex: -1,
    selectedArtistName: '',
    bookingDate: '',
    bookingTime: '',
    today: '',
    timeSlots: [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
    ],
    selectedTimeIndex: -1,
    bookingNotes: ''
  },

  onLoad() {
    this.setData({ today: util.getToday() });
    this.initFormData();
  },

  onShow() {
    this.loadBookings();
  },

  /**
   * 初始化表单数据
   */
  initFormData() {
    const customers = util.getStorage('customers');
    const services = app.globalData.services;
    const artists = app.globalData.nailArtists;

    this.setData({
      customerNames: customers.map(c => c.name + ' (' + c.phone + ')'),
      serviceNames: services.map(s => s.name + ' - ¥' + s.price),
      artistNames: artists.map(a => a.name + ' - ' + a.specialty)
    });
  },

  /**
   * 加载预约列表
   */
  loadBookings() {
    const bookings = util.getStorage('bookings');
    const filterDate = this.data.filterDate;
    let filtered = bookings;
    if (filterDate) {
      filtered = bookings.filter(b => b.date === filterDate);
    }
    filtered.sort((a, b) => {
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return a.time.localeCompare(b.time);
    });
    this.setData({ filteredBookings: filtered });
  },

  /**
   * 切换标签
   */
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
    if (tab === 'list') {
      this.loadBookings();
    } else {
      this.resetForm();
    }
  },

  /**
   * 日期筛选
   */
  onDateChange(e) {
    this.setData({ filterDate: e.detail.value });
    this.loadBookings();
  },

  /**
   * 清除筛选
   */
  clearFilter() {
    this.setData({ filterDate: '' });
    this.loadBookings();
  },

  /**
   * 选择客户
   */
  onCustomerSelect(e) {
    const index = parseInt(e.detail.value);
    const customers = util.getStorage('customers');
    if (index < customers.length) {
      const customer = customers[index];
      this.setData({
        selectedCustomerIndex: index,
        selectedCustomerName: customer.name
      });
    }
  },

  /**
   * 选择服务
   */
  onServiceSelect(e) {
    const index = parseInt(e.detail.value);
    const services = app.globalData.services;
    if (index < services.length) {
      const service = services[index];
      this.setData({
        selectedServiceIndex: index,
        selectedServiceName: service.name,
        selectedService: service
      });
    }
  },

  /**
   * 选择美甲师
   */
  onArtistSelect(e) {
    const index = parseInt(e.detail.value);
    const artists = app.globalData.nailArtists;
    if (index < artists.length) {
      const artist = artists[index];
      this.setData({
        selectedArtistIndex: index,
        selectedArtistName: artist.name
      });
    }
  },

  /**
   * 日期选择
   */
  onDateInput(e) {
    this.setData({ bookingDate: e.detail.value });
  },

  /**
   * 时间选择
   */
  onTimeSelect(e) {
    const index = parseInt(e.detail.value);
    this.setData({
      selectedTimeIndex: index,
      bookingTime: this.data.timeSlots[index]
    });
  },

  /**
   * 输入处理
   */
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: e.detail.value });
  },

  /**
   * 提交预约
   */
  submitBooking() {
    const { selectedCustomerIndex, selectedCustomerName, newCustomerName, newCustomerPhone,
            selectedService, selectedServiceName, selectedArtistIndex, selectedArtistName,
            bookingDate, bookingTime, bookingNotes } = this.data;

    // 验证
    if (selectedCustomerIndex === -1 && !newCustomerName) {
      util.showToast('请选择或输入客户信息');
      return;
    }
    if (!selectedService) {
      util.showToast('请选择服务项目');
      return;
    }
    if (!bookingDate) {
      util.showToast('请选择预约日期');
      return;
    }
    if (!bookingTime) {
      util.showToast('请选择预约时间');
      return;
    }

    const customers = util.getStorage('customers');
    let customerName = selectedCustomerName;
    let customerId = -1;
    let customerPhone = '';

    if (selectedCustomerIndex >= 0 && selectedCustomerIndex < customers.length) {
      customerId = customers[selectedCustomerIndex].id;
      customerName = customers[selectedCustomerIndex].name;
      customerPhone = customers[selectedCustomerIndex].phone;
    } else {
      // 新客户
      if (!newCustomerPhone) {
        util.showToast('请输入客户手机号');
        return;
      }
      const newCustomer = util.addRecord('customers', {
        name: newCustomerName,
        phone: newCustomerPhone,
        preferences: { colors: [], styles: [], nailShape: '' },
        visits: 0,
        totalSpent: 0,
        lastVisit: '',
        notes: ''
      });
      customerId = newCustomer.id;
      customerName = newCustomerName;
      customerPhone = newCustomerPhone;
    }

    const artists = app.globalData.nailArtists;
    const artist = artists[selectedArtistIndex];

    // 创建预约
    util.addRecord('bookings', {
      customerId,
      customerName,
      customerPhone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: bookingDate,
      time: bookingTime,
      artistId: artist.id,
      artistName: artist.name,
      status: 'pending',
      notes: bookingNotes
    });

    util.showToast('预约创建成功');
    this.resetForm();
    this.setData({ currentTab: 'list' });
    this.loadBookings();
  },

  /**
   * 确认预约
   */
  confirmBooking(e) {
    const id = e.currentTarget.dataset.id;
    util.updateRecord('bookings', id, { status: 'confirmed' });
    util.showToast('已确认');
    this.loadBookings();
  },

  /**
   * 完成预约
   */
  completeBooking(e) {
    const id = e.currentTarget.dataset.id;
    const bookings = util.getStorage('bookings');
    const booking = bookings.find(b => b.id === id);
    
    if (booking) {
      // 更新预约状态
      util.updateRecord('bookings', id, { status: 'completed' });
      
      // 创建交易记录
      const services = app.globalData.services;
      const service = services.find(s => s.id === booking.serviceId);
      const costPrice = service ? Math.round(service.price * 0.35) : 0; // 假设成本为售价的35%

      util.addRecord('transactions', {
        date: util.getToday(),
        customerId: booking.customerId,
        customerName: booking.customerName,
        serviceId: booking.serviceId,
        serviceName: booking.serviceName,
        amount: service ? service.price : 0,
        cost: costPrice,
        artistId: booking.artistId,
        artistName: booking.artistName
      });

      // 更新客户统计
      if (booking.customerId > 0) {
        const customers = util.getStorage('customers');
        const customer = customers.find(c => c.id === booking.customerId);
        if (customer) {
          util.updateRecord('customers', booking.customerId, {
            visits: (customer.visits || 0) + 1,
            totalSpent: (customer.totalSpent || 0) + (service ? service.price : 0),
            lastVisit: util.getToday()
          });
        }
      }

      util.showToast('已完成');
      this.loadBookings();
    }
  },

  /**
   * 取消预约
   */
  async cancelBooking(e) {
    const confirmed = await util.confirm('确认取消', '确定要取消这个预约吗？');
    if (confirmed) {
      const id = e.currentTarget.dataset.id;
      util.deleteRecord('bookings', id);
      util.showToast('已取消');
      this.loadBookings();
    }
  },

  /**
   * 重置表单
   */
  resetForm() {
    this.setData({
      selectedCustomerIndex: -1,
      selectedCustomerName: '',
      newCustomerName: '',
      newCustomerPhone: '',
      selectedServiceIndex: -1,
      selectedServiceName: '',
      selectedService: null,
      selectedArtistIndex: -1,
      selectedArtistName: '',
      bookingDate: '',
      bookingTime: '',
      selectedTimeIndex: -1,
      bookingNotes: ''
    });
  }
});

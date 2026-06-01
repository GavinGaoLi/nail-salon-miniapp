/**
 * 客户管理逻辑
 */
const util = require('../../utils/util');

Page({
  data: {
    customers: [],
    filteredCustomers: [],
    searchKey: '',
    vipCount: 0,
    showModal: false,
    showDetailModal: false,
    editingId: null,
    detailCustomer: null,
    form: {
      name: '',
      phone: '',
      colors: [],
      styles: [],
      nailShape: '',
      notes: ''
    },
    colorOptions: ['粉色', '红色', '裸色', '白色', '紫色', '蓝色', '绿色', '黑色', '金色', '银色'],
    styleOptions: ['法式', '日式', '简约', '3D立体', '渐变', '光疗', '猫眼', '星空'],
    nailShapeOptions: ['椭圆形', '方形', '圆形', '尖形', '梯形'],
    selectedShapeIndex: -1
  },

  onShow() {
    this.loadCustomers();
  },

  /**
   * 加载客户列表
   */
  loadCustomers() {
    const customers = util.getStorage('customers');
    const vipCount = customers.filter(c => c.visits >= 10).length;
    this.setData({ customers, vipCount });
    this.filterCustomers();
  },

  /**
   * 搜索过滤
   */
  onSearch(e) {
    this.setData({ searchKey: e.detail.value });
    this.filterCustomers();
  },

  /**
   * 过滤客户
   */
  filterCustomers() {
    const { customers, searchKey } = this.data;
    let filtered = customers;
    if (searchKey) {
      const key = searchKey.toLowerCase();
      filtered = customers.filter(c =>
        c.name.toLowerCase().includes(key) ||
        c.phone.includes(key)
      );
    }
    this.setData({ filteredCustomers: filtered });
  },

  /**
   * 显示添加弹窗
   */
  showAddModal() {
    this.setData({
      showModal: true,
      editingId: null,
      form: {
        name: '',
        phone: '',
        colors: [],
        styles: [],
        nailShape: '',
        notes: ''
      },
      selectedShapeIndex: -1
    });
  },

  /**
   * 隐藏弹窗
   */
  hideModal() {
    this.setData({ showModal: false });
  },

  /**
   * 查看客户详情
   */
  viewCustomer(e) {
    const id = e.currentTarget.dataset.id;
    const customer = util.findRecord('customers', id);
    if (customer) {
      this.setData({
        showDetailModal: true,
        detailCustomer: customer
      });
    }
  },

  /**
   * 隐藏详情弹窗
   */
  hideDetailModal() {
    this.setData({ showDetailModal: false });
  },

  /**
   * 编辑客户
   */
  editCustomer() {
    const customer = this.data.detailCustomer;
    if (customer) {
      const shapeIndex = this.data.nailShapeOptions.indexOf(customer.preferences.nailShape);
      this.setData({
        showDetailModal: false,
        showModal: true,
        editingId: customer.id,
        form: {
          name: customer.name,
          phone: customer.phone,
          colors: customer.preferences.colors || [],
          styles: customer.preferences.styles || [],
          nailShape: customer.preferences.nailShape || '',
          notes: customer.notes || ''
        },
        selectedShapeIndex: shapeIndex >= 0 ? shapeIndex : -1
      });
    }
  },

  /**
   * 表单输入
   */
  onFormInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },

  /**
   * 切换颜色选择
   */
  toggleColor(e) {
    const color = e.currentTarget.dataset.color;
    let colors = [...this.data.form.colors];
    const index = colors.indexOf(color);
    if (index >= 0) {
      colors.splice(index, 1);
    } else {
      colors.push(color);
    }
    this.setData({ 'form.colors': colors });
  },

  /**
   * 切换款式选择
   */
  toggleStyle(e) {
    const style = e.currentTarget.dataset.style;
    let styles = [...this.data.form.styles];
    const index = styles.indexOf(style);
    if (index >= 0) {
      styles.splice(index, 1);
    } else {
      styles.push(style);
    }
    this.setData({ 'form.styles': styles });
  },

  /**
   * 选择甲型
   */
  onShapeSelect(e) {
    const index = parseInt(e.detail.value);
    this.setData({
      selectedShapeIndex: index,
      'form.nailShape': this.data.nailShapeOptions[index]
    });
  },

  /**
   * 保存客户
   */
  saveCustomer() {
    const { form, editingId } = this.data;

    if (!form.name) {
      util.showToast('请输入客户姓名');
      return;
    }
    if (!form.phone) {
      util.showToast('请输入手机号');
      return;
    }

    const customerData = {
      name: form.name,
      phone: form.phone,
      preferences: {
        colors: form.colors,
        styles: form.styles,
        nailShape: form.nailShape
      },
      notes: form.notes
    };

    if (editingId) {
      // 更新
      util.updateRecord('customers', editingId, customerData);
      util.showToast('更新成功');
    } else {
      // 新增
      customerData.visits = 0;
      customerData.totalSpent = 0;
      customerData.lastVisit = '';
      util.addRecord('customers', customerData);
      util.showToast('添加成功');
    }

    this.hideModal();
    this.loadCustomers();
  }
});

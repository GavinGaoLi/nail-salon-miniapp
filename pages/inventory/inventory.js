/**
 * 库存管理逻辑
 */
const util = require('../../utils/util');

Page({
  data: {
    inventory: [],
    filteredInventory: [],
    searchKey: '',
    currentCategory: '',
    categories: [],
    totalValue: '¥0',
    lowStockCount: 0,
    // 库存变动
    showStockChange: false,
    stockAction: 'add',
    stockChangeItem: {},
    stockChangeAmount: '',
    // 添加/编辑
    showModal: false,
    editingId: null,
    form: {
      name: '',
      category: '',
      unit: '',
      costPrice: '',
      sellPrice: '',
      quantity: '',
      minStock: ''
    },
    categoryOptions: ['指甲油', '光疗产品', '装饰材料', '基础产品', '护理产品', '工具'],
    unitOptions: ['瓶', '支', '张', '套', '个', '盒'],
    selectedCategoryIndex: -1,
    selectedUnitIndex: -1
  },

  onShow() {
    this.loadInventory();
  },

  /**
   * 加载库存数据
   */
  loadInventory() {
    const inventory = util.getStorage('inventory');
    
    // 获取分类
    const categories = [...new Set(inventory.map(item => item.category))];
    
    // 计算库存总值
    const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.sellPrice), 0);
    
    // 库存预警数量
    const lowStockCount = inventory.filter(item => item.quantity <= item.minStock).length;

    this.setData({ inventory, categories, totalValue: '¥' + totalValue.toFixed(0), lowStockCount });
    this.filterInventory();
  },

  /**
   * 搜索
   */
  onSearch(e) {
    this.setData({ searchKey: e.detail.value });
    this.filterInventory();
  },

  /**
   * 分类筛选
   */
  filterCategory(e) {
    this.setData({ currentCategory: e.currentTarget.dataset.category });
    this.filterInventory();
  },

  /**
   * 过滤库存
   */
  filterInventory() {
    const { inventory, searchKey, currentCategory } = this.data;
    let filtered = inventory;
    
    if (searchKey) {
      const key = searchKey.toLowerCase();
      filtered = filtered.filter(item => item.name.toLowerCase().includes(key));
    }
    
    if (currentCategory) {
      filtered = filtered.filter(item => item.category === currentCategory);
    }
    
    this.setData({ filteredInventory: filtered });
  },

  /**
   * 显示入库/出库弹窗
   */
  showStockModal(e) {
    const id = e.currentTarget.dataset.id;
    const action = e.currentTarget.dataset.action;
    const item = this.data.inventory.find(i => i.id === id);
    
    if (item) {
      this.setData({
        showStockChange: true,
        stockAction: action,
        stockChangeItem: item,
        stockChangeAmount: ''
      });
    }
  },

  /**
   * 隐藏库存变动弹窗
   */
  hideStockModal() {
    this.setData({ showStockChange: false });
  },

  /**
   * 库存变动数量输入
   */
  onStockChangeInput(e) {
    this.setData({ stockChangeAmount: e.detail.value });
  },

  /**
   * 确认库存变动
   */
  confirmStockChange() {
    const { stockAction, stockChangeItem, stockChangeAmount } = this.data;
    const amount = parseInt(stockChangeAmount);
    
    if (!amount || amount <= 0) {
      util.showToast('请输入有效数量');
      return;
    }

    if (stockAction === 'reduce' && amount > stockChangeItem.quantity) {
      util.showToast('出库数量不能超过库存');
      return;
    }

    const newQuantity = stockAction === 'add' 
      ? stockChangeItem.quantity + amount 
      : stockChangeItem.quantity - amount;

    util.updateRecord('inventory', stockChangeItem.id, { quantity: newQuantity });
    util.showToast(stockAction === 'add' ? '入库成功' : '出库成功');
    this.hideStockModal();
    this.loadInventory();
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
        category: '',
        unit: '',
        costPrice: '',
        sellPrice: '',
        quantity: '',
        minStock: ''
      },
      selectedCategoryIndex: -1,
      selectedUnitIndex: -1
    });
  },

  /**
   * 隐藏弹窗
   */
  hideModal() {
    this.setData({ showModal: false });
  },

  /**
   * 编辑产品
   */
  editItem(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.inventory.find(i => i.id === id);
    
    if (item) {
      const categoryIndex = this.data.categoryOptions.indexOf(item.category);
      const unitIndex = this.data.unitOptions.indexOf(item.unit);
      
      this.setData({
        showModal: true,
        editingId: id,
        form: {
          name: item.name,
          category: item.category,
          unit: item.unit,
          costPrice: String(item.costPrice),
          sellPrice: String(item.sellPrice),
          quantity: String(item.quantity),
          minStock: String(item.minStock)
        },
        selectedCategoryIndex: categoryIndex >= 0 ? categoryIndex : -1,
        selectedUnitIndex: unitIndex >= 0 ? unitIndex : -1
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
   * 选择分类
   */
  onCategorySelect(e) {
    const index = parseInt(e.detail.value);
    this.setData({
      selectedCategoryIndex: index,
      'form.category': this.data.categoryOptions[index]
    });
  },

  /**
   * 选择单位
   */
  onUnitSelect(e) {
    const index = parseInt(e.detail.value);
    this.setData({
      selectedUnitIndex: index,
      'form.unit': this.data.unitOptions[index]
    });
  },

  /**
   * 保存产品
   */
  saveItem() {
    const { form, editingId } = this.data;

    if (!form.name) {
      util.showToast('请输入产品名称');
      return;
    }
    if (!form.category) {
      util.showToast('请选择分类');
      return;
    }
    if (!form.costPrice || !form.sellPrice) {
      util.showToast('请输入价格');
      return;
    }

    const itemData = {
      name: form.name,
      category: form.category,
      unit: form.unit || '个',
      costPrice: parseFloat(form.costPrice),
      sellPrice: parseFloat(form.sellPrice),
      quantity: parseInt(form.quantity) || 0,
      minStock: parseInt(form.minStock) || 5
    };

    if (editingId) {
      util.updateRecord('inventory', editingId, itemData);
      util.showToast('更新成功');
    } else {
      util.addRecord('inventory', itemData);
      util.showToast('添加成功');
    }

    this.hideModal();
    this.loadInventory();
  }
});

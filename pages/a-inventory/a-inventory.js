Page({
  data: {
    activeCategory: 'all',
    categories: [
      { id: 'all', name: '全部' },
      { id: 'gel', name: '甲油胶' },
      { id: 'tool', name: '工具' },
      { id: 'care', name: '护理品' },
      { id: 'deco', name: '装饰' }
    ],
    materials: [
      { id: 1, name: '甲油胶-经典红', category: 'gel', categoryName: '甲油胶', stock: 15, unit: '瓶', minStock: 5 },
      { id: 2, name: '甲油胶-裸粉', category: 'gel', categoryName: '甲油胶', stock: 12, unit: '瓶', minStock: 5 },
      { id: 3, name: '甲油胶-法式白', category: 'gel', categoryName: '甲油胶', stock: 8, unit: '瓶', minStock: 5 },
      { id: 4, name: '甲油胶-星空蓝', category: 'gel', categoryName: '甲油胶', stock: 3, unit: '瓶', minStock: 5 },
      { id: 5, name: '底胶', category: 'gel', categoryName: '甲油胶', stock: 6, unit: '瓶', minStock: 3 },
      { id: 6, name: '封层', category: 'gel', categoryName: '甲油胶', stock: 4, unit: '瓶', minStock: 3 },
      { id: 7, name: '美甲笔套装', category: 'tool', categoryName: '工具', stock: 5, unit: '套', minStock: 2 },
      { id: 8, name: '锉刀', category: 'tool', categoryName: '工具', stock: 20, unit: '个', minStock: 10 },
      { id: 9, name: '死皮剪', category: 'tool', categoryName: '工具', stock: 8, unit: '把', minStock: 3 },
      { id: 10, name: '手部按摩膏', category: 'care', categoryName: '护理品', stock: 2, unit: '支', minStock: 3 },
      { id: 11, name: '亮片-金色', category: 'deco', categoryName: '装饰', stock: 30, unit: '盒', minStock: 10 },
      { id: 12, name: '小珍珠装饰', category: 'deco', categoryName: '装饰', stock: 50, unit: '颗', minStock: 20 }
    ],
    filteredMaterials: [],
    showPopup: false,
    isEdit: false,
    form: { name: '', categoryName: '', stock: '', unit: '瓶', minStock: '' }
  },
  onLoad() { this.filterMaterials('all') },
  switchCategory(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ activeCategory: id })
    this.filterMaterials(id)
  },
  filterMaterials(cat) {
    const filtered = cat === 'all' ? this.data.materials : this.data.materials.filter(m => m.category === cat)
    this.setData({ filteredMaterials: filtered })
  },
  addMaterial() {
    this.setData({ showPopup: true, isEdit: false, form: { name: '', categoryName: '', stock: '', unit: '瓶', minStock: '' } })
  },
  editMaterial(e) {
    const id = e.currentTarget.dataset.id
    const m = this.data.materials.find(x => x.id === id)
    this.setData({ showPopup: true, isEdit: true, form: { ...m } })
  },
  closePopup() { this.setData({ showPopup: false }) },
  inputName(e) { this.setData({ 'form.name': e.detail.value }) },
  inputStock(e) { this.setData({ 'form.stock': e.detail.value }) },
  inputUnit(e) { this.setData({ 'form.unit': e.detail.value }) },
  inputMinStock(e) { this.setData({ 'form.minStock': e.detail.value }) },
  showCategoryPicker() {
    wx.showActionSheet({
      itemList: ['甲油胶', '工具', '护理品', '装饰'],
      success: (res) => {
        const cats = ['gel', 'tool', 'care', 'deco']
        const names = ['甲油胶', '工具', '护理品', '装饰']
        this.setData({ 'form.category': cats[res.tapIndex], 'form.categoryName': names[res.tapIndex] })
      }
    })
  },
  saveMaterial() {
    const { form, isEdit, materials } = this.data
    if (!form.name) return wx.showToast({ title: '请输入名称', icon: 'none' })
    if (isEdit) {
      const idx = materials.findIndex(m => m.id === form.id)
      materials[idx] = { ...form }
    } else {
      materials.push({ ...form, id: Date.now() })
    }
    this.setData({ materials, showPopup: false })
    this.filterMaterials(this.data.activeCategory)
    wx.showToast({ title: isEdit ? '已更新' : '已添加', icon: 'success' })
  }
})
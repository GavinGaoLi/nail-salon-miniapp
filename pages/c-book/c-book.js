Page({
  data: {
    step: 1,
    services: [
      { id: 1, name: '基础美甲', price: 68, duration: 60 },
      { id: 2, name: '法式美甲', price: 98, duration: 90 },
      { id: 3, name: '渐变美甲', price: 128, duration: 90 },
      { id: 4, name: '彩绘美甲', price: 158, duration: 120 },
      { id: 5, name: '卸甲', price: 30, duration: 30 }
    ],
    dates: [],
    times: ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    selectedService: null,
    selectedServiceName: '',
    selectedServicePrice: 0,
    selectedDate: '',
    selectedTime: '',
    phone: '',
    note: ''
  },
  onLoad() { this.generateDates() },
  generateDates() {
    const weeks = ['周日','周一','周二','周三','周四','周五','周六']
    const dates = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() + i)
      dates.push({ date: d.toISOString().slice(0,10), week: i===0?'今天':weeks[d.getDay()], day: d.getDate() })
    }
    this.setData({ dates })
  },
  selectService(e) {
    const id = e.currentTarget.dataset.id
    const s = this.data.services.find(x => x.id === id)
    this.setData({ selectedService: id, selectedServiceName: s.name, selectedServicePrice: s.price })
  },
  selectDate(e) { this.setData({ selectedDate: e.currentTarget.dataset.date }) },
  selectTime(e) { this.setData({ selectedTime: e.currentTarget.dataset.time }) },
  inputPhone(e) { this.setData({ phone: e.detail.value }) },
  inputNote(e) { this.setData({ note: e.detail.value }) },
  nextStep() {
    const { step, selectedService, selectedDate, selectedTime } = this.data
    if (step===1 && !selectedService) return wx.showToast({ title:'请选择服务', icon:'none' })
    if (step===2 && (!selectedDate || !selectedTime)) return wx.showToast({ title:'请选择时间', icon:'none' })
    this.setData({ step: step+1 })
  },
  prevStep() { this.setData({ step: this.data.step-1 }) },
  submitBooking() {
    if (!this.data.phone || this.data.phone.length < 11) return wx.showToast({ title:'请输入手机号', icon:'none' })
    wx.showModal({
      title: '预约成功',
      content: '我们会短信通知您预约详情',
      showCancel: false,
      success: () => this.setData({ step:1, selectedService:null, selectedDate:'', selectedTime:'', phone:'', note:'' })
    })
  }
})
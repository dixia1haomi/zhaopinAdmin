import { Api } from '../../utils/api.js'

const api = new Api()

Page({

  data: {
    jobDetailRes: {},
    postData: {},
  },


  onLoad: function (op) {
    this._load(op.id)
  },

  // 获取上一页数据
  _load(id) {
    let res = getCurrentPages()[0].data.jobRes
    let jobDetailRes = {}
    for (let i in res) {
      if (res[i].id == id) {
        jobDetailRes = res[i]
        break
      }
    }
    this.setData({
      jobDetailRes: jobDetailRes,
      postData: jobDetailRes
      //  {
      //   id: jobDetailRes.id,
      //   company_id: jobDetailRes.company_id,
      //   job_name: jobDetailRes.job_name,
      //   job_user_name: jobDetailRes.job_user_name,
      //   // set_top: jobDetailRes.set_top,
      //   map_address: jobDetailRes.map_address,
      //   map_latitude: jobDetailRes.map_latitude,
      //   map_longitude: jobDetailRes.map_longitude,
      //   map_name: jobDetailRes.map_name,
      //   phone: jobDetailRes.phone,
      //   welfare: jobDetailRes.welfare,
      //   job_description: jobDetailRes.job_description,
      // }
    })
  },

  // ------事件------
  job_name(e) {
    console.log(e.detail.value)
    this.setData({ 'postData.job_name': e.detail.value })
  },
  job_user_name(e) {
    console.log(e.detail.value)
    this.setData({ 'postData.job_user_name': e.detail.value })
  },
  map_address(e) {
    console.log(e.detail.value)
    this.setData({ 'postData.map_address': e.detail.value })
  },
  map_latitude(e) {
    console.log(e.detail.value)
    this.setData({ 'postData.map_latitude': e.detail.value })
  },
  map_longitude(e) {
    console.log(e.detail.value)
    this.setData({ 'postData.map_longitude': e.detail.value })
  },
  map_name(e) {
    console.log(e.detail.value)
    this.setData({ 'postData.map_name': e.detail.value })
  },
  phone(e) {
    console.log(e.detail.value)
    this.setData({ 'postData.phone': e.detail.value })
  },
  welfare(e) {
    console.log(e.detail.value)
    this.setData({ 'postData.welfare': e.detail.value })
  },
  job_description(e) {
    console.log('bb', e.detail.value)
    this.setData({ 'postData.job_description': e.detail.value })
  },


  // 提交
  confirm() {
    let uid = this.data.jobDetailRes.user_id
    let data = this.data.postData
    delete data.user_id
    console.log(uid, data)
    api.editJob(uid, data, (res) => {
      console.log('aa', res)
      if (res.code == 201) {
        wx.navigateBack({ delta: 1 })
      } else {
        wx.showToast({ title: '更新失败' })
      }
    })
  },
})
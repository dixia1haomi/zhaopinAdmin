import { Api } from '../../utils/api.js'
import { Config } from '../../utils/config.js'

const api = new Api()

let page = 1

Page({
  data: {
    // 地区范围->麒麟，沾益，富源...
    work_place_list: Config.work_place_data,
    // 薪资水平
    pay_level_list: Config.expectation_pay_data,
    // 区域
    work_area_list: Config.work_place_data,
    // work_area: 0,
    // 薪资
    // Config.expectation_pay_data
    // 职位
    // Config.expectation_position_data
    // 经验
    ments_exp_list: Config.work_exp_data,
    // 学历
    ments_education_list: Config.education_data,

    jobRes: {},
    resLength: 0,

    // 是否显示描述
    miaoshu: true,

    // 搜索
    sousuo: {
      id: '',
      job_name: '',
      work_area: '',
      user_id: '',
      phone: '',
      job_user_name: '',
    },

    // 搜索开关
    kaiguan: false,
    // 搜索结果数量
    whereLength: 0,

    sheetState_work_area: false,

  },

  // 搜索
  where() {
    let data = this.data.sousuo

    for (let i in data) {
      if (data[i] == '') { delete data[i] }
    }
    console.log('aa', data)

    api.getJobList(1, data, (res) => {
      console.log('where', res)
      this.setData({ jobRes: res, sousuo: {}, whereLength: res.length, kaiguan: false })
    })
  },

  // 显示描述事件
  miaoshu(e) {
    console.log('id', e.currentTarget.id)
    let jobRes = this.data.jobRes
    for (let i in jobRes) {
      if (jobRes[i].id == e.currentTarget.id) {
        jobRes[i].xianshi = true
      } else {
        jobRes[i].xianshi = false
      }
    }
    this.setData({ jobRes: jobRes })
  },

  // 编辑
  edit(e) {
    console.log('edit', e.currentTarget.id)
    let id = e.currentTarget.id
    wx.navigateTo({ url: '/pages/index/edit?id=' + id })
  },

  // 删除
  del(e) {
    console.log('del', e)
    let that = this
    let id = e.currentTarget.id
    let uid = e.currentTarget.dataset.uid
    wx.showModal({
      content: '确定要删除这个岗位？',
      success: function (res) {
        if (res.confirm) {
          api.deleteJob(id, uid, (res) => {
            if (res.code == 201) {
              wx.showModal({
                content: '删除成功',
                showCancel: false,
                success: function () {
                  that.getJobList()
                }
              })
            }
          })
        }
      }
    })
  },


  onLoad: function () {
    // this.getJobList()
  },

  onShow: function () {
    this.getJobList()
  },

  // 岗位列表
  getJobList() {
    api.getJobList(page, {}, (res) => {
      console.log('list', res)
      this.setData({ jobRes: res, resLength: res.length })
    })
  },


  xiayiye() {
    api.getJobList(++page, {}, (res) => {
      if (res.length == 0) {
        wx.showToast({ title: '没有了' })
        return
      }
      this.setData({ jobRes: this.data.jobRes.concat(res) }, () => {
        this.setData({ resLength: this.data.jobRes.length })
      })
    })
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    // console.log('page', page)
  },

  //页面相关事件处理函数--监听用户下拉动作--重新获取数据并setData->成功后停止下拉动作
  onPullDownRefresh: function () {
    page = 1  //下一页的全局变量初始化->防止多次切换地区后上拉取值不对
    api.getJobList(page, {}, (res) => { this.setData({ jobRes: res }, () => { wx.stopPullDownRefresh() }) })
  },


  //---------------------------------------搜索-------------------------------------------
  // 显示隐藏
  sousuo() {
    this.setData({ kaiguan: !this.data.kaiguan, sheetState_work_area: false })
  },

  // ID
  idEvent(e) {
    console.log('id', e.detail.value)
    this.setData({ 'sousuo.id': e.detail.value })
  },
  // 岗位名称
  job_nameEvent(e) {
    console.log('name', e.detail.value)
    this.setData({ 'sousuo.job_name': e.detail.value })
  },
  // 区域
  // work_areaEvent(e) {
  //   console.log('work_area', e.detail.value)
  //   this.setData({ 'sousuo.work_area': e.detail.value })
  // },
  sheetState_work_area() { this.setData({ sheetState_work_area: true }) },
  work_areaEvent(e) {
    console.log('work_areaEvent', e.detail)
    e.detail.index !== false && this.setData({ 'sousuo.work_area': e.detail.index })
  },

  // 用户id
  user_idEvent(e) {
    console.log('user_id', e.detail.value)
    this.setData({ 'sousuo.user_id': e.detail.value })
  },
  // 发布者名称
  job_user_nameEvent(e) {
    console.log('job_user_nameEvent', e.detail.value)
    this.setData({ 'sousuo.job_user_name': e.detail.value })
  },
  // 电话号码
  phoneEvent(e) {
    console.log('phoneEvent', e.detail.value)
    this.setData({ 'sousuo.phone': e.detail.value })
  },

})

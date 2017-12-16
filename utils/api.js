import {Config} from './config.js'

class Api {
  constructor() { }

  //网络请求封装
  request(params) {
    let that = this
    // let url = 'http://zhaopin.com/api/' + params.url
    let url = Config.url + 'api/' + params.url
    if (!params.method) { params.method = 'POST' }

    wx.request({
      url: url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token_key': wx.getStorageSync('token_key')
      },
      method: params.method,
      success: function (res) {
        params.sCallback && params.sCallback(res.data);
      },
      fail: function (err) { console.log('request-fail', err) }
    })
  }


  // ---------岗位组---------
  //查询岗位列表-post传多条件查询-?page=1传分页 Route::post('api/job', 'api/job/get_Job_List'); 
  getJobList(page, data, callBack) {
    this.request({
      url: 'job?page=' + page,
      data: data,
      sCallback: function (res) { callBack && callBack(res) }
    })
  }

  // 编辑岗位
  editJob(uid, data, callBack) {
    this.request({
      url: 'job/update?id=' + uid,
      data: data,
      sCallback: function (res) { callBack && callBack(res) }
    })
  }

  // 删除岗位  Route::post('api/job/delete', 'api/job/delete_Job');
  deleteJob(id, uid, callBack) {
    this.request({
      url: 'job/delete?id=' + uid,
      data: { id: id },
      sCallback: function (res) { callBack && callBack(res) }
    })
  }

  // ---------公司组---------

  // ---------简历组---------

  // ---------用户组---------

}

export { Api }

// //User组
// Route::post('api/user', 'api/user/getUser_Detail'); //查询用户详细信息
// Route::post('api/user/job', 'api/user/getUser_Job'); //查询用户关联的岗位
// Route::post('api/user/company', 'api/user/getUser_Company'); //查询用户关联的公司
// Route::post('api/user/resume', 'api/user/getUser_Resume'); //查询用户关联的简历
// //user - 微信
// Route::post('api/user/wx_userinfo', 'api/user/getWx_userInfo'); //查询用户详细信息

// //岗位组
// Route::post('api/job', 'api/job/get_Job_List'); //查询岗位列表-post传多条件查询-?page=1传分页
// Route::get('api/job/detail/:id', 'api/job/get_Job_Detail'); //查询岗位详细信息
// Route::post('api/job/create', 'api/job/create_Job'); //新增岗位
// Route::post('api/job/update', 'api/job/update_Job'); //更新岗位
// Route::post('api/job/delete', 'api/job/delete_Job'); //删除岗位
// //ceshiduotiaojian
// //Route::post('api/job/ceshi','api/job/ceshiJob'); //查询岗位列表

// //公司组
// Route::get('api/company/detail/:id', 'api/company/get_Company_Detail'); //查询公司详细信息
// Route::post('api/company/create', 'api/company/create_Company'); //创建公司
// Route::post('api/company/update', 'api/company/update_Company'); //更新公司
// Route::post('api/company/delete', 'api/company/delete_Company'); //删除公司

// //简历组
// Route::post('api/resume', 'api/resume/select_Resume'); //查询简历列表post传多条件查询-?page=1传分页
// Route::get('api/resume/detail/:id', 'api/resume/find_Resume'); //查询简历详细信息
// Route::post('api/resume/create', 'api/resume/create_Resume'); //新增简历
// Route::post('api/resume/update', 'api/resume/update_Resume'); //更新简历
// Route::post('api/resume/delete', 'api/resume/delete_Resume'); //删除简历
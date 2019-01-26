// 全局ajax封装
/*
  url:请求的url,
  msg:loading提示信息,
  loading:loadingBar/loading 默认loading
  type:get/post 默认post
  params:请求参数  默认{}
  success:function 成功的回调
  fail:function  失败的回调
*/
import pageJson from "./package.js";
import utilMd5 from './md5.js'
const md5 = (params) => {
  var seckey = 'xdr_2019@DU^^&JGK_((*&gjGH';
  var str = '';
  for (let k in params) {
    if (k != 'apitoken') {
      str += utilMd5.hexMD5(seckey + params[k])
    }
  }

  str = utilMd5.hexMD5(seckey + str + seckey)
  params.apitoken = str
  return params;
}

let options = {
  url: '',
  params: {},
  msg: '加载中...',
  loading: 'loading',
  type: 'post',
  checkRole: true,
  success(res) {

  },
  fail(err) {

  }
}
function ajax(opt) {
  let obj = Object.assign(options, opt)
  if (obj.loading === 'loading') {
    wx.showLoading({
      title: obj.msg,
    })
  } else {
    wx.showNavigationBarLoading()
  }
if(obj.checkRole){
  const token = wx.getStorageSync('token')
  token ? opt.params.token = token : wx.navigateTo({
    url: '/pages/authorize/authorize',
  })
}
  wx.request({
    url: pageJson.host + obj.url,
    data: md5(obj.params),
    header: {
      //'Content-Type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: obj.type,
    success: function (res) {
      if (obj.loading === 'loading') {
        wx.hideLoading()
      } else {
        wx.hideNavigationBarLoading()
      }
      obj.success(res.data)
    },
    fail: function (err) {
      console.log('err,', err)
      if (obj.loading === 'loading') {
        wx.hideLoading()
      } else {
        wx.hideNavigationBarLoading()
      }
      wx.showToast({
        title: err.errMsg || '返回错误！',
        icon: 'none'
      })
      obj.fail(err);
    },
    complete: function (res) {

    }
  })

}

module.exports = {
  ajax: ajax,
}
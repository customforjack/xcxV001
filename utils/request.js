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
  params.token = wx.getStorageSync('token')
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
  const tk = wx.getStorageSync('token')
  let obj = Object.assign(options, opt)
  if (obj.loading === 'loading') {
    wx.showLoading({
      title: obj.msg,
    })
  } else {
    wx.showNavigationBarLoading()
  }
  // 调接口之前先校验登录  先判断checkRole  是否为true
  if (obj.checkRole){ // 校验登录
    if (!tk || tk === 'undefined'){
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      })
      return false
    }
    return newAjax(obj)
  } else { // 不校验登录
    return newAjax(obj)
  }
}

function newAjax(obj){
  if (obj.loading === 'loading') {
    wx.showLoading({
      title: obj.msg,
    })
  } else {
    wx.showNavigationBarLoading()
  }
  return new Promise((resolve,reject) => {
    wx.request({
      url: pageJson.host + obj.url,
      data: md5(obj.params),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success(res) {
        if (obj.loading === 'loading') {
          wx.hideLoading()
        } else {
          wx.hideNavigationBarLoading()
        }
        if(res.code === 400){
          // 去授权登录
          // 失效
          wx.navigateTo({
            url: '/pages/authorize/authorize'
          })

        }
        obj.success(res.data)
        resolve(res.data)
      },
      fail(res){
        if (obj.loading === 'loading') {
          wx.hideLoading()
        } else {
          wx.hideNavigationBarLoading()
        }
        console.log('err',res)
        obj.fail(res)
        reject(res)
      }
      })
  })

}

module.exports = {
  ajax: ajax,
  getMd5: md5
}
import request from '@utils/request'
import {app as _this} from '@src/main'
const isBrowser = !!window // 判断是否为浏览器环境
// 通用的api请求方式
export function defaultProcess(...args) {
  const [method, url, data, loading = true, toast = true] = args
  let fn = args[args.length - 1]
  return new Promise((resolve, reject) => {
    request[method](url, data, loading)
      .then((res) => {
        // 隐藏loading
        if (loading) {
          _loadingHide()
        }
        // 错误处理
        if (res == null || res.error == null) {
          return reject
        }
        // toast处理
        if (_this.$ERR_OK !== res.error) {
          toast && _toastShow(res.message)
          return reject
        }
        // 自定义函数处理
        if (typeof fn === 'function') {
          res = fn(res)
        }
        resolve(res)
      })
      .catch(reject)
  })
}
// 中间件
export function defaultMiddleWare(res, ...args) {
  const [, , loading = true, toast = true] = args
  let fn = args[args.length - 1]
  // 隐藏loading
  if (loading) {
    _loadingHide()
  }
  // 错误处理
  if (res == null || res.error == null) {
    return res
  }
  // toast处理
  if (_this.$ERR_OK !== res.error) {
    toast && _toastShow(res.message)
    return res
  }
  // 自定义函数处理
  if (typeof fn === 'function') {
    res = fn(res)
  }
  return res
}
// 关闭loading
function _loadingHide() {
  isBrowser && _this.$loading.hide()
}
// 显示toast
function _toastShow(msg) {
  isBrowser && _this.$toast.show(msg)
}

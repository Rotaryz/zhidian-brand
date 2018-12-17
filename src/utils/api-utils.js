import request from '@utils/request'
import {app as _this} from '@src/main'

// 通用的api请求方式
export function defaultProcess(...args) {
  const [method, url, data, loading = true, toast = true] = args
  let fn = args[args.length - 1]
  return new Promise((resolve, reject) => {
    request[method](url, data, loading)
      .then((res) => {
        // 隐藏loading
        if (loading) {
          _this.$loading.hide()
        }
        // 错误处理
        if (res == null || res.error == null) {
          return reject
        }
        // toast处理
        if (_this.$ERR_OK !== res.error) {
          toast && _this.$toast.show(res.message)
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

// 通用的api请求方式
// export function defaultMethod(...args) {
//   const [method, url, data, loading = true, toast = true] = args
//   let fn = args[args.length - 1]
//   return new Promise((resolve, reject) => {
//     request[method](url, data, loading)
//       .then((res) => {
//         if (loading) {
//           _this.$loading.hide()
//         }
//         if (_this.$ERR_OK !== res.error) {
//           toast && _this.$toast.show(res.message)
//           return reject
//         }
//         if (typeof fn === 'function') {
//           res = fn(res)
//         }
//         resolve(res)
//       })
//       .catch(reject)
//   })
// }

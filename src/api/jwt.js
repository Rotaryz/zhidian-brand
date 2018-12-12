import {defaultProcess} from './api-utils'

export default {
  // 授权
  getToken(data, loading, toast) {
    const url = `/api/jwt/brand/login`
    return defaultProcess('post', url, data, loading, toast)
  },
  /**
   * 获取验证码
   * @returns {Promise.<TResult>}
   */
  getSms(data, loading, toast) {
    const url = `/api/sms`
    return defaultProcess('post', url, data, loading, toast)
  }
}

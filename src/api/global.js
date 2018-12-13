import {defaultProcess} from '@utils/api-utils'

export default {
  /**
   * 获取微信JSSDK配置
   * @returns {*}
   */
  jssdkConfig(data, loading = false) {
    let url = '/api/wechat/jssdk'
    return defaultProcess('get', url, data, loading)
  },
  getUserInfo(data, loading = false, toast = true) {
    let url = '/api/brand/profile'
    return defaultProcess('get', url, data, loading, toast)
  },
  updateUserInfo(data, loading, toast) {
    let url = '/api/brand/profile'
    return defaultProcess('post', url, data, loading, toast)
  }
}

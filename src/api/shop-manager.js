import {defaultProcess} from '@utils/api-utils'

export default {
  /**
   * 获取微信JSSDK配置
   * @returns {*}
   */
  getList(data, loading, toast) {
    let url = '/api/brand/stores'
    return defaultProcess('get', url, data, loading, toast)
  },
  create(data, loading, toast) {
    let url = '/api/brand/stores'
    return defaultProcess('post', url, data, loading, toast)
  }
}

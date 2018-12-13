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
    return defaultProcess('get', url, data, loading, toast, resolveUserInfoData)
  },
  updateUserInfo(data, loading, toast) {
    let url = '/api/brand/profile'
    return defaultProcess('post', url, data, loading, toast)
  }
}

function resolveUserInfoData(res) {
  let reaData = res.data || {}
  let resAccount = res.account || {}
  let data = {
    merchantName: reaData.name || '未知',
    accountUsed: +resAccount.used,
    accountTotal: +resAccount.total
  }
  res.data = data
  return res
}

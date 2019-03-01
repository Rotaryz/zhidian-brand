import {defaultProcess} from '@utils/api-utils'
import {DEFAULT_LOGO, DEFAULT_STR, MER_NAME_ARR} from '@utils/constant'

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
    return defaultProcess('get', url, data, loading, toast, _resolveUserInfoData)
  },
  updateUserInfo(data, loading, toast) {
    let url = '/api/brand/profile'
    data = _formatUpdateUserInfoData(data)
    return defaultProcess('post', url, data, loading, toast)
  },
  getMerchantInfo(data, loading = false, toast = false) {
    let url = '/api/brand/profile'
    return defaultProcess('get', url, data, loading, toast)
  }
}

function _resolveUserInfoData(res) {
  let resData = res.data || {}
  let resAccount = res.account || {}
  let resLogo = resData.logo || {}
  let data = {
    merchantName: resData.name || DEFAULT_STR,
    accountUsed: +resAccount.used,
    accountTotal: +resAccount.total,
    logoUrl: resLogo.url || DEFAULT_LOGO,
    logoId: resLogo.id,
    merchantTypeName: MER_NAME_ARR[resData.type],
    industryName: resData.industry_name || DEFAULT_STR,
    nickName: resData.nickname || DEFAULT_STR,
    mobile: resData.mobile || DEFAULT_STR
  }
  res.data = data
  return res
}

function _formatUpdateUserInfoData(data) {
  return {
    name: data.merchantName,
    logo_id: data.logoId
  }
}

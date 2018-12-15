import {defaultProcess} from '@utils/api-utils'
import {DEFAULT_LOGO, DEFAULT_STR, BRANCH_ARR} from '@utils/constant'
import storage from 'storage-controller'

export default {
  /**
   * 获取微信JSSDK配置
   * @returns {*}
   */
  getList(data, loading, toast) {
    let url = '/api/brand/stores'
    return defaultProcess('get', url, data, loading, toast, _resolveListData)
  },
  create(data, loading, toast) {
    let url = '/api/brand/stores'
    data = _formatCreateData(data)
    return defaultProcess('post', url, data, loading, toast)
  },
  editor(data, loading, toast) {
    let url = '/api/brand/stores/' + data.storeId
    data = _formatCreateData(data)
    return defaultProcess('put', url, data, loading, toast)
  },
  getQrCode(data, loading, toast) {
    let url = '/api/brand/create-invite-qrcode'
    return defaultProcess('post', url, data, loading, toast)
  },
  // getMainStore(data, loading,toast) {
  //   let url = '/api/brand/get-boss-store'
  //   return defaultProcess('get', url, data, loading, toast)
  // }
}

function _resolveListData(res) {
  let store = storage.get('selectStore', {})
  let data = res.data.map((item) => {
    const logo = item.logo || {}
    const merchant = item.merchant || {}
    const employee = item.employee || {}
    return {
      logoUrl: logo.url || DEFAULT_LOGO,
      merchantName: merchant.name + BRANCH_ARR[item.is_branch] || DEFAULT_STR,
      eName: employee.name || DEFAULT_STR,
      eMobile: employee.mobile || DEFAULT_STR,
      storeId: item.id,
      isActive: employee.activited, // 是否绑定
      isChecked: +item.id === +store.storeId
    }
  })
  res.data = data
  return res
}

function _formatCreateData(data) {
  return {
    name: data.name,
    mobile: data.mobile
  }
}

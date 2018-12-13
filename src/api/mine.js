import request from '@utils/request'

export default {
  /**
   * 获取服务列表
   * @returns {*}
   */
  getShopInfo(data, loading) {
    let url = '/api/merchant/stores/profile'
    return request.get(url, data, loading)
  },
  updateShopInfo(data, loading) {
    let url = '/api/merchant/stores/profile'
    return request.put(url, data, loading)
  },
  getInviteQrcode(data, loading) {
    let url = '/api/merchant/create-invite-qrcode'
    return request.post(url, data, loading)
  },
  getUserInfo() {
    let url = '/api/merchant/profile'
    return request.get(url)
  }
}

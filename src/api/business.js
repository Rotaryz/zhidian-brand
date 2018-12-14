import request from '@utils/request'

export default {
  // /**
  //  * 我的名片-个性签名编辑
  //  * @returns {*}
  //  */
  // Myqrcode (data) {
  //   let url = 'api/employee/my-new-qrcode'
  //   return request.get(url, data)
  // },
  /**
   * 小程序二维码
   * @returns {*}
   */
  Myshop(shopId) {
    let url = `api/merchant/shops/${shopId}/qrcode` // todo 缺少接口
    return request.get(url, Object.assign({}, {is_hyaline: 0}))
  }
}

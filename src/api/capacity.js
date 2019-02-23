import request from '@utils/request'

export default {
  /**
   * 能力模型图
   * @returns {*}
   */
  getRadarData(data) {
    let url = 'api/brand/brand-boss/boss-capacity-model-chart'
    return request.post(url, data, false)
  },
  /**
   * 商家交易数据概况
   * @returns {*}
   */
  getMerchantData(data) {
    let url = 'api/brand/brand-boss/get-trade-description'
    return request.get(url, data, false)
  },

}

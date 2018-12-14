import request from '@utils/request'

export default {
  /**
   * 客户兴趣占比图
   * @returns {*}
   */
  getPie(shop_id = 0) {
    let url = 'api/merchant/boss-analysis/interest-rate-chart'
    let data = {
      shop_id
    }
    return request.post(url, data)
  },
  /**
   * 近7日客户活跃度图
   * @returns {*}
   */
  getActionLine(shop_id = 0) {
    let url = 'api/merchant/brand/brand-analysis/data-overview' // todo
    let data = {
      shop_id
    }
    return request.post(url, data)
  },
  /**
   *  近7日新增客户数
   * @returns {*}
   */
  getAddLine(shop_id = 0) {
    let url = 'api/merchant/boss-analysis/new-customer-sum-chart'
    let data = {
      shop_id
    }
    return request.post(url, data)
  },
  /**
   *  成交率漏斗图
   * @returns {*}
   */
  getSuccess(shop_id = 0) {
    let url = 'api/merchant/boss-analysis/close-deal-rate-chart'
    let data = {
      shop_id
    }
    return request.post(url, data)
  },
  /**
   * 客户与我互动图
   * @returns {*}
   */
  getBar(shop_id = 0) {
    let url = 'api/merchant/boss-analysis/interactive-chart'
    let data = {
      shop_id
    }
    return request.post(url, data)
  },
  /**
   * 员工能力模型图
   * @returns {*}
   */
  getEmployee(shop_id = 0) {
    let url = 'api/merchant/boss-analysis/boss-capacity-model-chart'
    let data = {
      shop_id
    }
    return request.post(url, data)
  },
  /**
   * 数据总览
   * @returns {*}
   */
  getAllData(time = 'all', shop_id = 0) {
    let url = 'api/merchant/boss-analysis/data-overview'
    let data = {
      time,
      shop_id
    }
    return request.post(url, data)
  },
  /**
   * 数据总览
   * @returns {*}
   */
  getEmployeeRank(shop_id = 0) {
    let url = 'api/merchant/boss-analysis/boss-all-type-rank'
    let data = {
      shop_id
    }
    return request.post(url, data)
  }
}

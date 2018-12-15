import request from '@utils/request'
import storage from 'storage-controller'
export default {
  /**
   * 客户兴趣占比图
   * @returns {*}
   */
  getPie(shop_id = 0) {
    let url = '/api/brand/brand-analysis/interest-rate-chart'
    let data = {
      shop_id,
      store_id: _getStoreId()
    }
    return request.post(url, data, false)
  },
  /**
   * 近7日客户活跃度图
   * @returns {*}
   */
  getActionLine(shop_id = 0) {
    let url = '/api/brand/brand-analysis/active-chart'
    let data = {
      shop_id,
      store_id: _getStoreId()
    }
    return request.post(url, data, false)
  },
  /**
   *  近7日新增客户数
   * @returns {*}
   */
  getAddLine(shop_id = 0) {
    let url = '/api/brand/brand-analysis/new-customer-sum-chart'
    let data = {
      shop_id,
      store_id: _getStoreId()
    }
    return request.post(url, data, false)
  },
  /**
   *  成交率漏斗图
   * @returns {*}
   */
  getSuccess(shop_id = 0) {
    let url = '/api/brand/brand-analysis/close-deal-rate-chart'
    let data = {
      shop_id,
      store_id: _getStoreId()
    }
    return request.post(url, data, false)
  },
  /**
   * 客户与我互动图
   * @returns {*}
   */
  getBar(shop_id = 0) {
    let url = '/api/brand/brand-analysis/interactive-chart' // todo 废弃
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
    let url = '/api/brand/brand-analysis/boss-capacity-model-chart'
    let data = {
      shop_id,
      store_id: _getStoreId()
    }
    return request.post(url, data, false)
  },
  /**
   * 数据总览(1)
   * @returns {*}
   */
  getAllData(time = 'all', shop_id = 0) {
    let url = '/api/brand/brand-analysis/data-overview'
    let data = {
      time,
      shop_id,
      store_id: _getStoreId()
    }
    return request.post(url, data, false)
  },
  /**
   * 数据总览 各种能力排行(9) 能力模型
   * @returns {*}
   */
  getEmployeeRank(shop_id = 0) {
    let url = '/api/brand/brand-analysis/boss-all-type-rank'
    let data = {
      shop_id,
      store_id: _getStoreId()
    }
    return request.post(url, data, false)
  },
  /**
   * 来访记录(10)/api/brand/brand-analysis/visits
   * @returns {*}
   */
  getActionList(shopId = 0, from = 0, limit = 30, page = 0) {
    let url = `/api/brand/brand-analysis/visits`
    let data = {
      from,
      limit,
      page,
      store_id: _getStoreId()
    }
    return request.get(url, data, false)
  },
  /**
   * 小程序二维码
   * @returns {*}
   */
  getQrCode() {
    let url = `/api/brand/get-store-qrcode`
    let data = {
      path: 'pages/guide',
      is_hyaline: 1,
      refresh: 1,
      store_id: _getStoreId()
    }
    return request.get(url, data)
  }
}

function _getStoreId() {
  let id = 0
  let user = storage.get('user')
  let store = storage.get('selectStore')
  if (user) {
    id = user.store_id
  } else {
    id = store.storeId
  }
  return id
}

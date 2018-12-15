import request from '@utils/request'

export default {
  // 获取员工列表 店铺排行榜（6）
  getStaffList(data, loading = false) {
    const url = `/api/brand/brand-analysis/boss-shop-ranking` // todo
    return request.post(url, data, loading)
  },
  // 员工销售力排行榜(7)
  getStaffSellList(data, loading) {
    const url = `/api/brand/brand-analysis/boss-shop-sell-rank` // todo
    return request.post(url, data, loading)
  }
}

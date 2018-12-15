import request from '@utils/request'

export default {
  // /**
  //  * 获得用户详情
  //  * @returns {*}
  //  */
  // getClientDetail(user_id = 0, current_type = 'weishang') {
  //   let url = `api/employee/profile`
  //   let data = {
  //     user_id,
  //     current_type
  //   }
  //   return request.get(url, data)
  // },
  // /**
  //  * 保存客户详情
  //  * @returns {*}
  //  */
  // saveClientDetail(id, data) {
  //   let url = `api/employee/employee-customer/${id}`
  //   return request.put(url, data)
  // },
  // /**
  //  * 获取客户ID
  //  * @returns {*}
  //  */
  // getClientId(id) {
  //   let url = `api/employee/employee-customer/${id}`
  //   return request.get(url)
  // },
  // /**
  //  * 跟进记录列表
  //  * @returns {*}
  //  */
  // getFlowList(customer_id = 0, flow_id = 0, page = 1, limit = 10) {
  //   let url = `api/employee/follow-record`
  //   let data = {
  //     customer_id,
  //     flow_id,
  //     page,
  //     limit
  //   }
  //   return request.get(url, data)
  // },
  // /**
  //  * 添加跟进记录
  //  * @returns {*}
  //  */
  // addFlowList(customer_id = 0, flow_id = 0, record) {
  //   let url = `api/employee/follow-record`
  //   let data = {
  //     customer_id,
  //     flow_id,
  //     record
  //   }
  //   return request.post(url, data)
  // },
  /**
   * 来访记录(10)/api/brand/brand-analysis/visits
   * @returns {*}
   */
  getActionList(shopId = 0, from = 0, limit = 30, page = 0) {
    let url = `/api/brand/brand-analysis/visits` // todo 获取指定员工店铺来访记录
    let data = {
      from,
      limit,
      page
    }
    return request.get(url, data)
  }
}

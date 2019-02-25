import {createPNES, createVitality, createOrderAmount} from '@components/_base-ai-charts/config-line'
import {createGender, createShop, createUser} from '@components/_base-ai-charts/config-pie'
import {createCityTop} from '@components/_base-ai-charts/config-bar'
import {createUserTop6, createUserTop6Detail} from '@components/_base-ai-charts/config-graph'
import {createSEM} from '@components/_base-ai-charts/config-line-sem'
import {createPower} from '@components/_base-ai-charts/config-radar'

export const BASE_CHARTS_HEIGHT = 64.67236467236467 // 折线图高度百分比
export const CHARTS_TYPE = {
  VITALITY: 'VITALITY', // 近7天活跃度
  PNES: 'PNES', // NES动力模型
  GENDER: 'GENDER', // 客户性别占比
  SHOP: 'SHOP', // 兴趣的商品占比
  USER: 'USER', // 用户分组
  CITY_TOP: 'CITY_TOP', // 城市TOP6
  USER_TOP6: 'USER_TOP6', // kol 用户TOP6
  USER_TOP6_DETAIL: 'USER_TOP6_DETAIL', // kol 用户TOP6
  ORDER_AMOUNT: 'ORDER_AMOUNT', // 金额和订单
  SEM_LIST: 'SEM_LIST', // 营销列表缩略图
  POWER: 'POWER'
}
export const CHARTS_CONFIG = {
  [CHARTS_TYPE.PNES]: {
    createOption: createPNES,
    height: BASE_CHARTS_HEIGHT
  },
  [CHARTS_TYPE.VITALITY]: {
    createOption: createVitality,
    height: BASE_CHARTS_HEIGHT
  },
  [CHARTS_TYPE.GENDER]: {
    createOption: createGender
  },
  [CHARTS_TYPE.SHOP]: {
    createOption: createShop
  },
  [CHARTS_TYPE.USER]: {
    createOption: createUser
  },
  [CHARTS_TYPE.CITY_TOP]: {
    createOption: createCityTop
  },
  [CHARTS_TYPE.USER_TOP6]: {
    createOption: createUserTop6,
    height: BASE_CHARTS_HEIGHT
  },
  [CHARTS_TYPE.USER_TOP6_DETAIL]: {
    createOption: createUserTop6Detail,
    styles: `width:100vw;height:100vh;padding:0`
  },
  [CHARTS_TYPE.ORDER_AMOUNT]: {
    createOption: createOrderAmount
  },
  [CHARTS_TYPE.SEM_LIST]: {
    createOption: createSEM,
    height: 61
  },
  [CHARTS_TYPE.POWER]: {
    createOption: createPower,
    height: 61.33333333333333
  }
}

import API from '@api'
import storage from 'storage-controller'
export const state = {
  merchantInfo: {}
}

export const getters = {
  merchantInfo: (state) => state.merchantInfo
}

export const mutations = {
  SET_INFO(state, obj) {
    Object.assign(state.merchantInfo, obj)
  },
  UPDATE_INFO(state, obj) {
    state.merchantInfo = obj
  }
}

export const actions = {
  setMerchant({commit, state}, obj) {
    commit('SET_INFO')
  },
  updateMerchant({commit, state}) {
    if (!storage.has('token')) return
    API.Global.getUserInfo().then((res) => {
      commit('UPDATE_INFO', res.data)
    })
  }
}

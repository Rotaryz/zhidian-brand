export const state = {
  register: []
}

export const getters = {
  register: (state) => {
    return state.register
  }
}

export const actions = {
  updateRegister({commit, state}, obj) {
    commit('UPDATE_REGISTER', obj)
  }
}

export const mutations = {
  UPDATE_REGISTER(state, obj) {
    let flag = state.register.some((val) => val.url === obj.url)
    if (!flag) {
      state.register.push(obj)
    }
  }
}

import {mapState, mapGetters, mapActions} from 'vuex'

export const someComputed = {
  ...mapState('some', {
    currentUser: (state) => state.currentUser
  }),
  ...mapGetters('some', ['constants'])
}

export const someMethods = mapActions('some', ['action1', 'action2'])

export const infoComputed = {
  ...mapGetters('userInfo', ['merchantInfo'])
}

export const infoMethods = {
  ...mapActions('userInfo', ['setMerchantInfo', 'updateMerchant'])
}

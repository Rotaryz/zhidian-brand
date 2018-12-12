import * as userInfoModule from './user-info'

describe('@state/modules/user-info', () => {
  it('exports a valid Vuex module', () => {
    expect(userInfoModule).toBeAVuexModule()
  })
})

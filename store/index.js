const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
    // check if user is logged in
    await dispatch('auth/load', ctx)
    await dispatch('incidents/add')
  },
}

export default {
  actions,
}

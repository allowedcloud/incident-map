const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
    // check if user is logged in
    await dispatch('auth/load', ctx)
    // get incidents from AppSync
    await dispatch('incidents/getIncidents')
  },
}

export default {
  actions,
}

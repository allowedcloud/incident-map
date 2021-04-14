import { API } from 'aws-amplify'
import {listIncidents} from "../src/graphql/queries"


export const state = () => ({
  incidents: [],
  selectedIncident: null
})

export const mutations = {
  setIncidents(state, list) {
    state.incidents = list
  },
  setSelectedIncident(state, id) {
    state.selectedIncident = id
  }
}

export const actions = {
  async add({ commit }) {
    try {
      const list = await API.graphql({ query: listIncidents })

      commit('setIncidents', list.data.listIncidents)

      return Promise.resolve(list)
    } catch (error) {
      return Promise.resolve(null)
    }
  },
  getSelectedIncident({ commit }, id) {
    commit('setSelectedIncident', id)
  }
}

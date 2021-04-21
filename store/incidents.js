import { API } from 'aws-amplify'
import {listIncidents} from "../src/graphql/queries"


export const state = () => ({
  incidents: [],
  sortedIncidents: [],
  selectedIncident: null,
  selectedMarker: null
})

export const mutations = {
  setIncidents(state, list) {
    state.incidents = list
  },
  setSelectedIncident(state, id) {
    state.selectedIncident = id
  },
  setSelectedMarker(state, id) {
    state.selectedMarker = id
  },
  sortIncidents(state) {
    const sorted = state.incidents.items.sort((a, b) => new Date(b.date) - new Date(a.date));
    state.sortedIncidents = sorted
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
  },
  getSelectedMarker({ commit }, id) {
    commit('setSelectedMarker', id)
  }
}

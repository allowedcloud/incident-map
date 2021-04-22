import { API } from 'aws-amplify'
import { listIncidents } from "../src/graphql/queries"
import { createIncident } from "../src/graphql/mutations"


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
  // Get incidents from AppSync
  async getIncidents({ commit }) {
    try {
      const list = await API.graphql({ query: listIncidents })
      commit('setIncidents', list.data.listIncidents)
      return Promise.resolve(list)
    } catch (error) {
      return Promise.resolve(null)
    }
  },
  addIncident({dispatch, commit}, payload) {
    API.graphql({
      query: createIncident,
      variables: {
        input: payload
      }
    })
    dispatch('getIncidents')
  },
  updateIncident() {
    
  },
  deleteIncident() {

  },
  getSelectedIncident({ commit }, id) {
    commit('setSelectedIncident', id)
  },
  getSelectedMarker({ commit }, id) {
    commit('setSelectedMarker', id)
  }
}

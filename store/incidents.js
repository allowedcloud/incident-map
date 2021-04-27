import { API } from "aws-amplify";
import { listIncidents } from "../src/graphql/queries";
import { createIncident } from "../src/graphql/mutations";
import dayjs from "dayjs";

export const state = () => ({
  incidents: [],
  sortedByMonth: [],
  selectedMonth: "",
  selectedIncident: null,
  selectedMarker: null,
});

export const mutations = {
  setIncidents(state, list) {
    const sorted = list.items.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    state.incidents = sorted
    state.sortedByMonth = sorted
  },
  setSelectedIncident(state, id) {
    state.selectedIncident = id;
  },
  setSelectedMarker(state, id) {
    state.selectedMarker = id;
  },
  set(state, payload) {
    state.sortedByMonth = payload
  },
  selectedMonth(state, month) {
    state.selectedMonth = month
  }
};

export const actions = {
  // Get incidents from AppSync
  async getIncidents({ commit }) {
    try {
      const list = await API.graphql({ query: listIncidents });
      commit("setIncidents", list.data.listIncidents);
      return Promise.resolve(list);
    } catch (error) {
      return Promise.resolve(null);
    }
  },
  addIncident({ dispatch }, payload) {
    API.graphql({
      query: createIncident,
      variables: {
        input: payload,
      },
    });
    dispatch("getIncidents");
  },
  updateIncident() {},
  deleteIncident() {},
  getSelectedIncident({ commit }, id) {
    commit("setSelectedIncident", id);
  },
  getSelectedMarker({ commit }, id) {
    commit("setSelectedMarker", id);
  },
  sortByMonth({ state, commit }, month) {
    if (month === "April") {
      const sorted = state.incidents.filter((incident) => dayjs(incident.date).month() == "3")
      commit("set", sorted)
      commit("selectedMonth", month)
    } else if (month === "May") {
      const sorted = state.incidents.filter(
        (incident) => dayjs(incident.date).month() == "4"
      );
      commit("set", sorted)
      commit("selectedMonth", month)
    }
  },
};

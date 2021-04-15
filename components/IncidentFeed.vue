<template>
  <div>
    <div
      v-for="incident in sortedIncidents"
      :key="incident.id"
      class="group incident flex flex-col my-4 w-96 shadow-md rounded-md p-4 hover:border-2 hover:border-yellow-400 cursor-pointer"
      @click="click(incident.id)"
    >
    
      <div class="flex justify-between">
      <div class="font-mono text-gray-400 text-sm">{{ incident.date }}</div>
        <div class="flex flex-nowrap items-center bg-gray-100 incident hover:bg-gray-200 rounded-lg p-1">
          <img src="/external-link.svg" class="w-4 h-4">
        </div>
      </div>
      <div class="text-xl font-bold">{{ incident.title }}</div>
      <div class="text-gray-500 text-sm group-hover:text-yellow-500">{{ incident.state }}</div>
      <div class="text-gray-500">{{ incident.description }}</div>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { listIncidents } from '../src/graphql/queries'
export default {
    data() {
        return {
            incidents: []
        }
    },
    computed: {
      sortedIncidents() {
        const sorted = this.incidents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return sorted
      }
    },
    methods: {
      async getIncidents() {
          const incidents = await API.graphql({
              query: listIncidents
            })
        this.incidents = incidents.data.listIncidents.items
      },
      click(id) {
        this.$store.dispatch('incidents/getSelectedIncident', id)
      }
    },
    mounted() {
      this.getIncidents()
    },
  }
</script>

<style>
.incident {
  border: 1px solid #D1D5DB;
}
</style>

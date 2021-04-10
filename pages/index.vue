<template>
  <div class="flex flex-col h-screen items-center place-content-center">
    <div
      v-for="incident in incidents"
      :key="incident.id"
      class="incident flex flex-col my-4 w-96 shadow-md rounded-md p-4"
    >
      <div class="flex justify-between">
        <div class="font-bold text-lg">{{ incident.title }}</div>
        <div class="font-mono text-gray-400 text-sm">{{ incident.date }}</div>
      </div>
      <div class="text-gray-500 text-sm">{{ incident.state }}</div>
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
    methods: {
      async getIncidents() {
          const incidents = await API.graphql({
              query: listIncidents
            })
          this.incidents = incidents.data.listIncidents.items
        }
    },
    mounted() {
      this.getIncidents()
    }
  }
</script>

<style>
.incident {
  border: 1px solid #D1D5DB;
}
</style>

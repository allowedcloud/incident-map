<template>
  <div class="h-48 md:h-60 lg:h-4/5 overflow-y-scroll p-6">
    <div
      v-for="incident in sortedIncidents"
      :key="incident.id"
      class="group flex flex-col my-4 cursor-pointer"
      @click="click(incident.id)"
    >
      <template v-if="incident.id === selectedMarker">
        <div class="default border-yellow-400">
          <div class="flex justify-between">
            <div class="font-mono text-gray-400 text-sm">
              {{ incident.date }}
            </div>
            <div
              class="flex flex-nowrap items-center bg-yellow-400 rounded-lg p-1"
            >
              <img src="/external-link.svg" class="w-4 h-4" />
            </div>
          </div>
          <div class="text-xl font-bold">{{ incident.title }}</div>
          <div class="text-yellow-500 text-sm">{{ incident.state }}</div>
          <div class="text-gray-500">{{ incident.description }}</div>
        </div>
      </template>
      <template v-else>
        <div class="default hover:border-yellow-400 group">
          <div class="flex justify-between">
            <div class="font-mono text-gray-400 text-sm">
              {{ incident.date }}
            </div>
            <div
              class="flex flex-nowrap items-center bg-gray-100 incident hover:bg-gray-200 rounded-lg p-1"
            >
              <img src="/external-link.svg" class="w-4 h-4" />
            </div>
          </div>
          <div class="text-xl font-bold">{{ incident.title }}</div>
          <div class="text-gray-500 text-sm group-hover:text-yellow-400">
            {{ incident.state }}
          </div>
          <div class="text-gray-500">{{ incident.description }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listIncidents } from "../src/graphql/queries";
export default {
  data() {
    return {
      incidents: [],
      selectedMarker: "",
      selectedIncident: "",
    };
  },
  computed: {
    sortedIncidents() {
      const sorted = this.incidents.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return sorted;
    },
  },
  methods: {
    async getIncidents() {
      const incidents = await API.graphql({
        query: listIncidents,
      });
      this.incidents = incidents.data.listIncidents.items;
    },
    click(id) {
      this.selectedIncident = id;
      this.$store.dispatch("incidents/getSelectedIncident", id);
    },
  },
  mounted() {
    this.getIncidents();

    const unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "incidents/setSelectedMarker") {
        this.selectedMarker = mutation.payload;
      } else {
        this.selectedMarker = this.selectedIncident;
      }
    });
  },
};
</script>

<style>
.default {
  border-width: 1px;
  @apply p-4;
  @apply my-2;
  @apply rounded-lg;
  @apply shadow-md;
}
</style>

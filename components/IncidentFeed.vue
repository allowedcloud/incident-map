<template>
  <div>
    <tabs>
      <tab title="Incidents">
        <div
          id="container"
          class="h-48 md:h-60 incident-container overflow-y-scroll w-full mt-10"
        >
          <div
            v-for="incident in sortedIncidents"
            :key="incident.id"
            :id="incident.id + xxx"
            class="group flex flex-col px-12"
            @click="clickIncident(incident.id)"
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
      </tab>
      <tab title="Date">
        <div class="flex flex-col gap-6 mt-20">
          <h1 class="text-lg font-bold font-mono">2021</h1>
          <div @click="sortByMonth('April')" class="underline text-blue-500 cursor-pointer">April</div>

        </div>
      </tab>
      <tab title="Key">
        <Key />
      </tab>
      <tab title="About">
        <About />
      </tab>
    </tabs>
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
      xxx: "xxx",
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
    clickIncident(id) {
      this.selectedIncident = id;
      this.$router.push({ path: "?id=" + id });
      this.$store.dispatch("incidents/getSelectedIncident", id);
    },
  },
  mounted() {
    this.getIncidents();

    const unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "incidents/setSelectedMarker") {
        this.selectedMarker = mutation.payload;
        const element = document.querySelector(
          `#${CSS.escape(mutation.payload)}xxx`
        );

        function scrollIfNeeded(element, container) {
          if (element.offsetTop < container.scrollTop) {
            container.scrollTop = element.offsetTop;
          } else {
            const offsetBottom = element.offsetTop + element.offsetHeight;
            const scrollBottom = container.scrollTop + container.offsetHeight;

            if (offsetBottom > scrollBottom) {
              container.scrollTop = offsetBottom - container.offsetHeight;
            }
          }
        }

        scrollIfNeeded(element, document.getElementById("container"));
      } else {
        this.selectedMarker = this.selectedIncident;
      }
    });
  },
};
</script>

<style lang="scss">
.incident-container {
  @media (min-width: 1025px) {
    /* height: 770px; */
    height: 88vh;
    width: 100%;
    padding: 25px 0;
  }
}
.icon {
  @apply w-14;
  @apply bg-white;
  @apply rounded-full;
  @apply border-gray-600;
  @apply border-2;
}
.default {
  border-width: 1px;
  @apply p-4;
  @apply my-2;
  @apply rounded-lg;
  @apply shadow-md;
  @apply bg-white;
  @apply cursor-pointer;
}
</style>

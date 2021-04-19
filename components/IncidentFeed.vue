<template>
  <div>
    <div
      id="container"
      class="h-48 md:h-60 incident-container overflow-y-scroll w-full"
    >
      <div
        v-for="incident in sortedIncidents"
        :key="incident.id"
        :id="incident.id + hello"
        class="group flex flex-col px-12"
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
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listIncidents } from "../src/graphql/queries";
import { Tabs, Tab } from "vue-slim-tabs";
export default {
  data() {
    return {
      incidents: [],
      selectedMarker: "",
      selectedIncident: "",
      hello: "hello",
    };
  },
  components: {
    Tabs,
    Tab,
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
      this.$router.push({path: "?id=" + id})
      this.$store.dispatch("incidents/getSelectedIncident", id);
    },
  },
  mounted() {
    this.getIncidents();

    const unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "incidents/setSelectedMarker") {
        this.selectedMarker = mutation.payload;
        const element = document.querySelector(
          `#${CSS.escape(mutation.payload)}hello`
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
@import "../node_modules/vue-slim-tabs/themes/default.css";

.incident-container {
  @apply mt-10;
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

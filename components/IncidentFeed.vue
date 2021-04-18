<template>
  <div>
    <tabs>
      <tab title="Incidents">
        <div
          id="container"
          class="h-48 md:h-60 incident-container overflow-y-scroll px-6"
        >
          <div
            v-for="incident in sortedIncidents"
            :key="incident.id"
            :id="incident.id + hello"
            class="group flex flex-col px-6"
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
      </tab>
      <tab title="Key">
        <div class="flex flex-col items-center mt-16 key">
          <div class="flex items-center">
            <img src="/death.svg" class="icon" />
            <p class="text-2xl font-bold ml-4">Assassination</p>
          </div>
          <div class="flex items-center">
            <img src="/ak.svg" class="icon" />
            <p class="text-2xl font-bold ml-4">Confrontation</p>
          </div>
        </div>
      </tab>
      <tab title="About">
        <div class="flex flex-col items-center mt-16 p-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          rhoncus diam lorem, ut aliquet elit efficitur ac. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Sed et magna porta, suscipit lorem a, ullamcorper libero.
          Curabitur eu velit pharetra, tempor nunc sed, hendrerit sem.
          Pellentesque urna augue, aliquet sed mauris id, blandit luctus sem.
          Pellentesque pellentesque, justo nec mattis mollis, velit arcu
          tincidunt diam, a imperdiet justo mauris ut libero. Morbi tincidunt
          felis vel orci porta hendrerit.
        </div>
      </tab>
    </tabs>
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

        console.log(mutation.payload);
        console.log(element);
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
    height: 770px;
  }
}

.icon {
  @apply w-14;
  @apply bg-white;
  @apply rounded-full;
  @apply border-gray-600;
  @apply border-2;
}
.key {
  grid-gap: 2em;
  gap: 2em;
}
.vue-tab {
  background-color: transparent;
  @apply font-bold;
  @apply underline;

  border: 0;
}

.vue-tablist {
  @apply text-gray-400;

  li {
    @apply px-4;
  }
  li[aria-selected="true"] {
    @apply text-yellow-400;
  }
  border: 0px;
  @apply absolute;
  @apply right-2;
  @apply top-0;
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

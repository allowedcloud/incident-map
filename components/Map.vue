<template>
  <div id="map" class="overflow-hidden h-96 lg:h-full"></div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Map",
  data() {
    return {
      map: null,
      markers: [],
      selectedMarker: "",
    };
  },
  computed: {
    list() {
      return this.$store.state.incidents.incidents;
    },
  },
  mounted() {
    const mapboxgl = require("mapbox-gl");

    // Create map
    this.map = new mapboxgl.Map({
      accessToken: process.env.mapboxToken,
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-99.133209, 19.432608],
      zoom: 5,
      maxZoom: 12,
      minZoom: 5
    });

    // Create markers
    this.markers = this.list.map((incident) => {
      // Assign latitude and longitude
      const LngLat = [incident.long, incident.lat];
      // Create popup
      let popup = `
        <div class="m-4">
          <h3 class="text-xl font-bold leading-tight mt-8 text-gray-800 dark:text-white">${incident.title}</h3>
          <div class="flex flex-row flex-nowrap my-2">
          <p class="text-xs text-gray-600 dark:text-gray-100 font-mono mr-3">${
            incident.date
          }</p>
         <p class="flex flex-row flex-nowrap text-yellow-400 text-xs font-mono">${String(
            incident.lat
         ).slice(0, 5)}, ${String(incident.long).slice(0, 7)}</p>
        </div>
          <p class="text-sm text-gray-500 dark:text-gray-200 leading-tight">${incident.description}</p>
        </div>
      `;

      // Create map markers
      const element = document.createElement("div");
      element.className = "marker";
      
      // Choose marker icon
      if (incident.type === "Confrontation") {
        element.style.backgroundImage = "url(/ak.svg)";
      } else if (incident.type === "Homicide") {
        element.style.backgroundImage = "url(/homicide.svg)";
      } else if (incident.type === "Drug Trafficking") {
        element.style.backgroundImage = "url(/drugs.svg)";
      } else if (incident.type === "Apprehension") {
        element.style.backgroundImage = "url(/handcuffs.svg)";
      } else if (incident.type === "Kidnapping") {
        element.style.backgroundImage = "url(/kidnapping.svg)";
      } else if (incident.type === "Narco-message") {
        element.style.backgroundImage = "url(/narco-message.svg)";
      } else if (incident.type === "Military") {
        element.style.backgroundImage = "url(/jeep.svg)";
      } else if (incident.type === "Recorded video") {
        element.style.backgroundImage = "url(/video-message.svg)"
      }

      element.style.width = "30px";
      element.style.height = "30px";
      element.classList.add(
        "bg-white",
        "rounded-full",
        "m-1",
        "border-2",
        "border-gray-700",
        "bg-contain",
      );

      // Click marker
      element.addEventListener("click", (e) => {
        // Close all popups to allow new selected marker to hide
        this.closeAllPopups()
        // Remove hidden to show previously selected marker after clicking a new one
        if (this.selectedMarker) {
          this.selectedMarker.classList.remove("hidden");
        }
        // Set new marker to selected marker
        this.selectedMarker = e.target;
        this.selectedMarker.id = incident.id;
        // Send selected marker id to feed for highlighting
        this.$store.dispatch(
          "incidents/getSelectedMarker",
          this.selectedMarker.id
        );
        // Hide new marker
        this.selectedMarker.classList.add("hidden");
        // Fly map window over to new marker location
        this.map.flyTo({ center: LngLat, speed: 0.5, zoom: 6 });
      });

      // Initialize popup element
      const popupElement = new mapboxgl.Popup({
        offset: 0,
        anchor: "bottom",
      }).setHTML(popup);

      // Unhide marker when closing popup
      popupElement.on("close", () => {
        if (this.selectedMarker) {
          this.selectedMarker.classList.remove("hidden");
        }
      });
      
      // Initialize map
      const marker = new mapboxgl.Marker({ element })
        .setLngLat(LngLat)
        .setPopup(popupElement)
        .addTo(this.map);
      
      // Add incident date to marker object
      marker.date = incident.date;
      // Add incident ID to marker object
      marker.id = incident.id;
      return marker;
    });
    this.$store.subscribe((mutation) => {
      if (mutation.type == "incidents/setSelectedIncident") {
        const id = mutation.payload;
        const marker = this.markers.find((marker) => marker.id === id);
        this.map.flyTo({ center: marker.getLngLat(), speed: 0.5, zoom: 6 });

        this.markers.forEach((marker) => {
          const popup = marker.getPopup();
          if (popup.isOpen()) {
            marker.togglePopup();
            marker._element.classList.remove("hidden");
          }
          popup.on("close", () => {
            marker._element.classList.remove("hidden")
          })
        });

        marker.togglePopup();
        marker._element.classList.add("hidden");
      }
    });
    this.$store.subscribeAction((action) => {
      if (action.type == "incidents/getIncidents") {
        // Reset button
        this.showAllMarkers()
        this.$store.commit("incidents/selectedMonth", "total")
        this.map.flyTo({
          center: [-99.133209, 19.432608],
          zoom: 5,
        })
      }
      if (action.type == "incidents/sortByMonth") {
        const month = action.payload;
        if (month === "May") {
          this.closeAllPopups();
          this.selectedMarker = ""
          this.markers.forEach((marker) => {
            if (dayjs(marker.date).month() !== 4) {
              marker._element.classList.add("hidden");
            } else {
              marker._element.classList.remove("hidden");
            }
          });
        } else if (month === "June") {
          this.closeAllPopups();
          this.selectedMarker = ""
          this.markers.forEach((marker) => {
            if (dayjs(marker.date).month() !== 5) {
              marker._element.classList.add("hidden");
            } else {
              marker._element.classList.remove("hidden");
            }
          });
        }
      }
    });
  },
  methods: {
    closeAllPopups() {
      this.markers.forEach((marker) => {
        const popup = marker.getPopup();
        if (popup.isOpen()) {
          marker.togglePopup();
        }
      });
    },
    showAllMarkers() {
      this.markers.forEach((marker) => {
        marker._element.classList.remove("hidden");
        const popup = marker.getPopup();
        if (popup.isOpen()) {
          marker.togglePopup();
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "../node_modules/mapbox-gl/dist/mapbox-gl.css";

#map {
  @apply rounded-tr-2xl;
  @media (min-width: 1025px) {
    min-height: 100vh;
  }
  @media (max-width: 768px) {
    min-height: 65vh;
  }
}

*:focus {
  outline: none;
}
button:focus {
  outline: none;
}
.mapboxgl-popup {
  will-change: auto;
  min-width: 300px;
  max-width: 400px;
}
.mapboxgl-popup-content {
  @apply bg-gray-50;
  @apply dark:bg-gray-700;
  @apply px-6;
  @apply pb-6;
  @apply leading-snug;
  @apply text-lg;
  @apply rounded-lg;
}
.mapboxgl-popup-close-button {
  @apply text-3xl;
  @apply mt-2;
  @apply mr-4;
  @apply text-gray-600;
  @apply dark:text-gray-100;

  &:hover {
    @apply bg-gray-50;
  }
}
.mapboxgl-popup-tip {
  border: 2rem solid transparent;
  margin-top: -2px;
}
.mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
  border-bottom-color: #F9FAFB;
  @apply dark:border-gray-700;
}
.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
  border-top-color: #F9FAFB;
}

.dark-mode .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
  border-top-color: #374151;
}

.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
  border-right-color: #F9FAFB;
  @apply dark:border-gray-700;
}
.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
  border-left-color: #F9FAFB;
  @apply dark:border-gray-700;
}
</style>

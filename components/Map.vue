<template>
  <div id="map" class="overflow-hidden h-96 lg:h-full"></div>
</template>

<script>
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
      return this.$store.state.incidents.sortedIncidents;
    },
  },
  mounted() {
    const mapboxgl = require("mapbox-gl");

    this.map = new mapboxgl.Map({
      accessToken: process.env.mapboxToken,
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-99.133209, 19.432608],
      zoom: 5,
    });

    this.markers = this.list.map((incident) => {
      const LngLat = [incident.long, incident.lat];
      const lat = String(incident.lat).slice(0, 5);
      const long = String(incident.long).slice(0, 6);
      let popup = `
        <div class="m-4">
          <p class="text-xs uppercase text-gray-500 font-bold">${incident.state}</p>
          <p class="text-xs uppercase text-gray-400 font-bold mb-8">${incident.date}</p>
          <h3 class="font-bold">${incident.title}</h3>
          <p class="flex flex-row flex-nowrap text-red-500 text-xs font-mono font-bold">${lat}, ${long}</p>
          <p class="text-sm text-gray-200">${incident.description}</p>
        </div>
      `;

      const element = document.createElement("div");
      element.className = "marker";

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
        element.style.backgroundImage = "url(/jeep.svg)"
      }

      element.style.width = "40px";
      element.style.height = "40px";
      element.classList.add(
        "bg-white",
        "rounded-full",
        "m-1",
        "border-2",
        "border-gray-600",
        "bg-contain"
      );
      element.addEventListener("click", (e) => {
        if (this.selectedMarker) {
          this.selectedMarker.classList.remove("hidden");
        }
        this.selectedMarker = e.target;
        this.selectedMarker.id = incident.id;
        this.$store.dispatch(
          "incidents/getSelectedMarker",
          this.selectedMarker.id
        );
        this.selectedMarker.classList.add("hidden");
        this.map.flyTo({ center: LngLat, speed: 0.5, zoom: 6 });
      });

      const popupElement = new mapboxgl.Popup({
        offset: 0,
        anchor: "bottom",
      }).setHTML(popup);

      popupElement.on("close", () => {
        if (this.selectedMarker) {
          this.selectedMarker.classList.remove("hidden");
        }
      });

      const marker = new mapboxgl.Marker({ element })
        .setLngLat(LngLat)
        .setPopup(popupElement)
        .addTo(this.map);

      marker.id = incident.id;
      return marker;
    });
    const unsubscribe = this.$store.subscribe((mutation) => {
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
        });

        marker.togglePopup();
        marker._element.classList.add("hidden");
      }
    });
  },
  methods: {},
};
</script>

<style>
@import "../node_modules/mapbox-gl/dist/mapbox-gl.css";

#map {
  @media (min-width: 1025px) {
    min-height: 89vh;
  }
  @media (max-width: 768px) {
    min-height: 65vh;
  }
  @apply rounded-lg;
  border-width: 1px;
  @apply border-gray-900;
}

*:focus {
  outline: none;
}
button:focus {
  outline: none;
}
.mapboxgl-popup {
  will-change: auto;
  min-width: 200px;
  max-width: 300px;
}
.mapboxgl-popup-content {
  @apply text-white bg-gray-800 px-6 pb-6 leading-snug text-lg rounded-lg;
}
.mapboxgl-popup-close-button {
  @apply text-3xl mt-2 mr-4;
}
.mapboxgl-popup-tip {
  border: 2rem solid transparent;
  margin-top: -2px;
}
.mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
  border-bottom-color: #1f2937;
}
.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
  border-top-color: #1f2937;
}
.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
  border-right-color: #1f2937;
}
.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
  border-left-color: #1f2937;
}
</style>

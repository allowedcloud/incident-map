<template>
  <div id="map" class="h-full m-2 rounded-lg"></div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      map: null,
      markers: [],
      selectedMarker: null,
    };
  },
  computed: {
    list() {
      return this.$store.state.incidents;
    }
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

    this.markers = this.list.incidents.items.map((incident) => {
      const LngLat = [incident.long, incident.lat];

      let popup = `
        <div class="m-4">
          <h3 class="font-bold">${incident.title}</h3>
          <p>${incident.state}</p>
        </div>
      `;

      const element = document.createElement("div");
      element.className = "marker";
      element.style.backgroundImage = "url('/Pin.svg')";
      element.style.width = "70px";
      element.style.height = "70px";
      element.addEventListener("click", (e) => {
        if (this.selectedMarker) {
          this.selectedMarker.classList.remove("hidden");
        }
        this.selectedMarker = e.target;
        this.selectedMarker.classList.add("hidden");
        this.map.flyTo({ center: LngLat, speed: 0.5 });
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
  },
  methods: {
  },
};
</script>

<style>
@import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
</style>

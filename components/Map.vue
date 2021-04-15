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
      element.style.backgroundImage = "url('/pin.svg')";
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
    const unsubscribe = this.$store.subscribe((mutation, state) => {
      const id = mutation.payload
      const marker = this.markers.find((marker) => marker.id === id)
      marker._element.classList.add("hidden")
      this.markers.forEach((marker) => {
        const popup = marker.getPopup()
        if (popup.isOpen()) {
          marker.togglePopup()
          marker._element.classList.remove("hidden")
        }
      })
      this.map.flyTo({ center: marker.getLngLat(), speed: 0.5, zoom: 6 })
      marker.togglePopup()
    })
  },
  methods: {
  },
};
</script>

<style>
@import "../node_modules/mapbox-gl/dist/mapbox-gl.css";

*:focus {
  outline: none;
}
button:focus {
  outline: none
}
.mapboxgl-popup {
  will-change: auto;
  min-width: 200px;
  max-width: 300px;
}
.mapboxgl-popup-content {
  @apply text-white bg-black rounded-none pt-16 px-6 pb-12 leading-snug text-lg;
}
.mapboxgl-popup-close-button {
  @apply text-3xl mt-2 mr-4;
}
.mapboxgl-popup-tip {
  border: 2rem solid transparent;
}
.mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
  border-bottom-color: black;
}
.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
  border-top-color: black;
}
.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
  border-right-color: black;
}
.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
  border-left-color: black;
}

</style>

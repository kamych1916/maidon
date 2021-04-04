<template>
  <div>
    <yandex-map
      :controls="['zoomControl']"
      :scroll-zoom="true"
      zoom="15"
      :clusterOptions="{}"
      :coords="coords"
      @click="onClick"
    >
      <ymap-marker marker-id="123" :coords="coords"></ymap-marker>
    </yandex-map>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
import VueGeolocation from "vue-browser-geolocation";
export default {
  props: ["mapCoords"],
  watch: {
    mapCoords: function(theData) {
      if (theData) {
        this.coords = theData;
      }
    }
  },
  data() {
    return {
      coords: []
    };
  },
  created() {
    this.getGEO();
  },
  methods: {
    onClick(e) {
      this.coords = e.get("coords");
      let serverCoords = {
        x: this.coords[0],
        y: this.coords[1]
      };
      Api.getInstance()
        .offer.get_address(serverCoords)
        .then(response => {
          this.$emit("onClickMap", {
            map_address: response.data.map_address
          });
        });
    },
    getGEO() {
      VueGeolocation.getLocation().then(coordinates => {
        this.coords = [coordinates.lat, coordinates.lng];
      });
    }
  }
};
</script>
<style>
.ymap-container {
  height: 300px;
  width: 100%;
}
</style>

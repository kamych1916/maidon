<template>
  <client-only>
    <div>
      <yandex-map
        :controls="['zoomControl']"
        :scroll-zoom="true"
        :zoom="zoom"
        :clusterOptions="{}"
        :coords="coords"
        @click="get_address"
      >
        <ymap-marker marker-id="123" :coords="coords"></ymap-marker>
      </yandex-map>
    </div>
  </client-only>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
// import VueGeolocation from "vue-browser-geolocation";
export default {
  props: ["mapCoords"],
  watch: {
    mapCoords: function(theData) {
      if (theData) {
        this.coords = theData;
        this.zoom = 16;
      }
    }
  },
  data() {
    return {
      coords: [38.58088224121, 68.78626802802049],
      zoom: 12
    };
  },
  created() {
    // this.getGEO();
  },
  methods: {
    get_address(e) {
      this.coords = e.get("coords");
      this.zoom = 16;
      let serverCoords = {
        x: this.coords[0],
        y: this.coords[1]
      };
      Api.getInstance()
        .offer.get_address(serverCoords)
        .then(response => {
          this.$emit("onClickMap", {
            map_address: response.data.map_address,
            map_marker: this.coords
          });
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    }
    // getGEO() {
    // VueGeolocation.getLocation()
    //   .then(coordinates => {
    //     this.coords = [coordinates.lat, coordinates.lng];
    //   })
    //   .catch(error => {
    //     console.log("getLocation -> ", error);
    //   });
    // }
  }
};
</script>
<style>
.ymap-container {
  height: 300px;
  width: 100%;
}
</style>

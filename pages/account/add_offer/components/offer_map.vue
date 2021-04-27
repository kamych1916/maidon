<template>
  <client-only>
    <div>
      <yandex-map
        :controls="['zoomControl']"
        :scroll-zoom="true"
        :zoom="staticZoom ? 17 : zoom"
        :clusterOptions="{}"
        :coords="mapCoords.length > 0 ? mapCoords : coords"
        @click="get_address"
      >
        <ymap-marker
          marker-id="123"
          :coords="mapCoords.length > 0 ? mapCoords : coords"
        ></ymap-marker>
      </yandex-map>
    </div>
  </client-only>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
// import VueGeolocation from "vue-browser-geolocation";
export default {
  props: {
    mapCoords: {
      type: Array,
      required: false,
      default: [38.58088224121, 68.78626802802049]
    },
    isStatic: {
      type: Boolean,
      required: false,
      default: false
    },
    staticZoom: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    mapCoords: function(data) {
      if (data) {
        this.coords = data;
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
      if (!this.isStatic) {
        this.coords = e.get("coords");
        this.zoom = 17;
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

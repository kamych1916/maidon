<template>
  <client-only>
    <div>
      <yandex-map
        :controls="['zoomControl']"
        :cluster-options="clusterOptions"
        :coords="
          mapCoords === null
            ? markerCoords || mapMarkers[0].markers
            : mapCoords.length > 0
            ? mapCoords
            : coords
        "
        @click="get_address"
        :show-all-markers="isListMarkers ? true : false"
        :zoom="staticZoom ? 17 : zoom"
      >
        <div v-if="mapMarkers">
          <div v-if="mapMarkers.length > 0">
            <div v-for="(item, idx) in mapMarkers" :key="idx">
              <ymap-marker
                cluster-name="listMap"
                :marker-id="idx"
                :coords="item.markers"
                @click="openOfferCard(item)"
              ></ymap-marker>
            </div>
          </div>
          <!-- :coords="uploadCoords(item.markers)" -->
          <!-- :coords="(item.markers, (coords = item.markers))" -->
        </div>
        <ymap-marker
          v-else
          marker-id="123"
          :coords="mapCoords.length > 0 ? mapCoords : coords"
        ></ymap-marker>
      </yandex-map>
    </div>
  </client-only>
</template>

<script>
import Api from "~/utils/api";
// import NTFS from "~/utils/notifications";
// import VueGeolocation from "vue-browser-geolocation";
export default {
  props: {
    mapCoords: {
      type: null,
      required: false,
      default: null
    },
    staticZoom: {
      type: Boolean,
      required: false,
      default: false
    },
    isListMarkers: {
      type: Boolean,
      required: false,
      default: false
    },
    mapMarkers: {
      type: null,
      required: false,
      default: null
    }
  },
  watch: {
    mapCoords: function(data) {
      if (data) {
        this.coords = typeof data === "object" ? data.markers : data;
        this.zoom = 16;
      }
    }
  },
  data() {
    return {
      // coords: [],
      markerCoords: null,
      coords: [38.58088224121, 68.78626802802049],
      zoom: 12,
      clusterOptions: {
        1: {
          clusterDisableClickZoom: true,
          clusterOpenBalloonOnClick: true,
          clusterBalloonLayout: [
            "<ul class=list>",
            "{% for geoObject in properties.geoObjects %}",
            '<li><a href=# class="list_item">{{ geoObject.properties.balloonContentHeader|raw }}</a></li>',
            "{% endfor %}",
            "</ul>"
          ].join("")
        }
      }
    };
  },
  created() {
    // this.getGEO();
  },
  methods: {
    // uploadCoords(data) {
    //   this.coords = this.mapMarkers;
    //   return data;
    // },
    openOfferCard(data) {
      this.markerCoords = data.markers;
      this.$emit("openOfferCard", {
        id: data.id
      });
    },
    get_address(e) {
      if (!this.staticZoom) {
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

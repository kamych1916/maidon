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
import VueGeolocation from "vue-browser-geolocation";
export default {
  data: () => ({
    coords: []
    // markerIcon: {
    //   layout: "default#imageWithContent",
    //   imageHref:
    //     "https://lh3.googleusercontent.com/proxy/dzLifAs_TtVhPoio7NArpPffMjuD2vClCqrb9u5Wv7WCpC3iPKQNwWi_86XK4cFxTcRPu7RUnA8TDiWNV2e4IEnVKptlVv7dov26fEsWGz26_2o3t1xP1esHRkpcIihaXRtiEc5DFX7U",
    //   imageSize: [45, 45],
    //   imageOffset: [0, -35],
    //   content: "Сели поели", // содержимое контента
    //   contentOffset: [-0, -35], // смещение контента в px,
    //   contentLayout:
    //     '<h1 style="background: red; width: 150px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</h1>'
    // }
  }),
  created() {
    this.getGEO();
  },
  methods: {
    bindListener() {
      this.coords = [38.791778249471335, 71.52481068749965];
    },
    onClick(e) {
      this.coords = e.get("coords");
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

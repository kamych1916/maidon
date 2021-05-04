<template>
  <div>
    <div class="card-wrap" style="postion: relative">
      <div v-if="mapMarkers.length > 0" class="all-offers">
        <!-- <div class="show-markers"></div> -->
        <!-- <OfferMap :mapCoords="[38.58088224121, 68.78626802802049]"></OfferMap> -->
        <client-only>
          <!-- :mapCoords="getMarkers('coords')" -->
          <OfferMap
            :mapMarkers="mapMarkers"
            :isListMarkers="true"
            @openOfferCard="showOpenCard"
          ></OfferMap>
        </client-only>
      </div>
    </div>

    <div ref="offerCard" class="mb-100">
      <div class="card-wrap" v-if="offerMapData">
        <LazyOfferListCard :offerData="offerMapData" />
      </div>
      <LazyEmptyCat
        v-else
        title="Кликните на метку на карте выше, чтобы отобразилось объявление"
      />
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import OfferMap from "@/pages/account/add_offer/components/offer_map.vue";

export default {
  components: {
    OfferMap
  },
  data: function() {
    return {
      mapMarkers: [],
      offerMapData: null
    };
  },
  mounted() {
    this.get_markers();
  },

  methods: {
    get_markers() {
      Api.getInstance()
        .offer.get_markers()
        .then(response => {
          response.data.forEach(element => {
            this.mapMarkers.push({ markers: element.marker, id: element.id });
          });
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },
    showOpenCard(data) {
      Api.getInstance()
        .offer.get_map_offer(data.id)
        .then(response => {
          this.offerMapData = response.data;
          console.log(this.offerMapData);
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
      this.$refs.offerCard.scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>

<style>
.all-offers .ymap-container {
  /* height: calc(90vh - 100px); */
  height: calc(90vh - 100px);
  width: 100%;
}
</style>

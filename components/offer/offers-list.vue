<template>
  <div v-if="offerData">
    <div v-if="offerData.list_offers.length > 0">
      <div v-if="!isMapShow">
        <div
          class="card-wrap offer"
          v-for="(item, index) in offerData.list_offers"
          :key="index"
        >
          <LazyOfferListCard :offerData="item" />
        </div>
        <div class="mb-50 d-flex justify-content-center" v-if="offerData.pages">
          <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :total="offerData.pages"
            :page-size="1"
          ></el-pagination>
        </div>
      </div>
      <div v-else>
        <div class="card-wrap">
          <client-only>
            <!-- :mapCoords="getMarkers('coords')" -->
            <OfferMap
              :mapMarkers="getMarkers()"
              :isListMarkers="isListMarkers"
              @openOfferCard="showOpenCard"
            ></OfferMap>
          </client-only>
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
    </div>
    <EmptyCat v-else />
  </div>
</template>

<script>
import OfferMap from "@/pages/account/add_offer/components/offer_map.vue";

export default {
  props: {
    offerData: {
      type: Object,
      required: false,
      default: Object
    },
    isMapShow: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    OfferMap
  },
  data() {
    return {
      isListMarkers: true,
      offerMapData: null
    };
  },
  methods: {
    getMarkers(data) {
      let mapMarkers = [];
      if (this.offerData) {
        for (let item of this.offerData.list_offers) {
          mapMarkers.push({ markers: item.map_marker, id: item.id });
        }
      }
      if (mapMarkers.length < 2) {
        this.isListMarkers = false;
      }
      if (data === "coords") {
        return mapMarkers[0];
      } else {
        return mapMarkers;
      }
    },
    handleCurrentChange(val) {
      let queryData = {};
      queryData.page = val;
      this.$router.push({ query: queryData });
    },
    showOpenCard(data) {
      this.offerData.list_offers.forEach(element => {
        if (element.id == data.id) {
          this.offerMapData = element;
        }
      });
      this.$refs.offerCard.scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>

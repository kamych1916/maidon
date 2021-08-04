<template>
  <div class="container">
    <div class="card-wrap">
      <div>
        <Breadcrumbs />
      </div>
      <div>
        <OfferSearch
          @uploadOffers="uploadOffers"
          @openMap="openMap"
          :title="title"
        />
      </div>
    </div>
    <div>
      <OffersList :offerData="offerData" :isMapShow="isMapShow" />
    </div>
  </div>
</template>

<script>
// import { goToTop } from "~/utils/goToTop";
import { search } from "~/utils/search";
// import axios from "axios";
export default {
  // async asyncData({ route }) {
  //   let filtersData;
  //   let routeData = {
  //     deal: route.path.split("/")[1],
  //     kind: route.path.split("/")[2],
  //     ...route.query,
  //   };
  //   console.log(routeData);
  //   return axios
  //     .post(`https://maidon.tj/server/api/v1/get_filter_offers`, routeData)
  //     .then((response) => {
  //       filtersData = response.data;
  //       console.log(filtersData);
  //       return { filtersData };
  //     });
  // },
  // scrollToTop: true,
  head() {
    return {
      title: this.title,
    };
  },
  mixins: [search],
  data() {
    return {
      isMapShow: false,
      param: this.$route.params.realtyType,
      title: null,
      offerData: null,
    };
  },
  methods: {
    openMap(item) {
      this.isMapShow = item.data;
    },
    uploadOffers(list) {
      this.offerData = list.data;
    },
  },
};
</script>

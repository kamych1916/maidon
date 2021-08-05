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
import { search } from "~/utils/search";
export default {
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

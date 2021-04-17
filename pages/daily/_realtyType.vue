<template>
  <div>
    <div class="card-wrap">
      <div>
        <Breadcrumbs />
      </div>
      <div><Search @uploadOffers="uploadOffers" :title="title" /></div>
    </div>
    <div>
      <OffersList :offerData="offerData" />
    </div>
  </div>
</template>

<script>
import { search } from "~/utils/search";
export default {
  mixins: [search],
  data() {
    return {
      param: this.$route.params.realtyType,
      title: null,
      offerData: null
    };
  },
  methods: {
    uploadOffers(data) {
      this.offerData = data.offersList;
    }
  }
};
</script>

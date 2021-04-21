<template>
  <div>
    <div class="card-wrap">
      <div>
        <Breadcrumbs />
      </div>
      <div><OfferSearch @uploadOffers="uploadOffers" :title="title" /></div>
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
    uploadOffers(list) {
      this.offerData = list.data;
    }
  }
};
</script>

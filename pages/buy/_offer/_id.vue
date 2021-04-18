<template>
  <div>
    <div class="card-wrap" v-if="offerData">
      <div>
        <Breadcrumbs :offerTitle="offerData.title" />
      </div>
      <div class="mt-30">
        {{ offerData }}
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";

export default {
  data() {
    return {
      offerId: this.$route.params.id,
      offerData: null
    };
  },
  mounted() {
    if (this.offerId) {
      Api.getInstance()
        .offer.get_offer(this.offerId)
        .then(response => {
          this.offerData = response.data;
          console.log(this.offerData);
        });
    }
  }
};
</script>

<style></style>

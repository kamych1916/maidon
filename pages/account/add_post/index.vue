<template>
  <div class="pb-100">
    <OfferTypes @checkOfferTypes="checkOfferTypes"></OfferTypes>
    <div ref="inputs">
      <div class="card-wrap mt-50">
        <div class="form-group">
          <label><h4>Адрес</h4></label>
          <el-input
            v-model="offerData.address"
            suffix-icon="bi bi-geo-alt-fill"
            name="address"
            required
            type="text"
            placeholder="Укажите адрес или название улицы"
          ></el-input>
        </div>
        <ymap class="mt-24"></ymap>
      </div>
    </div>
  </div>
</template>

<script>
import OfferTypes from "@/pages/account/add_post/components/offer_types.vue";
export default {
  components: {
    OfferTypes
  },
  data() {
    return {
      offerData: {
        address: null
      },
      showFroms: null
    };
  },
  methods: {
    checkOfferTypes(data) {
      if (data.picked_kind !== null && data.picked_type !== null) {
        this.showFroms = true;
        this.$refs.inputs.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
};
</script>

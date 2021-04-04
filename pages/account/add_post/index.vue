<template>
  <div class="pb-100 pt-50">
    <OfferTypes @checkOfferTypes="checkOfferTypes"></OfferTypes>
    <form @submit.prevent="onSubmit()">
      <div ref="inputs">
        <div class="card-wrap mt-50">
          <div class="form-group">
            <h4>Адрес</h4>
            <el-autocomplete
              :fetch-suggestions="getMarker"
              v-model="offerData.map_address"
              class="mt-14 mb-26 w-100"
              suffix-icon="bi bi-geo-alt-fill"
              name="address"
              required
              type="text"
              placeholder="Укажите адрес"
            ></el-autocomplete>
          </div>
          <client-only>
            <OfferMap @onClickMap="onClickMap" :mapCoords="coords"></OfferMap>
          </client-only>
        </div>
        <div class="row">
          <div class="col-md-6 mt-30">
            <OfferInfo
              v-if="!(Object.keys(offerData.offer_info).length === 0)"
              :value="offerData.offer_info"
              @input="
                newData => {
                  offerData.offer_info = newData;
                }
              "
            >
            </OfferInfo>
            <!-- <button
              class="el-button el-button--primary is-round py-14 w-100"
              type="submit"
            >
              Войти
            </button> -->
          </div>
        </div>

        <div class="col-md-6"></div>
      </div>
    </form>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
import OfferTypes from "@/pages/account/add_post/components/offer_types.vue";
import OfferMap from "@/pages/account/add_post/components/offer_map.vue";
import OfferInfo from "@/pages/account/add_post/components/offer_info.vue";
export default {
  components: {
    OfferTypes,
    OfferMap,
    OfferInfo
  },
  data() {
    return {
      offerData: {
        map_address: null,
        offer_info: {}
      },
      showFroms: null,
      coords: []
    };
  },
  methods: {
    onSubmit() {
      console.log("kek");
    },
    getMarker(queryString, cb) {
      if (queryString !== null && queryString !== "") {
        Api.getInstance()
          .offer.get_marker({
            map_address: queryString
          })
          .then(response => {
            this.coords = response.data[0].coords;
            let results = queryString ? response.data : "";
            cb(results);
          });
      }
    },
    onClickMap(data) {
      this.offerData.map_address = data.map_address;
    },
    checkOfferTypes(data) {
      // console.log(OfferSellApartData.data().aboutData);
      this.offerData.map_address = null;
      let picked_object =
        data.picked_object_commercy || data.picked_object_living;
      if (
        data.picked_account !== null &&
        data.picked_deal !== null &&
        data.picked_estate !== null &&
        picked_object
      ) {
        this.showFroms = true;
        this.$refs.inputs.scrollIntoView({ behavior: "smooth" });
      }
      // OwnerSellLivingApart
      if (
        data.picked_account == "owner" &&
        data.picked_deal == "sell" &&
        data.picked_estate == "living" &&
        data.picked_object_living == "apartment"
      ) {
        this.offerData.offer_info = {
          area: null,
          rooms: null,
          floor: 1,
          floorsHouse: 1,
          building_type: "newBuilding",
          building_renovation: "cosmetic"
        };
      }
    }
  }
};
</script>

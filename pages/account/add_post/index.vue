<template>
  <div class="pb-100 pt-50">
    <OfferTypes @checkOfferTypes="checkOfferTypes"></OfferTypes>
    <form @submit.prevent="onSubmit()">
      <div ref="inputs">
        <div class="row mx-0">
          <div class="card-wrap w-100 mt-50">
            <div class="form-group">
              <h4>Адрес</h4>
              <el-autocomplete
                :fetch-suggestions="getMarker"
                v-model="offerData.offerMap.map_address"
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
        </div>
        <div v-if="true">
          <div class="row">
            <div class="col-md-6 mt-30">
              <OfferObject
                :offerObject="offerData.offerObject"
                @input="
                  newData => {
                    offerData.offerObject = newData;
                  }
                "
              >
              </OfferObject>
            </div>
            <div class="col-md-6 mt-30">
              <OfferPrice
                :offerPrice="offerData.offerPrice"
                @input="
                  newData => {
                    offerData.offerPrice = newData;
                  }
                "
              >
              </OfferPrice>
            </div>
          </div>
          <div class="row mt-30">
            <div class="col">
              <div class="card-wrap">
                <h4 draggable="true">Планировка и фотографии</h4>
                <draggable
                  :list="list"
                  :disabled="!enabled"
                  class="row"
                  ghost-class="ghost"
                  :move="checkMove"
                  @start="dragging = true"
                  @end="dragging = false"
                  :animation="400"
                >
                  <div
                    class="col-md-3 my-20 "
                    v-for="(element, index) in list"
                    :key="element.name"
                  >
                    <div :class="[index === 0 ? 'main' : '', 'box-photo']">
                      {{ element.name }}
                    </div>
                  </div>
                  <div
                    slot="footer"
                    role="group"
                    aria-label="Basic example"
                    key="footer"
                    class="box-upload my-20 d-flex align-items-center justify-content-center"
                    @click="checkMove()"
                  >
                    добавить фото
                  </div>
                </draggable>
              </div>
            </div>
          </div>
          <div class="row mt-30">
            <div class="col">
              <div class="card-wrap">
                <h4>Условия размещения</h4>
              </div>
            </div>
          </div>
          <button
            class="el-button el-button--primary is-round py-14 w-100 mt-30"
            type="submit"
          >
            Разместить объявление
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
import Helper from "~/pages/account/add_post/mixins/offer_helper.js";
import OfferTypes from "@/pages/account/add_post/components/offer_types.vue";
import OfferMap from "@/pages/account/add_post/components/offer_map.vue";
import OfferObject from "@/pages/account/add_post/components/offer_object.vue";
import OfferPrice from "@/pages/account/add_post/components/offer_price.vue";
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
    OfferTypes,
    OfferMap,
    OfferObject,
    OfferPrice
  },

  data() {
    return {
      offerData: {
        offerType: null,
        offerMap: {
          map_address: null,
          map_marker: null
        },
        offerObject: {},
        offerPrice: {}
      },
      coords: [],
      accessToForm: false,

      enabled: true,
      list: [
        { name: "Dima", id: 0 },
        { name: "Kamol", id: 1 },
        { name: "Tiet", id: 2 },
        { name: "Pasha", id: 3 },
        { name: "Nekit", id: 4 },
        { name: "Dasha", id: 5 },
        { name: "Vanya", id: 6 }
      ],
      dragging: false
    };
  },
  methods: {
    checkMove: function(e) {
      //   window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
    onSubmit() {
      Api.getInstance()
        .offer.send_offer_data(this.offerData)
        .then(response => {
          console.log("всё гуд -> ", response);
        });
    },
    getMarker(queryString, cb) {
      if (queryString !== null && queryString !== "") {
        Api.getInstance()
          .offer.get_marker({
            map_address: queryString
          })
          .then(response => {
            this.coords = response.data[0].coords;
            this.offerData.offerMap.map_marker = response.data[0].coords;
            let results = queryString ? response.data : "";
            cb(results);
          });
      }
    },
    onClickMap(data) {
      this.offerData.offerMap.map_address = data.map_address;
      this.offerData.offerMap.map_marker = data.map_marker;
    },
    checkOfferTypes(data) {
      // console.log(OfferSellApartData.data().aboutData);
      this.offerData.offerType = {
        account: data.picked_account,
        deal: data.picked_deal,
        estate: data.picked_estate,
        object_living: data.picked_object_living,
        object_commercy: data.picked_object_commercy
      };
      this.offerData.offerMap.map_address = null;
      this.offerData.offerMap.map_marker = null;
      let picked_object =
        data.picked_object_commercy || data.picked_object_living;
      if (
        data.picked_account !== null &&
        data.picked_deal !== null &&
        data.picked_estate !== null &&
        picked_object
      ) {
        this.accessToForm = true;
        // this.$refs.inputs.scrollIntoView({ behavior: "smooth" });
      }
      let helperData = Helper.getInstance().offer.checkOfferTypes(
        data.picked_account,
        data.picked_deal,
        data.picked_estate,
        data.picked_object_living,
        data.picked_object_commercy
      );
      helperData
        ? ((this.offerData.offerObject = helperData.object),
          (this.offerData.offerPrice = helperData.price))
        : helperData;
    }
  }
};
</script>

<style lang="scss">
.box-photo {
  height: 200px;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  cursor: grab;
}
.box-photo.main {
  background: #fffbf0;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.box-upload {
  width: 100%;
  border-radius: 6px;
  height: 200px;
  background: #fbfdff;
  border: 1px dashed #c0ccda;
  margin-right: 15px;
  margin-left: 15px;
}
</style>

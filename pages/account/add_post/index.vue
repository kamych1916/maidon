<template>
  <div class="pb-100 pt-50">
    <OfferTypes @checkOfferTypes="checkOfferTypes"></OfferTypes>
    <form @submit.prevent="onSubmit()">
      <div ref="inputs" v-if="accessToForm">
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
        <div>
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
                <h4 draggable="true">Фотографии</h4>
                <div
                  class="d-flex align-items-center mt-20"
                  v-if="offerData.offerPhothos.length > 0"
                >
                  <div class="example-box-photo"></div>
                  <span style="line-height: 0;">
                    &nbsp; - главная фотография
                  </span>
                </div>

                <draggable
                  :list="offerData.offerPhothos"
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
                    v-for="(element, index) in offerData.offerPhothos"
                    :key="index"
                  >
                    <div :class="[index === 0 ? 'main' : '', 'box-photo']">
                      <img :src="element.imgSrc" class="photo" />
                    </div>
                  </div>
                  <div
                    slot="footer"
                    role="group"
                    aria-label="Basic example"
                    key="footer"
                    class="box-upload my-20 d-flex align-items-center justify-content-center text-center"
                    @click="checkMove()"
                  >
                    <input
                      type="file"
                      class="box-photo-input"
                      accept="image/png, image/jpeg, image/jpg"
                      @change="filesChange"
                    />
                    <div>
                      <i
                        style="font-size: 70px; opacity: 0.3; line-height: 0"
                        class="bi bi-cloud-arrow-up-fill text-center"
                      ></i
                      ><br />
                      добавить фото
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
          </div>
          <!-- <div class="row mt-30">
            <div class="col">
              <div class="card-wrap">
                <h4>Условия размещения</h4>
              </div>
            </div>
          </div> -->
          <div class="row justify-content-center">
            <div class="col-md-4">
              <button
                class="el-button el-button--primary is-round py-14 w-100 mt-30"
                type="submit"
              >
                Разместить объявление
              </button>
            </div>
          </div>
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
        offerPrice: {},
        offerPhothos: []
      },
      coords: [],
      accessToForm: false,

      enabled: true,
      dragging: false
    };
  },
  methods: {
    filesChange(e) {
      const file = e.target.files[0];
      let url = URL.createObjectURL(file);
      this.offerData.offerPhothos.push({
        imgSrc: url
      });
      const formData = new FormData();
      formData.append(file.name, file);
      console.log(file);
      console.log(url);
      console.warn(formData);
    },
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
  display: flex;
  justify-content: center;
  align-items: center;
  .photo {
    padding: 10px;
    max-height: 100%;
    max-width: 100%;
  }
}
.example-box-photo {
  width: 20px;
  height: 20px;
  background-color: #fff7e1;
  border: 1px dashed #ccc;
}

.box-photo.main {
  background: #fff7e1;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.box-upload {
  width: 100%;
  border-radius: 6px;
  height: 200px;
  background: #f5fcff;
  border: 1px dashed #c0ccda;
  margin-right: 15px;
  margin-left: 15px;
  position: relative;
  &:hover {
    border: 1px dashed #409eff;
  }
  .box-photo-input {
    z-index: 2;
    cursor: pointer;
    opacity: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
}
</style>

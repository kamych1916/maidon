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
              <OfferPhotos @uploadPhoto="uploadPhoto"></OfferPhotos>
            </div>
          </div>
          <div class="row mt-30">
            <div class="col">
              <div class="card-wrap">
                <h4 draggable="true">Описание</h4>
                <el-input
                  required
                  type="textarea"
                  class="mt-20"
                  style="border-radius: 100px"
                  :autosize="{ minRows: 10, maxRows: 20 }"
                  maxlength="3000"
                  placeholder="Расскажите в каком состоянии объект, мебель, можно ли изменять интерьер; кого вы хотите видеть в жильцах, готовы ли к домашним животным; инфраструктура около дома, дополнительные платежи (счетчики и т.д.)."
                  v-model="offerData.offerDescription"
                >
                </el-input>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-30">
            <div class="col-md-4">
              <button
                class="el-button el-button--primary is-round py-14 w-100 "
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
import OfferPhotos from "@/pages/account/add_post/components/offer_photos.vue";
export default {
  components: {
    OfferTypes,
    OfferMap,
    OfferObject,
    OfferPrice,
    OfferPhotos
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
        offerPhothos: [],
        offerDescription: null
      },
      coords: [],
      accessToForm: false
    };
  },
  methods: {
    onSubmit() {
      if (this.offerData.offerPhothos.length < 4) {
        this.sendNTFS(
          "Предупрждение!",
          "Количество фотографий должен быть минимум 4!",
          "warning"
        );
      } else {
        Api.getInstance()
          .offer.send_offer_data(this.offerData)
          .then(response => {
            console.log("всё гуд -> ", response);
          });
      }
    },
    uploadPhoto(data) {
      this.offerData.offerPhothos = data.offerPhothos;
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
    },
    sendNTFS(title, message, type) {
      NTFS.getInstance().NTFS(title, message, type);
    }
  }
};
</script>

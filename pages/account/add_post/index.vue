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
        <div v-if="accessToForm">
          <div class="row">
            <div class="col-md-6 mt-30">
              <OfferObject
                :offerObject="offerObject"
                @input="
                  newData => {
                    offerObject = newData;
                  }
                "
              >
              </OfferObject>
            </div>
            <div class="col-md-6 mt-30">
              <OfferPrice
                :offerPrice="offerPrice"
                @input="
                  newData => {
                    offerPrice = newData;
                  }
                "
              >
              </OfferPrice>
            </div>
          </div>
          <div class="row mt-30">
            <div class="col">
              <div class="card-wrap">
                <h4>Планировка и фотографии</h4>
                <div class="row">
                  <div class="col">
                    Фотографии<br />
                    <el-upload
                      action="#"
                      list-type="picture-card"
                      :auto-upload="false"
                      :file-list="fileList"
                    >
                      <i slot="default" class="el-icon-plus"></i>
                      <div slot="file" slot-scope="{ file }">
                        <img
                          class="el-upload-list__item-thumbnail"
                          :src="file.url"
                          alt=""
                        />
                        <span class="el-upload-list__item-actions">
                          <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                          >
                            <i class="el-icon-zoom-in"></i>
                          </span>
                          <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                          >
                            <i class="el-icon-download"></i>
                          </span>
                          <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                          >
                            <i class="el-icon-delete"></i>
                          </span>
                        </span>
                      </div>
                    </el-upload>
                  </div>

                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </div>
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
export default {
  components: {
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
        }
      },
      offerObject: {},
      offerPrice: {},
      coords: [],
      accessToForm: false,

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    onSubmit() {
      this.offerData.offerObject = this.offerObject;
      this.offerData.offerPrice = this.offerPrice;
      console.log(this.offerData);
      Api.getInstance()
        .offer.send_offer_data(this.offerData)
        .then(response => {
          console.log("kek -> ", response);
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
        ? ((this.offerObject = helperData.object),
          (this.offerPrice = helperData.price))
        : helperData;
    }
  }
};
</script>

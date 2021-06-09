<template>
  <div class="pb-100" v-if="checkAccess">
    <div v-if="!isServices" class="pt-50">
      <OfferTypes @checkOfferTypes="checkOfferTypes"></OfferTypes>
      <form @submit.prevent="create_offer()">
        <div ref="inputs">
          <div class="row mx-0">
            <div class="card-wrap w-100 mt-50">
              <div class="form-group">
                Адрес
                <el-tooltip
                  class="item"
                  effect="dark"
                  content=""
                  placement="top-start"
                >
                  <div slot="content">
                    Введите адрес вашего объекта в адресной строке и далее<br />
                    отобразится метка на карте - сверьте пожалуйста правильно ли
                    поставилась метка на карте. <br /><br />

                    Так же вы можете кликнуть по карте, после чего <br />
                    отобразится метка и предварительный адрес в адресной строке
                  </div>
                  <el-button
                    type="text"
                    icon="bi bi-question-circle"
                    size="mini"
                  ></el-button>
                </el-tooltip>
                <el-autocomplete
                  :fetch-suggestions="get_marker"
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
                <OfferMap
                  @onClickMap="onClickMap"
                  :mapCoords="coords"
                ></OfferMap>
              </client-only>
            </div>
          </div>
          <div v-if="accessToForm">
            <!-- <div> -->
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
                <OfferPhotos
                  @uploadPhoto="uploadPhoto"
                  :putPhotos="[]"
                ></OfferPhotos>
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
    <div v-else>
      <Service />
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
import Helper from "~/pages/account/add_offer/mixins/offer_helper.js";
import OfferTypes from "@/pages/account/add_offer/components/offer_types.vue";
import OfferMap from "@/pages/account/add_offer/components/offer_map.vue";
import OfferObject from "@/pages/account/add_offer/components/offer_object.vue";
import OfferPrice from "@/pages/account/add_offer/components/offer_price.vue";
import OfferPhotos from "@/pages/account/add_offer/components/offer_photos.vue";
import Service from "@/pages/account/add_offer/components/service.vue";
import { cookiesEvents } from "~/utils/cookies";

export default {
  mixins: [cookiesEvents],
  components: {
    OfferTypes,
    OfferMap,
    OfferObject,
    OfferPrice,
    OfferPhotos,
    Service
  },

  data() {
    return {
      checkAccess: false,
      isServices: false,
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
  mounted() {
    window.scrollTo(0, 0);
    let store = JSON.parse(localStorage.getItem("ui"));
    if (this.getCookie("session_token") && localStorage.getItem("ui")) {
      if (!store.is_moder) this.checkAccess = true;
      if (
        store.account_type == "entity" ||
        store.account_type == "individual"
      ) {
        this.isServices = true;
      }
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    // Удаление обьектов, которое не содержат в себе данные
    deleteEmptyObjects(data) {
      for (let i in data.offerPhothos) {
        delete data.offerPhothos[i].imgSrc;
      }
      for (let prop in data.offerObject) {
        for (let i in data.offerObject[prop]) {
          if (data.offerObject[prop][i] == null) {
            delete data.offerObject[prop][i];
          } else {
            delete data.offerObject[prop][i].min;
            delete data.offerObject[prop][i].max;
          }
        }
        for (let s in data.offerObject[prop]) {
          if (data.offerObject[prop][s] == null) {
            delete data.offerObject[prop][s];
          } else {
            delete data.offerObject[prop][s].data;
            delete data.offerObject[prop][s].title;
          }
        }
      }
      for (let prop in data.offerPrice) {
        for (let i in data.offerPrice[prop]) {
          if (data.offerPrice[prop][i] == null) {
            delete data.offerPrice[prop][i];
          } else {
            delete data.offerPrice[prop][i].title;
            delete data.offerPrice[prop][i].suffix;
          }
        }
        for (let s in data.offerPrice[prop]) {
          if (data.offerPrice[prop][s] == null) {
            delete data.offerPrice[prop][s];
          } else {
            delete data.offerPrice[prop][s].data;
          }
        }
      }
      return data;
    },
    create_offer() {
      // Измение типа данных от input'ов - из String'а в Integer
      for (let data in this.offerData.offerObject.inputs) {
        if (this.offerData.offerObject.inputs[data] != null) {
          this.offerData.offerObject.inputs[data].value = parseInt(
            Number(this.offerData.offerObject.inputs[data].value)
          );
        }
      }
      let objCopy = JSON.parse(JSON.stringify(this.offerData));
      if (
        this.offerData.offerPhothos.length >= 4 &&
        this.offerData.offerPhothos.length <= 20
      ) {
        Api.getInstance()
          .offer.create_offer(this.deleteEmptyObjects(objCopy))
          .then(() => {
            Api.typicalNTFS(
              false,
              "Объявление было добавлено успешно, ожидайте проверку модератором!"
            );
            this.$router.push("/");
          })
          .catch(error => {
            Api.typicalNTFS(error.response.status);
          });
      } else if (this.offerData.offerPhothos.length < 4) {
        this.sendNTFS(
          "Предупрждение!",
          "Количество фотографий должно быть минимум 4!",
          "warning"
        );
      } else if (this.offerData.offerPhothos.length > 20) {
        this.sendNTFS(
          "Предупрждение!",
          "Количество фотографий должно быть максимум 20!",
          "warning"
        );
      }
    },
    uploadPhoto(data) {
      this.offerData.offerPhothos = data.offerPhothos;
    },
    get_marker(queryString, cb) {
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
      this.offerData.offerType = {
        account: JSON.parse(localStorage.getItem("ui")).account_type,
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
        JSON.parse(localStorage.getItem("ui")).account_type !== null &&
        data.picked_deal !== null &&
        data.picked_estate !== null &&
        picked_object
      ) {
        this.accessToForm = true;
        // this.$refs.inputs.scrollIntoView({ behavior: "smooth" });
      }
      let helperData = Helper.getInstance().offer.checkOfferTypes(
        JSON.parse(localStorage.getItem("ui")).account_type,
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

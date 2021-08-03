<template>
  <div v-if="checkAccess && offersList" class="container">
    <Tabs />
    <div class="row" v-if="offersList.length > 0">
      <div
        class="col-lg-6"
        v-for="(el, idx) in offersList"
        :key="idx"
        style="position: initial"
      >
        <div class="card-wrap">
          <div class="row">
            <div class="col-lg">
              <el-image
                @click="
                  el.state == '1'
                    ? $router.push(
                        '/' + el.deal + '/' + el.object + '/' + el.id
                      )
                    : ''
                "
                draggable="false"
                style="height: 200px"
                class="w-100 border-rad-10 cursor"
                :src="el.photos[0].imgSrc"
                fit="cover"
              ></el-image>
            </div>
            <div class="col-lg d-flex flex-column justify-content-between">
              <!-- <nuxt-link :to="'/offer/' + el.id" class="text-blue"> -->
              <h3
                class="text-blue cursor"
                @click="
                  el.state == '1'
                    ? $router.push(
                        '/' + el.deal + '/' + el.object + '/' + el.id
                      )
                    : ''
                "
              >
                {{ el.title }}
              </h3>
              <!-- </nuxt-link> -->
              <div class="fs-14">
                Просмотрели объявление -
                <span class="text-blue">{{ el.view }}</span>
              </div>
              <div class="fs-14">
                Просмотрели телефон -
                <span class="text-blue">{{ el.view_tel }}</span>
              </div>
              <div class="fs-14">
                Статус -
                <span style="color: green" v-if="el.state == 1">
                  подтверждён
                </span>
                <span style="color: orange" v-if="el.state == 0">
                  в ожидании
                </span>
                <span style="color: red" v-if="el.state == -1">
                  отмена, проверьте сообщение от администрации
                </span>
              </div>

              <div class="row mt-12">
                <button
                  @click="openOffer(el)"
                  class="
                    el-button el-button--primary
                    is-round
                    fs-14
                    py-10
                    px-20
                    mx-5
                    my-5
                  "
                >
                  изменить
                </button>
                <!-- <button
                  class="el-button el-button--warning is-round fs-14 py-10 px-20 mx-5 my-5 "
                >
                  добавить в топ
                </button> -->
                <el-popover
                  width="260"
                  placement="top"
                  :ref="'popover-' + el.id"
                >
                  <div>
                    <p>
                      Вы уверены, что хотите <br />удалить данное объвление?
                    </p>
                    <div style="text-align: right; margin: 0">
                      <el-button
                        size="mini"
                        type="text"
                        @click="closePopover('popover-' + el.id)"
                        >отмена</el-button
                      >
                      <el-button
                        type="danger"
                        size="mini"
                        @click="delete_offer(el)"
                      >
                        Да
                      </el-button>
                    </div>
                  </div>
                  <button
                    slot="reference"
                    class="
                      el-button el-button--danger
                      is-round
                      fs-14
                      py-10
                      px-20
                      mx-5
                      my-5
                    "
                  >
                    удалить
                  </button>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog" :class="[dialogChange ? 'dialog-active' : '']">
          <div class="container">
            <form @submit.prevent="change_offer()">
              <div class="card-wrap mt-50">
                <div class="row">
                  <div class="col-lg d-flex align-items-center">
                    Изменение объявления -&nbsp;
                    <span class="text-blue"> {{ offerData.title }}</span>
                  </div>
                  <div
                    class="
                      col-lg
                      d-flex
                      justify-content-lg-end justify-content-center
                    "
                  >
                    <button
                      type="submit"
                      class="
                        el-button el-button--primary
                        is-round
                        fs-14
                        py-10
                        px-20
                        mx-5
                        my-5
                      "
                    >
                      изменить
                    </button>
                    <div
                      @click="closeOffer()"
                      class="
                        el-button el-button--primary
                        is-round
                        fs-14
                        py-10
                        px-20
                        mx-5
                        my-5
                      "
                    >
                      отменить
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <OfferObject
                    :offerObject="offerData.offerObject"
                    @input="
                      (newData) => {
                        offerData.offerObject = newData;
                      }
                    "
                  >
                  </OfferObject>
                </div>
                <div class="col-md-6">
                  <OfferPrice
                    :offerPrice="offerData.offerPrice"
                    @input="
                      (newData) => {
                        offerData.offerPrice = newData;
                      }
                    "
                  >
                  </OfferPrice>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <OfferPhotos
                    @uploadPhoto="uploadPhoto"
                    :putPhotos="offerData.photos"
                  ></OfferPhotos>
                </div>
              </div>
              <div class="row">
                <div class="col-lg">
                  <div class="card-wrap">
                    Описание
                    <el-input
                      required
                      type="textarea"
                      class="mt-20"
                      style="border-radius: 100px"
                      :autosize="{ minRows: 10, maxRows: 20 }"
                      maxlength="3000"
                      placeholder="Расскажите в каком состоянии объект, мебель, можно ли изменять интерьер; кого вы хотите видеть в жильцах, готовы ли к домашним животным; инфраструктура около дома, дополнительные платежи (счетчики и т.д.)."
                      v-model="offerData.description"
                    >
                    </el-input>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import { CurrencyInput } from "vue-currency-input";
import Tabs from "@/pages/account/components/tabs.vue";
import Helper from "~/pages/account/add_offer/mixins/offer_helper.js";
import OfferObject from "@/pages/account/add_offer/components/offer_object.vue";
import OfferPrice from "@/pages/account/add_offer/components/offer_price.vue";
import OfferPhotos from "@/pages/account/add_offer/components/offer_photos.vue";
import NTFS from "~/utils/notifications";
import { cookiesEvents } from "~/utils/cookies";
export default {
  mixins: [cookiesEvents],
  components: {
    Tabs,
    CurrencyInput,
    OfferPhotos,
    OfferObject,
    OfferPrice,
  },
  data() {
    return {
      checkAccess: false,
      offersList: [],
      dialogChange: false,
      popoverDel: false,
      flagPhoto: false,
      offerData: {
        id: null,
        title: null,
        photos: [],
        description: null,
        offerObject: {},
        offerPrice: {},
      },
    };
  },
  mounted() {
    if (this.getCookie("session_token") && localStorage.getItem("ui")) {
      this.checkAccess = true;
      this.get_user_offers();
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    get_user_offers() {
      Api.getInstance()
        .account.get_user_offers()
        .then((response) => {
          this.offersList = response.data;
        })
        .catch((error) => {
          Api.typicalNTFS(error.response.status);
        });
    },
    uploadPhoto(data) {
      this.offerData.photos = data.offerPhothos;
      this.flagPhoto = true;
    },
    openOffer(el) {
      let agent, deal, estate, object_living, object_commercy;
      this.offersList.forEach((offer, idx) => {
        if (offer.id == el.id) {
          agent = offer.agent;
          deal = offer.offerPrice.deal;
          estate = offer.type_object;
          object_living = offer.offerObject.object;
          object_commercy = offer.offerObject.object;

          Api.getInstance()
            .offer.get_new_offer_inputs({
              account: JSON.parse(localStorage.getItem("ui")).account_type,
              deal: deal,
              estate: estate,
              object_living: object_living,
              object_commercy: object_commercy,
            })
            .then((response) => {
              this.offerData.offerObject = response.data.object;
              this.offerData.offerPrice = response.data.price;
              for (let item in this.offerData.offerObject) {
                Object.entries(this.offerData.offerObject[item]).forEach(
                  ([oKey, oValue]) => {
                    if (oValue) {
                      Object.entries(el.offerObject).forEach(
                        ([elKey, elValue]) => {
                          if (oKey === elKey) {
                            this.offerData.offerObject[item][oKey].value =
                              el.offerObject[elKey];
                          }
                        }
                      );
                    }
                  }
                );
              }
              for (let item in this.offerData.offerPrice) {
                Object.entries(this.offerData.offerPrice[item]).forEach(
                  ([oKey, oValue]) => {
                    if (oValue) {
                      Object.entries(el.offerPrice).forEach(
                        ([elKey, elValue]) => {
                          if (oKey === elKey) {
                            this.offerData.offerPrice[item][oKey].value =
                              el.offerPrice[elKey];
                          }
                        }
                      );
                    }
                  }
                );
              }
              this.offerData.offerPrice.deal = el.offerPrice.deal;
              this.offerData.offerObject.object = el.offerObject.object;
              this.offerData.id = el.id;
              this.offerData.title = el.title;
              this.offerData.photos = el.photos;
              this.offerData.description = el.description;
              this.dialogChange = true;
              document.body.style.overflow = "hidden";
            });
        }
      });
    },
    closeOffer() {
      this.dialogChange = false;
      document.body.style.overflow = "auto";
    },
    closePopover(data) {
      this.$refs[data][0].doClose();
    },
    // Проверка на то что были ли изменения при нажатии на кнопку "изменить"
    // checkChangesOfferData(el, data) {
    //   let checkList = [];
    //   el.price === this.offerData.price
    //     ? checkList.push(false)
    //     : checkList.push(true);
    //   el.description === data.description
    //     ? checkList.push(false)
    //     : checkList.push(true);
    //   let checkInfo = element => element === true;
    //   return checkList.some(checkInfo);
    // },
    // Удаление обьектов, которое не содержат в себе данные
    deleteEmptyObjects(data) {
      for (let i in data.photos) {
        delete data.photos[i].imgSrc;
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
    change_offer() {
      if (
        this.offerData.photos.length >= 4 &&
        this.offerData.photos.length <= 20
      ) {
        // this.offersList.forEach((el, idx) => {
        //   if (el.id == this.offerData.id) {
        //     if (
        //       this.checkChangesOfferData(el, this.offerData) ||
        //       this.flagPhoto
        //     ) {
        let objCopy = JSON.parse(JSON.stringify(this.offerData));
        Api.getInstance()
          .account.change_offer(this.deleteEmptyObjects(objCopy))
          .then((response) => {
            // this.offersList[idx].price = this.offerData.price;
            // this.offersList[idx].description = this.offerData.description;
            // this.offersList[idx].photos = this.offerData.photos;
            Api.typicalNTFS(
              false,
              "Объявление было изменено, ожидайте проверку модератором!"
            );
            this.closeOffer();
            setTimeout(() => {
              this.$router.go(this.$router.currentRoute);
            }, 2000);
          })
          .catch((error) => {
            Api.typicalNTFS(error.response.status);
          });
        // } else {
        //   this.sendNTFS(
        //     "Предупрждение!",
        //     "Вы не изменили данные",
        //     "warning"
        //   );
        // }
        // }
        // });
      } else if (this.offerData.photos.length < 4) {
        this.sendNTFS(
          "Предупрждение!",
          "Количество фотографий должно быть минимум 4!",
          "warning"
        );
      } else if (this.offerData.photos.length > 20) {
        this.sendNTFS(
          "Предупрждение!",
          "Количество фотографий должно быть максимум 20!",
          "warning"
        );
      }
    },
    delete_offer(item) {
      Api.getInstance()
        .account.delete_offer({ id: item.id })
        .then((response) => {
          this.offersList.forEach((el, idx) => {
            if (el.id == item.id) {
              this.$refs["popover-" + el.id][0].doClose();
              this.offersList.splice(idx, 1);
            }
          });
          Api.typicalNTFS(false, "объявление успешно удалено");
        })
        .catch((error) => {
          Api.typicalNTFS(error.response.status);
        });
    },
    sendNTFS(title, message, type) {
      NTFS.getInstance().NTFS(title, message, type);
    },
  },
};
</script>

<style lang="scss">
.del-dialog {
  .el-dialog {
    width: 30%;
  }
  @media screen and (max-width: 992px) {
    .el-dialog {
      width: 80%;
    }
  }
}
</style>

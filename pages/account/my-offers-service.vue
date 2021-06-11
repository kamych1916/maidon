<template>
  <div v-if="checkAccess && offersList">
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
            <div class="col-auto">
              <el-image
                @click="
                  el.state == '1'
                    ? $router.push(
                        '/' + el.deal + '/' + el.object + '/' + el.id
                      )
                    : ''
                "
                draggable="false"
                style="height: 100px; width: 100px;"
                class="border-rad-10  cursor"
                :src="el.listPhotos[0].imgSrc"
                fit="cover"
              ></el-image>
            </div>
            <div class="col-lg fs-14">
              <!-- <nuxt-link :to="'/offer/' + el.id" class="text-blue"> -->
              <h3
                v-if="el.state == '1'"
                class="text-blue cursor fs-14 "
                @click="
                  el.state == '1'
                    ? $router.push(
                        '/' + el.deal + '/' + el.object + '/' + el.id
                      )
                    : ''
                "
              >
                Перейти к объявлению
              </h3>
              <div class="row" v-if="el.storeService">
                <div class="col-6 my-5">Тип объявления:</div>
                <div class="col-6 my-5">{{ el.type }}</div>

                <div class="col-6 my-5">Статус:</div>
                <div class="col-6 my-5">
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
              </div>
              <div class="row mt-12">
                <button
                  @click="openOffer(el)"
                  class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5 "
                >
                  изменить
                </button>
                <button
                  class="el-button el-button--warning is-round fs-14 py-10 px-20 mx-5 my-5 "
                >
                  добавить в топ
                </button>
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
                    class="el-button el-button--danger is-round fs-14 py-10 px-20 mx-5 my-5"
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
                    <span class="text-blue"> {{ offerData.type }}</span>
                  </div>
                  <div
                    class="col-lg d-flex justify-content-lg-end justify-content-center"
                  >
                    <button
                      type="submit"
                      class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
                    >
                      изменить
                    </button>
                    <div
                      @click="closeOffer()"
                      class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
                    >
                      отменить
                    </div>
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
    OfferPrice
  },
  data() {
    return {
      checkAccess: false,
      offersList: [],

      dialogChange: false,
      popoverDel: false,
      flagPhoto: false,

      offerData: {},
      storeService: []
    };
  },
  mounted() {
    if (this.getCookie("session_token") && localStorage.getItem("ui")) {
      this.get_user_services();
      this.checkAccess = true;
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    get_user_services() {
      Api.getInstance()
        .account.get_user_services()
        .then(response => {
          this.offersList = response.data;
          console.log("kek-> ", response.data);
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },

    uploadPhoto(data) {
      this.offerData.photos = data.offerPhothos;
      this.flagPhoto = true;
    },
    openOffer(el) {
      console.log(el);
      this.storeService = el.storeService;
      this.offerData = el.offerData;
      this.dialogChange = true;
      document.body.style.overflow = "hidden";
    },
    closeOffer() {
      this.dialogChange = false;
      document.body.style.overflow = "auto";
    },
    closePopover(data) {
      this.$refs[data][0].doClose();
    },

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
          .then(response => {
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
          .catch(error => {
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
        .then(response => {
          this.offersList.forEach((el, idx) => {
            if (el.id == item.id) {
              this.$refs["popover-" + el.id][0].doClose();
              this.offersList.splice(idx, 1);
            }
          });
          Api.typicalNTFS(false, "объявление успешно удалено");
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },
    sendNTFS(title, message, type) {
      NTFS.getInstance().NTFS(title, message, type);
    }
  }
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

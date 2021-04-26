<template>
  <div v-if="checkAccess">
    <Tabs />
    <div class="row">
      <div
        class="col-lg-6"
        v-for="(el, idx) in moderOfferData"
        :key="idx"
        style="position: initial"
      >
        <div class="card-wrap">
          <div class=" my-10">
            {{ el.title }}
          </div>
          <div class="row">
            <div
              class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
              @click="openOffer('photos', el.offerPhothos, el.title)"
            >
              Фотографии
            </div>
            <div
              class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
              @click="
                openOffer(
                  'infos',
                  { object: el.offer_object, price: el.offer_price },
                  el.title
                )
              "
            >
              Информация
            </div>
            <div
              class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
              @click="openOffer('description', el.offerDescription, el.title)"
            >
              Описание
            </div>
          </div>
          <div class="row mt-12">
            <button
              @click="acceptOffer(el.id)"
              class="el-button el-button--success is-round fs-14 py-10 px-20 mx-5 my-5 "
            >
              Разрешить
            </button>
            <button
              @click="openOffer('cancel', el.id, el.title)"
              class="el-button el-button--danger is-round fs-14 py-10 px-20 mx-5 my-5 "
            >
              Отменить и указать причину
            </button>
          </div>
        </div>
        <div class="dialog" :class="[dialogPhotos ? 'dialog-active' : '']">
          <div class="container">
            <div class="card-wrap mt-50">
              <div class="row">
                <div class="col-lg d-flex align-items-center">
                  <div>
                    Просмотр фотографий объявления - &nbsp;
                    <span class="text-blue">{{ offerData.title }}</span>
                  </div>
                </div>
                <div class="col-lg d-flex justify-content-end">
                  <div
                    @click="closeDialog()"
                    class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
                  >
                    выйти
                  </div>
                </div>
              </div>
            </div>
            <div class="card-wrap">
              <div class="row">
                <div
                  class="px-10"
                  v-for="(p, i) in offerData.offerPhothos"
                  :key="i"
                >
                  <!-- {{ p.imgName }} -->
                  <el-image
                    draggable="false"
                    style="width: 295px; height: 200px"
                    class="border-rad-10 "
                    :src="p.imgName"
                    fit="cover"
                  ></el-image>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog" :class="[dialogInfos ? 'dialog-active' : '']">
          <div class="container">
            <div class="card-wrap mt-50">
              <div class="row">
                <div class="col-lg d-flex align-items-center">
                  <div>
                    Просмотр информации объявления -&nbsp;
                    <span class="text-blue">{{ offerData.title }}</span>
                  </div>
                </div>
                <div class="col-lg d-flex justify-content-end">
                  <div
                    @click="closeDialog()"
                    class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
                  >
                    выйти
                  </div>
                </div>
              </div>
            </div>
            <div class="card-wrap" style="white-space: pre-line">
              <h2>Информация об объекте</h2>
              {{ offerData.offer_object }}
            </div>
            <div class="card-wrap" style="white-space: pre-line">
              <h2>Информация о цене</h2>
              {{ offerData.offer_price }}
            </div>
          </div>
        </div>
        <div class="dialog" :class="[dialogDescription ? 'dialog-active' : '']">
          <div class="container">
            <div class="card-wrap mt-50">
              <div class="row">
                <div class="col-lg d-flex align-items-center">
                  <div>
                    Просмотр описания объявления -&nbsp;
                    <span class="text-blue">{{ offerData.title }}</span>
                  </div>
                </div>
                <div class="col-lg d-flex justify-content-end ">
                  <div
                    @click="closeDialog()"
                    class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
                  >
                    выйти
                  </div>
                </div>
              </div>
            </div>
            <div class="card-wrap">
              <h2>Описание</h2>
              <div style="white-space: pre-line;">
                {{ offerData.offerDescription }}
              </div>
            </div>
          </div>
        </div>
        <div class="dialog" :class="[dialogCancel ? 'dialog-active' : '']">
          <div class="container">
            <div class="card-wrap mt-50">
              <div class="row">
                <div class="col-lg d-flex align-items-center">
                  <div>
                    Отмена объявления - &nbsp;
                    <span class="text-blue">{{ offerData.title }}</span>
                  </div>
                </div>
                <div class="col-lg d-flex justify-content-end">
                  <div
                    @click="cancleOffer()"
                    class="el-button el-button--warning is-round fs-14 py-10 px-20 mx-5 my-5"
                  >
                    подтвердить
                  </div>
                  <div
                    @click="closeDialog()"
                    class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
                  >
                    выйти
                  </div>
                </div>
              </div>
            </div>
            <div class="card-wrap">
              <h2>Опишите причину отмены</h2>
              <el-input
                required
                type="textarea"
                class="mt-20"
                style="border-radius: 100px"
                :autosize="{ minRows: 10, maxRows: 20 }"
                maxlength="3000"
                placeholder="Пожалуйста, опишите проблему объявления сформулировано и аргументировано!"
                v-model="reasonOfCancel"
              >
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import { cookiesEvents } from "~/utils/cookies";
import Tabs from "@/pages/account/components/tabs.vue";

export default {
  mixins: [cookiesEvents],
  components: {
    Tabs
  },
  data() {
    return {
      checkAccess: false,

      dialogPhotos: false,
      dialogInfos: false,
      dialogDescription: false,
      dialogCancel: false,

      reasonOfCancel: null,

      moderOfferData: null,

      offerData: {
        id: null,
        note: null,
        acive: null,
        map_address: null,
        offer_object: null,
        offer_price: null,
        title: null,
        offerPhothos: [],
        offerDescription: "123"
      }
    };
  },
  mounted() {
    if (this.getCookie("session_token") && this.getCookie("ui")) {
      this.get_moder_offer();
      this.checkAccess = true;
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    cancleOffer() {
      Api.getInstance()
        .account.activ_offer({
          id: this.offerData.id,
          active: -1,
          note: this.reasonOfCancel
        })
        .then(response => {
          this.moderOfferData.forEach((element, idx) => {
            if (element.id === this.offerData.id) {
              this.moderOfferData.splice(idx, 1);
            }
          });
          this.closeDialog();
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },

    acceptOffer(id) {
      Api.getInstance()
        .account.activ_offer({
          id: id,
          active: 1,
          note: ""
        })
        .then(response => {
          this.moderOfferData.forEach((element, idx) => {
            if (element.id === id) {
              this.moderOfferData.splice(idx, 1);
            }
          });
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },

    get_moder_offer() {
      Api.getInstance()
        .account.get_moder_offer()
        .then(response => {
          this.moderOfferData = response.data;
          console.log(this.moderOfferData);
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },

    closeDialog() {
      this.dialogPhotos = false;
      this.dialogDescription = false;
      this.dialogCancel = false;
      this.dialogInfos = false;
      document.body.style.overflow = "auto";
    },
    openOffer(type, data, title) {
      this.offerData.title = title;
      if (type === "photos") {
        this.offerData.offerPhothos = data;
        this.dialogPhotos = true;
      } else if (type === "infos") {
        this.offerData.offer_price = data.price;
        this.offerData.offer_object = data.object;
        this.dialogInfos = true;
      } else if (type === "description") {
        this.offerData.offerDescription = data;
        this.dialogDescription = true;
      } else if (type === "cancel") {
        this.offerData.id = data;
        this.dialogCancel = true;
      }
      document.body.style.overflow = "hidden";
    }
  }
};
</script>

<style lang="scss"></style>

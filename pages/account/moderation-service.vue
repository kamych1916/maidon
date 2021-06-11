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
          <div class="row" v-if="el.storeService">
            <div class="col-6 my-5">Тип объявления:</div>
            <div class="col-6 my-5">{{ el.type }}</div>
            <div class="col-6 my-5">Опыт работы:</div>
            <div class="col-6 my-5">{{ el.workDate }}</div>
            <div class="col-6 my-5">Время работы:</div>
            <div class="col-6 my-5">{{ el.workTime }}</div>
          </div>
          <div class="row mt-10 ">
            <div class="col px-10">
              <div
                class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
                @click="openOffer('photos', el.listPhotos, el.type)"
              >
                Фотографии
              </div>
              <div
                class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
                @click="openOffer('infos', el.storeService, el.type)"
              >
                Информация
              </div>
            </div>
          </div>
          <div class="row mt-12">
            <div class="col px-10">
              <button
                @click="acceptOffer(el.id)"
                class="el-button el-button--success is-round fs-14 py-10 px-20 mx-5 my-5 "
              >
                Разрешить
              </button>
              <button
                @click="openOffer('cancel', el.id, el.type)"
                class="el-button el-button--danger is-round fs-14 py-10 px-20 mx-5 my-5 "
              >
                Отменить и указать причину
              </button>
            </div>
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
            <div
              class="card-wrap "
              v-for="(item, id) in offerData.storeService"
              :key="id"
            >
              <div>
                <div class="mt-20 ">
                  <div class="d-flex row justify-content-between">
                    <div class="col ">
                      {{ item.kind }}
                    </div>
                    <div class="col text-blue" style="text-align: end">
                      {{ item.cost }}
                    </div>
                  </div>
                </div>
                <div class="mt-20 text-light">
                  {{ item.description }}
                </div>
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
                    @click="acceptOffer()"
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
      dialogCancel: false,

      reasonOfCancel: null,

      moderOfferData: null,

      offerData: {
        id: null,
        note: null,
        acive: null,
        storeService: null,
        title: null,
        offerPhothos: []
      }
    };
  },
  mounted() {
    let store = JSON.parse(localStorage.getItem("ui"));
    if (this.getCookie("session_token") && localStorage.getItem("ui")) {
      if (store.type == "services") {
        this.get_moder_services();
      }
      this.checkAccess = true;
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    acceptOffer(id) {
      Api.getInstance()
        .account.active_services({
          id: id ? id : this.offerData.id,
          state: id ? 1 : -1,
          note: id ? "" : this.reasonOfCancel
        })
        .then(response => {
          this.moderOfferData.forEach((element, idx) => {
            if (element.id === id ? id : this.offerData.id) {
              this.moderOfferData.splice(idx, 1);
              id
                ? Api.typicalNTFS(false, "Объявление было добавлено успешно!")
                : Api.typicalNTFS(false, "Объявление было успешно отмененно!");
            }
            this.closeDialog();
          });
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },
    get_moder_services() {
      Api.getInstance()
        .account.get_moder_services()
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
        this.offerData.storeService = data;
        this.dialogInfos = true;
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

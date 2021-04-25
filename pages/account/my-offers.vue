<template>
  <div>
    <Tabs />
    <div class="row">
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
                draggable="false"
                style="height: 200px"
                class="w-100 border-rad-10 "
                :src="el.photos[0].imgSrc"
                fit="cover"
              ></el-image>
            </div>
            <div class="col-lg d-flex flex-column justify-content-between">
              <h3>{{ el.title }}</h3>
              <div class="fs-14">
                Просмотрели объявление -
                <span class="text-blue">{{ el.view }}</span>
              </div>
              <div class="fs-14">
                Просмотрели телефон -
                <span class="text-blue">{{ el.view_tel }}</span>
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
        <div
          class="change-dialog"
          :class="[dialogChange ? 'change-dialog-active' : '']"
        >
          <div class="container">
            <form @submit.prevent="change_offer()">
              <div class="card-wrap mt-50">
                <div class="row">
                  <div class="col-lg">
                    Изменение объявления -
                    <span class="text-blue">{{ offerData.title }}</span>
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
                <div class="col-lg">
                  <div class="card-wrap">
                    <div class="row mx-0 w-100 align-items-center">
                      <div class="col-xl-3 my-10">Цена</div>
                      <div class="col-xl my-10">
                        <div class="el-input el-input--suffix w-100">
                          <currency-input
                            :max="100"
                            class="el-input__inner"
                            locale="ru"
                            :currency="null"
                            :precision="0"
                            v-model="offerData.price"
                          />
                          <span class="el-input__suffix">
                            <span class="el-input__suffix-inner">
                              <i>сомони</i>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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
import OfferPhotos from "@/pages/account/add_offer/components/offer_photos.vue";
import NTFS from "~/utils/notifications";

export default {
  components: {
    Tabs,
    CurrencyInput,
    OfferPhotos
  },
  data() {
    return {
      offersList: null,

      dialogChange: false,
      popoverDel: false,
      flagPhoto: false,

      offerData: {
        id: null,
        title: null,
        photos: [],
        price: null,
        description: null
      }
    };
  },
  mounted() {
    this.get_user_offers();
  },
  methods: {
    get_user_offers() {
      Api.getInstance()
        .account.get_user_offers()
        .then(response => {
          this.offersList = response.data;
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
      this.offerData.id = el.id;
      this.offerData.title = el.title;
      this.offerData.photos = el.photos;
      this.offerData.price = el.price;
      this.offerData.description = el.description;
      this.dialogChange = true;
      document.body.style.overflow = "hidden";
    },
    closeOffer() {
      // this.offerData.id = null;
      // this.offerData.title = null;
      // this.offerData.photos = [];
      // this.offerData.price = null;
      // this.offerData.description = null;
      this.dialogChange = false;
      document.body.style.overflow = "auto";
    },
    closePopover(data) {
      this.$refs[data][0].doClose();
    },

    checkChangesOfferData(el, data) {
      let checkList = [];
      el.price === this.offerData.price
        ? checkList.push(false)
        : checkList.push(true);

      el.description === data.description
        ? checkList.push(false)
        : checkList.push(true);

      let checkInfo = element => element === true;
      return checkList.some(checkInfo);
    },

    change_offer() {
      if (
        this.offerData.photos.length >= 4 &&
        this.offerData.photos.length <= 20
      ) {
        this.offersList.forEach((el, idx) => {
          if (el.id == this.offerData.id) {
            if (
              this.checkChangesOfferData(el, this.offerData) ||
              this.flagPhoto
            ) {
              let newData = JSON.parse(JSON.stringify(this.offerData));
              for (let i in newData.photos) {
                delete newData.photos[i].imgSrc;
              }
              Api.getInstance()
                .account.change_offer(newData)
                .then(response => {
                  this.offersList[idx].price = this.offerData.price;
                  this.offersList[idx].description = this.offerData.description;
                  this.offersList[idx].photos = this.offerData.photos;
                  Api.typicalNTFS(
                    false,
                    "Объявление было изменено, ожидайте проверку модератором!"
                  );

                  this.closeOffer();
                })
                .catch(error => {
                  Api.typicalNTFS(error.response.status);
                });
            } else {
              this.sendNTFS(
                "Предупрждение!",
                "Вы не изменили данные",
                "warning"
              );
            }
          }
        });
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
.change-dialog {
  display: none;
  background-color: #f5f5f5;
  width: 100%;
  height: 100vh;
  overflow: auto;
  transition: all 1s;
}
.change-dialog-active {
  z-index: 1999;
  position: fixed;
  top: 0;
  left: 0;
  display: block !important;
}
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

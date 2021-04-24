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
              <div class="row">
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
                  class="mt-12"
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
                        @click="delOffers(el)"
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
            <form @submit.prevent="changeOffer()">
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
    this.getOffers();
  },
  methods: {
    getOffers() {
      Api.getInstance()
        .account.getOffers()
        .then(response => {
          this.offersList = response.data;
        });
    },
    uploadPhoto(data) {
      this.offerData.photos = data.offerPhothos;
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
    changeOffer() {
      if (
        this.offerData.photos.length >= 4 &&
        this.offerData.photos.length <= 20
      ) {
        this.offersList.forEach((el, idx) => {
          if (el.id == this.offerData.id) {
            let checkInfo = true;
            let data = this.offerData;

            if (el.price == this.offerData.price) {
              checkInfo = false;
            } else {
              checkInfo = true;
            }

            if (el.description == data.description) {
              checkInfo = false;
            } else {
              checkInfo = true;
            }

            let checkPhoto_1 = false;
            let checkPhoto_2 = true;
            console.log(el.photos);
            console.log(data.photos);
            // добавить условие по количеству изображений
            for (let oldPhotos in el.photos) {
              for (let newPhotos in data.photos) {
                if (
                  el.photos[oldPhotos].imgSrc == data.photos[newPhotos].imgSrc
                ) {
                  checkPhoto_2 = false;
                }
              }
              if (!checkPhoto_1) {
                checkPhoto_1 = checkPhoto_2;
              }
              checkPhoto_2 = true;
            }

            console.log(checkInfo, checkPhoto_1);

            if (checkInfo || checkPhoto_1) {
              let newData = JSON.parse(JSON.stringify(this.offerData));
              for (let i in newData.photos) {
                delete newData.photos[i].imgSrc;
              }
              Api.getInstance()
                .account.changeOffer(newData)
                .then(response => {
                  this.offersList[idx] = this.offerData;
                  console.log("kek->", this.offersList);
                  this.sendNTFS(
                    "Отлично!",
                    "Объявление было изменено, ожидайте проверку модератором!",
                    "success"
                  );
                  this.closeOffer();
                })
                .catch(error => {
                  console.log("delOffers-> ", error);
                  this.sendNTFS(
                    "Ошибка!",
                    "Объявление не было изменено!",
                    "warning"
                  );
                  return;
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
    delOffers(item) {
      Api.getInstance()
        .account.delOffer({ id: item.id })
        .then(response => {
          this.offersList.forEach((el, idx) => {
            if (el.id == item.id) {
              console.log(this.$refs["popover-" + el.id]);
              console.log(this.$refs["popover-" + el.id][0]);
              this.$refs["popover-" + el.id][0].doClose();
              this.offersList.splice(idx, 1);
            }
          });
          this.sendNTFS(
            "Уведомление!",
            "объявление успешно удалено",
            "success"
          );
        })
        .catch(error => {
          console.log("delOffers-> ", error);
          this.sendNTFS(
            "Предупрждение!",
            "Объявление не было удалено!",
            "warning"
          );
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

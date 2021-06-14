<template>
  <div class="services-wrap">
    <div class="row">
      <div class="col-lg-8">
        <div class="card-wrap w-100 ">
          <div class="row">
            <div class="col-lg my-10">
              <div
                class="avatar border-rad-10"
                style="background:#b9d7f7; width: 100px; height: 100px"
              >
                <img
                  :src="userData.avatar"
                  width="100"
                  height="100"
                  style="background-color: #ccc; object-fit: cover"
                  class="border-rad-10 "
                  v-if="userData.avatar"
                />
                <i
                  class="bi bi-person-lines-fill fs-22"
                  v-else-if="userData.account_type != 'entity'"
                ></i>
                <i v-else class="bi bi-briefcase fs-22"></i>
              </div>
            </div>
            <div class="col-lg-10 my-10">
              <div>
                <div class="fs-18">
                  {{ userData.userInfo }}
                </div>
                <!-- <div class="fs-12 text-light">
                  <i class="bi bi-geo-alt"></i>
                  {{ userData.offerData.city }}
                </div> -->
                <div class="fs-14 text-light mt-10">
                  {{ userData.about }}
                </div>
                <div class="mt-10 mb-10 fs-14">
                  Опыт работы:
                  <span style="font-family: Tahoma">
                    c {{ userData.user_workDate }} года</span
                  >
                </div>
                <div class="my-10 fs-14">
                  Специализация:
                  <span style="font-family: Tahoma">{{
                    userData.specialization
                  }}</span>
                </div>
                <div class="my-10 fs-14">
                  Телефон:
                  <a :href="'tel:' + userData.tel" class="mx-0 is-round ">
                    {{ userData.tel }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <el-collapse @change="collapseChange()" v-model="activeNames">
          <!-- v-for="(item, id) in storeService." -->
          <div class="card-wrap" v-for="(item, id) in serviceData" :key="id">
            <div class="row">
              <div class="col">
                <el-collapse-item :name="item.offerData.specialization">
                  <template slot="title">
                    <span class="fs-18">
                      {{ item.offerData.specialization }}
                    </span>
                  </template>
                  <div class="mt-10 fs-14 ">
                    <div class="row">
                      <div class="col-6 my-5">Опыт</div>
                      <div class="col-6 my-5">
                        {{ item.offerData.workDate }}
                      </div>

                      <div class="col-6 my-5">Время работы</div>
                      <div class="col-6 my-5">
                        {{ item.offerData.workTime }}
                      </div>
                    </div>
                    <div class="mt-20  text-light">
                      {{ item.offerData.description }}
                    </div>
                    <div
                      class="pt-20 pb-30"
                      style="border-bottom: 1px solid #ccc;"
                    >
                      <hooper
                        ref="slider"
                        class="gallery-slide"
                        :wheelControl="false"
                        :itemsToShow="4"
                        :touchDrag="false"
                        :mouseDrag="false"
                        :shortDrag="false"
                      >
                        <slide
                          v-for="(photos, idp) in item.offerData.listPhotos"
                          :key="idp"
                          draggable="false"
                          class="cursor"
                        >
                          <el-image
                            @click.stop="openSlider('fsSlider' + id)"
                            draggable="false"
                            class="w-100 h-100 border-rad-10"
                            :src="photos.imgSrc"
                            fit="cover"
                          ></el-image>
                        </slide>
                        <hooper-navigation
                          slot="hooper-addons"
                        ></hooper-navigation>
                      </hooper>
                      <div
                        class="dialog"
                        :class="[dialogSlider ? 'dialog-active' : '']"
                      >
                        <div
                          style="z-index:20001; right: 2px; top:10px"
                          @click="closeSlider()"
                          class=" hooper-fullscreen fs-14 py-12 px-18  mx-5 my-5"
                        >
                          <i class="bi bi-fullscreen-exit"></i>
                        </div>
                        <Carousel :ref="'fsSlider' + id">
                          <CarouselSlide
                            v-for="(img, index) in item.offerData.listPhotos"
                            :key="index"
                            class="carousel-slider"
                          >
                            <el-image
                              class="border-rad-20"
                              draggable="false"
                              :src="img.imgSrc"
                              fit="cover"
                            ></el-image>
                          </CarouselSlide>
                        </Carousel>
                      </div>
                    </div>
                    <div
                      style="border-bottom: 1px solid #ccc"
                      class="pb-20"
                      v-for="(service, id) in item.storeService"
                      :key="id"
                    >
                      <div class="mt-20 ">
                        <div class="d-flex row justify-content-between">
                          <div class="col ">
                            {{ service.kind }}
                          </div>
                          <div class="col text-blue" style="text-align: end">
                            {{ service.cost }}
                          </div>
                        </div>
                      </div>
                      <div class="mt-20 text-light">
                        {{ service.description }}
                      </div>
                    </div>
                  </div>
                </el-collapse-item>
              </div>
            </div>
          </div>
        </el-collapse>
      </div>
      <div class="col-lg-4 d-none d-sm-block mb-30">
        <div class="card-wrap sticky">
          <Breadcrumbs :accountTitle="userData.userInfo" />
        </div>
      </div>
    </div>
    <!-- <div class="curve-shape">
      <svg
        x="0px"
        y="0px"
        viewBox="0 0 3841 120"
        xml:space="preserve"
        style="overflow:scroll"
      >
        <path
          d="M3360.5,97.739c-242,0-480-48.375-480-48.375
                    S2647.5,0.5,2400.5,0.5s-480,48.375-480,48.375s-238,48.864-480,48.864s-480-48.375-480-48.375S727.5,0.5,480.5,0.5
                    S0.5,48.875,0.5,48.875V108h1920h1920V48.875C3840.5,48.875,3602.5,97.739,3360.5,97.739z"
          style="fill:#f4efff;stroke-miterlimit:10;"
        ></path>
      </svg>
    </div> -->
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
import axios from "axios";

export default {
  async asyncData({ route }) {
    let userData;
    let serviceData;
    const { id } = route.params;
    return axios
      .get(`https://mirllex.site/server/api/v1/get_services/${id}`)
      .then(response => {
        userData = response.data.user;
        serviceData = response.data.list_services;
        return { userData, serviceData };
      });
  },
  components: {
    Hooper,
    Slide,
    HooperNavigation
  },
  data() {
    return {
      dialogSlider: false,
      servicePhothos: [
        "https://avatars.mds.yandex.net/get-ydo/4397410/2a000001780d0809951b20cda3a7c95fe5c2/diploma",
        "https://avatars.mds.yandex.net/get-ydo/2428621/2a000001755b6fc71d859df8b0e15aee2e3e/diploma",
        "https://avatars.mds.yandex.net/get-ydo/472106/2a0000017518d461d917ff16a304432a85cc/diploma",
        "https://avatars.mds.yandex.net/get-ydo/1540809/2a000001755b6fc7a61186f4fd3d4f67fede/diploma"
      ],

      activeNames: []
      // indexSlide: 0
    };
  },
  mounted() {
    if (localStorage.getItem("ui")) {
      this.localStore = JSON.parse(localStorage.getItem("ui"));
    }
  },
  methods: {
    // get_services() {
    //   Api.getInstance()
    //     .clients.get_services(this.$route.params.id)
    //     .then(response => {
    //       this.userData = response.data.user;
    //       this.serviceData = response.data.list_services;
    //       console.log(response.data);
    //     })
    //     .catch(error => {
    //       Api.typicalNTFS(error.response.status);
    //     });
    // },
    collapseChange() {
      for (let i in this.$refs.slider) {
        this.$refs.slider[i].restart();
      }
    },
    openSlider(id) {
      // this.indexSlide = id;
      console.log(this.$refs[id].refresh());
      this.$refs[id].refresh();
      this.dialogSlider = true;
      document.body.style.overflow = "hidden";
    },
    closeSlider() {
      this.dialogSlider = false;
      // this.indexSlide = 0;
      document.body.style.overflow = "auto";
    },
    // add_review() {
    //   if (this.reviewRate == 0 || !this.reviewRate || !this.reviewText) {
    //     alert("пошел нахъуй");
    //   } else {
    //     Api.getInstance()
    //       .clients.add_review({
    //         id: this.$route.params.id,
    //         text: this.reviewText,
    //         value: this.reviewRate
    //       })
    //       .then(response => {})
    //       .catch(error => {
    //         Api.typicalNTFS(error.response.status);
    //       });
    //   }
    // },
    // get_info_account() {
    //   Api.getInstance()
    //     .clients.get_info_account(this.$route.params.id)
    //     .then(response => {
    //       this.accountData = response.data;
    //     })
    //     .catch(error => {
    //       Api.typicalNTFS(error.response.status);
    //     });
    // },
    scrollTo(data) {
      data == "reviews"
        ? this.$refs.reviews.scrollIntoView({ behavior: "smooth" })
        : this.$refs.offers.scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>
<style lang="scss">
// .curve-shape {
//   margin-bottom: -12px;
//   overflow-x: hidden;
// }
// .curve-shape svg {
//   width: 200%;
//   position: relative;
//   -webkit-animation: move-left-data-v-346eb0d3 6s linear infinite;
//   animation: move-left-data-v-346eb0d3 6s linear infinite;
// }
// @-webkit-keyframes move-left-data-v-346eb0d3 {
//   0% {
//     left: 0;
//   }
//   to {
//     left: -100%;
//   }
// }
// @keyframes move-left-data-v-346eb0d3 {
//   0% {
//     left: 0;
//   }
//   to {
//     left: -100%;
//   }
// }
.services-wrap {
  .el-collapse-item__header {
    height: auto !important;
    line-height: normal;
    padding: 10px 0 10px 0;
    border-bottom: none;
  }
  .el-collapse-item__wrap {
    border-bottom: none;
  }
  .hooper-fullscreen {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
    background-color: rgba(31, 45, 61, 0.6);
    color: white;
    border-radius: 30px;
    transition: all 0.3s ease;
    svg {
      fill: white;
    }
  }

  .gallery-slide {
    height: 100px !important;
  }
  .gallery-thumb {
    height: 130px !important;
    .is-current {
      opacity: 1;
      .el-image {
        background-color: #409eff;
        // border: 2px solid #409eff !important;
        .el-image__inner {
          border-radius: 10px !important;
        }
      }
    }
    .hooper-slide {
      width: auto !important;
      opacity: 0.8;
      padding: 15px 10px !important;
    }
    .is-current {
      opacity: 1;
    }
  }

  @media (max-width: 992px) {
    .gallery-slide {
      height: 70px !important;
    }
    .gallery-thumb {
      height: 100px !important;
    }
  }
}
</style>

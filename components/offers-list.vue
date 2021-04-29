<template>
  <div v-if="offerData">
    <div v-if="offerData.list_offers.length > 0">
      <div v-if="!isMapShow">
        <div
          class="card-wrap offer"
          v-for="(item, index) in offerData.list_offers"
          :key="index"
        >
          <div class="row">
            <div class="col-lg-4 w-100 mt-10">
              <hooper style="cursor: grab">
                <slide v-for="(img, index) in item.images" :key="index">
                  <el-image
                    draggable="false"
                    class="w-100 h-100 border-rad-10"
                    :src="img.imgName"
                    fit="cover"
                  ></el-image>
                </slide>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
              </hooper>
              <div class="row mt-20 px-2">
                <div class="col ">
                  <el-image
                    class="border-rad-5 w-100"
                    style="height: 80px"
                    :src="item.images[1].imgName"
                    fit="cover"
                  ></el-image>
                </div>
                <div class="col">
                  <el-image
                    class="border-rad-5 w-100"
                    style="height: 80px"
                    :src="item.images[2].imgName"
                    fit="cover"
                  ></el-image>
                </div>
                <div class="col">
                  <el-image
                    class="border-rad-5 w-100"
                    style="height: 80px"
                    :src="item.images[3].imgName"
                    fit="cover"
                  ></el-image>
                </div>
              </div>
            </div>
            <div class="col-lg-6 w-100 mt-10">
              <div class="h-100 d-flex flex-column justify-content-between">
                <div>
                  <h1
                    @click="$router.push(currentPath + '/' + item.id)"
                    class="fs-28 mt-0 mb-20 text-blue"
                    style="cursor: pointer "
                  >
                    {{ item.title }}
                  </h1>
                  <h3 class="fs-14 my-20" style="color: #c0c4cc">
                    {{ item.address }}
                  </h3>
                  <h2 class="fs-28 mt-20 mb-0">
                    {{ item.price.toLocaleString("ru") }} сомони
                  </h2>
                  <h4 class="fs-14 mt-0 mb-20">
                    {{ item.price_m2.toLocaleString("ru") }} сомони/м²
                  </h4>
                  <button
                    @click="$router.push(currentPath + '/' + item.id)"
                    class="el-button el-button--primary is-round py-10 px-50 fs-12 d-none d-lg-block"
                  >
                    Подробнее
                  </button>
                </div>
                <div>
                  <p class="fs-14 mb-0 text-grey">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-2 w-100 mt-10 ">
              <div
                class="w-100 h-100 d-flex flex-column justify-content-between"
              >
                <div>
                  <div class="col mt-10 d-flex justify-content-center">
                    <div class="avatar row">
                      <el-image
                        draggable="false"
                        class="w-100 h-100 border-rad-5"
                        :src="item.user_avatar"
                        fit="cover"
                        v-if="item.user_avatar"
                      ></el-image>
                      <div v-else>
                        <i
                          class="bi bi-briefcase fs-22"
                          v-if="item.is_agent"
                        ></i>
                        <i class="bi bi-person-check fs-22" v-else></i>
                      </div>
                    </div>
                  </div>
                  <div class="fs-12 text-center">
                    <div class="mt-10">
                      <span>{{ item.userInfo }}</span>
                    </div>
                    <div class="mt-5 text-grey">
                      <span v-if="!item.is_agent">собственник</span>
                      <span v-else>агент </span>
                    </div>

                    <div class="mt-5 text-grey">
                      <span>{{ item.date }}</span
                      >&nbsp;/&nbsp;
                      <span><i class="bi bi-eye"></i> {{ item.view }}</span>
                    </div>
                  </div>
                </div>
                <div class="mt-10 row d-block d-sm-none">
                  <div class="col mt-5 d-flex justify-content-center">
                    <button
                      @click="$router.push(currentPath + '/' + item.id)"
                      class="el-button el-button--primary is-round py-10 w-100 fs-12"
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-50 d-flex justify-content-center" v-if="offerData.pages">
          <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :total="offerData.pages"
            :page-size="1"
          ></el-pagination>
        </div>
      </div>
      <div v-else>
        <div class="card-wrap">
          <client-only>
            <OfferMap
              :mapCoords="getMarkers('coords')"
              :mapMarkers="getMarkers()"
              :isListMarkers="isListMarkers"
            ></OfferMap>
          </client-only>
        </div>
      </div>
    </div>
    <EmptyCat v-else />
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
import OfferMap from "@/pages/account/add_offer/components/offer_map.vue";

export default {
  props: {
    offerData: {
      type: Object,
      required: false,
      default: Object
    },
    isMapShow: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    OfferMap
  },
  data() {
    return {
      isListMarkers: true,
      currentPath: this.$nuxt.$route.path
    };
  },
  methods: {
    getMarkers(data) {
      let mapMarkers = [];
      if (this.offerData) {
        for (let item of this.offerData.list_offers) {
          mapMarkers.push(item.map_marker);
        }
      }
      if (mapMarkers.length < 2) {
        this.isListMarkers = false;
      }
      if (data === "coords") {
        return mapMarkers[0];
      } else {
        return mapMarkers;
      }
    },
    handleCurrentChange(val) {
      let queryData = {};
      queryData.page = val;
      this.$router.push({ query: queryData });
    }
  }
};
</script>

<style lang="scss">
.offer {
  .hooper-prev {
    opacity: 0;
    transition: all 0.3s ease;
  }
  .hooper-next {
    opacity: 0;
    transition: all 0.3s ease;
  }
  &:hover {
    // cursor: pointer;
    .hooper-prev {
      opacity: 1;
    }
    .hooper-next {
      opacity: 1;
    }
  }
}
</style>

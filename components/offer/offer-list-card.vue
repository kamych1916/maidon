<template>
  <div v-if="offerData">
    <div class="row">
      <div class="col-lg-4 w-100 mt-10">
        <hooper style="cursor: grab">
          <slide v-for="(img, index) in offerData.images" :key="index">
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
              :src="offerData.images[1].imgName"
              fit="cover"
            ></el-image>
          </div>
          <div class="col">
            <el-image
              class="border-rad-5 w-100"
              style="height: 80px"
              :src="offerData.images[2].imgName"
              fit="cover"
            ></el-image>
          </div>
          <div class="col">
            <el-image
              class="border-rad-5 w-100"
              style="height: 80px"
              :src="offerData.images[3].imgName"
              fit="cover"
            ></el-image>
          </div>
        </div>
      </div>
      <div class="col-lg-6 w-100 mt-10">
        <div class="h-100 d-flex flex-column justify-content-between">
          <div>
            <h1
              @click="
                offerData.deal
                  ? $router.push(
                      offerData.deal +
                        '/' +
                        offerData.object +
                        '/' +
                        offerData.id
                    )
                  : $router.push(currentPath + '/' + offerData.id)
              "
              class="fs-28 mt-0 mb-20 text-blue cursor"
            >
              {{ offerData.title }}
            </h1>
            <h3 class="fs-14 my-20" style="color: #c0c4cc">
              {{ offerData.address }}
            </h3>
            <h2 class="fs-28 mt-20 mb-0">
              {{ offerData.price.toLocaleString("ru") }} сомони
            </h2>
            <h4 class="fs-14 mt-0 mb-20">
              {{ offerData.price_m2.toLocaleString("ru") }} сомони/м²
            </h4>
            <button
              @click="
                offerData.deal
                  ? $router.push(
                      offerData.deal +
                        '/' +
                        offerData.object +
                        '/' +
                        offerData.id
                    )
                  : $router.push(currentPath + '/' + offerData.id)
              "
              class="el-button el-button--primary is-round py-10 px-50 fs-12 d-none d-lg-block"
            >
              Подробнее
            </button>
          </div>
          <div>
            <p class="fs-14 mb-0 text-grey">
              {{ offerData.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-2 w-100 mt-10 ">
        <div class="w-100 h-100 d-flex flex-column justify-content-between">
          <div>
            <div class="col mt-10 d-flex justify-content-center">
              <div class="avatar row">
                <el-image
                  draggable="false"
                  class="w-100 h-100 border-rad-5"
                  :src="offerData.user_avatar"
                  fit="cover"
                  v-if="offerData.user_avatar"
                ></el-image>
                <div v-else>
                  <i
                    class="bi bi-briefcase fs-22"
                    v-if="offerData.is_agent"
                  ></i>
                  <i class="bi bi-person-check fs-22" v-else></i>
                </div>
              </div>
            </div>
            <div class="fs-12 text-center">
              <div class="mt-10">
                <span>{{ offerData.userInfo }}</span>
              </div>
              <div class="mt-5 text-grey">
                <span v-if="!offerData.is_agent">собственник</span>
                <span v-else>агент </span>
              </div>

              <div class="mt-5 text-grey">
                <span>{{ offerData.date }}</span
                >&nbsp;/&nbsp;
                <span><i class="bi bi-eye"></i> {{ offerData.view }}</span>
              </div>
            </div>
          </div>
          <div class="mt-10 row d-block d-sm-none">
            <div class="col mt-5 d-flex justify-content-center">
              <button
                @click="$router.push(currentPath + '/' + offerData.id)"
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
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
export default {
  props: ["offerData"],
  components: {
    Hooper,
    Slide,
    HooperNavigation
  },
  data() {
    return {
      currentPath: this.$nuxt.$route.path
    };
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

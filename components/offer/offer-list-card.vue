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
        <nuxt-link
          class="cursor"
          :to="
            offerData.deal
              ? '/' +
                offerData.deal +
                '/' +
                offerData.object +
                '/' +
                offerData.id
              : currentPath + '/' + offerData.id
          "
          target="_blank"
        >
          <div class="row mt-20 px-2 bottom-images">
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
        </nuxt-link>
      </div>
      <div class="col-lg-6 w-100 mt-10">
        <div class="h-100 d-flex flex-column justify-content-between">
          <div>
            <nuxt-link
              :to="
                offerData.deal
                  ? '/' +
                    offerData.deal +
                    '/' +
                    offerData.object +
                    '/' +
                    offerData.id
                  : currentPath + '/' + offerData.id
              "
              class="fs-28 mt-0 mb-20 text-blue cursor"
              target="_blank"
            >
              {{ offerData.title }}
            </nuxt-link>
            <h3 class="fs-14 mb-20 " style="color: #c0c4cc">
              {{ offerData.address }}
            </h3>
            <h2 class="fs-28 mt-20 mb-0">
              {{ offerData.price.toLocaleString("ru") }} сомони
            </h2>
            <h4 class="fs-14 mt-0 mb-20">
              {{ offerData.price_m2.toLocaleString("ru") }} сомони/м²
            </h4>
            <nuxt-link
              :to="
                offerData.deal
                  ? '/' +
                    offerData.deal +
                    '/' +
                    offerData.object +
                    '/' +
                    offerData.id
                  : currentPath + '/' + offerData.id
              "
              class="el-button el-button--primary is-round py-10 px-50 fs-12 d-none d-lg-block cursor"
              target="_blank"
              style="width: fit-content;"
            >
              Подробнее
            </nuxt-link>
          </div>
          <div>
            <p class="fs-14 mb-0 text-grey" style="word-break: break-all">
              {{ offerData.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-2 w-100 mt-10 ">
        <div class="w-100 h-100 d-flex flex-column justify-content-between">
          <nuxt-link
            class="cursor"
            :to="
              offerData.account_type === 'realtor'
                ? '/realtors/' + offerData.id_user
                : offerData.account_type === 'agency'
                ? '/agencies/' + offerData.id_user
                : ''
            "
            target="_blank"
          >
            <div class="col mt-10 d-flex justify-content-center ">
              <div
                class="avatar row"
                :style="{
                  background: offerData.user_avatar ? 'none' : '#b9d7f7'
                }"
              >
                <el-image
                  draggable="false"
                  class="w-100 h-100"
                  :src="offerData.user_avatar"
                  fit="cover"
                  v-if="offerData.user_avatar"
                ></el-image>
                <div v-else>
                  <i
                    class="bi bi-person-check fs-22"
                    v-if="offerData.account_type == 'owner'"
                  ></i>
                  <i
                    class="bi bi-briefcase fs-22"
                    v-else-if="offerData.account_type == 'realtor'"
                  ></i>
                  <i class="bi bi-journal-medical fs-22" v-else></i>
                </div>
              </div>
            </div>
            <div class="fs-12 text-center">
              <div class="mt-10">
                <span>{{ offerData.userInfo }}</span>
              </div>
              <div class="mt-5 text-grey">
                <span v-if="offerData.account_type == 'owner'"
                  >собственник</span
                >
                <span v-else-if="offerData.account_type == 'realtor'"
                  >риелтор</span
                >
                <span v-else>агентство </span>
              </div>

              <div class="mt-5 text-grey">
                <span>{{ offerData.date }}</span
                >&nbsp;/&nbsp;
                <span><i class="bi bi-eye"></i> {{ offerData.view }}</span>
              </div>
            </div>
          </nuxt-link>

          <div class="mt-10 row d-block d-md-none">
            <div class="col mt-5 d-flex justify-content-center">
              <nuxt-link
                :to="
                  offerData.deal
                    ? '/' +
                      offerData.deal +
                      '/' +
                      offerData.object +
                      '/' +
                      offerData.id
                    : currentPath + '/' + offerData.id
                "
                class="el-button el-button--primary is-round py-10 w-100 fs-12 cursor"
                target="_blank"
                style="width: fit-content;"
              >
                Подробнее
              </nuxt-link>
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

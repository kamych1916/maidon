<template>
  <div v-if="offerData">
    <div
      class="card-wrap offer"
      v-for="(item, index) in offerData.list_offers"
      :key="index"
    >
      <div
        @click="$router.push(currentPath + '/' + item.id)"
        style="text-decoration: none; color: black"
      >
        <div class="row">
          <div class="col-xl-4 w-100 mt-10">
            <hooper>
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
          <div class="col-xl-6 w-100 mt-10">
            <div class="h-100 d-flex flex-column justify-content-between">
              <div>
                <h1 class="fs-28 mt-0 mb-20" style="color: #409eff; ">
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
              </div>
              <div>
                <p class="fs-14 mb-0">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 w-100 mt-10 ">
            <div class="w-100 ">
              <div class="col mt-5 d-xl-flex justify-content-center">
                <div class="avatar row">
                  <i class="bi bi-briefcase fs-22" v-if="item.is_agent"></i>
                  <i class="bi bi-person-check fs-22" v-else></i>
                </div>
              </div>
              <div class="row">
                <div class="col mt-5 d-xl-flex justify-content-center">
                  <span class="fs-12  ">{{ item.userInfo }}</span>
                </div>
              </div>
              <div class="row">
                <div class="col mt-5 d-xl-flex justify-content-center">
                  <span class="fs-12  ">{{ item.date }}</span>
                </div>
              </div>
              <div class="row">
                <div class="col mt-5 d-xl-flex justify-content-center">
                  <button
                    @click="showTel = !showTel"
                    v-if="!showTel"
                    class="el-button el-button--primary py-5 px-10 fs-12"
                  >
                    Показать телефон
                  </button>
                  <span class="fs-12" v-if="showTel">
                    {{ item.tel }}
                  </span>
                </div>
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
      showTel: false,
      currentPath: this.$nuxt.$route.path
    };
  },
  methods: {
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
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border: 1px solid #f1f2f4;
    background: #b9d7f7;
    color: white;
    border-radius: 4px;
  }
  .hooper-prev {
    background-color: rgba(31, 45, 61, 0.4);
    color: white;
    border-radius: 30px;
    opacity: 0;
    transition: all 0.3s ease;
    padding: 5px;
    margin-left: 20px;
    svg {
      fill: white;
    }
  }
  .hooper-next {
    background-color: rgba(31, 45, 61, 0.4);
    color: white;
    border-radius: 30px;
    opacity: 0;
    transition: all 0.3s ease;
    padding: 5px;
    margin-right: 20px;
    svg {
      fill: white;
    }
  }
  &:hover {
    cursor: pointer;
    .hooper-prev {
      opacity: 1;
    }
    .hooper-next {
      opacity: 1;
    }
  }
}
.hooper {
  height: 300px !important;
  border-radius: 10px !important;
  &:focus {
    outline: none !important;
  }
  .hooper-slide {
    padding: 0 3px;
    border-radius: 10px !important;
  }
  .hooper-list {
    border-radius: 10px !important;
    &:focus {
      outline: none !important;
    }
  }
  .hooper-track {
    border-radius: 10px !important;
    &:focus {
      outline: none !important;
    }
  }
  .hooper-slide {
    border-radius: 10px !important;
    &:focus {
      outline: none !important;
    }
  }
}
</style>

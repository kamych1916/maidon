<template>
  <div>
    <div
      class="card-wrap offer"
      v-for="(item, index) in offerData"
      :key="index"
    >
      <div class="row">
        <div class="col-xl-4 w-100">
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
          <div class="row mt-20 px-5">
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
        <div class="col-xl-6 w-100 ">
          <div class="h-100 d-flex flex-column justify-content-between">
            <div>
              <h1 class="fs-28 mt-0 mb-20">
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
        <div class="col-xl-2 w-100">3</div>
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
  }
};
</script>

<style lang="scss">
.offer {
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
  height: 300px;
  border-radius: 10px !important;
  &:focus {
    outline: none !important;
  }
  .hooper-slide {
    padding: 0 5px;
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

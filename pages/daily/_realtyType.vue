<template>
  <div>
    <div class="card-wrap">
      <div>
        <Breadcrumbs />
      </div>
      <div><Search :title="title" /></div>
    </div>
    <div class="card-wrap">
      <div class="row">
        <div class="col-xl-4 w-100">
          <el-carousel class="border-rad-10" height="350px" :autoplay="false">
            <el-carousel-item v-for="item in 3" :key="item">
              <!-- <img width="100%" height="100%" src="/images/card-1.jpg" /> -->
              <el-image
                class="w-100 h-100"
                src="/images/card-1.jpg"
                fit="cover"
              ></el-image>
            </el-carousel-item>
          </el-carousel>
          <div class="row mt-20">
            <div class="col ">
              <el-image
                class="border-rad-5 w-100 h-100"
                src="/images/card-1.jpg"
                fit="cover"
              ></el-image>
            </div>
            <div class="col">
              <el-image
                class="border-rad-5 w-100 h-100"
                src="/images/card-1.jpg"
                fit="cover"
              ></el-image>
            </div>
            <div class="col">
              <el-image
                class="border-rad-5 w-100 h-100"
                src="/images/card-1.jpg"
                fit="cover"
              ></el-image>
            </div>
          </div>
        </div>
        <div class="col-xl-6 w-100 ">2</div>
        <div class="col-xl-2 w-100 ">3</div>
      </div>
    </div>
  </div>
</template>

<script>
import { search } from "~/utils/search";
export default {
  mixins: [search],
  data() {
    return {
      param: this.$route.params.realtyType,
      title: null
    };
  }
};
</script>

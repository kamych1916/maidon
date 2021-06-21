<template>
  <div class=" complex-wrap" style="height:87vh">
    <hooper ref="slider" class="gallery-slide" :wheelControl="false">
      <slide draggable="false" class="cursor">
        <el-image
          draggable="false"
          class="w-100 h-100 border-rad-10"
          src="/images/hide-moskva-jk-989757839-10.jpg"
          fit="cover"
        ></el-image>
      </slide>
      <slide draggable="false" class="cursor">
        <el-image
          draggable="false"
          class="w-100 h-100 border-rad-10"
          src="/images/hide-moskva-jk-989757847-10.jpg"
          fit="cover"
        ></el-image>
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
    <!-- <img
      style="object-fit: cover; background-size: cover"
      src="/images/hide-moskva-jk-989757839-10.jpg"
      width="100%"
      height="100%"
    /> -->
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation
  }
};
</script>

<style lang="scss">
.complex-wrap {
  .gallery-slide {
    height: 100% !important;
  }
  .gallery-thumb {
    height: 100% !important;
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
      height: 100% !important;
    }
    .gallery-thumb {
      height: 100% !important;
    }
  }
}
</style>

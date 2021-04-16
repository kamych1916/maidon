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
          <div v-touch:swipe="swipeHandler">
            <el-carousel
              ref="photoFrame"
              class="border-rad-10 "
              height="350px"
              :autoplay="false"
            >
              <el-carousel-item v-for="item in 3" :key="item">
                <!-- <img width="100%" height="100%" src="/images/card-1.jpg" /> -->
                <el-image
                  draggable="false"
                  class="w-100 h-100"
                  src="/images/card-1.jpg"
                  fit="cover"
                ></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>
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
        <div class="col-xl-6 w-100 ">
          <div class="h-100 d-flex flex-column justify-content-between ">
            <div>
              <h1 class="fs-28 mt-0 mb-20">
                1-комн. кв., 46м², 5/16 этаж
              </h1>
              <h3 class="fs-14 my-20" style="color: #c0c4cc">
                Город Душанбе, улица Рудаки 70
              </h3>
              <h2 class="fs-28 mt-20 mb-0">500 000 сомони</h2>
              <h4 class="fs-14 mt-0 mb-20">500 000 сомони/м²</h4>
            </div>
            <div>
              <p class="fs-14 mb-0">
                Прямая продажа от застройщика! Скидка при 100% оплате. Ипотека
                от 5,7%. Рассрочка 0%. Продаётся уютная 1-комнатная квартира в
                ЖК бизнес-класса "Настоящее" в районе Раменки. Квартира общей
                площадью 46.00 м2 расположена на 6 этаже 28 этажного дома жилого
                квартала. Сдача предусмотрена в 2022 году. Благодаря
                эргономичной планировке квартира получилась просторной, несмотря
                на небольшую площадь. При входе в квартиру находится кухня 17.10
                м2 и жилая площадь 15.20 м2 позволят реализовать любые
                дизайнерские идеи.
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
import { search } from "~/utils/search";
export default {
  mixins: [search],
  data() {
    return {
      param: this.$route.params.realtyType,
      title: null
    };
  },
  methods: {
    swipeHandler(direction) {
      if (direction == "left") {
        this.$refs.photoFrame.next();
      }

      if (direction == "right") {
        this.$refs.photoFrame.prev();
      }
    }
  }
};
</script>

<template>
  <div class="main-block container">
    <Title />
    <div class="row mt-50 mb-100 d-flex justify-content-center">
      <Offers />
    </div>
    <div class="row my-100 align-items-center">
      <div class=" col-lg-6 d-flex justify-content-center">
        <el-image src="/images/offers.png"> </el-image>
      </div>
      <div class=" col-lg-6 ">
        <div>
          <div class="fs-28 mb-10">Чем мы занимаемся?</div>
          Сайт <span class="text-blue"> Maidon.tj </span> предназначен для
          размещения объявлений об аренде и продаже недвижимости в Таджикистане.
          <br />
          Все представленные на сайте объекты проверены профессиональными
          модераторами.
        </div>
      </div>
    </div>
    <div class="row my-100">
      <div class="col">
        <div class="card-wrap  w-100">
          <div
            @click="$router.push('all-realty-offers-on-map')"
            class="w-100 map-image d-flex justify-content-center align-items-center"
          >
            <button class="el-button el-button--primary">
              Все объявления на карте
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card-wrap ">
          <div class="d-flex align-items-center justify-content-center">
            <img width="300" height="300" src="/images/realtors.png" />
          </div>
          <div
            class="fs-22 mb-10 d-flex align-items-center justify-content-center  "
          >
            <div class="text-center">
              Много времени занимает поиск недвижимости?
              <div class="mt-10">
                Обратитетесь к
                <nuxt-link to="/realtors"> риелторам</nuxt-link> либо
                <nuxt-link to="/agencies"> агентствам</nuxt-link>!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card-wrap  ">
          <div class="d-flex align-items-center justify-content-center">
            <img width="300" height="300" src="/images/services.png" />
          </div>
          <div
            class="fs-22 mb-10 d-flex align-items-center justify-content-center  "
          >
            <div class="text-center">
              Необходима помощь по услугам?
              <div class="mt-10">
                Обратитетесь к
                <nuxt-link to="/services"> специалистам</nuxt-link>!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "~/pages/index-components/Title";
import Offers from "~/pages/index-components/Offers";

export default {
  components: {
    Title,
    Offers
  }
};
</script>

<style lang="scss">
.map-image {
  cursor: pointer;
  border-radius: 10px;
  height: 300px;
  background-image: url("/images/map.jpg");
}
</style>

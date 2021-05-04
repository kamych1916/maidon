<template>
  <div class="main-block">
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
          <h1>Чем мы занимаемся?</h1>
          Сайт <span class="text-blue"> Maidon.tj </span> предназначен для
          размещения объявлений об аренде и продаже недвижимости в Таджикистане.
          <br />
          Все представленные на сайте объекты проверены профессиональными
          модераторами.
        </div>
      </div>
    </div>
    <div class="row my-100">
      <div class="card-wrap w-100">
        <div
          @click="$router.push('all-offers')"
          class="w-100 map-image d-flex justify-content-center align-items-center"
        >
          <button class="el-button el-button--primary">
            Все объявления на карте
          </button>
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
  border-radius: 20px;
  height: 300px;
  background-image: url("/images/map.jpg");
}
</style>

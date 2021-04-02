<template>
  <div class="main-block" style="postion:relative">
    <div class="backdrop"></div>
    <Title />
    <div class="row my-50 d-flex justify-content-center">
      <Offers />
    </div>
  </div>
</template>

<script>
import Title from "~/pages/main-components/Title";
import Offers from "~/pages/main-components/Offers";
export default {
  components: {
    Title,
    Offers
  }
};
</script>

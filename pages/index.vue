<template>
  <div class="main-block" style="postion:relative">
    <Title />
    <div class="row mt-50 mb-100 d-flex justify-content-center">
      <Offers />
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

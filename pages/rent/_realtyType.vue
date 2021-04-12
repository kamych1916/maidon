<template>
  <div class="card-wrap">
    <div>
      <Breadcrumbs />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: this.$route.params.realtyType
    };
  }
  // async asyncData({ params, redirect }) {
  //   console.log(params.realtyType);
  //   return {
  //     param: params.realtyType
  //   };
  // }
};
</script>

<style></style>

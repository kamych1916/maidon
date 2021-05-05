<template>
  <div class="d-flex justify-content-center text-center mt-50">
    <div>
      <h1 class="fs-22" v-if="error.statusCode === 404">
        Уппс! Данной страницы не существует :(
      </h1>
      <h1 v-else>Уппс! что то не так с сервером :(</h1>
      <!-- - {{ error.statusCode }} -->
      <NuxtLink class="mt-20 el-button el-button--primary is-round" to="/"
        >к главной странице</NuxtLink
      >
      <div class="w-100 d-flex justify-content-center">
        <div class="w-50 ">
          <el-image src="/images/404.svg"></el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: " Maidon - несуществующая страница | что то не так с сервером"
    };
  },
  props: ["error"],
  layout: "error"
};
</script>

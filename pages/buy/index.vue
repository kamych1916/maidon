<template>
  <div class="card-wrap">
    <div>
      <Breadcrumbs />
    </div>
    <div class="mt-20">
      <ObjectLinks title="Купить недвижимость в Таджикистане" link="buy" />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Купить недвижимость в Таджикистане"
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style></style>

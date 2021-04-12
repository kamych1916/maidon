<template>
  <div class="card-wrap">
    <div>
      <Breadcrumbs />
    </div>
    <div class="mt-20">
      <ObjectLinks
        title="Снять недвижимость посуточно в Таджикистане"
        link="daily"
      />
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
};
</script>

<style></style>

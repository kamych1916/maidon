<template>
  <div>
    <div class="card-wrap">
      <div>
        <Breadcrumbs />
      </div>
      <div><Search :title="title" /></div>
    </div>
    <div class="card-wrap">test</div>
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
  }
};
</script>

<template>
  <div class="container">
    <Header />
    <slide-y-down-transition :duration="700">
      <Nuxt />
    </slide-y-down-transition>
    <Footer v-if="$route.path.split('/')[1] !== 'account'" />
    <back-to-top text="Back to top" visibleoffset="0" right="30px">
      <el-button type="primary" circle>
        <i class="bi bi-arrow-up-circle"></i>
      </el-button>
    </back-to-top>
  </div>
</template>

<script>
import Header from "@/layouts/default-components/header.vue";
import Footer from "@/layouts/default-components/footer.vue";
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    SlideYDownTransition,
    Header,
    Footer
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        window.scrollTo(0, 0);
      }
    }
  }
};
</script>

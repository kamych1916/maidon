<template>
  <div class="container">
    <Header />
    <slide-y-down-transition :duration="700">
      <Nuxt />
    </slide-y-down-transition>
    <Footer v-if="$route.path.split('/')[1] !== 'account'" />
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
  }
};
</script>

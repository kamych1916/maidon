<template>
  <div class="container">
    <header
      class="header d-flex justify-content-between align-items-center container py-20 px-0"
    >
      <nuxt-link to="/" class="header-btn">
        <i class="bi bi-building mr-8"></i>
        <span>placemy</span>
      </nuxt-link>
      <div class="events">
        <nuxt-link to="/account/add_post" class="header-btn mx-10 py-12">
          <i class="bi bi-plus-circle ml-4"></i>
          <span class="events-text ml-10">Разместить объявление</span>
        </nuxt-link>
        <nuxt-link to="/account/login" class="header-btn mx-10 py-12">
          <i class="bi bi-person-circle mx-4"></i>
          <span class="events-text ml-10">Войти</span>
        </nuxt-link>
      </div>
    </header>
    <slide-y-down-transition :duration="700">
      <Nuxt />
    </slide-y-down-transition>
  </div>
</template>

<script>
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    SlideYDownTransition
  }
};
</script>

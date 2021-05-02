<template>
  <div class="card-wrap w-100 mb-50">
    <div class="row d-flex justify-content-center">
      <img
        src="/images/empty-cat2.png"
        style="object-fit: cover; "
        width="150"
        height="150"
      />
    </div>
    <div class="row d-flex justify-content-center text-center mt-20">
      <div v-if="title" class="mb-20">
        {{ title }}
      </div>
      <div v-else>
        <div>В данном разделе пока что нет объявлений.</div>
        <div class="mt-20 mb-10">
          <button
            @click="check_access()"
            class="el-button el-button--primary is-round mx-10 py-12"
          >
            <i class="bi bi-plus-circle"></i>
            <span class="events-text ml-10">Добавить объявление</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cookiesEvents } from "~/utils/cookies";
export default {
  mixins: [cookiesEvents],
  props: {
    title: {
      type: String,
      required: false,
      default: ""
    }
  },
  methods: {
    check_access() {
      if (this.getCookie("session_token")) {
        this.$router.push("/account/add_offer");
      } else {
        this.$router.push("/account/login");
      }
    }
  }
};
</script>

<style></style>

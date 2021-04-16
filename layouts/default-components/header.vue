<template>
  <header
    class="header d-flex justify-content-between align-items-center container py-20 px-0"
  >
    <nuxt-link to="/" class="header-btn">
      <i class="bi bi-building mr-8"></i>
      <span>maidon</span>
    </nuxt-link>
    <div class="events">
      <a
        href="javascript:void(0);"
        @click="checkAccess('offer')"
        class="header-btn mx-10 py-12"
      >
        <i class="bi bi-plus-circle ml-4"></i>
        <span class="events-text ml-10">Добавить объявление</span>
      </a>
      <a
        href="javascript:void(0);"
        @click="checkAccess('account')"
        class="header-btn mx-10 py-12"
      >
        <i class="bi bi-person-circle mx-4"></i>
        <span class="events-text ml-10">Войти</span>
      </a>
    </div>
  </header>
</template>

<script>
import Api from "~/utils/api";
export default {
  methods: {
    checkAccess(data) {
      Api.getInstance()
        .auth.checkAccess()
        .then(response => {
          if (data == "account") {
            response.data == true
              ? this.$router.push("/account")
              : this.$router.push("/account/login");
          } else {
            response.data == true
              ? this.$router.push("/account/add_offer")
              : this.$router.push("/account/login");
          }
        });
      // if (data == "account") {
      //   this.$router.push("/account/login");
      // } else {
      //   this.$router.push("/account/add_offer");
      // }
    }
  }
};
</script>

<style></style>

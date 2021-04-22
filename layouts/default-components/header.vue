<template>
  <header
    class="header d-flex justify-content-between align-items-center container py-20 px-0"
  >
    <nuxt-link to="/" class="header-btn">
      <i class="bi bi-building mr-8"></i>
      <span>Maidon</span>
    </nuxt-link>
    <div class="events d-flex">
      <a
        href="javascript:void(0);"
        @click="checkAccess('offer')"
        class="header-btn mx-10 py-12"
      >
        <i class="bi bi-plus-circle "></i>
        <span class="events-text ml-10">Добавить объявление</span>
      </a>
      <a
        v-if="!isLogin"
        href="javascript:void(0);"
        @click="checkAccess('account')"
        class="header-btn mx-10 py-12"
      >
        <i class="bi bi-person-circle "></i>
        <span class="events-text ml-10">Войти</span>
      </a>
      <el-popover v-else width="160" class="mt-12" placement="top">
        <div>
          <div class="pb-10 w-100" style="border-bottom: 1px solid #ccc">
            Рахимов Камол
          </div>
          <nuxt-link to="/account/profile" class="w-100">
            <div class="w-100 my-10" to="/account/profile">
              Профиль
            </div>
          </nuxt-link>
          <nuxt-link to="/account/my-offers">
            <div class="w-100 my-10">
              Мои объвления
            </div>
          </nuxt-link>
          <div
            class="py-10 w-100"
            style="border-top: 1px solid #ccc; cursor: pointer"
            @click="logOut()"
          >
            Выйти
          </div>
        </div>
        <a
          href="javascript:void(0);"
          slot="reference"
          class="header-btn mx-10 py-14"
        >
          <i class="bi bi-person-circle "></i>
          <span class="events-text ml-10">Аккаунт</span>
        </a>
      </el-popover>
    </div>
  </header>
</template>

<script>
import Api from "~/utils/api";
import { cookiesEvents } from "~/utils/cookies";
export default {
  mixins: [cookiesEvents],
  data() {
    return {
      isLogin: false
    };
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.changeBtnLogin();
      }
    }
  },
  mounted() {
    this.changeBtnLogin();
  },
  methods: {
    checkAccess(data) {
      if (this.getCookie("session_token")) {
        if (data == "account") {
          this.$router.push("/account/profile");
        } else {
          this.$router.push("/account/add_offer");
        }
      } else {
        Api.getInstance()
          .auth.checkAccess()
          .then(response => {
            if (data == "account") {
              response.data == true
                ? this.$router.push("/account/profile")
                : this.$router.push("/account/login");
            } else {
              response.data == true
                ? this.$router.push("/account/add_offer")
                : this.$router.push("/account/login");
            }
          });
      }
      // if (data == "account") {
      //   this.$router.push("/account/login");
      // } else {
      //   this.$router.push("/account/add_offer");
      // }
    },
    changeBtnLogin() {
      if (this.getCookie("session_token")) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    logOut() {
      this.delCookie("session_token");
      this.isLogin = false;
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
.header {
  .header-btn {
    padding: 10px 20px;
    color: #fff;
    text-decoration: none;
    border-radius: 35px;
    transition: 0.2s;
    background-color: #3a8ee6;
    &:hover {
      background-color: #66b1ff;
    }
  }
  .events-text {
    display: inline;
  }
  @media (max-width: 767px) {
    .events-text {
      display: none;
    }
  }
}
</style>

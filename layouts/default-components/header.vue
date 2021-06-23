<template>
  <div class="container">
    <header
      class="header d-flex justify-content-between align-items-center  py-20 px-0"
    >
      <div class="d-flex">
        <el-button @click="$router.push('/')" type="primary" round>
          <i class="bi bi-building mr-8"></i>
          <span>Maidon</span>
        </el-button>
        <HedaerItems />
      </div>
      <div class=" d-flex">
        <el-button @click="check_access('offer')" type="primary" round>
          <i class="bi bi-plus-circle"></i>
          <span class="events-text ml-10">Добавить объявление</span>
        </el-button>
        <el-button
          v-if="!isLogin"
          @click="check_access('account')"
          type="primary"
          round
        >
          <i class="bi bi-person-circle"></i>
          <span class="events-text ml-10">Войти</span>
        </el-button>
        <el-popover v-else width="160" placement="top" class="ml-10">
          <div v-if="userData">
            <div
              class="pb-10 w-100"
              style="border-bottom: 1px solid #ccc; word-break: break-word;"
            >
              <span v-if="companyName"> {{ companyName }} </span>
              <span v-else> {{ name }} {{ surname }} </span>
            </div>
            <nuxt-link
              v-if="userData.is_moder"
              :to="
                isServices
                  ? '/account/moderation-service'
                  : '/account/moderation-realty'
              "
              class="w-100"
            >
              <div class="w-100 my-10">
                Модерация
              </div>
            </nuxt-link>
            <nuxt-link
              v-if="!userData.is_moder"
              :to="
                isServices
                  ? '/account/my-offers-service'
                  : '/account/my-offers-realty'
              "
            >
              <div class="w-100 my-10">
                Мои объвления
              </div>
            </nuxt-link>
            <nuxt-link
              v-if="!userData.is_moder"
              to="/account/profile"
              class="w-100"
            >
              <div class="w-100 my-10" to="/account/profile">
                Профиль
              </div>
            </nuxt-link>
            <nuxt-link to="/account/chat">
              <div class="w-100 my-10">
                Сообщения
              </div>
            </nuxt-link>

            <div
              class="pt-10 w-100 cursor"
              style="border-top: 1px solid #ccc;"
              @click="logOut()"
            >
              Выйти
            </div>
          </div>
          <el-button slot="reference" type="primary" round>
            <i class="bi bi-person-circle"></i>
            <span class="events-text ml-10">Аккаунт</span>
          </el-button>
        </el-popover>
      </div>
    </header>
  </div>
</template>

<script>
// import Api from "~/utils/api";
import { cookiesEvents } from "~/utils/cookies";
import HedaerItems from "@/layouts/default-components/header-items.vue";

export default {
  components: {
    HedaerItems
  },
  mixins: [cookiesEvents],
  data() {
    return {
      name: "",
      surname: "",
      companyName: "",
      isLogin: false,
      userData: null,
      isServices: false
    };
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.changeBtnLogin();
        if (localStorage.getItem("ui")) {
          this.userData = JSON.parse(localStorage.getItem("ui"));
          this.name = JSON.parse(localStorage.getItem("ui")).name;
          this.surname = JSON.parse(localStorage.getItem("ui")).surname;
          this.companyName = JSON.parse(localStorage.getItem("ui")).companyName;
        }
      }
    }
  },
  mounted() {
    let store = JSON.parse(localStorage.getItem("ui"));
    if (store) {
      this.userData = store;
      this.name = store.name;
      this.companyName = store.companyName;
      this.surname = store.surname || "";
      this.changeBtnLogin();
      if (
        store.type == "services" ||
        store.account_type == "entity" ||
        store.account_type == "individual"
      ) {
        this.isServices = true;
      }
    }
  },
  methods: {
    check_access(data) {
      if (this.getCookie("session_token")) {
        if (data == "account") {
          this.$router.push("/account/profile");
        } else {
          if (!this.userData.is_moder) this.$router.push("/account/add_offer");
        }
      } else {
        this.$router.push("/account/login");
        // Api.getInstance()
        //   .auth.check_access()
        //   .then(response => {
        //     if (data == "account") {
        //       response.data == true
        //         ? this.$router.push("/account/profile")
        //         : this.$router.push("/account/login");
        //     } else {
        //       response.data == true
        //         ? this.$router.push("/account/add_offer")
        //         : this.$router.push("/account/login");
        //     }
        //   })
        //   .catch(error => {
        //     Api.typicalNTFS(error.response.status);
        //   });
      }
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
      localStorage.removeItem("ui");
      this.isLogin = false;
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
.header {
  .dialog {
    background-color: transparent;
  }
  .backdrop {
    z-index: -1;
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    min-height: 100vh;
    background-color: rgba(000, 000, 000, 0.5);
  }
  .header-btn {
    padding: 10px 20px;
    color: #fff;
    text-decoration: none;
    border-radius: 35px;
    transition: 0.2s;
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

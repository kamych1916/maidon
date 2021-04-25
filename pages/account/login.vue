<template>
  <!-- <div class="card-wrap d-flex"> -->
  <div class="auth-template mt-50">
    <form @submit.prevent="signin">
      <h3>Авторизация</h3>

      <div class="form-group mb-10">
        <el-input
          v-model="userData.email"
          name="email"
          placeholder="E-mail адрес"
          auto-complete
          required
          clearable
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        ></el-input>
      </div>

      <div class="form-group mb-10">
        <el-input
          v-model="userData.password"
          name="password"
          placeholder="Пароль"
          required
          show-password
          type="password"
          pattern=".{8,}"
          title="Пароль должен составлять из 8 или более символов"
        ></el-input>
      </div>

      <div class="pt-10">
        <button
          class="el-button el-button--primary is-round py-14 w-100"
          type="submit"
        >
          Войти
        </button>
      </div>

      <div class="row d-flex justify-content-between px-0 mx-0">
        <p class="forgot-password mt-2 mb-4">
          <router-link to="/account/register">Регистрация </router-link>
        </p>
        <p class="forgot-password mt-2 mb-4">
          <router-link to="/account/forgot">Забыли пароль ?</router-link>
        </p>
      </div>
    </form>
  </div>
  <!-- </div> -->
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
export default {
  data() {
    return {
      userData: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    signin() {
      Api.getInstance()
        .auth.signin(this.userData)
        .then(response => {
          this.setCookie("ui", JSON.stringify(response.data), 1);
          this.setCookie(
            "session_token",
            JSON.stringify(response.data.session_token),
            1
          );
          Api.typicalNTFS(false, "Авторизация прошла успешно!");
          this.$router.push("/account/profile");
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },
    sendNTFS(title, message, type) {
      NTFS.getInstance().NTFS(title, message, type);
    }
  }
};
</script>

<style></style>

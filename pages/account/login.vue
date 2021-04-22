<template>
  <!-- <div class="card-wrap d-flex"> -->
  <div class="auth-template mt-50">
    <form @submit.prevent="onSubmit">
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
    onSubmit() {
      Api.getInstance()
        .auth.login(this.userData)
        .then(response => {
          this.setCookie("session_token", "kek", 1);
          this.sendNTFS("Отлично!", "Авторизация прошла успешно!", "success");
          this.$router.push("/account/profile");
        })
        .catch(error => {
          let status = error.response.status;
          if (status == 500) {
            this.sendNTFS("Ошибка", "Сервер не доступен :(", "error");
          } else if (status == 422) {
            this.sendNTFS(
              "Ошибка",
              "Сервер получил неверные данные :(",
              "error"
            );
          } else if (status == 426) {
            this.sendNTFS(
              "Ошибка",
              "Ваш аккаунт не активирован! Проверьте почту",
              "error"
            );
            setTimeout(() => {
              this.$router.push("/account/activate");
            }, 1500);
          } else if (status == 404) {
            this.sendNTFS("Ошибка", "Данной почты не существует", "warning");
          } else if (status == 401) {
            this.sendNTFS("Ошибка", "Неверный логин или пароль", "warning");
          }
        });
    },
    sendNTFS(title, message, type) {
      NTFS.getInstance().NTFS(title, message, type);
    }
  }
};
</script>

<style></style>

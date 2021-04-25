<template>
  <div class="auth-template mt-50">
    <form @submit.prevent="signup()" autocomplete="off">
      <h3>Регистрация</h3>

      <div class="form-group mb-18">
        <el-input
          required
          v-model="userData.name"
          name="name"
          placeholder="Имя"
          clearable
          type="text"
        ></el-input>
      </div>

      <div class="form-group mb-18">
        <el-input
          required
          v-model="userData.surname"
          name="surname"
          placeholder="Фамилия"
          clearable
          type="text"
        ></el-input>
      </div>

      <div class="form-group mb-18">
        <el-input
          required
          v-model="userData.tel"
          name="telephone"
          clearable
          pattern="\+[0-9]{3} \([0-9]{3}\)-[0-9]{2}-[0-9]{2}-[0-9]{2}"
          v-mask="'+992 (###)-##-##-##'"
          placeholder="+992 (000) 00-00-00"
          title="+992 (000)-00-00-00"
          type="text"
        ></el-input>
      </div>

      <div class="form-group mb-18">
        <el-input
          required
          v-model="userData.email"
          name="email"
          placeholder="E-mail адрес"
          clearable
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          type="email"
        ></el-input>
      </div>

      <div class="form-group mb-18">
        <el-input
          required
          v-model="userData.password"
          name="password"
          placeholder="Пароль"
          auto-complete="off"
          show-password
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Не менее восьми символов, содержащих хотя бы одну цифру и символы из верхнего и нижнего регистра"
          type="password"
        ></el-input>
      </div>

      <div class="form-group mb-18">
        <el-input
          required
          v-model="passwordS"
          name="password"
          placeholder="Подтвердите пароль"
          auto-complete="off"
          show-password
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Не менее восьми символов, содержащих хотя бы одну цифру и символы из верхнего и нижнего регистра"
          type="password"
        ></el-input>
      </div>

      <button
        class="el-button el-button--primary is-round py-14 w-100"
        type="submit"
      >
        Регистрация
      </button>

      <p class="forgot-password text-right">
        Имеете аккаунт ?
        <router-link to="/account/login">Авторизоваться</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
export default {
  data() {
    return {
      userData: {
        name: null,
        surname: null,
        tel: null,
        email: null,
        password: null
      },
      passwordS: null
    };
  },
  methods: {
    signup() {
      if (this.userData.password != this.passwordS) {
        this.sendNTFS("Ошибка", "Пароли не совпадают :(", "warning");
      } else {
        Api.getInstance()
          .auth.signup(this.userData)
          .then(response => {
            Api.typicalNTFS(
              false,
              "Регистрация прошла успешно, подвердите свой аккаунт, проверьте почту свою почту!"
            );
            this.$router.push("/account/login");
          })
          .catch(error => {
            Api.typicalNTFS(error.response.status);
          });
      }
    },
    sendNTFS(title, message, type) {
      NTFS.getInstance().NTFS(title, message, type);
    }
  }
};
</script>

<style></style>

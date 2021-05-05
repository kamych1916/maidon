<template>
  <div class="auth-template text-center pb-50 mt-50">
    <form @submit.prevent="restore_pass()">
      <h3>Изменение пароля</h3>
      <el-input
        class="mb-18"
        required
        v-model="userPass.new_password"
        placeholder="Введите пароль"
        auto-complete="off"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Не менее восьми символов, содержащих хотя бы одну цифру и символы из верхнего и нижнего регистра"
        show-password
        type="password"
      ></el-input>
      <el-input
        class="mb-18"
        required
        v-model="userPass.repeat_password"
        placeholder="Повторите пароль"
        auto-complete="off"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Не менее восьми символов, содержащих хотя бы одну цифру и символы из верхнего и нижнего регистра"
        type="password"
      ></el-input>
      <button
        type="submit"
        class="el-button el-button--primary is-round fs-14 py-14 px-5 mx-0 w-100"
      >
        Изменить
      </button>
    </form>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
export default {
  data() {
    return {
      userPass: {
        new_password: "",
        repeat_password: ""
      }
    };
  },
  methods: {
    restore_pass() {
      if (this.userPass.new_password != this.userPass.repeat_password) {
        this.sendNTFS("Ошибка", "Пароли не совпадают :(", "warning");
      } else {
        Api.getInstance()
          .account.restore_pass({
            token: this.$router.currentRoute.query["pwd"],
            password: this.userPass.new_password
          })
          .then(response => {
            this.userPass.new_password = "";
            this.userPass.repeat_password = "";
            Api.typicalNTFS(false, "пароль успешно изменён");
            this.$router.push("/");
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

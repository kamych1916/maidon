<template>
  <div class="auth-dialog-wrap auth-template mt-50">
    <form @submit.prevent="reset_pass()">
      <h3>Восстановление пароля</h3>

      <div class="form-group mb-18">
        <el-input
          required
          v-model="tel"
          name="telephone"
          clearable
          pattern="\+[0-9]{3} \([0-9]{3}\)-[0-9]{2}-[0-9]{2}-[0-9]{2}"
          v-mask="'+992 (###)-##-##-##'"
          placeholder="+992 (000) 00-00-00"
          title="+992 (000)-00-00-00"
          type="text"
        ></el-input>
      </div>

      <button
        class="el-button el-button--primary is-round py-14 w-100 mb-5"
        type="submit"
      >
        Восстановить
      </button>

      <div class="row d-flex justify-content-between px-0 mx-0">
        <p class="forgot-password mt-2 mb-4">
          <router-link to="/account/register">Регистрация </router-link>
        </p>
        <p class="forgot-password mt-2 mb-4">
          <router-link to="/account/login">Авторизация</router-link>
        </p>
      </div>
    </form>
    <div
      v-if="dialogVisible"
      class="dialog d-flex justify-content-center align-items-center"
      :class="[openDialog ? 'dialog-active' : '']"
    >
      <div class="card-wrap p-40" style="width:70%">
        <div class="form-group my-14 mb-18">
          <el-input
            required
            v-model="SMScode"
            placeholder="Введите код из SMS"
            clearable
            type="number"
            minlength="6"
            maxlength="6"
          ></el-input>
        </div>

        <div class="form-group mt-14 mb-18">
          <el-input
            v-model="password"
            placeholder="Придумайте новый пароль"
            name="password"
            required
            show-password
            type="password"
            pattern=".{8,}"
            title="Пароль должен составлять из 8 или более символов"
          ></el-input>
        </div>

        <div class="form-group mt-14 mb-18">
          <el-input
            v-model="passwordСonfirm"
            placeholder="Подтвердите новый пароль"
            name="password"
            required
            show-password
            type="password"
            pattern=".{8,}"
            title="Пароль должен составлять из 8 или более символов"
          ></el-input>
        </div>

        <button
          class="el-button el-button--primary is-round mt-14 py-14 w-100"
          @click="restore_pass()"
        >
          Изменить
        </button>
      </div>
      <div class="backdrop w-100 cursor" @click="dialogVisible = false"></div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
export default {
  data() {
    return {
      tel: null,
      passwordСonfirm: null,
      password: null,

      dialogVisible: false,

      SMScode: null
    };
  },
  methods: {
    restore_pass() {
      if (this.password != this.passwordСonfirm) {
        this.sendNTFS("Ошибка", "Пароли не совпадают :(", "warning");
      } else {
        let data = {
          tel: this.tel,
          code: this.SMScode,
          password: this.password
        };
        Api.getInstance()
          .account.restore_pass(data)
          .then(response => {
            this.$router.push("/account/login");
          })
          .catch(error => {
            Api.typicalNTFS(error.response.status);
          });
      }
    },
    openDialog() {
      this.dialogVisible = true;
    },
    reset_pass() {
      Api.getInstance()
        .account.reset_pass({ tel: this.tel })
        .then(response => {
          this.dialogVisible = true;
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    }
  }
};
</script>

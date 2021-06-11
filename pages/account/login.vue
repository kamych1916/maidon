<template>
  <!-- <div class="card-wrap d-flex"> -->
  <div class="auth-dialog-wrap auth-template mt-50">
    <form @submit.prevent="signin">
      <h3>Авторизация</h3>

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

      <div class=" w-100">
        <button
          class="el-button el-button--primary is-round mt-14 py-14 w-100"
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

    <div
      v-if="dialogVisible"
      class="dialog d-flex justify-content-center align-items-center"
      :class="[openDialog ? 'dialog-active' : '']"
    >
      <div class="card-wrap activate-wrap p-40">
        <div class="form-group mt-14 mb-18">
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
        <button
          class="el-button el-button--primary is-round mt-14 py-14 w-100"
          @click="send_activate_code()"
        >
          Отправить
        </button>
      </div>
      <div class="backdrop w-100 cursor" @click="dialogVisible = false"></div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";

export default {
  data() {
    return {
      dialogVisible: false,

      userData: {
        tel: null,
        password: null
      },

      SMScode: null
    };
  },
  methods: {
    send_activate_code() {
      let data = {
        tel: this.userData.tel,
        code: this.SMScode
      };
      Api.getInstance()
        .auth.send_activate_code(data)
        .then(response => {
          if (response.data) {
            this.dialogVisible = false;
            Api.typicalNTFS(false, "Аккаунт активирован успешно!");
          } else {
            this.sendNTFS("Ошибка", "Код введён неверно :(", "warning");
          }
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },
    openDialog() {
      this.dialogVisible = true;
    },
    setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    signin() {
      if (!this.isVerify)
        Api.getInstance()
          .auth.signin(this.userData)
          .then(response => {
            localStorage.setItem("ui", JSON.stringify(response.data));
            this.setCookie(
              "session_token",
              JSON.stringify(response.data.session_token),
              1
            );
            Api.typicalNTFS(false, "Авторизация прошла успешно!");
            if (response.data.is_moder) {
              if (JSON.parse(localStorage.getItem("ui")).type == "services") {
                this.$router.push("/account/moderation-service");
              } else {
                this.$router.push("/account/moderation-realty");
              }
            } else {
              this.$router.push("/account/profile");
            }
          })
          .catch(error => {
            if (error.response.status == 426) {
              this.openDialog();
            }
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

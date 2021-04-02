<template>
  <div class="card-wrap text-center pb-50" v-if="access">
    <span v-if="success">
      <i style="font-size: 6em; color: #027502" class="el-icon-success"></i
      ><br /><br />
      Благодарим Вас за подтверждение аккаунта! <br /><br />
      Вы будете переведены на главную
    </span>
    <span v-else>
      <i style="font-size: 6em; color: #a20000" class="el-icon-error"></i
      ><br /><br />
      Простите, но Ваш код активации просрочен! <br /><br />Повторите процесс
      авторизации еще раз. <br /><br />
      Вы будете переведены на главную
    </span>
    страницу через {{ currentTime }} с.
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
export default {
  data() {
    return {
      access: true,
      success: false,
      currentTime: 6,
      timer: null
    };
  },
  mounted() {
    this.checkAccess();
  },
  destroyed() {
    this.stopTimer();
  },
  methods: {
    checkAccess() {
      Api.getInstance()
        .auth.send_activate_code(this.$router.currentRoute.query["access"])
        .then(response => {
          this.success = true;
          this.startTimer();
        })
        .catch(error => {
          let status = error.response.status;
          if (status == 500) {
            this.access = false;
            this.sendNTFS("Ошибка", "Сервер не доступен :(", "error");
            setTimeout(() => {
              this.$router.push("/");
            }, 1500);
          } else if (status == 422) {
            this.access = false;
            this.$router.push("/");
          } else if (status == 409) {
            this.success = false;
            this.startTimer();
          }
        });
    },
    sendNTFS(title, message, type) {
      NTFS.getInstance().NTFS(title, message, type);
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--;
      }, 1000);
    },
    stopTimer() {
      clearTimeout(this.timer);
    }
  },
  watch: {
    currentTime(time) {
      if (time === 0) {
        this.stopTimer();
        this.$router.push("/");
      }
    }
  }
};
</script>

<style></style>

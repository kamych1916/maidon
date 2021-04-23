<template>
  <div>
    <Tabs />
    <div class="row">
      <div class="col-lg-3">
        <div class="card-wrap">
          <div class="row d-flex">
            <div class="col-3">
              <div class="avatar">
                <el-image
                  draggable="false"
                  class="w-100 h-100 border-rad-5"
                  :src="userData.avatar"
                  fit="cover"
                  v-if="userData.avatar"
                ></el-image>
                <i
                  class="bi bi-person-circle fs-22"
                  v-if="!userData.avatar"
                ></i>
              </div>
            </div>
            <div
              class="col ml-10 d-flex justify-content-around align-items-center"
            >
              <div class="fs-14 text-blue">
                <input
                  id="upload-photo"
                  max-size="800"
                  type="file"
                  class="box-photo-input"
                  accept="image/png, image/jpeg, image/jpg"
                  @change="filesChange"
                  style="opacity: 0; position: absolute; z-index: -1; "
                />
                <label
                  for="upload-photo"
                  style="margin-bottom: 0px !important; cursor: pointer"
                  >Изменить</label
                >
              </div>
              <div class="fs-14 text-blue cursor" @click="delAvatar()">
                Удалить
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg">
        <div class="card-wrap">
          <form @submit.prevent="patchInfo()">
            <el-input
              class="mb-18"
              required
              v-model="userData.name"
              name="name"
              placeholder="Имя"
              clearable
              type="text"
            ></el-input>
            <el-input
              class="mb-18"
              required
              v-model="userData.surname"
              name="surname"
              placeholder="Фамилия"
              clearable
              type="text"
            ></el-input>
            <el-input
              class="mb-18"
              required
              v-model="userData.tel"
              name="tel"
              clearable
              pattern="\+[0-9]{3} \([0-9]{3}\)-[0-9]{2}-[0-9]{2}-[0-9]{2}"
              v-mask="'+992 (###)-##-##-##'"
              placeholder="+992 (000) 00-00-00"
              title="+992 (000)-00-00-00"
              type="text"
              autocomplete="off"
            ></el-input>
            <button
              type="submit"
              class="el-button el-button--primary is-round fs-14 py-14 px-5 mx-0 w-100"
            >
              Изменить
            </button>
          </form>
        </div>
      </div>
      <div class="col-lg">
        <div class="card-wrap">
          <form @submit.prevent="patchPass()">
            <el-input
              class="mb-18"
              required
              v-model="userPass.old_password"
              placeholder="Старый пароль"
              auto-complete="off"
              show-password
              type="password"
            ></el-input>
            <el-input
              class="mb-18"
              required
              v-model="userPass.new_password"
              placeholder="Новый пароль"
              auto-complete="off"
              show-password
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
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import Tabs from "@/pages/account/components/tabs.vue";
import { cookiesEvents } from "~/utils/cookies";
import NTFS from "~/utils/notifications";

export default {
  mixins: [cookiesEvents],
  components: {
    Tabs
  },
  data() {
    return {
      userData: {
        name: null,
        surname: null,
        tel: null,
        avatar: null
      },
      userPass: {
        old_password: null,
        new_password: null
      }
    };
  },
  mounted() {
    this.userData.name = this.readCookie("ui").name;
    this.userData.surname = this.readCookie("ui").surname;
    this.userData.tel = this.readCookie("ui").tel;
    this.userData.avatar = this.readCookie("ui").avatar;
  },
  methods: {
    patchInfo() {
      Api.getInstance().account.patchInfo(this.userData);
    },
    patchPass() {
      Api.getInstance()
        .account.patchPass(this.userPass)
        .then(response => {
          this.sendNTFS("Отлично!", "пароль успешно изменён", "success");
        })
        .catch(error => {
          console.log("patchPass-> ", error);
          let status = error.response.status;
          if (status == 500) {
            this.sendNTFS("Ошибка", "Сервер не доступен :(", "error");
          } else if (status == 409) {
            this.sendNTFS("Ошибка", "Старый пароль не совпадает :(", "error");
          }
        });
    },
    delAvatar() {
      Api.getInstance()
        .account.delAvatar()
        .then(response => {
          this.userData.avatar = "";
          this.setCookie("ui", JSON.stringify(this.userData));
        })
        .catch(error => {
          console.log("delAvatar-> ", error);
        });
    },
    filesChange(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        if (file.size > 500 * 500) {
          this.sendNTFS(
            "Предупрждение!",
            "Размер фотографии не должно превышать пятиста килобайт!",
            "warning"
          );
        } else {
          const formData = new FormData();
          formData.append("file", file);
          Api.getInstance()
            .account.loadAvatar(formData)
            .then(response => {
              this.userData.avatar = response.data.avatar;
              this.setCookie("ui", JSON.stringify(this.userData));
            })
            .catch(error => {
              console.log("loadAvatar-> ", error);
            });
        }
      }
    },
    sendNTFS(title, message, type) {
      NTFS.getInstance().NTFS(title, message, type);
    }
  }
};
</script>

<style></style>

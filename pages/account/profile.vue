<template>
  <div v-if="checkAccess" class="profile">
    <Tabs />
    <div class="row">
      <div class="col-lg-3">
        <div class="card-wrap">
          <div class="row d-flex">
            <div class="col-3">
              <div
                class="avatar"
                :style="{
                  background: userData.avatar ? 'none' : '#b9d7f7'
                }"
              >
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
                  @change="upload_avatar"
                  style="opacity: 0; position: absolute; z-index: -1; "
                />
                <label
                  for="upload-photo"
                  class="cursor"
                  style="margin-bottom: 0px !important;"
                  >Изменить</label
                >
              </div>
              <div class="fs-14 text-blue cursor" @click="delete_avatar()">
                Удалить
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg">
        <div class="card-wrap">
          <form @submit.prevent="patch_info()">
            <el-input
              class="mb-18"
              required
              v-model="userData.name"
              name="name"
              placeholder="Имя"
              clearable
              type="text"
              v-if="
                localStore.account_type == 'owner' ||
                  localStore.account_type == 'realtor'
              "
            ></el-input>
            <el-input
              class="mb-18"
              required
              v-model="userData.surname"
              name="surname"
              placeholder="Фамилия"
              clearable
              type="text"
              v-if="
                localStore.account_type == 'owner' ||
                  localStore.account_type == 'realtor'
              "
            ></el-input>
            <el-input
              class="mb-18"
              required
              v-model="userData.companyName"
              name="companyName"
              placeholder="Наименование компании"
              clearable
              type="text"
              v-if="localStore.account_type == 'agency'"
            ></el-input>
            <el-date-picker
              prefix-icon="none"
              :placeholder="
                localStore.account_type == 'agency'
                  ? 'Дата образования'
                  : 'Начало вашей карьеры'
              "
              class="w-100 mb-18"
              v-model="userData.workDate"
              type="year"
              format="yyyy"
              value-format="yyyy"
              v-if="
                localStore.account_type == 'agency' ||
                  localStore.account_type == 'realtor'
              "
            >
            </el-date-picker>

            <div
              class="form-group d-flex mb-18"
              v-if="
                localStore.account_type == 'agency' ||
                  localStore.account_type == 'realtor'
              "
            >
              <el-input
                type="textarea"
                placeholder="Специализация"
                :autosize="{ minRows: 1, maxRows: 20 }"
                v-model="userData.specialization"
              >
              </el-input>
              <el-tooltip
                class="item"
                effect="dark"
                content=""
                placement="top-start"
              >
                <div slot="content">
                  Например: <br /><br />Аренда недвижимости: жилая, загородная,
                  зарубежная, коммерческая, <br />
                  <br />Другие услуги: дизайн интерьера, консультации,<br />
                  ремонт, страхование, управление объектами,
                  <br /><br />Ипотечное кредитование: ипотека, рефинансирование,
                  <br /><br />
                  Продажа недвижимости: жилая, загородная, зарубежная,
                </div>
                <el-button
                  class="px-10"
                  type="text"
                  icon="bi bi-question-circle"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </div>

            <div
              class="form-group d-flex mb-18"
              v-if="
                localStore.account_type == 'agency' ||
                  localStore.account_type == 'realtor'
              "
            >
              <el-input
                type="textarea"
                :placeholder="
                  localStore.account_type == 'agency'
                    ? 'О вашей компании'
                    : 'О себе'
                "
                :autosize="{ minRows: 1, maxRows: 20 }"
                v-model="userData.about"
              >
              </el-input>
              <el-tooltip
                class="item"
                effect="dark"
                content=""
                placement="top-start"
              >
                <div slot="content" v-if="localStore.account_type == 'realtor'">
                  Например: <br /><br />Доброго времени суток! Осуществляю<br />
                  деятельность в сфере недвижимости более 11 лет. Имеется
                  огромный<br />
                  багаж знаний и колоссальный опыт работы какв Жилых так<br />
                  и в Коммерческих сегментах.<br />
                  Всегда готов выслушать и помочь в решении Вашего вопроса.
                  <br />
                  Моя страница в Instagram: @ivanov.ivanov <br />
                  С уважением, Иванов Иван
                </div>
                <div slot="content" v-else>
                  Например: <br /><br />Коллектив Maidon Realty Company - это
                  профессионалы рынка<br />
                  недвижимости, с многолетним стажем работы в передовых
                  <br />агентствах недвижимости, умеющих работать в <br />любой
                  сфере недвижимости: аренда, продажа, покупка жилой,<br />
                  коммерческой, загородной и зарубежной недвижимости
                </div>
                <el-button
                  class="px-10"
                  type="text"
                  icon="bi bi-question-circle"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </div>

            <el-input
              v-if="
                localStore.account_type == 'agency' ||
                  localStore.account_type == 'realtor'
              "
              required
              v-model="userData.website"
              placeholder="Сайт компании"
              clearable
              type="text"
              minlength="5"
              maxlength="25"
              class="mb-18"
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
          <form @submit.prevent="patch_pass()">
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
      localStore: "",
      checkAccess: false,
      userData: {
        name: null,
        surname: null,
        companyName: null,
        tel: null,
        workDate: null,
        specialization: null,
        about: null,
        website: null,
        avatar: null
      },
      userPass: {
        old_password: null,
        new_password: null
      }
    };
  },
  mounted() {
    if (localStorage.getItem("ui")) {
      this.localStore = JSON.parse(localStorage.getItem("ui"));
    }
    if (this.getCookie("session_token") && localStorage.getItem("ui")) {
      if (this.localStore.is_moder) {
        this.$router.push("moderation");
      } else {
        this.userData.name = this.localStore.name;
        this.userData.surname = this.localStore.surname;
        this.userData.tel = this.localStore.tel;
        this.userData.avatar = this.localStore.avatar;
        this.userData.companyName = this.localStore.companyName;
        this.userData.workDate = String(this.localStore.workDate);
        this.userData.specialization = this.localStore.specialization;
        this.userData.about = this.localStore.about;
        this.userData.website = this.localStore.website;

        this.checkAccess = true;
      }
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    patch_info() {
      console.log(this.userData);
      Api.getInstance()
        .account.patch_info(this.userData)
        .then(response => {
          localStorage.setItem("ui", JSON.stringify(response.data));
          Api.typicalNTFS(false, "данные успешно изменены");
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },
    patch_pass() {
      Api.getInstance()
        .account.patch_pass(this.userPass)
        .then(response => {
          this.userPass.old_password = "";
          this.userPass.new_password = "";
          Api.typicalNTFS(false, "пароль успешно изменён");
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },
    delete_avatar() {
      Api.getInstance()
        .account.delete_avatar()
        .then(response => {
          this.userData.avatar = "";
          localStorage.setItem("ui", JSON.stringify(this.userData));
          Api.typicalNTFS(false, "аватарка была удалена");
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },
    upload_avatar(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        if (file.size > 256 * 256) {
          this.sendNTFS(
            "Предупрждение!",
            "Размер фотографии не должно превышать 256 килобайт!",
            "warning"
          );
        } else {
          const formData = new FormData();
          formData.append("file", file);
          Api.getInstance()
            .account.upload_avatar(formData)
            .then(response => {
              this.userData.avatar = response.data.avatar;
              localStorage.setItem("ui", JSON.stringify(this.userData));
              Api.typicalNTFS(false, "аватарка была загружена");
            })
            .catch(error => {
              Api.typicalNTFS(error.response.status);
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

<style lang="scss">
.profile {
  .el-textarea__inner {
    border: none;
    background-color: #f2f3f7;
    padding: 15px 30px !important;
    border-radius: 30px !important;
    color: #409eff;
  }
}
</style>

<template>
  <div class="auth-dialog-wrap register">
    <div class="radio-types ">
      <h4 class="mt-30">
        Выберите тип аккаунта:
      </h4>
      <div class="row mt-30">
        <div class="col-md-4 col-6 my-10">
          <label class="custom-radio w-100 ">
            <input
              type="radio"
              value="owner"
              @change="onClick()"
              v-model="picked_account"
            />
            <span class="radio-btn w-100 pb-20">
              <i class="bi bi-person"></i>
              <h3>Собственник</h3>
            </span>
          </label>
        </div>
        <div class="col-md-4 col-6 my-10">
          <label class="custom-radio w-100">
            <input
              type="radio"
              value="realtor"
              @change="onClick()"
              v-model="picked_account"
            />
            <span class="radio-btn w-100 pb-20">
              <i class="bi bi-briefcase"></i>
              <h3>Риелтор</h3>
            </span>
          </label>
        </div>
        <div class="col-md-4 col-6 my-10">
          <label class="custom-radio w-100">
            <input
              type="radio"
              value="agency"
              @change="onClick()"
              v-model="picked_account"
            />
            <span class="radio-btn w-100 pb-20">
              <i class="bi bi-journal-medical"></i>
              <h3>Агентство</h3>
            </span>
          </label>
        </div>
        <div class="col-md-4 col-6 my-10">
          <label class="custom-radio w-100 ">
            <input
              type="radio"
              value="services"
              @change="onClick()"
              v-model="picked_account"
            />
            <span class="radio-btn w-100 pb-20">
              <i class="bi bi-arrow-repeat"></i>
              <h3>Услуги</h3>
            </span>
          </label>
        </div>
      </div>
    </div>

    <slide-y-down-transition :duration="700">
      <div v-if="picked_account" class="auth-template mb-100 mt-50">
        <form @submit.prevent="signup()" autocomplete="off">
          <h3>Регистрация</h3>

          <div
            class="form-group mb-18"
            v-if="
              picked_account == 'owner' ||
                picked_account == 'realtor' ||
                (picked_account == 'services' && service_type == 'individual')
            "
          >
            <el-input
              required
              v-model="userData.name"
              name="name"
              placeholder="Имя"
              clearable
              type="text"
              minlength="2"
              maxlength="15"
            ></el-input>
          </div>

          <div
            class="form-group mb-18"
            v-if="
              picked_account == 'owner' ||
                picked_account == 'realtor' ||
                (picked_account == 'services' && service_type == 'individual')
            "
          >
            <el-input
              required
              v-model="userData.surname"
              name="surname"
              placeholder="Фамилия"
              clearable
              type="text"
              minlength="2"
              maxlength="15"
            ></el-input>
          </div>

          <div
            class="form-group mb-18"
            v-if="
              picked_account == 'agency' ||
                (picked_account == 'services' && service_type == 'entity')
            "
          >
            <el-input
              required
              v-model="userData.companyName"
              name="surname"
              placeholder="Наименование компании"
              clearable
              type="text"
              minlength="2"
              maxlength="15"
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
          <div class="form-group mb-18 w-100">
            <el-select
              v-model="service_type"
              placeholder="Выберите вид аккаунта"
              class="w-100"
              v-if="picked_account == 'services'"
            >
              <el-option
                v-for="item in services_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div
            class="form-group mb-18"
            v-if="
              picked_account == 'agency' ||
                picked_account == 'realtor' ||
                picked_account == 'services'
            "
          >
            <el-date-picker
              prefix-icon="none"
              :placeholder="
                picked_account == 'agency'
                  ? 'Дата образования'
                  : 'Начало вашей карьеры'
              "
              class="w-100"
              v-model="userData.workDate"
              type="year"
              name="workdate"
              format="yyyy"
              value-format="yyyy"
            >
            </el-date-picker>
          </div>

          <div
            class="form-group d-flex mb-18"
            v-if="picked_account == 'agency' || picked_account == 'realtor'"
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
                ремонт, страхование, управление объектами, <br /><br />Ипотечное
                кредитование: ипотека, рефинансирование, <br /><br />
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
            v-if="picked_account == 'agency' || picked_account == 'realtor'"
          >
            <el-input
              type="textarea"
              :placeholder="
                picked_account == 'agency' ? 'О вашей компании' : 'О себе'
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
              <div slot="content" v-if="picked_account == 'realtor'">
                Например: <br /><br />Доброго времени суток! Осуществляю<br />
                деятельность в сфере недвижимости более 11 лет. Имеется
                огромный<br />
                багаж знаний и колоссальный опыт работы какв Жилых так<br />
                и в Коммерческих сегментах.<br />
                Всегда готов выслушать и помочь в решении Вашего вопроса. <br />
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

          <div
            class="form-group mb-18"
            v-if="picked_account == 'agency' || picked_account == 'realtor'"
          >
            <el-input
              required
              v-model="userData.website"
              placeholder="Сайт компании"
              clearable
              type="text"
              minlength="2"
              maxlength="15"
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
              v-model="passwordСonfirm"
              name="password"
              placeholder="Подтвердите пароль"
              auto-complete="off"
              type="password"
            ></el-input>
          </div>

          <div class="w-100 d-flex justify-content-center">
            <client-only>
              <vue-recaptcha
                ref="invisibleRecaptcha"
                @verify="onVerify"
                @expired="onExpired"
                :sitekey="sitekey"
              >
              </vue-recaptcha>
            </client-only>
          </div>
          <button
            class="el-button el-button--primary is-round mt-14 py-14 w-100"
            type="submit"
            :disabled="isVerify"
          >
            Регистрация
          </button>

          <p class="forgot-password text-right">
            Имеете аккаунт ?
            <router-link to="/account/login">Авторизоваться</router-link>
          </p>
        </form>
      </div>
    </slide-y-down-transition>
    <div
      v-if="dialogVisible"
      class="dialog w-100 d-flex justify-content-center align-items-center"
      :class="[openDialog ? 'dialog-active' : '']"
    >
      <div class="card-wrap activate-wrap text-center p-40">
        Активация
        <div class="form-group mt-20 mb-18">
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
          :disabled="isVerify"
        >
          Отправить
        </button>
      </div>
      <div class="backdrop w-100 cursor" @click="dialogVisible = false"></div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
import { SlideYDownTransition } from "vue2-transitions";
import VueRecaptcha from "vue-recaptcha";

export default {
  head: {
    script: [
      {
        async: true,
        src:
          "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit"
      }
    ]
  },
  components: {
    "vue-recaptcha": VueRecaptcha,
    SlideYDownTransition
  },
  data() {
    return {
      dialogVisible: false,

      sitekey: "6LcAGE0bAAAAAMlaW3SS5J0Zhs_67UeCLlPX9Kr2",
      isVerify: true,

      userData: {
        name: null,
        surname: null,
        companyName: null,
        tel: null,
        email: null,
        password: null,
        workDate: null,
        specialization: null,
        about: null,
        website: null
      },
      picked_account: null,
      passwordСonfirm: null,

      service_type: null,
      services_options: [
        {
          value: "entity",
          label: "юридическое лицо"
        },
        {
          value: "individual",
          label: "физическое лицо"
        }
      ],

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
            this.$router.push("/account/login");
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
    signup() {
      if (!this.isVerify) {
        for (let prop in this.userData) {
          if (this.userData[prop] == null) {
            delete this.userData[prop];
          }
        }
        if (this.userData.password != this.passwordСonfirm) {
          this.sendNTFS("Ошибка", "Пароли не совпадают :(", "warning");
        } else {
          // service_type ?
          let serviceData = {
            companyName: this.userData.companyName,
            account_type: this.service_type,
            name: this.userData.name,
            surname: this.userData.surname,
            tel: this.userData.tel,
            workDate: this.userData.workDate,
            password: this.userData.password
          };
          this.userData.account_type = this.picked_account;

          Api.getInstance()
            .auth.signup(this.service_type ? serviceData : this.userData)
            .then(response => {
              Api.typicalNTFS(
                false,
                "Подтвердите свой аккаунт SMS кодом, проверьте свой телефон!"
              );
              this.openDialog();
            })
            .catch(error => {
              Api.typicalNTFS(error.response.status);
            });
        }
      }
    },
    onVerify(response) {
      this.isVerify = false;
    },
    onExpired() {
      this.isVerify = true;
    },
    onClick() {
      this.userData = {
        name: null,
        surname: null,
        companyName: null,
        tel: null,
        email: null,
        password: null,
        workDate: null,
        specialization: null,
        website: null
      };
      this.service_type = null;
    },
    sendNTFS(title, message, type) {
      NTFS.getInstance().NTFS(title, message, type);
    }
  }
};
</script>

<style lang="scss">
.register {
  position: relative;
  .el-textarea__inner {
    border: none;
    background-color: #f2f3f7;
    padding: 15px 30px !important;
    border-radius: 30px !important;
    color: #409eff;
  }
}
</style>

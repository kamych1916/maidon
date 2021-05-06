<template>
  <div>
    <div class="radio-types ">
      <h4 class="mt-30">Выберите тип аккаунта:</h4>
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
      </div>
    </div>
    <slide-y-down-transition :duration="700">
      <div v-if="picked_account" class="auth-template register mb-100 mt-50">
        <form @submit.prevent="signup()" autocomplete="off">
          <h3>Регистрация</h3>

          <div
            class="form-group mb-18"
            v-if="picked_account == 'owner' || picked_account == 'realtor'"
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
            v-if="picked_account == 'owner' || picked_account == 'realtor'"
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

          <div class="form-group mb-18" v-if="picked_account == 'agency'">
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

          <div
            class="form-group mb-18"
            v-if="picked_account == 'agency' || picked_account == 'realtor'"
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
    </slide-y-down-transition>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
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
      passwordСonfirm: null
    };
  },
  methods: {
    signup() {
      for (let prop in this.userData) {
        if (this.userData[prop] == null) {
          delete this.userData[prop];
        }
      }
      console.log(this.userData);
      if (this.userData.password != this.passwordСonfirm) {
        this.sendNTFS("Ошибка", "Пароли не совпадают :(", "warning");
      } else {
        this.userData.account_type = this.picked_account;
        Api.getInstance()
          .auth.signup(this.userData)
          .then(response => {
            Api.typicalNTFS(
              false,
              "Регистрация прошла успешно, подвердите свой аккаунт, проверьте свою почту!"
            );
            this.$router.push("/account/login");
          })
          .catch(error => {
            Api.typicalNTFS(error.response.status);
          });
      }
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
      this.$emit("checkOfferTypes", {
        picked_deal: this.picked_deal,
        picked_estate: this.picked_estate,
        picked_account: this.picked_account,
        picked_object_commercy: this.picked_object_commercy,
        picked_object_living: this.picked_object_living
      });
    },
    sendNTFS(title, message, type) {
      NTFS.getInstance().NTFS(title, message, type);
    }
  }
};
</script>

<style lang="scss">
.register {
  .el-textarea__inner {
    border: none;
    background-color: #f2f3f7;
    padding: 15px 30px !important;
    border-radius: 30px !important;
    color: #409eff;
  }
}
</style>

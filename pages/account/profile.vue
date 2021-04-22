<template>
  <div>
    <Tabs />
    <div class="row">
      <div class="col-lg-3">
        <div class="card-wrap">
          <div class="row d-flex">
            <div class="col-3">
              <div class="avatar">
                <i class="bi bi-person-check fs-22"></i>
              </div>
            </div>
            <div
              class="col ml-10 d-flex justify-content-around align-items-center"
            >
              <a href="javascript:void(0);" class="fs-14">Изменить </a>
              <a href="javascript:void(0);" class="fs-14">Удалить </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg">
        <div class="card-wrap">
          <form @submit.prevent="">
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
              v-model="userData.patronymic"
              clearable
              name="patronomic"
              placeholder="Отчество"
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
              class="el-button el-button--primary is-round fs-14 py-14 px-5 mx-0 w-100"
            >
              Изменить
            </button>
          </form>
        </div>
      </div>
      <div class="col-lg">
        <div class="card-wrap">
          <form @submit.prevent="">
            <el-input
              class="mb-18"
              required
              v-model="userPass.last"
              placeholder="Старый пароль"
              auto-complete="off"
              show-password
              type="password"
            ></el-input>
            <el-input
              class="mb-18"
              required
              v-model="userPass.new"
              placeholder="Новый пароль"
              auto-complete="off"
              show-password
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Не менее восьми символов, содержащих хотя бы одну цифру и символы из верхнего и нижнего регистра"
              type="password"
            ></el-input>
            <button
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
import Tabs from "@/pages/account/components/tabs.vue";
export default {
  components: {
    Tabs
  },
  data() {
    return {
      userData: {
        name: null,
        surname: null,
        patronymic: null,
        tel: null
      },
      userPass: {
        last: null,
        new: null
      }
    };
  }
};
</script>

<style></style>

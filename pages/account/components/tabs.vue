<template>
  <div class="card-wrap">
    <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick()">
      <el-tab-pane
        v-if="!storeData.is_moder"
        label="Мои объявления"
        :name="isServices ? 'my-offers-service' : 'my-offers-realty'"
      ></el-tab-pane>
      <el-tab-pane
        v-if="storeData.is_moder"
        label="Модерация"
        :name="isServices ? 'moderation-service' : 'moderation-realty'"
      ></el-tab-pane>
      <el-tab-pane
        v-if="!storeData.is_moder"
        label="Профиль"
        name="profile"
      ></el-tab-pane>
      <el-tab-pane label="Сообщения" name="chat"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { cookiesEvents } from "~/utils/cookies";
export default {
  mixins: [cookiesEvents],
  head() {
    return {
      title: "Личный кабинет — Maidon"
    };
  },
  data() {
    return {
      storeData: "",
      activeName: this.$route.path.split("/")[2],
      isServices: false
    };
  },
  mounted() {
    this.storeData = JSON.parse(localStorage.getItem("ui"));
    // type - для проверки модерации, account-type =
    if (
      this.storeData.type == "services" ||
      this.storeData.account_type == "entity" ||
      this.storeData.account_type == "individual"
    ) {
      this.isServices = true;
    }
  },
  methods: {
    handleClick() {
      // if (this.activeName != "messages" && this.activeName != "complaints")
      this.$router.push("/account/" + this.activeName);
    }
  }
};
</script>

<style></style>

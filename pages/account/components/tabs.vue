<template>
  <div class="card-wrap">
    <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick()">
      <el-tab-pane
        v-if="!readCookie('ui').is_moder"
        label="Мои объявления"
        name="my-offers"
      ></el-tab-pane>
      <el-tab-pane
        v-if="readCookie('ui').is_moder"
        label="Модерация"
        name="moderation"
      ></el-tab-pane>
      <el-tab-pane
        v-if="!readCookie('ui').is_moder"
        label="Профиль"
        name="profile"
      ></el-tab-pane>
      <el-tab-pane
        v-if="!readCookie('ui').is_moder"
        label="Сообщения"
        name="chat"
      ></el-tab-pane>
      <el-tab-pane
        v-if="!readCookie('ui').is_moder"
        label="Жалобы"
        name="complaints"
      ></el-tab-pane>
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
      activeName: this.$route.path.split("/")[2]
    };
  },
  methods: {
    handleClick() {
      if (this.activeName != "messages" && this.activeName != "complaints")
        this.$router.push("/account/" + this.activeName);
    }
  }
};
</script>

<style></style>

<template>
  <div class="card-wrap">
    <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick()">
      <el-tab-pane label="Мои объявления" name="my-offers"></el-tab-pane>
      <el-tab-pane label="Профиль" name="profile"></el-tab-pane>
      <el-tab-pane label="Сообщения" name="messages"></el-tab-pane>
      <el-tab-pane label="Жалобы" name="complaints"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
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

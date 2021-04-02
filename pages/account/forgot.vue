<template>
  <div class="auth-template">
    <form>
      <h3>Восстановление пароля</h3>

      <div class="form-group mb-18">
        <el-input
          v-model="userData.email"
          name="email"
          placeholder="E-mail адрес"
          clearable
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        ></el-input>
      </div>

      <button
        class="el-button el-button--primary is-round py-14 w-100 mb-5"
        type="submit"
      >
        Восстановить
      </button>

      <div class="row d-flex justify-content-between px-0 mx-0">
        <p class="forgot-password mt-2 mb-4">
          <router-link to="/account/register">Регистрация </router-link>
        </p>
        <p class="forgot-password mt-2 mb-4">
          <router-link to="/account/login">Авторизация</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        email: null
      }
    };
  }
};
</script>

<style></style>

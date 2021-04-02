<template>
  <div class="container">
    <header
      class="header d-flex justify-content-between align-items-center container py-20 px-0"
    >
      <nuxt-link to="/" class="header-btn">
        <i class="bi bi-building mr-8"></i>
        <span>placemy</span>
      </nuxt-link>
      <div class="events">
        <nuxt-link to="/account/add_post" class="header-btn mx-10">
          <i class="bi bi-plus-circle mr-10"></i>
          Разместить объявление
        </nuxt-link>
        <nuxt-link to="/account/login" class="header-btn">
          Войти
        </nuxt-link>
      </div>
      <div class="sidebar ">
        <i class="bi bi bi-list-ul mr-8"></i>
        Меню
      </div>
    </header>
    <Nuxt />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>

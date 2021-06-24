<template>
  <!-- отличий кода в REALTORS и AGENTS  - никаких нет, кроме пару слов (риелтор и агентства), желательно бы разделить на компоненты. -->
  <div v-if="list" class="realtors container">
    <div class="row">
      <div class="col-lg-4 mb-30">
        <div class="card-wrap sticky">
          <Breadcrumbs />
          <span class="fs-24">
            Найдено риелторов:
            <span class="text-blue">
              {{ list.count }}
            </span>
          </span>
        </div>
      </div>
      <div class="col-lg-8" style="position-relative">
        <div v-for="(item, idx) in list.accounts" :key="idx">
          <nuxt-link
            class="cursor"
            :to="'/realtors/' + item.id"
            target="_blank"
          >
            <div class="card-wrap w-100">
              <div class="row">
                <div
                  class="col-lg my-10 d-flex"
                  style="display: -webkit-inline-box"
                >
                  <div>
                    <div
                      class="avatar"
                      :style="{
                        background: item.avatar ? 'none' : '#b9d7f7',
                      }"
                    >
                      <el-image
                        draggable="false"
                        class="w-100 h-100"
                        :src="item.avatar"
                        fit="cover"
                        v-if="item.avatar"
                      ></el-image>
                      <i class="bi bi-briefcase fs-22" v-if="!item.avatar"></i>
                    </div>
                  </div>
                  <div class="ml-10">
                    <div>
                      <span class="fs-18" style="color: black">
                        {{ item.name }}
                      </span>
                      <div class="fs-12 mt-5" style="color: black">
                        Объектов:
                        <span class="text-blue"> {{ item.offer_count }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg my-10">
                  <el-rate
                    v-model="item.review"
                    disabled
                    show-score
                    text-color="#ff9900"
                  >
                  </el-rate>
                  <div class="fs-12 mt-5" style="color: black">
                    Отзывов:
                    <span class="text-blue"> {{ item.count_reviews }}</span>
                  </div>
                  <span
                    class="fs-12"
                    v-if="item.count_reviews"
                    style="color: black"
                  >
                    {{ item.review_lastuser }}:
                    <span class="text-blue">{{ item.review_text }}</span>
                  </span>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="row justify-content-center">
          <div class="my-50 d-flex justify-content-center" v-if="list.pages">
            <Pagination :listPages="list.pages" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
export default {
  data() {
    return {
      rate: 3.5,
      list: null,
    };
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        window.scrollTo(0, 0);
        this.get_accounts();
      }
    },
  },
  mounted() {
    this.get_accounts();
  },
  methods: {
    get_accounts() {
      let page =
        Object.keys(this.$route.query).length > 0 ? this.$route.query.page : 1;
      Api.getInstance()
        .clients.get_accounts({
          type: "realtor",
          page: page,
        })
        .then((response) => {
          this.list = response.data;
        })
        .catch((error) => {
          Api.typicalNTFS(error.response.status);
        });
    },
  },
};
</script>

<style lang="scss">
.realtors {
  .avatar {
    width: 100px;
    height: 100px;
  }
}
</style>

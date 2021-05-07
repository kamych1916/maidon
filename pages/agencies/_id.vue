<template>
  <!-- отличий кода в REALTORS/_ID и AGENTS/_ID  - никаких нет, кроме пару слов (риелтор и агентства), желательно бы разделить на компоненты. -->
  <div class="row accountRealtor" v-if="accountData">
    <div class="col-lg-8">
      <div class="card-wrap">
        <div class="d-flex">
          <div>
            <div
              class="avatar"
              :style="{
                background: accountData.avatar ? 'none' : '#b9d7f7'
              }"
            >
              <el-image
                draggable="false"
                class="w-100 h-100"
                :src="accountData.avatar"
                fit="cover"
                v-if="accountData.avatar"
              ></el-image>
              <i
                class="bi bi-journal-medical fs-22"
                v-if="!accountData.avatar"
              ></i>
            </div>
          </div>
          <div class="ml-20">
            <div class="text-blue">
              {{ accountData.name }} {{ accountData.surname }}
              {{ accountData.companyName }}
            </div>
            <div class="text-grey">риелтор</div>
            <el-rate
              class="d-lg-none d-block mt-5"
              v-model="accountData.review"
              disabled
              show-score
              text-color="#ff9900"
            >
            </el-rate>
          </div>
        </div>
        <div class="mt-30 mb-10">
          Опыт работы:
          <span class="text-blue"> c {{ accountData.workDate }} года</span>
        </div>
        <div class="my-10">
          Специализация:
          <span class="text-blue">{{ accountData.specialization }}</span>
        </div>
        <div class="my-10">
          О себе:
          <span class="text-blue">{{ accountData.about }}</span>
        </div>
        <div class="mt-20">
          <button
            class="mt-20 mx-0 el-button el-button--primary is-round"
            @click="scrollTo('reviews')"
          >
            отзывы: {{ accountData.list_reviews.length }}
          </button>
          <button
            class=" mt-20 mx-0 el-button el-button--primary is-round"
            @click="scrollTo('offers')"
          >
            объявления: {{ accountData.list_offers.length }}
          </button>
          <a
            :href="'tel:' + accountData.tel"
            class="mt-20 mx-0 el-button el-button--primary is-round d-md-none d-block"
          >
            {{ accountData.tel }}
          </a>
        </div>
      </div>
      <div class="card-wrap" ref="reviews">
        <div class="d-flex">
          <div style="font-size: 56px; line-height: 0.6">
            {{ accountData.review }}
          </div>
          <div class="ml-20">
            <el-rate v-model="accountData.review" disabled> </el-rate>
            <div class="text-grey">
              {{ accountData.list_reviews.length }} отзыва/ов
            </div>
          </div>
        </div>
      </div>
      <div class="card-wrap">
        <div
          v-for="(review, idx) in accountData.list_reviews"
          :key="idx"
          class="d-flex py-40"
          style="border-bottom: 1px solid #ccc"
        >
          <!-- <div>
            <div class="avatar"></div>
          </div> -->
          <div>
            <div class="text-blue">{{ review.user }}</div>
            <div class="text-grey fs-12">{{ review.date }}</div>
            <el-rate
              class=" mt-5"
              v-model="review.value"
              disabled
              show-score
              text-color="#ff9900"
            >
            </el-rate>
            <div>
              {{ review.text }}
              <!-- Очень рекомендую, помогли срочно найти коттедж, нас не смогли
              принять в арендованном у собственника доме и срочно нужна была
              замена, спасибо огромное. Теперь обращаться будем только к вам. -->
            </div>
          </div>
        </div>
        <div class="mt-20" v-if="localStore">
          <div class="d-flex ">
            <div class=" w-100">
              <div>
                {{ localStore.surname }} {{ localStore.name }}
                {{ localStore.companyName }}
              </div>
              <div class="fs-12 text-grey ">Оцените агентство</div>
              <el-rate
                class=" mt-5"
                show-score
                text-color="#ff9900"
                v-model="reviewRate"
              ></el-rate>
            </div>
          </div>
          <el-input
            type="textarea"
            class="mt-20 "
            placeholder="Распиште отзыв конструктивно.."
            v-model="reviewText"
          ></el-input>
          <button
            class="el-button el-button--primary is-round mt-16 "
            @click="add_review()"
          >
            опубликовать
          </button>
        </div>
        <div class="mt-20" v-else>
          Чтобы оставить отзыв пожалуйста
          <nuxt-link to="/account/login"> авторизуйтесь</nuxt-link>
        </div>
      </div>
      <div class="card-wrap" ref="offers">
        <div class="d-flex">
          <div style="font-size: 56px; line-height: 0.6">
            {{ accountData.list_offers.length }}
          </div>
          <div class="ml-20 d-flex align-items-center">
            объявлен
            <span v-if="accountData.list_offers.length == '1'">ие</span>
            <span v-else>ий</span>
          </div>
        </div>
      </div>

      <div>
        <div
          class="card-wrap"
          v-for="(item, index) in accountData.list_offers"
          :key="index"
        >
          <LazyOfferListCard :offerData="item" />
        </div>
      </div>
    </div>
    <div class="col-lg-4 d-none d-sm-block mb-30">
      <div class="card-wrap sticky">
        <Breadcrumbs
          :accountTitle="accountData.name || accountData.companyName"
        />
        <div class="d-flex mt-20">
          <div
            class="avatar"
            :style="{
              background: accountData.avatar ? 'none' : '#b9d7f7'
            }"
          >
            <el-image
              draggable="false"
              class="w-100 h-100"
              :src="accountData.avatar"
              fit="cover"
              v-if="accountData.avatar"
            ></el-image>
            <i
              class="bi bi-journal-medical fs-22"
              v-if="!accountData.avatar"
            ></i>
          </div>
          <div class="ml-20">
            <span
              >{{ localStore.name }} {{ localStore.surname }}
              {{ accountData.companyName }}</span
            ><br />
            <el-rate
              class="mt-5"
              v-model="accountData.review"
              disabled
              show-score
              text-color="#ff9900"
            >
            </el-rate>
          </div>
        </div>
        <a
          :href="'tel:' + accountData.tel"
          class="mt-20 el-button el-button--primary is-round"
          >{{ accountData.tel }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
export default {
  data() {
    return {
      reviewRate: null,
      reviewText: null,
      accountData: null,
      localStore: ""
    };
  },
  mounted() {
    this.get_info_account();

    if (localStorage.getItem("ui")) {
      this.localStore = JSON.parse(localStorage.getItem("ui"));
    }
  },
  methods: {
    add_review() {
      if (this.reviewRate == 0 || !this.reviewRate || !this.reviewText) {
        alert("пошел нахъуй");
      } else {
        Api.getInstance()
          .clients.add_review({
            id: this.$route.params.id,
            text: this.reviewText,
            value: this.reviewRate
          })
          .then(response => {})
          .catch(error => {
            Api.typicalNTFS(error.response.status);
          });
      }
    },
    get_info_account() {
      Api.getInstance()
        .clients.get_info_account(this.$route.params.id)
        .then(response => {
          this.accountData = response.data;
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },
    scrollTo(data) {
      data == "reviews"
        ? this.$refs.reviews.scrollIntoView({ behavior: "smooth" })
        : this.$refs.offers.scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>

<style lang="scss">
.accountRealtor {
  .hooper {
    height: 200px !important;
  }
  .bottom-images {
    .el-image {
      height: 50px !important;
    }
  }
}
</style>

<template>
  <div class="row accountRealtor" v-if="accountData">
    <div class="col-lg-4 d-none d-sm-block mb-20" sticky-container>
      <!-- // TODO: ДОДЕЛАТЬ АДАПТИВНУЮ ВЁРСТКУ - ОТОБРАЗИТЬ МОБ ТЕЛЕФОН В ПРАВОМ БЛОКЕ -->
      <div class="card-wrap" v-sticky>
        <Breadcrumbs :accountTitle="accountData.name" />
        <div class="d-flex mt-20">
          <div class="avatar">
            <el-image
              draggable="false"
              class="w-100 h-100 border-rad-5"
              :src="accountData.avatar"
              fit="cover"
              v-if="accountData.avatar"
            ></el-image>
            <i class="bi bi-briefcase fs-22" v-if="!accountData.avatar"></i>
          </div>
          <div class="ml-20">
            <span>{{ accountData.name }} {{ accountData.surname }}</span
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
    <div class="col-lg-8">
      <div class="card-wrap">
        <div class="d-flex">
          <div class="avatar">
            <el-image
              draggable="false"
              class="w-100 h-100 border-rad-5"
              :src="accountData.avatar"
              fit="cover"
              v-if="accountData.avatar"
            ></el-image>
            <i class="bi bi-briefcase fs-22" v-if="!accountData.avatar"></i>
          </div>
          <div class="ml-20">
            <div class="text-blue">
              {{ accountData.name }} {{ accountData.surname }}
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
        <div class="my-10">
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
            class="el-button el-button--primary is-round"
            @click="scrollTo('reviews')"
          >
            отзывы: {{ accountData.list_reviews.length }}
          </button>
          <button
            class="el-button el-button--primary is-round"
            @click="scrollTo('offers')"
          >
            объявления: {{ accountData.list_offers.length }}
          </button>
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
              <div>{{ localStore.surname }} {{ localStore.name }}</div>
              <div class="fs-12 text-grey ">Оцените специалиста</div>
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
          <div style="font-size: 56px; line-height: 0.6">500</div>
          <div class="ml-20 d-flex align-items-center">
            <div>объявления/ий</div>
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
          .then(response => {
            console.log(response.data);
          })
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
          console.log(response.data);
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

<template>
  <div class="offer-card">
    <div class="card-wrap" v-if="offerData">
      <div class="row">
        <div class="col-lg">
          <Breadcrumbs :offerTitle="offerData.title" />
          <h1 class="mt-10" style="line-height: 1.2 !important;">
            Снять {{ offerData.title }}
          </h1>
        </div>
        <div class="col-lg d-lg-flex justify-content-end">
          <div class="mt-10 fs-14 text-grey">
            {{ offerData.date }} &nbsp;/&nbsp;
            <span><i class="bi bi-eye"></i> 309</span>
          </div>
        </div>
      </div>

      <!-- <h4>{{ offerData }}</h4> -->
    </div>

    <div class="row offer-inner" v-if="offerData">
      <div class="col-lg-8">
        <div class="card-wrap">
          <hooper
            group="group1"
            :wheelControl="false"
            class="gallery-slide mt-10"
          >
            <slide v-for="(img, index) in offerData.offerPhothos" :key="index">
              <el-image
                draggable="false"
                class="w-100 h-100 border-rad-10 "
                :src="img.imgName"
                fit="cover"
              ></el-image>
            </slide>
            <hooper-navigation slot="hooper-addons"></hooper-navigation>
          </hooper>

          <hooper
            group="group1"
            :itemsToShow="3"
            class="gallery-thumb"
            :wheelControl="false"
          >
            <slide v-for="(img, index) in offerData.offerPhothos" :key="index">
              <el-image
                draggable="false"
                class="w-100 h-100 border-rad-10"
                :src="img.imgName"
                fit="cover"
              ></el-image>
            </slide>
          </hooper>
        </div>
      </div>
      <div class="col-lg-4" sticky-container>
        <div class="card-wrap" v-sticky>
          <div class="text-blue fs-28">
            {{ offerData.offer_price.price_mounth }} сомони в месяц
          </div>
          <div class="mt-10" v-if="offerData.offer_price.deposit">
            Залог -
            <span class="text-blue">
              {{ offerData.offer_price.deposit }} сомони
            </span>
          </div>
          <div class="mt-10" v-else>
            Без залога
          </div>
          <div class="mt-10">
            Предоплата -
            <span class="text-blue">
              {{ offerData.offer_price.prepayment }}
            </span>
          </div>
          <div class="mt-10">
            Состав съемщиков -
            <span style="text-transform:lowercase" class="text-blue">
              {{ offerData.offer_price.for_who }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation
  },
  data() {
    return {
      offerId: this.$route.params.id,
      offerData: null
    };
  },
  mounted() {
    if (this.offerId) {
      Api.getInstance()
        .offer.get_offer(this.offerId)
        .then(response => {
          this.offerData = response.data;
          console.log(this.offerData);
        });
    }
  }
};
</script>

<style lang="scss">
.offer-card {
  .top-sticky {
    margin-top: 20px;
  }
  .gallery-slide {
    height: 400px !important;
    .hooper-slide {
      padding: 0px 10px !important;
    }
  }
  .gallery-thumb {
    height: 130px !important;
    .is-current {
      .el-image {
        background-color: #409eff;
        border: 2px solid #409eff !important;
        .el-image__inner {
          border-radius: 10px !important;
        }
      }
    }
    .hooper-slide {
      padding: 15px 10px !important;
    }
  }

  @media (max-width: 992px) {
    .gallery-slide {
      height: 250px !important;
    }
    .gallery-thumb {
      height: 100px !important;
    }
  }
}
</style>

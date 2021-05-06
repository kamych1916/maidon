<template>
  <div class="radio-types">
    <!-- <h4>Выберите тип аккаунта:</h4>
    <div class="row mt-30">
      <div class="col-md-4 col-6 my-10">
        <label class="custom-radio w-100 ">
          <input
            type="radio"
            value="owner"
            @change="onClick()"
            v-model="picked_account"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-person"></i>
            <h3>Собственник</h3>
          </span>
        </label>
      </div>
      <div class="col-md-4 col-6 my-10">
        <label class="custom-radio w-100">
          <input
            type="radio"
            value="agent"
            @change="onClick()"
            v-model="picked_account"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-journal-medical"></i>
            <h3>Агент</h3>
          </span>
        </label>
      </div>
    </div> -->

    <h4>Выберите тип сделки:</h4>
    <div class="row mt-30">
      <div class="col-md-4 col-6 my-10">
        <label class="custom-radio w-100 ">
          <input
            type="radio"
            value="sell"
            @change="onClick()"
            v-model="picked_deal"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-key"></i>
            <h3>Продать</h3>
          </span>
        </label>
      </div>
      <div class="col-md-4 col-6 my-10">
        <label class="custom-radio w-100">
          <input
            type="radio"
            value="rent_long"
            @change="onClick()"
            v-model="picked_deal"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-calendar-week"></i>
            <h3>Сдать длительно</h3>
          </span>
        </label>
      </div>
      <div class="col-md-4 col-6 my-10">
        <label class="custom-radio w-100">
          <input
            type="radio"
            value="rent_day"
            @change="onClick()"
            v-model="picked_deal"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-calendar4-event"></i>
            <h3>Сдать посуточно</h3>
          </span>
        </label>
      </div>
    </div>

    <h4 class="mt-30">Выберите тип недвижимости:</h4>
    <div class="row mt-30">
      <div class="col-md-4 col-6 my-10">
        <label class="custom-radio w-100 ">
          <input
            type="radio"
            value="living"
            @change="onClick()"
            v-model="picked_estate"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-bookmark-heart"></i>
            <h3>Жилая</h3>
          </span>
        </label>
      </div>
      <div class="col-md-4 col-6 my-10">
        <label class="custom-radio w-100">
          <input
            type="radio"
            value="commercy"
            @change="onClick()"
            v-model="picked_estate"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-shop"></i>
            <h3>Коммерческая</h3>
          </span>
        </label>
      </div>
    </div>
    <slide-y-down-transition :duration="700">
      <div v-if="isLiving || isCommercy">
        <h4 class="mt-30">Выберите объект:</h4>
        <div class="row mt-30" v-if="isLiving">
          <div class="col-md-4 col-6 my-10">
            <label class="custom-radio w-100 ">
              <input
                type="radio"
                value="apartment"
                @change="onClick()"
                v-model="picked_object_living"
              />
              <span class="radio-btn w-100 pb-20">
                <i class="bi bi-grid-1x2"></i>
                <h3>Квартира</h3>
              </span>
            </label>
          </div>
          <div class="col-md-4 col-6 my-10">
            <label class="custom-radio w-100">
              <input
                type="radio"
                value="room"
                @change="onClick()"
                v-model="picked_object_living"
              />
              <span class="radio-btn w-100 pb-20">
                <i class="bi bi-pip"></i>
                <h3>Комната</h3>
              </span>
            </label>
          </div>
          <div class="col-md-4 col-6 my-10">
            <label class="custom-radio w-100">
              <input
                type="radio"
                value="house"
                @change="onClick()"
                v-model="picked_object_living"
              />
              <span class="radio-btn w-100 pb-20">
                <i class="bi bi-house-door"></i>
                <h3>Дом/Дача</h3>
              </span>
            </label>
          </div>
          <div class="col-md-4 col-6 my-10">
            <label class="custom-radio w-100">
              <input
                type="radio"
                value="ground"
                @change="onClick()"
                v-model="picked_object_living"
              />
              <span class="radio-btn w-100 pb-20">
                <i class="bi bi-signpost-split"></i>
                <h3>Участок</h3>
              </span>
            </label>
          </div>
        </div>
        <div class="row mt-30" v-if="isCommercy">
          <div class="col-md-4 col-6 my-10">
            <label class="custom-radio w-100 ">
              <input
                type="radio"
                value="office"
                @change="onClick()"
                v-model="picked_object_commercy"
              />
              <span class="radio-btn w-100 pb-20">
                <i class="bi bi-briefcase"></i>
                <h3>Офис / Помещение</h3>
              </span>
            </label>
          </div>
          <div class="col-md-4 col-6 my-10">
            <label class="custom-radio w-100 ">
              <input
                type="radio"
                value="building"
                @change="onClick()"
                v-model="picked_object_commercy"
              />
              <span class="radio-btn w-100 pb-20">
                <i class="bi bi-building"></i>
                <h3>Здание</h3>
              </span>
            </label>
          </div>
        </div>
      </div>
    </slide-y-down-transition>
  </div>
</template>

<script>
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      isLiving: false,
      isCommercy: false,
      // picked_account: null,
      picked_deal: null,
      picked_estate: null,
      picked_object_commercy: null,
      picked_object_living: null
    };
  },
  methods: {
    onClick() {
      if (this.picked_estate == "living") {
        this.isLiving = true;
        this.isCommercy = false;
        this.picked_object_commercy = null;
      }
      if (this.picked_estate == "commercy") {
        this.isCommercy = true;
        this.isLiving = false;
        this.picked_object_living = null;
      }
      this.$emit("checkOfferTypes", {
        picked_deal: this.picked_deal,
        picked_estate: this.picked_estate,
        // picked_account: this.picked_account,
        picked_object_commercy: this.picked_object_commercy,
        picked_object_living: this.picked_object_living
      });
    }
  }
};
</script>

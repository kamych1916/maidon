<template>
  <div class="offer-types">
    <h4>Выберите тип сделки:</h4>
    <div class="row mt-30">
      <div class="col-md-4 my-10">
        <label class="custom-radio w-100 ">
          <input
            type="radio"
            value="sell"
            @change="onClick()"
            v-model="picked_kind"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-key"></i>
            <h3>Продать</h3>
          </span>
        </label>
      </div>
      <div class="col-md-4 my-10">
        <label class="custom-radio w-100">
          <input
            type="radio"
            value="rent_long"
            @change="onClick()"
            v-model="picked_kind"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-calendar-week"></i>
            <h3>Сдать длительно</h3>
          </span>
        </label>
      </div>
      <div class="col-md-4 my-10">
        <label class="custom-radio w-100">
          <input
            type="radio"
            value="rent_day"
            @change="onClick()"
            v-model="picked_kind"
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
      <div class="col-md-4 my-10">
        <label class="custom-radio w-100 ">
          <input
            type="radio"
            value="apartment"
            @change="onClick()"
            v-model="picked_type"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-grid-1x2"></i>
            <h3>Квартира</h3>
          </span>
        </label>
      </div>
      <div class="col-md-4 my-10">
        <label class="custom-radio w-100">
          <input
            type="radio"
            value="room"
            @change="onClick()"
            v-model="picked_type"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-pip"></i>
            <h3>Комната</h3>
          </span>
        </label>
      </div>
      <div class="col-md-4 my-10">
        <label class="custom-radio w-100">
          <input
            type="radio"
            value="home"
            @change="onClick()"
            v-model="picked_type"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-house-door"></i>
            <h3>Дом</h3>
          </span>
        </label>
      </div>
      <div class="col-md-4 my-10">
        <label class="custom-radio w-100 ">
          <input
            type="radio"
            value="garage"
            @change="onClick()"
            v-model="picked_type"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-app"></i>
            <h3>Гараж</h3>
          </span>
        </label>
      </div>
      <div class="col-md-4 my-10">
        <label class="custom-radio w-100">
          <input
            type="radio"
            value="commercy"
            @change="onClick()"
            v-model="picked_type"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-shop"></i>
            <h3>Коммерческая</h3>
          </span>
        </label>
      </div>
      <div class="col-md-4 my-10">
        <label class="custom-radio w-100">
          <input
            type="radio"
            value="place"
            @change="onClick()"
            v-model="picked_type"
          />
          <span class="radio-btn w-100 pb-20">
            <i class="bi bi-signpost-split"></i>
            <h3>Участок</h3>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picked_kind: null,
      picked_type: null
    };
  },
  methods: {
    onClick() {
      this.$emit("checkOfferTypes", {
        picked_kind: this.picked_kind,
        picked_type: this.picked_type
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.offer-types {
  .custom-radio input {
    display: none;
  }
  .radio-btn {
    background: #fff;
    border: 3px solid transparent;
    display: inline-block;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 0 20px #c3c3c367;
    cursor: pointer;
    transition: 0.2s;
  }
  .radio-btn i {
    color: #212529;
    font-size: 50px;
    transition: 0.2s;
  }
  .radio-btn h3 {
    color: #212529;
    font-size: 16px;
    text-transform: uppercase;
    transition: 0.2s;
  }
  .radio-btn:hover {
    background: #3a8ee6;
  }
  .radio-btn:active {
    transform: scale(0.95);
  }
  .radio-btn:hover i {
    color: #fff;
  }
  .radio-btn:hover h3 {
    color: #fff;
  }

  input:checked + .radio-btn {
    background: #3a8ee6;
    i,
    h3 {
      color: #fff;
    }
  }
  @media screen and (max-width: 1024px) {
    .radio-btn:hover {
      background: #fff;
    }
    .radio-btn:hover i {
      color: black;
    }
    .radio-btn:hover h3 {
      color: black;
    }
  }
}
</style>

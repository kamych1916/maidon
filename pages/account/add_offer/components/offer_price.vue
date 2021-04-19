<template>
  <div class="card-wrap ">
    <h4 class="mb-20 ml-12">Цена и условия сделки</h4>
    <div v-for="(input, idi) of offerPrice.inputs" :key="idi">
      <div v-if="input" class="row mx-0 w-100">
        <div class="col-xl-6 my-10" v-if="input.title == 'Залог'">
          {{ input.title }}

          <el-tooltip
            class="item"
            effect="dark"
            content=""
            placement="top-start"
          >
            <div slot="content">
              Залог – является страховым депозитом. Эта выплата арендатора
              хозяину квартиры дает<br />
              гарантии того, что возможный ущерб имущества будет возмещен
              залогом.
              <br /><br />Если залог есть, но он не указан, то это считается
              занижением цены.<br />
              Если поле пустое или равно 0, то считается что собственник не
              берет себе залог!
            </div>
            <el-button
              type="text"
              icon="bi bi-question-circle"
              size="mini"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="col-xl-6 my-10" v-else-if="input.title == 'Цена'">
          {{ input.title }}
          <el-tooltip
            class="item"
            effect="dark"
            content=""
            placement="top-start"
          >
            <div slot="content">
              Укажите реальную цену объекта. <br /><br />
              Занижение цены является серьезным нарушением правил публикации, в
              <br />
              случае выявления такого нарушения могут быть применены санкции
              ко<br />
              всем объявлениям аккаунта.
            </div>
            <el-button
              type="text"
              icon="bi bi-question-circle"
              size="mini"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="col-xl-6 my-10" v-else>{{ input.title }}</div>
        <div class="col-xl-6 my-10">
          <div class="el-input el-input--suffix">
            <currency-input
              :max="100"
              v-model="input.value"
              class="el-input__inner"
              locale="ru"
              :currency="null"
              :value-range="
                input.title == 'Процент от сделки агенту'
                  ? { min: 0, max: 100 }
                  : {}
              "
              :precision="0"
            />
            <span class="el-input__suffix">
              <span class="el-input__suffix-inner">
                <i>{{ input.suffix }}</i>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(select, ids) of offerPrice.selects" :key="ids">
      <div v-if="select" class="row mx-0 w-100">
        <div class="col-xl-6 my-10" v-if="select.title == 'Предоплата'">
          {{ select.title }}
          <el-tooltip
            class="item"
            effect="dark"
            content=""
            placement="top-start"
          >
            <div slot="content">
              Предоплата - сумма, которую оплачивает арендатор вперед, за период
              проживания.<br /><br />
              Как правило собственники жилья просят предоплату за последний
              месяц,<br />
              в редких случаях, за второй и последний месяцы проживания.
            </div>
            <el-button
              type="text"
              icon="bi bi-question-circle"
              size="mini"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="col-xl-6 my-10" v-else>{{ select.title }}</div>
        <div class="col-xl-6 my-10">
          <el-select class="w-100" v-model="select.value">
            <el-option
              v-for="item in select.data"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CurrencyInput } from "vue-currency-input";
export default {
  components: { CurrencyInput },
  props: {
    offerPrice: {
      type: Object,
      required: true
    }
  },

  watch: {
    offerPrice() {
      this.$emit("input", this.offerPrice);
    }
  },
  mounted() {
    let elmnts = document.getElementsByClassName("el-input__inner");
    for (let el of elmnts) {
      el.setAttribute("required", "");
    }
  }
};
</script>

<template>
  <div class="card-wrap ">
    <h4 class="mb-20">Цена и условия сделки</h4>
    <div class="row w-100" v-for="(input, idi) of offerPrice.inputs" :key="idi">
      <div class="col-md-6 my-10">{{ input.title }}</div>
      <div class="col-md-6 my-10">
        <el-input required v-model="input.value" class="w-100" type="number">
          <i slot="suffix">сомони</i></el-input
        >
      </div>
    </div>
    <div
      class="row w-100"
      v-for="(select, ids) of offerPrice.selects"
      :key="ids"
    >
      <div class="col-md-6 my-10">{{ select.title }}</div>
      <div class="col-md-6 my-10">
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
</template>

<script>
export default {
  props: {
    offerPrice: {
      type: Object,
      required: true
    }
  },
  // computed: {
  //   formattedAmount: function(data) {
  //     return Number(data).toLocaleString("ru");
  //   }
  // },
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
  // methods: {
  //   formattedAmount(data) {
  //     this.$refs.price.value = parseInt(data).toLocaleString("ru");
  //   }
  // }
};
</script>

<template>
  <div class="card-wrap ">
    <h4 class="mb-20">Об объекте</h4>
    <div
      class="row w-100"
      v-for="(input, idi) of offerObject.inputs"
      :key="idi"
    >
      <div class="col-md-6 my-10">{{ input.title }}</div>
      <div class="col-md-6 my-10">
        <el-input-number
          required
          v-model="input.value"
          class="w-100"
          type="number"
          :min="input.min"
          :max="input.max"
        >
        </el-input-number>
      </div>
    </div>
    <div
      class="row w-100"
      v-for="(select, ids) of offerObject.selects"
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
    offerObject: {
      type: Object,
      required: true
    }
  },
  watch: {
    offerObject() {
      this.$emit("input", this.offerObject);
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

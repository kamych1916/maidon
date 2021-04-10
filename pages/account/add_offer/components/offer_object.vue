<template>
  <div class="card-wrap ">
    <h4 class="mb-20 ml-12">Об объекте</h4>
    <div v-for="(input, idi) of offerObject.inputs" :key="idi">
      <div v-if="input" class="row mx-0 w-100">
        <div class="col-md-6 my-10">{{ input.title }}</div>
        <div class="col-md-6 my-10">
          <el-input
            v-if="
              input.title == 'Площадь участка' ||
                input.title == 'Общая площадь' ||
                input.title == 'Площадь комнаты' ||
                input.title == 'Площадь дома' ||
                input.title == 'Площадь здания'
            "
            required
            v-model="input.value"
            class="w-100"
            type="number"
            :min="input.min"
            :max="input.max"
          >
            <i
              class="el-input__icon"
              slot="suffix"
              v-if="input.title == 'Площадь участка'"
            >
              соток</i
            >
            <i class="el-input__icon" slot="suffix" v-else> м <sup>2</sup></i>
          </el-input>
          <el-input-number
            v-else
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
    </div>
    <div v-for="(select, ids) of offerObject.selects" :key="ids">
      <div class="row mx-0 w-100" v-if="select">
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

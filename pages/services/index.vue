<template>
  <div class="row">
    <div class="col-lg-4 mb-30">
      <div class="card-wrap sticky">
        <Breadcrumbs />
        <el-select clearable class="deal mt-20 w-100" v-model="value1">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select clearable class="deal mt-20 w-100" v-model="value2">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="col-lg-8" style="position-relative">
      <div class="card-wrap w-100"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "Все услуги",
          label: "Все услуги"
        },
        {
          value: "Коммерческие",
          label: "Коммерческие"
        }
      ],
      value1: "Все услуги",
      value2: "Коммерческие"
    };
  }
};
</script>

<style></style>

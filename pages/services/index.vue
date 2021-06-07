<template>
  <div class="services">
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
        <div class="card-wrap w-100">
          <div class="row">
            <div
              class="col-lg my-10 d-flex"
              style="display: -webkit-inline-box"
            >
              <div>
                <div class="avatar" style="background:#b9d7f7">
                  <i class="bi bi-briefcase fs-22"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

<style lang="scss">
.services {
  .avatar {
    width: 100px;
    height: 100px;
  }
}
</style>

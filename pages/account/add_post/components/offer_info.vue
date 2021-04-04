<template>
  <div class="card-wrap ">
    <h4>Об объекте</h4>
    <div class="row mx-0 align-items-center">
      <div class="col-md-6 my-10">Общая площадь</div>
      <div class="col-md-6 my-10">
        <el-input-number
          required
          v-model="value.area"
          class="w-100"
          type="number"
          :min="1"
          :max="100000"
        ></el-input-number>
      </div>
      <!-- START Для продажи комнаты  -->
      <div class="col-md-6 my-10">Площадь комнаты</div>
      <div class="col-md-6 my-10">
        <el-input-number
          required
          v-model="value.area"
          class="w-100"
          type="number"
          :min="1"
          :max="100000"
        ></el-input-number>
      </div>
      <!-- END Для продажи комнаты  -->
      <div class="col-md-6 my-10">Общее количество комнат</div>
      <div class="col-md-6 my-10">
        <el-input-number
          required
          v-model="value.rooms"
          class="w-100"
          type="number"
          :min="1"
          :max="50"
        ></el-input-number>
      </div>
      <!-- START Для продажи комнаты  -->
      <div class="col-md-6 my-10">Количество комнат в аренду</div>
      <div class="col-md-6 my-10">
        <el-input-number
          required
          v-model="value.rooms_rent"
          class="w-100"
          type="number"
          :min="1"
          :max="50"
        ></el-input-number>
      </div>
      <!-- END Для продажи комнаты  -->
      <div class="col-md-6 my-10 ">Тип застройки</div>
      <div class="col-md-6 my-10">
        <el-select
          :required="true"
          placeholder=""
          class="w-100"
          v-model="value.building_type"
        >
          <el-option
            v-for="item in building_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="col-md-6 my-10 ">Ремонт</div>
      <div class="col-md-6 my-10">
        <el-select
          :required="true"
          class="w-100"
          placeholder=""
          v-model="value.building_renovation"
        >
          <el-option
            v-for="item in building_renovation"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="col-md-6 my-10 ">Этаж</div>
      <div class="col-md-6 my-10">
        <el-input-number
          required
          v-model="value.floor"
          class="w-100"
          type="number"
          :min="1"
          :max="10"
        ></el-input-number>
      </div>
      <div class="col-md-6 my-10 ">Этажей в доме</div>
      <div class="col-md-6 my-10">
        <el-input-number
          required
          v-model="value.floorsHouse"
          class="w-100"
          type="number"
          :min="1"
          :max="10"
        ></el-input-number>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    }
  },
  mounted() {
    let elmnts = document.getElementsByClassName("el-input__inner");
    for (let el of elmnts) {
      el.setAttribute("required", "");
    }
  },
  data() {
    return {
      building_renovation: [
        {
          value: "cosmetic",
          label: "Косметический"
        },
        {
          value: "euro",
          label: "Евро"
        },
        {
          value: "design",
          label: "Дизайнерский"
        },
        {
          value: "without",
          label: "Без ремонта"
        }
      ],
      building_type: [
        {
          value: "newBuilding",
          label: "Новостройка"
        },
        {
          value: "secondaryBuilding",
          label: "Вторичный рынок"
        }
      ]
    };
  }
};
</script>

<template>
  <div class="title-block">
    <div class="row d-flex justify-content-center">
      <div class="col-lg-5 title my-30">Ищи <br />на майдон</div>
      <div class="col-lg-4 my-30">
        <div class="wrap-search">
          <el-select
            v-model="type_offer"
            placeholder="Выберите тип недвижимости"
            class="w-100 p-10 "
          >
            <el-option
              v-for="item in kind_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="kind_offer"
            placeholder="Выберите вид сделки"
            class="w-100 p-10"
          >
            <el-option
              v-for="item in type_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="w-100 p-10">
            <el-button
              @click="
                kind_offer && type_offer
                  ? $router.push('/' + kind_offer + '/' + type_offer)
                  : ''
              "
              type="primary"
              round
              class="w-100 py-14"
            >
              найти
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  data() {
    return {
      kind_options: [
        {
          value: "apartment",
          label: "квартира"
        },
        {
          value: "house",
          label: "дом"
        },
        {
          value: "ground",
          label: "участок"
        },
        {
          value: "commercy",
          label: "коммерческое"
        }
      ],
      type_options: [
        {
          value: "buy",
          label: "купить"
        },
        {
          value: "rent",
          label: "снять"
        },
        {
          value: "daily",
          label: "посуточно"
        }
      ],
      kind_offer: "",
      type_offer: ""
    };
  }
};
</script>

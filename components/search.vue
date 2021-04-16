<template>
  <div class="search-wrap">
    <button class="map-btn el-button el-button--success is-round py-10 ">
      смотреть на карте
      <i class="bi bi-map ml-10 p-0"></i>
    </button>
    <h1 class="fs-28 my-20">{{ title }}</h1>
    <div class="collapse-btn " :class="[isAccorActive ? 'active' : '']">
      <button
        class="el-button el-button--primary is-round py-10 d-flex justify-content-between"
        @click="openAccor()"
      >
        фильтры
        <i class="el-icon-arrow-down ml-10 px-0"></i>
      </button>
      <button
        class="el-button el-button--success is-round py-10 d-flex justify-content-between"
      >
        на карте
        <i class="bi bi-map ml-10 px-0"></i>
      </button>
    </div>
    <div class="search-filters">
      <div class="row gx-100">
        <div class="col-xl-4 d-flex my-10 w-100 search-two-selects">
          <el-select
            class="deal w-100"
            v-model="searchData.deals.value"
            @change="clearSearchData()"
          >
            <el-option
              v-for="item in searchData.deals.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            class="object w-100"
            v-model="searchData.objects.value"
            @change="
              clearSearchData(), eventListenObjects(searchData.objects.value)
            "
          >
            <el-option
              v-for="item in searchData.objects.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-xl-4 my-10" v-if="rooms">
          <el-select
            class="w-100"
            v-model="searchData.rooms.value"
            placeholder="Количество комнат"
          >
            <el-option
              v-for="item in searchData.rooms.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-xl-4 my-10" v-if="repair">
          <el-select
            class="w-100"
            v-model="searchData.repair.value"
            placeholder="Ремонт"
          >
            <el-option
              v-for="item in searchData.repair.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-xl-4 my-10" v-if="typeBuilding">
          <el-select
            class="w-100"
            v-model="searchData.typeBuilding.value"
            placeholder="Тип застройки"
          >
            <el-option
              v-for="item in searchData.typeBuilding.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-xl-4 my-10" v-if="typeGround">
          <el-select
            class="w-100"
            v-model="searchData.typeGround.value"
            placeholder="Статус участка"
          >
            <el-option
              v-for="item in searchData.typeGround.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-xl-4 my-10" v-if="typeCommercy">
          <el-select
            class="w-100"
            v-model="searchData.typeCommercy.value"
            placeholder="Тип помещения"
          >
            <el-option
              v-for="item in searchData.typeCommercy.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-xl-4 flex-fill d-flex my-10">
          <el-input
            v-model="searchData.address"
            placeholder="Адрес"
            suffix-icon="bi bi-geo-alt-fill"
          ></el-input>
        </div>
        <div class="col-xl-4 my-10 d-flex search-size">
          <el-input v-model="searchData.sizeFrom" class="from">
            <span slot="prefix">Площадь от</span>
          </el-input>
          <el-input v-model="searchData.sizeTo" class="to">
            <span slot="prefix">до</span>
            <span slot="suffix">м<sup>2</sup></span>
          </el-input>
        </div>
        <div class="col-xl-4 my-10 d-flex serach-price">
          <el-input v-model="searchData.priceFrom" class="from">
            <span slot="prefix">Цена от</span>
          </el-input>
          <el-input v-model="searchData.priceTo" class="to">
            <span slot="prefix">до</span>
            <span slot="suffix">сомони</span>
          </el-input>
        </div>
        <div class="col-xl-2 my-10">
          <button
            @click="changePath()"
            class="el-button el-button--primary is-round py-16 w-100 "
          >
            Найти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
const cleanSearchData = {
  sizeFrom: null,
  sizeTo: null,
  priceFrom: null,
  priceTo: null,
  address: null,
  deals: {
    value: "",
    options: [
      {
        value: "buy",
        label: "Купить"
      },
      {
        value: "rent",
        label: "Снять"
      },
      {
        value: "daily",
        label: "Посуточно"
      }
    ]
  },
  objects: {
    value: "",
    options: [
      {
        value: "apartment",
        label: "Квартиру"
      },
      {
        value: "room",
        label: "Комнату"
      },
      {
        value: "house",
        label: "Дом"
      },
      {
        value: "ground",
        label: "Участок"
      },
      {
        value: "commercy",
        label: "Коммерческую"
      },
      {
        value: "building",
        label: "Здание"
      }
    ]
  },
  rooms: {
    value: "",
    options: [
      {
        value: "oneroom",
        label: "Однокомнатые"
      },
      {
        value: "tworoom",
        label: "Двухкомнатные"
      },
      {
        value: "threeroom",
        label: "Трёхкомнатные"
      },
      {
        value: "fourroomormore",
        label: "Четыре комнаты и более"
      },
      {
        value: "allRooms",
        label: "Все варианты"
      }
    ]
  },
  repair: {
    value: "",
    options: [
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
    ]
  },
  typeBuilding: {
    value: "",
    options: [
      {
        value: "allTypes",
        label: "Вторичка, Новостройки"
      },
      {
        value: "secondaryBuilding",
        label: "Вторичный рынок"
      },
      {
        value: "newBuilding",
        label: "Новостройки"
      }
    ]
  },
  typeGround: {
    value: "",
    options: [
      {
        value: "farm",
        label: "Фермерское хоз-во"
      },
      {
        value: "subsidiaryFarm",
        label: "Личное подсобное хозяйство"
      },
      {
        value: "secondaryBuilding",
        label: "Садоводство"
      },
      {
        value: "individualСonstruction",
        label: "ИЖС"
      },
      {
        value: "industrialDestination",
        label: "Земля промназначения"
      },
      {
        value: "nonProfitPartnership",
        label: "ДНП"
      }
    ]
  },
  typeCommercy: {
    value: "",
    options: [
      {
        value: "office",
        label: "Офис"
      },
      {
        value: "garage",
        label: "Гараж"
      },
      {
        value: "warehouse",
        label: "Склад"
      },
      {
        value: "premisessFreeAppointment",
        label: "Помещения свободного назначения"
      },
      {
        value: "smallArchitecturalForms",
        label: "Малые архитектурные формы"
      },
      {
        value: "productionPremises",
        label: "Производственное помещение"
      },
      {
        value: "shop",
        label: "Магазин"
      },
      {
        value: "restaurant",
        label: "Общепит"
      },
      {
        value: "salon",
        label: "Салон"
      },
      {
        value: "recreationСenter",
        label: "База отдыха"
      },
      {
        value: "healthСare",
        label: "Здравоохранение"
      },
      {
        value: "service",
        label: "Сервис"
      },
      {
        value: "sport",
        label: "Спорткомплекс"
      }
    ]
  }
};
export default {
  props: ["title"],
  data() {
    return {
      isAccorActive: true,
      repair: false,
      rooms: false,
      typeBuilding: false,
      typeGround: false,
      typeCommercy: false,
      searchData: cleanSearchData
    };
  },
  mounted() {
    if (window.screen.width < 1200) {
      this.isAccorActive = false;
    } else {
      this.isAccorActive = true;
    }
    this.checkQuery();
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.checkQuery();
      }
    }
  },
  methods: {
    changePath() {
      let url = "/";
      let queryData = {};
      let data = this.searchData;

      if (data.deals.value == "buy") {
        url = url + "buy/";
      } else if (data.deals.value == "rent") {
        url = url + "rent/";
      } else if (data.deals.value == "daily") {
        url = url + "daily/";
      }

      if (data.objects.value == "apartment") {
        url = url + "apartment";
      } else if (data.objects.value == "room") {
        url = url + "room";
      } else if (data.objects.value == "house") {
        url = url + "house";
      } else if (data.objects.value == "ground") {
        url = url + "ground";
      } else if (data.objects.value == "commercy") {
        url = url + "commercy";
      } else if (data.objects.value == "building") {
        url = url + "building";
      }

      if (data.rooms.value) {
        queryData.rooms = data.rooms.value;
      }
      if (data.repair.value) {
        queryData.repair = data.repair.value;
      }
      if (data.typeBuilding.value) {
        queryData.typeBuilding = data.typeBuilding.value;
      }
      if (data.typeGround.value) {
        queryData.typeGround = data.typeGround.value;
      }
      if (data.typeCommercy.value) {
        queryData.typeCommercy = data.typeCommercy.value;
      }
      if (data.address) {
        queryData.address = data.address;
      }
      if (data.sizeFrom) {
        queryData.sizeFrom = data.sizeFrom;
      }
      if (data.sizeTo) {
        queryData.sizeTo = data.sizeTo;
      }
      if (data.priceFrom) {
        queryData.priceFrom = data.priceFrom;
      }
      if (data.priceTo) {
        queryData.priceTo = data.priceTo;
      }

      this.$router.push({
        path: url,
        query: queryData
      });
    },

    eventListenObjects(data) {
      if (data == "apartment") {
        this.repair = true;
        this.rooms = true;
        this.typeBuilding = true;
        this.typeCommercy = false;
        this.typeGround = false;
      } else if (data == "room") {
        this.repair = true;
        this.rooms = false;
        this.typeBuilding = true;
        this.typeCommercy = false;
        this.typeGround = false;
      } else if (data == "house") {
        this.repair = true;
        this.rooms = false;
        this.typeBuilding = false;
        this.typeCommercy = false;
        this.typeGround = true;
      } else if (data == "ground") {
        this.repair = false;
        this.rooms = false;
        this.typeBuilding = false;
        this.typeCommercy = false;
        this.typeGround = true;
      } else if (data == "commercy") {
        this.repair = false;
        this.rooms = false;
        this.typeBuilding = false;
        this.typeCommercy = true;
        this.typeGround = false;
      } else if (data == "building") {
        this.repair = false;
        this.rooms = false;
        this.typeBuilding = false;
        this.typeCommercy = false;
        this.typeGround = false;
      }
    },
    openAccor() {
      this.isAccorActive = !this.isAccorActive;
    },
    clearSearchData() {
      this.searchData.rooms.value = "";
      this.searchData.repair.value = "";
      this.searchData.typeBuilding.value = "";
      this.searchData.typeGround.value = "";
      this.searchData.typeCommercy.value = "";
      this.searchData.address = "";
      this.searchData.sizeFrom = "";
      this.searchData.sizeTo = "";
      this.searchData.priceFrom = "";
      this.searchData.priceTo = "";
    },
    checkQuery() {
      this.clearSearchData();
      let deal = this.$route.path.split("/")[1];
      let kind = this.$route.path.split("/")[2];

      let rooms =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.rooms
          : "";
      let repair =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.repair
          : "";
      let typeBuilding =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.typeBuilding
          : "";
      let typeGround =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.typeGround
          : "";
      let typeCommercy =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.typeCommercy
          : "";
      let address =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.address
          : "";
      let sizeFrom =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.sizeFrom
          : "";
      let sizeTo =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.sizeTo
          : "";
      let priceFrom =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.priceFrom
          : "";
      let priceTo =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.priceTo
          : "";

      this.searchData.address = address || this.searchData.address;
      this.searchData.sizeFrom = sizeFrom || this.searchData.sizeFrom;
      this.searchData.sizeTo = sizeTo || this.searchData.sizeTo;
      this.searchData.priceFrom = priceFrom || this.searchData.priceFrom;
      this.searchData.priceTo = priceTo || this.searchData.priceTo;

      this.searchData.deals.value = deal || this.searchData.deals.value;
      this.searchData.objects.value = kind || this.searchData.objects.value;
      this.searchData.rooms.value = rooms || this.searchData.rooms.value;
      this.searchData.repair.value = repair || this.searchData.repair.value;
      this.searchData.typeBuilding.value =
        typeBuilding || this.searchData.typeBuilding.value;
      this.searchData.typeGround.value =
        typeGround || this.searchData.typeGround.value;
      this.searchData.typeCommercy.value =
        typeCommercy || this.searchData.typeCommercy.value;
      this.eventListenObjects(kind);

      let objCopy = JSON.parse(JSON.stringify(this.searchData));
      Api.getInstance()
        .offer.get_offers(objCopy)
        .then(response => {
          console.log("get_offers-> ", response);
        })
        .catch(error => {
          console.log("get_offers-> ", error);
        });
    }
  }
};
</script>

<style lang="scss">
.search-wrap {
  overflow: hidden;
  height: auto;
  transition: height 1s ease, opacity 1s ease;
  .map-btn {
    position: absolute;
    right: 0;
    top: 0;
  }
  position: relative;
  .collapse-btn {
    display: none;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
  }
  .collapse-btn.active {
    padding-bottom: 10px;
  }
  .collapse-btn.active .el-icon-arrow-down {
    transform: rotate(180deg);
  }
  .el-icon-arrow-down {
    transition: 0.6s;
  }

  .collapse-btn.active + .search-filters {
    opacity: 1;
    height: auto;
    transition: all 1s ease;
  }
  .search-filters {
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: height 1s ease, opacity 1s ease;
    .content-inner {
      padding: 20px;
    }
  }
}
.search-two-selects {
  .deal {
    .el-input__inner {
      border-radius: 25px 0px 0px 25px !important;
      // padding: 5px 0px 5px 0px !important;
    }
    .el-input__suffix {
      // padding: 5px !important;
    }
  }
  .object {
    .el-input__inner {
      border-left: 1px solid #ccc;
      // padding: 5px 10px 5px 10px !important;
      border-radius: 0px 25px 25px 0px !important;
    }
  }
}
.search-size {
  .from {
    width: 130%;
    .el-input__inner {
      border-radius: 25px 0px 0px 25px !important;
      padding: 5px 0px 5px 110px !important;
    }
  }
  .to {
    .el-input__prefix {
      padding-left: 0px;
    }
    .el-input__inner {
      border-radius: 0px 25px 25px 0px !important;
      padding: 5px 45px 5px 30px !important;
    }
  }
}
.serach-price {
  .from {
    width: 80%;
    .el-input__inner {
      border-radius: 25px 0px 0px 25px !important;
      padding: 5px 5px 5px 80px !important;
    }
  }
  .to {
    .el-input__prefix {
      padding-left: 0px;
    }
    .el-input__inner {
      border-radius: 0px 25px 25px 0px !important;
      padding: 5px 80px 5px 30px !important;
    }
  }
}

@media (max-width: 1200px) {
  .search-wrap {
    .collapse-btn {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .search-two-selects {
    .object {
      .el-input__inner {
        padding: 5px 10px 5px 10px !important;
      }
    }
  }
  .map-btn {
    display: none;
  }
}
</style>

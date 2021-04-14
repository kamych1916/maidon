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
      <div class="row">
        <div class="col-xl-4 d-flex my-10 w-100 search-two-selects">
          <el-select class="deal w-100" v-model="searchData.deals.value">
            <el-option
              v-for="item in searchData.deals.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select class="object w-100" v-model="searchData.objects.value">
            <el-option
              v-for="item in searchData.objects.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-xl-3 my-10">
          <el-select class="w-100" v-model="searchData.rooms.value">
            <el-option
              v-for="item in searchData.rooms.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-xl-5 my-10">
          <el-input
            placeholder="Адрес"
            suffix-icon="bi bi-geo-alt-fill"
          ></el-input>
        </div>
        <div class="col-xl-3 my-10">
          <el-select class="w-100" v-model="searchData.typeObject.value">
            <el-option
              v-for="item in searchData.typeObject.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-xl-3 my-10 d-flex search-size">
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
          <button class="el-button el-button--primary is-round py-16 w-100 ">
            Найти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      isAccorActive: true,
      searchData: {
        sizeFrom: null,
        sizeTo: null,
        priceFrom: null,
        priceTo: null,
        address: null,
        deals: {
          value: "sell",
          options: [
            {
              value: "sell",
              label: "Купить"
            },
            {
              value: "rent_long",
              label: "Снять"
            },
            {
              value: "rent_day",
              label: "Посуточно"
            }
          ]
        },
        objects: {
          value: "apartment",
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
          value: "oneroom",
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
        typeObject: {
          value: "allTypes",
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
        }
      }
    };
  },
  methods: {
    openAccor() {
      this.isAccorActive = !this.isAccorActive;
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

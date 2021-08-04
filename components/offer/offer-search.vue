<template>
  <div class="search-wrap">
    <button
      @click="openMap(true)"
      class="
        map-btn
        d-none d-lg-block
        el-button el-button--success
        is-round
        py-10
      "
    >
      смотреть на карте
      <i class="bi bi-map ml-10 p-0"></i>
    </button>
    <h1 class="fs-28 my-20">{{ title }}</h1>
    <div class="collapse-btn" :class="[isAccorActive ? 'active' : '']">
      <button
        class="
          el-button el-button--primary
          py-10
          d-flex
          justify-content-between
        "
        @click="openAccor()"
        style="border-radius: 25px"
      >
        фильтры
        <i class="el-icon-arrow-down ml-10 px-0"></i>
      </button>
      <button
        @click="openMap(true)"
        class="
          el-button el-button--success
          py-10
          d-flex
          justify-content-between
        "
        style="border-radius: 25px"
      >
        на карте
        <i class="bi bi-map ml-10 px-0"></i>
      </button>
    </div>
    <div class="search-filters" v-if="searchData">
      <div class="row gx-100">
        <div class="col-lg-4 my-10 d-flex w-100 search-two-selects">
          <el-select
            clearable
            class="deal w-100"
            v-model="searchData.selects.deals.value"
            :placeholder="searchData.selects.deals.placeholder"
          >
            <el-option
              v-for="item in searchData.selects.deals.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            clearable
            class="object w-100"
            v-model="searchData.selects.objects.value"
            :placeholder="searchData.selects.objects.placeholder"
            @change="eventListenObjects(searchData.selects.objects.value)"
          >
            <el-option
              v-for="item in searchData.selects.objects.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div
          class="col-lg-4 my-10"
          v-for="(items, id) in objCopy.selects"
          :key="id"
        >
          <template>
            <el-select
              class="w-100"
              v-model="items.value"
              :placeholder="items.placeholder"
              clearable
            >
              <el-option
                v-for="item in items.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </div>
        <div class="col-lg-4 my-10 d-flex search-size">
          <el-input v-model="searchData.inputs.sizeFrom" class="from">
            <span slot="prefix">Площадь от</span>
          </el-input>
          <el-input v-model="searchData.inputs.sizeTo" class="to">
            <span slot="prefix">до</span>
            <span slot="suffix">м<sup>2</sup></span>
          </el-input>
        </div>
        <div class="col-lg-4 my-10 d-flex serach-price">
          <el-input v-model="searchData.inputs.priceFrom" class="from">
            <span slot="prefix">Цена от</span>
          </el-input>
          <el-input v-model="searchData.inputs.priceTo" class="to">
            <span slot="prefix">до</span>
            <span slot="suffix">сомони</span>
          </el-input>
        </div>
        <div class="col-lg-2 my-10">
          <button
            style="border-radius: 25px"
            @click="changePath()"
            class="el-button el-button--primary is-round py-16 w-100"
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

export default {
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      isAccorActive: true,
      repair: false,
      rooms: false,
      typeBuilding: false,
      typeGround: false,
      typeCommercy: false,
      searchData: null,
      objCopy: null,
    };
  },
  mounted() {
    this.resizeFilters();
    this.get_filter_offers();
  },
  computed: {
    // withoutFirstFilters() {
    //   let objCopy = JSON.parse(JSON.stringify(this.searchData));
    //   delete objCopy.selects.deals;
    //   delete objCopy.selects.objects;
    //   return objCopy.selects;
    // },
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.get_filter_offers();
      }
    },
  },
  methods: {
    changePath() {
      this.openMap(false);
      let url = "/";
      let queryData = {};
      let data = this.searchData;
      console.log(this.searchData);

      // this.searchData.selects.ob((element) => {});

      for (let select of Object.keys(this.searchData.selects)) {
        if (select === "deals" && this.searchData.selects[select].value) {
          url = url + this.searchData.selects[select].value + "/";
        }
        if (select === "objects" && this.searchData.selects[select].value) {
          url = url + this.searchData.selects[select].value;
        }
        if (
          this.searchData.selects[select].value &&
          select !== "deals" &&
          select !== "objects"
        ) {
          queryData[select] = this.searchData.selects[select].value;
        }
      }

      for (let inputs of Object.keys(this.searchData.inputs)) {
        if (this.searchData.inputs[inputs]) {
          queryData[inputs] = this.searchData.inputs[inputs];
        }
      }

      // for(let select of this.searchData.selects)

      // if (data.deals.value == "buy") {
      //   url = url + "buy/";
      // } else if (data.deals.value == "rent") {
      //   url = url + "rent/";
      // } else if (data.deals.value == "daily") {
      //   url = url + "daily/";
      // }

      // if (data.objects.value == "apartment") {
      //   url = url + "apartment";
      // } else if (data.objects.value == "room") {
      //   url = url + "room";
      // } else if (data.objects.value == "house") {
      //   url = url + "house";
      // } else if (data.objects.value == "ground") {
      //   url = url + "ground";
      // } else if (data.objects.value == "commercy") {
      //   url = url + "commercy";
      // }

      // data.rooms.value ? (queryData.rooms = data.rooms.value) : null;

      // data.repair.value ? (queryData.repair = data.repair.value) : null;

      // data.typeBuilding.value
      //   ? (queryData.typeBuilding = data.typeBuilding.value)
      //   : null;

      // data.typeGround.value
      //   ? (queryData.typeGround = data.typeGround.value)
      //   : null;

      // data.typeCommercy.value
      //   ? (queryData.typeCommercy = data.typeCommercy.value)
      //   : null;

      // data.cities.value ? (queryData.city = data.cities.value) : null;

      // // data.address ? (queryData.address = data.address) : null;

      // data.sizeFrom ? (queryData.sizeFrom = data.sizeFrom) : null;

      // data.sizeTo ? (queryData.sizeTo = data.sizeTo) : null;

      // data.priceFrom ? (queryData.priceFrom = data.priceFrom) : null;

      // data.priceTo ? (queryData.priceTo = data.priceTo) : null;

      this.$router.push({
        path: url,
        query: queryData,
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
      }
    },
    openAccor() {
      this.isAccorActive = !this.isAccorActive;
    },
    // clearSearchData() {
    //   this.searchData = null;
    // },
    get_filter_offers() {
      // this.clearSearchData();
      let routeData = {
        deal: this.$route.path.split("/")[1],
        kind: this.$route.path.split("/")[2],
        ...this.$route.query,
      };
      Api.getInstance()
        .offer.get_filter_offers(routeData)
        .then((response) => {
          this.searchData = response.data.static;
          this.objCopy = JSON.parse(JSON.stringify(this.searchData));
          delete this.objCopy.selects.deals;
          delete this.objCopy.selects.objects;
          console.log(this.objCopy);
          this.$emit("uploadOffers", {
            data: response.data,
          });
        })
        .catch((error) => {
          Api.typicalNTFS(error.response.status);
        });
    },
    openMap(data) {
      window.screen.width < 992
        ? this.isAccorActive
          ? (this.isAccorActive = false)
          : null
        : null;
      this.$emit("openMap", {
        data: data,
      });
    },
    resizeFilters() {
      if (window.screen.width < 992) {
        this.isAccorActive = false;
      } else {
        this.isAccorActive = true;
      }
    },
  },
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

@media (max-width: 992px) {
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
}
</style>

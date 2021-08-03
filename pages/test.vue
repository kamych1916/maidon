<template>
  <div class="container">
    <div class="card-wrap search-wrap">
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
      <div class="search-filters">
        <div class="row gx-100">
          <div class="col-lg-4 d-flex my-10 w-100 search-two-selects">
            <el-select
              clearable
              class="deal w-100"
              v-model="offerData.static.selects.deals.value"
              :placeholder="offerData.static.selects.deals.placeholder"
              @change="clearSearchData()"
            >
              <el-option
                v-for="item in offerData.static.selects.deals.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              class="object w-100"
              v-model="offerData.static.selects.objects.value"
              :placeholder="offerData.static.selects.objects.placeholder"
              @change="
                clearSearchData(),
                  eventListenObjects(offerData.static.selects.objects.value)
              "
            >
              <el-option
                v-for="item in offerData.static.selects.objects.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div
            class="col-lg-4 my-10"
            v-for="(items, id) in offerData.static.selects"
            :key="id"
          >
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
          </div>
          <!-- <div class="col-lg-4 my-10" v-if="rooms">
            <el-select
              class="w-100"
              v-model="searchData.rooms.value"
              placeholder="Количество комнат"
              clearable
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
          <div class="col-lg-4 my-10" v-if="repair">
            <el-select
              class="w-100"
              v-model="searchData.repair.value"
              placeholder="Ремонт"
              clearable
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
          <div class="col-lg-4 my-10" v-if="typeBuilding">
            <el-select
              class="w-100"
              v-model="searchData.typeBuilding.value"
              placeholder="Тип застройки"
              clearable
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
          <div class="col-lg-4 my-10" v-if="typeGround">
            <el-select
              class="w-100"
              v-model="searchData.typeGround.value"
              placeholder="Статус участка"
              clearable
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
          <div class="col-lg-4 my-10" v-if="typeCommercy">
            <el-select
              class="w-100"
              v-model="searchData.typeCommercy.value"
              placeholder="Тип помещения"
              clearable
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
          <div class="col-lg-4 my-10">
            <el-select
              class="w-100"
              v-model="searchData.cities.value"
              placeholder="Выберите город"
              clearable
            >
              <el-option
                v-for="item in searchData.cities.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div> -->
          <!-- <div class="col-lg-4 flex-fill d-flex my-10">
          <el-input
            v-model="searchData.address"
            placeholder="Адрес"
            suffix-icon="bi bi-geo-alt-fill"
          ></el-input>
        </div> -->
          <div class="col-lg-4 my-10 d-flex search-size">
            <el-input v-model="offerData.static.inputs.sizeFrom" class="from">
              <span slot="prefix">Площадь от</span>
            </el-input>
            <el-input v-model="offerData.static.inputs.sizeTo" class="to">
              <span slot="prefix">до</span>
              <span slot="suffix">м<sup>2</sup></span>
            </el-input>
          </div>
          <div class="col-lg-4 my-10 d-flex serach-price">
            <el-input v-model="offerData.static.inputs.priceFrom" class="from">
              <span slot="prefix">Цена от</span>
            </el-input>
            <el-input v-model="offerData.static.inputs.priceTo" class="to">
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
  </div>
</template>

<script>
import Api from "~/utils/api";
import axios from "axios";
const cleanSearchData = {
  sizeFrom: null,
  sizeTo: null,
  priceFrom: null,
  priceTo: null,
  // address: null,
  deals: {
    value: "",
    options: [
      {
        value: "buy",
        label: "Купить",
      },
      {
        value: "rent",
        label: "Снять",
      },
      {
        value: "daily",
        label: "Посуточно",
      },
    ],
  },
  objects: {
    value: "",
    options: [
      {
        value: "apartment",
        label: "Квартиру",
      },
      {
        value: "room",
        label: "Комнату",
      },
      {
        value: "house",
        label: "Дом",
      },
      {
        value: "ground",
        label: "Участок",
      },
      {
        value: "commercy",
        label: "Коммерческую",
      },
    ],
  },
  rooms: {
    value: "",
    options: [
      {
        value: "oneroom",
        label: "Однокомнатые",
      },
      {
        value: "tworoom",
        label: "Двухкомнатные",
      },
      {
        value: "threeroom",
        label: "Трёхкомнатные",
      },
      {
        value: "fourroomormore",
        label: "Четыре комнаты и более",
      },
      {
        value: "allRooms",
        label: "Все варианты",
      },
    ],
  },
  repair: {
    value: "",
    options: [
      {
        value: "cosmetic",
        label: "Косметический",
      },
      {
        value: "euro",
        label: "Евро",
      },
      {
        value: "design",
        label: "Дизайнерский",
      },
      {
        value: "without",
        label: "Без ремонта",
      },
    ],
  },
  typeBuilding: {
    value: "",
    options: [
      {
        value: "allTypes",
        label: "Вторичка, Новостройки",
      },
      {
        value: "secondaryBuilding",
        label: "Вторичный рынок",
      },
      {
        value: "newBuilding",
        label: "Новостройки",
      },
    ],
  },
  typeGround: {
    value: "",
    options: [
      {
        value: "farm",
        label: "Фермерское хоз-во",
      },
      {
        value: "subsidiaryFarm",
        label: "Личное подсобное хозяйство",
      },
      {
        value: "secondaryBuilding",
        label: "Садоводство",
      },
      {
        value: "individualСonstruction",
        label: "ИЖС",
      },
      {
        value: "industrialDestination",
        label: "Земля промназначения",
      },
      {
        value: "nonProfitPartnership",
        label: "ДНП",
      },
    ],
  },
  typeCommercy: {
    value: "",
    options: [
      {
        value: "office",
        label: "Офис",
      },
      {
        value: "garage",
        label: "Гараж",
      },
      {
        value: "warehouse",
        label: "Склад",
      },
      {
        value: "premisessFreeAppointment",
        label: "Помещения свободного назначения",
      },
      {
        value: "smallArchitecturalForms",
        label: "Малые архитектурные формы",
      },
      {
        value: "productionPremises",
        label: "Производственное помещение",
      },
      {
        value: "shop",
        label: "Магазин",
      },
      {
        value: "restaurant",
        label: "Общепит",
      },
      {
        value: "salon",
        label: "Салон",
      },
      {
        value: "recreationСenter",
        label: "База отдыха",
      },
      {
        value: "healthСare",
        label: "Здравоохранение",
      },
      {
        value: "service",
        label: "Сервис",
      },
      {
        value: "sport",
        label: "Спорткомплекс",
      },
    ],
  },
  cities: {
    value: "",
    options: [
      {
        value: "dushanbe",
        label: "Душанбе",
      },
      {
        value: "Hudzhand",
        label: "Худжанд",
      },
      {
        value: "AburahmoniDzhomi",
        label: "Абдурахмони Джоми",
      },
      {
        value: "Aini",
        label: "Айни",
      },
      {
        value: "Asht",
        label: "Ашт",
      },
      {
        value: "Baldzhuvan",
        label: "Бальджуван",
      },
      {
        value: "BobdjonGafurov",
        label: "Бободжон Гафуров",
      },
      {
        value: "Bohtar",
        label: "Бохтар (Курган-Тюбе)",
      },
      {
        value: "Buston",
        label: "Бустон (Чкаловск)",
      },
      {
        value: "Vanzh",
        label: "Вандж",
      },
      {
        value: "Varzob",
        label: "Варзоб",
      },
      {
        value: "Vahdat",
        label: "Вахдат",
      },
      {
        value: "Vash",
        label: "Вахш",
      },
      {
        value: "Vose",
        label: "Восе",
      },
      {
        value: "Gissar",
        label: "Гиссар",
      },
      {
        value: "GornayaMatcha",
        label: "Горная Матча",
      },
      {
        value: "Guliston",
        label: "Гулистон (Кайраккум)",
      },
      {
        value: "Dangara",
        label: "Дангара",
      },
      {
        value: "Devashtich",
        label: "Деваштич (Ганчи)",
      },
      {
        value: "DzhaborRasulov",
        label: "Джаббор Расулов",
      },
      {
        value: "Dzhaihun",
        label: "Джайхун (Кумсангир)",
      },
      {
        value: "DzhaloliddinaBalhi",
        label: "Джалолиддина Балхи (Руми)",
      },
      {
        value: "Dzhami",
        label: "Джами",
      },
      {
        value: "Dusti",
        label: "Дусти (Джиликуль)",
      },
      {
        value: "Zafarbad",
        label: "Зафарабад",
      },
      {
        value: "Istaravshan",
        label: "Истаравшан",
      },
      {
        value: "Istiklol",
        label: "Истиклол",
      },
      {
        value: "Isfara",
        label: "Исфара",
      },
      {
        value: "Ishkamshim",
        label: "Ишкашим",
      },
      {
        value: "Kabodien",
        label: "Кабодиён",
      },
      {
        value: "Kanibadam",
        label: "Канибадам",
      },
      {
        value: "Kulyab",
        label: "Куляб",
      },
      {
        value: "Kushonien",
        label: "Кушониён (Бохтар)",
      },
      {
        value: "Lahsh",
        label: "Лахш (Джиргиталь)",
      },
      {
        value: "Levakand",
        label: "Леваканд (Сарбанд)",
      },
      {
        value: "Matcha",
        label: "Матча",
      },
      {
        value: "Muminabad",
        label: "Муминабад",
      },
      {
        value: "Murgab",
        label: "Мургаб",
      },
      {
        value: "Nosiri Husrav",
        label: "Носири Хусрав",
      },
      {
        value: "Nurabad",
        label: "Нурабад",
      },
      {
        value: "Nurek",
        label: "Нурек",
      },
      {
        value: "Pendjakent",
        label: "Пенджикент",
      },
      {
        value: "Pyandzh",
        label: "Пяндж",
      },
      {
        value: "Rasht",
        label: "Рашт",
      },
      {
        value: "Rogun",
        label: "Рогун",
      },
      {
        value: "Roshtkala",
        label: "Рошткала",
      },
      {
        value: "Rudaki",
        label: "Рудаки",
      },
      {
        value: "Rushan",
        label: "Рушан",
      },
      {
        value: "Sangvor",
        label: "Сангвор (Тавильдара)",
      },
      {
        value: "Spitamen",
        label: "Спитамен",
      },
      {
        value: "Tadzhikabad",
        label: "Таджикабад",
      },
      {
        value: "Temurmalik",
        label: "Темурмалик",
      },
      {
        value: "Tursunzade",
        label: "Турсунзаде",
      },
      {
        value: "Faizabad",
        label: "Файзабад",
      },
      {
        value: "Farhor",
        label: "Фархор",
      },
      {
        value: "Hamadani",
        label: "Хамадани",
      },
      {
        value: "Hovaling",
        label: "Ховалинг",
      },
      {
        value: "Horog",
        label: "Хорог",
      },
      {
        value: "Huroson",
        label: "Хуросон",
      },
      {
        value: "ShamsiddinShohin",
        label: "Шамсиддин Шохин (Шуроабад)",
      },
      {
        value: "Shahrinav",
        label: "Шахринав",
      },
      {
        value: "Shariston",
        label: "Шахристон",
      },
      {
        value: "Shahritus",
        label: "Шахритус",
      },
      {
        value: "Shugan",
        label: "Шугнан",
      },
      {
        value: "Yavan",
        label: "Яван",
      },
    ],
  },
};
export default {
  async asyncData({ route }) {
    let offerData;
    // const { id } = route.params;
    let deal = route.path.split("/")[1];
    let kind = route.path.split("/")[2];
    console.log(route.query);

    return axios
      .post(`https://maidon.tj/server/api/v1/get_filter_offers`, {
        deal: "buy",
        kind: "apartment",
      })
      .then((response) => {
        offerData = response.data;
        console.log(offerData);
        return { offerData };
      });
  },
  props: ["title"],
  data() {
    return {
      isAccorActive: true,
      repair: false,
      rooms: false,
      typeBuilding: false,
      typeGround: false,
      typeCommercy: false,
      searchData: cleanSearchData,
    };
  },
  mounted() {
    this.resizeFilters();
    // this.get_filter_offers();
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
      }
      data.rooms.value ? (queryData.rooms = data.rooms.value) : null;

      data.repair.value ? (queryData.repair = data.repair.value) : null;

      data.typeBuilding.value
        ? (queryData.typeBuilding = data.typeBuilding.value)
        : null;

      data.typeGround.value
        ? (queryData.typeGround = data.typeGround.value)
        : null;

      data.typeCommercy.value
        ? (queryData.typeCommercy = data.typeCommercy.value)
        : null;

      data.cities.value ? (queryData.city = data.cities.value) : null;

      // data.address ? (queryData.address = data.address) : null;

      data.sizeFrom ? (queryData.sizeFrom = data.sizeFrom) : null;

      data.sizeTo ? (queryData.sizeTo = data.sizeTo) : null;

      data.priceFrom ? (queryData.priceFrom = data.priceFrom) : null;

      data.priceTo ? (queryData.priceTo = data.priceTo) : null;

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
    clearSearchData() {
      this.searchData.rooms.value = "";
      this.searchData.repair.value = "";
      this.searchData.typeBuilding.value = "";
      this.searchData.typeGround.value = "";
      this.searchData.typeCommercy.value = "";
      this.searchData.cities.value = "";
      // this.searchData.address = "";
      this.searchData.sizeFrom = "";
      this.searchData.sizeTo = "";
      this.searchData.priceFrom = "";
      this.searchData.priceTo = "";
    },
    get_filter_offers() {
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
      // let address =
      //   Object.keys(this.$route.query).length > 0
      //     ? this.$route.query.address
      //     : "";
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
      let city =
        Object.keys(this.$route.query).length > 0 ? this.$route.query.city : "";

      let page =
        Object.keys(this.$route.query).length > 0 ? this.$route.query.page : "";

      // this.searchData.address = address || this.searchData.address;
      this.searchData.sizeFrom = sizeFrom || this.searchData.sizeFrom;
      this.searchData.sizeTo = sizeTo || this.searchData.sizeTo;
      this.searchData.priceFrom = priceFrom || this.searchData.priceFrom;
      this.searchData.priceTo = priceTo || this.searchData.priceTo;
      this.searchData.page = page || this.searchData.page;

      this.searchData.cities.value = city || this.searchData.cities.value;
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
      for (let prop in objCopy) {
        delete objCopy[prop].options;
        if (objCopy[prop].value == "") {
          delete objCopy[prop];
        }
        if (objCopy[prop] == "") {
          delete objCopy[prop];
        }
      }
      Api.getInstance()
        .offer.get_filter_offers(objCopy)
        .then((response) => {
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

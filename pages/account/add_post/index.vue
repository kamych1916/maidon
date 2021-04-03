<template>
  <div class="pb-100 pt-50">
    <OfferTypes @checkOfferTypes="checkOfferTypes"></OfferTypes>
    <div ref="inputs">
      <div class="card-wrap mt-50">
        <div class="form-group">
          <h4>Адрес</h4>
          <el-autocomplete
            :fetch-suggestions="getMarker"
            v-model="offerData.map_address"
            class="mt-14 mb-26 w-100"
            suffix-icon="bi bi-geo-alt-fill"
            name="address"
            required
            type="text"
            placeholder="Укажите адрес или название улицы"
          ></el-autocomplete>
        </div>
        <client-only>
          <OfferMap @onClickMap="onClickMap" :coord="coords"></OfferMap>
        </client-only>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card-wrap mt-50">
            <h4>Об объекте</h4>
            <div class="row mx-0 align-items-center">
              <div class="col-md-6 my-10">Общая площадь</div>
              <el-input class="col-md-6 my-10" type="number" />
              <div class="col-md-6 my-10">Количество комнат</div>
              <el-input class="col-md-6 my-10" type="number" />
              <div class="col-md-6 my-10 ">Этаж</div>
              <div class="col-md-6 my-10">
                <el-input-number
                  v-model="offerData.floor"
                  class="w-100"
                  type="number"
                  :min="1"
                  :max="10"
                ></el-input-number>
              </div>
              <div class="col-md-6 my-10 ">Этажей в доме</div>
              <div class="col-md-6 my-10">
                <el-input-number
                  v-model="offerData.floorsHous"
                  class="w-100"
                  type="number"
                  :min="1"
                  :max="10"
                ></el-input-number>
              </div>
              <div class="col-md-6 my-10 ">Тип застройки</div>
              <div class="col-md-6 my-10">
                <el-select
                  placeholder=""
                  class="w-100"
                  v-model="offerData.building_type"
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
                  class="w-100"
                  placeholder=""
                  v-model="offerData.building_renovation"
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
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6"></div>
      <div class="row">
        <div class="col-md-6">
          <div class="card-wrap mt-50"></div>
        </div>
        <div class="col-md-6">
          <div class="card-wrap mt-50"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";
import OfferTypes from "@/pages/account/add_post/components/offer_types.vue";
import OfferMap from "@/pages/account/add_post/components/offer_map.vue";
export default {
  components: {
    OfferTypes,
    OfferMap
  },
  data() {
    return {
      offerData: {
        map_address: null,
        floor: 1,
        floorsHous: 1,
        building_type: "",
        building_renovation: ""
      },
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
      ],
      showFroms: null,
      links: [],
      coords: []
    };
  },
  methods: {
    getMarker(queryString, cb) {
      Api.getInstance()
        .offer.get_marker({
          map_address: queryString
        })
        .then(response => {
          this.coords = response.data[0].coords;
          let results = queryString ? response.data : "";
          cb(results);
        });
    },
    onClickMap(data) {
      console.log(data);
      this.offerData.map_address = data.map_address;
    },
    checkOfferTypes(data) {
      if (data.picked_kind !== null && data.picked_type !== null) {
        this.showFroms = true;
        this.$refs.inputs.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
};
</script>

<style lang="scss">
.el-input-number__decrease {
  border-radius: 22px 0px 0px 22px;
}
.el-input-number__increase {
  border-radius: 0px 22px 22px 0px;
}

.el-input-number__decrease,
.el-input-number__increase {
  position: absolute;
  z-index: 1;
  top: 1px;
  width: 40px;
  height: 49px;
  text-align: center;
  background: #f5f7fa;
  color: #606266;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

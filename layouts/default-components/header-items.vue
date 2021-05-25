<template>
  <div class="d-none d-lg-block">
    <el-button
      type="text"
      class="text-black ml-16 fs-14"
      @click="openDialog('Аренда')"
      >Аренда
    </el-button>
    <el-button
      type="text"
      class="text-black ml-10 fs-14"
      @click="openDialog('Продажа')"
      >Продажа
    </el-button>
    <el-button
      type="text"
      class="text-black ml-10 fs-14"
      @click="openDialog('Коммерческая')"
    >
      Коммерческая
    </el-button>
    <div
      v-if="dialogVisible"
      class="dialog d-flex justify-content-center align-items-center"
      :class="[openDialog ? 'dialog-active' : '']"
    >
      <div class="card-wrap p-40" style="width:70%">
        <div class="row">
          <div class="col d-flex justify-content-between">
            <div class="fs-22" v-if="dialogTitle != 'Коммерческая'">
              {{ dialogTitle }} недвижимости в Таджикистане
            </div>
            <div class="fs-22" v-else>
              Коммерческая недвижимость в Таджикистане
            </div>
            <div @click="dialogVisible = false" class="cursor">
              <i class="bi bi-x fs-18"></i>
            </div>
          </div>
        </div>
        <div class="row mt-30">
          <div class="col-lg" v-if="dialogTitle === 'Коммерческая'">
            <div @click="dialogVisible = false">
              <nuxt-link to="/rent/commercy" class="fs-18">
                Аренда
              </nuxt-link>
              <div class="mt-20">
                <nuxt-link
                  to="/rent/commercy?typeCommercy=office"
                  class="text-black fs-14"
                >
                  Аренда офиса
                </nuxt-link>
              </div>
              <div class="mt-20">
                <nuxt-link
                  to="/rent/commercy?typeCommercy=warehouse"
                  class="text-black fs-14"
                >
                  Аренда склада
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-lg" v-if="dialogTitle === 'Коммерческая'">
            <div @click="dialogVisible = false">
              <nuxt-link to="/buy/commercy" class="fs-18">
                Продажа
              </nuxt-link>
              <div class="mt-20">
                <nuxt-link
                  to="/buy/commercy?typeCommercy=office"
                  class="text-black fs-14"
                >
                  Продажа офиса
                </nuxt-link>
              </div>
              <div class="mt-20">
                <nuxt-link
                  to="/buy/commercy?typeCommercy=warehouse"
                  class="text-black fs-14"
                >
                  Продажа склада
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-lg" v-if="dialogTitle === 'Продажа'">
            <div @click="dialogVisible = false">
              <nuxt-link to="/buy/apartment" class="fs-18">
                Квартиры
              </nuxt-link>
              <div class="mt-20">
                <nuxt-link
                  to="/buy/apartment?typeBuilding=secondaryBuilding&rooms=oneroom"
                  class="text-black fs-14"
                >
                  Однакомнатные
                </nuxt-link>
              </div>
              <div class="mt-20">
                <nuxt-link
                  to="/buy/apartment?typeBuilding=secondaryBuilding&rooms=tworoom"
                  class="text-black fs-14"
                >
                  Двухкомнатные
                </nuxt-link>
              </div>
              <div class="mt-20">
                <nuxt-link
                  to="/buy/apartment?typeBuilding=secondaryBuilding&rooms=threeroom"
                  class="text-black fs-14"
                >
                  Трёхкомнатные
                </nuxt-link>
              </div>
              <div class="mt-20">
                <nuxt-link
                  to="/buy/apartment?typeBuilding=newBuilding"
                  class="text-black fs-14"
                >
                  Квартиры в новостройках
                </nuxt-link>
              </div>
              <div class="mt-20">
                <nuxt-link
                  to="/buy/apartment?typeBuilding=secondaryBuilding"
                  class="text-black fs-14"
                >
                  Квартиры во вторичке
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-lg" v-if="dialogTitle === 'Продажа'">
            <div @click="dialogVisible = false">
              <nuxt-link to="/buy/house" class="fs-18">
                Дома
              </nuxt-link>
              <div class="mt-20">
                <nuxt-link to="/buy/ground" class="text-black fs-14">
                  Участки
                </nuxt-link>
              </div>
              <div class="mt-20">
                <nuxt-link to="/buy/room" class="  fs-18">
                  Комнаты
                </nuxt-link>
              </div>
            </div>
          </div>

          <div class="col-lg" v-if="dialogTitle === 'Аренда'">
            <div @click="dialogVisible = false">
              <nuxt-link to="/rent/apartment" class="fs-18">
                Длительная аренда
              </nuxt-link>
              <div class="mt-20">
                <nuxt-link to="/rent/apartment" class="text-black fs-14">
                  Квартиры
                </nuxt-link>
              </div>
              <div class="mt-20">
                <nuxt-link to="/rent/room" class="text-black fs-14">
                  Комнаты
                </nuxt-link>
              </div>
              <div class="mt-20">
                <nuxt-link to="/rent/house" class="text-black fs-14">
                  Дома
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-lg" v-if="dialogTitle === 'Аренда'">
            <div @click="dialogVisible = false">
              <nuxt-link to="/daily/apartment" class="fs-18">
                Посуточная аренда
              </nuxt-link>
              <div class="mt-20">
                <nuxt-link to="/daily/apartment" class="text-black fs-14">
                  Квартиры
                </nuxt-link>
              </div>
              <div class="mt-20">
                <nuxt-link to="/daily/room" class="text-black fs-14">
                  Комнаты
                </nuxt-link>
              </div>
              <div class="mt-20">
                <nuxt-link to="/daily/house" class="text-black fs-14">
                  Дома
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-lg">
            <el-image
              itemprop="image"
              draggable="false"
              class="w-100 h-100 border-rad-10 "
              src="/images/search.jpg"
              fit="cover"
            ></el-image>
          </div>
        </div>
        <div class="row">
          <div class="col text-light">
            <i class="bi bi-cursor-fill text-light fs-12"></i>
            <span class="fs-14 pr-20">Таджикистан</span>
            <span class="fs-14 px-20" @click="dialogVisible = false">
              <nuxt-link to="/all-offers" class="text-black">
                Поиск на карте
              </nuxt-link>
            </span>
            <span class="fs-14 px-20" @click="dialogVisible = false">
              <nuxt-link to="/realtors" class="text-black">
                Каталог риелторов
              </nuxt-link>
            </span>
            <span class="fs-14 px-20">
              <nuxt-link to="/agencies" class="text-black">
                Каталог агентств
              </nuxt-link>
            </span>
          </div>
        </div>
      </div>
      <div class="backdrop cursor" @click="dialogVisible = false"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: ""
    };
  },
  methods: {
    openDialog(data) {
      if (data === "Аренда") {
        this.dialogTitle = "Аренда";
      } else if (data === "Продажа") {
        this.dialogTitle = "Продажа";
      } else {
        this.dialogTitle = "Коммерческая";
      }
      this.dialogVisible = true;
      document.body.style.overflow = "hidden !important";
    }
  }
};
</script>

<style></style>

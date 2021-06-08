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
        <div class="card-wrap w-100 cursor">
          <div class="row">
            <div class="col-lg my-10">
              <div>
                <div class="avatar" style="background:#b9d7f7">
                  <img
                    src="https://avatars.mds.yandex.net/get-ydo/3604415/2a0000017919868fbe8558b2106d29e01f38/320x320"
                    width="100"
                    height="100"
                    style="background-color: #ccc; object-fit: cover"
                    class="border-rad-10 "
                  />
                  <!-- <i class="bi bi-briefcase fs-22"></i> -->
                </div>
              </div>
            </div>
            <div class="col-lg-10 my-10">
              <div>
                <div class="fs-18">
                  Отделка Фазенды
                </div>
                <div class="fs-12 text-light">
                  <i class="bi bi-geo-alt"></i>
                  Душанбе
                </div>
                <div class="fs-14 text-light mt-10">
                  Наша бригада плотников специализируется на различных вариантах
                  отделочных работ в деревянном доме. Чистовая отделка —
                  наиболее часто выполняемые работы нашей бригадой. Наши услуги
                  – это внешняя и внутренняя отделка деревянного дома под ключ.
                </div>
                <div class="mt-20">
                  <img
                    width="100"
                    height="100"
                    style="object-fit: cover"
                    class="border-rad-10 mt-10 mb-10 mr-10"
                    src="https://avatars.mds.yandex.net/get-ydo/2428621/2a000001755b6fc71d859df8b0e15aee2e3e/diploma"
                  />
                  <img
                    width="100"
                    height="100"
                    style="object-fit: cover"
                    class="border-rad-10 mt-10 mb-10 mr-10"
                    src="https://avatars.mds.yandex.net/get-ydo/4397410/2a000001780d0809951b20cda3a7c95fe5c2/diploma"
                  />

                  <img
                    width="100"
                    height="100"
                    style="object-fit: cover"
                    class="border-rad-10 mt-10 mb-10 mr-10"
                    src="https://avatars.mds.yandex.net/get-ydo/472106/2a0000017518d461d917ff16a304432a85cc/diploma"
                  />
                  <span style="position: relative; display: inline-block">
                    <span
                      class="d-flex border-rad-10 fs-14 mt-10 justify-content-center align-items-center"
                      style="width: 100px; height: 100px; background-color: rgba(000, 000, 000, 0.5); color: white; position: absolute;"
                    >
                      еще..
                    </span>
                    <img
                      width="100"
                      height="100"
                      style="object-fit: cover;"
                      class="border-rad-10 mt-10 mb-10 mr-10"
                      src="https://avatars.mds.yandex.net/get-ydo/1540809/2a000001755b6fc7a61186f4fd3d4f67fede/diploma"
                    />
                  </span>
                </div>
                <div>
                  <div class="mt-20 row fs-12">
                    <div class="col-auto text-blue">
                      Отделка стен в деревянном доме
                    </div>
                    <div
                      class="col mx-0 px-0"
                      style="border-bottom: 1px dotted #ccc"
                    ></div>
                    <div class="col-auto">
                      800 ₽ / м²
                    </div>
                  </div>
                  <div class="mt-20 row fs-12">
                    <div class="col-auto text-blue">
                      Отделка деревянного дома
                    </div>
                    <div
                      class="col mx-0 px-0"
                      style="border-bottom: 1px dotted #ccc"
                    ></div>
                    <div class="col-auto">
                      5000 ₽ / м²
                    </div>
                  </div>
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

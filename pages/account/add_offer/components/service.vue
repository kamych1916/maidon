<template>
  <div class="service">
    <div class="row">
      <div class="col-lg-6">
        <div class="card-wrap sticky">
          Введите тип объявления:
          <div class="d-flex">
            <el-input
              class="mt-18"
              required
              v-model="offerData.type"
              name="companyName"
              placeholder="тип объявления"
              clearable
              type="text"
            ></el-input>
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">
                Например вы можете ввести: <br /><br />
                - Ремонт квартир и домов <br /><br />
                - Электромонтажные работы <br /><br />
                - Строительство бань, саун и бассейнов
              </div>
              <el-button
                class="mt-12 px-10"
                type="text"
                icon="bi bi-question-circle"
                size="mini"
              ></el-button>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card-wrap">
          Введите ваш опыт по данному объявлению:
          <div class="d-flex">
            <el-input
              class="my-18"
              required
              v-model="offerData.workDate"
              name="companyName"
              placeholder="опыт"
              clearable
              type="text"
            ></el-input>
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">
                Например вы можете ввести: <br /><br />
                - Более 10 лет <br /><br />
                - Около года <br /><br />
                - 2 года и 3 месяца
              </div>
              <el-button
                class="px-10"
                type="text"
                icon="bi bi-question-circle"
                size="mini"
              ></el-button>
            </el-tooltip>
          </div>
          Введите время работы:
          <div class="d-flex">
            <el-input
              class="my-18"
              required
              v-model="offerData.workTime"
              name="companyName"
              placeholder="время работы"
              clearable
              type="text"
            ></el-input>
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">
                Например вы можете ввести: <br /><br />
                - с 08:00 по 17:00 <br /><br />
                - с 10:00 по 22:00
              </div>
              <el-button
                class="mt-12 px-10"
                type="text"
                icon="bi bi-question-circle"
                size="mini"
              ></el-button>
            </el-tooltip>
          </div>
          Добавьте фотографии:
          <div class="mt-10 row justify-content-center">
            <div class="col-auto px-10 my-10">
              <div
                class=" box-upload mx-0 avatar border-rad-10 cursor "
                style="background:#b9d7f7; width: 100px; height:100px"
              >
                <input
                  max-size="800"
                  type="file"
                  class="box-photo-input"
                  accept="image/png, image/jpeg, image/jpg"
                  @change="offer_uplodfile"
                />
                <i
                  style="font-size: 40px;  line-height: 0"
                  class="bi bi-cloud-arrow-up-fill "
                >
                </i>
              </div>
            </div>
            <div
              class="col-auto px-10 my-10"
              v-for="(item, id) in offerData.listPhotos"
              :key="id"
            >
              <div class="avatar" style=" width: 100px; height:100px">
                <div class="delete" @click="offerData.listPhotos.splice(id, 1)">
                  <!-- <div class="delete"> -->
                  <i class="bi bi-x-circle-fill fs-12"></i>
                </div>
                <img
                  :src="item.imgSrc"
                  width="100"
                  height="100"
                  style="background-color: #ccc; object-fit: cover"
                  class="border-rad-10 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row mt-20 mx-0 w-100"
        v-for="(item, id) in storeService"
        :key="id"
      >
        <div class="col-lg-6">
          <div class="card-wrap ">
            <span class="text-blue"> {{ id + 1 }}. </span> Введите вид услуги:
            <div class="d-flex">
              <el-input
                class="mt-18"
                required
                v-model="item.kind"
                name="companyName"
                placeholder="вид услуги"
                clearable
                type="text"
              ></el-input>
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">
                  Например вы можете ввести: <br /><br />
                  - Отделка стен <br /><br />
                  - Прокладка кабеля <br /><br />
                  - Монтаж сантехнического оборудования
                </div>
                <el-button
                  class="mt-12 px-10"
                  type="text"
                  icon="bi bi-question-circle"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card-wrap">
            <span class="text-blue"> {{ id + 1 }}. </span> Введите стоимость
            услуги
            <div class="d-flex">
              <el-input
                class="my-18"
                required
                v-model="item.cost"
                name="companyName"
                placeholder="стоимость"
                clearable
                type="text"
              ></el-input>
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">
                  Например вы можете ввести: <br /><br />
                  - 70 сомони / метр <br /><br />
                  - 1500 сомони <br /><br />
                  - по договорённости
                </div>
                <el-button
                  class="px-10"
                  type="text"
                  icon="bi bi-question-circle"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </div>
            <span class="text-blue"> {{ id + 1 }}. </span> Введите описание
            услуги
            <div class="d-flex">
              <el-input
                class="my-18"
                required
                v-model="item.description"
                name="companyName"
                placeholder="описание"
                clearable
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 20 }"
              ></el-input>
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">
                  Например вы можете ввести: <br /><br />
                  - Подключаем электричество к дому и<br />
                  выполняем все электромонтажные работы.<br /><br />

                  - Переборка существующего распределительного<br />
                  устройства. Проводим работы в соответствии с
                  <br />действующими условиями и нормами.
                </div>
                <el-button
                  class="px-10"
                  type="text"
                  icon="bi bi-question-circle"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 mt-40 d-flex row mx-0 justify-content-center">
        <div class="col my-10 d-flex justify-content-center">
          <button
            @click="addService()"
            class="el-button el-button--primary is-round py-14 "
          >
            Добавить еще услугу
          </button>
        </div>
        <div class="col my-10 d-flex justify-content-center">
          <button class="el-button el-button--primary is-round py-14 ">
            Разместить объявление
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offerData: {
        type: null,
        workData: null,
        workTime: null,
        listPhotos: []
      },
      storeService: [
        {
          kind: null,
          cost: null,
          description: null
        }
      ]
    };
  },
  methods: {
    offer_uplodfile(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        if (file.size > 1024 * 1024) {
          this.sendNTFS(
            "Предупрждение!",
            "Размер фотографии не должно превышать одного мегабайт!",
            "warning"
          );
        } else {
          let url = URL.createObjectURL(file);
          this.offerData.listPhotos.push({
            imgSrc: url,
            imgName: file.name
          });
          const formData = new FormData();
          formData.append("file", file);
          // Api.getInstance()
          //   .offer.offer_uplodfile(formData)
          //   .then(response => {
          //     this.emitData();
          //   })
          //   .catch(error => {
          //     Api.typicalNTFS(error.response.status);
          //   });
        }
      }
    },
    addService() {
      this.storeService.push({
        kind: null,
        cost: null,
        description: null
      });
    }
  }
};
</script>

<style lang="scss">
.service {
  .el-textarea__inner {
    border: none;
    background-color: #f2f3f7;
    padding: 15px 30px !important;
    border-radius: 30px !important;
    color: #409eff;
  }
  .avatar {
    .delete {
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 6px;
      cursor: pointer;
      padding: 2px 8px;
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>

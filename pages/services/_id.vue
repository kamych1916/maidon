<template>
  <div class="services-wrap">
    <div class="row ">
      <div class="col-lg-8">
        <div class="card-wrap w-100 ">
          <div class="row">
            <div class="col-lg my-10">
              <div
                class="avatar"
                style="background:#b9d7f7; width: 100px; height:100px"
              >
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
                <div class="mt-10 mb-10 fs-14">
                  Опыт работы:
                  <span style="font-family: Tahoma"> c 2020 года</span>
                </div>
                <div class="my-10 fs-14">
                  Специализация:
                  <span style="font-family: Tahoma">плотник</span>
                </div>
                <div class="my-10 fs-14">
                  Телефон:
                  <a
                    :href="'tel:+992 (918) 62 - 27 - 74'"
                    class="mx-0  is-round "
                  >
                    +992 (918) 62 - 27 - 74
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <el-collapse v-model="activeNames">
          <div class="card-wrap ">
            <div class="row">
              <div class="col">
                <el-collapse-item name="1">
                  <template slot="title">
                    <span class="fs-18">
                      Отделка деревянных домов
                    </span>
                  </template>
                  <div class="mt-10 fs-14 ">
                    <div class="row">
                      <div class="col-6 my-5">Опыт</div>
                      <div class="col-6 my-5">Более 10 лет</div>
                      <div class="col-6 my-5">Дни работы</div>
                      <div class="col-6 my-5">любой день недели</div>
                      <div class="col-6 my-5">Время работы</div>
                      <div class="col-6 my-5">с 21:00 по 21:00</div>
                    </div>
                    <div class="mt-20  text-light">
                      Подключение водоснабжения и канализации. Все виды
                      отделочных и строительных работ. От копки котлована до
                      монтажа крыши. Изготовление проектов и смет под ваш
                      проект. Построил за время своей работы более 100 домов
                      "под ключ" На все виды работ даю гарантию. Помогаю с
                      покупкой материалов. Консультирую по выбору материалов.
                      Всегда на связи. Решаю все задачи вовремя и в срок.
                    </div>
                    <div class="w-100 pt-20 pb-30">
                      <div style="position: relative">
                        <hooper
                          group="group1"
                          class="gallery-slide "
                          :wheelControl="false"
                          :itemsToShow="4"
                          :touchDrag="false"
                          :mouseDrag="false"
                          :shortDrag="false"
                        >
                          <slide
                            v-for="(img, index) in servicePhothos"
                            :key="index"
                            draggable="false"
                            class="cursor"
                          >
                            <el-image
                              @click.stop="openSlider()"
                              draggable="false"
                              class="w-100 h-100 border-rad-10"
                              :src="img"
                              fit="cover"
                            ></el-image>
                          </slide>
                          <hooper-navigation
                            slot="hooper-addons"
                          ></hooper-navigation>
                        </hooper>
                        <div
                          class="dialog"
                          :class="[dialogSlider ? 'dialog-active' : '']"
                        >
                          <div
                            style="z-index:20001; right: 2px; top:10px"
                            @click="closeSlider()"
                            class=" hooper-fullscreen fs-14 py-12 px-18  mx-5 my-5"
                          >
                            <i class="bi bi-fullscreen-exit"></i>
                          </div>
                          <Carousel>
                            <CarouselSlide
                              v-for="(img, index) in servicePhothos"
                              :key="index"
                              class="carousel-slider"
                            >
                              <el-image
                                class="border-rad-20"
                                draggable="false"
                                :src="img"
                                fit="cover"
                              ></el-image>
                            </CarouselSlide>
                          </Carousel>
                        </div>
                      </div>
                    </div>
                    <div
                      style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc"
                      class="pb-20"
                    >
                      <div class="mt-20 ">
                        <div class="d-flex row justify-content-between">
                          <div class="col ">
                            Прокладка канализационных труб
                          </div>
                          <div class="col text-blue" style="text-align: end">
                            по договорённости
                          </div>
                        </div>
                      </div>
                      <div class="mt-20 text-light">
                        Прокладка канализационных труб. Выполняем полный спектр
                        строительно-отделочных работ от ремонта квартир,
                        фундамента до кровли. Подключаем электричество к дому и
                        выполняем все электромонтажные работы. Организовываем
                        подключение, проводку водоснабжения, отопления и
                        канализации по всему дому. Помимо основного направления
                        по строительству жилых домов, мы оказываем услуги по
                        ремонту квартир, реконструкции зданий или сооружений,
                        постройке различных помещений хозяйственного назначения
                        в черте города, постройка бань или дачных домов. Спектр
                        наших услуг многогранен и доступен для каждого клиента.
                        Вам остается сделать телефонный звонок для того чтобы
                        получить грамотную консультацию! И согласовать время
                        выезда к вам на бесплатный замер! Плюс ко всему вы
                        получите квалифицированных специалистов со стажем работы
                        более 10 лет. И гарантии на все наши работы!
                      </div>
                    </div>
                    <div>
                      <div class="mt-20">
                        <div class="d-flex row justify-content-between">
                          <div class="col ">
                            Монтаж наружной канализации
                          </div>
                          <div class="col text-blue" style="text-align: end">
                            от 150 сомони / метр
                          </div>
                        </div>
                      </div>
                      <div class="mt-20 text-light">
                        Прокладка канализационных труб. Выполняем полный спектр
                        строительно-отделочных работ от ремонта квартир,
                        фундамента до кровли. Подключаем электричество к дому и
                        выполняем все электромонтажные работы. Организовываем
                        подключение, проводку водоснабжения, отопления и
                        канализации по всему дому. Помимо основного направления
                        по строительству жилых домов, мы оказываем услуги по
                        ремонту квартир, реконструкции зданий или сооружений,
                        постройке различных помещений хозяйственного назначения
                        в черте города, постройка бань или дачных домов. Спектр
                        наших услуг многогранен и доступен для каждого клиента.
                        Вам остается сделать телефонный звонок для того чтобы
                        получить грамотную консультацию! И согласовать время
                        выезда к вам на бесплатный замер! Плюс ко всему вы
                        получите квалифицированных специалистов со стажем работы
                        более 10 лет. И гарантии на все наши работы!
                      </div>
                    </div>
                  </div>
                </el-collapse-item>
              </div>
            </div>
          </div>
          <div class="card-wrap ">
            <div class="row">
              <div class="col">
                <el-collapse-item name="2">
                  <template slot="title">
                    <span class="fs-18">
                      Проектирование строительных объектов и составление смет
                    </span>
                  </template>
                  <div>
                    Operation feedback: enable the users to clearly perceive
                    their operations by style updates and interactive effects;
                  </div>
                  <div>
                    Visual feedback: reflect current state by updating or
                    rearranging elements of the page.
                  </div>
                </el-collapse-item>
              </div>
            </div>
          </div>
          <div class="card-wrap ">
            <div class="row">
              <div class="col">
                <el-collapse-item name="3">
                  <template slot="title">
                    <span class="fs-18">
                      Строительство бань, саун и бассейнов
                    </span>
                  </template>
                  <div>
                    Simplify the process: keep operating process simple and
                    intuitive;
                  </div>
                  <div>
                    Definite and clear: enunciate your intentions clearly so
                    that the users can quickly understand and make decisions;
                  </div>
                  <div>
                    Easy to identify: the interface should be straightforward,
                    which helps the users to identify and frees them from
                    memorizing and recalling.
                  </div>
                </el-collapse-item>
              </div>
            </div>
          </div>
          <div class="card-wrap ">
            <div class="row">
              <div class="col">
                <el-collapse-item name="4">
                  <template slot="title">
                    <span class="fs-18">
                      Ремонт квартир и домов
                    </span>
                  </template>
                  <div>
                    Decision making: giving advices about operations is
                    acceptable, but do not make decisions for the users;
                  </div>
                  <div>
                    Controlled consequences: users should be granted the freedom
                    to operate, including canceling, aborting or terminating
                    current operation.
                  </div>
                </el-collapse-item>
              </div>
            </div>
          </div>
        </el-collapse>
      </div>
      <div class="col-lg-4 d-none d-sm-block mb-30">
        <div class="card-wrap sticky">
          <Breadcrumbs />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation
  },
  data() {
    return {
      dialogSlider: false,
      servicePhothos: [
        "https://avatars.mds.yandex.net/get-ydo/4397410/2a000001780d0809951b20cda3a7c95fe5c2/diploma",
        "https://avatars.mds.yandex.net/get-ydo/2428621/2a000001755b6fc71d859df8b0e15aee2e3e/diploma",
        "https://avatars.mds.yandex.net/get-ydo/472106/2a0000017518d461d917ff16a304432a85cc/diploma",
        "https://avatars.mds.yandex.net/get-ydo/1540809/2a000001755b6fc7a61186f4fd3d4f67fede/diploma"
      ],
      activeNames: ["1"]
    };
  },
  mounted() {
    // this.get_info_account();
    // if (localStorage.getItem("ui")) {
    //   this.localStore = JSON.parse(localStorage.getItem("ui"));
    // }
  },
  methods: {
    openSlider() {
      this.dialogSlider = true;
      document.body.style.overflow = "hidden";
    },
    closeSlider() {
      this.dialogSlider = false;
      document.body.style.overflow = "auto";
    },
    // add_review() {
    //   if (this.reviewRate == 0 || !this.reviewRate || !this.reviewText) {
    //     alert("пошел нахъуй");
    //   } else {
    //     Api.getInstance()
    //       .clients.add_review({
    //         id: this.$route.params.id,
    //         text: this.reviewText,
    //         value: this.reviewRate
    //       })
    //       .then(response => {})
    //       .catch(error => {
    //         Api.typicalNTFS(error.response.status);
    //       });
    //   }
    // },
    // get_info_account() {
    //   Api.getInstance()
    //     .clients.get_info_account(this.$route.params.id)
    //     .then(response => {
    //       this.accountData = response.data;
    //     })
    //     .catch(error => {
    //       Api.typicalNTFS(error.response.status);
    //     });
    // },
    scrollTo(data) {
      data == "reviews"
        ? this.$refs.reviews.scrollIntoView({ behavior: "smooth" })
        : this.$refs.offers.scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>
<style lang="scss">
.services-wrap {
  .el-collapse-item__header {
    height: auto !important;
    line-height: normal;
    padding: 10px 0 10px 0;
    border-bottom: none;
  }
  .el-collapse-item__wrap {
    border-bottom: none;
  }
  .hooper-fullscreen {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
    background-color: rgba(31, 45, 61, 0.6);
    color: white;
    border-radius: 30px;
    transition: all 0.3s ease;
    svg {
      fill: white;
    }
  }

  .gallery-slide {
    height: 100px !important;
  }
  .gallery-thumb {
    height: 130px !important;
    .is-current {
      opacity: 1;
      .el-image {
        background-color: #409eff;
        // border: 2px solid #409eff !important;
        .el-image__inner {
          border-radius: 10px !important;
        }
      }
    }
    .hooper-slide {
      opacity: 0.8;
      padding: 15px 10px !important;
    }
    .is-current {
      opacity: 1;
    }
  }

  @media (max-width: 992px) {
    .gallery-slide {
      height: 70px !important;
    }
    .gallery-thumb {
      height: 100px !important;
    }
  }
}
</style>

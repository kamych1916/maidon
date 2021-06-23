<template>
  <div>
    <section class="complex-wrap">
      <div
        class="w-100 d-flex justify-content-center"
        style="height: 90vh; position: relative"
      >
        <div
          style="position: absolute; z-index: 2"
          class="w-100 container mt-20 text-white mb-auto d-flex justify-content-end align-items-center"
        >
          <i class="bi bi-heart mr-20"></i>
          <button class="el-button">Галерея Комплекса</button>
        </div>
        <div
          style="position: absolute; z-index: 2; bottom: 0px"
          class="w-100 container text-white mb-auto d-flex justify-content-center align-items-center"
        >
          <div style="width: 100%">
            <div class="mb-40">
              <div class="fs-28 mb-20">
                ЖК «Бустон Сити»
              </div>
              <div class="fs-22 mb-20">
                от 20,31 млн ₽ до 57,34 млн ₽
              </div>
              <div class="fs-14">
                от 375 091 до 594 000 ₽/м²
              </div>
            </div>
            <div class="mb-40">
              <el-button type="primary">
                Контакты застройщика
              </el-button>
              <button class="el-button d-none d-lg-inline">
                Перезвоните мне
              </button>
            </div>
            <div
              class="w-100 p-20 mx-0 row d-none d-lg-flex"
              style="background: #152242; "
            >
              <div class="col-lg">
                <div class="fs-14 text-grey">Сдача комплекса</div>
                <div class="fs-16">Сдача в 1 кв. 2023</div>
              </div>
              <div
                class="col-lg"
                style="border-right: 1px solid #ccc; border-left: 1px solid #ccc"
              >
                <div>
                  <div class="fs-14 text-grey">Класс комплекса</div>
                  <div class="fs-16">Премиум</div>
                </div>
              </div>
              <div class="col-lg">
                <div class="fs-14 text-grey">Застройщик</div>
                <div class="fs-16">Partner Group</div>
              </div>
            </div>
          </div>
        </div>

        <hooper
          ref="slider"
          class="gallery-slide"
          :wheelControl="false"
          :autoPlay="true"
          :playSpeed="3000"
        >
          <slide draggable="false" class="p-0 m-0">
            <el-image
              draggable="false"
              class="w-100 h-100"
              src="/images/hide-moskva-jk-989757839-10.jpg"
              fit="cover"
            ></el-image>
          </slide>
          <slide draggable="false" class="p-0 m-0">
            <el-image
              draggable="false"
              class="w-100 h-100"
              src="/images/hide-moskva-jk-989757847-10.jpg"
              fit="cover"
            ></el-image>
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>

      <!-- </div> -->

      <!-- <img
      style="object-fit: cover; background-size: cover"
      src="/images/hide-moskva-jk-989757839-10.jpg"
      width="100%"
      height="100%"
    /> -->
    </section>
    <section class="mt-100 container">
      <div class="row">
        <div class="col-lg my-10">
          <div class=" fs-18 text-grey">
            Местоположение
          </div>
          <div class="fs-28">
            Aini 45, Душанбе
          </div>
          <div class="row mt-20">
            <div class="col-auto p-10 d-flex">
              <div class="p-10">
                <svg
                  width="40"
                  height="40"
                  style="color: #737a8e"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.442 8.855a7.333 7.333 0 0 1 13.154 6.408 7.895 7.895 0 0 1-.96-.345c-1.049-.455-1.898-1.086-2.492-1.761a3.5 3.5 0 1 0-1.99.699c.823 1.181 2.117 2.216 3.687 2.897.243.105.487.2.732.283a7.335 7.335 0 0 1-12.131-8.18zM24.688 17.5A9.282 9.282 0 0 1 22 20.27V33a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V14.345a3 3 0 0 0-1.207-2.405l-4.56-3.4a3 3 0 0 0-3.527-.042l-1.96 1.389a9.352 9.352 0 0 1 .317 3.742 3.5 3.5 0 1 1 .596 3.807h-.004a7.454 7.454 0 0 1-1.967.064zm4.176-.969a1.5 1.5 0 0 0 1.462-2.493c-.04.34-.128.676-.27 1.003a3.67 3.67 0 0 1-1.192 1.49zm-.538-2.633a1.566 1.566 0 0 1-.105.348 1.673 1.673 0 0 1-.455.602 1.5 1.5 0 0 1 .56-.95zm-2.55 1.629a5.425 5.425 0 0 1-.147.007c.043-.126.083-.252.12-.378.003.125.012.25.027.371zM19.2 11.313a1.495 1.495 0 0 0 .311-1.266 1.573 1.573 0 0 0-.2.335c-.114.266-.158.58-.111.93zm-1.303-2.45c-.165.22-.306.461-.42.724a3.693 3.693 0 0 0-.255 2.025 1.5 1.5 0 0 1 .675-2.748zM21.46 4.44A9.333 9.333 0 0 0 8.906 17.516L.956 31.284l-.25.433.197.46 1.637 3.831.294.69.745-.09 4.137-.498.496-.06.25-.433 2.084-3.608.207-.359-.107-.4-.352-1.31 1.311-.352.4-.107.207-.359.834-1.443.207-.359-.107-.4-.352-1.31 1.311-.352.4-.107.207-.359 1.7-2.943A9.372 9.372 0 0 0 20 21.287V33a3 3 0 0 0 3 3h13a3 3 0 0 0 3-3V14.345a5 5 0 0 0-2.011-4.008l-4.56-3.4a5 5 0 0 0-5.88-.07l-1.593 1.128A9.29 9.29 0 0 0 21.46 4.44zm-7.165 17.078a9.344 9.344 0 0 1-2.168-.912 9.349 9.349 0 0 1-1.874-1.421L2.94 31.85l1.146 2.682 2.895-.349 1.626-2.816-.502-1.877-.26-.966.967-.259 1.876-.503.42-.726-.503-1.876-.26-.966.967-.259 1.876-.503 1.107-1.916z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div class="p-10">
                <div class=" fs-14" style="color: #737a8e">Срок сдачи</div>
                <div class="fs-14">2023</div>
              </div>
            </div>
            <div class="col-auto p-10 d-flex">
              <div class="p-10">
                <svg
                  style="color: #737a8e"
                  width="40"
                  height="40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#a)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.667 20c0-9.573 7.76-17.333 17.333-17.333 9.573 0 17.333 7.76 17.333 17.333 0 9.573-7.76 17.334-17.333 17.334-9.573 0-17.334-7.76-17.334-17.334zM20 .667C9.322.667.667 9.323.667 20 .667 30.678 9.322 39.334 20 39.334c10.677 0 19.333-8.656 19.333-19.334C39.333 9.323 30.677.667 20 .667zm1.743 5.63c-.548-1.689-2.938-1.689-3.487 0l-2.537 7.81H7.506c-1.776 0-2.514 2.273-1.077 3.317l6.643 4.827-2.537 7.81c-.55 1.69 1.384 3.094 2.82 2.05L20 27.284l6.644 4.827c1.437 1.044 3.37-.36 2.82-2.05l-2.537-7.81 6.644-4.827c1.437-1.044.699-3.316-1.078-3.316h-8.212l-2.538-7.81zm-4.16 8.544L20 7.403l2.416 7.438c.246.755.95 1.267 1.744 1.267h7.82l-6.326 4.596a1.833 1.833 0 0 0-.666 2.05l2.416 7.438-6.327-4.597a1.833 1.833 0 0 0-2.155 0l-6.327 4.597 2.417-7.438a1.833 1.833 0 0 0-.666-2.05l-6.327-4.596h7.82c.795 0 1.499-.512 1.744-1.267z"
                      fill="currentColor"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h40v40H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="p-10">
                <div class=" fs-14" style="color: #737a8e">Класс</div>
                <div class="fs-14">Премиум</div>
              </div>
            </div>
            <div class="col-auto p-10 d-flex">
              <div class="p-10">
                <svg
                  style="color: #737a8e"
                  width="40"
                  height="40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#a)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 2h18v13.851l2.714-.81L32 14.659V24.182c.49-.12 1-.182 1.526-.182C37.106 24 40 26.915 40 30.5V37h-8v3h-2v-3h-3.632C23.951 37 22 35.032 22 32.615s1.951-4.384 4.368-4.384c.36 0 .71.044 1.045.126A6.517 6.517 0 0 1 30 25.047v-7.705l-11.618 3.465-7.092 2.15-1.29.391v-.041l-2 .596V40H6V22.413l.714-.213L10 21.22V16H4.59C2.014 16 0 13.832 0 11.25S2.014 6.5 4.59 6.5c1.55 0 2.852.88 3.657 2H10V2zm2 18.623v-4.949c1.306-.6 2.192-1.956 2.192-3.486 0-1.565-.907-2.825-2.192-3.38V4h14v12.407l-8.194 2.485L12 20.623zm15.134 2.33L12 27.734V40h-2V26.267l.699-.22 15.833-5 .602 1.907zm1.964 6.904c.31-2.184 2.179-3.857 4.428-3.857C35.992 26 38 28.01 38 30.5V35H26.368A2.377 2.377 0 0 1 24 32.615a2.377 2.377 0 0 1 2.368-2.384c.449 0 .865.124 1.22.34l1.297.787.213-1.501zM4.59 8.5C3.2 8.5 2 9.69 2 11.25S3.2 14 4.59 14h5.91c.894 0 1.692-.77 1.692-1.813 0-.982-.739-1.687-1.692-1.687H7.11l-.286-.516C6.332 9.095 5.466 8.5 4.59 8.5zM16 5h-2v3h2V5zm2 0h2v3h-2V5zm6 0h-2v3h2V5z"
                      fill="currentColor"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h40v40H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="p-10">
                <div class=" fs-14" style="color: #737a8e">Этажность</div>
                <div class="fs-14">41</div>
              </div>
            </div>
            <div class="col-auto p-10 d-flex">
              <div class="p-10">
                <svg
                  width="40"
                  height="40"
                  style="color: #737a8e"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#a)" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13 2h-1v3H8v12.495a2.085 2.085 0 0 0-4.014.052L.984 28.785a5.797 5.797 0 0 0 2.707 6.52l.254.146c.332.19.687.334 1.055.426V40h2v-4.123c.348-.087.684-.22 1-.396V40h32V13h-5v-3h-7V5h-4V2H13zm-3 31.83V38h16V7H10v17.98l1.016 3.805A5.797 5.797 0 0 1 10 33.829zM28 38V15h10v23H28zm5-26v1h-5v-1h5zM22 5V4h-8v1h8zM6 18a.085.085 0 0 0-.082.063L2.916 29.301a3.797 3.797 0 0 0 1.774 4.27l.254.147a2.116 2.116 0 0 0 2.112 0l.255-.147a3.797 3.797 0 0 0 1.773-4.27L6.082 18.063A.085.085 0 0 0 6 18z"
                    ></path>
                    <path
                      d="M13 10h2v5h-2zM13 18h2v5h-2zM13 26h2v5h-2zM21 10h2v5h-2zM21 18h2v5h-2zM21 26h2v5h-2zM32.5 18h2v5h-2zM32.5 26h2v5h-2z"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h40v40H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="p-10">
                <div class=" fs-14" style="color: #737a8e">Корпусов</div>
                <div class="fs-14">3 корпуса</div>
              </div>
            </div>
            <div class="col-auto p-10 d-flex">
              <div class="p-10">
                <svg
                  width="40"
                  height="40"
                  style="color: #737a8e"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 1H1v39h38V12h-3V7h-2v5h-3V7h-2v5h-3V7h-2v5h-3V1H2zm17 11V3H3v9h16zM3 14v24h34V14H3zm16 2h16v14H19V16zm14 12v-4h-4v4h4zm0-6v-4h-4v4h4zm-6-4v10h-6V18h6z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div class="p-10">
                <div class=" fs-14" style="color: #737a8e">Тип дома</div>
                <div class="fs-14">Монолитно-кирпичный</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-lg-auto my-10 d-flex justify-content-center justify-content-lg-end"
        >
          <img
            class="border-rad-20"
            width="200"
            height="150"
            src="/images/builder-img.jpg"
            alt=""
          />
        </div>
      </div>
    </section>

    <section class="mt-100 svg-container d-none d-lg-block">
      <img width="100%" src="/images/complex-svg.jpeg" />

      <svg class="svg-wrap" width="100%" height="100%" viewBox="0 0 1920 1298">
        <path
          @mouseover="mouseHoverEvent($event, 1)"
          @mouseleave="mouseleaveHoverEvent($event, 1)"
          class="frame-wrap"
          d="M 675.9118679342 289.6833294446, 816.5396661905 255.9451884862, 895.2912332141 280.3116236228, 898.1037891792 1080.030522796, 825.914852741 1125.9518813226, 677.7869052443 1095.962422693 Z"
        ></path>

        <path
          @mouseover="mouseHoverEvent($event, 2)"
          @mouseleave="mouseleaveHoverEvent($event, 2)"
          class="frame-wrap"
          d="M 1014.3561024044 299.0550352663, 1084.6700015326 284.9974765337, 1115.608117149 1099.3987124443, 1015.2936210595 1090.0270066226 Z"
        ></path>
        <path
          @mouseover="mouseHoverEvent($event, 3)"
          @mouseleave="mouseleaveHoverEvent($event, 3)"
          class="frame-wrap"
          d="M 1085.6075201876 173.4741772548, 1268.4236579208 131.3015010569, 1367.8006353553 172.5370066726, 1334.0499637738 1193.4281632393, 1268.4236579208 1193.4281632393, 1118.4206731141 1156.8785105344 Z"
        ></path>
      </svg>
      <div
        id="description1"
        :class="['description', active_1 ? ' ' : 'activate']"
      >
        <div class="p-20">
          <div class="fs-14 pb-10">
            West Dale (корпус 1)
          </div>
          <div class="fs-12 text-dblue pb-10">
            Сдача в 1 кв. 2023 • 41 этажей
          </div>
          <div class="fs-14 pb-10">
            2-комн. от 49 м² от 21 474 375 ₽
          </div>
          <div class="fs-14 pb-10">
            3-комн. от 74 м² от 27 832 500 ₽
          </div>
          <div class="fs-14 pb-10">
            3-комн. от 74 м² от 27 832 500 ₽
          </div>
          <div class="fs-14 text-blue pb-10">
            18 квартир в продаже
          </div>
        </div>
      </div>
      <div
        id="description2"
        :class="['description', active_2 ? ' ' : 'activate']"
      >
        <div class="p-20">
          <div class="fs-14 pb-10">
            Park Lane (корпус 2)
          </div>
          <div class="fs-12 text-dblue pb-10">
            Сдача в 1 кв. 2023 • 41 этажей
          </div>
          <div class="fs-14 pb-10">
            2-комн. от 47 м² от 20 315 350 ₽
          </div>
          <div class="fs-14 pb-10">
            3-комн. от 75 м² от 29 106 000 ₽
          </div>
          <div class="fs-14 pb-10">
            4-комн. от 101 м² от 51 663 300 ₽
          </div>
          <div class="fs-14 text-blue pb-10">
            25 квартир в продаже
          </div>
        </div>
      </div>
      <div
        id="description3"
        :class="['description', active_3 ? ' ' : 'activate']"
      >
        <div class="p-20">
          <div class="fs-14 pb-10">
            River Side (корпус 3)
          </div>
          <div class="fs-14 text-blue pb-10">
            Нет квартир в продаже
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
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
      active_1: false,
      active_2: false,
      active_3: false
    };
  },
  methods: {
    mouseHoverEvent(e, which) {
      if (which == 1) {
        this.active_1 = true;
      } else if (which == 2) {
        this.active_2 = true;
      } else {
        this.active_3 = true;
      }
      console.log(which);
      document.getElementById(
        "description" + which
      ).style.left = `${e.pageX}px`;

      document.getElementById("description" + which).style.top = `${e.clientY +
        130}px`;
    },
    mouseleaveHoverEvent(e, which) {
      if (which == 1) {
        this.active_1 = false;
      } else if (which == 2) {
        this.active_2 = false;
      } else {
        this.active_3 = false;
      }
    }
  }
};
</script>

<style lang="scss">
.svg-container {
  margin: 0 auto 55px;
  max-width: 1920px !important;
  position: relative;

  .description {
    pointer-events: none;
    position: absolute;
    font-size: 18px;
    background: white;
    z-index: 999999999999;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0 0 0 1px #eee;
  }
  .activate {
    display: none !important;
  }
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 100%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
  }
  svg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    .frame-wrap {
      position: absolute;
      fill: #fff;
      fill-opacity: 0;
      cursor: pointer;
      -webkit-transition: all 0.2s ease;
      transition: all 0.2s ease;
      &:hover {
        fill-opacity: 0.4;
      }
    }
  }
}

.complex-wrap {
  position: inherit;
  .gallery-slide {
    position: relative;
    height: 100% !important;
    .hooper-next,
    .hooper-prev {
      z-index: 5;
    }
    &:hover {
      cursor: grab;
    }
    &:active {
      cursor: grabbing;
    }
    &:after {
      z-index: 1;
      margin-left: 0px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      content: " ";
      background: -webkit-gradient(
          linear,
          left bottom,
          left top,
          from(rgba(0, 0, 0, 0.1)),
          to(rgba(0, 0, 0, 0.1))
        ),
        -webkit-gradient(linear, left top, left bottom, color-stop(55.21%, transparent), to(rgba(0, 0, 0, 0.8)));
    }
  }
  .hooper .hooper-list {
    border-radius: 0px !important;
  }
  .gallery-thumb {
    height: 100% !important;

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
      width: auto !important;
      opacity: 0.8;
    }
    .is-current {
      opacity: 1;
    }
  }

  @media (max-width: 992px) {
    .gallery-slide {
      height: 100% !important;
    }
    .gallery-thumb {
      height: 100% !important;
    }
  }
}
</style>

<template>
  <div>
    <h1 class="fs-28">{{ title }}</h1>
    <div class="row mt-50 my-20">
      <div class="col-md-4">
        <h2 class="fs-18 fw-200">
          Вторичный рынок
        </h2>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link
            :to="link + '/apartment?type=secondaryBuilding&object=apartment'"
          >
            Квартиры
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link
            :to="link + '/apartment?type=secondaryBuilding&object=oneroom'"
          >
            Однокомнатные
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link
            :to="link + '/apartment?type=secondaryBuilding&object=tworoom'"
          >
            Двухкомнатные
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link
            :to="link + '/apartment?type=secondaryBuilding&object=threeroom'"
          >
            Трёхкомнатные
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link
            :to="
              link + '/apartment?type=secondaryBuilding&object=fourroomormore'
            "
          >
            Четыре комнаты и более
          </nuxt-link>
        </h3>
      </div>
      <div class="col-md-4">
        <h2 class="fs-18 fw-200">
          Новостройки
        </h2>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link
            :to="link + '/apartment?type=newBuilding&object=apartment'"
          >
            Квартиры
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/apartment?type=newBuilding&object=oneroom'">
            Однокомнатные
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/apartment?type=newBuilding&object=tworoom'">
            Двухкомнатные
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link
            :to="link + '/apartment?type=newBuilding&object=threeroom'"
          >
            Трёхкомнатные
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link
            :to="link + '/apartment?type=newBuilding&object=fourroomormore'"
          >
            Четыре комнаты и более
          </nuxt-link>
        </h3>
      </div>
      <div class="col-md-4">
        <h2 class="fs-18 fw-200">
          Коммерческая
        </h2>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/commercy?object=office'">
            Офисы
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/commercy?object=premisessFreeAppointment'">
            Помещения свободного назначения
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/commercy?object=warehouse'">
            Склады
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/commercy?object=service'">
            Сервисы
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/commercy?object=shop'">
            Магазины
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/commercy?object=restaurant'">
            Общепиты
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/commercy?object=sport'">
            Спорткомплексы
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/commercy?object=salon'">
            Салоны
          </nuxt-link>
        </h3>
      </div>
      <div class="col-md-4">
        <h2 class="fs-18 fw-200 my-20">
          <nuxt-link :to="link + '/room'">
            Комнаты
          </nuxt-link>
        </h2>
      </div>
      <div class="col-md-4">
        <h2 class="fs-18 fw-200 my-20">
          <nuxt-link :to="link + '/house'">
            Дома
          </nuxt-link>
        </h2>
        <h2 class="fs-18 fw-200 my-20">
          <nuxt-link :to="link + '/ground'">
            Участки
          </nuxt-link>
        </h2>
      </div>
      <div class="col-md-4">
        <h2 class="fs-18 fw-200 my-20">
          Ремонт
        </h2>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/apartment?repair=cosmetic'">
            Косметический
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/apartment?repair=euro'">
            Евро
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/apartment?repair=design'">
            Дизайнерский
          </nuxt-link>
        </h3>
        <h3 class="fs-14 fw-500 my-20">
          <nuxt-link :to="link + '/apartment?repair=without'">
            Без ремонта
          </nuxt-link>
        </h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "link"]
};
</script>

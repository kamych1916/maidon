<template>
  <div class="offers-wrap">
    <div class="col-lg-12">
      <div class="row">
        <div class="col-lg-4 mt-30" @click="openDialog()">
          <nuxt-link to="/builders/partner/bustoncity">
            <div class="wrap-img h-100">
              <span class="title-img">Жилые комплексы</span>
              <img
                src="/images/maidon-newBuildings.jpg"
                style="object-fit: cover; "
                width="100%"
                height="100%"
              />
            </div>
          </nuxt-link>
        </div>
        <div class="col-lg-8 ">
          <div class="row mt-30">
            <div class="col d-flex">
              <nuxt-link to="/buy/apartment">
                <div class="wrap-img h-100">
                  <span class="title-img ">Продажа квартир</span>
                  <img
                    src="/images/maidon-buy.jpg"
                    style="object-fit: cover; "
                    width="100%"
                  />
                </div>
              </nuxt-link>
            </div>
            <div class="col d-flex">
              <nuxt-link to="/rent/apartment">
                <div class="wrap-img h-100">
                  <span class="title-img ">Аренда квартир</span>
                  <img
                    src="/images/maidon-rent.jpg"
                    style="object-fit: cover; "
                    width="100%"
                  />
                </div>
              </nuxt-link>
            </div>
          </div>
          <div class="row mt-30">
            <div class="col d-flex">
              <nuxt-link to="/buy/commercy">
                <div class="wrap-img h-100">
                  <span class="title-img ">Коммерческая</span>
                  <img
                    src="/images/maidon-office.jpg"
                    style="object-fit: cover; "
                    width="100%"
                  />
                </div>
              </nuxt-link>
            </div>
            <div class="col d-flex">
              <nuxt-link to="/rent/house">
                <div class="wrap-img h-100">
                  <span class="title-img ">Аренда домов</span>
                  <img
                    src="/images/maidon-home.jpg"
                    style="object-fit: cover; "
                    width="100%"
                  />
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="dialogVisible"
      class="dialog d-flex justify-content-center align-items-center"
      :class="[openDialog ? 'dialog-active' : '']"
    >
      <div class="card-wrap p-40" style="width:70%">
        <div class="d-flex justify-content-between">
          <div class="fs-18">
            В данный момент наш сервис не имеет сотрудничество с жилыми
            комплексами.
          </div>
          <div @click="dialogVisible = false" class="cursor">
            <i class="bi bi-x fs-18"></i>
          </div>
        </div>
        <div class="mt-30 fs-18">
          Если у Вас имеется к нам коммерческое предложение, <br />
          пожалуйста, обратитесь по почте: <a href="">admin@maidon.tj</a>
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
      dialogVisible: false
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
      document.body.style.overflow = "hidden !important";
    }
  }
};
</script>
<style lang="scss">
.offers-wrap {
  .dialog {
    background-color: transparent !important;
  }
  .backdrop {
    min-height: 100vh !important;
    background-color: rgba(000, 000, 000, 0.5) !important;
    background-image: none;
  }
}
</style>

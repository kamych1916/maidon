<template>
  <div class="services">
    <div class="row">
      <div class="col-lg-4 mb-30 ">
        <div class="card-wrap sticky">
          <Breadcrumbs />
          <el-select
            clearable
            class="deal mt-20 w-100"
            v-model="specialization"
            placeholder="специализация"
            @change="list_services()"
          >
            <el-option-group
              v-for="group in options_specialization"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-option-group>
          </el-select>
          <el-select
            clearable
            placeholder="вид услуг"
            class="deal mt-20 w-100"
            v-model="account_type"
            @change="list_services()"
          >
            <el-option
              v-for="item in options_account_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="col-lg-8" style="position-relative">
        <div
          v-for="(item, idx) in serviceData"
          :key="idx"
          class="card-wrap w-100 cursor"
          @click="$router.push('/services/' + item.id_user)"
        >
          <div class="row">
            <div class="col-lg my-10 d-none d-lg-block">
              <div>
                <div class="avatar border-rad-10" style="background:#b9d7f7">
                  <img
                    :src="item.avatar"
                    width="100"
                    height="100"
                    style="background-color: #ccc; object-fit: cover"
                    class="border-rad-10 "
                    v-if="item.avatar"
                  />
                  <i
                    class="bi bi-person-lines-fill fs-22"
                    v-else-if="item.account_type != 'entity'"
                  ></i>
                  <i v-else class="bi bi-briefcase fs-22"></i>
                </div>
              </div>
              <div class="mt-10">
                <div class="fs-12">
                  {{ item.userInfo }}
                </div>
              </div>
            </div>
            <div class="col-lg-10 my-10">
              <div>
                <div class="fs-18">
                  {{ item.offerData.name }}
                </div>
                <div class="fs-12 text-light">
                  <i class="bi bi-geo-alt"></i>
                  {{ item.offerData.city }}
                </div>
                <div class="fs-14 text-light mt-10">
                  {{ item.offerData.description }}
                </div>
                <div class="mt-20">
                  <span
                    v-for="(photo, idp) in item.offerData.listPhotos"
                    :key="idp"
                  >
                    <img
                      width="100"
                      height="100"
                      style="object-fit: cover"
                      class="border-rad-10 mt-10 mb-10 mr-10"
                      :src="photo.imgSrc"
                    />
                  </span>

                  <!-- <span style="position: relative; display: inline-block">
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
                  </span> -->
                </div>
                <div>
                  <div
                    class="mt-20 row fs-12"
                    v-for="(service, ids) in item.storeService"
                    :key="ids"
                  >
                    <div class="col-auto text-blue">
                      {{ service.kind }}
                    </div>
                    <div
                      class="col mx-0 px-0"
                      style="border-bottom: 1px dotted #ccc"
                    ></div>
                    <div class="col-auto">
                      {{ service.cost }}
                    </div>
                  </div>
                  <div class="mt-20 fs-12 text-light">
                    {{ item.storeService_sum }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="my-50 d-flex justify-content-center" v-if="pages">
            <Pagination :listPages="pages" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
export default {
  data() {
    return {
      options_specialization: [],
      options_account_type: [
        {
          value: "entity",
          label: "Юр. лица"
        },
        {
          value: "individual",
          label: "Физ. лица"
        }
      ],
      specialization: "",
      account_type: "",

      serviceData: null,
      pages: null
    };
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        window.scrollTo(0, 0);
        this.list_services();
      }
    }
  },
  mounted() {
    this.get_list_specialization();
    this.list_services();
  },
  methods: {
    list_services() {
      let page =
        Object.keys(this.$route.query).length > 0 ? this.$route.query.page : 1;
      Api.getInstance()
        .clients.list_services(this.specialization, this.account_type, page)
        .then(response => {
          console.log(response.data);
          this.serviceData = response.data.account_list;
          this.pages = response.data.pages;
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },

    get_list_specialization() {
      Api.getInstance()
        .offer.get_list_specialization()
        .then(response => {
          this.options_specialization = response.data.options;
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    }
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

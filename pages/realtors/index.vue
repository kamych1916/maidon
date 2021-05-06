<template>
  <div>
    <!-- // TODO: доделать логику с пагинацией и аватарками -->
    <div class="row" v-if="list">
      <div class="col-lg-4" sticky-container>
        <div class="card-wrap" v-sticky>
          <Breadcrumbs />
          <span class="fs-24 ">
            Найдено риелторов:
            <span class="text-blue">
              {{ list.count }}
            </span>
          </span>
        </div>
      </div>
      <div class="col-lg-8">
        <div v-for="(item, idx) in list.accounts" :key="idx">
          <div
            class="card-wrap cursor"
            @click="$router.push('/realtors/' + item.id)"
          >
            <div class="row d-flex">
              <div
                class="col-lg my-10 d-flex"
                style="display: -webkit-inline-box"
              >
                <div>
                  <div class="avatar"></div>
                </div>
                <div class="ml-10 ">
                  <div>
                    <span class="fs-18">
                      {{ item.name }}
                    </span>
                    <div class="fs-14 mt-5">
                      Объектов:
                      <span class="text-blue"> {{ item.offer_count }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg my-10">
                <el-rate
                  v-model="item.review"
                  disabled
                  show-score
                  text-color="#ff9900"
                >
                </el-rate>
                он пидар, не доверяйте ему
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row">
    </div> -->
  </div>
</template>

<script>
import Api from "~/utils/api";
export default {
  data() {
    return {
      rate: 3.5,
      list: null
    };
  },
  mounted() {
    this.get_accounts();
  },
  methods: {
    get_accounts() {
      Api.getInstance()
        .clients.get_accounts({
          type: "realtor"
        })
        .then(response => {
          // this.offerData = response.data;
          console.log(response.data);
          this.list = response.data;
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    }
  }
};
</script>

<style></style>

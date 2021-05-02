<template>
  <div v-if="checkAccess">
    <Tabs />
    <div v-if="listChats">
      <div class="row" v-if="listChats.length > 0">
        <div class="col-xl-4" v-for="(item, idx) in listChats" :key="idx">
          <div
            class="card-wrap d-flex justify-content-between"
            @click="$router.push(currentPath + '/' + item.id)"
            style="cursor: pointer"
          >
            <div class="d-flex">
              <div class="avatar">
                <el-image
                  draggable="false"
                  class="w-100 h-100 border-rad-5"
                  :src="item.image"
                  fit="cover"
                ></el-image>
              </div>
              <div class="ml-10 d-flex align-items-center">
                <div>
                  {{ item.user_name }}<br />
                  <span class="text-grey fs-12">{{ item.title }}</span>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <el-popover trigger="hover" width="183" placement="top">
                <div>
                  <p>Удалить данный чат?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      @click="delete_chat(item.id)"
                      type="danger"
                      size="mini"
                    >
                      Да
                    </el-button>
                  </div>
                </div>
                <button
                  slot="reference"
                  class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </el-popover>
            </div>
          </div>
        </div>
        <!-- <div class="dialog" :class="[dialogMessages ? 'dialog-active' : '']">

      </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Api from "~/utils/api";
import { cookiesEvents } from "~/utils/cookies";
import Tabs from "@/pages/account/components/tabs.vue";

export default {
  mixins: [cookiesEvents],
  components: {
    Tabs
  },
  data() {
    return {
      checkAccess: false,
      currentPath: this.$nuxt.$route.path,
      listChats: []
    };
  },

  mounted() {
    if (this.getCookie("session_token") && localStorage.getItem("ui")) {
      this.checkAccess = true;
      this.get_user_chats();
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    get_user_chats() {
      Api.getInstance()
        .account.get_user_chats()
        .then(response => {
          this.listChats = response.data;
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },
    delete_chat(id) {
      Api.getInstance()
        .account.delete_chat({ id_chat: id })
        .then(response => {
          let storeList = this.listChats;
          this.listChats.forEach((el, idx) => {
            if (el.id == id) {
              storeList.splice(idx, 1);
            }
          });
          this.listChats = storeList;
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    }
  }
};
</script>

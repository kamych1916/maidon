<template>
  <div v-if="checkAccess">
    <Tabs />
    <div v-if="listChats">
      <div class="row" v-if="listChats.length > 0">
        <div class="col-xl-4" v-for="(item, idx) in listChats" :key="idx">
          <div
            class="card-wrap d-flex justify-content-between cursor"
            style="position: relative"
            @click="$router.push(currentPath + '/' + item.id)"
          >
            <div class="row d-flex">
              <div class="col d-flex" style="display: -webkit-inline-box">
                <div>
                  <div
                    class="avatar"
                    :style="{
                      background: item.image ? 'none' : '#b9d7f7'
                    }"
                    v-if="!isModer"
                  >
                    <el-image
                      v-if="item.user_name != 'Модератор'"
                      draggable="false"
                      class="w-100 h-100 border-rad-5"
                      :src="item.image"
                      fit="cover"
                    ></el-image>
                    <div v-else>
                      <i class="bi bi-gear fs-22"></i>
                    </div>
                  </div>
                </div>

                <div class="ml-10 ">
                  <div>
                    <span style="word-break: break-all;">
                      <span v-if="item.user_name === 'Модератор'">{{
                        item.user_name
                      }}</span>
                      <span v-else>
                        {{ item.user_name.split(" ")[0] }}<br />
                        {{ item.user_name.split(" ")[1] }}
                      </span>

                      <el-tooltip
                        v-if="item.unread"
                        class="item"
                        effect="dark"
                        placement="top-start"
                      >
                        <div slot="content">
                          У вас имеются непрочитанные сообщения
                        </div>
                        <span class="text-blue ">
                          <i class="bi bi-chat-dots-fill fs-12 ml-8"></i>
                        </span>
                      </el-tooltip>
                    </span>
                    <br />
                    <span class="text-grey fs-12">{{ item.title }}</span
                    ><br />
                  </div>
                </div>
              </div>
              <div
                v-if="item.user_name != 'Модератор'"
                style="position: absolute; top: 40px;right: 20px"
              >
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
        </div>
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
      listChats: [],
      isModer: null
    };
  },

  mounted() {
    if (this.getCookie("session_token") && localStorage.getItem("ui")) {
      this.isModer = JSON.parse(localStorage.getItem("ui")).is_moder;
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

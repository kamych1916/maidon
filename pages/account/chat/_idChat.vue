<template>
  <div class="main-wrap" v-if="checkAccess">
    <!-- <Tabs /> -->
    <div class="d-flex flex-column h-100" v-if="offerData">
      <div
        class="card-wrap px-20 py-16 d-flex justify-content-between"
        style="position: relative"
      >
        <div class="row d-flex">
          <div class="col ml-16 d-flex" style="display: -webkit-inline-box">
            <div>
              <div
                class="avatar"
                v-if="!isModer"
                :style="{
                  background: offerData.image ? 'none' : '#b9d7f7'
                }"
              >
                <el-image
                  v-if="offerData.user_name != 'Модератор'"
                  draggable="false"
                  class="w-100 h-100 border-rad-5"
                  :src="offerData.image"
                  fit="cover"
                ></el-image>
                <div v-else>
                  <i class="bi bi-gear fs-22"></i>
                </div>
              </div>
            </div>

            <div class="ml-10 ">
              <div>
                <span v-if="offerData.user_name === 'Модератор'">{{
                  offerData.user_name
                }}</span>
                <span v-else>
                  {{ offerData.user_name.split(" ")[0] }}<br />
                  {{ offerData.user_name.split(" ")[1] }}
                </span>
                <br />
                <span class="text-grey fs-12">{{ offerData.title }}</span
                ><br />
              </div>
            </div>
          </div>
          <div style="position: absolute; top: 28px;right: 20px">
            <div
              @click="closeChat(), $router.back()"
              class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
            >
              выйти
            </div>
          </div>
        </div>
      </div>
      <div class="card-wrap mb-0 h-100">
        <div class="d-flex flex-column h-100">
          <div ref="messageWrap" class="h-100 messages-wrap px-5 py-20">
            <div v-for="(el, idx) in messages" :key="idx">
              <div
                v-if="el.user == 'remote'"
                class="message-container msg-remote py-10"
              >
                <div class="msg-box d-flex flex-column">
                  <div v-html="el.text.replace(/\n/g, '<br />')"></div>
                  <div class="fs-12 mt-5">
                    {{ el.date }}
                  </div>
                </div>
              </div>
              <div
                v-if="el.user == 'self'"
                class="message-container msg-self py-10"
              >
                <div class="msg-box d-flex flex-column">
                  <div v-html="el.text.replace(/\n/g, '<br />')"></div>
                  <div class="fs-12 mt-5">
                    {{ el.date }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-20 ">
            <div class="d-flex row">
              <div class="col-lg-10 col-9">
                <el-input
                  placeholder="Напишите сообщение..."
                  type="textarea"
                  maxlength="200"
                  :autosize="{ minRows: 2, maxRows: 3 }"
                  @keyup.enter="senMessage"
                  v-model="message"
                ></el-input>
              </div>
              <div class="col-lg-2 col-3 w-100">
                <div class="d-flex justify-content-center w-100 h-100 ">
                  <button
                    @click="senMessage"
                    style="border-radius: 30px;"
                    class="d-flex justify-content-center align-items-center w-100 h-100 el-button el-button--primary w-100 is-round fs-14 px-20 mx-5 "
                  >
                    <i class="bi bi-arrow-up-circle"></i>
                    <div class="d-none d-sm-block">
                      &nbsp; Отправить
                    </div>
                  </button>
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
import Api from "~/utils/api";
import Tabs from "@/pages/account/components/tabs.vue";
import { cookiesEvents } from "~/utils/cookies";
export default {
  mixins: [cookiesEvents],
  components: {
    Tabs
  },
  data() {
    return {
      checkAccess: false,
      message: null,
      offerData: null,
      messages: [],
      isModer: null
    };
  },
  watch: {
    messages: function() {
      this.$nextTick(function() {
        var container = this.$refs.messageWrap;
        container.scrollTop = container.scrollHeight + 120;
      });
    }
  },
  mounted() {
    if (this.getCookie("session_token") && localStorage.getItem("ui")) {
      this.checkAccess = true;
      this.messages.push(10);
      this.messages.splice(-1, 1);
      this.isModer = JSON.parse(localStorage.getItem("ui")).is_moder;
      this.get_messages();
    } else {
      this.$router.push("login");
    }
  },
  beforeDestroy() {
    this.closeChat();
  },
  methods: {
    closeChat() {
      this.socket.send("bdb86498-3d50-430e-b566-7a95345c7712");
      this.socket.onclose = function(event) {
        console.log("The connection has been closed successfully.");
      };
      this.socket.close();
    },
    senMessage() {
      if (this.message) {
        this.socket.send(this.message);
        this.message = "";
      }
    },
    get_messages() {
      Api.getInstance()
        .account.get_messages({ id_chat: this.$route.params.idChat })
        .then(response => {
          this.offerData = {
            title: response.data.title,
            image: response.data.image,
            user_name: response.data.user_name
          };
          this.messages = response.data.messages;
          this.connect();
        })
        .catch(error => {
          Api.typicalNTFS(error.response.status);
        });
    },
    connect() {
      let self = this;

      this.socket = new WebSocket(
        `ws://mirllex.site/ws/send_message/${this.getCookie("session_token")}/${
          this.$route.params.idChat
        }`
      );

      this.socket.onopen = function(openEvent) {
        // console.log("ws::open : connection established " + openEvent);
      };

      this.socket.onerror = function(errorEvent) {
        // console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
      };

      this.socket.onmessage = function(messageEvent) {
        var wsMsg = messageEvent.data;
        if (wsMsg.indexOf("error") > 0) {
          console.error("ws::msg_in:error: " + wsMsg.error);
        } else {
          self.messages.push(JSON.parse(wsMsg));
        }
      };
    }
  }
};
</script>
<style lang="scss">
.main-wrap {
  height: calc(100vh - 255px);
  .messages-wrap {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .message-container {
      width: 100%;
    }
    .msg-box {
      word-break: break-all;
      display: flex;
      background: #409eff;
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      max-width: 80%;
      width: auto;
      float: left;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
    }
  }
  .messages {
    flex: 1 0 auto;
  }
  .msg-self .msg-box {
    background: #475361;
    float: right;
  }

  .msg-self .msg {
    text-align: right;
  }
}
</style>

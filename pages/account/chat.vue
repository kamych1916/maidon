<template>
  <div v-if="checkAccess">
    <Tabs />
    <div class="row">
      <div class="col-xl-4" v-for="(item, idx) in [1, 2, 3, 4]" :key="idx">
        <div
          class="card-wrap d-flex justify-content-between"
          @click="openDialog()"
          style="cursor: pointer"
        >
          <div class="d-flex">
            <div class="avatar"></div>
            <div class="ml-10 d-flex align-items-center">
              <div>
                Рахимов Камол<br />
                <span class="text-grey fs-12">1 комн.квартира</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <el-popover trigger="hover" width="183" placement="top">
              <div>
                <p>Удалить данный чат?</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="danger" size="mini">
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
      <div class="dialog" :class="[dialogMessages ? 'dialog-active' : '']">
        <div class="container h-100">
          <div class="d-flex flex-column h-100">
            <div class="card-wrap mt-24 d-flex justify-content-between">
              <div class="d-flex">
                <div class="avatar"></div>
                <div class="ml-10 d-flex align-items-center">
                  <div>
                    Рахимов Камол<br />
                    <span class="text-grey fs-12">1 комн.квартира</span>
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <div
                  @click="closeDialog()"
                  class="el-button el-button--primary is-round fs-14 py-10 px-20 mx-5 my-5"
                >
                  выйти
                </div>
              </div>
            </div>
            <div class="card-wrap" style="height:70%">
              <div class="d-flex flex-column h-100">
                <div ref="messageWrap" class="messages-wrap px-10">
                  <div
                    class="message-container msg-remote py-10"
                    v-for="(el, idx) in first"
                    :key="idx"
                  >
                    <div class="msg-box">
                      {{ idx }}
                    </div>
                  </div>
                </div>
                <div class="pt-20 ">
                  <div class="d-flex">
                    <el-input type="textarea" v-model="message"></el-input>
                    <button
                      @click="senMessage"
                      style="border-radius: 30px"
                      class="el-button el-button--primary is-round fs-14 px-20 mx-5 "
                    >
                      <i class="bi bi-arrow-up-circle"></i>
                    </button>
                  </div>
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
      dialogMessages: false,
      message: null,
      first: [...Array(30)],
      second: [...Array(30)]
    };
  },
  watch: {
    first: function() {
      this.$nextTick(function() {
        var container = this.$refs.messageWrap;
        container.scrollTop = container.scrollHeight + 120;
      });
    }
  },
  mounted() {
    if (this.getCookie("session_token") && this.getCookie("ui")) {
      this.checkAccess = true;
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    alertLol() {
      console.log("lol");
    },
    senMessage() {
      this.first.push(1);
    },
    closeDialog() {
      this.dialogMessages = false;

      document.body.style.overflow = "auto";
    },
    openDialog() {
      // this.$refs.messageWrap.scrollTop = this.$refs.messageWrap.scrollHeight;
      // this.$refs.messageWrap.scrollIntoView({ behavior: "smooth" });
      // console.log(content);
      // content.scrollTop = content.scrollHeight;
      // this.$refs.messageWrap.scrollIntoView({ behavior: "smooth" });
      this.first.push(10);
      this.first.splice(-1, 1);
      this.dialogMessages = true;
      document.body.style.overflow = "hidden";
    }
  }
};
</script>

<style lang="scss">
.container {
  height: 100% !important;
}
// .messages-wrap {
//   width: 100%;
//   list-style-type: none;
//   padding: 18px;
//   bottom: 0px;
//   display: flex;
//   flex-direction: column-reverse;
//   background: white;
//   overflow-y: scroll;
// }
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
  border-radius: 6px 0 0 6px;
  background: red;
  float: right;
}

.msg-self .msg {
  text-align: right;
}
</style>

<template>
  <div class="main-block" style="postion:relative">
    <Title />
    <div class="row mt-50 mb-100 d-flex justify-content-center">
      <Offers />
    </div>
    <!-- kek

    <textarea @keypress.exact.enter="kek()" maxlength="200">kek</textarea>
    <button @click="connect">OPEN CONNECTION</button>
    <button @click="send">SEND NEW MESSAGE</button>
    <button @click="close">CLOSE CONNECTION</button> -->
  </div>
</template>

<script>
import Title from "~/pages/index-components/Title";
import Offers from "~/pages/index-components/Offers";
export default {
  components: {
    Title,
    Offers
  },
  data: function() {
    return {
      message: "desde el content",
      status: "disconnected"
    };
  },
  // mounted: function() {
  //   const WebSocket = require("ws");
  //   this.ws = new WebSocket("ws://mirllex.site/server/api/v1/ws/1");
  //   this.ws.onopen = function() {
  //     console.log("WS подключенно");
  //   };
  //   this.ws.onclose = function(eventclose) {
  //     console.log("соеденение закрыто причина: " + this.eventclose);
  //   };
  //   this.ws.onmessage = function(msg) {
  //     console.log("Сообщение " + this.msg);
  //   };
  // },
  // beforeDestroy() {
  //   this.close();
  // },

  methods: {
    kek() {
      console.log("kek");
    },
    connect() {
      this.socket = new WebSocket(`ws://mirllex.site:8002/`);

      let vm = this;

      this.socket.onopen = function(openEvent) {
        console.log("ws::open : connection established " + vm.status);
      };

      this.socket.onerror = function(errorEvent) {
        console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
      };

      this.socket.onmessage = function(messageEvent) {
        var wsMsg = messageEvent.data;
        if (wsMsg.indexOf("error") > 0) {
          console.error("ws::msg_in:error: " + wsMsg.error);
        } else {
          console.info("ws::msg_in: " + wsMsg);
        }
      };
    },
    send() {
      this.socket.send("Hello From Client2!");
    },
    close() {
      this.socket.send("CLOSE CONNECTION FROM CLIENT KAMOL");
      this.socket.onclose = function(event) {
        console.log("The connection has been closed successfully.");
      };
      this.socket.close();
    }
  }
  // methods: {
  //   message() {
  //     this.$socket.emit("createMessage", {
  //       text: "FROM CLIENT"
  //     });
  //   }
  // }
};
</script>

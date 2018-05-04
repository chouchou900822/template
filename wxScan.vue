<template>
  <div id="app">
    <div v-if="!userid && !code" id="qrcode"></div>
    <div v-else>userid:{{userid}}</div>
  </div>
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
export default {
  data() {
    return {
      userid: "",
      code: ""
    };
  },
  name: "app",
  components: {
    HelloWorld
  },
  async mounted() {
    window.WwLogin({
      id: "qrcode",
      appid: process.env.VUE_APP_corpId,
      agentid: process.env.VUE_APP_agentId,
      redirect_uri: process.env.VUE_APP_scanUri
    });
    let code = this.getUrlArgStr("code");
    this.code = code;
    if (code) {
      let res = await axios.get(
        `${process.env.VUE_APP_host}/api/funenc/wx/scan-get-user-info?userid=${
          process.env.VUE_APP_userid
        }&appName=${process.env.VUE_APP_appName}&code=${code}`
      );
      this.userid = res.data.user.UserId;
    }
  },
  methods: {
    getUrlArgStr(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#qrcode {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
}
</style>
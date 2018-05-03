<template>
  <div id="app">
    <div v-if="!nick" id="qrcode"></div>
    <div v-else>nick:{{nick}}</div>
  </div>
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
export default {
  data() {
    return {
      nick: ""
    };
  },
  name: "app",
  components: {
    HelloWorld
  },
  async mounted() {
    let url = encodeURIComponent(
      `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${
        process.env.VUE_APP_appId
      }&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${
        process.env.VUE_APP_scanUri
      }`
    );
    DDLogin({
      id: "qrcode",
      goto: url,
      style: "border:none;background-color:#FFFFFF;",
      width: "365",
      height: "400"
    });
    if (typeof window.addEventListener != "undefined") {
      window.addEventListener("message", this.hanndleMessage, false);
    } else if (typeof window.attachEvent != "undefined") {
      window.attachEvent("onmessage", this.hanndleMessage);
    }
    var code = this.getUrlArgStr("code");
    if (code) {
      let res = await axios.get(
        `${process.env.VUE_APP_host}/api/funenc/dd/scan-get-user-info?userid=${
          process.env.VUE_APP_userid
        }&appName=${process.env.VUE_APP_appName}&code=${code}`
      );
      this.nick = res.data.user.user_info.nick;
    }
  },
  methods: {
    getUrlArgStr(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    hanndleMessage(event) {
      let origin = event.origin;
      if (origin == "https://login.dingtalk.com") {
        //判断是否来自ddLogin扫码事件。
        let loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
        location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${
          process.env.VUE_APP_appId
        }&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${
          process.env.VUE_APP_scanUri
        }&loginTmpCode=${loginTmpCode}`;
      }
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
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld :msg="msg" />
  </div>
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
export default {
  data() {
    return {
      msg: ""
    };
  },
  name: "app",
  components: {
    HelloWorld
  },
  async mounted() {
    let code = this.getUrlArgStr("code");
    if (code) {
      let res = await axios.get(
        `${process.env.VUE_APP_host}/api/funenc/wx/get-user-info?userid=${
          process.env.VUE_APP_userid
        }&appName=${process.env.VUE_APP_appName}&code=${code}`
      );
      this.msg = `${res.data.user.name}欢迎你`;
    } else {
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        process.env.VUE_APP_corpId
      }&redirect_uri=${
        process.env.VUE_APP_redirectUri
      }&response_type=code&scope=snsapi_userinfo&agentid=${
        process.env.VUE_APP_agentId
      }&state=STATE#wechat_redirect`;
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
</style>
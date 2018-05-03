<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld msg="钉钉网页登录" />
  </div>
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
export default {
  data() {
    return {};
  },
  name: "app",
  components: {
    HelloWorld
  },
  async mounted() {
    dd.ready(async function() {
      dd.runtime.permission.requestAuthCode({
        corpId: process.env.VUE_APP_corpId,
        onSuccess: async function(result) {
          var url = `${
            process.env.VUE_APP_host
          }/api/funenc/dd/get-user-info?userid=${
            process.env.VUE_APP_userid
          }&appName=${process.env.VUE_APP_appName}&code=${result.code}`;
          let res = await axios.get(url);
          console.log(res.data.user);
        },
        onFail: function(err) {
          console.log(err);
        }
      });
    });
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
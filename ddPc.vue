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
      msg: "钉钉移动端免登"
    };
  },
  name: "app",
  components: {
    HelloWorld
  },
  async mounted() {
    let device = this.pcOrMobile();
    let dingding = dd;
    if (device == "DingTalkPC") {
      dingding = DingTalkPC;
      this.msg = "钉钉PC端免登";
    }
    let configJson = await axios.get(
      `${process.env.VUE_APP_host}/api/funenc/dd/sign?userid=${
        process.env.VUE_APP_userid
      }&appName=${process.env.VUE_APP_appName}`
    );
    let config = configJson.data.config;
    dingding.config({
      agentId: config.agentId,
      corpId: config.corpId,
      timeStamp: config.timeStamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: ["runtime.permission.requestAuthCode"]
    });
    dingding.error(function(error) {
      console.log(error);
    });
    dingding.ready(async function() {
      dingding.runtime.permission.requestAuthCode({
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
  },
  methods: {
    pcOrMobile() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (
        bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM
      ) {
        return "dd";
      } else {
        return "DingTalkPC";
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
</style>
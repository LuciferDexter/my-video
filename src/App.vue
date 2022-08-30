<template>
  <HelloWorld :msg="resmsg" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
var phone =
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
var electron = /(Electron)/i;
export default {
  name: "App",
  data() {
    return {
      show: true,
      resmsg: "Test System",
    };
  },
  components: {
    HelloWorld,
  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  max-width: 100%;
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
</style>

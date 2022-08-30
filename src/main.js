import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import $ from "jquery";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { Search, Setting, VideoPlay } from "@element-plus/icons-vue";
const axios = require("axios");

var Emitter = require("tiny-emitter");
var emitter = new Emitter();

const app = createApp(App);
app.use(store);
app.use(ElementPlus);
app.component("Search", Search);
app.component("Setting", Setting);
app.component("VideoPlay", VideoPlay);
app.config.globalProperties.$bus = emitter; // 自定义添加
app.config.globalProperties.$axios = axios; // 自定义添加
app.mount("#app");

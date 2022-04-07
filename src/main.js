import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import ElementPlus from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import 'element-plus/dist/index.css'

const app = createApp(App)
window.jQuery = window.$ = $;
app.use(ElementPlus, {locale: zhTw}).use(store).use(router).use(VueAxios, axios).mount("#app");

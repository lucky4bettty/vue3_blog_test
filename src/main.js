import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import axios from 'axios'
import axios from '@/js//api/axiosUtil.js' // 請求API(+攔截器)
import VueAxios from 'vue-axios'
import $ from 'jquery';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import installElementPlus from './plugins/element'
import directiveAll from './plugins/directiveAll';
import ShowDialog from '@/js/utils/BindingElement'
import 'default-passive-events' 



window.jQuery = window.$ = $;
const app = createApp(App)
installElementPlus(app)
directiveAll(app) // 全局註冊directive
app.use(store).use(router).use(VueAxios, axios).use(ShowDialog).mount("#app");

import "@/style/vue-common.scss";

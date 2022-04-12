import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
// import ElementPlus from 'element-plus'
// import zhTw from 'element-plus/es/locale/lang/zh-tw'
// import 'element-plus/dist/index.css'
import installElementPlus from './plugins/element'
import ShowDialog from '@/js/utils/BindingElement'


window.jQuery = window.$ = $;
const app = createApp(App)
installElementPlus(app)
app.use(ShowDialog).use(store).use(router).use(VueAxios, axios).mount("#app");

import "@/style/vue-common.scss";

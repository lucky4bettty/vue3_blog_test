import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App)
window.jQuery = window.$ = $;
app.use(store).use(router).use(VueAxios, axios).mount("#app");

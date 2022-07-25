import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/user/Home.vue";
import store from "@/store/index.js";
import {needLoginPage} from '@/js/utils/commonData';

const routes = [
  {
    path: "/:type?/:title?",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/user/Login.vue"),
  },
  {
    path: "/sign",
    name: "Sign",
    component: () =>
      import("@/views/user/Sign.vue"),
  },
  {
    path: "/member/information",
    name: "Information",
    component: () =>
      import("@/views/member/Information.vue"),
  },
  {
    path: "/member/informationedit",
    name: "InformationEdit",
    component: () =>
      import("@/views/member/InformationEdit.vue"),
  },
  {
    path: "/member/myarticle",
    name: "myArticle",
    component: () =>
      import("@/views/member/MyArticle.vue"),
  },
  {
    path: "/member/newArticle/:id?/",
    name: "NewArticle",
    component: () =>
      import("@/views/member/NewArticle.vue"),
  },
  {
    path: "/member/articleview/:id?/",
    name: "Articleview",
    component: () =>
      import("@/views/widget/ArticleView.vue"),
  },
  {
    path: "/nologin",
    name: "NoLogin",
    component: () =>
      import("@/views/user/NoLogin.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes,
});

//判斷是否驗證
router.beforeEach((to, from, next) => {

  store.dispatch("nowRoute/switchPage" , to) // 存url進store

  var needLoginPage_isPass = needLoginPage.some(function(item, index, array){
    return (to.fullPath).includes(item);
  })

  if(needLoginPage_isPass && !store.getters["login/getUserIsLogin"]){ 
    console.log('要登入才能進去')
    store.dispatch("login/get_sessiontoken_relogin")
    if(!store.getters["login/getUserIsLogin"]){
      next({ name: 'NoLogin' });
    }else{
      next();
    }
  }else{
    next();
  }


})

export default router;

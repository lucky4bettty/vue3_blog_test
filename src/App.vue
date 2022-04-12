<template>


  <div>
    <!-- logo+個人資料連結 -->
    <div class="logo_all d-flex justify-content-between">

      <div class="">
        <router-link to="/">
        我是ＬＯＧＯ
          <!-- <img class="logo"
          src="@/images/logo.jpeg"/> -->
        </router-link>

      </div>

      
      <div class="d-flex align-items-end">
        Hi , ＯＯＯ
      </div>

    </div>

    <!-- 選擇類別列 - user瀏覽  -->
    <div class="navbar">
      
      <!-- 左邊分類 -->
      <ul class="navbar_left d-flex">
        <li class="activeNav">主題一</li>
        <li>主題二</li>
      </ul>
      <!-- 右邊登入 + 查詢 -->
      <div class="navbar_right">
        <img @click="searchShow" src="@/images/icon-search.svg" />
        <span>
          <router-link to="/login">登入 / 註冊</router-link>
        </span>
      </div>

    </div>

    <!-- 選擇類別列 - member登入 未完成  -->
    <div class="navbar">
      
      <!-- 左邊分類 -->
      <ul class="navbar_left d-flex">
        
        <li class="activeNav"><router-link to="/information">個人資料</router-link> </li>
        <li><router-link to="/myarticle">我的文章</router-link></li>
        <li><router-link to="/articleview">文章瀏覽</router-link></li>
        
      </ul>

    </div>


  </div>
  <router-view />
</template>

<script>
// 文字編輯器 ： https://juejin.cn/post/7012073370023886856
import { ref, defineComponent, onMounted,watch,inject,reactive} from "vue";
import Vue3Tinymce from '@jsdawn/vue3-tinymce';

export default {
  name: "NewArticle",
  components: {
    Vue3Tinymce
  },
  setup(props, {emit}) {

    
    onMounted(() => {

    });



    const title = ref('');

    // 查詢- show
    const searchShow = ()=>{

    }
    
    const searchBtn = () =>{
      console.log(state.content)
    }



    return {
      searchBtn,
      searchShow

    };
  },
};

</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>


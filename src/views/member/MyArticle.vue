<template>

<div class="member">
  <div class="addBtn">
    <el-button type="primary"><router-link to="/member/newArticle">發表新文章</router-link></el-button>
  </div>


  <div class="article_all">
    <OneData v-for="item in showData" :key="item.id" 
      :onedata="item"
      :canedit="true"
    />
  </div>
</div>




</template>
<script>
import OneData from "@/views/widget/OneData.vue";
import { ref, defineComponent, onMounted,watch,inject} from "vue";
import {article_list_api} from "@/js/api/getData.js"
import store from "@/store/index.js";


export default {
  name: "MyArticle",
  components: {
    OneData,
  },
  setup(props, {emit}) {



    const showData = ref();

    
    onMounted(async () => {


      var req = { 
        "memberToken": store.getters["login/getUserToken"],
        "author": store.getters["login/getUserDetail"].name
      };

      let res = await article_list_api(JSON.parse(JSON.stringify(req)));

      showData.value = res.articleList ;
    });





    return {
      showData
    };
  },
};

</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/member/article.scss" scoped></style>
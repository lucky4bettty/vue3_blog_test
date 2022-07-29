<template>

  <div class="member">

  <div class="pageTitle">
    新增文章
  </div>

  
  <div class="title">
    標題：
    <el-input class="title_input" v-model="title" placeholder=""></el-input>
  </div>

  <div>
    文章類別：
    <el-select v-model="catagory" placeholder="Select">
      <el-option
        v-for="item in catagory_option"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>

  

  <Vue3Tinymce v-model="state.content" :setting="state.setting" />

  <div class="btnStyle">
    <el-button type="primary" class="" @click="add">
      新增
    </el-button>
  </div>


  </div>

</template>

<script>
// 文字編輯器 ： https://juejin.cn/post/7012073370023886856
import { ref, defineComponent, onMounted,watch,inject,reactive} from "vue";
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import { showErrDialog,showDialog } from "@/js/utils/Utils.js";
import { DialogModel } from "@/js/utils/Model.js";
import {save_article_api,article_detail_api} from "@/js/api/getData.js"
import { useRoute, useRouter } from "vue-router";
import store from "@/store/index.js";

export default {
  name: "NewArticle",
  components: {
    Vue3Tinymce
  },
  setup(props, {emit}) {
    const basicDialog = inject("basicDialog");
    const route = useRoute();
    var articleId = ref('') ; // 文章id


    const state = reactive({
      content: '<p>編輯文章</p>',
      // editor 配置项
      setting: {
        height: 400, // editor 高度
      },
    });

    const title = ref('');

    const catagory = ref('');
    const catagory_option = ref([])

    onMounted(() => {
      articleId.value = route.params.id ;
      if(articleId.value !== ''){ //  當有文章id時 , 查詢文章細節
          getArticleDetail() ;
      }
      catagory_option.value = store.state.commonData.cate;
    });

    // 新增文章 + 編輯
    const add = async() =>{
      
      var req = {
        "memberToken": store.getters["login/getUserToken"],
        "title": title.value,
        "cateId": catagory.value,
        "content":  state.content 
      }

      if(articleId.value !== ''){// 為編輯
        req.articleId = articleId.value ;
      }

      console.log('---新增ＯＲ編輯文章req---');
      console.log(req)

      let res = await save_article_api(JSON.parse(JSON.stringify(req)));

      console.log('---新增文章res---');
      console.log(res)

      if (res instanceof Error) {
        return showErrDialog(basicDialog, res.toString());
      }

      router.push('/member/myarticle')


    }

    // 取文章細節
    async function getArticleDetail (){
        var req = {
            "memberToken": store.getters["login/getUserToken"],
            "articleId": articleId.value
        } ;
        
        let res = await article_detail_api(JSON.parse(JSON.stringify(req)));

        if (res instanceof Error) {
           return showErrDialog(basicDialog, res.toString());
        }
        console.log('---文章細節---');
        console.log(res)
        catagory.value = res.article.cateId ;
        title.value = res.article.title ;
        state.content = res.article.content ;


    }



    return {
      state,
      title,
      add,
      catagory,
      catagory_option

    };
  },
};

</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style>

.pageTitle{
  font-size: 20px;
  margin-top:10px;
  margin-bottom:10px;
  
}

.title .title_input{
  margin-top: 10px;
  margin-bottom: 10px;
}

.btnStyle{
  display: flex;
  justify-content: flex-end;
  margin-top:20px;
  margin-bottom:20px;
}

.el-button{
  width:120px;
}

</style>


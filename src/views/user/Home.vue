<template>
  <div class="home">
      <div class="home_cont">
        <h2>{{title}}</h2>
        <!-- 多筆ＬＩＳＴ -->
        <div class="article_all">


        <OneData v-for="item in showData" :key="item.id" 
        :onedata="item"
         />

        </div>
        <!-- 頁數 -->
        <div class="page">
          <el-pagination
          v-model:currentPage="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="pc_dataPage"
          @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>


      </div>
  </div>
</template>


<script>
import { watch, onMounted, computed, ref, inject ,reactive } from "vue";
import store from "@/store/index.js";
import OneData from "@/views/widget/OneData.vue";
import {article_list_api} from "@/js/api/getData.js"
import { showErrDialog ,showDialog } from "@/js/utils/Utils.js";
import router from "@/router/index.js";
import { useRoute, useRouter } from "vue-router";





export default {
  name: "Home",
  components: {
    OneData,
  },
  setup() {
    const basicDialog = inject("basicDialog");
    var currentPage = ref(1)
    var pc_dataPage = ref(30)
    var pageData ; // 本頁的所有資料
    var showData = ref([]);
    var title = ref('');
    const route = useRoute();

    onMounted(() => {
      pageData= new PageData() ;
      pageData.search_condition.cate = route.params.type?route.params.type:'';
      title.value = pageData.search_condition.cate ;
      pageData.search() ;


    })

    // 切換頁數
    const handleCurrentChange = (val)=>{
      console.log('當前頁:' + val) ;
      pageData.search_condition.pageNow = val.toString() ;
      pageData.search() ;
    }

    // 目前route
    const showPage = computed(() => {
      return store.state.nowRoute.path;
    });

    // 切路由
    watch(showPage, (path) => {
      var pathlist = path.split('/');
      pathlist.shift() ;
      var nowTheme = pathlist[0] !== 'null'?pathlist[0] :'';
      var nowTitle= pathlist.length > 1 ?pathlist[1]: '';
      title.value = pathlist[0] !== 'null'?pathlist[0] :'' ;

      pageData.search_condition.cate = nowTheme;
      pageData.search_condition.title = nowTitle ;
      pageData.search_condition.pageNow = '1' ;
      currentPage.value = 1 ;

      if(store.state.nowRoute.pathName == 'Home'){ // 若路由為Home 才要重新查詢
        pageData.search() ;
      }



      

    })


    // --------------以下pageData----------------
    var PageData = function (o) {
      this.showhData=[], // 頁面show出來的資料
      this.search_condition={// 查詢條件
        'cate':'',
        // 'title':'', 
        'pageNow':'1',
        'pageSize':'20'
      }, 
      this.nowPage = 1  //目前頁數
    }


    PageData.prototype.search =async function (){
      var self = this;
      var req = self.search_condition;

      let res = await article_list_api(JSON.parse(JSON.stringify(req)));

      if (res instanceof Error) {
        return showErrDialog(basicDialog, res.toString());
      }

      showData.value = res.articleList ;

    }



    return {
      currentPage,
      pc_dataPage,
      handleCurrentChange,
      showData,
      title
      

    };
  },
};

</script>



<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/user/home.scss" scoped></style>


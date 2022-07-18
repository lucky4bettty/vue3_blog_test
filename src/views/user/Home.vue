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
    const cate = ref([]);

    onMounted(() => {
      pageData= new PageData() ;
      if(route.params.type !== ''){
        pageData.search_condition.cate = route.params.type?route.params.type:'';

      }

      pageData.search() ; 


    })

    // 分類
    const catagory = computed(() => {
      return store.state.commonData.cate;
    });

    //分類載入
    watch(catagory, (nowCate) => {
      cate.value = nowCate ;
      var getTitle= nowCate.filter(function(item, index, array){
        return item.id == pageData.search_condition.cate;
      });
      title.value = getTitle.length == 0 ?'':getTitle[0].name ;
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

      var getTitle= cate.value.filter(function(item, index, array){
        return item.id == pathlist[0]; 
      });
      title.value = getTitle.length == 0 ?'':getTitle[0].name ;

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
        // 'cate':'',
        'pageNow':'1',
        'pageSize':'20'
      }, 
      this.nowPage = 1  //目前頁數
    }


    PageData.prototype.search =async function (){
      var vm = this;
      var req = vm.search_condition;
      console.log('查詢結果req');
      console.log(req)

      let res = await article_list_api(JSON.parse(JSON.stringify(req)));

      console.log('查詢結果res');
      console.log(res)

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


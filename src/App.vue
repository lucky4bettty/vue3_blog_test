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
        <router-link to="/member/information">
          {{greetWord}}
        </router-link>
      </div>

    </div>

    <!-- 選擇類別列 - user瀏覽  -->
    <div class="navbar" v-show="!MemberNav">
      
      <!-- 左邊分類 -->
      <ul class="navbar_left d-flex">
        <li v-for="item in cate" :class="{ activeNav: navbarIsActive.includes(item.id)}" :key="item.id" @click="clickNavTheme(item.id)">{{item.name}}</li>
        <!-- <li class="activeNav" ><router-link to="/">主題一</router-link></li>
        <li><router-link to="/">主題二</router-link></li> -->
      </ul>
      <!-- 右邊登入 + 查詢 -->
      <div class="navbar_right">
        <!-- 登入 註冊 btn -->
        <div class="navbar_right action_btn">
          <div class="search_icon" :class="{ search_icon_active: showSearch }" >
            <img @click="searchShow(true)" src="@/images/icon-search.svg" />
          </div>
          <div>
            <span>
              <router-link to="/login">登入 / 註冊</router-link>
            </span>
          </div>
        </div>
        <!-- 登出 btn -->
        <div class="navbar_right action_btn" @click="lougout">
          <span>
            <div>登出</div>
          </span>
        </div>

      </div>

    </div>

    <!-- 選擇類別列 - member登入 未完成  -->
    <div class="navbar" v-show="MemberNav">
      
      <ul class="navbar_left d-flex">
        
        <li :class="{ activeNav:(showPage=='information') }"><router-link to="/member/information">個人資料</router-link> </li>
        <li :class="{ activeNav:(showPage=='myarticle') }"><router-link to="/member/myarticle">我的文章</router-link></li>
        
      </ul>

    </div>


  </div>

  <!-- 查詢框框 -->
  <!-- 遮罩 -->
  <div v-show="showSearch" class="searchBg" @click="searchShow(false)">
  </div>
  <!-- 查詢框內容 -->
  <div v-show="showSearch" class="search_dialog">

    <div class="search_input">
      <input class="now_input" v-model="search_input" placeholder="搜尋主題" />
    </div>
    
    <el-button @click="searchBtn"  class="search_btn">查詢</el-button>
      
  </div>

  <router-view />
</template>

<script>
// 文字編輯器 ： https://juejin.cn/post/7012073370023886856
import { ref, defineComponent, onMounted,watch,inject,reactive , computed} from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store/index.js";
import router from "@/router/index.js";

export default {
  name: "NewArticle",
  components: {

  },
  setup(props, {emit}) {

    onMounted(() => {
      store.dispatch("commonData/cata_get");
    });

    const cate = ref([]);
    // 分類
    const catagory = computed(() => {
      return store.state.commonData.cate;
    });

    //分類載入
    watch(catagory, (nowCate) => {
      cate.value = nowCate ;
    })

    //打招呼文字
    const greetWord = ref("") ; 
    const greetWordStore = computed(() => {
      return store.state.login.userDetail;
    });
    watch(greetWordStore, (userData) => {
      if(userData == null){
        greetWord.value = `` ;
      }else{
        greetWord.value = `Hi,${userData.name}` ;
      }
    })


    //---------查詢相關----------
    const search_input = ref(''); // 查詢條件

    // 查詢- show
    const searchShow = (isShow)=>{
      showSearch.value = isShow ;
    }
    
    // 查詢文章
    const searchBtn = () =>{
      var title = search_input.value ;
      
      router.push(`/null/${title}`); // 成功後跳轉route
    }

    // 查詢框顯示隱藏
    const showSearch = ref(false);

    const handleClose = ()=>{

    }

    //---------navbar切換相關----------
    
    // 目前route
    const showPage = computed(() => {
      console.log('目前route')
      console.log(store.state.commonData.cate);
      return store.state.nowRoute.path;
    });

    var MemberNav =ref(false)
    // 切路由
    watch(showPage, (path) => {
      console.log("本頁:" + path);
      MemberNav.value = (path.substr(1).split('/')[0] ==="member")?true:false ; // 要顯示哪個nav

      const pageIsMember = isMemberPage() ;

      if(pageIsMember){
        navbarIsActive.value = "/"
      }

      function isMemberPage(){
        if(path ==="/"){ return false }
        var isMember = true ;
        cate.value.forEach(element => {
          //debugger ;
          if(path ===`/${element.id}`){
            isMember = false ;
          }
        });

        return isMember;

      }
      

    })

    // 切換navbar主題
    const navbarIsActive = ref("/");
    const clickNavTheme = (type) =>{
      navbarIsActive.value = `/${type}` ;
      router.push(`/${type}`); // 成功後跳轉route
    }

    //到下一頁
    const nextPage = (url)=>{
        router.push(url)
    }

    // -----登出
    const lougout = () =>{

    }


    return {
      searchBtn,
      searchShow,
      search_input,
      showSearch,
      handleClose,
      cate,
      clickNavTheme,
      navbarIsActive,
      showPage,
      MemberNav,
      nextPage,
      greetWord,
      lougout

    };
  },
};

</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>

<style lang="scss">

// search 框框
.search_icon{
  height: 100%;
  width:50px;
  display:flex;
  justify-content: center;
  align-items: center;
  z-index: 120;
}

.search_icon_active{
  background-color: #747474;
}

.searchBg{
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  opacity: 0.3; 
  position: absolute;
  top: 0;
  left: 0;
  z-index:100;
}

.search_dialog{
  width: 100%;
  height: 20%;
  background: rgb(116, 116, 116);
  position: absolute;
  top: 70px;
  left: 0;
  z-index:100;
  display: flex;
  justify-content: center;
  align-items: center;

}

.search_input{
  width: 60% ;
  margin-left:10px ;
  margin-right:10px ;
  ::placeholder { /* CSS 3 標準 */
    color: white;
  }

  ::-webkit-input-placeholder { /* Chrome, Safari */
    color: white;
  }

  :-ms-input-placeholder { /* IE 10+ */
    color: white;
  }

  ::-moz-placeholder { /* Firefox 19+ */
    color: white;
    opacity: 1;
  }

  .now_input{
  border-top: 0;  // 去除未選中狀態邊框
  border-left: 0;  // 去除未選中狀態邊框
  border-right: 0;  // 去除未選中狀態邊框
  border-bottom: 1px white solid;  // 去除未選中狀態邊框
  width: 100%;
  outline: none; // 去除選中狀態邊框
  background-color: rgba(0, 0, 0, 0);// 透明背景
  color:white ;
  }
}



</style>


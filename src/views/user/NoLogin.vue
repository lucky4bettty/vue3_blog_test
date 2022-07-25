<template>
  <div class="nologin">

    <!-- 請登入 -->

      <div class="word">請先登入</div>

      <el-button @click="loginBtn"  class="login_btn" type="primary">點我登入</el-button>





    
    


  </div>
</template>

<script>
import { watch, onMounted, computed, ref, inject ,provide , reactive} from "vue";
import InputWidget from "@/views/widget/dataWidgets/InputWidget.vue";
import {widgetModule} from "@/js/module/widgetModule.js"
import router from "@/router/index.js";
import {login_api,member_info_api} from "@/js/api/getData.js"
import { showErrDialog ,showDialog } from "@/js/utils/Utils.js";
import store from "@/store/index.js";




export default {
  name: "NoLogin",
  components:{
    InputWidget
  },
  props: {
  },
    setup(props, {emit}) {
    const basicDialog = inject("basicDialog");



    onMounted(() => {

    });

    // 登入按鈕
    const loginBtn =()=>{
      router.push('/login')
    }






    return {
      loginBtn
    };
  },
};
</script>
<style lang="scss">

.nologin {

  padding:30px;
  display: flex ;
  justify-content: center ;
  align-items: center;
  flex-direction: column ;

  .word{
    font-size: 30px ;
    text-align:center ;
  }

  .login_btn{
    width: 200px;
    margin-top:30px;
  }


}

</style>
<template>
  <div class="login_sign">

    <!-- 登入 -->
    <div class="card_login">
 
        <div class="card_title">
            登入
        </div>

        <InputWidget v-for="item in field_all" :onedata="item" :key="item.fieldName"></InputWidget>


        <div class="login_btn">
            

            <el-button @click="loginBtn" type="primary">
                登入
            </el-button>
            <el-button @click="nextPage('/sign')" type="primary">
                註冊
            </el-button>    

        </div>


    </div>

  </div>
</template>

<script>
import { watch, onMounted, computed, ref, inject ,provide , reactive} from "vue";
import InputWidget from "@/views/widget/InputWidget.vue";
import {inputWidgetModule} from "@/js/module/widgetModule.js"
import router from "@/router/index.js";
import {login_api} from "@/js/api/getData.js"
import { showErrDialog ,showDialog } from "@/js/utils/Utils.js";


export default {
  name: "Login_sign",
  components:{
    InputWidget
  },
  props: {
  },
    setup(props, {emit}) {
    const basicDialog = inject("basicDialog");


    const field_all = reactive({
        account:ref(new inputWidgetModule('帳號','account')),
        password: ref(new inputWidgetModule('密碼','password')),
    })


    onMounted(() => {

    });

    provide("getVal", getVal);

    // 取值問題
    function getVal(fieldName ,val){
        console.log(`label :${fieldName}  ,data :${val}`)

        field_all[fieldName]['value'] = val ;
        field_all[fieldName]['errMsg'] = '' ;
        check(fieldName,val)

    }

    function check(fieldName,val){
        switch (fieldName) {
            case "account":
                if(val == ""){
                    field_all[fieldName]['errMsg'] = "此欄位不得為空";
                }
                break;
            case "password":
                if(val == ""){
                    field_all[fieldName]['errMsg'] = "此欄位不得為空";
                }
                break;
            default:
              console.log(`無對應規則`);
        }
    }

    //到下一頁
    const nextPage = (url)=>{
        router.push(url)
    }

    //登入
    const loginBtn = async()=>{
        
        var req = { 
            "account": field_all['account'],
            "password": field_all['password']
        } ;
        
        let res = await login_api(JSON.parse(JSON.stringify(req)));


        if (res instanceof Error) {
          return showErrDialog(basicDialog, res);
        }

        router.push('/member/information')
    }



    return {
      field_all ,
      nextPage ,
      loginBtn

    };
  },
};
</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/user/login.scss" scoped></style>


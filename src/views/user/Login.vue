<template>
  <div class="login_sign">

    <!-- 登入 -->
    <div class="card_login">
 
        <div class="card_title">
            登入
        </div>

        <InputWidget :onedata="account"></InputWidget>
        <InputWidget :onedata="password"></InputWidget>

        <div class="login_btn">
            <el-button type="primary">
                登入
            </el-button>    
        </div>


    </div>

    <!-- 註冊 -->
    <div class="card_login">

        <div class="card_title">
            註冊
        </div>

        <!-- <span>帳號：</span>
        <el-input v-model="account_login" placeholder=""></el-input>
        
        <span>密碼：</span>
        <el-input v-model="ps_login" placeholder=""></el-input> -->

        <div class="login_btn">
            <el-button type="primary">
                註冊
            </el-button>    
        </div>



    </div>

  </div>
</template>

<script>
import { watch, onMounted, computed, ref, inject ,provide} from "vue";
import InputWidget from "@/views/widget/InputWidget.vue";
import {inputWidgetModule} from "@/js/module/widgetModule.js"

export default {
  name: "Login_sign",
  components:{
    InputWidget
  },
  props: {
  },
    setup(props, {emit}) {

    // const account = new inputWidgetModule('帳號') ;
    // const password = new inputWidgetModule('密碼') ;
    var account = ref(new inputWidgetModule('帳號','account')) ;
    var password = ref(new inputWidgetModule('密碼','password')) ;
    // account.value = new inputWidgetModule('帳號','account')
    // password.value = new inputWidgetModule('密碼','password')

    onMounted(() => {

    });

    provide("getVal", getVal);

    // 取值問題
    function getVal(fieldName ,val){
        console.log(`label :${fieldName}  ,data :${val}`)

        if(fieldName == "account"){
            account.value.value = val;
            account.value.errMsg = "";
        }else{
            password.value.value = val;
            password.value.errMsg = "";
        }
        check(fieldName,val)

    }

    function check(fieldName,val){
        switch (fieldName) {
            case "account":
                if(val == ""){
                    account.value.errMsg = "此欄位不得為空";
                }
                break;
            case "password":
                if(val == ""){
                    password.value.errMsg = "此欄位不得為空";
                }
                break;
            default:
              console.log(`無對應規則`);
        }
    }









    return {
      props,
      account,
      password

    };
  },
};
</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/user/login.scss" scoped></style>


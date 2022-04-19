<template>
    <div class="sign_bg">
        <div class="sign">
        <InputWidget v-for="item in field_all" :onedata="item" :key="item.fieldName"></InputWidget>

        <div class="sign_btn">
            <el-button @click="signUp" type="primary">
                註冊
            </el-button> 
        </div>

        </div>
    </div>

</template>

<script>
import { watch, onMounted, computed, ref, inject ,provide ,reactive} from "vue";
import InputWidget from "@/views/widget/InputWidget.vue";
import {inputWidgetModule} from "@/js/module/widgetModule.js"

export default {
  name: "Sign",
  components:{
    InputWidget
  },
  props: {
  },
    setup(props, {emit}) {

    const field_all = reactive({
        name: ref(new inputWidgetModule('名稱','name')),
        account:ref(new inputWidgetModule('帳號','account')),
        password: ref(new inputWidgetModule('密碼','password')),
        password_recheck: ref(new inputWidgetModule('密碼(第二次確認)','password_recheck')),
        mail: ref(new inputWidgetModule('信箱','mail')),
        phone: ref(new inputWidgetModule('電話','phone')),
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
            case "password_recheck":
                if(val == ""){
                    field_all[fieldName]['errMsg'] = "此欄位不得為空";
                }
                break;
            case "mail":
                if(val == ""){
                    field_all[fieldName]['errMsg'] = "此欄位不得為空";
                }
                break;  
            default:
              console.log(`無對應規則`);
        }
    }

    //註冊
    const signUp = () =>{

    }



    return {
      field_all,
      signUp

    };
  },
};
</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/user/sign.scss" scoped></style>
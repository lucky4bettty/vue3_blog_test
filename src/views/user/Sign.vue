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
import InputWidget from "@/views/widget/dataWidgets/InputWidget.vue";
import {widgetModule} from "@/js/module/widgetModule.js"
import {sign_in_api} from "@/js/api/getData.js"
import router from "@/router/index.js";
import { showErrDialog ,showDialog } from "@/js/utils/Utils.js";





export default {
  name: "Sign",
  components:{
    InputWidget
  },
  props: {
  },
    setup(props, {emit}) {
    const basicDialog = inject("basicDialog");


    const field_all = reactive({
        name: ref(new widgetModule('名稱','name')),
        account:ref(new widgetModule('帳號','account')),
        password: ref(new widgetModule('密碼','password')),
        password_recheck: ref(new widgetModule('密碼(第二次確認)','password_recheck')),
        phone: ref(new widgetModule('電話','phone')),
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
                ckeck_passWord_same();
                break;
            case "password_recheck":
                if(val == ""){
                    field_all[fieldName]['errMsg'] = "此欄位不得為空";
                }
                ckeck_passWord_same();
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

    function ckeck_passWord_same(){
        if(field_all['password']['value'] !== '' && field_all['password_recheck']['value'] !==''){
            if(field_all['password']['value'] !== field_all['password_recheck']['value']){
                field_all['password_recheck']['errMsg'] = '密碼與密碼(第二次確認)需相同';
            }
        }
    }

    //註冊
    const signUp = async() =>{
        // 全部檢核
        for(var fieldName in field_all){
            check(fieldName,field_all[fieldName]['value']);
        }

        // 檢核是否通過
        var isPass = true ;
        for(var fieldName in field_all){
            if(field_all[fieldName]['errMsg'] !== ''){
                isPass = false ;
            }
        }

        if(!isPass){
            return ;
        }

        var req = {
            "account": field_all['account']['value'],
            "password": field_all['password']['value'],
        }
        
        let res = await sign_in_api(JSON.parse(JSON.stringify(req)));

        if (res instanceof Error) {
           return showErrDialog(basicDialog, res.toString());

        }

        router.push('/login')

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
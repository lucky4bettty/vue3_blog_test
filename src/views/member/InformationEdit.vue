<template>

  <div class="member">

    <div class="edit_btn">
       <el-button class="class_elbtn" @click="editBtn" type="primary">
          儲存
       </el-button>
    </div>

    <span>帳號：</span>
    <el-input v-model="field_all['account']['value']" placeholder=""></el-input>

    <!-- <span>信箱：</span>
    <el-input v-model="field_all['email']['value']" placeholder=""></el-input> -->

    <span>舊密碼：</span>
    <el-input v-model="field_all['oldPassword']['value']" placeholder=""></el-input>

    <span>新密碼：</span>
    <el-input v-model="field_all['password']['value']" placeholder=""></el-input>

    <span>介紹：</span>
    <el-input
    type="textarea"
    :rows="10"
    placeholder="请输入内容"
    v-model="field_all['introduce']['value']">
    </el-input>


  </div>

</template>

<script>
import { ref, defineComponent, onMounted,watch,inject ,reactive} from "vue";
import {member_edit_api} from "@/js/api/getData.js"
import router from "@/router/index.js";
import { showErrDialog ,showDialog } from "@/js/utils/Utils.js";
import InputWidget from "@/views/widget/dataWidgets/InputWidget.vue";
import {widgetModule} from "@/js/module/widgetModule.js";
import store from "@/store/index.js";



export default defineComponent({
  name: "Information",
  components:{
    InputWidget
  },
  setup(props, {emit}) {


    var field_all = reactive({
        account:ref(new widgetModule('帳號','account')),
        password: ref(new widgetModule('密碼','password')),
        oldPassword: ref(new widgetModule('舊密碼','oldPassword')),
        email:ref(new widgetModule('信箱','email')),
        introduce: ref(new widgetModule('介紹','introduce')),
    });
    
    onMounted(() => {
      var myUserData = store.state.login.userDetail ;
      field_all['account']['value'] = myUserData.account ;
      field_all['introduce']['value'] = myUserData.introduce ;
    });



    const editBtn = async()=>{
      var req = {
        "memberToken": "toooken",
        "account": field_all['account']['value'],
        "email":field_all['email']['value'],
        "password": field_all['password']['value'],
        "oldPassword": field_all['oldPassword']['value']
      }
        
        let res = await member_edit_api(JSON.parse(JSON.stringify(req)));


        if (res instanceof Error) {
           return showErrDialog(basicDialog, res.toString());

        }

        router.push('/member/information')

    }



    return {
      field_all,
      editBtn
    };
  },
});
</script>

<style >
  .edit_btn{
    width: 100%;
    display: flex;
    justify-content: flex-end ;
    margin-top:30px !important;
  }

  .class_elbtn{ 
    width: 100px;
  }
</style>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/member/information.scss" scoped></style>
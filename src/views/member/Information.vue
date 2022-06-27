<template>

  <div class="member">

    <div class="edit_btn">
       <el-button class="class_elbtn" @click="editBtn" type="primary">
          編輯
       </el-button>
    </div>

    <span class="cont">帳號：</span>
    {{account}}
    <!-- <span class="cont">信箱：</span>
    {{email}} -->

    <span class="cont">介紹：</span>
    {{textarea}}




  </div>

</template>

<script>
import { ref, defineComponent, onMounted,watch,inject} from "vue";
import router from "@/router/index.js";
import store from "@/store/index.js";

export default defineComponent({
  name: "Information",

  setup(props, {emit}) {
    var textarea = ref("巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉");
    var account = ref("我是帳號");
    var email = ref("aa@gmail.com");
    
    onMounted(() => {
      // console.log('取得帳號');
      // console.log(store.state.login.userDetail) ;
      var myUserData = store.state.login.userDetail ;
      textarea.value = myUserData.introduce ;
      account.value = myUserData.account ;

    });

    const editBtn = () =>{
        router.push('/member/informationedit')
    }



    return {
      textarea,
      account,
      email,
      editBtn
    };
  },
});
</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/member/information.scss" scoped></style>

<style>
.edit_btn{
  width: 100%;
  display: flex;
  justify-content: flex-end ;
  margin-top:30px;
}

.class_elbtn{ 
  width: 100px;
}

.cont{
  padding-bottom: 5px;
  border-bottom : 1px gray solid ; 
}

</style>
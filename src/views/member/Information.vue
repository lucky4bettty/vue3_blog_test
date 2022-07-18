<template>

  <div class="information">

    <div class="edit_btn">
       <el-button class="class_elbtn" @click="editBtn" type="primary">
          編輯
       </el-button>
    </div>

    <div class="img_div">
      <div class="title_img">
          <!-- <img src="@/images/my.jpeg" alt=""> -->
          <!-- 預設 -->
          <img v-if="imageUrl==''" src="@/images/my.jpeg" alt="">
          <!-- 上傳 -->
          <img v-else :src="imageUrl" alt="" class="customerImg mt-0">
      </div>
    </div>

    <span class="cont">帳號：</span>
    {{account}}

    <span class="cont">名稱：</span>
    {{name}}

    <!-- 性別 -->
    <span class="cont">性別：</span>
    <div>
      <el-radio-group v-model="gender" disabled class="ml-4 radioStyle">
        <el-radio label="1" size="large">男</el-radio>
        <el-radio label="2" size="large">女</el-radio>
      </el-radio-group>
    </div>

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
    var textarea = ref("");
    var account = ref("");
    var email = ref("");
    var gender = ref("1");
    var name = ref("")
    const imageUrl = ref('');

    
    onMounted(() => {
      var myUserData = store.state.login.userDetail ;
      textarea.value = myUserData.introduce ;
      account.value = myUserData.account ;
      gender.value = myUserData.gender ;
      name.value = myUserData.name ;

    });

    const editBtn = () =>{
        router.push('/member/informationedit')
    }



    return {
      textarea,
      account,
      email,
      gender,
      name,
      editBtn,
      imageUrl
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
/* 頭像圖 */
.information .img_div{
  width: 100%;
  display: flex;
  justify-content: center ;
}
.information .title_img{
        max-width: 200px;
        max-height: 200px;
        border-radius: 50%;
        background-color: pink;
        overflow:hidden;
}
.information .title_img img{
        width: 200px;
        height:200px;
        object-fit:fill
}

/* radio */
.information .radioStyle label{
  margin-left:10px;
}

</style>
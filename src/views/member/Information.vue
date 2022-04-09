<template>

  <div class="member">

    <span>帳號：</span>
    <el-input v-model="account" placeholder=""></el-input>

    <span>信箱：</span>
    <el-input v-model="email" placeholder=""></el-input>

    <span>介紹：</span>
    <el-input
    type="textarea"
    :rows="10"
    placeholder="请输入内容"
    v-model="textarea">
    </el-input>


  </div>

</template>

<script>
import { ref, defineComponent, onMounted,watch,inject} from "vue";

export default defineComponent({
  name: "Information",

  setup(props, {emit}) {
    var textarea = ref("");
    var account = ref("");
    var email = ref("");
    
    onMounted(() => {

    });



    return {
      textarea,
      account,
      email
    };
  },
});
</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/member/information.scss" scoped></style>
<template>

<div class="member">
  <div class="addBtn">
    <el-button type="primary"><router-link to="/newArticle">發表新文章</router-link></el-button>
  </div>


  <div class="article_all">
    <OneData  />
    <OneData  />
  </div>
</div>




</template>
<script>
import OneData from "@/views/widget/OneData.vue";
import { ref, defineComponent, onMounted,watch,inject} from "vue";

export default {
  name: "MyArticle",
  components: {
    OneData,
  },
  setup(props, {emit}) {

    
    onMounted(() => {

    });



    return {

    };
  },
};

</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/member/article.scss" scoped></style>
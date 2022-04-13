<template>

<div class="member">
  <div class="addBtn">
    <el-button type="primary"><router-link to="/newArticle">發表新文章</router-link></el-button>
  </div>


  <div class="article_all">
    <OneData v-for="item in showData" :key="item.id" 
      :onedata="item"
      :canedit="true"
    />
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

    const showData = [
        {
          title:"我是標題",
          author:"我我我",
          date:"2022/04/01",
          like:2,
          reply:1,
          id:"a1"
        },
        {
          title:"我是標題22",
          author:"ｕｕｕ",
          date:"2022/04/01",
          like:2,
          reply:1,
          id:"a2"
        },
    ]



    return {
      showData
    };
  },
};

</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/member/article.scss" scoped></style>
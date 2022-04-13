<template>
  <div class="home">
      <div class="home_cont">
        <h2>XX文章</h2>
        <!-- 多筆ＬＩＳＴ -->
        <div class="article_all">


        <OneData v-for="item in showData" :key="item.id" 
        :onedata="item"
         />

        </div>
        <!-- 頁數 -->
        <div class="page">
          <el-pagination
          v-model:currentPage="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="pc_dataPage"
          @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>


      </div>
  </div>
</template>


<script>
import { watch, onMounted, computed, ref, inject } from "vue";
import store from "@/store/index.js";
import OneData from "@/views/widget/OneData.vue";



export default {
  name: "Home",
  components: {
    OneData,
  },
  setup() {

    var currentPage = ref(1)
    var pc_dataPage = ref(30)

    onMounted(() => {



    })

    const handleCurrentChange = ()=>{

    }

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
      currentPage,
      pc_dataPage,
      handleCurrentChange,
      showData

    };
  },
};

</script>



<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/user/home.scss" scoped></style>


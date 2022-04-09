<template>
  <div class="home">
      <div class="home_cont">
        <h2>XX文章</h2>
        <!-- 多筆ＬＩＳＴ -->
        <div class="article_all">

        <OneData  />


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

    return {
      currentPage,
      pc_dataPage,
      handleCurrentChange

    };
  },
};

</script>



<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/user/home.scss" scoped></style>


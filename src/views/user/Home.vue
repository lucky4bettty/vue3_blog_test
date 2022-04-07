<template>
  <div class="home">
      <div class="home_cont">
        <h2>XX文章</h2>
        <!-- 多筆ＬＩＳＴ -->
        <div class="article_all">
          <!-- 單筆start -->
          <div class="article_one">
            <!-- 收藏 -->
            <div class="article_like">
              <div class="num">
                0
              </div>
              <div class="word">
                like
              </div>
            </div>
            <!-- 回覆 -->
            <div class="article_reply">
              <div class="num">
                0
              </div>
              <div class="word">
                回答
              </div>
            </div>
            <!-- 文章 -->
            <div class="article">
              <div class="article_title">我是標題</div>
              <!-- <div class="article_cont">
                我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容
                我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容
                我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容
              </div> -->
              <span class="article_author">作者．發布日期</span>
            </div>
          </div>
          <!-- 單筆end -->
                    <div class="article_one">
            <!-- 收藏 -->
            <div class="article_like">
              <div class="num">
                0
              </div>
              <div class="word">
                like
              </div>
            </div>
            <!-- 回覆 -->
            <div class="article_reply">
              <div class="num">
                0
              </div>
              <div class="word">
                回答
              </div>
            </div>
            <!-- 文章 -->
            <div class="article">
              <div class="article_title">我是標題</div>
              <span class="article_author">作者．發布日期</span>
            </div>
          </div>

        </div>
        <!-- 頁數 -->
        <el-button class="el-button--base datePickBtn" plain round >本月</el-button>

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
</template>


<script>
import { watch, onMounted, computed, ref, inject } from "vue";
import store from "@/store/index.js";



export default {
  name: "Home",
  components: {},
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
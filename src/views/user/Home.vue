<template>
  <div class="home">
      <div class="article_all">
        <h2>XX文章</h2>
        <!-- 多筆ＬＩＳＴ -->
        <div>
          <!-- 單筆start -->
          <div class="article">
            <div>我是標題</div>
            <div>我是內容</div>
            <span>作者</span> . <span>發布日期</span>
          </div>
          <!-- 單筆end -->

        </div>
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


    return {

    };
  },
};

</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/user/home.scss" scoped></style>
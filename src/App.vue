<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->

  <div>
    <!-- logo+個人資料連結 -->
    <div class="d-flex justify-content-between">

      <div class="">
        <router-link to="/">
        我是ＬＯＧＯ
          <!-- <img class="logo"
          src="@/images/logo.jpeg"/> -->
        </router-link>

      </div>

      
      <div class="d-flex align-items-end">
        Hi , ＯＯＯ
      </div>

    </div>

    <!-- 選擇類別列 - user瀏覽  -->
    <div class="navbar">
      
      <!-- 左邊分類 -->
      <ul class="navbar_left d-flex">
        <li>主題一</li>
        <li>主題二</li>
      </ul>
      <!-- 右邊登入 + 查詢 -->
      <div class="navbar_right">
        <img src="@/images/icon-search.svg" />
        <span>
          <router-link to="/about">登入 / 註冊</router-link>
        </span>
      </div>

    </div>

    <!-- 選擇類別列 - member登入 未完成  -->
    <div>

    </div>


  </div>
  <router-view />
</template>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>

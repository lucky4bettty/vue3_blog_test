<template>
  <div class="login_sign">

    <!-- 登入 -->
    <div class="card_login">
 
        <div class="card_title">
            登入
        </div>

        <span class="account">帳號：</span>
        <el-input v-model="account_login" placeholder=""></el-input>
        
        <span class="password">密碼：</span>
        <el-input v-model="ps_login" placeholder=""></el-input>

        <div class="login_btn">
            <el-button type="primary">
                登入
            </el-button>    
        </div>


    </div>

    <!-- 註冊 -->
    <div class="card_login">

        <div class="card_title">
            註冊
        </div>

        <span>帳號：</span>
        <el-input v-model="account_login" placeholder=""></el-input>
        
        <span>密碼：</span>
        <el-input v-model="ps_login" placeholder=""></el-input>

        <div class="login_btn">
            <el-button type="primary">
                註冊
            </el-button>    
        </div>



    </div>

  </div>
</template>

<script>

</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/user/login.scss" scoped></style>


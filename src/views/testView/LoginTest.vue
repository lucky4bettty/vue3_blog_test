<template>
  <div>

    <div>------ 數數 -----</div> 
      <button data-test="button" @click="increment">Increment</button>
      <p data-test="count">{{count}}</p>

    <div>------ 登入 ------</div> 

    
      <!-- 帳號 -->
      帳號： <input id="account" type="text" v-model="account">
      <div class="errWord" id="account_err" v-show="account_err !== ''">{{account_err}}</div>
      <div>
        <button id="login_btn" @click = "login">登入</button>
      </div>
  </div>
</template>
  
  <script>
  import { ref } from "vue";

  
  
  export default {
    name: "LoginTest",
    components:{
    },
    props: {
    },
    setup(props, {emit}) {
      const count = ref(0)
      const increment = () => {
        count.value += 1
      }

      const account = ref("");
      const account_err = ref("");

      const login = () =>{
        account_err.value = "" ;
        if(account.value === ""){
          account_err.value = "此欄位不得為空"
        }

      }


      return {
        count,
        increment,
        account,
        account_err,
        login
      }
    },
  };
  </script>

  <style>
    .errWord{
      color: red;
    }
  </style>
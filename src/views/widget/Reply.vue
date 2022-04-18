<template>
    <div class="myreply">
        <div class="title_img">
            <img v-show="!props.onedata.imgbase64"  src="@/images/my.jpeg" alt="">
        </div>

        <div class="reply_input">
            <el-input v-model="myReply" type="textarea" placeholder="" :row="3"></el-input>
        </div>
            
        <el-button class="reply_submit" type="primary" @click="replySubmit">送出</el-button>

    </div>
</template>

<script>
import { watch, onMounted, computed, ref, inject } from "vue";

export default {
  name: "Reply",
  props: {
    onedata:{
      type:Object,
      default:{
          imgbase64:{
              type:String,
              default:""
          }
      }
    },



  },
    setup(props, {emit}) {

    onMounted(() => {

    console.log(props)
    console.log(props.onedata.imgbase64)
    if(props.onedata.imgbase64){
        const buffer = Buffer.from(props.onedata.imgbase64, 'base64');
        const blob = new Blob([buffer], {
            type: "image/jpeg"
        });
        const img = URL.createObjectURL(blob);
            imageUrl.value = img;
    }

    
    });

    const myReply = ref('');  //  回覆內容
    const imageUrl = ref(''); //  圖片

    const replySubmit = () =>{
        console.log('送出')
        console.log(myReply.value)
    }








    return {
      props,
      myReply,
      replySubmit


    };
  },
};
</script>

<style lang="scss">


    .myreply{
        padding: 10px;
        background-color: #e9e9e9;
        display: flex;

    }

    .title_img{
        max-width: 30px;
        max-height: 30px;
        border-radius: 50%;
        background-color: pink;
        overflow:hidden;
    }
    
    .title_img img{
        width: 100%;
        height:100%;
        object-fit:fill
    }
    
    .reply_input{
        width:80%;
        padding-left: 10px;
        padding-right: 10px;
    }





</style>
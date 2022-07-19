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
import {reply_article_api} from "@/js/api/getData.js"
import { DialogModel } from "@/js/utils/Model.js";
import { showErrDialog, showDialog } from "@/js/utils/Utils.js";
import store from "@/store/index.js";





export default {
  name: "Reply",
  props: {
    submitType:{
       type:String,
       default:''
    },
    onedata:{
      type:Object,
      default:{
          imgbase64:{
              type:String,
              default:""
          }
      }
    },
    replydata:{
        type:Object,
        default:null
    }




  },
    setup(props, {emit}) {
    const basicDialog = inject("basicDialog");

    const myReply = ref('');  //  回覆內容
    const imageUrl = ref(''); //  圖片
    const submitReply = inject("submitReply");

    onMounted(() => {

    if(props.onedata.imgbase64){
        const buffer = Buffer.from(props.onedata.imgbase64, 'base64');
        const blob = new Blob([buffer], {
            type: "image/jpeg"
        });
        const img = URL.createObjectURL(blob);
            imageUrl.value = img;
    }

    
    });



    //回覆按下送出
    const replySubmit = async () =>{
        // console.log(myReply.value)
        if(store.getters["login/getUserToken"] == null){ // 若無登入token 需登入
            return showErrDialog(basicDialog, '請先登入才能回復');
        }

        var req ;
        if(props.submitType ==="article"){ // 要回覆的為文章
            req = {
                "memberToken": store.getters["login/getUserToken"],
                "articleId": props.onedata.id,
                "content": myReply.value,
            }
        }else{ // 要回覆的為回覆
            req = {
                "memberToken": store.getters["login/getUserToken"],
                "articleId": props.onedata.id,
                "content": myReply.value,
                "replyId":props.replydata.id
            }
        }

        let res = await reply_article_api(JSON.parse(JSON.stringify(req)));

        if (res instanceof Error) {
          return showErrDialog(basicDialog, res.toString());
        }

        let dialogModel = new DialogModel();
        dialogModel.icon = "success"
        dialogModel.title = "成功";
        dialogModel.content = `已成功回覆`;
        // dialogModel.doConfirm = ;
        // dialogModel.clickCloseIcon = logout;

        showDialog(basicDialog, dialogModel);


        submitReply(true);
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
        width: 30px;
        height:30px;
        object-fit:fill
    }
    
    .reply_input{
        width:80%;
        padding-left: 10px;
        padding-right: 10px;
    }





</style>
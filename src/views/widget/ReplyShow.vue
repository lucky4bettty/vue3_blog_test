<template>
    <div class="myreply">
        <div class="title_img">
            <img v-show="!props.onedata.imgbase64"  src="@/images/my.jpeg" alt="">
        </div>

        <div class="reply_input">
            <div  v-for="(item , index) in allReply" :key="index">
                <div class="author">{{item.name}}</div>
                {{item.content}}
            </div>

        </div>
            

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
    const myReply = ref('');  //  回覆內容
    const imageUrl = ref(''); //  圖片
    const submitReply = inject("submitReply");

    const allReply = ref([]);

    onMounted(() => {

        allReply.value = props.onedata ;

    if(props.onedata.imgbase64){
        const buffer = Buffer.from(props.onedata.imgbase64, 'base64');
        const blob = new Blob([buffer], {
            type: "image/jpeg"
        });
        const img = URL.createObjectURL(blob);
            imageUrl.value = img;
    }

    
    });

    watch(() => [props.onedata], (nowV, oldV) => {
        console.log('更新資料In ReplyShow')
        allReply.value = props.onedata ;
    }, {
      deep: true
    })












    return {
      props,
      myReply,
      allReply


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

    .author{
        margin-bottom: 10px;
    }





</style>
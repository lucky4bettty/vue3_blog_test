<template>

<div class="articleview">

<div class="member">
    <!-- 上方頁面資料 -->
    <div class="articleview_bg">    
        <div class="myData">
            作者：{{showData.author}} 
            <time class="time" v-timeFormat="showData.creatTime">{{showData.creatTime}}</time> 
        </div>

        <div class="myData">
            標題：{{showData.title}}
        </div>

        <!-- 最愛功能 無ＡＰＩ先不做 -->
        <!-- <div class="addlove">
            <div class="addloveIcon">
                                
                    <img class="like-icon" src="@/images/heart-solid-red.svg" alt="">
                    <img class="like-icon" src="@/images/heart-regular-red.svg" alt="">            

            </div>  
        </div> -->


        
        <!-- html 注入 -->
        <main class="myHtml" v-html="showData.content">

        </main>

        <!-- 回覆框框 -->
        <Reply :onedata="showData" submitType="article"></Reply>

        

    </div>





    <!-- 留言 -->
    <div class="reply_num">{{showData.replyList.length}}個回答</div>
    <article class="reply articleview_bg">
        <div class="oneReply" v-for="(item ,index) in showData.replyList" :key="index">
            <!-- 標題 -->
            <div class="title_all">
                <!-- 照片 -->
                <div class="title_img">

                    <img src="@/images/my.jpeg" alt="">

                </div>
                <!-- 名稱＋日期 -->
                <div class="title_info">
                    <div class="name">
                        {{item.name}}
                    </div>
                    <!-- <div class="date">
                        2022/04/01
                    </div> -->
                </div>

            </div>
            <!-- 內容 -->
            <div v-html="item.content">

            </div>

            <!-- 回覆框框_他人回覆 -->
            <ReplyShow :onedata="item.replyList" v-show="item.replyList.length !== 0"></ReplyShow>

            <!-- 回覆框框_我的回覆 -->
            <Reply :onedata="showData" :replydata="item" submitType="reply"></Reply>
        </div>
    </article>
    
    

</div>



</div>




</template>
<script>
import { ref, defineComponent, onMounted,watch,inject,provide,reactive} from "vue";
import { useRoute, useRouter } from "vue-router";
import Reply from "@/views/widget/Reply.vue";
import ReplyShow from "@/views/widget/ReplyShow.vue";
import {article_detail_api} from "@/js/api/getData.js"
import { showErrDialog ,showDialog } from "@/js/utils/Utils.js";
import store from "@/store/index.js";


export default {
  name: "ArticleView",
  components: {
    Reply,
    ReplyShow
  },
  setup(props, {emit}) {
      const route = useRoute();
      const router = useRouter();
      var articleId = ref('') ; // 文章id
      var showData = ref({
        'author':'',
        'creatTime':'',
        'title':'',
        'content':'',
        'replyList':[]
      });
      var replyList = ref([]);
      const basicDialog = inject("basicDialog");

    
    onMounted(() => {
        articleId.value = route.params.id ;
        getArticleDetail() ;
        
    });

    const cont='<p><span style="color: #ba372a;">編輯文章</span></p>';
    const testreply = {
        // imgbase64:"TTT"
    }

    // 取文章細節
    async function getArticleDetail (){
        var req = {
            "memberToken": store.getters["login/getUserToken"],
            "articleId": articleId.value
        } ;
        
        let res = await article_detail_api(JSON.parse(JSON.stringify(req)));

        if (res instanceof Error) {
           return showErrDialog(basicDialog, res.toString());
        }
        console.log('---文章細節---');
        console.log(res)
        showData.value = res.article ;
        showData.value = res.article
    }
    
    // 回覆按下送出
    provide("submitReply", submitReply);

    function submitReply(data){
        console.log("－－－外面－－－")
        if(data){ // 成功傳送後 重新刷新頁面
            getArticleDetail()
        }
    }




    return {
        cont,
        testreply,
        showData,
        
        

    };
  },
};

</script>

<style lang="scss" src="@/style/articleview.scss" scoped></style>


<style>

.articleview_bg{
    background-color: white;
    padding: 10px;
    border: 1px rgb(192, 192, 192) solid;
    margin-top:10px;
}

.time{
    color:blue;
    font-size: 8px;
    margin-left: 20px;
}

.myData{
    margin-top: 10px;
}

.myHtml{
    border-top:1px gray solid ;
    margin-top: 10px;
}

.addlove{
    width:100%;
    display: flex;
    justify-content: flex-end;
}

.title_all{
    margin-top:10px;
}


/* svg 改色 參考彩度 */
/* https://codepen.io/noahblon/post/coloring-svgs-in-css-background-images */
/* 將svg統一引入另一個svg後直接改色 */
/* https://blog.csdn.net/kaimo313/article/details/107772602 */
.like-icon{
    width:30px;
  -webkit-filter: hue-rotate(240deg) saturate(100); 
  filter: hue-rotate(240deg) saturate(5); 
}

/* 底下討論區 */
.reply_num{
    margin-top : 20px;
    font-size: 20px;

}




</style>

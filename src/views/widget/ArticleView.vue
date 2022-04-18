<template>

<div class="articleview">

<div class="member">
    <!-- 上方頁面資料 -->
    <div class="articleview_bg">    
        <div class="myData">
            作者：ＯＯＯ   <span class="time">2022.04.01</span> 
        </div>

        <div class="myData">
            標題：？？？？
        </div>

        <div class="addlove">
            <div class="addloveIcon">
                                
                    <img class="like-icon" src="@/images/heart-solid-red.svg" alt="">
                    <img class="like-icon" src="@/images/heart-regular-red.svg" alt="">            

            </div>  
        </div>


        
        <!-- html 注入 -->
        <div class="myHtml" v-html="cont">

        </div>

        <!-- 回覆框框 -->
        <Reply :onedata="testreply"></Reply>

        

    </div>





    <!-- 留言 -->
    <div class="reply_num">XX個回答</div>
    <div class="reply articleview_bg">
        

        <div class="oneReply">
            <!-- 標題 -->
            <div class="title_all">
                <!-- 照片 -->
                <div class="title_img">

                    <img src="@/images/my.jpeg" alt="">

                </div>
                <!-- 名稱＋日期 -->
                <div class="title_info">
                    <div class="name">
                        小小兵
                    </div>
                    <div class="date">
                        2022/04/01

                    </div>
                </div>

            </div>
            <!-- 內容 -->
            <div v-html="cont">

            </div>

            <!-- 回覆框框 -->
            <Reply :onedata="testreply"></Reply>
        </div>

    </div>
    
    

</div>



</div>




</template>
<script>
import { ref, defineComponent, onMounted,watch,inject,provide} from "vue";
import { useRoute, useRouter } from "vue-router";
import Reply from "@/views/widget/Reply.vue"

export default {
  name: "ArticleView",
  components: {
    Reply
  },
  setup(props, {emit}) {
      const route = useRoute();
      const router = useRouter();
      var articleId ; // 文章id
    
    onMounted(() => {
        articleId = route.params.id ;
        console.log(route.params.id)
        
    });

    const cont='<p><span style="color: #ba372a;">編輯文章</span></p>';
    const testreply = {
        // imgbase64:"TTT"
    }

    // 回覆按下送出
    provide("submitReply", submitReply);
    function submitReply(data){
        console.log("－－－外面－－－")
        console.log(data)
    }




    return {
        cont,
        testreply

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

<template>

<div class="articleview">

<div class="member articleview_bg">

    <div class="myData">
        作者：ＯＯＯ   <span class="time">2022.04.01</span> 
    </div>

    <div class="myData">
        標題：？？？？
    </div>

    <div class="addlove">
        <div class="addloveIcon">
            
            <!-- <embed src="@/images/heart-solid.svg" style="display:block;width:330px;height:240px" /> -->
                

                <img class="like-icon" src="@/images/heart-solid-red.svg" alt="">
                <img class="like-icon" src="@/images/heart-regular-red.svg" alt="">

                <img src="@/images/like-svgrepo-com.svg" alt="">
            



        </div>  
    </div>


    

    <!-- html 注入 -->
    <div class="myHtml" v-html="cont">

    </div>

    <!-- 留言 -->
    
    

</div>



</div>




</template>
<script>
import { ref, defineComponent, onMounted,watch,inject} from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "ArticleView",
  components: {

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



    return {
        cont
    };
  },
};

</script>

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


</style>

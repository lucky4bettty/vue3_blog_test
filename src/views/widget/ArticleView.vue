<template>

<div class="articleview">

<div class="member">

    <div class="myData">
        作者：ＯＯＯ   <span class="time">2022.04.01</span> 
    </div>

    <div class="myData">
        標題：？？？？
    </div>

    

    <!-- html 注入 -->
    <div class="myHtml" v-html="cont">

    </div>

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


</style>

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
    <div class="myHtml">

    </div>

</div>



</div>




</template>
<script>
import { ref, defineComponent, onMounted,watch,inject} from "vue";

export default {
  name: "ArticleView",
  components: {

  },
  setup(props, {emit}) {

    
    onMounted(() => {

    });



    return {

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

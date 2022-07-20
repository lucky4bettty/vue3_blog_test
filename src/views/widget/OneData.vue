<template>
          <div class="article_one" @click="goDetail()">
            <!-- 內容 -->
            <div class="d-flex">
              <!-- 收藏 -->
              <div class="article_like">
                <div class="num">
                  {{props.onedata.likeAmount}}
                </div>
                <div class="word">
                  like
                </div>
              </div>
              <!-- 回覆 -->
              <div class="article_reply">
                <div class="num">
                  {{props.onedata.replyAmount}}
                </div>
                <div class="word">
                  回答
                </div>
              </div>
              <!-- 文章 -->
              <div class="article">
                <div class="article_title">
                  {{props.onedata.title}}
                  </div>
                <span class="article_author">
                  {{props.onedata.author}}．<span v-timeFormat="props.onedata.createTime">{{props.onedata.createTime}}</span>
                </span>
              </div>
            </div>

            <!-- 編輯 -->
            <div v-show="props.canedit" class="edit">
              編輯
            </div>
          </div>
</template>

<script>
import { watch, onMounted, computed, ref, inject } from "vue";
import router from "@/router/index.js";

export default {
  name: "OneData",
  props: {
    onedata:{
      type:Object,
      default:{
        //欄位標題
        title:{
          type:String,
          default:""
        },
        //作者
        author:{
          type:String,
          default:""
        },
        //發布日期
        createTime:{
          type:String,
          default:""
        },
        //喜愛
        likeAmount:{
          type:Number,
          default:0
        },
        //回答
        replyAmount:{
          type:Number,
          default:0
        },
        //文章id
        articleId:{
          type:String,
          default:""
        }

      }
    },
    canedit:{
      type:Boolean,
      default:false
    }


  },
    setup(props, {emit}) {

    onMounted(() => {

      
    });

    const goDetail = async ()=>{
      if(!props.canedit){
        console.log(props.onedata.articleId)
        var url = `/member/articleview/${props.onedata.articleId}`;
        router.push(url);
      }else{
        console.log('連去編輯頁')
        var url = `/member/newArticle/${props.onedata.articleId}`;
        router.push(url);
      }

    }







    return {
      props,
      goDetail


    };
  },
};
</script>

<style>

        .article_one{
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 150px;
            border-left: 1px rgb(190, 190, 190) solid ;
            border-right: 1px rgb(190, 190, 190) solid ;
            border-bottom: 1px rgb(190, 190, 190) solid ;
            background-color: rgb(255, 255, 255);
        }

        /* // 回覆＋最愛 */
        .article_like ,.article_reply{
            display: flex;
            flex-direction:column;
            justify-content:  center;
            align-items:  center ;
            width: 60px;
            height: 60px;

            margin-left: 10px;
            margin-right: 10px;
            padding: 10px;
            
        }

        .article_reply{
            border: 2px solid orange;
            color: orange;
            
        }

        /* // 以下文章 */
        .article{
            padding-left: 20px;
            padding-right: 20px;
            
            
        }
        .article_title{
            font-size: 20px;
        }

        .article_author {
            font-size: 12px;
        }

        /* 編輯 */
        .edit{
          min-height: 150px;
          min-width: 20%;
          background-color: rgb(172, 172, 172);
          color:white ;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.5s linear;
        }

        .article_one:hover .edit{
          opacity: 1;
        }

</style>


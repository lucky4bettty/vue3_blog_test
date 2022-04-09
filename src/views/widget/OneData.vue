<template>
          <div class="article_one">
            <!-- 收藏 -->
            <div class="article_like">
              <div class="num">
                0
              </div>
              <div class="word">
                like
              </div>
            </div>
            <!-- 回覆 -->
            <div class="article_reply">
              <div class="num">
                0
              </div>
              <div class="word">
                回答
              </div>
            </div>
            <!-- 文章 -->
            <div class="article">
              <div class="article_title">我是標題</div>
              <!-- <div class="article_cont">
                我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容
                我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容
                我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容
              </div> -->
              <span class="article_author">作者．發布日期</span>
            </div>
          </div>
</template>

<script>
export default {
  name: "OneData",
  props: {
    
  },
};
</script>

<style>

        .article_one{
            display: flex;
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
</style>


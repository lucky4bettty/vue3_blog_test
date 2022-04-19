<template>

  <div class="member">

  <div class="pageTitle">
    新增文章
  </div>

  
  <div class="title">
    標題：
    <el-input class="title_input" v-model="title" placeholder=""></el-input>
  </div>
  

  <Vue3Tinymce v-model="state.content" :setting="state.setting" />

  <div class="btnStyle">
    <el-button type="primary" class="" @click="add">
      新增
    </el-button>
  </div>


  </div>

</template>

<script>
// 文字編輯器 ： https://juejin.cn/post/7012073370023886856
import { ref, defineComponent, onMounted,watch,inject,reactive} from "vue";
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import { showErrDialog,showDialog } from "@/js/utils/Utils.js";
import { DialogModel } from "@/js/utils/Model.js";

export default {
  name: "NewArticle",
  components: {
    Vue3Tinymce
  },
  setup(props, {emit}) {
    const basicDialog = inject("basicDialog");
    
    onMounted(() => {

    });

    const state = reactive({
      content: '<p>編輯文章</p>',
      // editor 配置项
      setting: {
        height: 400, // editor 高度
      },
    });

    const title = ref('');

    // 新增文章
    const add = () =>{
      console.log(state.content)

        let dialogModel = new DialogModel();
        dialogModel.title = "失敗";
        dialogModel.content = `請重新登入`;
        dialogModel.doConfirm = function(){};
        dialogModel.clickCloseIcon = function(){};

        return showDialog(basicDialog, dialogModel);

      //showErrDialog(basicDialog, '我錯了');
    }



    return {
      state,
      title,
      add

    };
  },
};

</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style>

.pageTitle{
  font-size: 20px;
  margin-top:10px;
  margin-bottom:10px;
  
}

.title .title_input{
  margin-top: 10px;
  margin-bottom: 10px;
}

.btnStyle{
  display: flex;
  justify-content: flex-end;
  margin-top:20px;
  margin-bottom:20px;
}

.el-button{
  width:120px;
}

</style>


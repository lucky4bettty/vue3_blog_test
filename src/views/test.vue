<template>

    <div class="member">

        測試用
    <!-- <Vue3Tinymce v-model="state.content" :setting="state.setting" /> -->
    <Tinymce v-model:value="val" />

    <button @click="clickMe()">點我測試</button>






    </div>

</template>

<script>
// 文字編輯器 ： https://juejin.cn/post/7012073370023886856
import { ref, defineComponent, onMounted,watch,inject,reactive} from "vue";
// import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import { useRoute, useRouter } from "vue-router";
import store from "@/store/index.js";
import Tinymce from "@/views/widget/Tinymce.vue";

export default {
    name: "Test",
    components: {
        Tinymce,
    },
    setup(props, {emit}) {


        const val = ref("Welcome to Your Vue.js App");
        const isText = ref(true);

        const clickMe = () =>{
            console.log('點我帶值')
            console.log(val.value);
        }
        return {
            val,
            isText,
            clickMe
        };






    },
};

</script>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>


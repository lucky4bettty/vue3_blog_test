<template>
    <div class="InputWidget">
        <span class="account">{{props.onedata.label}}：</span>
        <el-input class="myInput" v-model="nowValue" placeholder="" @change="getValue"></el-input>
        <div class="errMsg">{{errMsg}}</div>
    </div>
</template>

<script>
import { watch, onMounted, computed, ref, inject,emit } from "vue";

export default {
  name: "InputWidget",
  props: {
      onedata:{
        type:Object,
        default:{
            label:{
                type:String,
                default:""
            },
            errMsg:{
                type:String,
                default:""
            },
            value:{
                type:String,
                default:""
            },
            fieldName:{
                type:String,
                default:"" 
            }
        }

      }

  },
    setup(props, {emit}) {

    const nowValue = ref("") ;
    const errMsg = ref("");
    const getValToForm = inject("getVal");

    onMounted(() => {
        errMsg.value=props.onedata.errMsg;
        nowValue.value = props.onedata.value
    
      
    });

    function getValue(){
        getValToForm(props.onedata.fieldName ,nowValue.value);
    }

    watch(() => [props.onedata.value, props.onedata.errMsg], (nowV, oldV) => {
        nowValue.value = nowV[0];
        errMsg.value = nowV[1];

    
    }, {
      deep: true
    })







    return {
      props,
      nowValue,
      errMsg,
      getValue,


    };
  },
};
</script>

<style lang="scss">

.errMsg{
    font-size: 12px;
    color: red;
}

.myInput{
    margin-top:10px ;
    margin-bottom: 10px;
}

</style>
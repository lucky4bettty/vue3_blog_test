<template>
  <div class="BasicDialog">
        <el-dialog v-model="showDialog" :title="title" center :before-close="handleClose">
            <div class="bodyContent">
                <!-- icon -->
                <el-row justify="center" style="margin-bottom: 6px;">
                    <i :class="'el-icon-'+icon"></i>

                    <el-icon :size="size" class="myIcon" >

                      <div class="success" v-show="icon=='success'?true:false">
                        <CircleCheckFilled  />
                      </div>
                      <div class="fail" v-show="icon=='error'?true:false">
                        <CircleCloseFilled />
                      </div>
                      <div class="warn" v-show="icon=='warning'?true:false">
                        <WarningFilled />
                      </div>
 
                    </el-icon>

                    

                </el-row>
                <!-- 內容 -->
                <div v-html="content"></div>
            </div>
            <!-- 按鈕 -->
            <template #footer v-if="haveButton">
              <div class="FBButtons">
                <!-- 取消 -->
                <el-button v-if="haveCancelBtn" round plain class='el-button--base' @click="cancel">
                    {{ cancelText }}
                </el-button>
                <!-- 確認 -->
                <el-button round class='el-button--base' @click="confirm">
                  {{ confirmText }}
                </el-button>
              </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { CircleCheckFilled,CircleCloseFilled ,WarningFilled } from '@element-plus/icons-vue'

export default defineComponent({
  name: "BasicDialog",
  components:{
    CircleCheckFilled,
    CircleCloseFilled,
    WarningFilled
  },
  props: {
    title: { type: String, default: '傳送成功' },
    content: { type: String, default: '連結傳送成功！' },
    icon: { type: String, default: 'success' }, // icon - success/warning/error
    confirmText: { type: String, default: '確認' },
    cancelText: { type: String, default: '取消' },
    dialogVisble: { type: Boolean, default: true },
    doConfirm: { type: Function, default: null },
    doCancel: { type: Function, default: null },
    remove: { type: Function, default: null },
    haveButton: { type: Boolean, default: true },
    clickCloseIcon: { type: Function, default: null }
  },
  emits: [
    'update:dialogVisble'
  ],
  setup(props, context) {

    const showDialog = ref(props.dialogVisble);
    const cancel = () => {
      showDialog.value = false;
      context.emit('update:dialogVisble', false)
      typeof props.doCancel === 'function' && props.doCancel();
      typeof props.remove === 'function' && props.remove();
    };
    
    const confirm = () => {
      showDialog.value = false;
      context.emit('update:dialogVisble', false)
      typeof props.doConfirm === 'function' && props.doConfirm();
      typeof props.remove === 'function' && props.remove();
    };

    const haveCancelBtn = typeof props.doCancel === 'function';

    const handleClose = (done) => {
      typeof props.clickCloseIcon === 'function' && props.clickCloseIcon();
      showDialog.value = false;
      context.emit('update:dialogVisble', false)
    }

    const content = props.content.replace(/\n/g, '<br>');

    return {
      confirm,
      cancel,
      showDialog,
      haveCancelBtn,
      handleClose,
      content,
    };
  }
});
</script>

<style lang="scss">
.BasicDialog {
  @media screen and (min-width: 768px) {
      .el-dialog {
        margin-left: 32px;
        margin-right: 32px;
    }
  }
}

.myIcon {
  .success svg{
    color:green
  }
  .fail svg{
    color:red
  }
  .warn svg{
    color:yellow
  }
}

</style>
<style lang="scss" src="@/style/vue-common.scss"></style>
class FieldState {
    constructor(fieldName, value, label) {
      this.fieldName = fieldName || "";
      this.value = value || "";
      this.errMsg = "";
      this.disable = false;
      this.visible = true;
      this.alertMsg = "";
      this.checkRule = [];
      this.dgobject = "";
      this.colName = "";
      this.displayValue = ""; //選取之中文
      this.displayValue2 = ""; //對應系統選單flag01
      this.menuNo = "";
      this.option = [];
      this.label = label || "";
      this.mustForIns = "";
    }

    /**
     * 必填檢核
     * value若無值，則顯示錯誤訊息
     */
    checkRequired() {
        let flag = !this.value;
        this.errMsg = flag ? '必填' : '';
        return flag;
    }
}

class DialogModel {
    constructor() {
        this.title = "傳送成功";
        this.content = "連結傳送成功！";
        this.icon = "error";
        this.confirmText = "確認"; //(右邊按鈕)
        this.cancelText = "取消"; //(左邊按鈕)
        this.dialogVisble = true;
        this.haveButton = true; //是否有彈窗按鈕
        this.doConfirm = null; //點擊確認時執行//(右邊按鈕)
        this.doCancel = null; //點擊取消時執行//(左邊按鈕)
        this.clickCloseIcon = null; //點擊closeIcon及彈窗以外遮罩畫面時執行
    }
}

export {
    FieldState,
    DialogModel,
}
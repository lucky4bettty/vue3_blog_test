
class widgetModule {
    constructor(label,fieldName) {
        /**
         *  欄位型態
         */
        this.docNo = '' ;
        /**
         * 欄位值
         */
        this.value = '';
        /**
         * 錯誤訊息
         */
        this.errMsg = '';
        /**
         *  標題
         */
        this.label = label?label:'' ;
        /**
         *  欄位名稱
         */
        this.fieldName = fieldName?fieldName:'' ;

    }
}

export{
    widgetModule
}

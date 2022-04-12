import { ElLoading } from "element-plus";
import { DialogModel } from "@/js/utils/Model.js";

const loadingView = () => {
    return ElLoading.service({
        lock: true,
        text: '加載中，請稍候...',
        background: 'rgba(0, 0, 0, 0.5)',
        customClass: 'loadingDialog'
    })
}

const showDialog = (basicDialog, options) => {
    basicDialog(options);
}

const showErrDialog = (basicDialog, msg) => {
    var dialogModel = new DialogModel();
    dialogModel.title = '失敗';
    dialogModel.content = msg;
    showDialog(basicDialog, dialogModel);
}

const base64ToImgUrl = (base64, type = 'jpeg') => {
    if(!base64) return;
    
    const buffer = Buffer.from(base64, 'base64');
    let blob;

    switch(type) {
        case 'pdf':
            blob = new Blob([buffer],{type:'application/pdf'});
            break;
        case 'jpg':
        case 'jpeg':
            blob = new Blob([buffer],{type:'image/jpeg'});
            break;
        case 'png':
            blob = new Blob([buffer],{type:'image/png'});
            break;
    }

    return URL.createObjectURL(blob);
}

export {
    loadingView,
    showDialog,
    showErrDialog,
    base64ToImgUrl,
}
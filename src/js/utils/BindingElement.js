import { createApp } from 'vue'
import BasicDialog from '@/views/widget/dialog/BasicDialog.vue';
import installElementPlus from '@/plugins/element'
 
let $inst
// 建立掛載例項
let createMount = (opts) => {
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
 
    const app = createApp(BasicDialog, {
        ...opts, dialogVisble: true,
        remove() {
            app.unmount(mountNode)
            document.body.removeChild(mountNode)
        }
    })
    installElementPlus(app);
    return app.mount(mountNode)
}
 
function ShowDialog(options = {}) {
    $inst = createMount(options)
    
    return $inst
}
 
ShowDialog.install = app => {
    app.component('basicDialog', BasicDialog)
    // app.config.globalProperties.$v3popup = V3Popup
    app.provide('basicDialog', ShowDialog)
}

export default ShowDialog;
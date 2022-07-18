import {article_cate_api} from "@/js/api/getData.js"

export default {
    namespaced: true, // !!!!一定要加
    state: {
        cate:[] ,
    },

    mutations: {
        CATA_GET(state , payload){

            state.cate=payload ;
            console.log('????')
            console.log(state.cata)
        },
    },
    actions: {
        async cata_get(context){
            console.log(this.state.commonData.cate)
            if(this.state.commonData.cate.length == 0){ // 若沒有載入分類在呼叫ＡＰＩ
                var req = {
                }
                
                let res = await article_cate_api(JSON.parse(JSON.stringify(req)));
                if (res instanceof Error) {
                   return showErrDialog(basicDialog, res.toString());
                }

                //---以下測試用---
                var cata =  [
                    {"id":"1","name":"一類"},
                    {"id":"2","name":"二類"}
                ]
                    
                context.commit('CATA_GET',cata) // 在更新狀態...錯誤訊息之類的??


            }
        },


    },


}
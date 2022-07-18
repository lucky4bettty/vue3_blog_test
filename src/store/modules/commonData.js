import {article_cate_api} from "@/js/api/getData.js"

export default {
    namespaced: true, // !!!!一定要加
    state: {
        cate:[] ,
    },

    mutations: {
        CATA_GET(state , payload){
            state.cate=payload ;
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
                    
                context.commit('CATA_GET',res.cateList) 


            }
        },


    },


}
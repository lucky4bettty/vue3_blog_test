export default {
    namespaced: true, // !!!!一定要加
    state: {
      path: '',
      pathName:''
 
    },

    mutations: {
        CHANGEVAL(state , payload){
            state.path=payload.fullPath ;
            state.pathName=payload.name ;

        }

    },
    actions: {
        switchPage(context ,nextPage){
            context.commit('CHANGEVAL',nextPage) // 在更新狀態...錯誤訊息之類的??
        }
    }
  }
export default {
    namespaced: true, // !!!!一定要加
    state: {
      path: '',
 
    },

    mutations: {
        CHANGEVAL(state , payload){
            state.path=payload ;
        }

    },
    actions: {
        switchPage(context ,nextPage){
            context.commit('CHANGEVAL',nextPage) // 在更新狀態...錯誤訊息之類的??
        }
    }
  }
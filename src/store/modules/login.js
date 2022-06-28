import {Storage}from '@/js/localStorage.js'

export default {
    namespaced: true, // !!!!一定要加
    state: {
        memberToken: '',
        userDetail:{
            "result": "0",
            "message": "執行成功",
            "account": "kl",
            "name":"林ＯＯ",
            "birthday":"1999-03-03",
            "gender":"1",
            "introduce":"大家好 我是林ＯＯ jskldjfksfmls"
        }
 
    },

    mutations: {
        CHANGEVAL_MEMBERYOKEN(state , payload){
            state.memberToken=payload ;
        },
        CHANGEVAL_USERDETAIL(state , payload){
            state.userDetail=payload ;
            sessionStorage.setItem('userDetail', payload);
        }

    },
    actions: {
        put_memberToken(context ,memberToken){
            context.commit('CHANGEVAL_MEMBERYOKEN',memberToken) // 在更新狀態...錯誤訊息之類的??
        },
        put_userdDetail(context ,data){
            context.commit('CHANGEVAL_USERDETAIL',data) // 在更新狀態...錯誤訊息之類的??
        },

    },

}
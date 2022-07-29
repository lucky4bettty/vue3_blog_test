import {Storage}from '@/js/localStorage.js'
import {member_info_api} from "@/js/api/getData.js"


export default {
    namespaced: true, // !!!!一定要加
    state: {
        memberToken: null,
        userDetail:null,
        isLogin:false,
 
    },

    mutations: {
        CHANGEVAL_MEMBERYOKEN(state , payload){
            state.memberToken=payload ;
            state.isLogin = true ;
            sessionStorage.setItem("blog_token", payload);
        },
        CHANGEVAL_USERDETAIL(state , payload){
            state.userDetail=payload ;
            console.log('個人資料')
            console.log(state.userDetail)
        }

    },
    actions: {
        put_memberToken(context ,memberToken){
            context.commit('CHANGEVAL_MEMBERYOKEN',memberToken) 
        },
        async put_userdDetail(context ,token){
            var vm = this ;

            var req_member = { 
                "memberToken": token
            } ;
            
            let res_member = await member_info_api(JSON.parse(JSON.stringify(req_member)));
    
    
            if (res_member instanceof Error) {
               return showErrDialog(basicDialog, res.toString());
            }
            context.commit('CHANGEVAL_USERDETAIL',res_member) 
        },
        get_sessiontoken_relogin(context){
            var vm = this ;
            var old_session = sessionStorage.getItem("blog_token");

            if(old_session){ //old_session
                context.commit('CHANGEVAL_MEMBERYOKEN',old_session) ;
                vm.dispatch('login/put_userdDetail',old_session)
            }
        }

    },
    getters: {
        getUserToken: (state) => {
            return state.memberToken;
        },
        getUserDetail: (state) => {
            return state.userDetail;
        },
        getUserIsLogin: (state) => {
            return state.isLogin;
        },
    }

}
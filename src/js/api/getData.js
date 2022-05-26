import { apiUtil } from "./apiUtil";

//
export const article_list_api = (data) => apiUtil('article_list', data , 'post', false);

// 登入api
export const login_api = (data) => apiUtil('login', data , 'post', false);

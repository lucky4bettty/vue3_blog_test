import { apiUtil } from "./apiUtil";


// ----------Login---------
// 登入api
export const login_api = (data) => apiUtil('login', data , 'post', false);

// ----------Member---------
//會員資料變更服務
export const member_edit_api = (data) => apiUtil('member_edit', data , 'post', false);

//取得會員資料服務
export const member_info_api = (data) => apiUtil('member_info', data , 'post', false);

// ----------Sign in---------
export const sign_in_api = (data) => apiUtil('sign_in', data , 'post', false);


// ----------Article---------
//文章內容服務
export const article_detail_api = (data) => apiUtil('article_detail', data , 'post', false);

//文章列表服務
export const article_list_api = (data) => apiUtil('article_list', data , 'post', false);

//文章儲存/編輯服務
export const save_article_api = (data) => apiUtil('save_article', data , 'post', false);

//文章回覆服務
export const reply_article_api = (data) => apiUtil('reply_article', data , 'post', false);

//文章文章類別服務
export const article_cate_api = (data) => apiUtil('article_cate', data , 'post', false);


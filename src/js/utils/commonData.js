const needTokenApi = [ // 以下為需要帶入token的ＡＰＩ
    'member_edit',
    'member_info',
    'reply_article',
    'save_article'
];

const needLoginPage = [
    '/member/information',
    '/member/informationedit',
    '/member/myarticle'
];

export {
    needTokenApi,
    needLoginPage
}
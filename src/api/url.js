const ISTEST = false;
const domain = 'https://api.wechat.hetiansu.com'; 
let URL = {
     // 首页
    newsList: '/article/timeline',
    newsDetail: '/article/show',
    addNewsFavorite: '/article/show',

    /* 用户 */
    auth: '/auth/index',
    updateUserInfo:'/user/update',

    /* 评论*/
    commentList:'/comment/timeline',
    createComment:'/comment/create',

    /*收藏 */
    addNewsFavorite:'/favorite_article/create',
    removeNewsFavorite:'/favorite_article/destroy',
}
for(let url in URL){
    URL[url] = domain+URL[url];
}
export default URL;
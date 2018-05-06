const ISTEST = false;
const domain = ISTEST ? 'https://prewww.meitu.com':'https://www.meitu.com'; //testwww.meitu.com
let URL= {
    // 首页
    newsList: '/api/news_list',
    newsDetail: '/api/news_detail',
}
for(let url in URL){
    URL[url] = domain+URL[url];
}
export default URL;

import URL from './url'
import {
    fetch,
} from '../utils';

const News = {

    /**
     * [getList 获取新闻列表]
     * @param  {[Object]} options
     * {
         date_type: 'six_month',
         page: 1,
         cout: 30,
     }
     * @return {Promise}
     */
    getList(options) {
        return new Promise((resolve, reject) => {
            fetch({
                url: URL.newsList,
                data: options,
                requiredLogin:false,
                showLoading:(options.showLoading  || false),
            }).then(data => {
                if (data.meta.code === 0) {
                    resolve(data);
                } else {
                    reject(data);
                    wx.showToast({
                        title: '新闻台被你刷爆了~',
                        icon: 'none'
                    })
                }
            }).catch(data => {
                reject(data);
            })
        })
    },

   
    /**
     * [detail 新闻详情]
     * @param  {[Number，String]} id [新闻编号]
     * @return {[Promise]}
     */
    detail(options) {
        return new Promise((resolve, reject) => {
            fetch({
                url: URL.newsDetail,
                data: options,
                requiredLogin:false,
                showLoading:(options.showLoading  || false),
            }).then(data => {
                if (data.meta.code === 0) {
                    resolve(data);
                } else {
                    reject(data);

                }
            }).catch(data => {
                wx.showToast({
                    title: '出错了，请返回重试',
                    icon: 'none',
                })
                reject(data);
            })
        })
    },

    /**
     * [addFavorite 添加收藏]
     * @param  {[Number，String]} id [新闻编号]
     * @return {[Promise]}
     */
    addFavorite(options) {
        return new Promise((resolve, reject) => {
            fetch({
                url: URL.addNewsFavorite,
                data: options,
                requiredLogin: true,
                showLoading: (options.showLoading || false),
                method:'POST',
            }).then(data => {
                if (data.meta.code === 0) {
                    resolve(data);
                } else {
                    reject(data);

                }
            }).catch(data => {
                wx.showToast({
                    title: '收藏失败，请稍后重试',
                    icon: 'none',
                })
                reject(data);
            })
        })
    },
    removeFavorite(options){
        return new Promise((resolve, reject) => {
            fetch({
                url: URL.removeNewsFavorite,
                data: options,
                requiredLogin: true,
                showLoading: (options.showLoading || false),
                method: 'POST',
            }).then(data => {
                if (data.meta.code === 0) {
                    resolve(data);
                } else {
                    reject(data);

                }
            }).catch(data => {
                
                reject(data);
            })
        })
    }
}
export default News;

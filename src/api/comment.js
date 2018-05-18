import URL from './url'
import {
    fetch,
} from '../utils';

const Comment = {

    /**
     * [getList 获取评论列表]
     * @param  {[Object]} options
     * {
          article_id,
          limit,
          after, 下一页
     }
     * @return {Promise}
     */
    getList(options) {
        return new Promise((resolve, reject) => {
            fetch({
                url: URL.commentList,
                data: options,
                requiredLogin: false,
                showLoading: (options.showLoading || false),
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
    create(options){
        return new Promise((resolve, reject) => {
            fetch({
                url: URL.createComment,
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
                reject(data);
            })
        })
    }


}
export default Comment;

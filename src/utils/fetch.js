import Account from './account'
export default function fetch(options) {
    let url = (typeof options == 'string') ? options : options.url,
        data = options.data || {},
        method = options.method || 'GET',
        dataType = options.dataType || 'json',
        responseType = options.responseType || 'text',
        requiredLogin = options.requiredLogin || false;

    return new Promise((resolve, reject) => { 
        if (Account.isLogin() || !requiredLogin) {
            _request({
                access_token: Account.getAccessToken(),
            });

        } else { 
            Account.login().then(data=>{ 
                _request({
                    access_token: data.access_token,
                });
            });
        }

        function _request(res) {
            data.appid = 'wx6a5ab4c43c50c8d8';
            if (options.showLoading) {
                wx.showLoading({
                    title: '加载中',
                })
            }
            wx.request({
                url,
                data,
                method,
                dataType,
                // responseType,
                header: {
                    'Access-Token': res.access_token ? res.access_token : '',
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) { 
                    if (res.data && res.data.meta && (res.data.meta.code == 401 || res.data.meta.code == 1001)) {
                        wx.removeStorage({
                            key: 'userInfo',
                            success() { }
                        });
                        reject(res.data);
                    } else {
                        resolve(res.data)
                    }

                },
                failure(error) {
                    wx.showToast({
                        title: '出错了，请稍后重试~',
                        icon: 'none',
                        duration: 2000
                    })
                    reject(error);
                },
                complete() {
                    wx.hideLoading();
                }
            })
        }
    });
}

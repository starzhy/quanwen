export default function fetch(options) {
    let url = (typeof options == 'string') ? options : options.url,
        data = options.data || {},
        method = options.method || 'GET',
        dataType = options.dataType || 'json',
        responseType = options.responseType || 'text',
        header = options.header || {
            'content-type': 'application/json'
        };
    data.key = '8fda3123762827b9e64174ef8aed1249';
    return new Promise((resolve, reject) => {
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
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                resolve(res.data)

            },
            failure(error) {
                wx.showToast({
                    title: '接口获取失败，请稍后重试~',
                    icon: 'none',
                    duration: 2000
                })
                reject(error);
            },
            complete() {
                wx.hideLoading();
            }
        });
    });
}

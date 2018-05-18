import URL from '@/api/url'
/*
 * localStorage:
 *      qw_accessToken
 *      qw_userInfo
 * 
 * @ Account.login().then(data=>{
 *      
 * })
*/
const Account = {
    isLogin() {
        let token = wx.getStorageSync('qw_accessToken'),
            userInfo = wx.getStorageSync('qw_userInfo');
        if (token && userInfo) {
            return true;
        } else {
            wx.clearStorageSync('qw_accessToken');
            wx.clearStorageSync('qw_userInfo');
            return false
        }
    },
    getAccessToken() {
        return wx.getStorageSync('qw_accessToken');

    },
    login() {
        let token = wx.getStorageSync('qw_accessToken');
        const that = this;
        return new Promise((resolve, reject) => {
            wx.login({
                success: function (res) {
                    if (res.code) {
                        //发起网络请求
                        wx.request({
                            url: URL.auth,
                            method: 'POST',
                            dataType: 'json',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            data: {
                                appid: 'wx6a5ab4c43c50c8d8',
                                code: res.code
                            },
                            success(res) {
                                token = res.data.response.access_token;
                                that.uid = res.data.response.uid;
                                that.token = token;
                                wx.setStorageSync('qw_accessToken', token);
                                //获取用户信息
                                let authDeny = wx.getStorageSync('qw_authDeny');
                                if (authDeny) {
                                    wx.openSetting({
                                        success: function (res) {
                                            if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                                                that._getUserInfo(that.uid, that.token).then(data => resolve(data)).catch(e => console.log('获取失败', e));
                                            }
                                        }
                                    })
                                } else {
                                    that._getUserInfo(that.uid, that.token).then(data => resolve(data)).catch(e => console.log('获取失败', e));

                                }
                            }
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            });

        })
    },
    _getUserInfo(uid, token) {
        let userInfo = wx.getStorageSync('qw_userInfo');
        const that = this;
        return new Promise((resolve, reject) => {
            if (userInfo && token) {
                resolve({
                    'access_token': token,
                    'user': userInfo,
                });
            } else {
                wx.getUserInfo({
                    withCredentials: true,
                    lang: 'zh_CN',
                    timeout: 10000,
                    success(res) {
                        //通过微信号创建圈文id
                        wx.removeStorageSync('authDeny');
                        wx.request({
                            url: URL.updateUserInfo,
                            method: 'POST',
                            dataType: 'json',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded',
                                'Access-Token': token
                            },
                            data: {
                                encryptedData: res.encryptedData,
                                iv: res.iv,
                                appid: 'wx6a5ab4c43c50c8d8',
                            },
                            success(resData) {
                                wx.setStorageSync('qw_userInfo', resData.data.response);
                                resolve({
                                    'access_token': token,
                                    'userInfo': resData.data.response,
                                });
                            }
                        })
                    },
                    fail(res) {
                        //
                        wx.setStorageSync('qw_authDeny',true);
                        reject(res);
                    }
                });
            }

        })
    }
}

export default Account;

const axios = (options) => {
    let defaultOptions = {
        url: '',
        data: {},
        method: 'GET',
        header: {
            'content-type': 'application/x-www-form-urlencoded' 
        }
    }
    options = Object.assign(defaultOptions, options)
    return new Promise((resolve, reject) => {
        if (!options.url) {
            reject()
            return
        }
        wx.request({
            url: options.url,
            method: options.method,
            data: options.data,
            header: options.header,　
            success: (res) => {
                let data = res.data
                if (data.code === 0) {
                    resolve(data)
                } else {
                    responseAction(data)
                    reject(data)
                }
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

const responseAction = (data) => {
    switch (data.code) {
        case 401: 
            // wx.reLaunch({
            //   url: '/pages/auth/auth?sign=unauth',
            // })
            clearUserInfo()
            wx.reLaunch({
                url: '/pages/home/home',
            })
        break
        case 1:
            wx.showModal({
                title: '登录超时',
                content: '重新登录？',
                confirmText: '登录',
                cancelColor: '#007AFF',
                success (res) {
                    if (res.confirm) { 
                        wx.reLaunch({
                            url: '/pages/home/home',
                        })
                    }
                }
            })
            break
        case 3:
            break
        case 3003:
            break
        default:
            console.log(data);
            wx.showToast({
                icon: 'none',
                title: data.desc ? data.desc : '系统错误，请稍后重试！',
            })
    }
}

module.exports = {
    axios
}
const weChatSDKInit = ()=>{
    return new Promise((resolve, reject) => {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx1425c0f4c2e6e3cd', // 必填，公众号的唯一标识
            timestamp: 1626664720557, // 必填，生成签名的时间戳
            nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
            signature: '12085e1191fffd0ad3a3428afbe9a80948119b28',// 必填，签名
            jsApiList: [
              'updateAppMessageShareData',
              'updateTimelineShareData',
              'chooseImage'
            ] // 必填，需要使用的JS接口列表
        });
        resolve(true);
    })
}

const weChatMessageShare = (params)=>{
    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({ 
            title: params.title || '这是标题', // 分享标题
            desc: params.desc || '这是描述', // 分享描述
            link: params.link || 'http://laibaotuanya.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: params.imgUrl || 'https://ad1.png', // 分享图标
            success: function () {
                // 设置成功
            }
        })
    }); 
}

const weChatTimelineShare = (params)=>{
    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        wx.updateTimelineShareData({ 
            title: params.title || '这是标题', // 分享标题
            desc: params.desc || '这是描述', // 分享描述
            link: params.link || 'http://laibaotuanya.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: params.imgUrl || 'https://ad1.png', // 分享图标
            success: function () {
                // 设置成功
            }
        })
    }); 
}

export {
    equalTime,
    getMonthDay,
    weChatSDKInit,
    weChatMessageShare,
    weChatTimelineShare
}
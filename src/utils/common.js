import { removeToken } from "./auth";
import { update } from '../actions/session';
import request from "../utils/request";

const weChatSDKInit = () => {
    const timestamp = new Date().getTime();
    const nonceStr = 'Wm3WZYTPz0wzccnW';
    let signature = '';
    return new Promise((resolve, reject) => {
        request({
            method: 'get',
            url: '/user/wechat/signature?timestamp=' + timestamp + '&noncestr=' + nonceStr + '&url=' + window.location.href,
        }).then((res) => {
            if (res.data.state === 'SUCCESS' && res.data.data) {
                signature = res.data.data
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx1425c0f4c2e6e3cd', // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: signature,// 必填，签名
                    jsApiList: [
                        'updateAppMessageShareData',
                        'updateTimelineShareData',
                        'chooseImage'
                    ] // 必填，需要使用的JS接口列表
                });
                resolve(true);
            } else {
                resolve(false);
            }

        }, (error) => { resolve(false) });


    })
}

const weChatMessageShare = (params) => {
    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
            title: params.title || '这是标题', // 分享标题
            desc: params.desc || '这是描述', // 分享描述
            link: params.link || 'http://laibaotuanya.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: params.imgUrl || 'https://ad1.png', // 分享图标
            success: function () {
                // 设置成功
                // alert('success')
            }
        })
    });
}

const weChatTimelineShare = (params) => {
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

const weChatLogin = (params) => {
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1425c0f4c2e6e3cd&redirect_uri=http://laibaotuanya.com/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
}

const browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') != -1, //是否web应该程序，没有头部与底部
            isWechat: u.toLowerCase().indexOf('micromessenger') > -1
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

const getUrlParam = (paramName) => {
    const url = document.location.toString();
    const arrObj = url.split("?");

    if (arrObj.length > 1) {
        const arrPara = arrObj[1].split("&");
        let arr;

        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");

            if (arr != null && arr[0] == paramName) {
                return arr[1];
            }
        }
        return "";
    }
    else {
        return "";
    }
}

const logout = (history) => {
    removeToken();
    update(null);
    window.location.replace('/');
}

const emitEvent = (name, data) => {
    const myEvent = new CustomEvent(name, data);
    window.dispatchEvent(myEvent);
}

export {
    weChatSDKInit,
    weChatMessageShare,
    weChatTimelineShare,
    weChatLogin,
    browser,
    getUrlParam,
    logout,
    emitEvent
}
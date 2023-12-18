var dsBridge = require("dsbridge");
import { Toast } from 'vant';

export function initTokenBridge() {
    return new Promise((resolve) => {
        dsBridge.call("getAppToken", "", (token) => {
            resolve(token)
        })
    })
}
export function wxShareBridge(str) {
    return new Promise((resolve) => {
        dsBridge.call("getWXShare", str, (res) => {
            resolve(res)
        })
    })
}
export function closeWebview(str) {
    setTimeout(() => {
        Toast('关闭申请- closeWebview');
    }, 1000);
    return new Promise((resolve) => {
        dsBridge.call("htmlBack", str, (res) => {
            resolve(res)
        })
    })
}

export function setStorage(obj) {
    window.localStorage.setItem(obj.name, obj.value)
}

export function getStorage(key) {
    return localStorage.getItem(key);
}

export function deleteStorage(key) {
    window.localStorage.removeItem(key);
}

/*清除所有本地信息*/
export function storageClear() {
    window.localStorage.clear();
}

/*cookie*/
export function setcookie(name, value, hours) {
    // let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = name + "=" + decodeURI(value) + ";expires=" + exp.toGMTString();
}

export function deletcookie(name, value) {
    this.setcookie(name, "", -1)
}

export function getcookie(name) {
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return (arr[2]);
    } else {
        return "";
    }
}

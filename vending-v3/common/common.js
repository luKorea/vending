import 'babel-polyfill';
// 请求方法
function ajaxFun(url, type, userToken, data) {
    return $.ajax({
        type,
        url,
        timeout: 10000,
        data,
        headers: {
            token: userToken,
            "Content-Type": "application/json",
        },
    })
}
// 请求方法
function loadAjax(url, type, userToken, data, mask, element, top) {
    return new Promise(function (resolve, reject) {
        ajaxFun(url, type, userToken, data).then(res => {
            if (mask) {
                setTimeout(_ => {
                    loadingOut();
                }, 300)
            }
            if (res.code == 200) {
                if (element) {
                    closeWindow(element, top)
                }
                resolve(res)
            } else if (res.code == 403) {
                window.location.href = "M_login.html"
            } else {
                reject(res);
            }
        }).catch(err => {
            if (mask) {
                loadingOut();
            }
            hui.iconToast('服务器请求超时', 'error');
            return;
        })
    })
};
// loading 数据处理中
function loadingWith(title) {
    hui.loading(title);
}
// 关闭loading
function loadingOut() {
    hui.loading(false, true)
}
//带图标提示
function toastTitle(title, icon) {
    hui.iconToast(title, icon)
}
// 关闭父弹窗
function closeParents(that, top) {
    $(that).parents('.maskBox').removeClass(top).parents('.maskContent').fadeOut()
}
// 弹窗
function showPopup(ele, eleChild, top) {
    $(ele).fadeIn(100).children(eleChild).addClass(top);
}
// 关闭本身
function closeWindow(that, top) {
    $(that).fadeOut().children('.maskBox').removeClass(top)
}
// 正则判断密码是否符合规定
function passRegular(that) {
    var reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,64}$/;
    var passwork = $(that).val();
    if (passwork) {
        if (!(reg.test(passwork))) {
            toastTitle('密码必须包含英文和数字以及特殊字符且不少于6位数', 'warn')
            $(that).val('')
            return false;
        }
    }
};
//   退出登录
function outLogin() {
    loadAjax('/api/user/logout', 'post', sessionStorage.token).then(res => {
        sessionStorage.token = '';
        location.replace('M_login.html');
    }).catch(err => {
        toastTitle(err.message, 'error')
    })
};

//   正则判断不能输入中文   
function ChineseREgular(that) {
    var reg = /[\u4E00-\u9FA5]/g;
    if ($(that).val()) {
        if (reg.test($(that).val())) {
            toastTitle('密码不能含有中文！', 'warn')
            $(that).val('')
            return false;
        }
    }
};
//   正则判断只能输入正整数
function wholeNum(that) {
    var num = $(that).val(),
        re = /^\d*$/;  
    if (!re.test(num)) {
        toastTitle('只能输入正整数','warn')
        $(that).val(1);
    }
}; 

export {
    loadAjax,
    loadingWith,
    loadingOut,
    toastTitle,
    showPopup,
    closeParents,
    closeWindow,
    passRegular,
    outLogin,
    wholeNum,
    ChineseREgular,
}
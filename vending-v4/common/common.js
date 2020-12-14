import 'babel-polyfill';
// 请求方法
var vApi='/api';
function ajaxFun(url, type, userToken, data) {
    return $.ajax({
        type,
        url:`/api${url}`,
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
            // if (mask) {
                loadingOut();
            // }
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
    loadAjax('/user/logout', 'post', sessionStorage.token).then(res => {
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
        toastTitle('只能输入正整数', 'warn')
        $(that).val(1);
    }
};

//获取用户权限
function permissionsFun(url, type, userToken) {
    return new Promise(function (resolve, reject) {
        ajaxFun(url, type, userToken, '', resolve, reject).then(res => {
            if (res.code == 200) {
                resolve(res)
            } else if (res.code == 403) {
                window.location.href = "M_login.html";
            } else {
                reject(res)
            }
        }).catch((err) => {
            toastTitle('服务器请求超时', 'error')
            return;
        })
    })
}
async function permissionsVal(addIndex, editIndex, delIndex, four, five) {
    var dataFlag = {
        addFlag: false,
        editFlag: false,
        delFlag: false,
        fourFlag: false,
        fiveFlag: false,
    }
    await permissionsFun('/role/findUserPermission', 'post', sessionStorage.token).then(res => {
        res.data.forEach((item, index) => {
            if (item.id == addIndex) {
                dataFlag.addFlag = true
            }
            if (item.id == editIndex) {
                dataFlag.editFlag = true
            }
            if (item.id == delIndex) {
                dataFlag.delFlag = true
            }
            if (item.id == four) {
                dataFlag.fourFlag = true
            }
            if (item.id == five) {
                fiveFlag.fourFlag = true
            }
        })
    }).catch(err => {

    });
    return dataFlag
};
// 时间戳转时间问题
function timeStamp(time) {
    // var myDate = new Date(time);
    // var y = myDate.getFullYear();
    // var m = myDate.getMonth() + 1;
    // var d = myDate.getDate();
    // var h = myDate.getHours();
    // var min = myDate.getMinutes();
    // var s = myDate.getSeconds();
    // return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
    var myDate = new Date(time);
    var y = myDate.getFullYear();
    var m = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
    var d = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
    var h = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
    var min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
    var s = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
    return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
};

// 获取商户树数据
 function treeList(mId){
    var dataList=[];
    $.ajax({
        type: 'post',
        url: `${vApi}/merchant/getMerchantGroup`,
        headers: {
          token:sessionStorage.token,
          "Content-Type": "application/json",
        },
        async: false,
        data: JSON.stringify({
          topId: mId
        }),
        success: function (res) {
          if (res.code == 200) {
            dataList.push(res.data[0])
          } else if (res.code == 403) {
            window.parent.location.href = "M_login.html";
          }
        },
        error: function (err) {
            dataList=[];
        }
      })
      return dataList
}

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
    permissionsFun,
    permissionsVal,
    timeStamp,
    treeList,
}
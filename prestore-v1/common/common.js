import 'babel-polyfill';
import '../assets/public/jquery-3.1.1.min'
var vApi='/api';
function ajaxFun(url, type, userToken, data) {
    return $.ajax({
        type,
        url:`/api${url}`,
        timeout: 30000,
        data,
        headers: {
            token: userToken,
            "Content-Type": "application/json",
        },
    })
}
// 弹窗显示
function popupShow(contnet, contnetChild) {
    $(contnet).fadeIn();
    $(contnetChild).removeClass('margin0');
  };
  // 取消关闭弹窗
  function popupHide(contnet, contnetChild) {
    $(contnetChild).addClass('margin0')
    $(contnet).fadeOut();
  };
// 请求方法
function loadAjax(url, type, userToken, data,layer, mask, element, elementChild) {
    return new Promise(function (resolve, reject) {
        ajaxFun(url, type, userToken, data).then(res => {
            if(mask){
                closeData();
            }
            if (res.code == 200) {
                if(element){
                    popupHide(element,elementChild)
                }
                resolve(res)
            } else if (res.code == 403) {
                layer.msg('登录过期,请重新登录',{icon:2})
            setTimeout(__=>{
                window.location.href = "login.html"
            },2000)
                
            } else {
                reject(res);
            }
        }).catch(err => {
            closeData();
            layer.msg('服务器请求超时',{icon:2})
            return;
            
        })
    })
};
// 数据处理中
function dataLoading(){
    $('.mask').fadeIn();
    $('.maskSpan').addClass('maskIcon');
}
// 关闭数据处理
function closeData(){
    $('.mask').fadeOut();
    $('.maskSpan').removeClass('maskIcon');
}
// 数据乘法
function mulCaluter(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {}
    try {
        m += s2.split(".")[1].length;
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};
// 正则判断密码是否符合规定
function passRegular(that) {
    var reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,64}$/;
    var passwork = $(that).val();
    if (passwork) {
        if (!(reg.test(passwork))) {
            // toastTitle('密码必须包含英文和数字以及特殊字符且不少于6位数', 'warn')
            $(that).val('')
            return false;
        }
    }
};
//   正则判断不能输入中文   
function ChineseREgular(that) {
    var reg = /[\u4E00-\u9FA5]/g;
    if ($(that).val()) {
        if (reg.test($(that).val())) {
            // toastTitle('密码不能含有中文！', 'warn')
            $(that).val('')
            return false;
        }
    }
};
//   正则判断只能输入正整数
function wholeNum(num) {
     var re = /^\d*$/;
        console.log(re.test(num))
   var flag=re.test(num);
   return flag
};
// 金额处理
function numFormat2(num) {
    var oldNum = num;
    num = Number(Number(num).toFixed(2));
    if (!isNaN(num)) {
      var c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      var str = c.split(".");
      // console.log(str)
      if (str.length == 1) { c = c + '.00'; } else { if (str[1].length == 1) { c = c + '0'; } }
      return c;
    } else {
      return oldNum;
    }
  
  }
// 查询条件默认一个月
  function getKeyTime() {
    var initialTime = new Date(),
      initialTime1 = {},
      y = initialTime.getFullYear(),
      m = initialTime.getMonth(),
      d = initialTime.getDate(),
      //开始时间
      startTime = (m==0?y-1:y) + '-' + ((m==0)?12: m < 10 ? '0' + (m) : (m)) + '-' + (d==31?30:d<10?'0'+d:d),
      //结束时间
      endTime = y + '-' + ((m + 1) < 10 ? '0' + (m + 1) : (m + 1)) + '-' + (d<10?'0'+d:d);
    initialTime1 = startTime + ' - ' + endTime;
    initialTime1={
      keyTimeData:startTime + ' - ' + endTime,
      startTime,
      endTime,
    }
    return initialTime1
  }
  // 判断查询时间是否大于三个月
  function timeFlag(start,end){
    console.log(start,end)
    var start1=new Date(start);
    var end1=new Date(end);
    var flagNum=24*60*60*1000*92;
    var timeFlag3=true;
    flagNum>=end1-start1?timeFlag3=false:timeFlag3=true;
    return timeFlag3
  }
export {
    loadAjax,
    popupShow,
    popupHide,
    dataLoading,
    closeData,
    wholeNum,
    numFormat2,
    mulCaluter
}
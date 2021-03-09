//JavaScript代码区域
import '../../MyCss/indexCss/index.scss';
import { navList } from '../../assets/public/navData.js'
import { loadAjax, popupShow, popupHide, dataLoading, closeData, wholeNum, numFormat2, getQueryString } from '../../common/common.js';
// if (!sessionStorage.token) {
//     window.location.href = "login.html"
// }
window.onload = function () {
    var userName = sessionStorage.username;
    $('#userLogin .userName').html(userName)
    var navStr = []; //判断tba选项卡有没有这个参数;
    layui.use(['layer', 'form', 'element', 'carousel', 'table'], function () {
        // 表单
        var layer = layui.layer,
            form = layui.form,
            table = layui.table,
        // 选项卡
        // var element = layui.element;
         $ = layui.jquery,
            element = layui.element; 

        // 导航切换事件
        $('.navClick').click(function () {
          history.replaceState(null, "", '?theModule=' + $(this).attr('navId'));
          $('.wrapContent').html(navList[$(this).attr('navId')]);
        })
 
        var theModule1 = getQueryString('theModule');
        if (theModule1||theModule1==0) {
            $('.navClick').eq(theModule1).addClass('layui-this').siblings().removeClass('layui-this');
            // $('.wrapContent iframe').attr('src',navList[theModule1])
            $('.wrapContent').html(navList[theModule1])
        
        }else{
            $('.navClick').eq(theModule1).addClass('layui-this').siblings().removeClass('layui-this');
            $('.wrapContent').html(navList[0])
            // $('.wrapContent iframe').attr('src',navList[0])
        }

        // 点击导航分类，其他分类收起
        $('#nav .layui-nav-item>a').click(function () {
            $(this).parent().siblings().removeClass('layui-nav-itemed')
        });

        //退出登录
        // function loginOut() {
        //     loadingAjax('/user/logout', 'post', '', sessionStorage.token, '', '', '', layer).then((res) => {
        //         // window.history.go(-1);
        //         sessionStorage.token = '';
        //         window.location.replace('login.html')
        //     }).catch((err) => {
        //         layer.msg(err.message)
        //     })
        // }

        // $('.exitLogin').click(function () {
        //     loginOut();
        // });
        $('.determineBtn button').click(function () {
            popupHide('socketCont', 'sockotBox')
            loginOut();
        });
        // 退出登录
        $('.exitLogin').click(function(){
            sessionStorage.token='';
            window.location.replace('login.html')
        })
    });
    javascript: window.history.forward(1);
}



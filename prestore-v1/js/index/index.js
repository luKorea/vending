//JavaScript代码区域
import '../../MyCss/indexCss/index.scss';
import { navList } from '../../assets/public/navData.js'
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
            if (navStr.indexOf($(this).attr('navId')) == -1) {
                tabAdd($(this).attr('navId'), $(this).html());
                tabChange($(this).attr('navId'));
                navStr.push($(this).attr('navId'));
            } else {
                tabChange($(this).attr('navId'))
            }
        })
        function getQueryString(key) {
            // 获取参数
            var url = window.location.search;
            // 正则筛选地址栏
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            // 匹配目标参数
            var result = url.substr(1).match(reg);
            //返回参数值
            return result ? decodeURIComponent(result[2]) : null;
        }
 
        var theModule1 = getQueryString('theModule');
        if (theModule1) {
            // console.log(theModule1)
          var  theModule = theModule1.split('-');
            if (theModule[0] != 22 && theModule) {
                tabAdd(theModule[0], theModule[1]);
                tabChange(theModule[0]);
                navStr.push(theModule[0]);
            }
        }

        // 点击导航分类，其他分类收起
        $('#nav .layui-nav-item>a').click(function () {
            $(this).parent().siblings().removeClass('layui-nav-itemed')
        });

        //退出登录
        function loginOut() {
            loadingAjax('/user/logout', 'post', '', sessionStorage.token, '', '', '', layer).then((res) => {
                // window.history.go(-1);
                sessionStorage.token = '';
                window.location.replace('login.html')
            }).catch((err) => {
                layer.msg(err.message)
            })
        }

        $('.exitLogin').click(function () {
            loginOut();
        });
        $('.determineBtn button').click(function () {
            popupHide('socketCont', 'sockotBox')
            loginOut();
        });
    });
    javascript: window.history.forward(1);
}



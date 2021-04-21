//JavaScript代码区域
import '../../MyCss/indexCss/index.scss';
import { navList } from '../../assets/public/navData.js'
import {
    loadAjax,
    popupShow,
    popupHide,
    dataLoading,
    closeData,
    wholeNum,
    numFormat2,
    getQueryString
} from '../../common/common.js';

window.onload = function () {
    var userName = sessionStorage.username,
        token = sessionStorage.token;
    var Navs = [];
    $('#userLogin .userName').html(userName);

    var navStr = []; //判断tba选项卡有没有这个参数;
    layui.use(['layer', 'form', 'element', 'carousel', 'table'], function () {
        // 表单
        var $ = layui.jquery,
            layer = layui.layer;

        // 用户权限获取
        function getRole() {
            loadAjax('/control/getControl', 'get', token)
                .then(res => {
                    if (res.code === 200) {
                        sessionStorage.roleData = JSON.stringify(res.data);

                        Navs = res.data && res.data.controlList || []

                        // initNav()

                    }
                }).catch(err => {
                    layer.msg(err.message, { icon: 2 })
                })
        };
        getRole();
        // 动态渲染导航
        // function initNav() {
        //     $('[data-control]').hide();
        //     Navs.forEach((v) => {
        //         $(`[data-control="${v.controlName}"]`).show();
        //         v.controlList.forEach((v1) => {
        //             $(`[data-control="${v1.controlName}"]`).show();
        //         })
        //     })
        // }

        // 导航切换事件
        $('.navClick').click(function () {
            history.replaceState(null, "", `?theModule=${$(this).attr('navId')}&key=${$(this).data('key')}`);
            $('.wrapContent').html(navList[$(this).attr('navId')]);
        })

        var theModule1 = getQueryString('theModule');
        if (theModule1 || theModule1 == 0) {
            $('.navClick').eq(theModule1).addClass('layui-this').siblings().removeClass('layui-this');
            $('.wrapContent').html(navList[theModule1])

        } else {
            $('.navClick').eq(theModule1).addClass('layui-this').siblings().removeClass('layui-this');
            $('.wrapContent').html(navList[0])
        }

        // 点击导航分类，其他分类收起
        $('#nav .layui-nav-item>a').click(function () {
            $(this).parent().siblings().removeClass('layui-nav-itemed')
        });
        $('.determineBtn button').click(function () {
            popupHide('socketCont', 'sockotBox')
        });
        // 退出登录
        $('.exitLogin').click(function () {
            sessionStorage.token = '';
            sessionStorage.roleData = '';
            window.location.replace('login.html')
        })
    });
    javascript: window.history.forward(1);
}



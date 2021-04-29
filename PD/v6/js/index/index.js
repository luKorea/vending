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
                        var flag = res.data.filter((v) => {
                            return v.controlName.indexOf('商家列表') > -1;
                        })
                        // if (flag && flag.length > 0) {//判断是否商家列表权限
                        //     $('.wrapContent').html(navList[1])
                        // }

                    }
                }).catch(err => {
                    layer.msg(err.message, { icon: 2 })
                })
        };
        getRole();
        // 导航切换事件
        $('.navClick').click(function () {
            history.replaceState(null, "", '?theModule=' + $(this).attr('navId'));
            $('.wrapContent').html(navList[$(this).attr('navId')]);
        })

        var theModule1 = getQueryString('theModule');


        // if (theModule1 || theModule1 == 0) {


        //     $(`.navClick[navid="${theModule1}"]`).eq(0).addClass('layui-this').siblings().removeClass('layui-this');
        //     //$('.navClick').eq(theModule1).addClass('layui-this').siblings().removeClass('layui-this');
        //     $('.wrapContent').html(navList[theModule1])

        // } else {
        //     $(`.navClick[navid="${theModule1}"]`).eq(0).addClass('layui-this').siblings().removeClass('layui-this');
        //     //$('.navClick').eq(theModule1).addClass('layui-this').siblings().removeClass('layui-this');
        //     $('.wrapContent').html(navList[0])

        // }


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


        //2021-4-25
        var $ = layui.jquery,
            element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

        //新增一个Tab项
        // console.log(table)
        function tabAdd(index, title) {
            console.log(title, index);

            element.tabAdd('demo', {
                title,
                content: `<div class="content-tbas-iframe-html">
                         ${navList[index]}
                     </div>`
                , id: index
            });

        };

        //切换到指定Tab项
        function tabChange(index) {
            element.tabChange('demo', index);
        };
        //切换到指定Tab项
        function tabChange(index) {
            element.tabChange('demo', index);
        };

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

        // 监听tabl删除事件
        $(".layui-tab").on("click", function (e) {
            if ($(e.target).is(".layui-tab-close")) {
                //判断是不是点击删除icon
                var delIndex = navStr.indexOf($(e.target).parent().attr("lay-id"));
                navStr.splice(delIndex, 1);
                // console.log($(e.target).parent().attr("lay-id"))// 输出哪个tab被点击，没有值时返回undefined
            }
        });
        // 监听tab切换事件
        var Indexs = null;
        element.on('tab(demo)', function (data) {

            let index_span = $(this).html().indexOf('</em>');
            let  nameurl = $(this).html().substr(index_span + 5, 4)
            if (index_span== -1) {
                index_span = $(this).html()
                nameurl = $(this).html().substr(0, 4)
            } 
            sessionStorage.setItem('nameStr', nameurl);
            history.replaceState(null, "", '?theModule=' + $(this).attr('lay-id'));
            var Len = $(".navClick").length;
            for (var i = 0; i < Len; i++) {
                if ($(this).attr('lay-id') == $(".navClick").eq(i).attr('navId')) {
                    Indexs = i;
                }
            }
            ;
            // 左侧菜单初始化
            $('.layui-nav-item').removeClass('layui-nav-itemed');
            $(".navClick").eq(Indexs).parent().parent().parent().addClass('layui-nav-itemed');
            $(".navClick").parent().removeClass('layui-this');
            $(".navClick").eq(Indexs).parent().addClass('layui-this')
            if ($(this).attr('lay-id') == 999) {
                $('.layui-nav-item').removeClass('layui-nav-itemed');
                $(".navClick").parent().removeClass('layui-this');
            }
        });


        if (theModule1) {
            // console.log(theModule1)
            var theModule = theModule1.split('-');
            if (theModule[0] != 22 && theModule) {
                tabAdd(theModule[0], sessionStorage.getItem('nameStr'));
                tabChange(theModule[0]);
                navStr.push(theModule[0]);
            }
        }
    });
    javascript: window.history.forward(1);
}



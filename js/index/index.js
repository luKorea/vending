//JavaScript代码区域
window.onload = function () {
    var navStr = []; //判断tba选项卡有没有这个参数;
    layui.use(['layer', 'form', 'element', 'carousel'], function () {
        // 表单
        var layer = layui.layer,
            form = layui.form;
        // 选项卡
        // var element = layui.element;
        // 轮播图
        var carousel = layui.carousel;
        carousel.render({
            elem: '#test1'
            , width: '480px' //设置容器宽度
            , height: '25px'
            , arrow: 'none' //始终显示箭头
            , anim: 'updown' //切换动画方式
            , indicator: 'none'
            , interval: '2000'
        });

        var $ = layui.jquery
            , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

        //新增一个Tab项
        function tabAdd(index, title) {
            element.tabAdd('demo', {
                title,
                // content: `<div class="content-tbas-iframe-html">
                //             <iframe class="iframe-show" src="homePage.html"></iframe>
                //         </div>`
                content: `<div class="content-tbas-iframe-html">
                             ${navList[index]}
                         </div>`
                , id: index
            })
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
        element.on('tab(demo)', function (data) {
            var Len = $(".navClick").length;
            for (var i = 0; i < Len; i++) {
                if ($(this).attr('lay-id') == $(".navClick").eq(i).attr('navId')) {
                    Index = i;
                }
            };
            // 左侧菜单初始化
            $('.layui-nav-item').removeClass('layui-nav-itemed');
            $(".navClick").eq(Index).parent().parent().parent().addClass('layui-nav-itemed');
            $(".navClick").parent().removeClass('layui-this');
            $(".navClick").eq(Index).parent().addClass('layui-this')
            if ($(this).attr('lay-id') == 999) {
                $('.layui-nav-item').removeClass('layui-nav-itemed');
                $(".navClick").parent().removeClass('layui-this');
            }
        })
        //Hash地址的定位
        //   var layid = location.hash.replace(/^#test=/, '');
        //   console.log(layid)
        //   element.tabChange('test', layid);

        // element.on('tab(demo)', function (elem) {
        // 	location.hash = 'test=' + $(this).attr('lay-id');
        // });

        // tab nav 关联
        // $("body").delegate(".layui-tab-title li","click",function() {
        //     //或者$(this).childNodes[0].data
        //     var Len = $(".navClick").length;
        //     var Index;
        //     for(var i = 0; i < Len; i++) {
        //         if($(this).context.childNodes[0].data == $(".navClick").eq(i).text()) {
        //             Index = i;            
        //         }

        //     }
        //     // 左侧菜单初始化
        //     $('.layui-nav-item').removeClass('layui-nav-itemed');
        //     $(".navClick").eq(Index).parent().parent().parent().addClass('layui-nav-itemed');
        //     $(".navClick").parent().removeClass('layui-this');
        //     $(".navClick").eq(Index).parent().addClass('layui-this')
        // });


        // 点击导航分类，其他分类收起
        $('#nav .layui-nav-item>a').click(function () {
            $(this).parent().siblings().removeClass('layui-nav-itemed')
        });
        var d = {
            pageSize: 1,
            pageNum: 10
        };
        // $.ajax({
        //     type: 'post',
        //     url: `/api/goods/findAll`,
        //     dataType:'jsonp',
        //     data: JSON.stringify(d),

        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     success: function (res) {
        //         console.log(res)
        //     }
        // })
        //   $.get('/api/user/findUser',function(res){
        //     console.log(res)
        //   });
        //   $.post(`/api/goods/findAll`)
    });
}
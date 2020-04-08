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
            }else{
                tabChange($(this).attr('navId'))
            }
        })
        element.on('tab(demo)', function(data){
            console.log(this); //当前Tab标题所在的原始DOM元素
            console.log(data.index); //得到当前Tab的所在下标
            console.log(data.elem); //得到当前的Tab大容器
          });
        // 监听tabl删除事件
        $(".layui-tab").on("click", function (e) {
            if ($(e.target).is(".layui-tab-close")) {
                //判断是不是点击删除icon
                var delIndex=navStr.indexOf($(e.target).parent().attr("lay-id"));
                navStr.splice(delIndex,1);
                // console.log($(e.target).parent().attr("lay-id"))// 输出哪个tab被点击，没有值时返回undefined
            }
        })


    });
    
}
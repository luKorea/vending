layui.use(['element', 'laydate', 'table'], function () {
    var $ = layui.jquery
        , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    //触发事件
    var active = {
        tabAdd: function () {
            //新增一个Tab项
            element.tabAdd('demo', {
                title: '新选项' + (Math.random() * 1000 | 0) //用于演示
                , content: '内容' + (Math.random() * 1000 | 0)
                , id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
            })
        }
        , tabDelete: function (othis) {
            //删除指定Tab项
            element.tabDelete('demo', '44'); //删除：“商品管理”


            othis.addClass('layui-btn-disabled');
        }
        , tabChange: function () {
            //切换到指定Tab项
            element.tabChange('demo', '22'); //切换到：用户管理
        }
    };

    $('.site-demo-active').on('click', function () {
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });

    // 日期选择
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test6'
        , range: true
        , value: new Date(),
    });


    // 展开
    var show = false;
    $('.an-btn').click(function () {
        $(".pack-up").slideToggle();
    });
    var table = layui.table;
    table.render({
        elem: '#moneyData'
        , cols: [[
            { field: 'username', width: 150, title: '发布单号' },
            { field: 'phone', width: 180, title: '广告时长(s)', },
            { field: 'CreationTime', width: 200, title: '广告大小(m)', },
            { field: 'amendTime', width: 130, title: '广告位', },
            { field: 'bili', width: 180, title: '发布时间', sort: true },
            { field: '1', width: 180, title: '下架时间', sort: true },
            { field: '2', width: 150, title: '发布人',},
            // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
            { field: 'operation',  right: 0, width: 250, title: '操作', toolbar: '#barDemo',fixed: 'right' },

        ]],
        data: [
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
            }
        ]
        , page: true
    });
});
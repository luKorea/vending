layui.use(['element', 'laydate', 'table', 'carousel'], function () {
    // 日期选择
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test6'
        , range: true
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
            { field: '2', width: 150, title: '发布人', },
            // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
            { field: 'operation', right: 0, width: 250, title: '操作', toolbar: '#barDemo', fixed: 'right' },

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

    // 广告预览轮播
    var carousel = layui.carousel;
    //建造轮播实例
    carousel.render({
        elem: '#swiperDetails',
         width: '100%' ,//设置容器宽度
         arrow: 'always', //始终显示箭头
         height:'100%',
         interval:5000
    });
    carousel.on('change(swiperDetails)', function(obj){ //test1来源于对应HTML容器的 lay-filter="test1" 属性值
  console.log(obj.index); //当前条目的索引
  console.log(obj.prevIndex); //上一个条目的索引
  console.log(obj.item); //当前条目的元素对象
});  
});
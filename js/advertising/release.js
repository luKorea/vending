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
    var advertisingLis=  table.render({
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
            { field: 'operation', right: 0, width: 300, title: '操作', toolbar: '#barDemo', fixed: 'right' },

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
        ,id:'advertisingData'
        
    });

    // 广告预览轮播
    var carousel = layui.carousel;
    //建造轮播实例
    var ins= carousel.render({
        elem: '#swiperDetails',
        width: '100%',//设置容器宽度
        arrow: 'always', //始终显示箭头
        height: '100%',
        interval: 5000
    });
    carousel.on('change(swiperDetails)', function (obj) { //test1来源于对应HTML容器的 lay-filter="test1" 属性值
        // console.log(obj.index); //当前条目的索引
        // console.log(obj.prevIndex); //上一个条目的索引
        // console.log(obj.item); //当前条目的元素对象
    });


    // 监听操作点击事件
    table.on('tool(moneyData)', function (obj) {
        console.log(obj)
        if(obj.event==='preview'){
            $('.preview').fadeIn(); 
            $('.previewContnet').removeClass('margin0')
            ins.reload('swiperDetails');
        }else if(obj.event==='toView'){
            $('.toViveCont').fadeIn(); 
            $('.toViveBox').removeClass('margin0')
        }

    });

    // 关闭广告预览
    $('.previewContnet .close').click(function(){
        $('.previewContnet').addClass('margin0')
        $('.preview').fadeOut();  
    });
    
    // 关闭广告使用情况
    $('.toViveBox .close').click(function(){
        $('.toViveBox').addClass('margin0')
        $('.toViveCont').fadeOut(); 
    })
    // 查看购金机列表
    var machineList=  table.render({
        elem: '#machine'
        , cols: [[
            { field: 'username', width: 150, title: '机器编号' },
            { field: 'phone', width: 180, title: '机器名称', },
            { field: 'CreationTime', width: 250, title: '机器地址', },
            { field: 'amendTime', width: 130, title: '广告位', },
            { field: 'bili', width: 180, title: '发布时间', sort: true },
            // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
            { field: 'operation',  width: 120, title: '操作', toolbar: '#machineDemo', },

        ]],
        data: [
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '广州市丽丰大厦'
                , amendTime: '99'
                , bili: '1:2'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '广州市丽丰大厦'
                , amendTime: '99'
                , bili: '1:2'
            }
        ]
        , page: true,
        id:'machineData'
        ,skin:'nob'
    });

    // 监听购金机点击地图事件
    // 监听操作点击事件
    table.on('tool(machine)', function (obj) {
      
    });
});
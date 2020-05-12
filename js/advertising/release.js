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
    var publis= carousel.render({
        elem: '#publisSwiper',
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
        }else if(obj.event==='details'){
            $('.advertisingDetails').fadeIn(); 
            $('.detailsBox').removeClass('margin0')
        }

    });

    // // 关闭广告预览
    // $('.previewContnet .close').click(function(){
    //     $('.previewContnet').addClass('margin0')
    //     $('.preview').fadeOut();  
    // });
    
    // // 关闭广告使用情况
    // $('.toViveBox .close').click(function(){
    //     $('.toViveBox').addClass('margin0')
    //     $('.toViveCont').fadeOut(); 
    // });
    // 关闭弹窗
    $('.playHeader .close').click(function(){
        $(this).parent().parent().addClass('margin0')
       $(this).parents('.maskContnet').fadeOut();
        
    });
    // 广告素材预览
    $('.listPreview .previewBtn').click(function(){
        $('.materialPreview').fadeIn();
        $('.MateriaBox').removeClass('margin0')
    })
    // 查看购金机列表
    var machineList=  table.render({
        elem: '#machine',
         cols: [[
            { field: 'username', width: 150, title: '机器编号' },
            { field: 'phone', width: 180, title: '机器名称', },
            { field: 'CreationTime', width: 250, title: '机器地址', },
            { field: 'amendTime', width: 130, title: '广告位', },
            { field: 'bili', width: 180, title: '发布时间', sort: true },
            // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
            { field: 'operatio',  width: 120, title: '操作', toolbar: '#machineDemo', },

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
        ],
        page: true,
        id:'machineData',
        skin:'nob'
    });
    // 监听购金机点击地图事件
    // 监听操作点击事件
    $('.viewBtn').click(function(){
        $('.ScottCont').fadeIn(function(){
                ScottMethods();
            });
            $('.scottBox').removeClass('margin0')
    })   
    // 高德地图
    function ScottMethods(){
        var map = new AMap.Map('machineScottBody', {
            resizeEnable: true,
            center: [113.27, 23.13],
            zoom: 13
        });

        var marker = new AMap.Marker({
            position: map.getCenter(),
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            offset: new AMap.Pixel(-13, -30)
        });

        marker.setMap(map);

        // 设置鼠标划过点标记显示的文字提示
        marker.setTitle('我是marker的title');

        // 设置label标签
        // label默认蓝框白底左上角显示，样式className为：amap-marker-label
        marker.setLabel({
            offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
            content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
            direction: 'right' //设置文本标注方位
        });
    };



    // 发布广告选择素材部分
        var ChooseMaterial= table.render({
        elem: '#chooseData'
        , cols: [[
              {type:'checkbox',},
            { field: 'username', width: 80, title: '微缩图' },
            { field: 'phone', width: 150, title: '素材名', },
            { field: 'CreationTime', width: 100, title: '大小', },
            { field: 'amendTime', width: 100, title: '分辨率', },
            { field: 'bili', width: 150, title: '素材属性'},
            { field: 'bili', width: 160, title: '上传时间',sort: true  },
            { field: 'jine', width: 150, title: '上传人 ', },
        ]],
        data: [
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'1'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'2'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'1'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'2'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'1'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'2'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'1'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'2'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'1'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'2'
            }
        ],
         page: true,
        id:'chooesId',
        height:450,
        loading:true,
        width:950
    });


    // 发布广告操作
    // 广告设置下
    $('.setAdvertising .nextBtn').click(function(){
        $('.stepsThree').fadeIn();
        $('.publishLast').fadeIn();
        $('.oneLine').animate({
            width:98+'%'
        },500)
        nextStep('setAdvertising','publishCont');
    })

    // 返回上一步
    $('.publishCont .onBtn').click(function(){
        onStep('publishCont','setAdvertising');
        $('.stepsThree').fadeOut();
        $('.publishLast').fadeOut();
        $('.oneLine').animate({
            width:0
        },500)
    })

    // 时间选择器
    var laydate = layui.laydate;
    laydate.render({
        elem: '#itemrs1',
        value: new Date(),
        max:'0'
    });

    // 添加素材
    $('.setAdvertising .addBtn').click(function(){
        $('.pubilshMaterialCont').fadeIn();
        $('.pubilshMaterialBox').removeClass('margin0')
    });

    // 发布
    $('.publishCont .publishBtn').click(function(){
        $('.pubilshSweet').fadeIn();
        $('.sweetBox').removeClass('margin0')
    })
});
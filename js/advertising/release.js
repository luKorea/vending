layui.use(['element', 'laydate', 'table', 'carousel'], function () {
    var token = sessionStorage.token;
    // 日期选择
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test6',
        range: true,
        // type: 'datetime'
    });


    // 展开
    var show = false;
    $('.an-btn').click(function () {
        $(".pack-up").slideToggle();
    });
    var table = layui.table;
    var advertisingLis = table.render({
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
        , id: 'advertisingData'

    });

    // 广告预览轮播
    var carousel = layui.carousel;
    //建造轮播实例
    var ins = carousel.render({
        elem: '#swiperDetails',
        width: '100%',//设置容器宽度
        arrow: 'always', //始终显示箭头
        height: '100%',
        interval: 5000
    });
    var publis = carousel.render({
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
        if (obj.event === 'preview') {
            $('.preview').fadeIn();
            $('.previewContnet').removeClass('margin0')
            ins.reload('swiperDetails');
        } else if (obj.event === 'toView') {
            $('.toViveCont').fadeIn();
            $('.toViveBox').removeClass('margin0')
        } else if (obj.event === 'details') {
            $('.advertisingDetails').fadeIn();
            $('.detailsBox').removeClass('margin0')
        }

    });
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    // 广告素材预览
    $('.listPreview .previewBtn').click(function () {
        $('.materialPreview').fadeIn();
        $('.MateriaBox').removeClass('margin0')
    })
    // 查看购金机列表
    var machineList = table.render({
        elem: '#machine',
        cols: [[
            { field: 'username', width: 150, title: '机器编号' },
            { field: 'phone', width: 180, title: '机器名称', },
            { field: 'CreationTime', width: 250, title: '机器地址', },
            { field: 'amendTime', width: 130, title: '广告位', },
            { field: 'bili', width: 180, title: '发布时间', sort: true },
            // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
            { field: 'operatio', width: 120, title: '操作', toolbar: '#machineDemo', },

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
        id: 'machineData',
        skin: 'nob'
    });
    // 监听购金机点击地图事件
    // 监听操作点击事件
    $('.viewBtn').click(function () {
        $('.ScottCont').fadeIn(function () {
            ScottMethods();
        });
        $('.scottBox').removeClass('margin0')
    })
    // 高德地图
    function ScottMethods() {
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

    // 发布广告操作
    // 广告设置下
    $('.setAdvertising .nextBtn').click(function () {
        $('.stepsTwo').css('borderColor', '#e6a23c');
        $('.stepsTwo>div').css('color', '#e6a23c');
        $('.publishLast').css('color', '#e6a23c')
        nextStep('setAdvertising', 'publishCont');
    })

    // 返回上一步
    $('.publishCont .onBtn').click(function () {
        onStep('publishCont', 'setAdvertising');
        $('.stepsTwo').css('borderColor', '#909399');
        $('.stepsTwo>div').css('color', '#909399');
        $('.publishLast').css('color', '#909399')
    })

    // 时间选择器
    var laydate = layui.laydate;
    laydate.render({
        elem: '#itemrs1',
        value: new Date(),
        max: '0'
    });
    laydate.render({
        elem: '#itemrs2',
        value: new Date(),
        max: '0'
    });

    // 添加素材
    var ChooseMaterial = null;
    // 添加素材列表
    var addMaterList
    $('.setAdvertising .addBtn').click(function () {
        $('.pubilshMaterialCont').fadeIn();
        $('.pubilshMaterialBox').removeClass('margin0');
        // 发布广告选择素材部分
        if (!ChooseMaterial) {
            ChooseMaterial = table.render({
                elem: '#chooseData',
                url: '/api/advertising/selectAdvertising',
                method: 'post',
                contentType: "application/json",
                headers: {
                    token,
                },
                cols: [[
                    { type: 'checkbox', },
                    { field: 'img', width: 80, title: '微缩图', templet: "#imgtmp" },
                    { field: 'name', width: 150, title: '素材名', },
                    { field: 'size', width: 100, title: '大小', },
                    { field: 'advertisingAttribute', width: 150, title: '素材属性' },
                    { field: 'creationTime', width: 160, title: '上传时间', sort: true },
                    { field: 'addUser', width: 150, title: '上传人 ', },
                ]],
                page: true,
                id: 'chooesId',
                height: 450,
                loading: true,
                width: 950,
                request: {
                    'pageName': 'pageNum',
                    'limitName': 'pageSize'
                },
                where: {
                    status: '是',
                    checkStatus: '已审核'
                },
                parseData: function (res) {
                    // console.log(res)
                    //res 即为原始返回的数据
                    if (res.code == 200) {
                        return {
                            "code": res.code, //解析接口状态
                            "msg": '', //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.list //解析数据列表
                        };
                    } else {
                        return {
                            "code": res.code, //解析接口状态
                            "msg": res.msg, //解析提示文本
                        }
                    }
                },
                response: {
                    statusCode: 200 //规定成功的状态码，默认：0
                },
                done: function (res) {
                    if (res.code == 403) {
                        window.history.go(-1)
                    } else {

                    }

                }
            });
        }

    });
       // 添加素材到发布广告
       $('.pubilshMaterialCont .determineBtn').click(function () {
        addMaterList  = table.checkStatus('chooesId').data;
        console.log(addMaterList);  
        if(addMaterList.length>0){
            popupHide('pubilshMaterialCont','pubilshMaterialBox');
            materaialMethods(addMaterList,'SetContList');
            ChooseMaterial.reload({
                where:{}
            })
        }else{
            layer.msg('请选择素材', { icon: 7 });
        }
    });
    // 发布广告排序
    $('.SetContList').on('click','.sortingImg',function(){
        // console.log($(this).attr('index')-1);    
        var sortingIndex=$(this).attr('index');
        console.log(sortingIndex-1)
        var list_1= addMaterList[sortingIndex-1];
        addMaterList[sortingIndex-1]=addMaterList[sortingIndex];
        addMaterList[sortingIndex]=list_1;
        console.log(addMaterList);
        materaialMethods(addMaterList,'SetContList');
        // console.log(addMaterList[sortingIndex])
        // addMaterList[sortingIndex]=addMaterList.splice((Number(sortingIndex)+1),1,addMaterList[sortingIndex])[0]
        // var arr = [1,2,3,4,5]
        // arr[2] = arr.splice(3,1,arr[2])[0]
        // console.log(arr) //[1,2,4,3,5];
    })
    $('.SetContList').on('blur','.duration input',function(){
       console.log($(this).val());
       addMaterList[$(this).attr('index')].inputVal=$(this).val();
       console.log(addMaterList);
    })
    // 广告设置素材列表
    function materaialMethods (addList,theElement){
        var materaiaList='';
        $.each(addList,function(index,ele){
            materaiaList+=` <li class="setMateraialList">
                                <div class="liftImg" style="text-align: center;">
                                    <img ${index==0?'class="hidden"':''} src="../../img/lift.png" class="sortingImg" index="${index}" alt="">
                                </div>
                                <div class="SetSorting">
                                    <div>${index+1}</div>
                                </div>
                                <div class="abbreviateImg">
                                    <img src="${ele.img}" alt="">
                                </div>
                                <div class="SetName">
                                    <div>${ele.name}</div>
                                </div>
                                <div class="duration">
                                    <div>
                                        <input type="number" value="${ele.inputVal?ele.inputVal:''}" index="${index}">
                                    </div>
                                </div>
                                <div class="SetType">
                                    <div>${ele.advertisingType}</div>
                                </div>
                                <div class="SetOperation">
                                    <button class="layui-btn layui-btn-normal  btn del-btn">
                                        <span>删除</span>
                                    </button>
                                </div>
                            </li>`
        });
        $(`.${theElement}`).empty();
        $(`.${theElement}`).html(materaiaList)
    };
    // 发布
    $('.publishCont .publishBtn').click(function () {
        $('.pubilshSweet').fadeIn();
        $('.sweetBox').removeClass('margin0')
    });
    // 确定发布
    $('.pubilshSweet .confirmBtn').click(function () {
        layer.msg('发布成功', { icon: 1, anim: 1 });
        $('sweetBox').removeClass('margin0');
        $('.pubilshSweet').fadeOut();
        $('publishBox').removeClass('margin0');
        $('.releaseAdvertising').fadeOut();
    });


    // 购金机角度看广告部分
    var machineAdvertising = table.render({
        elem: '#machineDetailsList',
        cols: [[
            { field: 'username', width: 150, title: '机器编号' },
            { field: 'phone', width: 180, title: '机器名称', },
            { field: 'CreationTime', width: 250, title: '机器地址', },
            { field: 'amendTime', width: 130, title: '广告位', },
            { field: 'bili', width: 180, title: '发布时间', sort: true },
            // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
            { field: 'operatio', width: 210, title: '操作', toolbar: '#machineAdvertising', },

        ]],
        data: [
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '广州市丽丰中心'
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
        id: 'machineAdvertisingList',
        skin: 'nob'
    });

    // 发布广告弹窗事件
    $('.publicAdvertisingBtn').click(function () {
        $('.setAdvertising').css('left', 0);
        $('.stepsTwo').css('borderColor', '#909399');
        $('.stepsTwo>div').css('color', '#909399');
        $('.publishLast').css('color', '#909399');
        $('.publishCont').css('left', 100 + '%')
        popupShow('releaseAdvertising','publishBox')
        materaialMethods(addMaterList,'SetContList');
    });
    // 购机机广告弹窗
    $('.machineAdvertisingBtn').click(function () {
        $('.machineDetailsCont').fadeIn();
        $('.machineDetailsBox').removeClass('margin0')
    })

    // 广告详情函数
    function advertisingDetails(that, ListData, element) {
        var detailsList = null;
        $.each(ListData, function (index, ele) {
            detailsList += ` <li class="detailsList">
                                <div class="listSort">
                                    <span>1</span>
                                </div>
                                <div class="listImg">
                                    <img src="http://172.16.68.199:8087/image/1d1704c6-59ad-4566-9436-803fb4c5d24b.jpg "
                                        alt="">
                                </div>
                                <div class="listName">
                                    <span>粤宝文化科技</span>
                                </div>
                                <div class="listSize">
                                    <span>3(mb)</span>
                                </div>
                                <div class="listAttribute">
                                    <span>图片</span>
                                </div>
                                <div class="listType">
                                    <span>横版</span>
                                </div>
                                <div class="listTimer">
                                    <span>30(s)</span>
                                </div>
                                <div class="uploadName">
                                    <span>C999</span>
                                </div>
                                <div class="listPreview">
                                    <button class="layui-btn layui-btn-normal  btn previewBtn">
                                        <span>预览</span>
                                    </button>
                                </div>
                                <div class="listLift">
                                    <img src="../../img/lift.png" alt="">
                                </div>
                            </li>`
        });
        $(`.${element}`).remove();
        $(`.${element}`).html(detailsList);
    }


 var arr1=[4,5];
 var arr2=[1,2,3];
 arr1=arr1.concat(arr2);
 console.log(arr1);
});
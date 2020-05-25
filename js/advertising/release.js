layui.use(['element', 'laydate', 'table', 'carousel'], function () {
    var token = sessionStorage.token;
    var startTime = '';
    //结束时间
    var endTime = '';
    // 日期选择
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test6',
        range: true,
        done: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            timerKey = value.split(' - ');
            console.log(timerKey);
            startTime = timerKey[0];
            endTime = timerKey[1];
        }
    });

    // 查询
    $('.keyBtn').click(function(){
        advertisingLis.reload({
            where:{
                condition:startTime,
                conditionTwo:endTime,
                // conditionThree:$('input[name="minSize"]').val(),
                // conditionFour:$('input[name="maxSize"]').val()
            }
        })
    })
    // 展开
    var show = false;
    $('.an-btn').click(function () {
        $(".pack-up").slideToggle();
    });
    var table = layui.table;
    var advertisingLis = table.render({
        elem: '#moneyData',
        url: '/api/publicized/selectPublicize',
        method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
         cols: [[
            { field: 'number', width: 210, title: '发布单号' },
            { field: 'advertisingTime', width: 120, title: '广告时长(s)', templet:function(d){
                var advertisingTime=0;
                   d.publicizeAdvert.forEach((item,index)=>{
                    return advertisingTime+=Number(item.time);         
                });
                return advertisingTime
            }},
            { field: 'advertisingSize', width: 120, title: '广告大小(m)',templet:function(d){
                var advertisingSize=0
                d.publicizeAdvert.forEach((item,index)=>{
                    return advertisingSize+=Number(item.size);         
                });
                return advertisingSize
            } },
            { field: 'amendTime', width: 130, title: '广告位', },
            { field: 'creationTime', width: 210, title: '发布时间', sort: true },
            { field: 'offTime', width: 210, title: '下架时间', sort: true },
            { field: 'addUser', width: 150, title: '发布人', },
            { field: 'operation', right: 0, width: 300, title: '操作', toolbar: '#barDemo', fixed: 'right' },
        ]],
         page: true,
        id: 'advertisingData',
        loading: true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
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
                    "msg": res.message, //解析提示文本
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

    // 广告预览轮播
    var carousel = layui.carousel;
    // //建造轮播实例
    // var ins = carousel.render({
    //     elem: '#swiperDetails',
    //     width: '100%',//设置容器宽度
    //     arrow: 'always', //始终显示箭头
    //     height: '100%',
    //     interval: 5000
    // });

    carousel.on('change(swiperDetails)', function (obj) { //test1来源于对应HTML容器的 lay-filter="test1" 属性值
        // console.log(obj.index); //当前条目的索引
        // console.log(obj.prevIndex); //上一个条目的索引
        // console.log(obj.item); //当前条目的元素对象
    });


    // 监听操作点击事件
    table.on('tool(moneyData)', function (obj) {
        console.log(obj)
        if (obj.event === 'preview') {
            publisSwiperCont(obj.data.publicizeAdvert,'previewSwiperCont','swiperDetails')
            popupShow('preview','previewContnet');
            // ins.reload('swiperDetails');
        } else if (obj.event === 'toView') {
            popupShow('toViveCont','toViveBox');
        } else if (obj.event === 'details') {
            popupShow('advertisingDetails','detailsBox');
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



    // 返回上一步
    $('.publishCont .onBtn').click(function () {
        onStep('publishCont', 'setAdvertising');
        $('.stepsTwo').css('borderColor', '#909399');
        $('.stepsTwo>div').css('color', '#909399');
        $('.publishLast').css('color', '#909399')
    })
    var keyStartTiem='';
    var keyEndTiem='';
    // 时间选择器
    laydate.render({
        elem: '#itemrs1',
        range: true,
        done: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            timerKey = value.split(' - ');
            console.log(timerKey);
            keyStartTiem = timerKey[0];
            keyEndTiem = timerKey[1];
        }
    });
    laydate.render({
        elem: '#itemrs2',
        value: new Date(),
        max: '0'
    });
    $('.addQueryBtn').click(function(){
        ChooseMaterial.reload({
            where: {
                startTime:keyStartTiem,
                endTime:keyEndTiem,
                keyWord:$('input[name="keyName"]').val()
            }
        })
    })
    // 添加素材
    var ChooseMaterial = null;
    // 添加素材列表
    var addMaterList = [];
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
        // addMaterList  = table.checkStatus('chooesId').data;
        addMaterList = addMaterList.concat(table.checkStatus('chooesId').data)
        console.log(addMaterList);
        if (addMaterList.length > 0) {
            popupHide('pubilshMaterialCont', 'pubilshMaterialBox');
            materaialMethods(addMaterList, 'SetContList');
            ChooseMaterial.reload({
                where: {}
            })
        } else {
            layer.msg('请选择素材', { icon: 7 });
        }
    });
    // 发布广告排序
    $('.SetContList').on('click', '.sortingImg', function () {
        var sortingIndex = $(this).attr('index');
        console.log(sortingIndex - 1)
        var list_1 = addMaterList[sortingIndex - 1];
        addMaterList[sortingIndex - 1] = addMaterList[sortingIndex];
        addMaterList[sortingIndex] = list_1;
        console.log(addMaterList);
        materaialMethods(addMaterList, 'SetContList');
    });
    // 删除广告素材
    $('.SetContList').on('click','.setMateraialList .delBtn',function(){
        console.log($(this).attr('delindex'));
        addMaterList.splice($(this).attr('delindex'),1);
        materaialMethods(addMaterList, 'SetContList');
    })
    // 输入框失去焦点事件
    $('.SetContList').on('blur', '.duration input', function () {
        addMaterList[$(this).attr('index')].inputVal = $(this).val();
        console.log(addMaterList);
    });

    // 发布广告删除删除事件
    $('.SetContList').on('click')
    // 发布广告操作
    // 广告设置下
    $('.setAdvertising .nextBtn').click(function () {
        $('.stepsTwo').css('borderColor', '#e6a23c');
        $('.stepsTwo>div').css('color', '#e6a23c');
        $('.publishLast').css('color', '#e6a23c');
        let InputFlaf = addMaterList.every((item, index) => {
            return item.inputVal > 0 & item.inputVal != ''
        })
        if (addMaterList.length>0) {
            if (InputFlaf) {
                publisSwiperCont(addMaterList, 'swiperList','publisSwiper');
                nextStep('setAdvertising', 'publishCont');
            } else {
                layer.msg('素材播放时长必须大于0', { icon: 7 });
            }
        } else {
            layer.msg('请选择素材', { icon: 7 });
        }

    })


    // 广告设置素材列表
    function materaialMethods(addList, theElement) {
        var materaiaList = '';
        $.each(addList, function (index, ele) {
            materaiaList += ` <li class="setMateraialList">
                                <div class="liftImg" style="text-align: center;">
                                    <img ${index == 0 ? 'class="hidden"' : ''} src="../../img/lift.png" class="sortingImg" index="${index}" alt="">
                                </div>
                                <div class="SetSorting">
                                    <div>${index + 1}</div>
                                </div>
                                <div class="abbreviateImg">
                                    <img src="${ele.img}" alt="">
                                </div>
                                <div class="SetName">
                                    <div>${ele.name}</div>
                                </div>
                                <div class="duration">
                                    <div>
                                        <input type="number" value="${ele.inputVal ? ele.inputVal : ''}" index="${index}">
                                    </div>
                                </div>
                                <div class="SetType">
                                    <div>${ele.advertisingType}</div>
                                </div>
                                <div class="SetOperation">
                                    <button class="layui-btn layui-btn-normal  btn delBtn" delindex="${index}">
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
        var confirmList=[]; 
        addMaterList.forEach((item, index) => {
            var confirmObj={
                sort:index+1,
                time:item.inputVal,
                vid:item.vId
            }
            confirmList.push(confirmObj)
        });
        setTimeout(()=>{
            if(confirmList.length==addMaterList.length){
                $.ajax({
                    type:'post',
                    url:'/api/publicized/savePublicize',
                    processData: false,
                    contentType: false,
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    data:JSON.stringify({
                        publicizeAdvert:confirmList
                    }),
                    success:function(res){
                        console.log(res)
                        if(res.code==200){
                            popupHide('pubilshSweet','sweetBox');
                            popupHide('releaseAdvertising','publishBox')
                            layer.msg('发布成功', { icon: 1, anim: 1 });
                            addMaterList=[];
                            advertisingLis.reload({
                                where:{}
                            })
                        }else if(res.code==403){
                            window.history.go(-1)
                        }else{
                            layer.msg(res.message, { icon: 7 });
                        }
                    }

                })
            }else{
                layer.msg('出错！请重新发布', { icon: 7 });
            }
        },1000);
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
        popupShow('releaseAdvertising', 'publishBox')
        materaialMethods(addMaterList, 'SetContList');
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
    };

    // 发布广告轮播图
    function publisSwiperCont(list, theElement,IdELement) {
        var swiperList = '';
        $.each(list, function (index, ele) {
            swiperList += ` <div>
                            <img src="${ele.img}"  ${ele.advertisingAttribute != '图片' ? 'class="hidden"' : ''} alt="">
                            <video src="" controls="controls" ${ele.advertisingAttribute != '视频' ? 'class="hidden"' : ''}></video>
                           </div>`
        });
        $(`.${theElement}`).empty();
        $(`.${theElement}`).html(swiperList);
        var publis = carousel.render({
            elem: `#${IdELement}`,
            width: '100%',//设置容器宽度
            arrow: 'always', //始终显示箭头
            height: '100%',
            interval: 5000
        });
    };
    
});
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
  // 收起左边账号事件
  $('.sidebar .layui-icon-left').click(function () {
    $('.aside-left').slideUp(function () {
        $('.layui-icon-right').show();
    });
    $('.layui-icon-right').click(function () {
        $('.aside-left').slideDown(function () {
            $('.layui-icon-right').hide();
        });
    });
    // $('.aside-left').width(0)
});
    // 查询
    $('.keyBtn').click(function () {
        advertisingLis.reload({
            where: {
                condition: startTime,
                conditionTwo: endTime,
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
        elem: '#machineListData',
        url: '/api/publicized/selectPublicize',
        method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
        cols: [[
            { type: 'checkbox', },
            { field: 'number', width: 210, title: '发布单号' },
            {
                field: 'advertisingTime', width: 120, title: '广告时长(秒)', templet: function (d) {
                    var advertisingTime = 0;
                    d.publicizeAdvert.forEach((item, index) => {
                        return advertisingTime += Number(item.time);
                    });
                    
                    return advertisingTime
                }
            },
            {
                field: 'advertisingSize', width: 120, title: '广告大小(MB)', templet: function (d) {
                    var advertisingSize = 0
                    d.publicizeAdvert.forEach((item, index) => {
                        return advertisingSize += Number(item.size);
                    });
                    // console.log(advertisingSize)
                    advertisingSize=advertisingSize.toFixed(2)
                    return advertisingSize
                }
            },
            {
                field: 'attribute', width: 150, title: '审核状态', templet: function (d) {
                    return d.attribute == 0 ? '未审核' : d.attribute == 1 ? '待审核' : d.attribute == 2 ? '审核通过' : '审核不通过'
                }
            },
            { field: 'amendTime', width: 130, title: '广告位', },
            { field: 'creationTime', width: 210, title: '发布时间', sort: true },
            { field: 'offTime', width: 210, title: '下架时间', sort: true },
            { field: 'addUser', width: 150, title: '发布人', },
            { field: 'operation', right: 0, width: 380, title: '操作', toolbar: '#barDemo', fixed: 'right' },
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
                window.parent.location.href = "login.html";
            } else {

            }

        }
    });

    // 广告预览轮播
    var carousel = layui.carousel;
    // 监听操作点击事件
    var advertisingDetailsList = null;
    var numderID = null;
    var durationData = null;
    table.on('tool(machineListData)', function (obj) {
        console.log(obj)
        numderID = obj.data.number;
        if (obj.event === 'preview') {
            console.log(obj.data.publicizeAdvert)
            durationData = obj.data.publicizeAdvert;
            publisSwiperCont(obj.data.publicizeAdvert, 'previewSwiperCont', 'swiperDetails', durationData);
            var options = {
                'interval': durationData[0].time * 1000
            }
            console.log(options)
            publis.reload(options);
            popupShow('preview', 'previewContnet');
            // ins.reload('swiperDetails');
        } else if (obj.event === 'toView') {
            popupShow('toViveCont', 'toViveBox')
        } else if (obj.event === 'details') {
            advertisingDetailsList = obj.data.publicizeAdvert;
            console.log(advertisingDetailsList);
            advertisingDetails(advertisingDetailsList, 'detailsListBox')
            popupShow('advertisingDetails', 'detailsBox');
        }else if(obj.event){
            popupShow('machineDetailsCont', 'machineDetailsBox')
        }

    });
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
        // publis = null;
        if (publis) {
            publis.reload({ autoplay: false });
        }

    });
    // 广告素材预览
    $('.detailsListBox').on('click', '.listPreview .previewBtn', function () {
        // alert($(this).attr('previewIndex'));
        $('.MateriaBody .materiaImg img').attr('src', advertisingDetailsList[$(this).attr('previewIndex')].img)
        popupShow('materialPreview', 'MateriaBox');

    });
    // 广告详情修改排序
    $('.detailsListBox').on('click', '.listLift img', function () {
        console.log($(this).attr('ImgIndex'));
        var ImgIndex = $(this).attr('ImgIndex');
        var ImgList_1 = advertisingDetailsList[ImgIndex - 1];
        advertisingDetailsList[ImgIndex - 1] = advertisingDetailsList[ImgIndex];
        advertisingDetailsList[ImgIndex] = ImgList_1;
        advertisingDetails(advertisingDetailsList, 'detailsListBox')
    });
    // 广告详情修改失去焦点事件
    $('.detailsListBox').on('blur', '.listSize input', function () {
        if ($(this).val() > 0 & $(this).val() != '') {
            advertisingDetailsList[$(this).attr('inputIndex')].time = $(this).val();
        } else {
            $(this).val(advertisingDetailsList[$(this).attr('inputIndex')].time);
        }

        // advertisingDetails(advertisingDetailsList,'detailsListBox');
    });

    // 广告详情确定修改事件
    $('.detailsFooter .confirmBtn').click(function () {
        var editDetailsList = [];
        advertisingDetailsList.forEach((item, index) => {
            var editObj = {
                sort: index + 1,
                time: item.time,
                vid: item.vid
            }
            editDetailsList.push(editObj)
        });
        setTimeout(() => {
            $.ajax({
                type: 'post',
                url: '/api/publicized/updatePublicize',
                processData: false,
                contentType: false,
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                data: JSON.stringify({
                    number: numderID,
                    publicizeAdvert: editDetailsList
                }),
                success: function (res) {
                    console.log(res)
                    if (res.code == 200) {
                        popupHide('advertisingDetails', 'detailsBox');
                        layer.msg('修改成功', { icon: 1, anim: 1 });
                        editDetailsList = [];
                    } else if (res.code == 403) {
                        window.parent.location.href = "login.html";
                    } else {
                        layer.msg(res.message, { icon: 7 });
                    }
                }
            })
        }, 1000)
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
        $('.publishLast').css('color', '#909399');
        publis.reload({ autoplay: false });
    })
    var keyStartTiem = '';
    var keyEndTiem = '';
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
    $('.addQueryBtn').click(function () {
        ChooseMaterial.reload({
            where: {
                startTime: keyStartTiem,
                endTime: keyEndTiem,
                keyWord: $('input[name="keyName"]').val()
            }
        })
    })
    // 添加素材
    var ChooseMaterial = null;
    // 添加素材列表
    var addMaterList = [];
    $('.setAdvertising .addBtn').click(function () {
        popupShow('pubilshMaterialCont','pubilshMaterialBox');
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
                    { field: 'name', width: 150, title: '素材名称', },
                    { field: 'size', width: 100, title: '大小(MB)', },
                    { field: 'duration', width: 120, title: '播放时长(秒)', },
                    {
                        field: 'advertisingAttribute', width: 150, title: '素材属性', templet: function (d) {
                            return d.advertisingAttribute == 0 ? '图片' : '视频'
                        }
                    },
                    { field: 'creationTime', width: 160, title: '上传时间', sort: true },
                    { field: 'addUser', width: 150, title: '上传人 ', },
                ]],
                page: true,
                id: 'chooesId',
                height: 450,
                loading: true,
                width: 1100,
                request: {
                    'pageName': 'pageNum',
                    'limitName': 'pageSize'
                },
                where: {
                    status: '1',
                    checkStatus: '2'
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
                        window.parent.location.href = "login.html";
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
    $('.SetContList').on('click', '.setMateraialList .delBtn', function () {
        console.log($(this).attr('delindex'));
        addMaterList.splice($(this).attr('delindex'), 1);
        materaialMethods(addMaterList, 'SetContList');
    })
    // 输入框失去焦点事件
    $('.SetContList').on('blur', '.duration input', function () {
        addMaterList[$(this).attr('index')].inputVal = $(this).val();
        console.log(addMaterList);
    });

    // 发布广告删除删除事件
    // $('.SetContList').on('click')
    // 发布广告操作
    // 广告设置下
    $('.setAdvertising .nextBtn').click(function () {
        $('.stepsTwo').css('borderColor', '#e6a23c');
        $('.stepsTwo>div').css('color', '#e6a23c');
        $('.publishLast').css('color', '#e6a23c');
        let InputFlaf = addMaterList.every((item, index) => {
            return item.inputVal > 0 & item.inputVal != ''
        })
        if (addMaterList.length > 0) {
            if (InputFlaf) {
                publisSwiperCont(addMaterList, 'swiperList', 'publisSwiper', addMaterList);
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
        console.log(addList)
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
                                    <div>${ele.advertisingAttribute==0?'图片':'视频'}</div>
                                </div>
                                <div class="SetType">
                                    <div>${ele.advertisingType == 0 ? '横屏' : '竖屏'}</div>
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
        popupShow('pubilshSweet','sweetBox')
    });
    // 确定发布
    $('.pubilshSweet .confirmBtn').click(function () {
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon')
        var confirmList = [];
        addMaterList.forEach((item, index) => {
            var confirmObj = {
                sort: index + 1,
                time: item.inputVal,
                vid: item.vId
            }
            confirmList.push(confirmObj)
        });
        setTimeout(() => {
            if (confirmList.length == addMaterList.length) {
                $.ajax({
                    type: 'post',
                    url: '/api/publicized/savePublicize',
                    processData: false,
                    contentType: false,
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    data: JSON.stringify({
                        publicizeAdvert: confirmList
                    }),
                    success: function (res) {
                        $('.mask').fadeOut();
                        $('.maskSpan').removeClass('maskIcon')
                        if (res.code == 200) {
                            popupHide('pubilshSweet', 'sweetBox');
                            popupHide('releaseAdvertising', 'publishBox')
                            layer.msg('发布成功', { icon: 1, });
                            addMaterList = [];
                            advertisingLis.reload({
                                where: {}
                            })
                        } else if (res.code == 403) {
                            window.parent.location.href = "../login/login.html";
                        } else {
                            layer.msg(res.message, { icon: 7 });
                        }
                    }

                })
            } else {
                layer.msg('出错！请重新发布', { icon: 7 });
            }
        }, 1000);
    });


    // 推送广告部分
    var machineAdvertising = table.render({
        elem: '#machineDetailsList',
        url: `/api/machine/getMachineList`,
        method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
        cols: [[
            { type: 'checkbox', },
            { field: 'info', width: 200, title: '售货机信息'},
            { field: 'location', width: 180, title: '地址', },
            { field: 'userNum', width: 250, title: '商户账号', },
            { field: 'actionTime', width: 200, title: '激活时间', },
            { field: 'description', width: 180, title: '描述', sort: true },
        ]],
        page: true,
        id: 'machineAdvertisingList',
        loading: true,
        limits: [10, 20, 50],
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
                    "msg": res.message, //解析提示文本
                    "count": res.data.total, //解析数据长度
                    "data": res.data.list //解析数据列表
                };
            } else {
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.message,   //解析提示文本
                }
            }

        },
        where: {
            condition: '1',
            conditionTwo:'1',
            conditionFour:'1'
          },
        response: {
            statusCode: 200 //规定成功的状态码，默认：0
        },
        done: function (res) {
            if (res.code == 403) {
                window.parent.location.href = "../login/login.html";
            }
        }
        // skin: 'nob'
    });
        //推送广告查询
        $('.machineDetailsCont .machineKeyBtn').click(function(){
            machineAdvertising.reload({
                where:{
                    conditionSix:$('.machineDetailsCont input[name="machineKey"]').val()
                }
            })
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
    // 广告详情函数
    function advertisingDetails(ListData, element) {
        var detailsList = '';
        $.each(ListData, function (index, ele) {
            detailsList += ` <li class="detailsList">
                                <div class="listSort">
                                    <span>${index + 1}</span>
                                </div>
                                <div class="listImg">
                                    <img src="${ele.img}"
                                        alt="">
                                </div>
                                <div class="listName">
                                    <span>${ele.name}</span>
                                </div>
                                <div class="listSize">
                                    <input type="number" inputIndex="${index}" value="${ele.time}">
                                </div>
                                <div class="listAttribute">
                                    <span>${ele.advertisingAttribute == 0 ? '图片' : '视频'}</span>
                                </div>
                                <div class="listType">
                                    <span>${ele.advertisingType == 0 ? '横屏' : '竖屏'}</span>
                                </div>      
                                <div class="listSize">
                                    <span>${ele.size}</span>
                                </div>
                                <div class="uploadName">
                                    <span>${ele.addUser}</span>
                                </div>
                                <div class="listPreview">
                                    <button class="layui-btn layui-btn-normal  btn previewBtn " previewIndex="${index}">
                                        <span>预览</span>
                                    </button>
                                </div>
                                <div class="listLift" >
                                    <img src="../../img/lift.png" alt="" ${index == 0 ? 'class="hidden"' : ''} ImgIndex="${index}">
                                </div>
                            </li>`
        });
        $(`.${element}`).empty();
        $(`.${element}`).html(detailsList);
    };

    // 发布广告轮播图
    var publis = null;
    function publisSwiperCont(list, theElement, IdELement, durationData) {
        var swiperList = '';
        $.each(list, function (index, ele) {
            swiperList += ` <div>
                            <img src="${ele.img}"  ${ele.advertisingAttribute != 0 ? 'class="hidden"' : ''} alt="">
                            <video src="${ele.img}" controls="controls" ${ele.advertisingAttribute != 1 ? 'class="hidden"' : ''}></video>
                           </div>`
        });
        $(`.${theElement}`).empty();
        $(`.${theElement}`).html(swiperList);
        publis = carousel.render({
            elem: `#${IdELement}`,
            width: '100%',//设置容器宽度
            arrow: 'always', //始终显示箭头
            height: '100%',
            interval: 3000,
            autoplay: true,
        });
        var options = null;
        carousel.on(`change(${IdELement})`, function (obj) { //test1来源于对应HTML容器的 lay-filter="test1" 属性值
            console.log(obj.index); //当前条目的索引
            setTimeout(() => {
                options = {
                    'interval': durationData[obj.index].time * 1000 || durationData[obj.index].inputVal * 1000
                }
                console.log(options)
                publis.reload(options);
            }, 500)

        });

    };

    // 提交审核
    $('.submitAuditBtn').click(function () {
        var submitCheckStatus = table.checkStatus('advertisingData');
        console.log(submitCheckStatus)
        checkList = [];
        if (submitCheckStatus.data.length > 0) {
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon')
            submitCheckStatus.data.forEach((item, index) => {
                var submitObj = {
                    number: item.number,
                    status: '1'
                }
                checkList.push(submitObj)
            });
            setTimeout(() => {
                auditMethods('1', checkList);
            }, 1000)
        } else {
            layer.msg('请选择需要提交审核的素材', { icon: 7, anim: 1 });
        }
    });
    // 审核通过
    $('.approvedBtn').click(function(){
        var approveCheckStatus = table.checkStatus('advertisingData');
        approveList = [];
        if (approveCheckStatus.data.length > 0) {
            layer.confirm('确定审核通过？', function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon')
                approveCheckStatus.data.forEach((item, index) => {
                    var approveObj = {
                        number: item.number,
                        status: '2'
                    }
                    approveList.push(approveObj)
                });
                setTimeout(() => {
                    auditMethods('0',approveList)
                },1000)
            })

        } else {
            layer.msg('请选择需要通过审核的素材', { icon: 7, anim: 1 });
        }
    });
    // 审核不通过
    $('.noPassBtn').click(function(){
        var noPassCheckStatus=table.checkStatus('advertisingData');
        noPassList=[];
        if (noPassCheckStatus.data.length > 0){
            layer.confirm('确定审核不通过？', function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                noPassCheckStatus.data.forEach((item, index) => {
                    var noPassObj = {
                        number: item.number,
                        status: '3'
                    }
                    noPassList.push(noPassObj)
                });
                setTimeout(() => {
                    auditMethods('0',noPassList)
                },1000)
            })
        }else{
            layer.msg('请选择需要不通过审核的素材', { icon: 7, anim: 1 });
        }
    })
    // 提交审核，审核通过，审核不通过方法
    function auditMethods(type, data) {
        $.ajax({
            type: 'post',
            url: '/api/publicized/updateStatus',
            headers: {
                "Content-Type": "application/json",
                token,
            },
            data:JSON.stringify({
                data,
                type:type
            }),
            success:function(res){
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                if (res.code == 200) {
                    layer.msg(res.message, { icon: 1 });
                    advertisingLis.reload({
                        where: {
                        }
                    })                           
                } else if (res.code == 201) {
                    layer.msg(res.message, { icon: 2, anim: 1 });
                } else if (res.code == 202) {
                    layer.msg(res.message, { icon: 7 });
                    advertisingLis.reload({
                        where: {
                        }
                    });                           
                } else if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        })

    }

    // 广告推送
    $('.machineDetailsCont .determineBtn').click(function(){
        var pishList=table.checkStatus('machineAdvertisingList');
        console.log(pishList);
        if(pishList.data.length>0){
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon')
            var pushStr=[];
            pishList.data.forEach((item,index)=>{
                pushStr.push(item.machineId)
            })  
            pushStr=pushStr.toString();
            setTimeout(()=>{
                $.ajax({
                    type:'post',
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    url:'/api/pushAd',
                    data:JSON.stringify({
                        number:numderID,
                        machine:pushStr
                    }),
                    success:function(res){
                        $('.mask').fadeOut();
                        $('.maskSpan').removeClass('maskIcon');
                        popupHide('machineDetailsCont','machineDetailsBox');
                        if(res=='success'){
                            layer.msg('推送成功', { icon: 1 });
                        }else{
                            layer.msg('推送失败', { icon: 2 });
                        }
                    }
                })
            },1000)
        }else{       
            layer.msg('请选择售货机', { icon: 7 });
        }
        
    })
});
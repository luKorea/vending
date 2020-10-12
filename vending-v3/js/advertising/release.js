import '../../MyCss/advertising/release.css'
layui.use(['element', 'laydate', 'table', 'carousel', 'tree', 'form'], function () {
    var token = sessionStorage.token,
        tree = layui.tree,
        form = layui.form;
    var startTime = '';
    //结束时间
    var endTime = '';
    // 日期选择
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test6',
        range: true,
        done: function (value, date, endDate) {
            // console.log(value); //得到日期生成的值，如：2017-08-18
        var timerKey = value.split(' - ');
            // console.log(timerKey);
            startTime = timerKey[0];
            endTime = timerKey[1];
        }
    });
    // 收起左边账号事件
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.on-left').show()
    });
    $('.on-left').click(function () {
        $('.left-mian').show();
        $('.on-left').hide()
    })
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
            { field: 'number', width: 300, title: '发布单号', align: 'center' },
            {
                field: 'advertisingTime', align: 'center', width: 120, title: '广告时长(秒)', templet: function (d) {
                    var advertisingTime = 0;
                    d.publicizeAdvert.forEach((item, index) => {
                        return advertisingTime += Number(item.time);
                    });

                    return advertisingTime
                }
            },
            {
                field: 'advertisingSize', align: 'center', width: 160, title: '广告大小(MB)', templet: function (d) {
                    var advertisingSize = 0
                    d.publicizeAdvert.forEach((item, index) => {
                        return advertisingSize += Number(item.size);
                    });
                    advertisingSize = advertisingSize.toFixed(2)
                    return advertisingSize
                }
            },
            {
                field: 'attribute', align: 'center', width: 180, title: '审核状态', templet: function (d) {
                    return d.attribute == 0 ? '未审核' : d.attribute == 1 ? '待审核' : d.attribute == 2 ? '审核通过' : '审核不通过'
                }
            },
            // { field: 'amendTime', width: 130, title: '广告位', },
            { field: 'addUser', width: 180, title: '创建人', align: 'center', },
            { field: 'creationTime', width: 230, title: '创建时间', align: 'center' },
            
            { field: 'operation', right: 0, align: 'center', width: 380, title: '操作', toolbar: '#barDemo', fixed: 'right' },
        ]],
        page: true,
        id: 'advertisingData',
        loading: true,
        height: 'full-210',
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            conditionThree: sessionStorage.machineID
        },
        parseData: function (res) {
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
            permissions();
            if (res.code == 403) {
                window.parent.location.href = "login.html";
            } else if (res.code == 405) {
                $('.hangContent').show();
            }

        }
    });

    // 广告预览轮播
    var carousel = layui.carousel;
    // 监听操作点击事件
    var advertisingDetailsList = null;
    var numderID = null;
    var durationData = null;
    // 查看购金机列表
    var machineList1 = null;
    table.on('tool(machineListData)', function (obj) {
        numderID = obj.data.number;
        if (obj.event === 'preview') {
            durationData = obj.data.publicizeAdvert;
            publisSwiperCont(obj.data.publicizeAdvert, 'previewSwiperCont', 'swiperDetails', durationData);
            var options = {
                'interval': durationData[0].time * 1000
            }
            publis.reload(options);
            popupShow('preview', 'previewContnet');
            // ins.reload('swiperDetails');
        } else if (obj.event === 'toView') {
            machineDetailsFun(numderID)

            popupShow('toViveCont', 'toViveBox')
        } else if (obj.event === 'details') {
            advertisingDetailsList = obj.data.publicizeAdvert;
            advertisingDetails(advertisingDetailsList, 'detailsListBox')
            popupShow('advertisingDetails', 'detailsBox');
        } else if (obj.event == 'push') {
            if (obj.data.merchantId != sessionStorage.machineID) {
                layer.msg('不能使用下级商户广告', { icon: 7 });
                return;
            }
            if (!machineAdvertising) {
                machineAdvertisingFun();
            }
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
        if (!editFlag) {
            layer.msg('您没有编辑广告的权限', { icon: 7 });
            return;
        }
        var editDetailsList = [];
        advertisingDetailsList.forEach((item, index) => {
            var editObj = {
                sort: index + 1,
                time: item.time,
                vid: item.vid
            }
            editDetailsList.push(editObj)
        });
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
                    if (res.code == 200) {
                        popupHide('advertisingDetails', 'detailsBox');
                        layer.msg('修改成功', { icon: 1, });
                        editDetailsList = [];
                    } else if (res.code == 403) {
                        window.parent.location.href = "login.html";
                    } else {
                        layer.msg(res.message, { icon: 7 });
                    }
                }
            })
    })

    function machineDetailsFun(id) {
        machineList1 = table.render({
            elem: '#machine1',
            url: '/api/publicized/getPublicizedMachine',
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'number', width: 150, title: '售货机编号', align: 'center' },
                { field: 'info', width: 180, title: '售货机名', align: 'center', },
                { field: 'location', width: 250, title: '机售货机地址', align: 'center', },
                { field: 'operatio', width: 120, title: '操作', toolbar: '#machineDemo', align: 'center', },

            ]],
            page: true,
            id: 'machineDataDetail',
            skin: 'nob',
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                condition: numderID
            },
            parseData: function (res) {
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
                    window.parent.location.href = "login.html";
                }
            }
        });
    }


    // 高德地图
    function ScottMethods(longitude, latitude, title) {
        var map = new AMap.Map('machineScottBody', {
            resizeEnable: true,
            center: [longitude, latitude],
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
            content: "<div class='info'>" + title + "</div>", //设置文本标注内容
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
            // console.log(value); //得到日期生成的值，如：2017-08-18
            timerKey = value.split(' - ');
            // console.log(timerKey);
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
        popupShow('pubilshMaterialCont', 'pubilshMaterialBox');
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
                    { field: 'img', width: 80, title: '微缩图', templet: "#imgtmp" , align: 'center'},
                    { field: 'name', width: 150, title: '素材名', align: 'center', },
                    { field: 'size', width: 100, title: '大小(MB)', align: 'center', },
                    { field: 'duration', width: 120, title: '播放时长(秒)', align: 'center', },
                    {
                        field: 'advertisingAttribute', align: 'center', width: 150, title: '素材属性', templet: function (d) {
                            return d.advertisingAttribute == 0 ? '图片' : '视频'
                        }
                    },
                    { field: 'addUser', width: 150, align: 'center', title: '创建人 ', },
                    { field: 'creationTime', width: 160, title: '创建时间', align: 'center' },
                    
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
                    checkStatus: '2',
                    merchantId: sessionStorage.machineID
                },
                parseData: function (res) {
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
                        window.parent.location.href = "login.html";
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
        var list_1 = addMaterList[sortingIndex - 1];
        addMaterList[sortingIndex - 1] = addMaterList[sortingIndex];
        addMaterList[sortingIndex] = list_1;
        materaialMethods(addMaterList, 'SetContList');
    });
    // 删除广告素材
    $('.SetContList').on('click', '.setMateraialList .delBtn', function () {
        addMaterList.splice($(this).attr('delindex'), 1);
        materaialMethods(addMaterList, 'SetContList');
    })
    // 输入框失去焦点事件
    $('.SetContList').on('blur', '.duration input', function () {
        addMaterList[$(this).attr('index')].inputVal = $(this).val();
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
                                    <div>${ele.advertisingAttribute == 0 ? '图片' : '视频'}</div>
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
        popupShow('pubilshSweet', 'sweetBox')
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
                vid: item.vid
            }
            confirmList.push(confirmObj)
        });
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
                        publicizeAdvert: confirmList,
                        merchantId: sessionStorage.machineID
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
                            window.parent.location.href = "login.html";
                        } else {
                            layer.msg(res.message, { icon: 7 });
                        }
                    }

                })
            } else {
                layer.msg('出错！请重新发布', { icon: 7 });
            }
    });


    // 推送广告部分
    var machineAdvertising = null;
    function machineAdvertisingFun() {
        machineAdvertising = table.render({
            elem: '#machineDetailsList',
            url: `/api/machine/getMachineList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { type: 'checkbox', },
                { field: 'info', width: 200, title: '售货机信息', align: 'center' },
                { field: 'location', width: 300, title: '地址', align: 'center', },
                { field: 'merchantName', width: 150, title: '所属商户', align: 'center', },
                { field: 'description', width: 180, title: '描述', align: 'center' },
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
                actionStatus: '1',
                merchantId: sessionStorage.machineID
            },
            response: {
                statusCode: 200 //规定成功的状态码，默认：0
            },
            done: function (res) {
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
            // skin: 'nob'
        });
    }

    //推送广告查询
    $('.machineDetailsCont .machineKeyBtn').click(function () {
        machineAdvertising.reload({
            where: {
                keyword: $('.machineDetailsCont input[name="machineKey"]').val()
            }
        })
    });
    // 发布广告弹窗事件
    $('.publicAdvertisingBtn').click(function () {
        if (!addFlag) {
            layer.msg('您没有添加广告的权限', { icon: 7 });
            return;
        }
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
            // console.log(obj.index); //当前条目的索引
            setTimeout(() => {
                options = {
                    'interval': durationData[obj.index].time * 1000 || durationData[obj.index].inputVal * 1000
                }
                publis.reload(options);
            }, 500)

        });

    };

    // 提交审核
    $('.submitAuditBtn').click(function () {
        var submitCheckStatus = table.checkStatus('advertisingData');
        var checkList = [];
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
                auditMethods('1', checkList,'/api/publicized/checkStatus');
        } else {
            layer.msg('请选择需要提交审核的素材', { icon: 7, });
        }
    });
    // 审核通过
    $('.approvedBtn').click(function () {
        if (!addFlag) {
            layer.msg('您没有审核广告的权限', { icon: 7 });
            return;
        }
        var approveCheckStatus = table.checkStatus('advertisingData');
      var  approveList = [];
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
                    auditMethods('0', approveList,'/api/publicized/updateStatus')
            })

        } else {
            layer.msg('请选择需要通过审核的素材', { icon: 7, });
        }
    });
    // 审核不通过
    $('.noPassBtn').click(function () {
        if (!addFlag) {
            layer.msg('您没有审核广告的权限', { icon: 7 });
            return;
        }
        var noPassCheckStatus = table.checkStatus('advertisingData');
      var  noPassList = [];
        if (noPassCheckStatus.data.length > 0) {
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
                    auditMethods('0', noPassList,'/api/publicized/updateStatus')
            })
        } else {
            layer.msg('请选择需要不通过审核的素材', { icon: 7 });
        }
    })
    // 提交审核，审核通过，审核不通过方法
    function auditMethods(type, data,url) {
        $.ajax({
            type: 'post',
            url,
            headers: {
                "Content-Type": "application/json",
                token,
            },
            data: JSON.stringify({
                data,
                type: type
            }),
            success: function (res) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                if (res.code == 200) {
                    layer.msg(res.message, { icon: 1 });
                    advertisingLis.reload({
                        where: {
                        }
                    })
                } else if (res.code == 201) {
                    layer.msg(res.message, { icon: 2, });
                } else if (res.code == 202) {
                    layer.msg(res.message, { icon: 7 });
                    advertisingLis.reload({
                        where: {
                        }
                    });
                } else if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        })

    }

    // 广告推送
    $('.machineDetailsCont .determineBtn').click(function () {
        var pishList = table.checkStatus('machineAdvertisingList');
        if (pishList.data.length > 0) {
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon')
            var pushStr = [];
            pishList.data.forEach((item, index) => {
                pushStr.push(item.machineId)
            })
            pushStr = pushStr.toString();
            $.ajax({
                type: 'post',
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                url: '/api/pushAd',
                data: JSON.stringify({
                    number: numderID,
                    machine: pushStr
                }),
                success: function (res) {
                    $('.mask').fadeOut();
                    $('.maskSpan').removeClass('maskIcon');
                    popupHide('machineDetailsCont', 'machineDetailsBox');
                    layer.msg('推送成功', { icon: 1 });
                }, error: function (err) {
                    layer.msg('服务器请求超时', { icon: 2 });
                }
            })
        } else {
            layer.msg('请选择售货机', { icon: 7 });
        }

    });
    // 广告推送到所有售货机
    $('.machineDetailsCont .allDetermineBtn').click(function () {
        layer.confirm('确认推送广告到所有售货机？', function (index) {
            layer.close(index);
            $.ajax({
                type: 'post',
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                url: '/api/pushAd',
                data: JSON.stringify({
                    number: numderID,
                }),
                success: function (res) {
                    popupHide('machineDetailsCont', 'machineDetailsBox');
                    layer.msg('推送成功', { icon: 1 });
                }, error: function (err) {
                    layer.msg('服务器请求超时', { icon: 2 });
                }
            })
        })
    })
    var dataList1 = null;
    var dataList = dataList1 = treeList();
    treeFun(tree, 'test1', advertisingLis, dataList, 'conditionThree');
    table.on('tool(machine1)', function (obj) {
        ScottMethods(obj.data.longitude, obj.data.latitude, obj.data.location);
        popupShow('ScottCont', 'scottBox')
    });
    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });
    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            event.preventDefault(); //阻止默认刷新
            location.reload();
        }
    });

    var checkID = null,
        pushList = null;   //推送广告列表
    $('.pushReleaseBtn').click(function () {
        pushList = [];
        checkID = table.checkStatus('advertisingData');
        checkID.data.forEach((item, index) => {
            if (item.attribute == 2) {
                pushList.push(item.number)
            }
        });
        if (pushList.length == 0) {
            layer.msg('请选择审核通过的广告,非审核通过的广告不能推送', { icon: 7 });
            return;
        } else {
            popupShow('chooseLower', 'chooseBox');
            leg.tree({
                ele: ".treeList",//选者
                data: dataList1,//数据
                cascade: false,//级联
            });
            $.each($(".treeList input"), function () {
                if (checkID.data[0].merchantId == $(this).val()) {
                    $(this).prop('disabled', true);
                    return;
                }
            })
        }
    });



    // treeFunCheck(tree, 'testGoodsCheck', advertisingLis, dataList1, 'merchantId', layer)

    //   确定推送
    var role = null;
    $('.RdetermineBtn').click(function () {
        role = leg.getCheckedNodes().map(Number)
        // return;
        // var checkedData = tree.getChecked('treelistCheck');
        // role = getChildNodes(checkedData, []);
        // role.shift()
        if (role.length == 0) {
            layer.msg('请选择要推送的商户', { icon: 7 })
            return;
        }
        popupShow('PushMandatory', 'MandatoryBox')
    });


    // 推送列表
    $('.RpushListBtn').click(function () {
        popupShow('topGoodsList', 'topBox')
    })
    $('.mandatroFooter div').click(function () {
      var  PType = $(this).attr('Ptype');
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var RData = JSON.stringify({
            merchantId: sessionStorage.machineID,
            merchantList: role,
            numbers: pushList,
            type: PType
        })
        loadingAjax('/api/publicized/sendMerchantAd', 'post', RData, sessionStorage.token, 'mask', 'chooseLower', 'chooseBox', layer).then((res) => {
            popupHide('PushMandatory', 'MandatoryBox')
            layer.msg(res.message, { icon: 1 })
        }).catch((err) => {
            $('.mask').fadeOut();
            $('.maskSpan').removeClass('maskIcon');
            popupHide('PushMandatory', 'MandatoryBox')
            layer.msg(err.message, { icon: 2 })
        })
    });
    var releaseHistoryList = null;
    function functionReleaseFun() {
        releaseHistoryList = table.render({
            elem: '#parentTableTest',
            url: '/api/publicized/getAdHistory',
            height: 500,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { type: 'checkbox', },
                { field: 'number', width: 190, title: '发布单号', templet: "#Listimgtmp", align: 'center' },
                {
                    field: 'duration', width: 160, title: '广告时长(秒)', align: 'center', templet: function (d) {
                        var advertisingTime = 0;
                        d.advertising.forEach((item, index) => {
                            return advertisingTime += Number(item.time);
                        });
                        return advertisingTime
                    }
                },
                {
                    field: 'size', width: 160, title: '广告大小(MB)', align: 'center', templet: function (d) {
                        var advertisingSize = 0;
                        d.advertising.forEach((item, index) => {
                            return advertisingSize += Number(item.size);
                        });
                        advertisingSize = advertisingSize.toFixed(2)
                        return advertisingSize
                    }

                },
                { field: `topMerchant`, width: 140, title: '推送商户', align: 'center', },
                { field: `targetMerchant`, width: 160, title: '接收商户', align: 'center', },
                {
                    field: 'received', width: 100, title: '接收状态 ', align: 'center', templet: function (d) {
                        return d.received == 0 ? '未接收' : '已接收'
                    }
                },
                {
                    field: 'sendTime', width: 200, title: '推送时间 ', align: 'center', templet: function (d) {
                        var myDate = new Date(d.sendTime);
                        var y = myDate.getFullYear();
                        var m = myDate.getMonth() + 1;
                        var d = myDate.getDate();
                        var h = myDate.getHours();
                        var min = myDate.getMinutes();
                        var s = myDate.getSeconds();
                        return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
                    }
                },
                { field: 'operatio', width: 80, title: '操作', align: 'center', toolbar: '#pushReleaseDemo', },
            ]],
            id: 'parentTableId',
            page: true,
            loading: true,
            limits: [10, 20, 50],
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                condition: '0',
                conditionTwo: '0',
                conditionThree: '0'
            },
            parseData: function (res) {
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
                    window.parent.location.href = "login.html";
                };
                for (var i in res.data) {
                    var item = res.data[i];
                    if (item.childMerchantId != sessionStorage.machineID || item.received == 1) {// 这里是判断需要禁用的条件（如：状态为0的）
                        // checkbox 根据条件设置不可选中
                        $('.list_table1 tr[data-index=' + i + '] input[type="checkbox"]').prop('disabled', true);
                        form.render();// 重新渲染一下
                    }
                }
            }
        })
    }
    $('.RpushListBtn').click(function () {
        popupShow('topGoodsList', 'topBox')
        if (!releaseHistoryList) {
            functionReleaseFun();
        }
    });
    // 接收
    $('.pushReleaseListBtn').click(function () {
        var receiveList = table.checkStatus('parentTableId');
        var receiveArray = [];
        if (receiveList.data.length > 0) {
            receiveList.data.forEach((item, index) => {
                if (item.childMerchantId == sessionStorage.machineID && item.received == 0) {

                    receiveArray.push(item.tempNumber)
                }
            });
            if (receiveArray.length == 0) {
                layer.msg('没有能接收的广告', { icon: 7 });
                return;
            }
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            var numberArr = JSON.stringify({
                numbers: receiveArray
            })
            loadingAjax('/api/publicized/getMerchantAd', 'post', numberArr, sessionStorage.token, 'mask', 'topGoodsList', 'topBox', layer).then((res) => {
                layer.msg(res.message, { icon: 1 });
                advertisingLis.reload({
                    where: {}
                });
                releaseHistoryList.reload({
                    where: {}
                })
            }).catch((err) => {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg(err.message, { icon: 2 })

            })
        } else {
            layer.msg('请选择接收的广告', { icon: 7 })
        }
    });

    // 查询

    // 推送列表查询
    $('.topBody .pushQueryBtn').click(function () {
        releaseHistoryList.reload({
            where: {
                condition: $('.topBody select[name="receiveStatus"]').val() || '0',  //是否接收
                conditionTwo: $('.topBody select[name="receiveType"]').val() || '0',//发送接收
                conditionThree: $('.topBody select[name="mandatory"]').val() || '0', //是否强制
            }
        })
    });

    //   预览推送广告   
    table.on('tool(parentTableTest)', function (obj) {
        durationData = obj.data.advertising;
        publisSwiperCont(obj.data.advertising, 'previewSwiperCont', 'swiperDetails', durationData);
        var options = {
            'interval': durationData[0].time * 1000
        }
        publis.reload(options);
        popupShow('preview', 'previewContnet');
    });
    $('.chooseLower .chooseCan').click(function () {
        popupHide('chooseLower', 'chooseBox')
    });


    var addFlag = false,
        editFlag = false,
        delFlag = false,
        fourFlag = false,
        fiveFlag = false;
    //增,改,审,发,接
    permissionsVal(383, 384, 386, 404, 406).then(res => {
        console.log(res)
        addFlag = res.addFlag;
        editFlag = res.editFlag
        delFlag = res.delFlag;
        fourFlag = res.fourFlag;
        fiveFlag = res.fiveFlag;
        permissions();
    }).catch(err => {
        layer.msg('服务器请求超时', { icon: 7 })
    });
    function permissions() {
        addFlag ? $('.publicBtn').removeClass('hide') : $('.publicBtn').addClass('hide');
        delFlag ? $('.auditBtnTwo').removeClass('hide') : $('.auditBtnTwo').addClass('hide');
        fourFlag ? $('.pushBtn').removeClass('hide') : $('.pushBtn').addClass('hide');
        fiveFlag ? $('.pushListBtn').removeClass('hide') : $('.pushListBtn').addClass('hide');
    };
});
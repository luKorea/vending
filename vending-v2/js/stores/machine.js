import '../../MyCss/stores/machine.css'
import {provinceChange,cityChange} from '../../assets/public/selectMore'
// console.log()
layui.use(['table', 'form', 'layer', 'laydate', 'tree'], function () {
    // console.log(provinceChange)
    // 收起
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.on-left').show()
    });
    $('.on-left').click(function () {
        $('.left-mian').show();
        $('.on-left').hide()
    })
    // 获取上级商户列表
    var merchantsListData = merchantsListMian('');
    console.log(merchantsListData)
    var table = layui.table,
        token = sessionStorage.token,
        layer = layui.layer,
        form = layui.form,
        tree = layui.tree,
        laydate = layui.laydate,
        machineList = table.render({
            elem: '#machineTable',
            url: `/api/machine/getMachineList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {
                    field: 'info', width: 330, title: '终端信息', align: 'center',templet: function (d) {  
                        return d.info? `<div>${d.info}</div>`:`<div><span style="color:red;">*</span>(售货机为新上线机器，请编辑售货机信息！)</div>`
                    }  
                },
                { field: 'location', width: 350, title: '地址',templet:function(d){
                    return d.location?d.location:' - '
                } },
                {
                    field: 'CreationTime', width: 130, title: '缺货状态', sort: true, align: 'center', templet: function (d) {
                        return `<div><span class="${d.stockStatus == 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.stockStatus == 0 ? '正常' : d.stockStatus == 1 ? '一般' : '严重'}</span></div>`
                    }
                },
                {
                    field: 'onlineStatus', width: 130, title: '在线状态', sort: true, align: 'center', templet: function (d) {
                        return `<div><span class="${d.onlineStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.onlineStatus == 0 ? '离线' : '在线'}</span></div>`
                    }
                },
                {
                    field: 'actionStatus', width: 130, title: '是否激活', sort: true, align: 'center', templet: function (d) {
                        return `<div><span class="${d.actionStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.actionStatus == 0 ? '未激活' : '已激活'}</span></div>`
                    }
                },
                {
                    field: 'openStatus', width: 130, title: '营业状态', sort: true, align: 'center', templet: function (d) {
                        return `<div><span class="${d.openStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.openStatus == 0 ? '不营业' : '营业'}</span></div>`
                    }
                },
                {
                    field: 'wayStatus', width: 135, title: '货道状态', align: 'center', templet: function (d) {
                        return `<div><span class="${d.wayStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.wayStatus == 0 ? '不正常' : '正常'}</span></div>`
                    }
                },
                { field: 'dealTime', width: 170, title: '最后交易时间', sort: true, },
                { field: 'merchantName', width: 150, title: '所属商户', },
                { field: 'appVersion', width: 135, title: '软件版本', },
                // { field: 'controllerVersion', width: 135, title: '控制器版本', sort: true, },
                { field: 'connectTime', width: 170, title: '联机时间', sort: true, },
                { field: 'actionTime', width: 170, title: '激活时间', sort: true, },
                { field: 'description', width: 250, title: '描述', },
                { field: 'operation', fixed: 'right', right: 0, width: 250, title: '操作', toolbar: '#barDemo', align: 'left' },
            ]]
            , id: 'tableId'
            , page: true
            , loading: true
            , limits: [10, 20, 50, 100]
            ,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where:{
                merchantId:sessionStorage.machineID
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
            response: {
                statusCode: 200 //规定成功的状态码，默认：0
            },
            done: function (res) {
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }else if(res.code==405){
                    $('.hangContent').show();
                }
            }
        });
    // 查询
    $('.machineListKeyBtn').click(function () {
        var machineData = form.val("machineData");
        machineList.reload({
            where: {
                onlineStatus: machineData.onlineStatus ? Number(machineData.onlineStatus) : '',
                actionStatus: machineData.actionStatus ? Number(machineData.actionStatus) : '',
                openStatus: machineData.permissions ? Number(machineData.permissions) : '',
                // stockStatus:machineData.openStatus? Number(machineData.openStatus):'',
                stockStatus: machineData.CreationTime ? Number(machineData.CreationTime) : '',
                keyword: machineData.machineKeyText
            }
        })
    });



    // 设置tab切换
    $('.setNav li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        let that = $(this);

        $('.tabLine').animate({
            left: that.index() != 0 ? (that.offset().left) + 'px' : (that.offset().left - 20) + 'px',
            width: (that).width() + 'px'
        }, 500);
        $('.navSetCont li').eq($(this).index()).fadeIn().siblings().hide();
    });
    // 监听售货机列表操作
    var machineSetData = null
    table.on('tool(machineTable)', function (obj) {
        machineSetData = obj.data;
        console.log(machineSetData)
        $('.maskHeader span').html(machineSetData.info + '详细信息')
        if (obj.event == 'set') {
            $('.setUpCont').show();
            $('.setNav li').eq(0).addClass('active').siblings().removeClass('active');
            $('.tabLine').css({
                left: '0'
            })
            $('.setCoreListOne').show().siblings().hide();
            form.val("setDataVal", {
                'info': machineSetData.info,
                'appVersion': machineSetData.appVersion,
                'longitude': machineSetData.longitude,
                'latitude': machineSetData.latitude,
                'location': machineSetData.location
            })
            salesFun(machineSetData.machineId)
            recordFun(machineSetData.machineId)
        } else if (obj.event == 'edit') {
            if(machineSetData.openStatus==1){
                layer.msg('温馨提示！该售货机正在营业，不可进行编辑！',{icon:7})
            }else{
                if(!editFlag){
                    layer.msg('温馨提示！您没有编辑售货机的权限！',{icon:7})
                }
            }
            var region = null;
            if (machineSetData.location) {
                region = machineSetData.location.split(' ')
            }
            $('.editMachineBox .layui-tree-txt').css({ color: '#555' })
            form.val("editmachine", {
                'sNumber': machineSetData.number,
                'tName': machineSetData.info,
                'number': machineSetData.machineId,
                'province': machineSetData.location?region[0]:'',
                'mapVal':machineSetData.location?region[3]:'',
                'area': machineSetData.area,
                'longitude': machineSetData.longitude,
                'latitude': machineSetData.latitude,
                // 'userPhone': machineSetData.userPhone,
                'headPhone': machineSetData.chargerPhone,
                'describe': machineSetData.description,
                'merchantsName': machineSetData.userNum,
                merchantsNametext:machineSetData.merchantName
            });
            if(machineSetData.location){
                provinceChange(region[0]);
                console.log(region[0])
                $('.city').val(region[1]);
                cityChange(region[1]);
                $('.district').val(region[2]);
                form.render('select');
            }
         
            $('.editMachineCont').show();
            geoCode();
        } else if (obj.event == 'activate') {
            if(!activateFlag){
                layer.msg('您没有激活售货机的权限!');
                return ;
            }
            layer.confirm('确定激活该设备？', function (index) {
                $.ajax({
                    type: 'post',
                    url: '/api/machine/activeMachine',
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    data: JSON.stringify({
                        machineId: machineSetData.machineId,
                        actionStatus: '1',
                    }),
                    success: function (res) {
                        layer.close(index);
                        if (res.code == 200) {
                            layer.msg('激活成功', { icon: 1 });
                            machineList.reload({
                                where: {}
                            })
                        } else if (res.code == 403) {
                            window.parent.location.href = "login.html";
                        } else {
                            layer.msg(res.message, { icon: 2 });
                        }
                    },error:function(err){
                        layer.msg('服务器请求超时', { icon: 2 });
                    }
                })
            })
        } else if (obj.event == 'startThe') {
            if(machineSetData.onlineStatus!=1){
                layer.msg('售货机处于离线状态不可以操作此功能',{icon:7});
                return ;
            }else{
                if(!activateFlag){
                    layer.msg('您没有更改营业状态的权限!');
                    return ;
                }
            }
            if (machineSetData.openStatus != 1) {
                layer.confirm('确定营业？', function (index) {
                    layer.close(index);
                    $('.mask').fadeIn();
                    $('.maskSpan').addClass('maskIcon')
                    $.ajax({
                        type: 'post',
                        url: '/api/machine/getStatus',
                        headers: {
                            "Content-Type": "application/json",
                            token,
                        },
                        data: JSON.stringify({
                            machineId: machineSetData.machineId,
                        }),
                        success: function (Dres) {
                            if (Dres.code == 200) {
                                var statusType = JSON.parse(Dres.data);
                                if (statusType.actionStatus == 1) {
                                    $.ajax({
                                        type: 'post',
                                        url: '/api/machine/activeMachine',
                                        headers: {
                                            "Content-Type": "application/json",
                                            token,
                                        },
                                        data: JSON.stringify({
                                            machineId: machineSetData.machineId,
                                            openStatus: '1'
                                        }),
                                        success: function (Sres) {
                                            if (Sres.code == 200) {
                                                $.ajax({
                                                    type: 'post',
                                                    url: '/api/pushActive',
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        token,
                                                    },
                                                    data: JSON.stringify({
                                                        machine: machineSetData.machineId,
                                                        action: 'true'
                                                    }),
                                                    success: function (res) {
                                                        console.log(res)
                                                        $('.mask').fadeOut();
                                                        $('.maskSpan').removeClass('maskIcon');
                                                        if(res=='true'){
                                                            layer.msg('操作成功', { icon: 1 });
                                                            machineList.reload({
                                                                where: {}
                                                            })
                                                        }else{
                                                            layer.msg('操作失败', { icon: 2 });
                                                        }                                                   
                                                    },errpr:function(err){
                                                        $('.mask').fadeOut();
                                                        $('.maskSpan').removeClass('maskIcon');
                                                        layer.msg('服务器请求超时', { icon: 2 });
                                                    }
                                                })
                                            } else {
                                                $('.mask').fadeOut();
                                                $('.maskSpan').removeClass('maskIcon');
                                                layer.msg(Sres.message, { icon: 2 })
                                            }
                                        }
                                    })
                                } else {
                                    $('.mask').fadeOut();
                                    $('.maskSpan').removeClass('maskIcon');
                                    layer.msg('该设备未激活,无法营业', { icon: 7 })
                                }
                            } else if (Dres.code == 403) {
                                window.parent.location.href = "login.html";
                            } else {
                                $('.mask').fadeOut();
                                $('.maskSpan').removeClass('maskIcon');
                                layer.msg(Dres.message, { icon: 2 })
                            }
                        }
                    })
                })
            } else {
                layer.confirm('确定取消营业？', function (index) {
                    layer.close(index);
                    $('.mask').fadeIn();
                    $('.maskSpan').addClass('maskIcon')
                    $.ajax({
                        type: 'post',
                        url: '/api/machine/getStatus',
                        headers: {
                            "Content-Type": "application/json",
                            token,
                        },
                        data: JSON.stringify({
                            machineId: machineSetData.machineId,
                        }),
                        success: function (Dres) {
                            if (Dres.code == 200) {
                                var statusType = JSON.parse(Dres.data);
                                if (statusType.actionStatus == 1) {
                                    $.ajax({
                                        type: 'post',
                                        url: '/api/machine/activeMachine',
                                        headers: {
                                            "Content-Type": "application/json",
                                            token,
                                        },
                                        data: JSON.stringify({
                                            machineId: machineSetData.machineId,
                                            openStatus: '0'
                                        }),
                                        success: function (Sres) {
                                            if (Sres.code == 200) {
                                                $.ajax({
                                                    type: 'post',
                                                    url: '/api/pushActive',
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        token,
                                                    },
                                                    data: JSON.stringify({
                                                        machine: machineSetData.machineId,
                                                        action: 'false'
                                                    }),
                                                    success: function (res) {
                                                        $('.mask').fadeOut();
                                                        $('.maskSpan').removeClass('maskIcon');
                                                        layer.msg('取消营业成功', { icon: 1 });
                                                        machineList.reload({
                                                            where: {}
                                                        })
                                                    }
                                                })
                                            } else {
                                                $('.mask').fadeOut();
                                                $('.maskSpan').removeClass('maskIcon')
                                                layer.msg(Sres.message, { icon: 2 })
                                            }
                                        }
                                    })
                                } else {
                                    $('.mask').fadeOut();
                                $('.maskSpan').removeClass('maskIcon')
                                    layer.msg('该设备未激活,无法进行营业操作', { icon: 7 })
                                }
                            } else if (Dres.code == 403) {
                                window.parent.location.href = "login.html";
                            } else {
                                $('.mask').fadeOut();
                                $('.maskSpan').removeClass('maskIcon')
                                layer.msg(Dres.message, { icon: 2 })
                            }

                        }
                    })
                })
            }


        }
    });
    // 关闭设置
    $('.setUpCont .close').click(function () {
        $('.setUpCont').hide();
    });

    // 关闭编辑
    $('.editMachineCont .close').click(function () {
        $('.editMachineCont').hide();
    })
    $('.editMachineCont .editCancelBtn').click(function () {
        $('.editMachineCont').hide();
    })

    // 高德地图部分
    var map = new AMap.Map("machineMap", {
        resizeEnable: true
    });

    var geocoder = new AMap.Geocoder({
        city: "", //城市设为北京，默认：“全国”
    });
    var marker = new AMap.Marker();
    function geoCode() {
        // var address  = document.getElementById('address').value;
        var address = $('.listFlex select[name="province"]').val() + $('.listFlex select[name="city"]').val() + $('.listFlex select[name="district"]').val() + $('.listFlex input[name="mapVal"]').val()
        geocoder.getLocation(address, function (status, result) {
            if (status === 'complete' && result.geocodes.length) {
                var lnglat = result.geocodes[0].location //经纬度
                console.log(lnglat)
                // console.log(lnglat) 
                // lat 纬度 lng经度
                // document.getElementById('lnglat').value = lnglat;
                $('.listFlex input[name="longitude"]').val(lnglat.lng);
                $('.listFlex input[name="latitude"]').val(lnglat.lat);
                marker.setPosition(lnglat);
                map.add(marker);
                map.setFitView(marker);
            } else {
                // log.error('根据地址查询位置失败');
                layer.msg('根据地址查询位置失败', { icon: 2 })

            }
        });
    };
    // 经纬度定位事件   
    function coordinatesFun(){
        var lnglat=[$('.listFlex input[name="longitude"]').val(),$('.listFlex input[name="latitude"]').val()]
        map.add(marker);
        marker.setPosition(lnglat);
        map.setFitView(marker);
        geocoder.getAddress(lnglat, function(status, result) {
            if (status === 'complete'&&result.regeocode) {
                var address = result.regeocode;
                console.log(address)
                $('.listFlex input[name="mapVal"]').val(address.addressComponent.street+address.addressComponent.streetNumber);
                $('.listFlex select[name="province"]').val(address.addressComponent.province)
                provinceChange(address.addressComponent.province);
                if(address.addressComponent.province=='北京市'||address.addressComponent.province=='天津'||address.addressComponent.province=='上海市'||address.addressComponent.province=='重庆市'){
                    $('.listFlex select[name="city"]').val('市辖区');
                    cityChange('市辖区');
                }else{
                    $('.listFlex select[name="city"]').val(address.addressComponent.city);
                    cityChange(address.addressComponent.city);
                }
                $('.listFlex select[name="district"]').val(address.addressComponent.district);
                form.render('select');
            }else{
                layer.msg('根据地址查询位置失败', { icon: 2 })
            }
        });
    };
    map.on('click',function(e){
        // document.getElementById('lnglat').value = e.lnglat;
        $('.listFlex input[name="longitude"]').val()
        console.log(e)
        // coordinatesFun();
    })

    // 输入框失去焦点事件获取地图
    $('.listFlex input[name="mapVal"]').blur(function () {
        geoCode();
    });
    // 经纬度输入框失去焦点事件获取地图
    $('.listFlex input[name="longitude"]').blur(function(){
        coordinatesFun();
    });
    $('.listFlex input[name="latitude"]').blur(function(){
        coordinatesFun();
    });
    
    // 手机号码正则判断
    $('.listFlex input[name="userPhone"]').blur(function () {
        phoneRegular(this, layer)
    });
    $('.listFlex input[name="headPhone"]').blur(function () {
        phoneRegular(this, layer)
    })

    // 修改售货机基本信息
    $('.editMachineCont .edittBtn').click(function () {
        if(machineSetData.openStatus==1){
            layer.msg('正在营业的售货机不可进行编辑！',{icon:7});
            return ;
        }
        var editMachineData = form.val("editmachine");
        if (editMachineData.sNumber && editMachineData.tName && editMachineData.number && editMachineData.province && editMachineData.city && editMachineData.district && editMachineData.mapVal && editMachineData.area && editMachineData.merchantsName ) {
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon')
            $.ajax({
                type: 'post',
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                url: '/api/machine/updateMachine',
                data: JSON.stringify({
                    number: editMachineData.sNumber,
                    info: editMachineData.tName,
                    machineId: editMachineData.number,
                    location: editMachineData.province + ' ' + editMachineData.city + ' ' + editMachineData.district + ' ' + editMachineData.mapVal,
                    area: editMachineData.area,
                    longitude: editMachineData.longitude,
                    latitude: editMachineData.latitude,
                    userNum: editMachineData.merchantsName,
                    // userPhone: editMachineData.userPhone,
                    chargerPhone: editMachineData.headPhone,
                    description: editMachineData.describe,
                }),
                success: function (res) {
                    $('.mask').fadeOut();
                    $('.maskSpan').removeClass('maskIcon')
                    $('.editMachineCont').hide();
                    if (res.code == 200) {
                        layer.msg('编辑成功', { icon: 1 });
                        machineList.reload({
                            where: {}
                        })
                    } else if (res.code == 403) {
                        window.parent.location.href = "login.html";
                    } else if(res.code){
                        layer.msg(res.message, { icon: 1 });
                    }else{
                        layer.msg(res.message, { icon: 2 });
                    }
                }
            })
        } else {
            layer.msg('带*为必填', { icon: 7 })
        }
    });

    // 手机号码正则判断
    // $()
    // 点击商户条件
    $('.fixedAccount').click(function () {
        // alert($(this).attr('mid'))
        $('.fixedAccount').removeClass('active');
        $(this).addClass('active')
        machineList.reload({
            where: {
                merchantId: $(this).attr('mid')
            }
        })
    });
    // 销售详情部分
    //开始时间
    var selesStartTime = '';
    //结束时间
    var selesEndTime = '';
    laydate.render({
        elem: '#test6',
        range: true,
        done: function (value, date, endDate) {
            // console.log(value); //得到日期生成的值，如：2017-08-18
            timerKey = value.split(' - ');
            selesStartTime = timerKey[0];
            selesEndTime = timerKey[1];
        }
    });

    var startTime = '',
        endTime = '';
    laydate.render({
        elem: '#test7',
        range: true,
        done: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            timerKey = value.split(' - ');
            console.log(timerKey);
            startTime = timerKey[0];
            endTime = timerKey[1];
        }
    });

    // 销售详情列表
    var salesDatilsList = null;
    function salesFun(id) {
        salesDatilsList = table.render({
            elem: '#salesDateilsTable',
            url: `/api//machine/getSalesList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {
                    field: 'time', width: 200, title: '时间', sort: true
                },
                { field: 'number', width: 250, title: '订单号', },
                {
                    field: 'shipStatus', width: 150, title: '出货状态', sort: true, templet: function (d) {
                        return `<div><span class="${d.shipStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.shipStatus == 0 ? '出货失败' : '出货成功'}</span></div>`
                    }
                },
                {
                    field: 'payStatus', width: 150, title: '支付状态', sort: true, templet: function (d) {
                        return `<div><span class="${d.payStatus == 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.payStatus == 0 ? '已支付' : d.payStatus == 1 ? '未支付' : '取消支付'}</span></div>`
                    }
                },
                {
                    field: 'payType', width: 150, title: '支付方式', sort: true, templet: function (d) {
                        return `<div><span class="${d.payType != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.payType == 0 ? '支付宝' : '微信'}</span></div>`
                    }
                },
                { field: 'payee', width: 150, title: '收款方', sort: true, },
                { field: 'amount', width: 150, title: '金额', },
            ]]
            , id: 'salesId'
            , page: true
            , loading: true
            , limits: [10, 20, 50, 100]
            ,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                condition: id
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

    // 销售详情查询
    $('.selesQueryBtn').click(function () {
        var selesVal = form.val('salesDataVal')
        console.log(selesVal)
        salesDatilsList.reload({
            where: {
                conditionFive: selesVal.shipmentStatus,
                conditionSix: selesVal.payStatus,
                conditionSeven: selesVal.payType,
                conditionTwo: selesStartTime,
                conditionThree: selesEndTime,
            }
        })
    })
    // 出货记录列表
    var recordDataList = null;
    function recordFun(id) {
        recordDataList = table.render({
            elem: '#shipmentListTable',
            url: `/api//machine/getShippingList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'time', width: 200, title: '出货时间', },
                {
                    field: 'source', width: 120, title: '操作来源', sort: true,
                },
                {
                    field: 'goodName', width: 150, title: '商品名', sort: true,
                },
                {
                    field: 'way', width: 130, title: '货道名', sort: true,
                },
                {
                    field: 'cabinetName', width: 130, title: '机柜名', sort: true,
                },
                { field: 'cabinetType', width: 100, title: '机柜类型', sort: true, },
                {
                    field: 'countNum', width: 100, title: '出货时数量(个)', templet: function (d) {
                        return d.stock + d.count
                    }
                },
                { field: 'stock', width: 100, title: '出货后数量(个)', sort: true, },
                { field: 'count', width: 100, title: '出货数量(个)', },
            ]]
            , id: 'shipmentId'
            , page: true
            , loading: true
            , limits: [10, 20, 50, 100]
            ,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                condition: id
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
    // 出货记录列表
    $('.shipmentQueryBtn').click(function () {
        recordDataList.reload({
            conditionTwo: startTime,
            conditionThree: endTime,
            conditionFour: $('.shipmentRecord input[name="keyName"]').val()
        })
    });
    //树状图
    var dataListEdit=null;
    var dataList = dataListEdit=treeList();
    if(merchantsListData.length==0){
        dataListEdit=[]
    }
    //售货机列表
    treeFun(tree, 'test1', machineList, dataList, 'merchantId')
    var nodesEdti = null;
    // 商户名
    var inst2 = tree.render({
        elem: '#test2',
        id: 'treelistEdit',
        showLine: !0 //连接线
        ,
        onlyIconControl: true //左侧图标控制展开收缩
        ,
        isJump: !1 //弹出新窗口跳转
        ,
        edit: false //开启节点的操作
        ,
        data: dataListEdit,
        text: {
            defaultNodeName: '无数据',
            none: '您没有修改机器所属商户的权限。'
        },
        click: function (obj) {
            console.log(obj);
            form.val("editmachine", {
                "merchantsName": obj.data.id,
                'merchantsNametext':obj.data.title
            })
            nodesEdti = document.getElementsByClassName("layui-tree-txt");
            for (var i = 0; i < nodesEdti.length; i++) {
                if (nodesEdti[i].innerHTML === obj.data.title)
                    nodesEdti[i].style.color = "#be954a";
                else
                    nodesEdti[i].style.color = "#555";
            }
            if (!obj.data.children) {
                $.ajax({
                    type: 'post',
                    url: '/api/merchant/getMerchantGroup',
                    headers: {
                        token,
                        "Content-Type": "application/json",
                    },
                    async: false,
                    data: JSON.stringify({
                        topId: obj.data.id
                    }),
                    success: function (res) {
                        if (res.code == 200) {
                            if (res.data[0].childMerchant.length > 0) {
                                obj.data.spread = true;
                                obj.data.children = [];
                                res.data[0].childMerchant.forEach((item, index) => {
                                    var childrenObj = {
                                        id: item.id,
                                        title: item.name
                                    }
                                    obj.data.children.push(childrenObj)
                                });
                                tree.reload('treelistEdit', {
                                });
                            }
                        }
                    }
                })

            }

        },
    });

    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });
    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });
    var editFlag=false,
    activateFlag=false;
    permissionsFun('/api/role/findUserPermission','post',sessionStorage.token,layer).then(res=>{
        console.log(res.data)
        editFlag=res.data.some((item,index)=>{
            return item.id=='396'
        });
        activateFlag=res.data.some((item,index)=>{
            return item.id=='392'
        })
    }).catch(err=>{
        layer.msg(err.message,{icon:2})
    })
});
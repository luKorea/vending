import '../../MyCss/stores/machine.css';
import { provinceChange, cityChange } from '../../assets/public/selectMore';
// console.log()
layui.use(['table', 'form', 'layer', 'laydate', 'tree'], function () {
    var permissionsData0 = window.parent.permissionsData1(),
        permissionsObj = {
            396: false,
            392: false,
            424: false,
            432: false,
            426: false,
            425: false,
            427: false,
            401: false,
            402: false,
            456: false,
            467: false,
            466: false,
            468: false,
            469: false,
            470: false,
            472: false,
            471: false,
            473: false,
            474: false,
            475: false,
        },
        permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);
    function permissions1() {
        permissionsObjFlag[392] ? $('.activeMachineType').removeClass('hides') : $('.activeMachineType').addClass('hides')
        permissionsObjFlag[432] ? $('.payTypeSet').removeClass('hide') : $('.payTypeSet').addClass('hide');
        permissionsObjFlag[432] ? $('.sequence').removeClass('hide') : $('.sequence').addClass('hide');
        // delAisleFlag ? $('.detailsDel').removeClass('hide') : $('.detailsDel').addClass('hide');
        permissionsObjFlag[427] ? $('aisleDetailsTab').removeClass('hide') : $('aisleDetailsTab').addClass('hide');
        permissionsObjFlag[401] ? $('.salesDetails').removeClass('hide') : $('.salesDetails').addClass('hide');
        permissionsObjFlag[402] ? $('.shipmentDetails').removeClass('hide') : $('.shipmentDetails').addClass('hide');
        permissionsObjFlag[456] ? $('.shmentSet').removeClass('hide') : $('.shmentSet').addClass('hide');
        permissionsObjFlag[467] ? $('.selesPushBtn').removeClass('hide') : $('.selesPushBtn').addClass('hide');
        permissionsObjFlag[466] ? $('.shipmentPushBtn').removeClass('hide') : $('.shipmentPushBtn').addClass('hide');
        permissionsObjFlag[468] ? $('.replenishmentPushBtn').removeClass('hide') : $('.replenishmentPushBtn').addClass('hide');
        permissionsObjFlag[469] ? $('.editPircePushBtn').removeClass('hide') : $('.editPircePushBtn').addClass('hide');
        permissionsObjFlag[470] ? $('.openDoorPushBtn').removeClass('hide') : $('.openDoorPushBtn').addClass('hide');
        permissionsObjFlag[472] ? $('.invoicePushBtn1').removeClass('hide') : $('.invoicePushBtn1').addClass('hide');
        permissionsObjFlag[471] ? $('.panelFlagClass').removeClass('hide') : $('.panelFlagClass').addClass('hide');
        permissionsObjFlag[473] ? $('.undoRecord').removeClass('hide') : $('.undoRecord').addClass('hide');
        permissionsObjFlag[474] ? $('.undoPushBtn').removeClass('hide') : $('.undoPushBtn').addClass('hide');
        permissionsObjFlag[475] ? $('.pushMachineBtn').removeClass('hide') : $('.pushMachineBtn').addClass('hide');
    }
    permissions1()
    var funNum = 1;
    var goodKeyFlag = null;
    tooltip('.refreshBtnList', { transition: true, time: 200 });
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
    var table = layui.table,
        token = sessionStorage.token,
        layer = layui.layer,
        form = layui.form,
        tree = layui.tree,
        laydate = layui.laydate,
        machineList = table.render({
            elem: '#machineTable',
            url: `${vApi}/machine/getMachineList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {
                    field: 'number', width: 150, title: '售货机编号', align: 'center', templet: function (d) {
                        return d.number ? d.number : '-'
                    }
                },
                {
                    field: 'info', width: 330, title: '售货机名', align: 'center', templet: function (d) {
                        if (d.info) {
                            return d.info
                        } else {
                            return `<div><span style="color:red;">*</span>(售货机为新上线机器，请编辑售货机信息！)</div>
                            <div><span style="color:red;">*</span>(序列号:${d.machineId})</div>`
                        }
                    }
                },
                {
                    field: 'location', width: 350, title: '地址', align: 'center', templet: function (d) {
                        return d.location ? d.location : ' - '
                    }
                },
                {
                    field: 'trafficInfo', width: 160, title: '流量使用情况(MB)', align: 'center'
                },
                {
                    field: 'iot_card', width: 160, title: '物联网卡号', align: 'center'
                },
                {
                    field: 'warning', width: 130, title: '缺货情况', align: 'center', templet: function (d) {
                        if (d.storage_warning[0].warning) {
                            return ` <div>
                            <span class="${d.storage_warning[0].way_count < 10 ? 'tableStateCellTrue' : d.storage_warning[0].way_count < 30 ? 'tableStateCellFalse' : 'red'}">${d.storage_warning[0].warning}</span>
                        </div>`

                        } else {
                            return '-'
                        }

                    }
                },
                {
                    field: 'way_count', width: 130, title: '缺货货道数量', align: 'center', templet: function (d) {
                        return d.storage_warning[0].way_count
                    }
                },
                // {
                //     field: 'CreationTime', width: 130, title: '缺货状态', align: 'center', templet: function (d) {
                //         return `<div><span class="${d.stockStatus == 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.stockStatus == 0 ? '正常' : d.stockStatus == 1 ? '一般' : '严重'}</span></div>`
                //     }
                // },
                {
                    field: 'onlineStatus', width: 130, title: '在线状态', align: 'center', templet: function (d) {
                        return `<div><span class="${d.onlineStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.onlineStatus == 0 ? '离线' : '在线'}</span></div>`
                    }
                },
                {
                    field: 'trafficInfo', width: 160, title: '离线时长', align: 'center', templet: function (d) {
                        if (d.onlineStatus != 0) {
                            return '0天0小时0分'
                        } else {

                            var nData = new Date().getTime(),
                                cDate = nData - d.offline_time,
                                day = Math.floor(cDate / 86400000),
                                hour = Math.floor((cDate - 86400000 * day) / 3600000),
                                miute = Math.floor((cDate - 86400000 * day - 3600000 * hour) / 60000);
                            return d.offline_time ? day + '天' + hour + '小时' + miute + '分钟' : '-'
                        }
                    }
                },
                {
                    field: 'actionStatus', width: 130, title: '是否激活', align: 'center', templet: function (d) {
                        return `<div><span class="${d.actionStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.actionStatus == 0 ? '未激活' : '已激活'}</span></div>`
                    }
                },
                {
                    field: 'openStatus', width: 130, title: '营业状态', align: 'center', templet: function (d) {
                        return `<div><span class="${d.openStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.openStatus == 0 ? '无营业' : '营业'}</span></div>`
                    }
                },
                // {
                //     field: 'wayStatus', width: 135, title: '货道状态', align: 'center', templet: function (d) {
                //         return `<div><span class="${d.wayStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.wayStatus == 0 ? '不正常' : '正常'}</span></div>`
                //     }
                // },
                // {
                //     field: 'dealTime', width: 170, title: '最后交易时间', align: 'center', templet: function (d) {
                //         if (d.dealTime) {
                //             return timeStamp(d.connectTime)
                //         } else {
                //             return '-'
                //         }
                //     }
                // },
                { field: 'merchantName', width: 150, title: '所属商户', align: 'center', },
                { field: 'versions', width: 200, title: '当前版本(待升级版本)', align: 'center', templet:function(d){
                    return `${d.versions?d.versions:'-'}(${d.appVersion?d.appVersion:'-'})`
                }},
                // { field: 'controllerVersion', width: 135, title: '控制器版本', },
                {
                    field: 'connectTime', width: 170, title: '联机时间', align: 'center', templet: function (d) {
                        if (d.actionTime) {
                            return timeStamp(d.connectTime)
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    field: 'actionTime', width: 170, title: '激活时间', align: 'center', templet: function (d) {
                        if (d.actionTime) {
                            return timeStamp(d.actionTime)
                        } else {
                            return '-'
                        }

                    }
                },
                { field: 'description', width: 250, title: '描述', align: 'center' },
                { field: 'operation', fixed: 'right', right: 0, width: 250, title: '操作', toolbar: '#barDemo', align: 'center' },
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
            where: {
                merchantId: sessionStorage.machineID
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
                // permissions();
                permissions1();
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                } else if (res.code == 405) {
                    $('.hangContent').show();
                }
                fixedFun();
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
    $('.refreshBtnList').click(function () {
        var dataList1 = treeList();
        if (JSON.stringify(dataList1) != JSON.stringify(dataList)) {
            dataList = dataList1;
            treeFun(tree, 'test1', machineList, dataList, 'merchantId', 'condition', selectData, '', 'true')
            machineList.reload({
                where: {
                    merchantId: sessionStorage.machineID
                }
            });
            layer.msg('已刷新', { icon: 1 })
        } else {
            layer.msg('已刷新', { icon: 1 })
        }
    })
    // 设置tab切换
    $('.setNav li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        let that = $(this);

        $('.tabLine').animate({
            left: that.index() != 0 ? (that.offset().left) + 'px' : (that.offset().left - 20) + 'px',
            width: (that).width() + 'px'
        }, 500);
        $('.navSetCont li').eq($(this).index()).fadeIn().siblings().hide();
        switch (that.index()) {
            case 1:
                supportpay(machineSetData.machineId, machineSetData.userNum); //收款账户
                break;
            case 2:
                getGoodsWay(machineSetData.machineId); //货道详情
                goodKeyFlag = 1;
                break;
            case 3:
                panelFun(); //展板详情
                goodKeyFlag = 2;
                break;
            case 4:
                salesFun(machineSetData.machineId); //销售详情
                break;
            case 5:
                recordFun(machineSetData.machineId); //出货记录
                break;
            case 6:
                replenishmenFun(machineSetData.machineId); //补货记录
                break;
            case 7:
                priceFun(); //修改价格记录
                break;
            case 8:
                openDoorFun(); //开门记录
                break;
            case 9:
                undoFun(); //撤货记录
                break;
        }
    });
    // 监听售货机列表操作
    var machineSetData = null
    table.on('tool(machineTable)', function (obj) {
        machineSetData = obj.data;
        console.log(machineSetData);
        aisleNum();
        $('.maskHeader span').html(machineSetData.info ? machineSetData.info + '详细信息' : '-详细信息')
        if (obj.event == 'set') {
            $('.setUpCont').show();
            $('body').addClass('bodys');
            var setAddress = null;
            if (machineSetData.location) {
                setAddress = machineSetData.location.split(' ')
            }
            form.val("setDataVal", {
                'info': machineSetData.info,
                'appVersion': machineSetData.versions,
                'longitude': machineSetData.longitude,
                'latitude': machineSetData.latitude,
                'location': machineSetData.location,
                'setProvince': setAddress ? setAddress[1] : '',
                'setCity': setAddress ? setAddress[2] : '',
                'setArea': setAddress ? setAddress[3] : '',
                'setRegion': machineSetData.area
            });

            $('.navSetCont li').eq(0).show().siblings().hide();
            $('.setNav li').eq(0).addClass('active').siblings().removeClass('active');
            $('.tabLine').animate({
                left: ($('.setNav li').eq(0).offset().left - 20) + 'px',
                width: $('.setNav li').eq(0).width() + 'px'
            }, 1)
            // if (AisleDetailsFlag) {
            //     getGoodsWay(machineSetData.machineId);
            //     $('.aisleDetailsTab').show()
            // } else {
            //     $('.aisleDetailsTab').hide()
            //     var titleHtml = `<div style="text-align: center;">您没有权限访问货道详情！</div>`
            //     $('.aisleGoodsCont').html(titleHtml)
            // }
            // if (salesListFlag) {
            //     salesFun(machineSetData.machineId);
            // }
            // if (shipmentListFlag) {
            //     recordFun(machineSetData.machineId);
            // }
            // if (paySetFlag) {
            //     supportpay(machineSetData.machineId, machineSetData.userNum);
            // }

        } else if (obj.event == 'edit') {
            $('body').addClass('bodys');
            if (machineSetData.openStatus == 1) {
                layer.msg('温馨提示！该售货机正在营业，不可进行编辑！', { icon: 7 })
            } else {
                if (!permissionsObjFlag[396]) {
                    layer.msg('温馨提示！您没有编辑售货机的权限！', { icon: 7 })
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
                'province': machineSetData.location ? region[0] : '',
                'mapVal': machineSetData.location ? region[3] : '',
                'area': machineSetData.area,
                'longitude': machineSetData.longitude,
                'latitude': machineSetData.latitude,
                // 'userPhone': machineSetData.userPhone,
                'headPhone': machineSetData.chargerPhone,
                'describe': machineSetData.description,
                'merchantsName': machineSetData.userNum,
                'merchantsNametext': machineSetData.merchantName,
                "max_ship": machineSetData.max_ship == 0 ? '' : machineSetData.max_ship
            });
            if (machineSetData.location) {
                provinceChange(region[0]);
                console.log(region[0])
                $('.city').val(region[1]);
                cityChange(region[1]);
                $('.district').val(region[2]);
                form.render('select');
            }
            $('.editMachineCont').show();
            $('.editMachineCont').scrollTop(0)
            // 客服部分
            if (machineSetData.service_code) {
                $('.ImgCont img').prop('src', machineSetData.service_code);
                $('.ImgCont').show();
            } else {
                $('.ImgCont img').prop('src', '');
                $('.ImgCont').hide();
            }
            if (machineSetData.is_service == 1) {
                $('.serviceTitle').show();
                $('.listFlex input[name="machineOpen"]').prop('checked', true);
                machineServiceFlag = true;
            } else {
                $('.serviceTitle').hide();
                $('.listFlex input[name="machineOpen"]').prop('checked', false);
                machineServiceFlag = false;
            };
            $('.serviceTitle input[name="service_phone"]').val(machineSetData.service_phone);
            // 定制部分
            if (machineSetData.custom_code) {
                $('.customImgCont img').prop('src', machineSetData.custom_code);
                $('.customImgCont').show();
            } else {
                $('.customImgCont img').prop('src', '');
                $('.customImgCont').hide();
            }
            if (machineSetData.is_custom == 1) {
                $('.customTitle').show();
                $('.listFlex input[name="customOpen"]').prop('checked', true);
                customFlag = true;
            } else {
                $('.customTitle').hide();
                $('.listFlex input[name="customOpen"]').prop('checked', false);
                customFlag = false;
            };

            //  是否开启声音
            if (machineSetData.is_volume == 1) {
                $('.listFlex input[name="sound"]').prop('checked', true)
            } else {
                $('.listFlex input[name="sound"]').prop('checked', false)
            }
            // 是否开灯
            if (machineSetData.is_light == 1) {
                $('.listFlex input[name="lamp"]').prop('checked', true)
            } else {
                $('.listFlex input[name="lamp"]').prop('checked', false)
            }
            // 销售经理
            funNum = 1;
            salesClassList(machineSetData, 1)
            $('.customTitle input[name="custom_phone"]').val(machineSetData.custom_phone)
            form.render();

            geoCode();
        } else if (obj.event == 'activate') {
            layer.confirm('确定激活该设备？', function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                var activeMachineObj = JSON.stringify({
                    machineId: machineSetData.machineId,
                    actionStatus: '1',
                });
                loadingAjax('/machine/activeMachine', 'post', activeMachineObj, token, 'mask', '', '', layer).then(res => {
                    layer.msg('激活成功', { icon: 1 });
                    machineList.reload({
                        where: {}
                    })
                }).catch(err => {
                    layer.msg(res.message, { icon: 2 });
                })
            })
        } else if (obj.event == 'startThe') {
            // if (machineSetData.onlineStatus != 1) {
            //     layer.msg('售货机处于离线状态不可以操作此功能', { icon: 7 });
            //     return;
            // } else {

            // }
            // if (machineSetData.openStatus != 1) {
            layer.confirm(machineSetData.openStatus != 1 ? '确定营业？' : '确定暂停营业？', function (index) {
                var openStatusIndex = machineSetData.openStatus != 1 ? '1' : '0'
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon')
                loadingAjax('/machine/getStatus', 'post', JSON.stringify({ machineId: machineSetData.machineId }), token).then(Dres => {
                    console.log(Dres)
                    if (Dres.data.actionStatus == 1) {
                        loadingAjax('/pushActive', 'post', JSON.stringify({ machine: machineSetData.machineId, action: machineSetData.openStatus != 1 ? 'true' : 'false' }), token).then(res => {
                        }).catch(err => {
                            loadingAjax('/machine/activeMachine', 'post', JSON.stringify({ machineId: machineSetData.machineId, openStatus: openStatusIndex }), token, 'mask').then(Sres => {
                                layer.msg('操作成功', { icon: 1 });
                                machineList.reload({
                                    where: {}
                                })
                            }).catch(Serr => {
                                layer.msg(Serr.message, { icon: 2 })
                            })
                            // if (err == 'true') {
                            // } else {
                            //     $('.mask').fadeOut();
                            //     $('.maskSpan').removeClass('maskIcon');
                            //     layer.msg('操作失败', { icon: 2 });
                            // }
                        })

                    } else {
                        $('.mask').fadeOut();
                        $('.maskSpan').removeClass('maskIcon');
                        layer.msg('操作失败', { icon: 2 });
                    }
                }).catch(Derr => {
                    $('.mask').fadeOut();
                    $('.maskSpan').removeClass('maskIcon');
                    layer.msg(Derr.message, { icon: 2 })
                })
            })
        }
    });

    // 货道数
    function aisleNum() {
        loadingAjax('/machine/findWay', 'get', { machineId: machineSetData.machineId }, sessionStorage.token).then(res => {
            var optionList = `<option value="">全部</option>`;
            res.data.forEach(item => {
                optionList += `<option value="${item}">${item}</option>`
            });
            $('.shipmentRecord select[name="shipSelect"]').html(optionList);
            $('.replenishment select[name="shipSelect"]').html(optionList);
            form.render('select');
        }).catch(err => {

        })
    }
    // 关闭设置
    $('.setUpCont .close').click(function () {
        $('.setUpCont').hide();
        $('body').removeClass('bodys');
    });

    // 关闭编辑
    $('.editMachineCont .close').click(function () {
        $('body').removeClass('bodys');
        $('.editMachineCont').hide();
    })
    $('.editMachineCont .editCancelBtn').click(function () {
        $('body').removeClass('bodys');
        $('.editMachineCont').hide();
    })

    // 高德地图部分
    var map = new AMap.Map("machineMap", {
        resizeEnable: true
    });

    var geocoder = new AMap.Geocoder({
        city: "", //城市设为北京，默认：“全国”
        radius: 1000
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
    function coordinatesFun() {
        var lnglat = [$('.listFlex input[name="longitude"]').val(), $('.listFlex input[name="latitude"]').val()]
        map.add(marker);
        marker.setPosition(lnglat);
        map.setFitView(marker);
        geocoder.getAddress(lnglat, function (status, result) {
            if (status === 'complete' && result.regeocode) {
                var address = result.regeocode;
                console.log(address)
                $('.listFlex input[name="mapVal"]').val(address.addressComponent.street + address.addressComponent.streetNumber);
                $('.listFlex select[name="province"]').val(address.addressComponent.province)
                provinceChange(address.addressComponent.province);
                if (address.addressComponent.province == '北京市' || address.addressComponent.province == '天津' || address.addressComponent.province == '上海市' || address.addressComponent.province == '重庆市') {
                    $('.listFlex select[name="city"]').val('市辖区');
                    cityChange('市辖区');
                } else {
                    $('.listFlex select[name="city"]').val(address.addressComponent.city);
                    cityChange(address.addressComponent.city);
                }
                $('.listFlex select[name="district"]').val(address.addressComponent.district);
                form.render('select');
            } else {
                layer.msg('根据地址查询位置失败', { icon: 2 })
            }
        });
    };
    map.on('click', function (e) {
        // document.getElementById('lnglat').value = e.lnglat;
        // $('.listFlex input[name="longitude"]').val()
        console.log(e.lnglat);
        console.log(e.lnglat.Q)
        $('.listFlex input[name="longitude"]').val(e.lnglat.lng);
        $('.listFlex input[name="latitude"]').val(e.lnglat.lat);
        coordinatesFun();
        // coordinatesFun();
    })

    // 输入框失去焦点事件获取地图
    $('.listFlex input[name="mapVal"]').blur(function () {
        geoCode();
    });
    // 经纬度输入框失去焦点事件获取地图
    $('.listFlex input[name="longitude"]').blur(function () {
        coordinatesFun();
    });
    $('.listFlex input[name="latitude"]').blur(function () {
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
        if (machineSetData.openStatus == 1) {
            layer.msg('正在营业的售货机不可进行编辑！', { icon: 7 });
            return;
        }
        var editMachineData = form.val("editmachine");
        if (editMachineData.sNumber && editMachineData.tName && editMachineData.number && editMachineData.province && editMachineData.city && editMachineData.district && editMachineData.mapVal && editMachineData.area && editMachineData.merchantsName) {
            if (!($('.serviceTitle input[name="service_phone"]').val() || $('.ImgCont img').attr('src')) && machineServiceFlag) {
                layer.msg('请填写客服电话或上传客服微信二维码', { icon: 7 });
                return;
            }
            if (!($('.customTitle input[name="custom_phone"]').val() || $('.customImgCont img').attr('src')) && customFlag) {
                layer.msg('请填写定制电话或上传定制二维码', { icon: 7 });
                return;
            }
            if ($('.listFlex input[name="max_ship"]').val()) {
                if (!(($('.listFlex input[name="max_ship"]').val() > 0) && (Number.isInteger(Number($('.listFlex input[name="max_ship"]').val()))))) {
                    layer.msg('最大出货数必须是正整数', { icon: 7 });
                    return;
                }
            }
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            var editObj = JSON.stringify({
                number: editMachineData.sNumber,
                info: editMachineData.tName,
                machineId: editMachineData.number,
                location: editMachineData.province + ' ' + editMachineData.city + ' ' + editMachineData.district + ' ' + editMachineData.mapVal,
                area: editMachineData.area,
                longitude: editMachineData.longitude,
                latitude: editMachineData.latitude,
                userNum: machineSetData.userNum == Number(editMachineData.merchantsName) ? 0 : Number(editMachineData.merchantsName),
                // userNum:0,
                // userPhone: editMachineData.userPhone,
                chargerPhone: editMachineData.headPhone,
                description: editMachineData.describe,
                is_service: machineServiceFlag ? 1 : 0,
                service_phone: machineServiceFlag ? $('.serviceTitle input[name="service_phone"]').val() : '',
                service_code: machineServiceFlag ? $('.ImgCont img').attr('src') : '',
                is_custom: customFlag ? 1 : 0,
                custom_phone: customFlag ? $('.customTitle input[name="custom_phone"]').val() : '',
                custom_code: customFlag ? $('.customImgCont img').attr('src') : '',
                is_sales: $('.salseCont input[name="salseClassName"]:checked').val() == -99 ? 0 : 1,
                sales_type: $('.salseCont input[name="salseClassName"]:checked').val() == -99 ? '' : $('.salseCont input[name="salseClassName"]:checked').val(),
                is_volume: $('.listFlex input[name="sound"]').prop('checked') ? 1 : 0,
                is_light: $('.listFlex input[name="lamp"]').prop('checked') ? 1 : 0,
                max_ship: $('.listFlex input[name="max_ship"]').val() ? Number($('.listFlex input[name="max_ship"]').val()) : null
            })
            loadingAjax('/machine/updateMachine', 'post', editObj, sessionStorage.token, 'mask').then(res => {
                $('.editMachineCont').hide();
                layer.msg('编辑成功', { icon: 1 });
                machineList.reload({
                    where: {}
                })
            }).catch(err => {
                layer.msg(err.message, { icon: 2 });
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
    var selesStartTime = getKeyTime().startTime;
    //结束时间
    var selesEndTime = getKeyTime().endTime;
    laydate.render({
        elem: '#test6',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            // console.log(value); //得到日期生成的值，如：2017-08-18
            var timerKey = value.split(' - ');
            selesStartTime = timerKey[0];
            selesEndTime = timerKey[1];
        }
    });

    var startTime = getKeyTime().startTime,
        endTime = getKeyTime().endTime;
    laydate.render({
        elem: '#test7',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            var timerKey = value.split(' - ');
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
            url: `${vApi}/machine/getSalesList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {
                    field: 'time', width: 200, title: '时间', templet: function (d) {
                        return timeStamp(d.time)
                    }
                },
                { field: 'number', width: 250, title: '订单号', },
                // {
                //     field: 'shipStatus', width: 150, title: '出货状态', templet: function (d) {
                //         return `<div><span class="${d.shipStatus == 2 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.shipStatus == 0 ? '出货失败' : d.shipStatus == 1 ? '出货成功' : '货道故障'}</span></div>`
                //     }
                // },
                {
                    field: 'payStatus', width: 150, title: '支付状态', templet: function (d) {
                        return `<div><span class="${d.payStatus == 2 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.payResult}</span></div>`
                    }
                },
                {
                    field: 'payTypes', width: 150, title: '支付类型',
                },
                { field: 'payee', width: 150, title: '收款方', },
                { field: 'amount', width: 150, title: '金额', },
            ]],
            id: 'salesId',
            page: true,
            loading: true,
            // height: 'full-100',
            limits: [10, 20, 50, 100],
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                condition: id,
                conditionTwo: selesStartTime ? selesStartTime : null,
                conditionThree: selesEndTime ? selesEndTime : null,
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
    };
    // 销售详情导出
    $('.selesPushBtn').click(function () {
        if (timeFlag(selesStartTime, selesEndTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var myDate = new Date(),
            // dataOf = myDate.getFullYear() + '' + (myDate.getMonth()+1>=10?myDate.getMonth()+1:'0'+(myDate.getMonth()+1) )+ '' +( myDate.getDate()>=10?myDate.getDate():'0'+myDate.getDate()),
            xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
        xhr.open("GET", `${vApi}/exportMachineOrder?startDate=${selesStartTime}&endDate=${selesEndTime}&condition=${machineSetData.machineId}`, true);
        xhr.setRequestHeader("token", sessionStorage.token);
        // xhr.setRequestHeader('Content-Type', 'charset=utf-8');
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;

        xhr.onload = function (res) {
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
                var fileName = `${machineSetData.info}(${machineSetData.number})销售详情(${selesStartTime}-${selesEndTime}).xls`
                var elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            } else {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('服务器请求超时', { icon: 2 });
                return;
            }
        }
        xhr.send();
    })
    // 销售详情查询
    $('.selesQueryBtn').click(function () {
        if (timeFlag(selesStartTime, selesEndTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        var selesVal = form.val('salesDataVal')
        console.log(selesVal)
        salesDatilsList.reload({
            where: {
                conditionFive: selesVal.shipmentStatus,
                conditionSix: selesVal.payStatus,
                conditionSeven: selesVal.payType,
                conditionTwo: selesStartTime ? selesStartTime : null,
                conditionThree: selesEndTime ? selesEndTime : null,
            }
        })
    })
    // 出货记录列表
    var recordDataList = null;
    function recordFun(id) {
        recordDataList = table.render({
            elem: '#shipmentListTable',
            url: `${vApi}/machine/getShippingList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {
                    field: 'time', width: 230, title: '出货时间', align: 'center', templet: function (d) {
                        if (d.create_time) {
                            return timeStamp(d.create_time)
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    field: 'good_name_core', width: 295, title: '商品名(编号)', align: 'center', templet: function (d) {
                        return d.good_name_core ? d.good_name_core : '-'
                    }
                },
                {
                    field: 'ship_status', width: 165, title: '出货状态', align: 'center', templet: function (d) {
                        return d.ship_status == 0 ? '出货失败' : d.ship_status == 1 ? '出货成功' : '货道故障'
                    }
                },
                { field: 'before_count', width: 165, align: 'center', title: '出货前数量', },
                // { field: 'ship_count', width: 135, align: 'center', title: '出货数量',templet:function(d){
                //     return d.ship_status==1?'1':'0'
                // } },
                {
                    field: 'before_count', width: 165, align: 'center', title: '出货后数量', templet: function (d) {
                        return d.ship_status == 1 ? d.before_count - 1 : d.before_count
                    }
                },
                // { field: 'ship_f', width: 140, align: 'center', title: '出货失败数量',templet:function(d){
                //     return d.ship_status==1?'0':'1'
                // } },

                {
                    field: 'ship_type', width: 165, align: 'center', title: '出货类型', templet: function (d) {
                        return d.ship_type == 1 ? '订单' : '取货码'
                    }
                },
                { field: 'way', width: 120, align: 'center', title: '出货货道' },
                { field: 'order_code', width: 210, align: 'center', title: '订单号/取货码', },
            ]]
            , id: 'shipmentId'
            , page: true
            , loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                machineId: machineSetData.machineId,
                conditionTwo: startTime,
                conditionThree: endTime,
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

    // 导出出货记录
    $('.shipmentPushBtn').click(function () {
        if (timeFlag(startTime, endTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        // dataOf = myDate.getFullYear() + '' + (myDate.getMonth()+1>=10?myDate.getMonth()+1:'0'+(myDate.getMonth()+1) )+ '' +( myDate.getDate()>=10?myDate.getDate():'0'+myDate.getDate()),
        var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
        xhr.open("GET", `${vApi}/excelShipping?startDate=${startTime}&endDate=${endTime}&machineId=${machineSetData.machineId}&way=${$('.shipmentRecord select[name="shipSelect"]').val()}&goods_Name=${$('.shipmentRecord input[name="shipGoodName"]').val()}&order_code=${$('.shipmentRecord input[name="order_code"]').val()}`, true);
        xhr.setRequestHeader("token", sessionStorage.token);
        // xhr.setRequestHeader('Content-Type', 'charset=utf-8');
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;

        xhr.onload = function (res) {
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
                var fileName = `${machineSetData.info}(${machineSetData.number})出货记录(${startTime}-${endTime}).xls`
                var elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            } else {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('服务器请求超时', { icon: 2 });
                return;
            }
        }
        xhr.send();
    })
    // 出货记录列表
    $('.shipmentQueryBtn').click(function () {
        if (timeFlag(startTime, endTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        recordDataList.reload({
            where: {
                way: $('.shipmentRecord select[name="shipSelect"]').val(),
                goods_Name: $('.shipmentRecord input[name="shipGoodName"]').val(),
                order_code: $('.shipmentRecord input[name="order_code"]').val(),
                conditionTwo: startTime,
                conditionThree: endTime,
                // conditionFour: $('.shipmentRecord input[name="keyName"]').val()
            }

        })
    });
    //树状图
    var dataListEdit = null;
    var dataList = dataListEdit = treeList();
    if (merchantsListData.length == 0) {
        dataListEdit = []
    }
    // console.log(JSON.stringify(dataList))
    //售货机列表
    treeFun(tree, 'test1', machineList, dataList, 'merchantId', 'condition', selectData, '', 'true')

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
                'merchantsNametext': obj.data.title
            })
            var nodesEdti = $(`.editMachineBox .layui-tree-txt`);
            for (var i = 0; i < nodesEdti.length; i++) {
                if (nodesEdti[i].innerHTML === obj.data.title)
                    nodesEdti[i].style.color = "#be954a";
                else
                    nodesEdti[i].style.color = "#555";
            }
        },
    });
    // 编辑刷新树
    $('.editRefres').click(function () {
        var editTree = treeList()
        if (JSON.stringify(editTree) == JSON.stringify(dataListEdit)) {
            layer.msg('已刷新', { icon: 1 })
        } else {
            dataListEdit = editTree;
            tree.reload('demoId', {
                data: dataListEdit
            });
            layer.msg('已刷新', { icon: 1 })
        }
    })
    // 刷新页面
    // $('.refreshBtn').click(function () {
    //     location.reload();
    // });
    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });

    // var editFlag = false,
    //     activateFlag = false,
    //     editAisleFlag = false,
    //     paySetFlag = false,
    //     delAisleFlag = false,
    //     addAisleFlag = false,
    //     AisleDetailsFlag = false,//货道详情
    //     salesListFlag = false,//销售记录
    //     shipmentListFlag = false,//出货记录
    //     shmentListFlag = false,
    //     editPriceFlag = false,//修改价格记录
    //     selesPushBtnFlag=false,//导出销售详情
    //     shipmentPushBtnFlag=false,//导出出货记录
    //     replenishmentPushBtnFlag=false,//补货记录
    //     editPircePushBtnFlag=false,//修改价格记录
    //     openDoorPushBtnFlag=false,//导出开门记录
    //     invoicePushBtnFlag=false,//导出补货单
    //     panelFlag=false,
    //     undoListFlag=false,//撤货列表
    //     undoPushFlag=false,//导出撤货
    //     machinePushFalg=false;//导出售货机
    // function permissions() {
    //     permissionsFun('/role/findUserPermission', 'post', sessionStorage.token, layer).then(res => {
    //         res.data.forEach(item => {
    //             if (item.id == '396') {
    //                 editFlag = true;
    //             }
    //             if (item.id == '392') {
    //                 activateFlag = true;
    //             }
    //             if (item.id == '424') {
    //                 editAisleFlag = true;
    //             }
    //             if (item.id == '432') {
    //                 paySetFlag = true;
    //             }
    //             if (item.id == '426') {
    //                 delAisleFlag = true;
    //             }
    //             if (item.id == '425') {
    //                 addAisleFlag = true;
    //             }
    //             if (item.id == '427') {
    //                 AisleDetailsFlag = true;
    //             }
    //             if (item.id == '401') {
    //                 salesListFlag = true;
    //             }
    //             if (item.id == '402') {
    //                 shipmentListFlag = true;
    //             }
    //             if (item.id == '456') {
    //                 shmentListFlag = true;
    //             }
    //             if(item.id=='467'){
    //                 selesPushBtnFlag=true;
    //             }
    //             if(item.id=='466'){
    //                 shipmentPushBtnFlag=true;
    //             }
    //             if(item.id=='468'){
    //                 replenishmentPushBtnFlag=true;
    //             }
    //             if(item.id=='469'){
    //                 editPircePushBtnFlag=true
    //             }
    //             if(item.id=='470'){
    //                 openDoorPushBtnFlag=true;
    //             }
    //             if(item.id=='472'){
    //                 invoicePushBtnFlag=true
    //             }
    //             if(item.id=='471'){
    //                 panelFlag=true;
    //             }
    //             if(item.id=='473'){
    //                 undoListFlag=true;
    //             }
    //             if(item.id=='474'){
    //                 undoPushFlag=true
    //             }
    //             if(item.id=='475'){
    //                 machinePushFalg=true
    //             }
    //             // if(item.id=='461'){
    //             //     editPriceFlag=true
    //             // }
    //         })
    //         permissions1();
    //         // editPriceFlag ? $('.editPriceTab').removeClass('hide') : $('.editPriceTab').addClass('hide');
    //     }).catch(err => {
    //         layer.msg(err.message, { icon: 2 })
    //     });
    // }
    // permissions();
    // function permissions1(){
    //     activateFlag ? $('.activeMachineType').removeClass('hides') : $('.activeMachineType').addClass('hides')
    //     paySetFlag ? $('.payTypeSet').removeClass('hide') : $('.payTypeSet').addClass('hide');
    //     paySetFlag ? $('.sequence').removeClass('hide') : $('.sequence').addClass('hide');
    //     delAisleFlag ? $('.detailsDel').removeClass('hide') : $('.detailsDel').addClass('hide');
    //     AisleDetailsFlag ? $('aisleDetailsTab').removeClass('hide') : $('aisleDetailsTab').addClass('hide');
    //     salesListFlag ? $('.salesDetails').removeClass('hide') : $('.salesDetails').addClass('hide');
    //     shipmentListFlag ? $('.shipmentDetails').removeClass('hide') : $('.shipmentDetails').addClass('hide');
    //     shmentListFlag ? $('.shmentSet').removeClass('hide') : $('.shmentSet').addClass('hide');
    //     selesPushBtnFlag?$('.selesPushBtn').removeClass('hide') : $('.selesPushBtn').addClass('hide');
    //     shipmentPushBtnFlag?$('.shipmentPushBtn').removeClass('hide') : $('.shipmentPushBtn').addClass('hide');
    //     replenishmentPushBtnFlag?$('.replenishmentPushBtn').removeClass('hide') : $('.replenishmentPushBtn').addClass('hide');
    //     editPircePushBtnFlag?$('.editPircePushBtn').removeClass('hide') : $('.editPircePushBtn').addClass('hide');
    //     openDoorPushBtnFlag?$('.openDoorPushBtn').removeClass('hide') : $('.openDoorPushBtn').addClass('hide');
    //     invoicePushBtnFlag?$('.invoicePushBtn1').removeClass('hide') : $('.invoicePushBtn1').addClass('hide');
    //     panelFlag?$('.panelFlagClass').removeClass('hide') : $('.panelFlagClass').addClass('hide');
    //     undoListFlag?$('.undoRecord').removeClass('hide') : $('.undoRecord').addClass('hide');
    //     undoPushFlag?$('.undoPushBtn').removeClass('hide') : $('.undoPushBtn').addClass('hide');
    //     machinePushFalg?$('.pushMachineBtn').removeClass('hide') : $('.pushMachineBtn').addClass('hide');
    // }
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    // 请求商品分类
    function selectData(merchantId) {
        loadingAjax('/classify/findAll', 'post', JSON.stringify({ pageNum: 1, pageSize: 200, merchantId, }), sessionStorage.token).then(res => {
            var optionList = `<option value="">全部</option>`;
            $.each(res.data.list, function (index, ele) {
                optionList += `<option value="${ele.classifyId}">${ele.classifyName}</option>`
            });
            $('#GoodsType').html(optionList);
            form.render('select');
        }).catch(err => {
        })
    }
    selectData(sessionStorage.machineID);
    sessionStorage.machineGoodsId = sessionStorage.machineID;
    sessionStorage.machineName = sessionStorage.marchantName;
    var goodsTableIns = null;
    // 商品列表
    function goodsreload() {
        goodsTableIns = table.render({
            elem: '#goodsTable'
            , url: `${vApi}/goods/findAll`
            , method: 'post',
            contentType: "application/json",
            headers: {
                token: sessionStorage.token,
            },
            cols: [[
                { field: 'goods_images', width: 100, title: '图片', templet: "#imgtmp" },
                {
                    field: 'goods_Name', width: 200, align: 'center', title: '商品名', color: '#409eff', templet: function (d) {
                        return (d.mail == 1 ? '(邮寄)' + d.goods_Name : d.goods_Name)
                        // return '1'
                    }
                },
                { field: `classifyName`, align: 'center', width: 150, title: '商品类目' },
                {
                    field: 'mail', align: 'center', width: 130, title: '是否邮寄商品', align: 'center', templet: function (d) {
                        return d.mail == 0 ? '否' : '是'
                    }
                },
                { field: 'goods_Core', align: 'center', width: 180, title: '商品编号', },
                { field: 'operation', position: 'absolute', right: 0, width: 80, title: '操作', toolbar: '#GoodsbarDemo' },

            ]],
            id: 'goodsID',
            page: true,
            loading: true,
            height: '480',
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                condition: sessionStorage.machineGoodsId,
                conditionFour: '1'
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
                    window.parent.location.href = "login.html";
                }
            }
        })
    }
    var x = null;
    var y = null;
    var aisleList = [];
    var withList = [];

    //货道详情部分
    var wayList = [];
    function getGoodsWay(machineId) {
        wayList = [];
        var aisleData = JSON.stringify({
            machineId,
        })
        loadingAjax('/machine/getGoodWay', 'post', aisleData, sessionStorage.token, '', '', '', layer).then(res => {
            againFun(res);
            console.log(res)
        }).catch(err => {
            console.log(err)
            wayList = [];
            wayFlagArr = [];
            var titleHtml = `<div style="text-align: center;">您没有权限访问货道详情！</div>`
            $('.aisleGoodsCont').html(titleHtml)
            // console.log(err)
            // layer.msg(err.message, { icon: 2 })
        })
    };
    // 渲染方法
    var wayFlagArr = [];
    function againFun(res) {
        // console.log(res)
        wayList = [
            [], [], [], [], [], []
        ];
        wayFlagArr = res.data
        res.data.forEach(item => {
            // console.log(item.row)
            if (item.row) {
                wayList[item.row - 1].push(item)
            }

        })
        aisleHtml1(wayList);
    };
    //选择商品
    $('.relative').click(function () {
        popupShow('goodsCont', 'goodsBox')
        if (goodsTableIns) {
            goodsTableIns.reload({
                where: {
                    condition: sessionStorage.machineGoodsId,
                }
            })
        } else {
            goodsreload();
        }
    })

    //    商品查询
    $('.goodsCont .queryBtnClick').click(function () {
        goodsTableIns.reload({
            where: {
                conditionTwo: $('.goodsCont input[name="GoodsKyeText"]').val(),
                conditionThree: $('#GoodsType').val()
            }
        })
    })
    // 货道详情渲染
    function aisleHtml1(strList) {
        var aisleStr = '';
        strList.forEach((item, index) => {
            aisleStr += `<div class="aisleListCont flexTwo">
                            <div class="listIndex">
                                <span>${index + 1}</span>
                            </div>`
            item.forEach((child, Cindex) => {
                if (child.open != 0) {
                    aisleStr += `<div class="aisleNumderGoods" >
                                    <div class="aisleNumderClick" fireIndex="${index + ',' + Cindex}">
                                    <div class="numderTop">                                   
                                        <img class="${child.status == 1 ? '' : 'hide'}" src="${child.goods_images ? child.goods_images : require('../../img/failure.png')}" alt=""> 
                                        <img class="${child.status == 1 ? 'hide' : ''}" src="${require('../../img/fault1.png')}" alt="">
                                    <span>${child.way}</span>
                                    </div>
                                <div class="numderBottom">
                                        <div class="status1 ${child.status == 1 ? '' : 'redF10'}">${child.status == 1 ? '正常' : '货道故障'}</div>
                                    <div>数量:${child.count}</div>
                                    </div>
                                    </div>  
                                    <div class="chooseCheck" data-tip="${child.goods_Name ? child.goods_Name : ''}" data-direction="bottom">
                                        <span >${child.mail ? '(邮寄)' : ''} ${child.goods_Name ? child.goods_Name : '-'}</span>
                                    </div>
                                </div>`
                } else {
                    aisleStr += `<div class="aisleNumderGoods" >
                                    <div class="aisleNumderClick" fireIndex="${index + ',' + Cindex}">
                                    <div class="numderTop">
                                    <img class="${child.status == 1 ? '' : 'hide'}" src="${child.goods_images ? child.goods_images : require('../../img/failure.png')}" alt="">
                                    <img class="${child.status == 1 ? 'hide' : ''}" src="${require('../../img/fault1.png')}" alt="">
                                        <span>${child.way}</span>
                                    </div>
                                    <div class="numderBottom">
                                        <div class="status2">${child.status == 1 ? '禁用' : '货道故障'}</div>
                                        <div>数量:${child.count}</div>
                                    </div>
                                    </div>  
                                    <div class="chooseCheck" data-tip="${child.goods_Name ? child.goods_Name : ''}" data-direction="bottom">
                                        <span >${child.mail == 1 ? '(邮寄)' : ''}${child.goods_Name ? child.goods_Name : ''}</span>
                                    </div>
                                </div>`
                }
            });
            aisleStr += ` </div>`
        });

        $('.aisleGoodsCont').html(aisleStr);
        form.render('checkbox');
        tooltip('.chooseCheck', { transition: true, time: 200 });
    };
    // 判断页面打开后有没有输入独立密码
    var aisleType = null;
    sessionStorage.independentPass = '';
    var ArrIndex = null;
    $('body').on('click', '.aisleNumderClick', function () {
        console.log($(this).attr("fireIndex"))
        ArrIndex = $(this).attr("fireIndex").split(',');
        console.log(ArrIndex)
        if (!permissionsObjFlag[424]) {
            layer.msg('您没有编辑货道的权限!', { icon: 7 })
            return;
        }
        aisleType = 1
        if (sessionStorage.independentPass) {
            aisleEdit();
            popupShow('editAisle', 'editAisleBox');
        } else {
            popupShow('iPasswprd', 'passwordCont');
        }

    })
    // 独立密码
    $('.passBtn').click(function () {
        var IPassWord = JSON.stringify({
            alonePwd: hex_md5($('.iPasswprd input[name="iPassword"]').val())
        })
        loadingAjax('/user/verifyAlonePwd', 'post', IPassWord, sessionStorage.token, 'mask', 'iPasswprd', 'passwordCont', layer).then(res => {
            sessionStorage.independentPass = 'true';
            if (aisleType == 1) {
                aisleEdit();
                popupHide('iPasswprd', 'passwordCont')
                popupShow('editAisle', 'editAisleBox');
            } else if (aisleType == 2) {
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                loadingAjax('/machine/removeGoodWay', 'post', JSON.stringify({ machineId: machineSetData.machineId, }), sessionStorage.token, 'mask', '', '').then(res => {
                    layer.msg(res.message, { icon: 1 });
                    getGoodsWay(machineSetData.machineId);
                }).catch(err => {
                    layer.msg(err.message, { icon: 2 })
                });
            }

        }).catch(err => {
            console.log(err)
            layer.msg(err.message, { icon: 2 });

        })
    });


    // 关闭弹窗
    $('.iPasswprd .cancelBtn').click(function () {
        popupHide('iPasswprd', 'passwordCont')
    });
    $('.editAisle .cancelBtn').click(function () {
        popupHide('editAisle', 'editAisleBox')
    });
    var goodsDetails = null;
    var flagObj = {};
    function aisleEdit() {
        goodsDetails = wayList[ArrIndex[0]][ArrIndex[1]];
        console.log(goodsDetails)
        $('.editAisle input[name="goodsName"]').val(goodsDetails.goods_Name ? goodsDetails.mail == 1 ? '(邮寄)' + goodsDetails.goods_Name : goodsDetails.goods_Name : '');
        $('.editAisle input[name="goodsName"]').attr('IVal', goodsDetails.goods_Id ? goodsDetails.goods_Id : '');
        $('.editAisle input[name="price"]').val(goodsDetails.price ? goodsDetails.price : '');
        $('.editAisle input[name="count"]').val(goodsDetails.count);
        $('.editAisle input[name="total"]').val(goodsDetails.total);
        // $('.editAisle select[name="testSele"]').val(goodsDetails.test);
        form.val("testVal", {
            'testSele': goodsDetails.open
        });
        flagObj = {
            machineId: machineSetData.machineId,
            way: goodsDetails.way,
            goodId: Number(goodsDetails.goods_Id),
            newGoodId: Number(goodsDetails.goods_Id),
            count: Number(goodsDetails.count),
            total: Number(goodsDetails.total),
            open: Number(goodsDetails.open),
            replenish: goodsDetails.count
        }
    }

    // 选择商品 

    table.on('row(goodsTable)', function (obj) {
        console.log(goodKeyFlag)
        if (goodKeyFlag == 1) {
            $('.editAisle input[name="goodsName"]').val(obj.data.mail == 1 ? '(邮寄)' + obj.data.goods_Name : obj.data.goods_Name);
            $('.editAisle input[name="goodsName"]').attr('IVal', obj.data.goods_Id);
            $('.editAisle input[name="price"]').val(obj.data.goods_Price);
            popupHide('goodsCont', 'goodsBox')
        } else {
            $('.addPanelBody input[name="panelGoodsName"]').val(obj.data.mail == 1 ? '(邮寄)' + obj.data.goods_Name : obj.data.goods_Name);
            $('.addPanelBody input[name="panelGoodsName"]').attr('IVal', obj.data.goods_Id);
            popupHide('goodsCont', 'goodsBox');
        }

    });
    // 修改详情
    $('.editAisle .ediaisleBtn').click(function () {
        if (!($('.editAisle input[name="goodsName"]').attr('IVal'))) {
            layer.msg('请选择商品', { icon: 7 });
            return;
        }
        if (!($('.editAisle input[name="price"]').val())) {
            layer.msg('请输入在售价格', { icon: 2 });
            return;
        }
        if (!($('.editAisle input[name="count"]').val() && $('.editAisle input[name="total"]').val())) {
            layer.msg('数量和容量为为必填', { icon: 7 });
            return;
        }
        if (!(Number($('.aisleList input[name="total"]').val()) >= Number($('.aisleList input[name="count"]').val()))) {
            layer.msg('货道容量不能小于当前数量', { icon: 7 });
            return;
        }
        // if($('.editAisle input[name="goodsName"]').attr('IVal')!=goodsDetails.goods_Id){
        //     var repeatFlag=wayFlagArr.every(item=>{
        //         return item.goods_Id!=$('.editAisle input[name="goodsName"]').attr('IVal')
        //     })
        //     if(!repeatFlag){
        //         layer.msg('该商品已在其他货道上架，请勿在不同货道上架同一商品',{icon:7})
        //         return ;
        //     }
        // }
        // console.log(repeatFlag)
        // return ;
        var editData = JSON.stringify({
            machineId: machineSetData.machineId,
            way: goodsDetails.way,
            goodId: Number(goodsDetails.goods_Id ? goodsDetails.goods_Id : $('.editAisle input[name="goodsName"]').attr('IVal')),
            newGoodId: Number($('.editAisle input[name="goodsName"]').attr('IVal')),
            replenish: goodsDetails.goods_Id ? goodsDetails.count : 0,
            count: Number($('.editAisle input[name="count"]').val()),
            total: Number(goodsDetails.goods_Id ? goodsDetails.total : 0),
            newTotal: Number($('.editAisle input[name="total"]').val()),
            status: goodsDetails.open,
            newStatus: Number($('.editAisle select[name="testSele"]').val()),
            price: goodsDetails.goods_Id ? goodsDetails.price + '' : '0',
            newPrice: $('.editAisle input[name="price"]').val() + '',
            // replenish: Number($('.editAisle input[name="count"]').val()) - goodsDetails.count
        });
        if (editData == JSON.stringify(flagObj)) {
            popupHide('editAisle', 'editAisleBox');
            return;
        };
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        loadingAjax('/machine/updateGoodWay', 'post', editData, sessionStorage.token, 'mask', 'editAisle', 'editAisleBox', layer).then(res => {
            layer.msg(res.message, { icon: 1 });
            getGoodsWay(machineSetData.machineId);
            loadingAjax('/refreshGoods', 'post', '', sessionStorage.token).then(res => { }).catch(err => { })
        }).catch(err => {
            console.log(err);
            layer.msg(err.message, { icon: 2 })
        })
    });
    // 增加详情;
    var addIndex = null;
    $('.aisleDetails').on('click', '.addAisle', function () {
        addIndex = $(this).attr('indexVal');
        if (sessionStorage.independentPass) {
            popupShow('addDetalis', 'addCont');
        } else {
            popupShow('iPasswprd', 'passwordCont')
        }


    });
    // 取消
    $('.addCancelBtn').click(function () {
        popupHide('addDetalis', 'addCont')
    });
    // 确定
    $('.addDetalisBtn').click(function () {
        if ($('.addDetalis input[name="addNum"]').val() != '' && $('.addDetalis input[name="addNum"]').val() > 0) {
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon')
            var addAisleData = JSON.stringify({
                machineId: machineSetData.machineId,
                way: Number(addIndex),
                count: Number($('.addDetalis input[name="addNum"]').val())
            });
            loadingAjax('/machine/insertGoodWay', 'post', addAisleData, sessionStorage.token, 'mask', 'addDetalis', 'addCont', layer).then(res => {
                console.log(res)
                layer.msg(res.message, { icon: 1 });
                againFun(res);
                $('.addDetalis input[name="addNum"]').val(' ')
            }).catch(err => {
                layer.msg(err.message, { icon: 2 })
            })
        } else {
            layer.msg('数量必须大于0', { icon: 7 })
        }
    });

    // 正整数验证
    var reduction = 1;
    $('.addDetalis input[name="addNum"]').keyup(function () {
        var num = $(this).val(),
            re = /^\d*$/;
        if (!re.test(num)) {
            layer.msg('只能输入正整数', { icon: 7 });
            $(this).val(reduction)
        } else {
            reduction = $(this).val();
            console.log(reduction)
        }
    });
    $('.testNumdev input').keyup(function () {
        var num = $(this).val(),
            re = /^\d*$/;
        if (!re.test(num)) {
            layer.msg('只能输入正整数', { icon: 7 });
            $(this).val('')
        } else {
            // reduction = $(this).val();
            // console.log(reduction)
        }
    });
    var delArr = [];
    var delIndex = null;
    $('.delBtn').click(function () {
        delArr = [];
        delIndex = 1;
        var delAll = form.val("delDetalis");
        console.log(delAll);
        if (JSON.stringify(delAll) == '{}') {
            layer.msg('请选择需要删除的货道', { icon: 7 });
            return;
        }
        layer.confirm('确定删除？', function (index) {
            layer.close(index);
            for (let i in delAll) {
                delArr.push(Number(delAll[i]))
            };
            if (!(sessionStorage.independentPass)) {
                popupShow('iPasswprd', 'passwordCont');
                return;
            }
            console.log(delArr);
            var delData = JSON.stringify({
                machineId: machineSetData.machineId,
                ways: delArr
            });
            delFun(delData)
        })
    });

    function delFun(delDataVal) {
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        loadingAjax('api/machine/deleteGoodWay', 'post', delDataVal, sessionStorage.token, 'mask', '', '', layer).then(res => {
            console.log(res);
            layer.msg(res.message, { icon: 1 });
            againFun(res)
        }).catch(err => {
            layer.msg(err.message, { icon: 2 })
        })
    };
    //支付类型设置
    // 获取支付参数
    var weId = null,
        aliId = null,
        AcbcId = null;
    function supportpay(machindID, merchantsID) {
        var payList = JSON.stringify({
            machineId: machindID,
        })
        loadingAjax('/pay/getMachinePayParam', 'post', payList, sessionStorage.token).then(res => {
            loadingAjax('/pay/getPayParam', 'post', JSON.stringify({ merchantId: Number(merchantsID) }), sessionStorage.token).then(pres => {
                var setPayStr = ''
                res.data.forEach((item, index) => {
                    if (item.id == 1) {
                        aliId = item.selectPay.length > 0 ? item.selectPay[0].mpId : 0
                    } else if (item.id == 2) {
                        weId = item.selectPay.length > 0 ? item.selectPay[0].mpId : 0
                    } else if (item.id == 3) {
                        AcbcId = item.selectPay.length > 0 ? item.selectPay[0].mpId : 0
                    }
                    if (item.status == 1) {
                        setPayStr += `<div class="layui-form-item">
                                        <label class="layui-form-label">${item.tName}：</label>
                                    <div class="layui-input-block">`
                        if (item.selectPay.length == 0) {
                            setPayStr += `<input type="radio" lay-filter="${item.id == 3 ? 'radioTest3' : 'radioTest'}" name="${item.id}" value="${0 + '-' + 0}" title="无" checked>`
                        } else {
                            setPayStr += `<input type="radio" lay-filter="${item.id == 3 ? 'radioTest3' : 'radioTest'}" name="${item.id}" value="${item.selectPay[0].mpId + '-' + 0}" title="无" >`
                        }
                        pres.data.forEach((e, i) => {
                            if (item.id == e.payType) {
                                setPayStr += `<input type="radio" lay-filter="${item.id == 3 ? 'radioTest3' : 'radioTest'}" name="${item.id}" value="${(item.selectPay.length > 0 ? item.selectPay[0].mpId : 0) + '-' + e.id}" title="${e.payee}" ${item.selectPay.length <= 0 ? '' : item.selectPay[0].paramId == e.id ? 'checked' : ''} >`
                            }
                        })
                        setPayStr += `</div>
                        </div>`
                    }
                })
                $('#setPayList').html(setPayStr)
                form.render('radio');
            }).catch(err => {
                console.log(err)
                layer.msg(err.message, { icon: 2 })
            })
        }).catch(err => {
            layer.msg(err.message, { icon: 2 })
        })
    }
    $('.paySet .paySetBtn').click(function () {
        var payFormData = form.val("paySetData");
        console.log(payFormData)
    })

    form.on('radio(radioTest)', function (data) {
        console.log(data)
        layer.confirm('确定修改收款账户？(温馨提示：工行支付不能与微信支付、支付宝支付共用)', function (index) {
            layer.close(index);
            console.log(data); //被点击的radio的value值;
            var dataID = data.value.split('-');
            console.log(dataID)
            var setMachinePay = JSON.stringify({
                machineId: machineSetData.machineId,
                paramId: Number(dataID[1]),
                mpId: Number(dataID[0])
            });
            loadingAjax('/pay/updateMachinePayParam', 'post', setMachinePay, sessionStorage.token).then(res => {
                layer.msg(res.message, { icon: 1 })
                if (Number(dataID[1]) != '0' && AcbcId != '0') {
                    var acbcObj = JSON.stringify({
                        machineId: machineSetData.machineId,
                        paramId: 0,
                        mpId: Number(AcbcId)
                    })
                    loadingAjax('/pay/updateMachinePayParam', 'post', acbcObj, sessionStorage.token).then(res => {
                        supportpay(machineSetData.machineId, machineSetData.userNum);
                    }).catch(err => { })
                } else {
                    supportpay(machineSetData.machineId, machineSetData.userNum);
                }


            }).catch(err => {
                layer.msg(err.message, { icon: 2 })
            })
        }, function () {
            supportpay(machineSetData.machineId, machineSetData.userNum)
        })
    });
    form.on('radio(radioTest3)', function (data) {
        layer.confirm('确定修改收款账户？(温馨提示：工行支付不能与微信支付、支付宝支付共用)', function (index) {
            layer.close(index);
            var dataID = data.value.split('-');
            var setMachinePay = JSON.stringify({
                machineId: machineSetData.machineId,
                paramId: Number(dataID[1]),
                mpId: Number(dataID[0])
            });

            loadingAjax('/pay/updateMachinePayParam', 'post', setMachinePay, sessionStorage.token).then(res => {
                layer.msg(res.message, { icon: 1 })

                if (Number(dataID[1]) != '0' && weId != '0') {
                    var weObj = JSON.stringify({
                        machineId: machineSetData.machineId,
                        paramId: 0,
                        mpId: Number(weId)
                    })
                    loadingAjax('/pay/updateMachinePayParam', 'post', weObj, sessionStorage.token).then(res => { }).catch(err => { })
                }
                if (Number(dataID[1]) != '0' && aliId != '0') {
                    var aliObj = JSON.stringify({
                        machineId: machineSetData.machineId,
                        paramId: 0,
                        mpId: Number(aliId)
                    })
                    loadingAjax('/pay/updateMachinePayParam', 'post', aliObj, sessionStorage.token).then(res => {
                        supportpay(machineSetData.machineId, machineSetData.userNum);
                    }).catch(err => { })
                } else {
                    supportpay(machineSetData.machineId, machineSetData.userNum);
                }

                // setImmediate(_=>{
                //     supportpay(machineSetData.machineId, machineSetData.userNum);
                // },0)

            }).catch(err => {
                layer.msg(err.message, { icon: 2 })
            })
        }, function () {
            supportpay(machineSetData.machineId, machineSetData.userNum)
        })
    })
    //   客服信息部分
    var machineServiceFlag = false;
    // 更改客服微信二维码
    $('.uploadBtn input').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        $.ajax({
            type: 'post',
            url: `${vApi}/fileUpload`,
            processData: false,
            contentType: false,
            headers: {
                token,
            },
            data: upDetails,
            success: function (res) {
                $(that).val('')
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                if (res.code == 0) {
                    $('.ImgCont img').prop('src', res.data.src);
                    $('.ImgCont').show();
                } else {
                    layer.msg(res.message, { icon: 7 });
                }
            },
            error: function (err) {
                $(that).val('')
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('上传失败', { icon: 2 })
            }
        })
    });
    // 删除图片
    $('.delImgBtn').click(function () {
        $('.ImgCont img').prop('src', '');
        $('.ImgCont').hide();
    });
    // 监听客服开关
    form.on('switch(machineOpen)', function (data) {
        machineServiceFlag = data.elem.checked;
        if (data.elem.checked) {
            $('.serviceTitle').slideDown();
        } else {
            $('.serviceTitle').slideUp();
        }
    });
    // 监听定制开关
    var customFlag = false;
    form.on('switch(customOpen)', function (data) {
        customFlag = data.elem.checked;
        if (data.elem.checked) {
            $('.customTitle').slideDown();
        } else {
            $('.customTitle').slideUp();
        }
    });
    $('.uploadBtn2 input').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        $.ajax({
            type: 'post',
            url: `${vApi}/fileUpload`,
            processData: false,
            contentType: false,
            headers: {
                token,
            },
            data: upDetails,
            success: function (res) {
                $(that).val('')
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                if (res.code == 0) {
                    $('.customImgCont img').prop('src', res.data.src);
                    $('.customImgCont').show();
                } else {
                    layer.msg(res.message, { icon: 7 });
                }
            },
            error: function (err) {
                $(that).val('')
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('上传失败', { icon: 2 })
            }
        })
    });
    $('.delImgBtn2').click(function () {
        $('.customImgCont img').prop('src', '');
        $('.customImgCont').hide();
    });
    // 销售经理类别
    var salseList = [];
    // 获取商户销售经理类别
    function salesClassList(mobj, mNum) {
        var salesObj = JSON.stringify({
            merchantId: mobj.userNum,
            pageSize: 10,
            pageNum: mNum
        })
        if (mNum == 1) {
            salseList = []
        }
        loadingAjax('/sales_manager/getSalesType', 'post', salesObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
            salseList = salseList.concat(res.data.list);
            ToSalseListFun(salseList, mobj)
            // if (res.data.list.length == 10) {
            //     $('.loadMore').show();
            // } else {
            //     $('.loadMore').hide();
            // }
        }).catch(err => {
            console.log(err)
            layer.msg(err.message, { icon: 2 })
        })
    };
    // 渲染销售经理列表

    function ToSalseListFun(ToList, mobj) {
        console.log(funNum)
        var salseStr = '';
        if (funNum == 1) {
            $('.salseCont').html('');
            salseStr = `<input type="radio" ${mobj.is_sales == 0 ? 'checked' : ''} name="salseClassName" value="-99" title="不启用" >
            <input type="radio" name="salseClassName" ${mobj.is_sales == 1 ? mobj.sales_type ? '' : 'checked' : ''} value="" title="默认" >`;
            funNum++
        }

        ToList.forEach(item => {
            salseStr += `<input type="radio" name="salseClassName" ${mobj.is_sales == 1 ? machineSetData.sales_type == item.sm_classify ? 'checked' : '' : ''} value="${item.sm_classify}" title="${item.sm_classify}">`
        });
        $('.salseCont').append(salseStr);
        form.render();
    };


    // 补货记录
    var replenishmentList = null;
    function replenishmenFun() {
        replenishmentList = table.render({
            elem: '#replenishmentTable',
            url: `${vApi}/machine/getReplenish`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {
                    field: 'way', width: 250, title: '补货人', align: 'center', templet: function (d) {
                        return d.name + '(' + d.username + ')'
                    }
                },
                {
                    field: 'replenish_time', width: 230, title: '补货时间', align: 'center', templet: function (d) {
                        if (d.replenish_time) {
                            return timeStamp(d.replenish_time)
                        } else {
                            return '-'
                        }
                    }
                },
                { field: 'way', width: 100, title: '补货货道', align: 'center' },
                {
                    field: 'goods_Name', width: 180, title: '商品名', align: 'center',
                },
                {
                    field: 'replenish_count', width: 150, title: '补货前数量', align: 'center', templet: function (d) {
                        return d.after_count - d.replenish_count
                    }
                },
                {
                    field: 'replenish_count', width: 150, title: '补货数量', align: 'center'
                },
                {
                    field: 'after_count', width: 150, title: '补货后数量', align: 'center',
                },


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
                machineId: machineSetData.machineId,
                start_time: replenishmentStartTime ? replenishmentStartTime : null,
                end_time: sreplenishmentEndTime ? sreplenishmentEndTime : null
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
    };

    //开始时间
    var replenishmentStartTime = getKeyTime().startTime;
    //结束时间
    var sreplenishmentEndTime = getKeyTime().endTime;
    laydate.render({
        elem: '#test8',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            // console.log(value); //得到日期生成的值，如：2017-08-18
            var timerKey = value.split(' - ');
            replenishmentStartTime = timerKey[0];
            sreplenishmentEndTime = timerKey[1];
        }
    });
    $('.replenishment .RQueryBtn').click(function () {
        if (timeFlag(replenishmentStartTime, sreplenishmentEndTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        replenishmentList.reload({
            where: {
                way: $('.replenishment select[name="shipSelect"]').val(),
                goods_Name: $('.replenishment input[name="replenishmentGoodName"]').val(),
                start_time: replenishmentStartTime ? replenishmentStartTime : null,
                end_time: sreplenishmentEndTime ? sreplenishmentEndTime : null
            }
        })
    });
    // 导出补货记录
    $('.replenishmentPushBtn').click(function () {
        if (timeFlag(replenishmentStartTime, sreplenishmentEndTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        // dataOf = myDate.getFullYear() + '' + (myDate.getMonth()+1>=10?myDate.getMonth()+1:'0'+(myDate.getMonth()+1) )+ '' +( myDate.getDate()>=10?myDate.getDate():'0'+myDate.getDate()),
        var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
        xhr.open("GET", `${vApi}/excelReplenish?startDate=${replenishmentStartTime}&endDate=${sreplenishmentEndTime}&machineId=${machineSetData.machineId}&way=${$('.replenishment select[name="shipSelect"]').val()}&goods_Name=${$('.replenishment input[name="replenishmentGoodName"]').val()}`, true);
        xhr.setRequestHeader("token", sessionStorage.token);
        // xhr.setRequestHeader('Content-Type', 'charset=utf-8');
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;

        xhr.onload = function (res) {
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
                var fileName = `${machineSetData.info}(${machineSetData.number})补货记录(${replenishmentStartTime}-${sreplenishmentEndTime}).xls`
                var elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            } else {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('服务器请求超时', { icon: 2 });
                return;
            }
        }
        xhr.send();
    })
    //开始时间
    var editStartTime = getKeyTime().startTime;
    //结束时间
    var editEndTime = getKeyTime().endTime;
    laydate.render({
        elem: '#test10',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            // console.log(value); //得到日期生成的值，如：2017-08-18
            var timerKey = value.split(' - ');
            editStartTime = timerKey[0];
            editEndTime = timerKey[1];
        }
    });
    // 修改价格记录部分
    var priceTable = null;
    function priceFun() {
        priceTable = table.render({
            elem: '#priceEdit',
            url: `${vApi}/machine/getPriceRecord`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                // { field: 'way', width: 150, title: '货道', align: 'center', },
                { field: 'old_price', width: 150, title: '修改前价格', align: 'center', },
                { field: 'new_price', width: 150, title: '修改后价格', align: 'center', },
                { field: 'goods_Name', width: 150, title: '商品名', align: 'center', },
                { field: 'user_name', width: 150, title: '修改人', align: 'center', },
                {
                    field: 'way', width: 250, title: '修改时间', align: 'center', templet: function (d) {
                        return d.change_time ? timeStamp(d.change_time) : '-'
                    }
                },
            ]]
            , id: 'priceId'
            , page: true
            , loading: true
            , limits: [10, 20, 50, 100]
            ,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                machineId: machineSetData.machineId,
                startDate: editStartTime,
                endDate: editEndTime
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
    // 修改价格查询
    $('.editQueryBtn').click(function () {
        if (timeFlag(editStartTime, editEndTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        priceTable.reload({
            where: {
                goods_Name: $('.price input[name="priceGoodName"]').val(),
                startDate: editStartTime ? editStartTime : null,
                endDate: editEndTime ? editEndTime : null
            }
        })
    });
    // 修改价格导出
    $('.editPircePushBtn').click(function () {
        if (timeFlag(editStartTime, editEndTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        };
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        // dataOf = myDate.getFullYear() + '' + (myDate.getMonth()+1>=10?myDate.getMonth()+1:'0'+(myDate.getMonth()+1) )+ '' +( myDate.getDate()>=10?myDate.getDate():'0'+myDate.getDate()),
        var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
        xhr.open("GET", `${vApi}/excelPriceRecord?startDate=${editStartTime}&endDate=${editEndTime}&machineId=${machineSetData.machineId}&goods_Name=${$('.price input[name="priceGoodName"]').val()}`, true);
        xhr.setRequestHeader("token", sessionStorage.token);
        // xhr.setRequestHeader('Content-Type', 'charset=utf-8');
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;

        xhr.onload = function (res) {
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
                var fileName = `${machineSetData.info}(${machineSetData.number})修改价格记录(${editStartTime}-${editEndTime}).xls`
                var elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            } else {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('服务器请求超时', { icon: 2 });
                return;
            }
        }
        xhr.send();
    })
    // 开门记录部分
    var openDoorTable = null;
    function openDoorFun() {
        openDoorTable = table.render({
            elem: '#openTheDoor',
            url: `${vApi}/machine/getDoorRecord`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'info', width: 250, title: '售货机名', align: 'center', },
                { field: 'openType', width: 150, title: '类型', align: 'center', },
                { field: 'username', width: 150, title: '操作人', align: 'center', },
                {
                    field: 'goods_Name', width: 250, title: '开门时间', align: 'center', templet: function (d) {
                        return d.open_time ? timeStamp(d.open_time) : '-'
                    }
                },
            ]]
            , id: 'openTheDoorId'
            , page: true
            , loading: true
            , limits: [10, 20, 50, 100]
            ,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                machineId: machineSetData.machineId
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
    };
    //开始时间
    var openSTime = getKeyTime().startTime;
    //结束时间
    var openETime = getKeyTime().endTime;
    laydate.render({
        elem: '#test9',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            // console.log(value); //得到日期生成的值，如：2017-08-18
            var timerKey = value.split(' - ');
            openSTime = timerKey[0];
            openETime = timerKey[1];
        }
    });
    $('.openDoorRecord .opeQuery').click(function () {
        if (timeFlag(openSTime, openETime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        openDoorTable.reload({
            where: {
                start_time: openSTime ? openSTime : null,
                end_time: openETime ? openETime : null
            }
        })
    });
    // 开门记录导出
    $('.openDoorPushBtn').click(function () {
        if (timeFlag(openSTime, openETime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        };
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        // dataOf = myDate.getFullYear() + '' + (myDate.getMonth()+1>=10?myDate.getMonth()+1:'0'+(myDate.getMonth()+1) )+ '' +( myDate.getDate()>=10?myDate.getDate():'0'+myDate.getDate()),
        var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
        xhr.open("GET", `${vApi}/excelDoorRecord?startDate=${openSTime}&endDate=${openETime}&machineId=${machineSetData.machineId}`, true);
        xhr.setRequestHeader("token", sessionStorage.token);
        // xhr.setRequestHeader('Content-Type', 'charset=utf-8');
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;

        xhr.onload = function (res) {
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
                var fileName = `${machineSetData.info}(${machineSetData.number})开门记录(${openSTime}-${openETime}).xls`
                var elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            } else {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('服务器请求超时', { icon: 2 });
                return;
            }
        }
        xhr.send();
    });
    laydate.render({
        elem: '#test101'
    });
    // 导出补货单
    var repairInvoiceData = null;
    $('.invoicePushBtn').click(function () {
        loadingAjax('/machine/getGoodReplenish', 'post', JSON.stringify({ machineId: machineSetData.machineId }), sessionStorage.token, '', '', layer).then(res => {
            repairInvoiceData = res.data;
            if (repairInvoiceData.good_info.length == 0) {
                layer.msg('未查询到缺货商品', { icon: 7 });
                return;
            }
            RgoodsFun(repairInvoiceData.good_info);
            $('.supplierName').html(repairInvoiceData.supplier + '商品调拨(补货)单')
            $('.repairInvoiceBody input[name="iMachineName"]').val(`${repairInvoiceData.info}(${repairInvoiceData.number})`);
            $('.repairInvoiceBody input[name="supplier"]').val(repairInvoiceData.supplier);
            $('.repairInvoiceBody input[name="supplyName"]').val(repairInvoiceData.supplyName);
            $('.repairInvoiceBody input[name="supplyPhone"]').val(repairInvoiceData.supplyPhone);
            $('.repairInvoiceBody input[name="checkFlagName"]').val(repairInvoiceData.checkFlagName);
            $('.repairInvoiceBody input[name="acceptanceName"]').val(repairInvoiceData.acceptanceName);
            $('.repairInvoiceBody input[name="acceptancePhone"]').val(repairInvoiceData.acceptancePhone);
            $('.repairInvoiceBody input[name="wareManagement"]').val(repairInvoiceData.wareManagement);
            $('.repairInvoiceBody input[name="operator"]').val(repairInvoiceData.operator);
            $('.repairInvoiceBody input[name="consignee"]').val(repairInvoiceData.consignee);
            popupShow('repairInvoice', 'repairInvoiceBox');
        }).catch(err => {
            layer.msg(err.message, { icon: 7 })
        })
    });
    function RgoodsFun(list) {
        var Rstr = '';
        list.forEach((item, index) => {
            Rstr += `<li class="detaillHeader">
                        <div class="headerIndex1">
                            <label for="">${index + 1}</label>
                        </div>
                        <div class="headerGoods">
                            <label for="">${item.goodName}</label>
                        </div>
                        <div class="headerNum oldNums">
                            <!-- <label for="">原机货数</label> -->
                            <input type="number" name="oloNum" value="${item.oldCount}" disabled>
                        </div>
                        <div class="headerNum reNums">
                            <!-- <label for="">应补货数</label> -->
                            <input type="number" name="shouldName" value="${item.replenish}">
                        </div>
                        <div class="headerNum newNums">
                            <input type="number" name="newNum" disabled value="${item.newCount}">
                        </div>
                        <div class="headerNum inNums">
                            <input type="number" name="panelNam" value="${item.showCount}">
                        </div>
                        <div class="headerNum totalNums">
                            <input type="number" name="totalNum" disabled value="${item.replenish + item.showCount}">
                        </div>
                     </li>`


        })
        $('.detaillBody').html(Rstr)
    };

    // 应补货数量改变
    var CNumber = 1;
    $('.detaillBody').on('input', 'input[name="shouldName"]', function () {
        var re = /^\d*$/;
        if (!re.test($(this).val())) {
            layer.msg('只能输入正整数', { icon: 7 });
            $(this).val(CNumber);
            return;
        }
        CNumber = $(this).val();
        $(this).parent().siblings('.newNums').children().val(Number(CNumber) + Number($(this).parent().siblings('.oldNums').children().val()));
        $(this).parent().siblings('.totalNums').children().val(Number(CNumber) + Number($(this).parent().siblings('.inNums').children().val()));
    });
    // 应补展板数改变
    var DNum = 1;
    $('.detaillBody').on('input', 'input[name="panelNam"]', function () {
        var re = /^\d*$/;
        if (!re.test($(this).val())) {
            layer.msg('只能输入正整数', { icon: 7 });
            $(this).val(DNum);
            return;
        };
        DNum = $(this).val();
        $(this).parent().siblings('.totalNums').children().val(Number(DNum) + Number($(this).parent().siblings('.reNums').children().val()));
    });
    $('.repairInvoiceFooter .ReBtn').click(function () {
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var good_infoAyy = [];
        for (let i = 0; i < repairInvoiceData.good_info.length; i++) {
            var goodsInfoObj = {
                goodName: repairInvoiceData.good_info[i].goodName,
                newCount: Number($('.detaillBody .detaillHeader').eq(i).find('input[name="newNum"]').val()),
                oldCount: repairInvoiceData.good_info[i].oldCount,
                replenish: Number($('.detaillBody .detaillHeader').eq(i).find('input[name="shouldName"]').val()),
                showCount: Number($('.detaillBody .detaillHeader').eq(i).find('input[name="panelNam"]').val()),
                totalCount: Number($('.detaillBody .detaillHeader').eq(i).find('input[name="totalNum"]').val()),
                id: i + 1
            };
            good_infoAyy.push(goodsInfoObj)
        }
        var repairInvoiceObj = JSON.stringify({
            machineName: $('.repairInvoiceBody input[name="iMachineName"]').val(),
            deliverTime: $('#test101').val(),
            supplier: $('.repairInvoiceBody input[name="supplier"]').val(),
            supplyName: $('.repairInvoiceBody input[name="supplyName"]').val(),
            supplyPhone: $('.repairInvoiceBody input[name="supplyPhone"]').val(),
            checkFlagName: $('.repairInvoiceBody input[name="checkFlagName"]').val(),
            acceptanceName: $('.repairInvoiceBody input[name="acceptanceName"]').val(),
            acceptancePhone: $('.repairInvoiceBody input[name="acceptancePhone"]').val(),
            wareManagement: $('.repairInvoiceBody input[name="wareManagement"]').val(),
            operator: $('.repairInvoiceBody input[name="operator"]').val(),
            consignee: $('.repairInvoiceBody input[name="consignee"]').val(),
            number: repairInvoiceData.number,
            good_info: good_infoAyy
        });

        // dataOf = myDate.getFullYear() + '' + (myDate.getMonth()+1>=10?myDate.getMonth()+1:'0'+(myDate.getMonth()+1) )+ '' +( myDate.getDate()>=10?myDate.getDate():'0'+myDate.getDate()),
        var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
        xhr.open("POST", `${vApi}/machine/exportGoodReplenish`, true);
        xhr.setRequestHeader("token", sessionStorage.token);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;
        xhr.onload = function (res) {
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                var fileName = `${repairInvoiceData.supplier}商品调拨（补货）单.xls`
                var elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
                popupHide('repairInvoice', 'repairInvoiceBox')
            } else {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('服务器请求超时', { icon: 2 });
                return;
            }
        }
        xhr.send(repairInvoiceObj);
    });

    // 取消补货单
    $('.rCancelBtn').click(function () {
        popupHide('repairInvoice', 'repairInvoiceBox')
    });

    // 清除货道故障
    $('.clearingBtn').click(function () {
        layer.confirm('确定清除货道故障？', function (index) {
            layer.close(index);
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            loadingAjax('/machine/clearLockMachineWay', 'post', JSON.stringify({ machineId: machineSetData.machineId }), sessionStorage.token, 'mask', '', '', layer).then(res => {
                layer.msg(res.message, { icon: 1 });
                getGoodsWay(machineSetData.machineId);
            }).catch(err => {
                layer.msg(err.message, { icon: 2 })
            })
        })
    });
    // 导出售货机
    $('.pushMachineBtn').click(function () {
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var myDate = new Date(),
            // dataOf = myDate.getFullYear() + '' + (myDate.getMonth()+1>=10?myDate.getMonth()+1:'0'+(myDate.getMonth()+1) )+ '' +( myDate.getDate()>=10?myDate.getDate():'0'+myDate.getDate()),
            xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
        xhr.open("GET", `${vApi}/excelMachine?merchantId=${sessionStorage.machineGoodsId}`, true);
        xhr.setRequestHeader("token", sessionStorage.token);
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;
        xhr.onload = function (res) {
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                var fileName = `${sessionStorage.machineName}售货机列表.xls`
                var elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            } else {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('服务器请求超时', { icon: 2 });
                return;
            }
        }
        xhr.send();
    });

    // 展板部分
    var panelTableIn = null;
    function panelFun() {
        panelTableIn = table.render({
            elem: '#panelTable',
            url: `${vApi}/machine/getDisplayGood`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'goods_Name', width: 150, title: '图片', align: 'center', templet: "#panelImg" },
                { field: 'goods_Name', width: 150, title: '商品名', align: 'center', },
                { field: 'goodCount', width: 150, title: '数量', align: 'center', },
                { field: 'oldGoodCount', width: 150, title: '原数量', align: 'center', },
                { field: 'last_user', width: 150, title: '修改人', align: 'center', },
                {
                    field: 'last_time', width: 180, title: '修改时间', align: 'center', templet: function (d) {
                        return d.last_time ? timeStamp(d.last_time) : '-'
                    }
                },
                { field: 'operation', fixed: 'right', right: 0, width: 150, title: '操作', toolbar: '#panelId', align: 'center' },
            ]]
            , id: 'panelID'
            // , page: true
            , loading: true
            // , limits: [ 10,20, 30,50, 100]
            ,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                machineId: machineSetData.machineId,
            },
            parseData: function (res) {
                // console.log(res)
                //res 即为原始返回的数据
                if (res.code == 200) {
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "count": res.data.length, //解析数据长度
                        "data": res.data //解析数据列表
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
                permissions1();
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        });
    };
    // 添加展板
    var panelIndex = null;
    $('.addpanelBtn').click(function () {
        panelIndex = 1;
        $('.addPanelCont input[name="panelGoodsName"]').attr('IVal', '');
        $('.addPanelCont input[name="panelGoodsName"]').val('');
        $('.addPanelCont input[name="panelGoodsNum"]').val('');
        $('.addPanelBox .playHeader span').html('添加展板商品')
        popupShow('addPanelCont', 'addPanelBox');
    });
    // 展板选择商品
    $('.relative1').click(function () {
        popupShow('goodsCont', 'goodsBox')
        if (goodsTableIns) {
            goodsTableIns.reload({
                where: {
                    condition: sessionStorage.machineGoodsId,
                }
            })
        } else {
            goodsreload();
        }
    });
    // 添加
    $('.addPanelCont .panelAddBtn').click(function () {
        if (!($('.addPanelCont input[name="panelGoodsName"]').val() && $('.addPanelCont input[name="panelGoodsNum"]').val())) {
            layer.msg('带*为必填', { icon: 7 });
            return;
        };
        var panelApi = panelIndex == 1 ? '/machine/newDisplayGood' : '/machine/updateDisplayGoodCount';
        var panelAddObj = JSON.stringify({
            machineId: machineSetData.machineId,
            goodId: Number($('.addPanelCont input[name="panelGoodsName"]').attr('IVal')),
            goodCount: Number($('.addPanelCont input[name="panelGoodsNum"]').val()),
        });
        loadingAjax(panelApi, 'post', panelAddObj, sessionStorage.token, 'mask', 'addPanelCont', 'addPanelBox', layer).then(res => {
            layer.msg(res.message, { icon: 1 });
            panelTableIn.reload({
                where: {}
            });
            $('.addPanelCont input[name="panelGoodsName"]').attr('IVal', '');
            $('.addPanelCont input[name="panelGoodsName"]').val('');
            $('.addPanelCont input[name="panelGoodsNum"]').val('');
        }).catch(err => {
            layer.msg(err.message, { icon: 7 });
        })
    });
    // 取消添加
    $('.addPanelCont .addPanelCance').click(function () {
        popupHide('addPanelCont', 'addPanelBox');
    })
    // 展板监听
    table.on('tool(panelTable)', function (obj) {
        console.log(obj)
        if (obj.event == 'del') {
            layer.confirm('确定移除？', function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                var delObj = JSON.stringify({
                    machineId: machineSetData.machineId,
                    goodId: obj.data.goods_Id
                });
                loadingAjax('/machine/removeDisplayGoodCount', 'post', delObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
                    layer.msg(res.message, { icon: 1 });
                    panelTableIn.reload({
                        where: {}
                    });
                }).catch(err => {
                    layer.msg(err.message, { icon: 2 })
                })
            })
        } else if (obj.event == 'edit') {
            panelIndex = 2
            $('.addPanelCont input[name="panelGoodsName"]').attr('IVal', obj.data.goods_Id);
            $('.addPanelCont input[name="panelGoodsName"]').val(obj.data.goods_Name);
            $('.addPanelCont input[name="panelGoodsNum"]').val(obj.data.goodCount);
            $('.addPanelBox .playHeader span').html('编辑展板商品')
            popupShow('addPanelCont', 'addPanelBox');
        }
    });
    // 撤销货道
    $('.undoAisleBtn').click(function () {
        layer.confirm('确定撤销货道?', function (index) {

            layer.close(index);
            aisleType = 2;
            if (sessionStorage.independentPass) {
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                loadingAjax('/machine/removeGoodWay', 'post', JSON.stringify({ machineId: machineSetData.machineId, }), sessionStorage.token, 'mask', '', '').then(res => {
                    layer.msg(res.message, { icon: 1 });
                    getGoodsWay(machineSetData.machineId);
                }).catch(err => {
                    layer.msg(err.message, { icon: 2 })
                });
            } else {
                popupShow('iPasswprd', 'passwordCont')
            }


        })
    });

    // 撤货记录
    var undoTableIn = null;
    function undoFun() {
        undoTableIn = table.render({
            elem: '#undoTable',
            url: `${vApi}/machine/findRemove`,
            method: 'get',
            //   contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'goodName', width: 150, title: '商品名', align: 'center', },
                { field: 'way', width: 130, title: '货道', align: 'center', },
                { field: 'count', width: 150, title: '数量', align: 'center', },
                { field: 'price', width: 150, title: '价格', align: 'center', },
                { field: 'userName', width: 215, title: '撤货人', align: 'center', },
                { field: 'removeDate', width: 200, title: '撤货时间', align: 'center', },
            ]]
            , id: 'undoId'
            , page: true
            , loading: true
            // , limits: [ 10,20, 30,50, 100]
            ,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                machineId: machineSetData.machineId,
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
                permissions1();
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        });
    };
    //   导出撤货记录
    $('.undoPushBtn').click(function () {
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
        xhr.open("GET", `${vApi}/excelRemove?machineId=${machineSetData.machineId}`, true);
        xhr.setRequestHeader("token", sessionStorage.token);
        //   xhr.setRequestHeader('Content-Type', 'charset=utf-8');
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;

        xhr.onload = function (res) {
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
                var fileName = `${machineSetData.info}撤货记录.xls`
                var elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            } else {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('服务器请求超时', { icon: 2 });
                return;
            }
        }
        xhr.send();
    });
    // 图片放大事件
    var PImgSHow = true;
    $('.goodsCont').on('mouseenter', '.pic102', function (e) {
        var that = this;
        $('#pic101').attr('src', $(that).attr('src'));
        var img = new Image();
        img.onload = function () {
            $("#pic101").css({
                "width": this.width >= this.height ? 350 + 'px' : 'auto',
                "height": this.height > this.width ? 350 + 'px' : 'auto'
            }).fadeIn("fast");
            this.onload = null;

        };
        img.src = $(that).attr('src');
    });
    //  $('.goodsCont').on('click','.pic102',function(){
    //      event.stopPropagation();
    //      PImgSHow=false;
    //  }); 
    $('.goodsCont').on('mouseleave', '.pic102', function () {
        //  if(PImgSHow){
        $('#pic101').hide();
        //  }
    });
    //  $('#pic101').click(function(){
    //      event.stopPropagation();
    //  });
    //  $('body').click(function(){
    //      PImgSHow=true;
    //      $('#pic101').hide();
    //  });
    $('#pic101').mouseenter(function () {
        $('#pic101').show();
    })
    $('#pic101').mouseleave(function () {
        //  if (PImgSHow) {
        $('#pic101').hide();
        //  }
    })
});
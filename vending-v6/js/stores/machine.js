import '../../MyCss/stores/machine.css';
import {provinceChange, cityChange} from '../../assets/public/selectMore';
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
        machineId = +sessionStorage.machineID,
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
    // tooltip('.refreshBtnList', { transition: true, time: 200 });
    // console.log(provinceChange)
    // ??????
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.on-left').show()
    });
    $('.on-left').click(function () {
        $('.left-mian').show();
        $('.on-left').hide()
    })
    // ????????????????????????
    var merchantsListData = merchantsListMian('');
    var table = layui.table,
        token = sessionStorage.token,
        layer = layui.layer,
        form = layui.form,
        tree = layui.tree,
        laydate = layui.laydate,
        tableCols =  [[
            {
                fixed: 'left',
                field: 'info', width: 330, title: '????????????', align: 'center', templet: function (d) {
                    if (d.info) {
                        return d.info
                    } else {
                        return `<div><span style="color:red;">*</span>(?????????????????????????????????????????????????????????)</div>
                            <div><span style="color:red;">*</span>(?????????:${d.machineId})</div>`
                    }
                }
            },
            {
                field: 'number', width: 150, title: '???????????????', align: 'center', templet: function (d) {
                    return d.number ? d.number : '-'
                }
            },
            {
                field: 'info', width: 150, title: '???????????????', align: 'center', templet: function (d) {
                    if (d.machinesource) {
                        return d.machinesource == 1 ? 'ZJ' : 'YY'
                    } else {
                        return '-'
                    }
                }
            },
            {
                field: 'machineURL', width: 220, title: '????????????????????????', align: 'center',
                templet: function (d) {
                    return (d.machineURL && (d.machineURL !== null || d.machineURL !== undefined)) ? `<a href="${d.machineURL}" target="_blank" style="color: rgb(190, 149, 74)">${d.machineURL}</a>` : '-'
                }
            },
            {
                field: 'location', width: 350, title: '??????', align: 'center', templet: function (d) {
                    return d.location ? d.location : ' - '
                }
            },
            {
                field: 'trafficInfo', width: 160, title: '??????????????????(MB)', align: 'center'
            },
            {
                field: 'iot_card', width: 160, title: '???????????????', align: 'center'
            },
            {
                field: 'warning', width: 130, title: '????????????', align: 'center', templet: function (d) {
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
                field: 'way_count', width: 130, title: '??????????????????', align: 'center', templet: function (d) {
                    return d.storage_warning[0].way_count
                }
            },
            {
                field: 'onlineStatus', width: 130, title: '????????????', align: 'center', templet: function (d) {
                    return `<div><span class="${d.onlineStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.onlineStatus == 0 ? '??????' : '??????'}</span></div>`
                }
            },
            {
                field: 'offline_time', width: 180, title: '????????????', align: 'center',
            },
            {
                field: 'offline_time', width: 180, title: '??????????????????', align: 'center', templet: function (d) {
                    return d.time ? d.time : '-'
                }
            },
            {
                field: 'actionStatus', width: 130, title: '????????????', align: 'center', templet: function (d) {
                    return `<div><span class="${d.actionStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.actionStatus == 0 ? '?????????' : '?????????'}</span></div>`
                }
            },
            {
                field: 'openStatus', width: 130, title: '????????????', align: 'center', templet: function (d) {
                    return `<div><span class="${d.openStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.openStatus == 0 ? '????????????' : '??????'}</span></div>`
                }
            },
            {field: 'merchantName', width: 150, title: '????????????', align: 'center',},
            {
                field: 'versions', width: 200, title: '????????????(???????????????)', align: 'center', templet: function (d) {
                    return `${d.versions ? d.versions : '-'}(${d.appVersion ? d.appVersion : '-'})`
                }
            },
            // { field: 'controllerVersion', width: 135, title: '???????????????', },
            {
                field: 'connectTime', width: 170, title: '????????????', align: 'center', templet: function (d) {
                    if (d.actionTime) {
                        return timeStamp(d.connectTime)
                    } else {
                        return '-'
                    }
                }
            },
            {
                field: 'actionTime', width: 170, title: '????????????', align: 'center', templet: function (d) {
                    if (d.actionTime) {
                        return timeStamp(d.actionTime)
                    } else {
                        return '-'
                    }

                }
            },
            {field: 'description', width: 150, title: '??????', align: 'center'},
            {
                field: 'operation',
                fixed: 'right',
                right: 0,
                width: 150,
                title: '??????',
                toolbar: '#barDemo',
                align: 'center'
            },
        ]],
        machineList = table.render({
            elem: '#machineTable',
            url: `${vApi}/machine/getMachineList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            height: 600,
            cols: tableCols
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
                //res?????????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??//??????????????????
                        "count": res.data.total,??//??????????????????
                        "data": res.data.list //??????????????????
                    };
                } else {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??  //??????????????????
                    }
                }

            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                permissions1();
                if (+res.code === 403) {
                    window.parent.location.href = "login.html";
                } else if (+res.code === 405) {
                    $('.hangContent').show();
                }
                fixedFun();
            }
        });
    // ??????
    $('.machineListKeyBtn').click(function () {
        var machineData = form.val("machineData");
        saveTableWidth(tableCols);
        machineList.reload({
            where: {
                onlineStatus: machineData.onlineStatus ? Number(machineData.onlineStatus) : '',
                actionStatus: machineData.actionStatus ? Number(machineData.actionStatus) : '',
                openStatus: machineData.permissions ? Number(machineData.permissions) : '',
                // stockStatus:machineData.openStatus? Number(machineData.openStatus):'',
                stockStatus: machineData.CreationTime ? Number(machineData.CreationTime) : '',
                keyword: machineData.machineKeyText
            },
            cols: tableCols
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
            layer.msg('?????????', {icon: 1})
        } else {
            layer.msg('?????????', {icon: 1})
        }
    })
    // ??????tab??????
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
                supportpay(machineSetData.machineId, machineSetData.userNum); //????????????
                break;
            case 2:
                getGoodsWay(machineSetData.machineId); //????????????
                Amachinedmin();//???????????????????????????
                goodKeyFlag = 1;
                break;
            case 3:
                panelFun(); //????????????
                Amachinedmin();//???????????????????????????
                goodKeyFlag = 2;
                break;
            case 4:
                salesFun(machineSetData.machineId); //????????????
                break;
            case 5:
                recordFun(machineSetData.machineId); //????????????
                break;
            case 6:
                replenishmenFun(machineSetData.machineId); //????????????
                break;
            case 7:
                priceFun(); //??????????????????
                break;
            case 8:
                openDoorFun(); //????????????
                break;
            case 9:
                undoFun(); //????????????
                break;
        }
    });
    // ???????????????????????????
    var machineSetData = null,
        operationFlag = null;
    table.on('tool(machineTable)', function (obj) {
        event.stopPropagation();
        machineSetData = obj.data;
        // console.log(machineSetData);
        $('.maskHeader span').html(machineSetData.info ? machineSetData.info + '????????????' : '-????????????')
        if (obj.event === 'operation') {
            if (operationFlag == obj.data.machineId) {
                $('.ListOperation').fadeOut();
                operationFlag = null;
                return;
            }
            operationFlag = obj.data.machineId;
            obj.data.actionStatus != 0 ? $('.Mactivation').addClass('hide') : $('.Mactivation').removeClass('hide');
            obj.data.openStatus != 0 ? $('.ListOperation .Mbusiness').html('????????????') : $('.ListOperation .Mbusiness').html('??????');
            $('.ListOperation').fadeIn();
            $('.ListOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        }
    });
    // ??????
    $('.ListOperation .set').click(function () {
        aisleNum();
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
    });
    // ??????
    $('.ListOperation .edit').click(function () {
        console.log(machineSetData);
        $('body').addClass('bodys');
        if (machineSetData.openStatus == 1) {
            layer.msg('???????????????????????????????????????????????????????????????', {icon: 7})
        } else {
            if (!permissionsObjFlag[396]) {
                layer.msg('???????????????????????????????????????????????????', {icon: 7})
            }
        }
        var region = null;
        if (machineSetData.location) {
            region = machineSetData.location.split(' ')
        }
        $('.editMachineBox .layui-tree-txt').css({color: '#555'});
        if (machineSetData.machinesource == 1) {
            $('.maxShipClass').show()
        } else {
            $('.maxShipClass').hide()
        }
        form.val("editmachine", {
            machineURL: machineSetData.machineURL,
            urlStatus: machineSetData.urlStatus,
            'sNumber': machineSetData.number,
            'tName': machineSetData.info,
            'number': machineSetData.machineId,
            'province': machineSetData.location ? region[0] : '',
            'mapVal': machineSetData.location ? region[3] : '',
            'area': machineSetData.area,
            'longitude': machineSetData.longitude,
            'latitude': machineSetData.latitude,
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
        // ????????????
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
        }
        ;
        $('.serviceTitle input[name="service_phone"]').val(machineSetData.service_phone);
        // ????????????
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
        }
        ;
        //  ??????????????????
        if (machineSetData.is_volume == 1) {
            $('.listFlex input[name="sound"]').prop('checked', true)
        } else {
            $('.listFlex input[name="sound"]').prop('checked', false)
        }
        // ????????????
        if (machineSetData.is_light == 1) {
            $('.listFlex input[name="lamp"]').prop('checked', true)
        } else {
            $('.listFlex input[name="lamp"]').prop('checked', false)
        }
        // ????????????
        funNum = 1;
        salesClassList(machineSetData, 1)
        $('.customTitle input[name="custom_phone"]').val(machineSetData.custom_phone)
        form.render();

        geoCode();
    });
    //??????
    $('.ListOperation .Mactivation').click(function () {
        layer.confirm('????????????????????????', function (index) {
            layer.close(index);
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            var activeMachineObj = JSON.stringify({
                machineId: machineSetData.machineId,
                actionStatus: '1',
            });
            loadingAjax('/machine/activeMachine', 'post', activeMachineObj, token, 'mask', '', '', layer).then(res => {
                layer.msg('????????????', {icon: 1});
                machineList.reload({
                    where: {}
                })
            }).catch(err => {
                layer.msg(res.message, {icon: 2});
            })
        })
    });
    // ??????
    $('.ListOperation .Mbusiness').click(function () {
        layer.confirm(machineSetData.openStatus != 1 ? '???????????????' : '?????????????????????', function (index) {
            var openStatusIndex = machineSetData.openStatus != 1 ? '1' : '0'
            layer.close(index);
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon')
            loadingAjax('/machine/getStatus', 'post', JSON.stringify({machineId: machineSetData.machineId}), token).then(Dres => {
                console.log(Dres, 'lallalala')
                if (Dres.data.actionStatus == 1) {
                    loadingAjax('/pushActive', 'post', JSON.stringify({
                        machine: machineSetData.machineId,
                        action: machineSetData.openStatus != 1 ? 'true' : 'false'
                    }), token).then(res => {
                    }).catch(err => {
                        loadingAjax('/machine/activeMachine', 'post', JSON.stringify({
                            machineId: machineSetData.machineId,
                            openStatus: openStatusIndex
                        }), token, 'mask').then(Sres => {
                            layer.msg('????????????', {icon: 1});
                            machineList.reload({
                                where: {}
                            })
                        }).catch(Serr => {
                            layer.msg(Serr.message, {icon: 2})
                        })
                    })

                } else {
                    $('.mask').fadeOut();
                    $('.maskSpan').removeClass('maskIcon');
                    layer.msg('????????????', {icon: 2});
                }
            }).catch(Derr => {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg(Derr.message, {icon: 2})
            })
        })
    })
    // TODO ??????????????????
    $('.relation').click(function () {
        console.log(machineSetData, 'relationData');
        $('.text').html(`${machineSetData.info} ??????????????????`);
        if (machineSetData.payType.indexOf('4') > -1) {
            $('.relationRules').show();
            getRulesList(merchantsListData.machineId).then(res => {
                form.val('relationRules', {
                    status: machineSetData.status,
                    accsplitRuleNo: machineSetData.accsplitRuleNo
                })
            })
        } else {
            layer.msg('???????????????????????????????????????????????????????????????', {icon: 7});
        }
    });

    // ??????????????????
    function getRulesList(merchantId) {
        return new Promise((resolve, reject) => {
            loadingAjax('/accSplit/getAccRule', 'post', JSON.stringify({
                pageNum: 1,
                pageSize: 200,
                merchantId,
            }), sessionStorage.token).then(res => {
                var optionList = ``;
                $.each(res.data.list, function (index, ele) {
                    optionList += `<option value="${ele.accsplitRuleNo}">${ele.accsplitRuleName}</option>`
                });
                $('#rules').html(optionList);
                form.render('select');
                resolve();
            }).catch(err => {
                reject(err);
            })
        })
    }

    // ????????????
    $('.relationBtn').click(function () {
        let data = form.val('relationRules');
        data['machineId'] = machineSetData.machineId;
        data['payId'] = machineSetData.payType;
        loadingAjax('/accSplit/associationRule', 'post', JSON.stringify(data), token).then(res => {
            if (res.code === 200) {
                layer.msg('????????????', {icon: 1});
                machineList.reload({
                    where: {}
                })
                hideRules();
            } else {
                layer.msg('??????', {icon: 2})
            }
        }).catch(err => {
            layer.msg(err, {icon: 2})
        })
    });

    // ????????????
    function hideRules() {
        $('.relationRules').hide();
    }

    $('.relationRules .cancelBtn').click(function () {
        hideRules();
    })


    // ?????????
    function aisleNum() {
        loadingAjax('/machine/findWay', 'get', {machineId: machineSetData.machineId}, sessionStorage.token).then(res => {
            var optionList = `<option value="">??????</option>`;
            res.data.forEach(item => {
                optionList += `<option value="${item}">${item}</option>`
            });
            $('.shipmentRecord select[name="shipSelect"]').html(optionList);
            $('.replenishment select[name="shipSelect"]').html(optionList);
            form.render('select');
        }).catch(err => {

        })
    }

    // ????????????
    $('.setUpCont .close').click(function () {
        $('.setUpCont').hide();
        $('body').removeClass('bodys');
    });

    // ????????????
    $('.editMachineCont .close').click(function () {
        $('body').removeClass('bodys');
        $('.editMachineCont').hide();
    })
    $('.editMachineCont .editCancelBtn').click(function () {
        $('body').removeClass('bodys');
        $('.editMachineCont').hide();
    })

    // ??????????????????
    var map = new AMap.Map("machineMap", {
        resizeEnable: true
    });

    var geocoder = new AMap.Geocoder({
        city: "", //??????????????????????????????????????????
        radius: 1000
    });
    var marker = new AMap.Marker();

    function geoCode() {
        // var address  = document.getElementById('address').value;
        var address = $('.listFlex select[name="province"]').val() + $('.listFlex select[name="city"]').val() + $('.listFlex select[name="district"]').val() + $('.listFlex input[name="mapVal"]').val()
        geocoder.getLocation(address, function (status, result) {
            if (status === 'complete' && result.geocodes.length) {
                var lnglat = result.geocodes[0].location //?????????
                // console.log(lnglat)
                // console.log(lnglat)
                // lat ?????? lng??????
                // document.getElementById('lnglat').value = lnglat;
                $('.listFlex input[name="longitude"]').val(lnglat.lng);
                $('.listFlex input[name="latitude"]').val(lnglat.lat);
                marker.setPosition(lnglat);
                map.add(marker);
                map.setFitView(marker);
            } else {
                // log.error('??????????????????????????????');
                layer.msg('??????????????????????????????', {icon: 2})

            }
        });
    };

    // ?????????????????????
    function coordinatesFun() {
        var lnglat = [$('.listFlex input[name="longitude"]').val(), $('.listFlex input[name="latitude"]').val()]
        map.add(marker);
        marker.setPosition(lnglat);
        map.setFitView(marker);
        geocoder.getAddress(lnglat, function (status, result) {
            if (status === 'complete' && result.regeocode) {
                var address = result.regeocode;
                // console.log(address)
                $('.listFlex input[name="mapVal"]').val(address.addressComponent.street + address.addressComponent.streetNumber);
                $('.listFlex select[name="province"]').val(address.addressComponent.province)
                provinceChange(address.addressComponent.province);
                if (address.addressComponent.province == '?????????' || address.addressComponent.province == '??????' || address.addressComponent.province == '?????????' || address.addressComponent.province == '?????????') {
                    $('.listFlex select[name="city"]').val('?????????');
                    cityChange('?????????');
                } else {
                    $('.listFlex select[name="city"]').val(address.addressComponent.city);
                    cityChange(address.addressComponent.city);
                }
                $('.listFlex select[name="district"]').val(address.addressComponent.district);
                form.render('select');
            } else {
                layer.msg('??????????????????????????????', {icon: 2})
            }
        });
    };
    map.on('click', function (e) {
        // document.getElementById('lnglat').value = e.lnglat;
        // $('.listFlex input[name="longitude"]').val()
        // console.log(e.lnglat);
        // console.log(e.lnglat.Q)
        $('.listFlex input[name="longitude"]').val(e.lnglat.lng);
        $('.listFlex input[name="latitude"]').val(e.lnglat.lat);
        coordinatesFun();
        // coordinatesFun();
    })

    // ???????????????????????????????????????
    $('.listFlex input[name="mapVal"]').blur(function () {
        geoCode();
    });
    // ????????????????????????????????????????????????
    $('.listFlex input[name="longitude"]').blur(function () {
        coordinatesFun();
    });
    $('.listFlex input[name="latitude"]').blur(function () {
        coordinatesFun();
    });

    // ????????????????????????
    $('.listFlex input[name="userPhone"]').blur(function () {
        phoneRegular(this, layer)
    });
    $('.listFlex input[name="headPhone"]').blur(function () {
        phoneRegular(this, layer)
    })

    // ???????????????????????????
    $('.editMachineCont .edittBtn').click(function () {
        if (machineSetData.openStatus == 1) {
            layer.msg('?????????????????????????????????????????????', {icon: 7});
            return;
        }
        var editMachineData = form.val("editmachine");
        if (editMachineData.sNumber && editMachineData.tName && editMachineData.number && editMachineData.province && editMachineData.city && editMachineData.district && editMachineData.mapVal && editMachineData.area && editMachineData.merchantsName) {
            if (!($('.serviceTitle input[name="service_phone"]').val() || $('.ImgCont img').attr('src')) && machineServiceFlag) {
                layer.msg('???????????????????????????????????????????????????', {icon: 7});
                return;
            }
            if (!($('.customTitle input[name="custom_phone"]').val() || $('.customImgCont img').attr('src')) && customFlag) {
                layer.msg('?????????????????????????????????????????????', {icon: 7});
                return;
            }
            if ($('.listFlex input[name="max_ship"]').val()) {
                if (!(($('.listFlex input[name="max_ship"]').val() > 0) && (Number.isInteger(Number($('.listFlex input[name="max_ship"]').val()))))) {
                    layer.msg('?????????????????????????????????', {icon: 7});
                    return;
                }
            }
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            var editObj = JSON.stringify({
                number: editMachineData.sNumber,
                machineURL: editMachineData.machineURL,
                urlStatus: editMachineData.urlStatus,
                info: editMachineData.tName,
                machineId: editMachineData.number,
                location: editMachineData.province + ' ' + editMachineData.city + ' ' + editMachineData.district + ' ' + editMachineData.mapVal,
                area: editMachineData.area,
                longitude: editMachineData.longitude,
                latitude: editMachineData.latitude,
                userNum: machineSetData.userNum == Number(editMachineData.merchantsName) ? 0 : Number(editMachineData.merchantsName),
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
                max_ship: machineSetData.machinesource == 1 ? $('.listFlex input[name="max_ship"]').val() ? Number($('.listFlex input[name="max_ship"]').val()) : null : 1
            })
            loadingAjax('/machine/updateMachine', 'post', editObj, sessionStorage.token, 'mask').then(res => {
                $('.editMachineCont').hide();
                layer.msg('????????????', {icon: 1});
                machineList.reload({
                    where: {}
                })
            }).catch(err => {
                layer.msg(err.message, {icon: 2});
            })
        } else {
            layer.msg('???*?????????', {icon: 7})
        }
    });

    // ????????????????????????
    // $()
    // ??????????????????
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
    // ??????????????????
    //????????????
    var selesStartTime = getKeyTime().startTime;
    //????????????
    var selesEndTime = getKeyTime().endTime;
    laydate.render({
        elem: '#test6',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            // console.log(value); //?????????????????????????????????2017-08-18
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
            console.log(value); //?????????????????????????????????2017-08-18
            var timerKey = value.split(' - ');
            console.log(timerKey);
            startTime = timerKey[0];
            endTime = timerKey[1];
        }
    });

    // ??????????????????
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
                    field: 'time', title: '??????', align: 'center', templet: function (d) {
                        return timeStamp(d.time)
                    }
                },
                {field: 'number', title: '?????????', align: 'center',},
                // {
                //     field: 'shipStatus', width: 150, title: '????????????', templet: function (d) {
                //         return `<div><span class="${d.shipStatus == 2 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.shipStatus == 0 ? '????????????' : d.shipStatus == 1 ? '????????????' : '????????????'}</span></div>`
                //     }
                // },
                {
                    field: 'payResult', align: 'center', title: '????????????', templet: function (d) {
                        return `<div><span class="${d.payStatus == 2 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.payResult}</span></div>`
                    }
                },
                {
                    field: 'payTypes', align: 'center', title: '????????????',
                },
                {field: 'payee', align: 'center', title: '?????????',},
                {field: 'amount', align: 'center', title: '??????', templet: d => percentileMoney(d.amount)},
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
                //res?????????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??//??????????????????
                        "count": res.data.total,??//??????????????????
                        "data": res.data.list //??????????????????
                    };
                } else {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??  //??????????????????
                    }
                }
            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        });
    };
    // ??????????????????
    $('.selesPushBtn').click(function () {
        if (timeFlag(selesStartTime, selesEndTime)) {
            layer.msg('?????????????????????????????????', {icon: 7});
            return;
        }
        let fileName = `${machineSetData.info}(${machineSetData.number})????????????(${selesStartTime}-${selesEndTime}).xls`,
            url = `${vApi}/exportMachineOrder?startDate=${selesStartTime}&endDate=${selesEndTime}&condition=${machineSetData.machineId}`;
        exportExcel(url, fileName);
    })
    // ??????????????????
    $('.selesQueryBtn').click(function () {
        if (timeFlag(selesStartTime, selesEndTime)) {
            layer.msg('?????????????????????????????????', {icon: 7});
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
    // ??????????????????
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
                    field: 'time', title: '????????????', align: 'center', templet: function (d) {
                        if (d.create_time) {
                            return timeStamp(d.create_time)
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    field: 'good_name_core', title: '?????????(??????)', align: 'center', templet: function (d) {
                        return d.good_name_core ? d.good_name_core : '-'
                    }
                },
                {
                    field: 'ship_status', title: '????????????', align: 'center', templet: function (d) {
                        return setOrderDetailStatus(d.ship_status)
                    }
                },
                {field: 'before_count', align: 'center', title: '???????????????',},
                {
                    field: 'before_count', align: 'center', title: '???????????????', templet: function (d) {
                        return d.before_count ? (+d.ship_status === 1 || +d.ship_status === 2 ? d.before_count - 1 : d.before_count) : '-'
                    }
                },
                {
                    field: 'ship_type', align: 'center', title: '????????????', templet: function (d) {
                        return d.ship_type == 1 ? '??????' : '?????????'
                    }
                },
                {field: 'way', align: 'center', title: '????????????'},
                {field: 'order_code', align: 'center', title: '?????????/?????????',},
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
                start_time: startTime,
                end_time: endTime,
                way: $('.shipmentRecord select[name="shipSelect"]').val(),
            },
            parseData: function (res) {
                // console.log(res)
                //res?????????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??//??????????????????
                        "count": res.data.total,??//??????????????????
                        "data": res.data.list //??????????????????
                    };
                } else {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??  //??????????????????
                    }
                }

            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        });
    }

    // ??????????????????
    $('.shipmentPushBtn').click(function () {
        if (timeFlag(startTime, endTime)) {
            layer.msg('?????????????????????????????????', {icon: 7});
            return;
        }
        let fileName = `${machineSetData.info}(${machineSetData.number})????????????(${startTime}-${endTime}).xls`,
            url = `${vApi}/excelShipping?startDate=${startTime}&endDate=${endTime}&machineId=${machineSetData.machineId}&way=${$('.shipmentRecord select[name="shipSelect"]').val()}&goods_Name=${$('.shipmentRecord input[name="shipGoodName"]').val()}&order_code=${$('.shipmentRecord input[name="order_code"]').val()}`;
        exportExcel(url, fileName);
    })
    // ??????????????????
    $('.shipmentQueryBtn').click(function () {
        if (timeFlag(startTime, endTime)) {
            layer.msg('?????????????????????????????????', {icon: 7});
            return;
        }
        recordDataList.reload({
            where: {
                way: $('.shipmentRecord select[name="shipSelect"]').val(),
                goods_Name: $('.shipmentRecord input[name="shipGoodName"]').val(),
                order_code: $('.shipmentRecord input[name="order_code"]').val(),
                start_time: startTime,
                end_time: endTime,
                // conditionFour: $('.shipmentRecord input[name="keyName"]').val()
            }

        })
    });
    //?????????
    var dataListEdit = null;
    var dataList = dataListEdit = treeList();
    if (merchantsListData.length == 0) {
        dataListEdit = []
    }
    // console.log(JSON.stringify(dataList))
    //???????????????
    treeFun(tree, 'test1', machineList, dataList, 'merchantId', 'condition', selectData, '', 'true')

    // ?????????
    var inst2 = tree.render({
        elem: '#test2',
        id: 'treelistEdit',
        showLine: !0 //?????????
        ,
        onlyIconControl: true //??????????????????????????????
        ,
        isJump: !1 //?????????????????????
        ,
        edit: false //?????????????????????
        ,
        data: dataListEdit,
        text: {
            defaultNodeName: '?????????',
            none: '?????????????????????????????????????????????'
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
    // ???????????????
    $('.editRefres').click(function () {
        var editTree = treeList()
        if (JSON.stringify(editTree) == JSON.stringify(dataListEdit)) {
            layer.msg('?????????', {icon: 1})
        } else {
            dataListEdit = editTree;
            tree.reload('demoId', {
                data: dataListEdit
            });
            layer.msg('?????????', {icon: 1})
        }
    })
    // ????????????
    // $('.refreshBtn').click(function () {
    //     location.reload();
    // });
    // ??????f5??????
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });
    // ????????????
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });

    // ??????????????????
    function selectData(merchantId) {
        loadingAjax('/classify/findAll', 'post', JSON.stringify({
            pageNum: 1,
            pageSize: 200,
            merchantId,
        }), sessionStorage.token).then(res => {
            var optionList = `<option value="">??????</option>`;
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

    // ????????????
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
                {field: 'goods_images', title: '??????', align: 'center', templet: "#imgtmp"},
                {
                    field: 'goods_Name',
                    align: 'center',
                    title: '?????????',
                    templet: function (d) {
                        return (d.mail == 1 ? '(??????)' + d.goods_Name : d.goods_Name)
                        // return '1'
                    }
                },
                {field: `classifyName`, align: 'center', title: '????????????'},
                {
                    field: 'mail', title: '??????????????????', align: 'center', templet: function (d) {
                        return d.mail == 0 ? '???' : '???'
                    }
                },
                {field: 'goods_Core', align: 'center', title: '????????????',},
                {
                    field: 'operation',
                    title: '??????',
                    align: 'center',
                    toolbar: '#GoodsbarDemo'
                },

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
                conditionFour: '1',
                machineId: machineSetData.machineId
            },
            parseData: function (res) {
                // console.log(res)
                //res?????????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,//??????????????????
                        "msg": '',//??????????????????
                        "count": res.data.total,//??????????????????
                        "data": res.data.list//??????????????????
                    };
                } else {
                    return {
                        "code": res.code,//??????????????????
                        "msg": res.message,//??????????????????
                    }
                }

            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        })
    }

    //??????????????????
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
            var titleHtml = `<div style="text-align: center;">????????????????????????????????????</div>`
            $('.aisleGoodsCont').html(titleHtml)
            // console.log(err)
            // layer.msg(err.message, { icon: 2 })
        })
    };
    // ????????????
    var wayFlagArr = [];

    function againFun(res) {
        wayList = [];
        wayFlagArr = res.data
        res.data.forEach(item => {
            // console.log(item.row)
            if (item.row) {
                if (!(wayList[item.row - 1])) {
                    wayList[item.row - 1] = [];
                    wayList[item.row - 1].push(item)
                } else {
                    wayList[item.row - 1].push(item)
                }

            }
        })
        aisleHtml1(wayList);
    };
    //????????????
    $('.relative').click(function () {
        // TODO
        if (editPermissionsFlag != 1) {
            layer.msg('???????????????????????????!', {icon: 7});
            return;
        }
        if (flag) {
            popupShow('goodsCont', 'goodsBox')
        }
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

    //    ????????????
    $('.goodsCont .queryBtnClick').click(function () {
        goodsTableIns.reload({
            where: {
                conditionTwo: $('.goodsCont input[name="GoodsKyeText"]').val(),
                conditionThree: $('#GoodsType').val()
            }
        })
    })

    // ??????????????????
    function aisleHtml1(strList) {
        var aisleStr = '';
        strList.forEach((item, index) => {
            aisleStr += `<div class="aisleListCont flexTwo">
                            <div class="listIndex">
                                <span>${index + 1}</span>
                            </div>`
            item.forEach((child, Cindex) => {
                let status = Number(child.status) === 1;
                console.log(status);
                if (child.open != 0) {
                    aisleStr += `<div class="aisleNumderGoods">
                                    ${status ? '' : `<i class="layui-icon layui-icon-util icon" title="????????????"></i>`}
                                    <div class="aisleNumderClick" fireIndex="${index + ',' + Cindex}">
                                    <div class="numderTop">                                   
                                        <img class="${child.goods_images ? 'wayImg' : ''}" src="${child.goods_images ? child.goods_images : require('../../img/failure.png')}" alt=""> 
                                    <span>${child.way}</span>
                                    </div>
                                    <div class="price">??????:${percentileMoney(child.price)}</div>
                                <div class="numderBottom">
                                        <div class="status1 ${status ? '' : 'redF10'}">${status ? '??????' : '????????????'}</div>
                                        <div title="${child.count}">??????:${child.count}</div>
                                    </div>
                                    </div>
                                    <div class="chooseCheck">
                                        <span >${child.mail ? '(??????)' : ''} ${child.goods_Name ? child.goods_Name : '-'}</span>
                                    </div>
                                </div>`
                } else {
                    aisleStr += `<div class="aisleNumderGoods" >
                                    ${status ? '' : `<i class="layui-icon layui-icon-util icon" title="????????????"></i>`}
                                    <div class="aisleNumderClick" fireIndex="${index + ',' + Cindex}">
                                    <div class="numderTop">
                                    <img class="${child.goods_images ? 'wayImg' : ''}" src="${child.goods_images ? child.goods_images : require('../../img/failure.png')}" alt="">
                                        <span>${child.way}</span>
                                    </div>
                                    <div class="numderBottom">
                                        <div class="status2">${status ? '??????' : '????????????'}</div>
                                        <div title="${child.count}">??????:${child.count}</div>
                                    </div>
                                    </div>  
                                    <div class="chooseCheck" >
                                        <span >${Number(child.mail) === 1 ? '(??????)' : ''}${child.goods_Name ? child.goods_Name : ''}</span>
                                    </div>
                                </div>`
                }
            });
            aisleStr += ` </div>`
        });

        $('.aisleGoodsCont').html(aisleStr);
        form.render('checkbox');
        // tooltip('.chooseCheck', { transition: true, time: 200 });
    };
    $('.aisleGoodsCont').on('mouseenter', '.chooseCheck', function () {
        // console.log($(this).children('span').html())
        $('.tipContent').css({
            left: $(this).offset().left - 35 + 'px',
            top: $(this).offset().top + 35 + 'px'
        }).fadeIn();
        $('.tipContent .tipHtml').html($(this).children('span').html());

    })
    $('.aisleGoodsCont').on('mouseleave', '.chooseCheck', function () {
        $('.tipContent').fadeOut();
    })

    // ????????????????????????????????????????????????
    var aisleType = null;
    sessionStorage.independentPass = '';
    var ArrIndex = null;
    $('body').on('click', '.aisleNumderClick', function () {
        // console.log($(this).attr("fireIndex"))
        ArrIndex = $(this).attr("fireIndex").split(',');
        console.log(ArrIndex)
        if (!permissionsObjFlag[424]) {
            layer.msg('??????????????????????????????!', {icon: 7})
            return;
        }
        aisleType = 1;
        flag = false;
        aisleEdit();
        disabledFun();
        popupShow('editAisle', 'editAisleBox');
    })
    // ????????????
    $('.passBtn').click(function () {
        var IPassWord = JSON.stringify({
            alonePwd: hex_md5($('.iPasswprd input[name="iPassword"]').val())
        })
        loadingAjax('/user/verifyAlonePwd', 'post', IPassWord, sessionStorage.token, 'mask', 'iPasswprd', 'passwordCont', layer).then(res => {
            sessionStorage.independentPass = 'true';
            if (aisleType == 1) {
                // aisleEdit();
                // popupHide('iPasswprd', 'passwordCont')
                // popupShow('editAisle', 'editAisleBox');
                enableFun();
                flag = true;
            } else if (aisleType == 2) {
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                loadingAjax('/machine/removeGoodWay', 'post', JSON.stringify({machineId: machineSetData.machineId,}), sessionStorage.token, 'mask', '', '').then(res => {
                    layer.msg(res.message, {icon: 1});
                    getGoodsWay(machineSetData.machineId);
                }).catch(err => {
                    layer.msg(err.message, {icon: 2})
                });
            }

        }).catch(err => {
            console.log(err)
            layer.msg(err.message, {icon: 2});

        })
    });


    // ????????????
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
        $('.editAisle input[name="goodsName"]').val(goodsDetails.goods_Name ? goodsDetails.mail == 1 ? '(??????)' + goodsDetails.goods_Name : goodsDetails.goods_Name : '');
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

    // ????????????

    table.on('row(goodsTable)', function (obj) {
        console.log(obj)
        if (goodKeyFlag == 1) {
            $('.editAisle input[name="goodsName"]').val(obj.data.mail == 1 ? '(??????)' + obj.data.goods_Name : obj.data.goods_Name);
            $('.editAisle input[name="goodsName"]').attr('IVal', obj.data.goods_Id);
            $('.editAisle input[name="price"]').val(obj.data.goods_Price);
            popupHide('goodsCont', 'goodsBox')
        } else {
            $('.addPanelBody input[name="panelGoodsName"]').val(obj.data.mail == 1 ? '(??????)' + obj.data.goods_Name + '(' + obj.data.goods_Core + ')' : obj.data.goods_Name + '(' + obj.data.goods_Core + ')');
            $('.addPanelBody input[name="panelGoodsName"]').attr('IVal', obj.data.goods_Id);
            popupHide('goodsCont', 'goodsBox');
        }

    });
    var determineFlag = false,
        editPermissionsFlag = false,
        flag = false;
    // ????????????
    $('.editAisle .maintenanceBtn').click(function () {
        if (editPermissionsFlag == 1) {
            if (sessionStorage.independentPass) {
                enableFun();
                flag = true;
            } else {
                popupShow('iPasswprd', 'passwordCont');
            }

        } else {
            disabledFun();
            layer.msg('???????????????????????????!', {icon: 7})
        }
    });

    // ???????????????????????????
    function Amachinedmin() {
        loadingAjax('/machine/findMachineIdUser', 'get', {machineId: machineSetData.machineId}, sessionStorage.token).then(res => {
            editPermissionsFlag = res.data
        }).catch(err => {
            editPermissionsFlag = 0;
            disabledFun();
        })
    };

    function disabledFun() {
        determineFlag = false;
        $('.editAisle .aisleList input').prop('disabled', true);
        $('.editAisle .aisleList select').prop('disabled', true);
        form.render('select');
        $('.editAisle .ediaisleBtn').hide();
        $('.editAisle .maintenanceBtn').show();
    };

    function enableFun() {
        determineFlag = true;
        $('.editAisle .aisleList input').prop('disabled', false);
        $('.editAisle .aisleList select').prop('disabled', false);
        form.render('select');
        $('.goodsName').prop('disabled', true);
        $('.editAisle .ediaisleBtn').show();
        $('.editAisle .maintenanceBtn').hide();
    };
    // ????????????
    $('.editAisle .ediaisleBtn').click(function () {
        if (!($('.editAisle input[name="goodsName"]').attr('IVal'))) {
            layer.msg('???????????????', {icon: 7});
            return;
        }
        if (!($('.editAisle input[name="price"]').val())) {
            layer.msg('?????????????????????', {icon: 2});
            return;
        }
        if (!($('.editAisle input[name="count"]').val() && $('.editAisle input[name="total"]').val())) {
            layer.msg('???????????????????????????', {icon: 7});
            return;
        }
        if (!(Number($('.aisleList input[name="total"]').val()) >= Number($('.aisleList input[name="count"]').val()))) {
            layer.msg('????????????????????????????????????', {icon: 7});
            return;
        }
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
        }
        ;
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        loadingAjax('/machine/updateGoodWay', 'post', editData, sessionStorage.token, 'mask', 'editAisle', 'editAisleBox', layer).then(res => {
            layer.msg(res.message, {icon: 1});
            getGoodsWay(machineSetData.machineId);
            loadingAjax('/refreshGoods', 'post', '', sessionStorage.token).then(res => {
            }).catch(err => {
            })
        }).catch(err => {
            console.log(err);
            layer.msg(err.message, {icon: 2})
        })
    });
    // ????????????;
    var addIndex = null;
    $('.aisleDetails').on('click', '.addAisle', function () {
        addIndex = $(this).attr('indexVal');
        if (sessionStorage.independentPass) {
            popupShow('addDetalis', 'addCont');
        } else {
            popupShow('iPasswprd', 'passwordCont')
        }
    });
    // ??????
    $('.addCancelBtn').click(function () {
        popupHide('addDetalis', 'addCont')
    });
    // ??????
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
                layer.msg(res.message, {icon: 1});
                againFun(res);
                $('.addDetalis input[name="addNum"]').val(' ')
            }).catch(err => {
                layer.msg(err.message, {icon: 2})
            })
        } else {
            layer.msg('??????????????????0', {icon: 7})
        }
    });

    // ???????????????
    var reduction = 1;
    $('.addDetalis input[name="addNum"]').keyup(function () {
        var num = $(this).val(),
            re = /^\d*$/;
        if (!re.test(num)) {
            layer.msg('?????????????????????', {icon: 7});
            $(this).val(reduction);
        } else {
            reduction = $(this).val();
            console.log(reduction)
        }
    });
    $('.testNumdev input').keyup(function () {
        var num = $(this).val(),
            re = /^\d*$/;
        if (!re.test(num)) {
            layer.msg('?????????????????????', {icon: 7});
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
            layer.msg('??????????????????????????????', {icon: 7});
            return;
        }
        layer.confirm('???????????????', function (index) {
            layer.close(index);
            for (let i in delAll) {
                delArr.push(Number(delAll[i]))
            }
            ;
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
            layer.msg(res.message, {icon: 1});
            againFun(res)
        }).catch(err => {
            layer.msg(err.message, {icon: 2})
        })
    };
    //??????????????????
    // ?????????????????? TODO
    var weId = null,
        aliId = null,
        AcbcId = null,
        shadeId = null;

    function supportpay(machindID, merchantsID) {
        var payList = JSON.stringify({
            machineId: machindID,
        })
        loadingAjax('/pay/getMachinePayParam', 'post', payList, token).then(res => {
            loadingAjax('/pay/getPayParam', 'post', JSON.stringify({merchantId: Number(merchantsID)}), token).then(pres => {
                var setPayStr = ''
                res.data.forEach((item, index) => {
                    console.log(item);
                    if (+item.status === 1) {
                        setPayStr += `<div class="layui-form-item">
                                        <label class="layui-form-label" style="color: #9a6e3a">${item.tName}???</label>
                                    <div style="display: flex">`
                        if (+item.selectPay.length === 0) {
                            setPayStr += `<input type="radio" lay-filter="radioTest" name="${item.id}"
value="${0 + '-' + 0 + '-' + item.tName}" title="???" checked>`
                        } else {
                            setPayStr += `<input type="radio" lay-filter="radioTest" name="${item.id}" 
value="${item.selectPay[0].mpId + '-' + 0 + '-' + item.tName}" title="???" >`
                        }
                        pres.data.forEach((e, i) => {
                            if (+item.id === +e.payType) {
                                setPayStr += `<input type="radio" lay-filter="radioTest" name="${item.id}" 
value="${(item.selectPay.length > 0 ? item.selectPay[0].mpId : 0) + '-' + e.id + '-' + item.tName}" title="${e.payee}" 
${item.selectPay.length <= 0 ? '' : +item.selectPay[0].paramId === +e.id ? 'checked' : ''} >`
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
                layer.msg(err.message, {icon: 2})
            })
        }).catch(err => {
            layer.msg(err.message, {icon: 2})
        })
    }

    $('.paySet .paySetBtn').click(function () {
        var payFormData = form.val("paySetData");
        console.log(payFormData)
    })

    form.on('radio(radioTest)', function (data) {
        console.log(data);
        layer.confirm('???????????????????????????(??????????????????????????????????????????????????????????????????????????????)', function (index) {
            layer.close(index);
            var dataID = data.value.split('-');
            loadingAjax('/pay/updateMachinePayParam', 'post', JSON.stringify({
                machineId: machineSetData.machineId,
                paramId: +dataID[1],
                mpId: +dataID[0],
                title: dataID[2]
            }), token).then(res => {
                layer.msg(res.message, {icon: 1})
                supportpay(machineSetData.machineId, machineSetData.userNum);
            }).catch(err => {
                layer.msg(err.message, {icon: 2})
            })
        }, function () {
            supportpay(machineSetData.machineId, machineSetData.userNum)
        })
    });
    //   ??????????????????
    var machineServiceFlag = false;
    // ???????????????????????????
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
                    layer.msg(res.message, {icon: 7});
                }
            },
            error: function (err) {
                $(that).val('')
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('????????????', {icon: 2})
            }
        })
    });
    // ????????????
    $('.delImgBtn').click(function () {
        $('.ImgCont img').prop('src', '');
        $('.ImgCont').hide();
    });
    // ??????????????????
    form.on('switch(machineOpen)', function (data) {
        machineServiceFlag = data.elem.checked;
        if (data.elem.checked) {
            $('.serviceTitle').slideDown();
        } else {
            $('.serviceTitle').slideUp();
        }
    });
    // ??????????????????
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
                    layer.msg(res.message, {icon: 7});
                }
            },
            error: function (err) {
                $(that).val('')
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('????????????', {icon: 2})
            }
        })
    });
    $('.delImgBtn2').click(function () {
        $('.customImgCont img').prop('src', '');
        $('.customImgCont').hide();
    });
    // ??????????????????
    var salseList = [];

    // ??????????????????????????????
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
            layer.msg(err.message, {icon: 2})
        })
    };

    // ????????????????????????

    function ToSalseListFun(ToList, mobj) {
        console.log(funNum)
        var salseStr = '';
        if (funNum == 1) {
            $('.salseCont').html('');
            salseStr = `<input type="radio" ${mobj.is_sales == 0 ? 'checked' : ''} name="salseClassName" value="-99" title="?????????" >
            <input type="radio" name="salseClassName" ${mobj.is_sales == 1 ? mobj.sales_type ? '' : 'checked' : ''} value="" title="??????" >`;
            funNum++
        }

        ToList.forEach(item => {
            salseStr += `<input type="radio" name="salseClassName" ${mobj.is_sales == 1 ? machineSetData.sales_type == item.sm_classify ? 'checked' : '' : ''} value="${item.sm_classify}" title="${item.sm_classify}">`
        });
        $('.salseCont').append(salseStr);
        form.render();
    };


    // ????????????
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
                {field: 'username', title: '?????????', align: 'center'},
                {field: 'name', title: '???????????????', align: 'center'},
                {
                    field: 'replenish_time', title: '????????????', align: 'center', templet: function (d) {
                        if (d.replenish_time) {
                            return timeStamp(d.replenish_time)
                        } else {
                            return '-'
                        }
                    }
                },
                {field: 'way', title: '????????????', align: 'center',},
                {
                    field: 'good_name_core', title: '?????????(??????)', align: 'center',
                },
                {
                    field: 'replenish_count', title: '???????????????', align: 'center', templet: function (d) {
                        return d.after_count - d.replenish_count
                    }
                },
                {
                    field: 'replenish_count', title: '????????????', align: 'center',
                },
                {
                    field: 'after_count', title: '???????????????', align: 'center',
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
                end_time: sreplenishmentEndTime ? sreplenishmentEndTime : null,
                way: $('.replenishment select[name="shipSelect"]').val(),
            },
            parseData: function (res) {
                // console.log(res)
                //res?????????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??//??????????????????
                        "count": res.data.total,??//??????????????????
                        "data": res.data.list //??????????????????
                    };
                } else {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??  //??????????????????
                    }
                }

            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        });
    };

    //????????????
    var replenishmentStartTime = getKeyTime().startTime;
    //????????????
    var sreplenishmentEndTime = getKeyTime().endTime;
    laydate.render({
        elem: '#test8',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            // console.log(value); //?????????????????????????????????2017-08-18
            var timerKey = value.split(' - ');
            replenishmentStartTime = timerKey[0];
            sreplenishmentEndTime = timerKey[1];
        }
    });
    $('.replenishment .RQueryBtn').click(function () {
        if (timeFlag(replenishmentStartTime, sreplenishmentEndTime)) {
            layer.msg('?????????????????????????????????', {icon: 7});
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
    // ??????????????????
    $('.replenishmentPushBtn').click(function () {
        if (timeFlag(replenishmentStartTime, sreplenishmentEndTime)) {
            layer.msg('?????????????????????????????????', {icon: 7});
            return;
        }
        let fileName = `${machineSetData.info}(${machineSetData.number})????????????(${replenishmentStartTime}-${sreplenishmentEndTime}).xls`,
            url = `${vApi}/excelReplenish?startDate=${replenishmentStartTime}&endDate=${sreplenishmentEndTime}&machineId=${machineSetData.machineId}&way=${$('.replenishment select[name="shipSelect"]').val()}&goods_Name=${$('.replenishment input[name="replenishmentGoodName"]').val()}`;
        exportExcel(url, fileName);
    })
    //????????????
    var editStartTime = getKeyTime().startTime;
    //????????????
    var editEndTime = getKeyTime().endTime;
    laydate.render({
        elem: '#test10',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            // console.log(value); //?????????????????????????????????2017-08-18
            var timerKey = value.split(' - ');
            editStartTime = timerKey[0];
            editEndTime = timerKey[1];
        }
    });
    // ????????????????????????
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
                // { field: 'way', width: 150, title: '??????', align: 'center', },
                {
                    field: 'old_price',
                    title: '???????????????',
                    align: 'center',
                    templet: d => percentileMoney(d.old_price)
                },
                {
                    field: 'new_price',
                    title: '???????????????',
                    align: 'center',
                    templet: d => percentileMoney(d.new_price)
                },
                {field: 'goods_Name', title: '?????????(??????)', align: 'center',},
                {field: 'user_name', title: '?????????', align: 'center',},
                {field: 'name', title: '???????????????', align: 'center',},
                {
                    field: 'way', title: '????????????', align: 'center', templet: function (d) {
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
                //res?????????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??//??????????????????
                        "count": res.data.total,??//??????????????????
                        "data": res.data.list //??????????????????
                    };
                } else {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??  //??????????????????
                    }
                }

            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        });
    }

    // ??????????????????
    $('.editQueryBtn').click(function () {
        if (timeFlag(editStartTime, editEndTime)) {
            layer.msg('?????????????????????????????????', {icon: 7});
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
    // ??????????????????
    $('.editPircePushBtn').click(function () {
        if (timeFlag(editStartTime, editEndTime)) {
            layer.msg('?????????????????????????????????', {icon: 7});
            return;
        }
        let goodNames = $('.price input[name="priceGoodName"]').val() !== undefined ? $('.price input[name="priceGoodName"]').val() : '';
        let url = `${vApi}/excelPriceRecord?startDate=${editStartTime}&endDate=${editEndTime}&machineId=${machineSetData.machineId}&goods_Name=${goodNames}`,
            fileName = `${machineSetData.info}(${machineSetData.number})??????????????????(${editStartTime}-${editEndTime}).xls`
        exportExcel(url, fileName);
    })
    // ??????????????????
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
                {field: 'info', title: '????????????', align: 'center',},
                {field: 'openType', title: '??????', align: 'center',},
                {field: 'username', title: '?????????', align: 'center',},
                {field: 'name', title: '???????????????', align: 'center'},
                {
                    field: 'goods_Name', title: '????????????', align: 'center', templet: function (d) {
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
                machineId: machineSetData.machineId,
                start_time: replenishmentStartTime ? replenishmentStartTime : null,
                end_time: sreplenishmentEndTime ? sreplenishmentEndTime : null
            },
            parseData: function (res) {
                // console.log(res)
                //res?????????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??//??????????????????
                        "count": res.data.total,??//??????????????????
                        "data": res.data.list //??????????????????
                    };
                } else {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??  //??????????????????
                    }
                }

            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        });
    };
    //????????????
    var openSTime = getKeyTime().startTime;
    //????????????
    var openETime = getKeyTime().endTime;
    laydate.render({
        elem: '#test9',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            // console.log(value); //?????????????????????????????????2017-08-18
            var timerKey = value.split(' - ');
            openSTime = timerKey[0];
            openETime = timerKey[1];
        }
    });
    $('.openDoorRecord .opeQuery').click(function () {
        if (timeFlag(openSTime, openETime)) {
            layer.msg('?????????????????????????????????', {icon: 7});
            return;
        }
        openDoorTable.reload({
            where: {
                start_time: openSTime ? openSTime : null,
                end_time: openETime ? openETime : null
            }
        })
    });
    // ??????????????????
    $('.openDoorPushBtn').click(function () {
        if (timeFlag(openSTime, openETime)) {
            layer.msg('?????????????????????????????????', {icon: 7});
            return;
        }
        ;
        let fileName = `${machineSetData.info}(${machineSetData.number})????????????(${openSTime}-${openETime}).xls`,
            url = `${vApi}/excelDoorRecord?startDate=${openSTime}&endDate=${openETime}&machineId=${machineSetData.machineId}`;
        exportExcel(url, fileName);
    });
    laydate.render({
        elem: '#test101'
    });
    // ???????????????
    var repairInvoiceData = null;
    $('.invoicePushBtn').click(function () {
        if (editPermissionsFlag != 1) {
            layer.msg('???????????????????????????!', {icon: 7});
            return;
        }
        loadingAjax('/machine/getGoodReplenish', 'post', JSON.stringify({machineId: machineSetData.machineId}), sessionStorage.token, '', '', layer).then(res => {
            repairInvoiceData = res.data;
            if (repairInvoiceData.good_info.length == 0) {
                layer.msg('????????????????????????', {icon: 7});
                return;
            }
            RgoodsFun(repairInvoiceData.good_info);
            $('.supplierName').html(repairInvoiceData.supplier + '????????????(??????)???')
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
            layer.msg(err.message, {icon: 7})
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
                            <!-- <label for="">????????????</label> -->
                            <input type="number" name="oloNum" value="${item.oldCount}" disabled>
                        </div>
                        <div class="headerNum reNums">
                            <!-- <label for="">????????????</label> -->
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

    // ?????????????????????
    var CNumber = 1;
    $('.detaillBody').on('input', 'input[name="shouldName"]', function () {
        var re = /^\d*$/;
        if (!re.test($(this).val())) {
            layer.msg('?????????????????????', {icon: 7});
            $(this).val(CNumber);
            return;
        }
        CNumber = $(this).val();
        $(this).parent().siblings('.newNums').children().val(Number(CNumber) + Number($(this).parent().siblings('.oldNums').children().val()));
        $(this).parent().siblings('.totalNums').children().val(Number(CNumber) + Number($(this).parent().siblings('.inNums').children().val()));
    });
    // ?????????????????????
    var DNum = 1;
    $('.detaillBody').on('input', 'input[name="panelNam"]', function () {
        var re = /^\d*$/;
        if (!re.test($(this).val())) {
            layer.msg('?????????????????????', {icon: 7});
            $(this).val(DNum);
            return;
        }
        ;
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
        var xhr = new XMLHttpRequest();//????????????XMLHttpRequest??????
        xhr.open("POST", `${vApi}/machine/exportGoodReplenish`, true);
        xhr.setRequestHeader("token", sessionStorage.token);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.responseType = 'blob';//??????ajax??????????????????blob;
        xhr.onload = function (res) {
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                var fileName = `${repairInvoiceData.supplier}???????????????????????????.xls`
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
                layer.msg('?????????????????????', {icon: 2});
                return;
            }
        }
        xhr.send(repairInvoiceObj);
    });

    // ???????????????
    $('.rCancelBtn').click(function () {
        popupHide('repairInvoice', 'repairInvoiceBox')
    });

    // ??????????????????
    $('.clearingBtn').click(function () {
        if (editPermissionsFlag != 1) {
            layer.msg('???????????????????????????!', {icon: 7});
            return;
        }
        layer.confirm('???????????????????????????', function (index) {
            layer.close(index);
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            loadingAjax('/machine/clearLockMachineWay', 'post', JSON.stringify({machineId: machineSetData.machineId}), sessionStorage.token, 'mask', '', '', layer).then(res => {
                layer.msg(res.message, {icon: 1});
                getGoodsWay(machineSetData.machineId);
            }).catch(err => {
                layer.msg(err.message, {icon: 2})
            })
        })
    });
    // ???????????????
    $('.pushMachineBtn').click(function () {
        let url = `${vApi}/excelMachine?merchantId=${sessionStorage.machineGoodsId}`,
            fileName = `${sessionStorage.machineName}???????????????.xls`;
        exportExcel(url, fileName);
    });

    // ????????????
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
                {field: 'goods_images', title: '??????', align: 'center', templet: "#panelImg"},
                {field: 'good_name_core', title: '?????????(??????)', align: 'center',},
                {field: 'goodCount', title: '??????', align: 'center',},
                {field: 'oldGoodCount', title: '?????????', align: 'center',},
                {field: 'last_user', title: '?????????', align: 'center',},
                {
                    field: 'last_time', title: '????????????', align: 'center', templet: function (d) {
                        return d.last_time ? timeStamp(d.last_time) : '-'
                    }
                },
                {
                    field: 'operation',
                    title: '??????',
                    toolbar: '#panelId',
                    align: 'center'
                },
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
                //res?????????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??//??????????????????
                        "count": res.data.length,??//??????????????????
                        "data": res.data //??????????????????
                    };
                } else {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??  //??????????????????
                    }
                }

            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                permissions1();
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        });
    };
    // ????????????
    var panelIndex = null;
    $('.addpanelBtn').click(function () {
        if (editPermissionsFlag != 1) {
            layer.msg('???????????????????????????!', {icon: 7});
            return;
        }
        $('.relative1 input').removeClass('cursorDefault');
        panelIndex = 1;
        $('.addPanelCont input[name="panelGoodsName"]').attr('IVal', '');
        $('.addPanelCont input[name="panelGoodsName"]').val('');
        $('.addPanelCont input[name="panelGoodsNum"]').val('');
        $('.addPanelBox .playHeader span').html('??????????????????')
        popupShow('addPanelCont', 'addPanelBox');
    });
    // ??????????????????
    $('.relative1').click(function () {
        if (panelIndex == 2) {
            return;
        }
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
    // ??????
    $('.addPanelCont .panelAddBtn').click(function () {
        if (!($('.addPanelCont input[name="panelGoodsName"]').val() && $('.addPanelCont input[name="panelGoodsNum"]').val())) {
            layer.msg('???*?????????', {icon: 7});
            return;
        }
        ;
        var panelApi = panelIndex == 1 ? '/machine/newDisplayGood' : '/machine/updateDisplayGoodCount';
        var panelAddObj = JSON.stringify({
            machineId: machineSetData.machineId,
            goodId: Number($('.addPanelCont input[name="panelGoodsName"]').attr('IVal')),
            goodCount: Number($('.addPanelCont input[name="panelGoodsNum"]').val()),
        });
        loadingAjax(panelApi, 'post', panelAddObj, sessionStorage.token, 'mask', 'addPanelCont', 'addPanelBox', layer).then(res => {
            layer.msg(res.message, {icon: 1});
            panelTableIn.reload({
                where: {}
            });
            $('.addPanelCont input[name="panelGoodsName"]').attr('IVal', '');
            $('.addPanelCont input[name="panelGoodsName"]').val('');
            $('.addPanelCont input[name="panelGoodsNum"]').val('');
        }).catch(err => {
            layer.msg(err.message, {icon: 2});
        })
    });
    // ????????????
    $('.addPanelCont .addPanelCance').click(function () {
        $('.relative1 input').removeClass('cursorDefault');
        popupHide('addPanelCont', 'addPanelBox');
    })
    // ????????????
    table.on('tool(panelTable)', function (obj) {
        if (editPermissionsFlag != 1) {
            layer.msg('???????????????????????????!', {icon: 7});
            return;
        }
        if (obj.event == 'del') {
            layer.confirm('???????????????', function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                var delObj = JSON.stringify({
                    machineId: machineSetData.machineId,
                    goodId: obj.data.goodId
                });
                loadingAjax('/machine/removeDisplayGoodCount', 'post', delObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
                    layer.msg(res.message, {icon: 1});
                    panelTableIn.reload({
                        where: {}
                    });
                }).catch(err => {
                    layer.msg(err.message, {icon: 2})
                })
            })
        } else if (obj.event == 'edit') {
            $('.relative1 input').addClass('cursorDefault')
            panelIndex = 2
            $('.addPanelCont input[name="panelGoodsName"]').attr('IVal', obj.data.goodId);
            $('.addPanelCont input[name="panelGoodsName"]').val(obj.data.good_name_core);
            $('.addPanelCont input[name="panelGoodsNum"]').val(obj.data.goodCount);
            $('.addPanelBox .playHeader span').html('??????????????????')
            popupShow('addPanelCont', 'addPanelBox');
        }
    });
    // ????????????
    $('.undoAisleBtn').click(function () {
        if (editPermissionsFlag != 1) {
            layer.msg('???????????????????????????!', {icon: 7});
            return;
        }
        layer.confirm('???????????????????', function (index) {
            layer.close(index);
            aisleType = 2;
            if (sessionStorage.independentPass) {
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                loadingAjax('/machine/removeGoodWay', 'post', JSON.stringify({machineId: machineSetData.machineId,}), sessionStorage.token, 'mask', '', '').then(res => {
                    layer.msg(res.message, {icon: 1});
                    getGoodsWay(machineSetData.machineId);
                }).catch(err => {
                    layer.msg(err.message, {icon: 2})
                });
            } else {
                popupShow('iPasswprd', 'passwordCont')
            }


        })
    });

    // ????????????
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
                {field: 'goodName', title: '?????????', align: 'center',},
                {field: 'way', title: '??????', align: 'center',},
                {field: 'count', title: '??????', align: 'center',},
                {field: 'price', title: '??????', align: 'center', templet: d => percentileMoney(d.price)},
                {field: 'userName', title: '?????????', align: 'center',},
                {field: 'name', title: '???????????????', align: 'center',},
                {field: 'removeDate', title: '????????????', align: 'center',},
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
                //res?????????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??//??????????????????
                        "count": res.data.total,??//??????????????????
                        "data": res.data.list //??????????????????
                    };
                } else {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??  //??????????????????
                    }
                }

            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                permissions1();
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        });
    };
    //   ??????????????????
    $('.undoPushBtn').click(function () {
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        let fileName = `${machineSetData.info}????????????.xls`,
            url = `${vApi}/excelRemove?machineId=${machineSetData.machineId}`;
        exportExcel(url, fileName);
    });
    // ??????????????????
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
    $('.goodsCont').on('mouseleave', '.pic102', function () {
        $('#pic101').hide();
    });


    // ??????????????????
    var PImgSHow = true;

    $('body').on('mouseenter', '.wayImg', function (e) {
        var that = this;
        $('#pic101').attr('src', $(that).attr('src'));
        var img = new Image();
        img.onload = function () {
            $("#pic101").css({
                "width": this.width >= this.height ? 200 + 'px' : 'auto',
                "height": this.height > this.width ? 200 + 'px' : 'auto'
            }).fadeIn("fast");
            this.onload = null;

        };
        img.src = $(that).attr('src');
    });
    $('.wayImg').on('click', '.', function () {
        event.stopPropagation();
        PImgSHow = false;
    });
    $('body').on('mouseleave', '.wayImg', function () {
        if (PImgSHow) {
            $('#pic101').hide();
        }
    });


    $('#pic101').mouseenter(function () {
        $('#pic101').show();
    })
    $('#pic101').mouseleave(function () {
        $('#pic101').hide();
    });
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
});

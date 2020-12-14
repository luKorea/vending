import '../../MyCss/stores/machine.css';
import { provinceChange, cityChange } from '../../assets/public/selectMore';
// console.log()
layui.use(['table', 'form', 'layer', 'laydate', 'tree'], function () {
    var funNum = 1;
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
                    field: 'number', width: 150, title: '终端编号', align: 'center', templet: function (d) {
                        return d.number ? d.number : '-'
                    }
                },
                {
                    field: 'info', width: 330, title: '终端信息', align: 'center', templet: function (d) {
                        return d.info ? `<div>${d.info}</div>` : `<div><span style="color:red;">*</span>(售货机为新上线机器，请编辑售货机信息！)</div>`
                    }
                },
                {
                    field: 'location', width: 350, title: '地址', align: 'center', templet: function (d) {
                        return d.location ? d.location : ' - '
                    }
                },
                {
                    field: 'CreationTime', width: 130, title: '缺货状态', align: 'center', templet: function (d) {
                        return `<div><span class="${d.stockStatus == 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.stockStatus == 0 ? '正常' : d.stockStatus == 1 ? '一般' : '严重'}</span></div>`
                    }
                },
                {
                    field: 'onlineStatus', width: 130, title: '在线状态', align: 'center', templet: function (d) {
                        return `<div><span class="${d.onlineStatus != 0 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.onlineStatus == 0 ? '离线' : '在线'}</span></div>`
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
                { field: 'appVersion', width: 135, title: '软件版本', align: 'center', },
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
                permissions();
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                } else if (res.code == 405) {
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
                getGoodsWay(machineSetData.machineId);
                break;
            case 2:
                salesFun(machineSetData.machineId);
                break;
            case 3:
                recordFun(machineSetData.machineId);
                break;
            case 4:
                supportpay(machineSetData.machineId, machineSetData.userNum);
                break;
            case 5:
                replenishmenFun(machineSetData.machineId);
                break;
        }
    });
    // 监听售货机列表操作
    var machineSetData = null
    table.on('tool(machineTable)', function (obj) {
        machineSetData = obj.data;
        console.log(machineSetData)
        $('.maskHeader span').html(machineSetData.info ? machineSetData.info + '详细信息' : '-详细信息')
        if (obj.event == 'set') {
            $('.setUpCont').show();
            var setAddress = null;
            if (machineSetData.location) {
                setAddress = machineSetData.location.split(' ')
            }
            form.val("setDataVal", {
                'info': machineSetData.info,
                'appVersion': machineSetData.appVersion,
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
            if (machineSetData.openStatus == 1) {
                layer.msg('温馨提示！该售货机正在营业，不可进行编辑！', { icon: 7 })
            } else {
                if (!editFlag) {
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
            if (!activateFlag) {
                layer.msg('您没有激活售货机的权限!');
                return;
            }
            layer.confirm('确定激活该设备？', function (index) {
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
            if (machineSetData.onlineStatus != 1) {
                layer.msg('售货机处于离线状态不可以操作此功能', { icon: 7 });
                return;
            } else {
                if (!activateFlag) {
                    layer.msg('您没有更改营业状态的权限!');
                    return;
                }
            }
            // if (machineSetData.openStatus != 1) {
            layer.confirm(machineSetData.openStatus != 1 ? '确定营业？' : '确定暂停营业？', function (index) {
                var openStatusIndex = machineSetData.openStatus != 1 ? '1' : '0'
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon')
                loadingAjax('/machine/getStatus', 'post', JSON.stringify({ machineId: machineSetData.machineId }), token).then(Dres => {
                    console.log(Dres)
                    if (Dres.data.actionStatus == 1) {
                        loadingAjax('/pushActive', 'post', JSON.stringify({ machine: machineSetData.machineId, action: 'true' }), token).then(res => {
                        }).catch(err => {
                            if (err == 'true') {
                                loadingAjax('/machine/activeMachine', 'post', JSON.stringify({ machineId: machineSetData.machineId, openStatus: openStatusIndex }), token, 'mask').then(Sres => {
                                    layer.msg('操作成功', { icon: 1 });
                                    machineList.reload({
                                        where: {}
                                    })
                                }).catch(Serr => {
                                    layer.msg(Serr.message, { icon: 2 })
                                })
                            } else {
                                $('.mask').fadeOut();
                                $('.maskSpan').removeClass('maskIcon');
                                layer.msg('操作失败', { icon: 2 });
                            }
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
            // } else {
            //     layer.confirm('确定暂停营业？', function (index) {
            //         layer.close(index);
            //         $('.mask').fadeIn();
            //         $('.maskSpan').addClass('maskIcon');
            //         loadingAjax('/machine/getStatus', 'post', JSON.stringify({ machineId: machineSetData.machineId }), sessionStorage.token).then(Dres => {
            //             var statusType = Dres.data;
            //             if (statusType.actionStatus == 1) {
            //                 loadingAjax('/pushActive','post',)
            //             }else{
            //                 $('.mask').fadeOut();
            //                 $('.maskSpan').removeClass('maskIcon')
            //                 layer.msg('该设备未激活,无法进行营业操作', { icon: 7 })
            //             }
            //         }).catch(Derr=>{
            //             $('.mask').fadeOut();
            //             $('.maskSpan').removeClass('maskIcon')
            //             layer.msg(Derr.message, { icon: 2 })
            //         })


            //         $.ajax({
            //             type: 'post',
            //             url: `${vApi}/machine/getStatus`,
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 token,
            //             },
            //             data: JSON.stringify({
            //                 machineId: machineSetData.machineId,
            //             }),
            //             success: function (Dres) {
            //                 if (Dres.code == 200) {
            //                     console.log(Dres)
            //                     // return ;
            //                     // var statusType = JSON.parse(Dres.data);
            //                     var statusType = Dres.data;
            //                     if (statusType.actionStatus == 1) {
            //                         $.ajax({
            //                             type: 'post',
            //                             url: '/api/pushActive',
            //                             headers: {
            //                                 "Content-Type": "application/json",
            //                                 token,
            //                             },
            //                             data: JSON.stringify({
            //                                 machine: machineSetData.machineId,
            //                                 action: 'false'
            //                             }),
            //                             success: function (res) {
            //                                 // $('.mask').fadeOut();
            //                                 // $('.maskSpan').removeClass('maskIcon');
            //                                 // layer.msg('暂停营业成功', { icon: 1 });
            //                                 // machineList.reload({
            //                                 //     where: {}
            //                                 // })
            //                                 if (res == 'true') {
            //                                     $.ajax({
            //                                         type: 'post',
            //                                         url: '/api/machine/activeMachine',
            //                                         headers: {
            //                                             "Content-Type": "application/json",
            //                                             token,
            //                                         },
            //                                         data: JSON.stringify({
            //                                             machineId: machineSetData.machineId,
            //                                             openStatus: '0'
            //                                         }),
            //                                         success: function (Sres) {
            //                                             $('.mask').fadeOut();
            //                                             $('.maskSpan').removeClass('maskIcon')
            //                                             if (Sres.code == 200) {
            //                                                 layer.msg('暂停营业成功', { icon: 1 });
            //                                                 machineList.reload({
            //                                                     where: {}
            //                                                 })
            //                                             } else {

            //                                                 layer.msg(Sres.message, { icon: 2 })
            //                                             }
            //                                         }
            //                                     })
            //                                 } else {
            //                                     $('.mask').fadeOut();
            //                                     $('.maskSpan').removeClass('maskIcon');
            //                                     layer.msg('操作失败', { icon: 2 });
            //                                 }
            //                             }
            //                         })

            //                     } else {
            //                         $('.mask').fadeOut();
            //                         $('.maskSpan').removeClass('maskIcon')
            //                         layer.msg('该设备未激活,无法进行营业操作', { icon: 7 })
            //                     }
            //                 } else if (Dres.code == 403) {
            //                     window.parent.location.href = "login.html";
            //                 } else {
            //                     $('.mask').fadeOut();
            //                     $('.maskSpan').removeClass('maskIcon')
            //                     layer.msg(Dres.message, { icon: 2 })
            //                 }

            //             }
            //         })
            //     })
            // }
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
    var selesStartTime = '';
    //结束时间
    var selesEndTime = '';
    laydate.render({
        elem: '#test6',
        range: true,
        done: function (value, date, endDate) {
            // console.log(value); //得到日期生成的值，如：2017-08-18
            var timerKey = value.split(' - ');
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
                    field: 'time', width: 200, title: '时间'
                },
                { field: 'number', width: 250, title: '订单号', },
                // {
                //     field: 'shipStatus', width: 150, title: '出货状态', templet: function (d) {
                //         return `<div><span class="${d.shipStatus == 2 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.shipStatus == 0 ? '出货失败' : d.shipStatus == 1 ? '出货成功' : '货道故障'}</span></div>`
                //     }
                // },
                {
                    field: 'payStatus', width: 150, title: '支付状态', templet: function (d) {
                        return `<div><span class="${d.payStatus == 2 ? 'tableStateCellTrue' : 'tableStateCellFalse'}">${d.payStatus == 1 ? '等待支付' : d.payStatus == 2 ? '已支付' : '未支付'}</span></div>`
                    }
                },
                {
                    field: 'payType', width: 150, title: '支付方式', templet: function (d) {
                        return `<div><span class="${d.payType != 0 ? 'tableStateCellTrue' : 'tableStateCellAli'}">${d.payType != 0 ? '微信' : '支付宝'}</span></div>`
                    }
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
                    field: 'goodName', width: 200, title: '商品名', align: 'center', templet: function (d) {
                        if (d.good_info.length != 0) {
                            return d.good_info[0].goods_Name
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    field: 'ship_status', width: 150, title: '出货状态', align: 'center', templet: function (d) {
                        return d.ship_status == 0 ? '出货失败' : d.ship_status == 1 ? '出货成功' : '货道故障'
                    }
                },
                { field: 'before_count', width: 150, align: 'center', title: '出货前数量', },
                // { field: 'ship_count', width: 135, align: 'center', title: '出货数量',templet:function(d){
                //     return d.ship_status==1?'1':'0'
                // } },
                {
                    field: 'before_count', width: 150, align: 'center', title: '出货后数量', templet: function (d) {
                        return d.ship_status == 1 ? d.before_count - 1 : d.before_count
                    }
                },
                // { field: 'ship_f', width: 140, align: 'center', title: '出货失败数量',templet:function(d){
                //     return d.ship_status==1?'0':'1'
                // } },

                {
                    field: 'ship_type', width: 150, align: 'center', title: '出货类型', templet: function (d) {
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
    }
    // 出货记录列表
    $('.shipmentQueryBtn').click(function () {
        recordDataList.reload({
            where: {
                conditionTwo: startTime,
                conditionThree: endTime,
                conditionFour: $('.shipmentRecord input[name="keyName"]').val()
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
    var editFlag = false,
        activateFlag = false,
        editAisleFlag = false,
        paySetFlag = false,
        delAisleFlag = false,
        addAisleFlag = false,
        AisleDetailsFlag = false,//货道详情
        salesListFlag = false,//销售记录
        shipmentListFlag = false,//出货记录
        shmentListFlag = false;
    function permissions() {
        permissionsFun('/role/findUserPermission', 'post', sessionStorage.token, layer).then(res => {
            res.data.forEach(item => {
                if (item.id == '396') {
                    editFlag = true;
                }
                if (item.id == '392') {
                    activateFlag = true;
                }
                if (item.id == '424') {
                    editAisleFlag = true;
                }
                if (item.id == '432') {
                    paySetFlag = true;
                }
                if (item.id == '426') {
                    delAisleFlag = true;
                }
                if (item.id == '425') {
                    addAisleFlag = true;
                }
                if (item.id == '427') {
                    AisleDetailsFlag = true;
                }
                if (item.id == '401') {
                    salesListFlag = true;
                }
                if (item.id == '402') {
                    shipmentListFlag = true;
                }
                if (item.id == '456') {
                    shmentListFlag = true;
                }
            })

            activateFlag ? $('.activeMachineType').removeClass('hides') : $('.activeMachineType').addClass('hides')
            paySetFlag ? $('.payTypeSet').removeClass('hide') : $('.payTypeSet').addClass('hide');
            delAisleFlag ? $('.detailsDel').removeClass('hide') : $('.detailsDel').addClass('hide');
            AisleDetailsFlag ? $('aisleDetailsTab').removeClass('hide') : $('aisleDetailsTab').addClass('hide');
            salesListFlag ? $('.salesDetails').removeClass('hide') : $('.salesDetails').addClass('hide');
            shipmentListFlag ? $('.shipmentDetails').removeClass('hide') : $('.shipmentDetails').addClass('hide');
            shmentListFlag ? $('.shmentSet').removeClass('hide') : $('.shmentSet').addClass('hide');
        }).catch(err => {
            layer.msg(err.message, { icon: 2 })
        });
    }

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
            var titleHtml = `<div style="text-align: center;">您没有权限访问货道详情！</div>`
            $('.aisleGoodsCont').html(titleHtml)
            // console.log(err)
            // layer.msg(err.message, { icon: 2 })
        })
    };
    // 渲染方法
    function againFun(res) {
        console.log(res)
        wayList = [
            [], [], [], [], [], []
        ];
        res.data.forEach(item => {
            // console.log(item.row)
            if (item.row) {
                wayList[item.row - 1].push(item)
            }

        })
        console.log(wayList)
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
                                        <img src="${child.goods_images ? child.goods_images : require('../../img/failure.png')}" alt=""> 
                                    <span>${child.way}</span>
                                    </div>
                                <div class="numderBottom">
                                        <div class="status1">正常</div>
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
                                    <img src="${child.goods_images ? child.goods_images : require('../../img/failure.png')}" alt="">
                                        <span>${child.way}</span>
                                    </div>
                                    <div class="numderBottom">
                                        <div class="status2">禁用</div>
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
    sessionStorage.independentPass = '';
    var ArrIndex = null;
    $('body').on('click', '.aisleNumderClick', function () {
        console.log($(this).attr("fireIndex"))
        ArrIndex = $(this).attr("fireIndex").split(',');
        console.log(ArrIndex)
        if (!editAisleFlag) {
            layer.msg('您没有编辑货道的权限!', { icon: 7 })
            return;
        }
        if (sessionStorage.independentPass) {
            aisleEdit();
            popupShow('editAisle', 'editAisleBox')
        } else {
            popupShow('iPasswprd', 'passwordCont')
        }

    })
    // 独立密码
    $('.passBtn').click(function () {
        var IPassWord = JSON.stringify({
            alonePwd: hex_md5($('.iPasswprd input[name="iPassword"]').val())
        })
        loadingAjax('/user/verifyAlonePwd', 'post', IPassWord, sessionStorage.token, 'mask', 'iPasswprd', 'passwordCont', layer).then(res => {
            sessionStorage.independentPass = 'true';
            if (delIndex == 1) {
                var delData = JSON.stringify({
                    machineId: machineSetData.machineId,
                    ways: delArr
                });
                delFun(delData)
            } else if (!addIndex) {
                console.log(1)
                aisleEdit();
                popupHide('iPasswprd', 'passwordCont')
                popupShow('editAisle', 'editAisleBox')
            } else {
                popupHide('iPasswprd', 'passwordCont')
                popupShow('addDetalis', 'addCont')
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
        $('.editAisle input[name="goodsName"]').val(obj.data.mail == 1 ? '(邮寄)' + obj.data.goods_Name : obj.data.goods_Name);
        $('.editAisle input[name="goodsName"]').attr('IVal', obj.data.goods_Id);
        $('.editAisle input[name="price"]').val(obj.data.goods_Price);
        popupHide('goodsCont', 'goodsBox')
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
            price: goodsDetails.goods_Id? goodsDetails.price+'':'0',
            newPrice:$('.editAisle input[name="price"]').val()+'',
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
    var weId=null,
        aliId=null,
        AcbcId=null;
    function supportpay(machindID, merchantsID) {
        var payList = JSON.stringify({
            machineId: machindID,
        })
        loadingAjax('/pay/getMachinePayParam', 'post', payList, sessionStorage.token).then(res => {
            loadingAjax('/pay/getPayParam', 'post', JSON.stringify({ merchantId: Number(merchantsID) }), sessionStorage.token).then(pres => {
                var setPayStr = ''
                res.data.forEach((item, index) => {
                    if(item.id==1){
                        aliId=item.selectPay.length>0?item.selectPay[0].mpId:0
                    }else if(item.id==2){
                        weId=item.selectPay.length>0?item.selectPay[0].mpId:0
                    }else if(item.id==3){
                        AcbcId=item.selectPay.length>0?item.selectPay[0].mpId:0
                    }
                    if (item.status == 1) {
                        setPayStr += `<div class="layui-form-item">
                                        <label class="layui-form-label">${item.tName}：</label>
                                    <div class="layui-input-block">`
                        if (item.selectPay.length == 0) {
                            setPayStr += `<input type="radio" lay-filter="${item.id==3?'radioTest3':'radioTest'}" name="${item.id}" value="${0 + '-' + 0}" title="无" checked>`
                        } else {
                            setPayStr += `<input type="radio" lay-filter="${item.id==3?'radioTest3':'radioTest'}" name="${item.id}" value="${item.selectPay[0].mpId + '-' + 0}" title="无" >`
                        }
                        pres.data.forEach((e, i) => {
                            if (item.id == e.payType) {
                                setPayStr += `<input type="radio" lay-filter="${item.id==3?'radioTest3':'radioTest'}" name="${item.id}" value="${(item.selectPay.length > 0 ? item.selectPay[0].mpId : 0) + '-' + e.id}" title="${e.payee}" ${item.selectPay.length <= 0 ? '' : item.selectPay[0].paramId == e.id ? 'checked' : ''} >`
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
                if(Number(dataID[1])!='0'&&AcbcId!='0'){
                    var acbcObj=JSON.stringify({
                        machineId: machineSetData.machineId,
                        paramId: 0,
                        mpId: Number(AcbcId)
                    })
                    loadingAjax('/pay/updateMachinePayParam', 'post', acbcObj, sessionStorage.token).then(res => {}).then(res=>{
                    }).catch(err=>{})
                }
                
                supportpay(machineSetData.machineId, machineSetData.userNum);
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
                if(Number(dataID[1])!='0'&&weId!='0'){
                    var weObj=JSON.stringify({
                        machineId: machineSetData.machineId,
                        paramId: 0,
                        mpId: Number(weId)
                    })
                    loadingAjax('/pay/updateMachinePayParam', 'post', weObj, sessionStorage.token).then(res => {}).then(res=>{
                    }).catch(err=>{})
                }
                if(Number(dataID[1])!='0'&&aliId!='0'){
                    var aliObj=JSON.stringify({
                        machineId: machineSetData.machineId,
                        paramId: 0,
                        mpId: Number(aliId)
                    })
                    loadingAjax('/pay/updateMachinePayParam', 'post', aliObj, sessionStorage.token).then(res => {}).then(res=>{
                    }).catch(err=>{})
                }
                setImmediate(_=>{
                    supportpay(machineSetData.machineId, machineSetData.userNum);
                },100)
                
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
    var replenishmentList
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
                    field: 'ship_f', width: 180, title: '商品名', align: 'center', templet: function (d) {
                        if (d.good_info.length != 0) {
                            return d.good_info[0].goods_Name
                        } else {
                            return '-'
                        }
                    }
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
    var replenishmentStartTime = '';
    //结束时间
    var sreplenishmentEndTime = '';
    laydate.render({
        elem: '#test8',
        range: true,
        done: function (value, date, endDate) {
            // console.log(value); //得到日期生成的值，如：2017-08-18
            var timerKey = value.split(' - ');
            replenishmentStartTime = timerKey[0];
            sreplenishmentEndTime = timerKey[1];
        }
    });
    $('.replenishment .RQueryBtn').click(function () {
        replenishmentList.reload({
            where: {
                start_time: replenishmentStartTime ? replenishmentStartTime : null,
                end_time: sreplenishmentEndTime ? sreplenishmentEndTime : null
            }
        })
    });
});
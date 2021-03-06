// import { loadAjax, showPopup } from '../../common/common';
import '../../MyCss/marketing/pickupCode.scss';
layui.use(['form', 'layer', 'table', 'transfer', 'tree'], function () {
    var merchantId = 1;
    var permissionsData0 = window.parent.permissionsData1(),
        permissionsObj = {
            436: false,
            437: false,
            465: false,
        },
        permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);
    // 权限控制
    function permissions() {
        permissionsObjFlag[436] ? $('.addBtn').removeClass('hide') : $('.addBtn').addClass('hide');
        permissionsObjFlag[437] ? $('.ListOperation .listEdit').removeClass('hide') : $('.ListOperation .listEdit').addClass('hide');
        permissionsObjFlag[465] ? $('.pushBtn').removeClass('hide') : $('.pushBtn').addClass('hide');

    };
    permissions();
    // 收起
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.on-left').show()
    });
    $('.on-left').click(function () {
        $('.left-mian').show();
        $('.on-left').hide()
    });
    var form = layui.form,
        layer = layui.layer,
        table = layui.table,
        transfer = layui.transfer,
        tree = layui.tree,
        activityTable = table.render({
            elem: '#tableactivity',
            method: 'post',
            url: `${vApi}/activity/getActivityList`,
            contentType: "application/json",
            headers: {
                token: sessionStorage.token
            },
            cols: [[
                { field: 'activity_name', width: 200, title: '活动名', event: 'pickup', align: 'center' },
                { field: 'code_count', width: 120, title: '取货码数量', event: 'pickup', align: 'center' },
                {
                    field: 'roleSign', width: 180, title: '开始时间', event: 'pickup', align: 'center', templet: function (d) {
                        if (d.start_time) {
                            return timeStamp(d.start_time)
                        } else {
                            return '-';
                        }
                    }
                },
                {
                    field: 'alias', width: 180, title: '结束时间', event: 'pickup', align: 'center', templet: function (d) {
                        if (d.start_time) {
                            return timeStamp(d.end_time)
                        } else {
                            return '-';
                        }
                    }
                },
                {
                    field: 'phone', width: 130, title: '活动状态', event: 'pickup', align: 'center', templet: function (d) {
                        var time = new Date().getTime();
                        return d.activity_status == 1 ? '已暂停' : d.activity_status == 2 ? '已取消' : time > d.end_time ? '已过期' : '活动正常'
                    }
                },
                { field: 'create_user', width: 200, title: '创建人', event: 'pickup', align: 'center' },
                {
                    field: 'addUser', width: 200, title: '创建时间', event: 'pickup', align: 'center', templet: function (d) {
                        if (d.start_time) {
                            return timeStamp(d.create_time)
                        } else {
                            return '-';
                        }
                    }
                },
                // { field: 'operation', width: 350, title: '操作', align: 'center', toolbar: '#barDemo', fixed: 'right', right: 0, },
                // { field: 'operation', fixed: 'right', align: 'center', right: 0, width: 350, title: '操作', toolbar: '#barDemo' },
                { field: 'operation', right: 0, width: 150, title: '操作', toolbar: '#barDemo', align: 'center' },//fixed: 'right',
            ]],
            id: 'activityId',
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                merchant_id: sessionStorage.machineID
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
                } else if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
                else {
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
            }

        });
    // 时间范围选择
    // 获取当前时间

    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    $('.addActivity .cancel_btn').click(function () {
        popupHide('addActivity', 'addActivityBox')
    });
    $('.goodsCont .cancel_btn').click(function () {
        popupHide('goodsCont', 'goodsBox')
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

    //   添加活动
    var start_time = null,//活动开始时间
        end_time = null;//活动结束时间
    $('.addBtn').click(function () {
        var myDate = new Date();
        var y = myDate.getFullYear();
        var m = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
        var d = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
        var h = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
        var min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
        var s = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
        var time = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
        $('.J-datepicker-range').datePicker({
            hasShortcut: true,
            min: time,
            max: '',
            isRange: true,
            hide: function (type) {
                console.info(this.$input.eq(0).val(), this.$input.eq(1).val());
                start_time = this.$input.eq(0).val();
                end_time = this.$input.eq(1).val();
            }
        });
        popupShow('addActivity', 'addActivityBox');
    });
    // 选择商品
    $('.goodsChooseBtn').click(function () {
        if (goodsList.length == 0) {
            goodsreload();
            popupShow('goodsCont', 'goodsBox');
        } else {
            chooseFun(goodsList);
            $('.chooseFooter').show();
            $('.chooseGoods input').prop('disabled', false)
            popupShow('chooseGoods', 'chooseGoodsBox')
        }

    });
    // 选择更多商品
    $('.moreChoose').click(function () {
        popupHide('chooseGoods', 'chooseGoodsBox')
        popupShow('goodsCont', 'goodsBox');

    });
    $('.machineChooseBtn').click(function () {
        machineListArr = [];
        getMachineList(merchantId);
        popupShow('machineDetailsCont', 'machineDetailsBox');
    })
    // 售货机列表
    var machineAdvertising = null;
    var machineList = [];
    var currentMachine = [];
    function machineAdvertisingFun() {
        machineAdvertising = table.render({
            elem: '#machineDetailsList',
            url: `${vApi}/machine/getMachineList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { type: 'checkbox', },
                { field: 'info', width: 200, title: '售货机信息', align: 'center' },
                { field: 'location', width: 300, title: '地址', align: 'center', },
                { field: 'merchantName', width: 300, title: '所属商户', align: 'center', },
            ]],
            page: true,
            id: 'machineAdvertisingList',
            loading: true,
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
                currentMachine = []
                res.data.forEach((item, index) => {
                    currentMachine.push(item.machineId);
                    for (var i in machineList) {
                        var ele = machineList[i];
                        if (item.machineId == ele) {
                            $('.machineChooseList tr[data-index=' + i + '] input[type="checkbox"]').prop('checked', true);
                            form.render();// 重新渲染一下
                        }
                    }
                });

                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
            // skin: 'nob'
        });
    };
    // machineAdvertisingFun();
    // 监听售货机复选框操作
    table.on('checkbox(machineDetailsList)', function (obj) {
        // console.log(obj.checked); //当前是否选中状态
        // console.log(obj.data); //选中行的相关数据
        // console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        if (obj.type == 'all') {
            var arr = [];
            if (obj.checked) {
                currentMachine.forEach(item => {
                    if (!machineList.includes(item)) {
                        machineList.push(item)
                    }
                })
                // machineList = machineList.concat(currentMachine);
            } else {
                machineList.forEach((item, index) => {
                    if (!currentMachine.includes(item)) {
                        arr.push(item)
                    }
                });
                machineList = arr;
                // console.log(machineList)
            }
        } else {
            if (obj.checked) {
                machineList.push(obj.data.machineId);
                // console.log(machineList)
            } else {
                machineList.splice(machineList.indexOf(obj.data.machineId), 1)
                // console.log(machineList)
            }
        }
        if (machineList.length > 0) {
            $('.machineFlag').text('已选择')
        } else {
            $('.machineFlag').text('未选择')
        }
    });
    $('.machineDetailsCont .determineBtn').click(function () {
        if (chooseMachine == 0) {
            layer.msg('请选择售货机', { icon: 7 });
            return;
        };
        popupHide('machineDetailsCont', 'machineDetailsBox');
    })

    //   商品列表
    var goodsTableIns = null;
    var currenGoods = [];
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
                { type: 'checkbox', },
                { field: 'goods_images', width: 100, title: '图片', templet: "#imgtmp", align: 'center' },
                {
                    field: 'goods_Name', width: 200, title: '商品名', color: '#409eff', align: 'center', templet: function (d) {
                        return (d.mail == 1 ? '(邮寄)' + d.goods_Name : d.goods_Name)
                    }
                },
                { field: `classifyName`, width: 160, title: '商品类目', align: 'center' },
                { field: 'goods_Core', width: 250, title: '商品编号', align: 'center', },
            ]],
            id: 'goodsID',
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                condition: merchantId,
                conditionSeven: 0,
            },
            parseData: function (res) {
                // console.log(res)
                //res 即为原始返回的数据
                if (res.code == 200) {
                    var gTotal = [];
                    res.data.list.forEach(item => {
                        if (item.mail == 0) {
                            gTotal.push(item)
                        }
                    })
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "count": res.data.total, //解析数据长度
                        "data": res.data.list //解析数据列表
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
                console.log(res)
                console.log(goodsList)
                for (var i in goodsList) {
                    res.data.forEach((item, index) => {

                        // var ele = ;
                        if (item.goods_Id == goodsList[i].goodsId) {
                            $('.goodsChooseList tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
                            form.render();// 重新渲染一下
                        }

                    })
                }
                $('.list-table .layui-table-header input[type="checkbox"]').prop('disabled', true);
                $('.list-table .layui-table-header .laytable-cell-checkbox>div').hide();
                form.render('checkbox');
            }
        })
    }
    // goodsreload();
    var goodsList = [];
    table.on('checkbox(goodsTable)', function (obj) {
        // console.log(obj.data); //选中行的相关数据
        if (obj.type == "all") {
        } else {
            if (obj.checked) {
                goodsList.push({
                    goods_Name: obj.data.goods_Name,
                    goodsId: obj.data.goods_Id,
                    count: 1,
                    goods_images: obj.data.goods_images,
                    goods_Core: obj.data.goods_Core,
                });
                // console.log(goodsList);
            } else {
                goodsList.forEach((item, index) => {
                    if (item.goodsId == obj.data.goods_Id) {
                        goodsList.splice(index, 1)
                    }
                });
                console.log(goodsList)
            }
        }
        if (goodsList.length > 0) {
            $('.goodsFlag').text('已选择')
        } else {
            $('.goodsFlag').text('未选择')
        }

    });
    $('.goodsCont .determineBtn').click(function () {
        if (goodsList.length == 0) {
            layer.msg('请选择商品', { icon: 7 })
            return;
        }
        chooseFun(goodsList);
        $('.chooseFooter').show();
        $('.chooseGoods input').prop('disabled', false)
        popupShow('chooseGoods', 'chooseGoodsBox')
    })
    // 渲染已选择商品
    function chooseFun(goods) {
        console.log(9009);
        var goodsStr = '';
        goods.forEach((item, index) => {
            goodsStr += ` <li class="setMateraialList">
                            <div class="abbreviateImg">
                                <img src="${item.goods_images}" alt="">
                            </div>
                            <div class="SetName">
                                <div>${item.goods_Name}</div>
                            </div>
                            <div class="SetName">
                                <div>${item.goods_Core}</div>
                            </div>
                            <div class="duration">
                                <div>
                                    <input type="number" inputIndex="${index}" value="${item.count}">
                                </div>
                            </div>
                          
                        </li>`
            //     <div class="SetOperation">
            //     <button class="layui-btn layui-btn-normal delBtn  btn del-btn" delIndex="${index}">
            //         <span>删除</span>
            //     </button>
            // </div>
        });
        $('.SetContList').html(goodsStr)
    };

    // 输入商品数量事件
    var reduction = 1;
    $('.SetContList').on('change', '.setMateraialList input', function () {
        var num = $(this).val(),
            re = /^\d*$/;
        console.log(num)
        if ((!re.test(num)) || (num == 0)) {
            layer.msg('只能输入正整数', { icon: 7 });
            if (reduction) {
                $(this).val(reduction);
                goodsList[$(this).attr('inputIndex')].count = $(this).val();
            } else {
                $(this).val(1);
                goodsList[$(this).attr('inputIndex')].count = $(this).val();
            }

        } else {
            reduction = $(this).val();
            console.log($(this).attr('inputIndex'));
            goodsList[$(this).attr('inputIndex')].count = $(this).val();
        }
    });
    // 已选商品删除
    // 已选择商品确定
    $('.chooseGoods .determineBtn').click(function () {
        popupHide('goodsCont', 'goodsBox');
        popupHide('chooseGoods', 'chooseGoodsBox')
    });
    // 点击高级设置
    var flag = false;
    $('.moreList').click(function () {
        $('.seniorSet').slideToggle();
        flag = !flag;
        if (flag) {
            $('.moreList img').addClass('actives')
        } else {
            $('.moreList img').removeClass('actives')
        }
    });
    // 选择单个清除取货码时间;
    var cleanTime = null;
    $('.J-datepicker').datePicker({
        hasShortcut: true,
        min: '',
        max: '',
        hide: function () {
            console.info(this.$input.eq(0).val());
            cleanTime = this.$input.eq(0).val()
        }
    });
    // 清除无效取货码
    $('.cleanBtn').click(function () {
        if (!cleanTime) {
            layer.msg('请选择需要清除无效取货码的时间节点', { icon: 7 });
            return;
        }
        layer.confirm(`确定清除${cleanTime}前无效的取货码？`, function (index) {
            layer.close(index);
            var tiemObj = JSON.stringify({
                time: cleanTime
            })
            loadingAjax('/activity/resetGoodCode', 'post', tiemObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
                layer.msg(res.message, { icon: 1 })
            }).catch(err => {
                layer.msg(err.message, { icon: 2 })
            })
        })

    });
    var codecountNum = 1;
    $('.addActivityBody input[name="codeConst"]').keyup(function () {
        var num = $(this).val(),
            re = /^\d*$/;
        if (!re.test(num)) {
            layer.msg('只能输入正整数', { icon: 7 });
            if (codecountNum) {
                $(this).val(codecountNum);
            } else {
                $(this).val(1);
            }
        } else {
            codecountNum = $(this).val();
        }
    });
    var codeLen = 12;
    $('.addActivityBody input[name="codeLen"]').keyup(function () {
        var num = $(this).val(),
            re = /^\d*$/;
        if (!re.test(num)) {
            layer.msg('只能输入正整数', { icon: 7 });
            if (codeLen) {
                $(this).val(codeLen);
            } else {
                $(this).val(12);
            }
        } else {
            codeLen = $(this).val();
        }
    });
    var lenFlag = false
    $('.addActivityBody input[name="codeLen"]').blur(function () {
        if (!($(this).val() >= 8 && $(this).val() <= 30)) {
            layer.msg('取货码长度范围为8位到30位', { icon: 7 });
            $(this).val(12);
            lenFlag = true
            return;
        }
        lenFlag = false
    });

    // 新增活动提交
    $('.addFooter .submitBtn').click(function () {
        if (!(start_time && end_time)) {
            layer.msg('请选择开始时间与结束时间', { icon: 7 });
            return;
        }
        if (!($('.addActivityBody input[name="activityName"]').val() && $('.addActivityBody input[name="codeConst"]').val() > 0)) {
            layer.msg('活动名不能为空且取货码数量必须大于0', { icon: 7 });
            return;
        }
        if (chooseMachine.length == 0) {
            layer.msg('请选择售货机', { icon: 7 })
            return;
        }
        if (goodsList.length == 0) {
            layer.msg('请选择商品', { icon: 7 })
            return;
        }
        if (lenFlag) {
            lenFlag = false;
            return;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var pushGoodsList = [];
        goodsList.forEach(item => {
            pushGoodsList.push({
                good_count: Number(item.count),
                good_id: item.goodsId
            })
        })
        var addOb = JSON.stringify({
            activity_name: $('.addActivityBody input[name="activityName"]').val(),
            start_time,
            end_time,
            code_count: $('.addActivityBody input[name="codeConst"]').val(),
            merchantId: merchantId,
            machines: chooseMachine,
            goods: pushGoodsList,
            type: Number($('.complex input[name="complexNum"]:checked').val()),
            len: $('.seniorSet input[name="codeLen"]').val()
        })
        console.log(addOb);
        // return ;
        loadingAjax('/activity/newActivity', 'post', addOb, sessionStorage.token, 'mask', 'addActivity', 'addActivityBox').then(res => {
            layer.msg(res.message, { icon: 1 });
            $('.addActivityBody input[name="activityName"]').val('');
            $('.addActivityBody input[name="codeConst"]').val('');
            $('.c-datepicker-data-input').val('');
            $('.machineFlag').html('未选择');
            $('.goodsFlag').html('未选择');
            start_time = null;
            end_time = null;
            chooseMachine = [];
            goodsList = [];
            $('.seniorSet input[name="codeLen"]').val(12);
            // $('.complex input[name="complexNum"]').val(4);
            activityTable.reload({
                where: {}
            });
            // machineAdvertising.reload({

            // });
            goodsTableIns.reload({
                where: {}
            });
            transferFun(machineListArr, chooseMachine)
        }).catch(err => {
            layer.msg(err.message, { icon: 2 });
        })
    });


    // 监听操作部分
    var pickupObj = null,
        operationFlag = null;
    table.on('tool(tableactivity)', function (obj) {
        event.stopPropagation();
        pickupObj = obj.data;
        if (obj.event === 'operation') {
            if (operationFlag == obj.data.id) {
                $('.ListOperation').fadeOut();
                operationFlag = null;
                return;
            }
            operationFlag = obj.data.id;
            pickupObj.activity_status == 0 ? $('.ListOperation .stop').html('暂停') : $('.ListOperation .stop').html('开始')
            $('.ListOperation').fadeIn();
            $('.ListOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        } else if (obj.event == 'pickup') {
            console.log(obj.data.id)
            // if (!pickupCodeIn) {
            pickupCodeFun(obj.data.id)
            // }else{
            //     pickupCodeIn.reload({
            //         id: obj.data.id
            //     });
            // }
            $('.pickCode .playHeader span').html(obj.data.activity_name + '取货码列表')
            popupShow('pickCode', 'pickCodeBox')
        }
    });

    //
    // 活动售货机
    $('.ListOperation .machineIn').click(function () {
        if (!activityMachineIn) {
            activityMachineFun();
        };
        activityMachineIn.reload({
            data: pickupObj.activity_machine
        });
        $('.activityMachine .playHeader span').html(pickupObj.activity_name + '活动售货机')
        popupShow('activityMachine', 'activityMachineBox')
    });
    // 活动商品
    $('.ListOperation .goodsIn').click(function () {
        chooseFun(pickupObj.goods_list);
        $('.chooseFooter').hide();
        $('.chooseGoods input').prop('disabled', true);
        $('.activityMachine .playHeader span').html(pickupObj.activity_name + '活动商品')
        popupShow('chooseGoods', 'chooseGoodsBox')
    });
    // 暂停开始
    $('.ListOperation .stop').click(function () {
        var stamp = new Date().getTime();
        if (stamp > pickupObj.end_time) {
            layer.msg('该活动已过期，不可进行操作', { icon: 7 });
            return;
        };
        layer.confirm(pickupObj.activity_status == 0 ? '确定暂停？' : '确定开始？', function (index) {
            layer.close(index);
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            var stopObj = JSON.stringify({
                activity_id: pickupObj.id,
                activity_status: pickupObj.activity_status == 0 ? 1 : 0
            });
            loadingAjax('/activity/operateActivity', 'post', stopObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
                layer.msg(res.message, { icon: 1 });
                activityTable.reload({
                    where: {}
                })
            }).catch(err => {
                layer.msg(err.message, { icon: 2 })
            })
        })
    });
    // 取消
    $('.ListOperation .cancel0').click(function () {
        var stamp = new Date().getTime();
        if (stamp >pickupObj.end_time) {
            layer.msg('该活动已过期，不可进行取消操作', { icon: 7 });
            return;
        }
        if(pickupObj.activity_status==2){
            layer.msg('该活动已取消', { icon: 7 });
            return;
        }
        layer.confirm(`确定取活动(取消后活动将停止并且取货码失效)`, function (index) {
            layer.close(index);
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            var cancelObj = JSON.stringify({
                activity_id: pickupObj.id,
                activity_status: 2
            })
            loadingAjax('/activity/operateActivity', 'post', cancelObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
                layer.msg(res.message, { icon: 1 });
                activityTable.reload({
                    where: {}
                })
            }).catch(err => {
                layer.msg(err.message, { icon: 2 })
            })
        })
    })
    var activityMachineIn = null;
    function activityMachineFun() {
        activityMachineIn = table.render({
            elem: '#activityMachine',
            cols: [[
                { field: 'number', width: 200, title: '售货机编号', align: 'center' },
                { field: 'info', width: 200, title: '售货机信息', align: 'center' },
                { field: 'location', width: 310, title: '地址', align: 'center', },
            ]],
            data: [

            ],
            id: 'chooseMachineIn',
            loading: true,
        })
    }
    // 取货码列表
    var pickupCodeIn = null;
    function pickupCodeFun(id) {
        pickupCodeIn = table.render({
            elem: '#pickCodeIn',
            method: 'get',
            url: `${vApi}/activity/getCode`,
            headers: {
                token: sessionStorage.token
            },
            cols: [[
                { field: 'good_code', width: 150, title: '取货码', align: 'center' },
                {
                    field: 'code_status', width: 130, title: '使用情况', align: 'center', templet: function (d) {
                        return d.code_status == 0 ? '待使用' : '已使用'
                    }
                },
                {
                    field: 'info', width: 210, title: '使用的售货机', align: 'center', templet: function (d) {
                        return d.info ? d.info : '-'
                    }
                },
                {
                    field: 'excelShipInfos', width: 250, title: '出货情况', align: 'center', templet: function (d) {
                        if (d.excelShipInfos.length == 0) {
                            return '-'
                        } else {
                            var exStr = '';
                            d.excelShipInfos.forEach(item => {
                                exStr += `<div>${item.goods_Name}(${item.ship_statusStr})</div><div></div>`
                            });
                            return exStr
                        }
                    }
                },
                {
                    field: 'operate_time', width: 175, title: '使用时间', align: 'center', templet: function (d) {

                        if (d.operate_time) {
                            return timeStamp(d.operate_time);
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    field: 'refund', width: 100, title: '退货状态', align: 'center', templet: function (d) {
                        return d.refund == 1 ? '已退货' : '未退货'
                    }
                },
            ]],
            data: [
            ],
            id: 'pickIn',
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                id,
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
                } else if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
                else {
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
            }
        })
    };

    // 活动查询
    $('.queryBtnClick').click(function () {
        activityTable.reload({
            where: {
                condition: $('.activityListKey .KyeText').val()
            }
        });
    });
    // 取货码查询
    $('.keyCodeBtn').click(function () {
        pickupCodeIn.reload({
            where: {
                good_code: $('.newKeyContent input[name="keyGoodsCode"]').val()
            }
        });
    })
    // 售货机查询
    $('.machineKeyBtn').click(function () {
        machineAdvertising.reload({
            where: {
                keyword: $('.machineDetailsBody input[name="machineKey"]').val()
            }
        })
    });
    // 商品查询
    $('.goodsKeyBtn').click(function () {
        goodsTableIns.reload({
            where: {
                conditionTwo: $('.goodsCont input[name="GoodsKyeText"]').val()
            }
        })
    });

    // 售货机穿梭框
    function transferFun(data, value) {
        transfer.render({
            elem: '#test6',
            data,
            title: ['未选择售货机', '已选择售货机'],
            width: 380,
            height: 500, //定义高度
            value,
            onchange: function (obj, indexs) {
                console.log(indexs)
                if (indexs == 0) {
                    obj.forEach(item => {
                        chooseMachine.push(item.value)
                    })
                } else if (indexs == 1) {
                    obj.forEach(item => {
                        chooseMachine.splice(chooseMachine.indexOf(item.value), 1);
                    });
                }
                chooseMachine.length == 0 ? $('.machineFlag').text('未选择') : $('.machineFlag').text('已选择')
            }
        });
    };
    //   活动已选择售货机
    var chooseMachine = [];
    //   获取商户下的售货机
    var machineListArr = [];
    function getMachineList(merchantId) {
        loadingAjax(`/machine/getMachine?merchantId=${merchantId}`,
            'GET',{}, sessionStorage.token).then(res => {
            var getList=res.data.unSelect;
            getList.forEach(item => {
                var transObj = {
                    value: item.machineId,
                    title: item.info ? item.info : '(此为未命名的新售货机)'
                };
                machineListArr.push(transObj)
            });
            transferFun(machineListArr, chooseMachine);
        }).catch(err => {
            layer.msg(err.message, { icon: 2 });
        })
    };
    // 导出取货码
    $('.pushBtn').click(function () {
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        let url = `${vApi}/exportCodes?id=${pickupObj.id}&good_code=${$('.newKeyContent input[name="keyGoodsCode"]').val()}`,
            fileName = `${pickupObj.activity_name}取货码.xls`;
        exportExcel(url ,fileName);
    });

    // 图片放大事件
    var PImgSHow = true;
    $('.data-list-contnet').on('mouseenter', '.pic102', function (e) {
        var that = this;
        $('#pic101').attr('src', $(that).attr('src'));
        var img = new Image();
        img.onload = function () {
            $("#pic101").css({
                "width": this.width >= this.height ? 350 + 'px' : 'auto',
                "height": this.height > this.width ? 450 + 'px' : 'auto'
            }).fadeIn("fast");
            this.onload = null;

        };
        img.src = $(that).attr('src');
    });
    $('.data-list-contnet').on('click', '.pic102', function () {
        event.stopPropagation();
        PImgSHow = false;
    });
    $('.data-list-contnet').on('mouseleave', '.pic102', function () {
        if (PImgSHow) {
            $('#pic101').hide();
        }
    });
    $('#pic101').click(function () {
        event.stopPropagation();
    });
    $('body').click(function () {
        PImgSHow = true;
        $('#pic101').hide();
    });
    $('#pic101').mouseenter(function () {
        $('#pic101').show();
    })
    $('#pic101').mouseleave(function () {
        if (PImgSHow) {
            $('#pic101').hide();
        }
    });
    // 刷新商户列表
    var dataList1 = null;
    var dataList = dataList1 = treeList();
    $('.refreshBtnList').click(function () {
        var dataList1 = treeList();
        if (JSON.stringify(dataList1) != JSON.stringify(dataList)) {
            dataList = dataList1;
            treeFun1(tree, 'testGoods', activityTable, dataList,)
            activityTable.reload({
                where: {
                    merchantId: sessionStorage.machineID,
                }
            });
            layer.msg('已刷新', { icon: 1 })
        } else {
            layer.msg('已刷新', { icon: 1 })
        }
    });
    treeFun1(tree, 'testGoods', activityTable, dataList,);
    function treeFun1(tree, element, tableID, data,) {
        tree.render({
            elem: `#${element}`,
            id: 'treelist',
            showLine: !0 //连接线
            ,
            onlyIconControl: true, //左侧图标控制展开收缩
            data,
            spread: true,
            text: {
                defaultNodeName: '无数据',
                none: '您没有权限，请联系管理员授权!'
            },
            click: function (obj) {
                merchantId = obj.data.id;
                // if (permissionsObjFlag[436]) {
                //     if (obj.data.id == sessionStorage.machineID) {
                //         $('.addBtn').show()
                //     } else {
                //         $('.addBtn').hide()
                //     }
                // }
                tableID.reload({
                    where: {
                        merchant_id: obj.data.id
                    }
                })
                var nodes = $(`#${element} .layui-tree-txt`)
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].innerHTML === obj.data.title)
                        nodes[i].style.color = "#be954a";
                    else
                        nodes[i].style.color = "#555";
                }
            },
        });
    };
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
})

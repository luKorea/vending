// import { loadAjax, showPopup } from '../../common/common';
import '../../MyCss/marketing/pickupCode.scss';
layui.use(['form', 'layer', 'table', 'transfer'], function () {
    var addFlag = false,
        editFlag = false,
        delFlag = false;
    // 权限控制
    permissionsVal(436, 437).then(res => {
        addFlag = res.addFlag;
        editFlag = res.editFlag;
        console.log(addFlag)
        permissions();
    });
    var form = layui.form,
        layer = layui.layer,
        table = layui.table,
        transfer = layui.transfer,
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
                    field: 'open', width: 120, title: '已兑换数量', event: 'pickup', align: 'center', templet: function (d) {
                        var tatol = 0;
                        d.good_codes.forEach(item => {
                            if (item.code_status == 1) {
                                tatol++
                            }
                        });
                        return tatol
                    }
                },
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
                { field: 'create_user', width: 180, title: '创建人', event: 'pickup', align: 'center' },
                {
                    field: 'addUser', width: 180, title: '创建时间', event: 'pickup', align: 'center', templet: function (d) {
                        if (d.start_time) {
                            return timeStamp(d.create_time)
                        } else {
                            return '-';
                        }
                    }
                },
                { field: 'operation', width: 350, title: '操作', align: 'center', toolbar: '#barDemo', fixed: 'right', right: 0, },
            ]],
            id: 'activityId',
            page: true,
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
        if (machineListArr.length == 0) {
            getMachineList(sessionStorage.UserId);
        } else {
            transferFun(machineListArr, chooseMachine)
        }
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
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.data); //选中行的相关数据
        console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
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
                console.log(machineList)
            }
        } else {
            if (obj.checked) {
                machineList.push(obj.data.machineId);
                console.log(machineList)
            } else {
                machineList.splice(machineList.indexOf(obj.data.machineId), 1)
                console.log(machineList)
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
                { field: 'goods_Name', width: 200, title: '商品名', color: '#409eff', align: 'center',templet:function(d){
                    return (d.mail==1?'(邮寄)'+d.goods_Name:d.goods_Name)
                } },
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
                condition: sessionStorage.machineID,
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
                    res.data.forEach((item,index )=> {

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
    goodsreload();
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
                console.log(goodsList);
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
    // $('.chooseGoods').on('click','.delBtn',function(){
    //     console.log($(this).attr('delIndex'))
    //     if(goodsList.length==1){
    //         layer.msg('不能全部删除',{icon:7});
    //         return ;
    //     }
    //     layer.confirm('确定删除？', function (index) {
    //         layer.close(index);
    //         goodsList.splice($(this).attr('delIndex'),1);
    //         chooseFun(goodsList);
    //     })
    // })
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
    var lenFlag=false
    $('.addActivityBody input[name="codeLen"]').blur(function () {
        if (!($(this).val() >= 8 && $(this).val() <= 30)) {
            layer.msg('取货码长度范围为8位到30位', { icon: 7 });
            $(this).val(12);
            lenFlag=true
            return;
        }
        lenFlag=false
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
        if(lenFlag){
            lenFlag=false;
            return ;
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
            merchantId: sessionStorage.machineID,
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
    table.on('tool(tableactivity)', function (obj) {
        console.log(obj)
        var stamp = new Date().getTime();
        if (obj.event == 'stop') {
            if (stamp > obj.data.end_time) {
                layer.msg('该活动已过期，不可进行操作', { icon: 7 });
                return;
            };
            layer.confirm(obj.data.activity_status == 0 ? '确定暂停？' : '确定开始？', function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                var stopObj = JSON.stringify({
                    activity_id: obj.data.id,
                    activity_status: obj.data.activity_status == 0 ? 1 : 0
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
        } else if (obj.event == 'cancel') {
            if (stamp > obj.data.end_time) {
                layer.msg('该活动已过期，不可进行取消操作', { icon: 7 });
                return;
            }
            layer.confirm(`确定取活动(取消后活动将停止并且取货码失效)`, function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                var cancelObj = JSON.stringify({
                    activity_id: obj.data.id,
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
        } else if (obj.event == 'machineIn') {
            if (!activityMachineIn) {
                activityMachineFun();
            };
            activityMachineIn.reload({
                data: obj.data.activity_machine
            });
            $('.activityMachine .playHeader span').html(obj.data.activity_name + '活动售货机')
            popupShow('activityMachine', 'activityMachineBox')

        } else if (obj.event == 'goodsIn') {
            chooseFun(obj.data.goods_list);
            $('.chooseFooter').hide();
            $('.chooseGoods input').prop('disabled', true);
            $('.activityMachine .playHeader span').html(obj.data.activity_name + '活动商品')
            popupShow('chooseGoods', 'chooseGoodsBox')
        } else if (obj.event == 'pickup') {
            // console.log(1)   
            if (!pickupCodeIn) {
                pickupCodeFun()
            }
            pickupCodeIn.reload({
                data: obj.data.good_codes
            });
            $('.pickCode .playHeader span').html(obj.data.activity_name + '取货码列表')
            popupShow('pickCode', 'pickCodeBox')
        }
    });
    // 活动售货机
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
    function pickupCodeFun() {
        pickupCodeIn = table.render({
            elem: '#pickCodeIn',
            cols: [[
                { field: 'good_code', width: 150, title: '取货码', align: 'center' },
                {
                    field: 'code_status', width: 130, title: '使用情况', align: 'center', sort: true, templet: function (d) {
                        return d.code_status == 0 ? '待使用' : '已使用'
                    }
                },
                {
                    field: 'operate_machine', width: 210, title: '使用的售货机', align: 'center', templet: function (d) {
                        return d.info ? d.info : '-'
                    }
                },
                {
                    field: 'ship_info', width: 250, title: '出货情况', align: 'center', templet: function (d) {
                        if (d.ship_info.length == 0) {
                            return '-'
                        } else {
                            var str = '';
                            d.ship_info.forEach(item => {
                                str += `<div>${item.goods_Name}(${item.way}货道${item.ship_status == 0 ? '出货失败' : item.ship_status == 1 ? '出货成功' : '货道故障'})</div>`
                            });
                            return str
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
                    field: 'operate_time', width: 100, title: '退货状态', align: 'center', templet: function (d) {
                        return d.refund == 1 ? '已退货' : '未退货'
                    }
                },
            ]],
            data: [
            ],
            id: 'pickIn',
            loading: true,
            page: true,
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
    // 权限控制
    function permissions() {
        addFlag ? $('.addBtn').removeClass('hide') : $('.addBtn').addClass('hide');
        editFlag ? $('.listEdit').removeClass('hide') : $('.listEdit').addClass('hide')
    };
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
                console.log(obj)
                if (indexs == 0) {
                    obj.forEach(item => {
                        chooseMachine.push(item.value)
                    })
                    console.log(chooseMachine)
                } else if (indexs == 1) {
                    obj.forEach(item => {
                        chooseMachine.splice(chooseMachine.indexOf(item.value), 1);
                        console.log(chooseMachine.indexOf(item.value))
                    });
                    console.log(chooseMachine)
                }
                chooseMachine.length == 0 ? $('.machineFlag').text('未选择') : $('.machineFlag').text('已选择')
            }
        });
    };
    //   活动已选择售货机
    var chooseMachine = [];
    //   获取商户下的售货机
    var machineListArr = [];
    function getMachineList(uId) {
        loadingAjax('/user/getUserMachine', 'post', JSON.stringify({ UUId: uId }), sessionStorage.token).then(res => {
            var getList = res.data.unSelect.concat(res.data.select)
            getList = res.data.unSelect.concat(res.data.select);
            getList.forEach(item => {
                var transObj = {
                    value: item.machineId,
                    title: item.info ? item.info : '(此为未命名的新售货机)'
                };
                machineListArr.push(transObj)
            });
            console.log(machineListArr)
            transferFun(machineListArr, chooseMachine);
        }).catch(err => {
            layer.msg('获取售货机失败', { icon: 2 })
        })
    };
    var abcd = JSON.stringify({
        pageSize: 10,
        pageNum: 1,
        merchant_id: 93
    })
    // loadingAjax('/api/order/getCodeOrder', 'post', abcd, sessionStorage.token).then(res => {
    //     console.log(res)
    // });


})
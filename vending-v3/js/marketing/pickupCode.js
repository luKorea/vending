// import { loadAjax, showPopup } from '../../common/common';
import '../../MyCss/marketing/pickupCode.scss';
layui.use(['form', 'layer', 'table'], function () {
    var form = layui.form,
        layer = layui.layer,
        table = layui.table,
        activityTable = table.render({
            elem: '#tableactivity',
            method: 'post',
            url: '/api/activity/getActivityList',
            contentType: "application/json",
            headers: {
                token: sessionStorage.token
            },
            cols: [[
                { field: 'activity_name', width: 200, title: '活动名' },
                { field: 'code_count', width: 150, title: '取货码数量' },
                {
                    field: 'open', width: 150, title: '已兑换数量', templet: function (d) {
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
                    field: 'roleSign', width: 230, title: '开始时间', templet: function (d) {
                        if (d.start_time) {
                            var myDate = new Date(d.start_time);
                            var y = myDate.getFullYear();
                            var m = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
                            var d = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
                            var h = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
                            var min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
                            var s = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
                            return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
                        } else {
                            return '';
                        }
                    }
                },
                {
                    field: 'alias', width: 230, title: '结束时间', templet: function (d) {
                        if (d.end_time) {
                            var myDate = new Date(d.end_time);
                            var y = myDate.getFullYear();
                            var m = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
                            var d = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
                            var h = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
                            var min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
                            var s = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
                            return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
                        } else {
                            return '';
                        }
                    }
                },
                {
                    field: 'phone', width: 180, title: '活动状态', templet: function (d) {
                        var time = new Date().getTime();
                        return d.activity_status == 1 ? '已暂停' : d.activity_status == 2 ? '已取消' : time > d.end_time ? '已过期' : '活动正常'
                    }
                },
                { field: 'create_user', width: 190, title: '创建人' },
                {
                    field: 'addUser', width: 190, title: '创建时间', templet: function (d) {
                        if (d.create_time) {
                            var myDate = new Date(d.end_time);
                            var y = myDate.getFullYear();
                            var m = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
                            var d = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
                            var h = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
                            var min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
                            var s = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
                            return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
                        } else {
                            return '';
                        }
                    }
                },
                { field: 'operation', width: 350, title: '操作', toolbar: '#barDemo', fixed: 'right', right: 0, },
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

            }

        });
    // 时间范围选择
    // 获取当前时间

    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    $('.addActivity .cancel_btn').click(function(){
        popupHide('addActivity','addActivityBox')
    });
    $('.goodsCont .cancel_btn').click(function(){
        popupHide('goodsCont','goodsBox')
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
    var start_time=null,//活动开始时间
        end_time=null;//活动结束时间
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
                start_time=this.$input.eq(0).val();
                end_time=this.$input.eq(1).val();
            }
        });
        popupShow('addActivity', 'addActivityBox');
    });
    $('.goodsChooseBtn').click(function(){
        popupShow('goodsCont','goodsBox');
    })
    $('.machineChooseBtn').click(function(){
        popupShow('machineDetailsCont','machineDetailsBox');
    })
    // 售货机列表
    var machineAdvertising = null;
    var machineList = [];
    var currentMachine = [];
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
                { field: 'info', width: 200, title: '售货机信息' },
                { field: 'location', width: 300, title: '地址', },
                { field: 'merchantName', width: 300, title: '所属商户', },
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
                });
                // console.log(currentMachine)
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
            // skin: 'nob'
        });
    };
    machineAdvertisingFun();
    // 监听售货机复选框操作
    table.on('checkbox(machineDetailsList)', function (obj) {
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.data); //选中行的相关数据
        console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        if (obj.type == 'all') {
            var arr = [];
            if (obj.checked) {
                currentMachine.forEach(item=>{
                    if(!item.includes(machineList)){
                        machineList.push(item)
                    }
                })
                machineList = machineList.concat(currentMachine);
            } else {
                machineList.forEach((item, index) => {
                    if (!currentMachine.includes(item)) {
                        arr.push(item)
                    }
                });
                machineList = arr;
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
        if(machineList.length>0){
            $('.machineFlag').text('已选择')
        }else{
            $('.machineFlag').text('未选择')
        }
    });
    $('.machineDetailsCont .determineBtn').click(function(){
        if(machineList==0){
            layer.msg('请选择售货机',{icon:7});
            return ;
        };
        popupHide('machineDetailsCont','machineDetailsBox');
    })

    //   商品列表
    var goodsTableIns = null;
    var currenGoods = [];
    // 商品列表
    function goodsreload() {
        goodsTableIns = table.render({
            elem: '#goodsTable'
            , url: `/api/goods/findAll`
            , method: 'post',
            contentType: "application/json",
            headers: {
                token: sessionStorage.token,
            },
            cols: [[
                { type: 'checkbox', },
                { field: 'goods_images', width: 100, title: '图片', templet: "#imgtmp" },
                { field: 'goods_Name', width: 200, title: '商品名', color: '#409eff' },
                { field: `classifyName`, width: 160, title: '商品类目' },
                { field: 'goods_Core', width: 250, title: '商品编号', },
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
                condition: sessionStorage.machineID,
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
                // currenGoods = [];
                // res.data.forEach((item, index) => {
                //     currenGoods.push({
                //         goodsName: item.goods_Name,
                //         goodsId: item.goods_Id,
                //         const: 1,
                //         goodsImg: item.goods_images,
                //         goodsCode: item.goods_Core
                //     })
                // });
                $('.list-table .layui-table-header input[type="checkbox"]').prop('disabled', true);
                $('.list-table .layui-table-header .laytable-cell-checkbox>div').hide();
                form.render('checkbox');
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
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
                    goodsName: obj.data.goods_Name,
                    goodsId: obj.data.goods_Id,
                    const: 1,
                    goodsImg: obj.data.goods_images,
                    goodsCode: obj.data.goods_Core
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
        if(goodsList.length>0){
            $('.goodsFlag').text('已选择')
        }else{
            $('.goodsFlag').text('未选择')
        }
        
    });
    $('.goodsCont .determineBtn').click(function () {
        if (goodsList.length == 0) {
            layer.msg('请选择商品', { icon: 7 })
            return;
        }
        chooseFun(goodsList);
        popupShow('chooseGoods', 'chooseGoodsBox')
    })
    var addActivityObj = JSON.stringify({
        activity_name: '国庆中秋节',
        start_time: '2020-09-20 09:00:00',
        end_time: '2020-09-20 23:23:23',
        merchantId: Number(sessionStorage.machineID),
        machines: ['dec86581d6a73298'],
        goods: [
            {
                good_id: 120,
                good_count: 1
            }
        ],
        len: 12,
        type: 4,
        code_count:2
    });

    // loadAjax('/api/activity/newActivity', 'post', sessionStorage.token, addActivityObj).then(res => {
    //     console.log(res)
    // }).catch(err => {
    //     console.log(err)
    // })

    // 渲染已选择商品
    function chooseFun(goods) {
        console.log(9009);
        var goodsStr = '';
        goods.forEach((item, index) => {
            goodsStr += ` <li class="setMateraialList">
                            <div class="abbreviateImg">
                                <img src="${item.goodsImg}" alt="">
                            </div>
                            <div class="SetName">
                                <div>${item.goodsName}</div>
                            </div>
                            <div class="${item.goodsCode}">
                                <div>粤宝文化科技</div>
                            </div>
                            <div class="duration">
                                <div>
                                    <input type="number" inputIndex="${index}" value="${item.const}">
                                </div>
                            </div>
                            <div class="SetOperation">
                                <button class="layui-btn layui-btn-normal delBtn  btn del-btn" delIndex="${index}">
                                    <span>删除</span>
                                </button>
                            </div>
                        </li>`
        });
        $('.SetContList').html(goodsStr)
    };

    // 输入商品数量事件
    var reduction = 1;
    $('.SetContList').on('keyup', '.setMateraialList input', function () {
        var num = $(this).val(),
            re = /^\d*$/;
        if (!re.test(num)) {
            layer.msg('只能输入正整数', { icon: 7 });
            if(reduction){
                $(this).val(reduction);
                goodsList[$(this).attr('inputIndex')].const=$(this).val();
            }else{
                $(this).val(1);
                goodsList[$(this).attr('inputIndex')].const=$(this).val();
            }
            
        } else {
            reduction = $(this).val();
            console.log($(this).attr('inputIndex'));
            goodsList[$(this).attr('inputIndex')].const=$(this).val();
        }
    });
    // 已选商品删除
    $('.chooseGoods').on('click','.delBtn',function(){
        console.log($(this).attr('delIndex'))
        if(goodsList.length==1){
            layer.msg('不能全部删除',{icon:7});
            return ;
        }
        layer.confirm('确定删除？', function (index) {
            layer.close(index);
            goodsList.splice($(this).attr('delIndex'),1);
            chooseFun(goodsList);
        })
    })
    // 已选择商品确定
    $('.chooseGoods .determineBtn').click(function(){
        popupHide('goodsCont','goodsBox');
        popupHide('chooseGoods','chooseGoodsBox')
    });
    // 点击高级设置
    var flag=false;
    $('.moreList').click(function(){
        $('.seniorSet').slideToggle();
        flag=!flag;
        if(flag){
            $('.moreList img').addClass('actives')
        }else{
            $('.moreList img').removeClass('actives')
        }
    });
    // 选择单个清除取货码时间;
    var cleanTime=null;
    $('.J-datepicker').datePicker({
        hasShortcut: true,
        min: '',
        max: '',
        hide: function() {
            console.info(this.$input.eq(0).val());
            cleanTime=this.$input.eq(0).val()
        }
    });
    // 清除无效取货码
    $('.cleanBtn').click(function(){
      if(!cleanTime){
          layer.msg('请选择需要清除无效取货码的时间节点',{icon:7});
          return;
      }  
      layer.confirm(`确定清除${cleanTime}前无效的取货码？`, function (index) {
        layer.close(index);
        var tiemObj=JSON.stringify({
            time:cleanTime
        })
        loadingAjax('/api/activity/resetGoodCode','post',tiemObj,sessionStorage.token,'mask','','',layer).then(res=>{
              layer.msg(res.message,{icon:1})
          }).catch(err=>{
              layer.msg(err.message,{icon:2})
          })
      })
    
    });
    var codecountNum=1;
    $('.addActivityBody input[name="codeConst"]').keyup(function(){
        var num = $(this).val(),
        re = /^\d*$/;
    if (!re.test(num)) {
        layer.msg('只能输入正整数', { icon: 7 });
        if(codecountNum){
            $(this).val(codecountNum);
        }else{
            $(this).val(1);
        }
    } else {
        codecountNum = $(this).val();
    }
    });
    var codeLen=12;
    $('.addActivityBody input[name="codeLen"]').keyup(function(){
        var num = $(this).val(),
        re = /^\d*$/;
    if (!re.test(num)) {
        layer.msg('只能输入正整数', { icon: 7 });
        if(codeLen){
            $(this).val(codeLen);
        }else{
            $(this).val(12);
        }
    } else {
        codeLen = $(this).val();
    }
    });
    $('.addActivityBody input[name="codeLen"]').blur(function(){
        if(!($(this).val()>=8&&$(this).val()<=30)){
            layer.msg('取货码长度范围为8位到30位',{icon:7});
            $(this).val(12);
        }
    });

    // 新增活动提交
    $('.addFooter .submitBtn').click(function(){
        if(!(start_time&&end_time)){
            layer.msg('请选择开始时间与结束时间',{icon:7});
            return ;
        }
        console.log(start_time)
        if(!($('.addActivityBody input[name="activityName"]').val()&&$('.addActivityBody input[name="activityName"]').val()>0)){
            layer.msg('活动名不能为空且取货码数量必须大于0',{icon:7});
            return ;
        }
        if(machineList.length==0){
            layer.msg('请选择售货机',{icon:7})
            return ;
        }
        if(goodsList.length==0){
            layer.msg('请选择商品',{icon:7})
            return ;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var addOb=JSON.stringify({
            activity_name:$('.addActivityBody input[name="activityName"]').val(),
            start_time,
            end_time,
            code_count:$('.addActivityBody input[name="codeConst"]').val(),
            merchantId:sessionStorage.machineID,
            machines:machineList,
            goods:goodsList,
            type:$('.complex input[name="complexNum"]').val(),
            len:$('.seniorSet input[name="codeLen"]').val()
        })
        loadingAjax('/api/activity/newActivity', 'post',addOb,sessionStorage.token,'mask','addActivity','addActivityBox').then(res=>{
            layer.msg(res.message,{icon:1});
            activityTable.reload({
                where:{}
            })
        }).catch(err=>{
            layer.msg(err.message,{icon:1});
        })
    });


    // 监听操作部分
    table.on('tool(tableactivity)', function (obj) {
        console.log(obj)
        var stamp=new Date().getTime();
        if(obj.event=='stop'){
            if(stamp>obj.data.end_time){
                layer.msg('该活动已过期，不可进行操作',{icon:7});
                return;
            }
        }else if(obj.event=='cancel'){
            if(stamp>obj.data.end_time){
                layer.msg('该活动已过期，不可进行取消操作',{icon:7});
                return;
            }
            layer.confirm(obj.data.activity_status==0?'确定暂停？':'确定开始？', function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
            })
            layer.confirm(`确定取活动(取消后活动将停止并且取货码失效)`, function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                var cancelObj=JSON.stringify({
                    activity_id:obj.data.id,
                    activity_status:2
                })
                loadingAjax('/api/activity/operateActivity','post',cancelObj,sessionStorage.token,'mask','','',layer).then(res=>{
                    layer.msg(res.message,{icon:1});
                    activityTable.reload({
                        where:{}
                    })
                }).catch(err=>{
                    layer.msg(err.message,{icon:2})
                })
            })
        }
    })
})

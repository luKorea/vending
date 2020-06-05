layui.use(['table', 'form'], function () {
    // 收起
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.on-left').show()
    });
    $('.on-left').click(function () {
        $('.left-mian').show();
        $('.on-left').hide()
    })
    var table = layui.table,
        form = layui.form,
        token = sessionStorage.token,
        machineList = table.render({
            elem: '#machineTable',
            url: `/api/machine/getMachineList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'info', width: 200, title: '终端信息',align:'center' },
                { field: 'location', width: 150, title: '地址' ,align:'center'},
                {
                    field: 'CreationTime', width: 180, title: '缺货状态', sort: true,align:'center', templet: function (d) {
                        return `<div><span class="${d.stockStatus == 0 ?'tableStateCellTrue':'tableStateCellFalse'}">${d.stockStatus == 0 ? '正常' : d.stockStatus == 1 ? '一般' : '严重'}</span></div>` 
                    }
                },
                {
                    field: 'onlineStatus', width: 180, title: '在线状态', sort: true,align:'center', templet: function (d) {
                        return `<div><span class="${d.onlineStatus != 0?'tableStateCellTrue':'tableStateCellFalse'}">${d.onlineStatus == 0 ? '离线' : '在线'}</span></div>`                       
                    }
                },
                {
                    field: 'openStatus', width: 150, title: '启动状态', sort: true,align:'center', templet: function (d) {
                        return  `<div><span class="${d.openStatus != 0?'tableStateCellTrue':'tableStateCellFalse'}">${d.openStatus == 0 ? '不启动' : '启动'}</span></div>`                   
                    }
                },
                {
                    field: 'actionStatus', width: 150, title: '是否激活', sort: true,align:'center', templet: function (d) {
                        return  `<div><span class="${d.actionStatus != 0?'tableStateCellTrue':'tableStateCellFalse'}">${d.actionStatus == 0 ? '未激活' : '已激活'}</span></div>`                     
                    }
                },
                {
                    field: 'wayStatus', width: 135, title: '货道状态',align:'center', templet: function (d) {
                        return  `<div><span class="${d.wayStatus != 0?'tableStateCellTrue':'tableStateCellFalse'}">${d.wayStatus == 0 ? '不正常' : '正常'}</span></div>`                      
                    }
                },
                {
                    field: 'permissions', width: 135, title: '营业状态', sort: true,align:'center', templet: function (d) {
                        return `<div><span class="${d.businessStatus != 0?'tableStateCellTrue':'tableStateCellFalse'}">${d.businessStatus == 0 ? '不营业' : '营业'}</span></div>`                     
                    }
                },
                { field: 'dealTime', width: 150, title: '最后交易时间', sort: true,align:'center' },
                { field: 'userNum', width: 135, title: '用户账号' ,align:'center'},
                { field: 'actionCode', width: 135, title: '激活码' ,align:'center'},
                { field: 'appVersion', width: 135, title: '软件版本' ,align:'center'},
                { field: 'controllerVersion', width: 135, title: '控制器版本', sort: true ,align:'center'},
                { field: 'connectTime', width: 150, title: '联机时间', sort: true ,align:'center'},
                { field: 'actionTime', width: 150, title: '激活时间', sort: true ,align:'center'},
                { field: 'description', width: 200, title: '描述' ,align:'center'},
                { field: 'operation', fixed: 'right' , right: 0, width: 200, title: '操作', toolbar: '#barDemo',align:'center' },
            ]]
            , id: 'tableId'
            , page: true
            , loading: true
            , limits: [10, 20, 50]
            ,
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
            response: {
                statusCode: 200 //规定成功的状态码，默认：0
            },
            done: function (res) {
                if (res.code == 403) {
                    // window.history.go(-1)
                    window.parent.location.href = "../login/login.html";
                }
            }
        });
    // 查询
    $('.machineListKeyBtn').click(function () {
        var machineData = form.val("machineData");
        console.log(machineData);
        machineList.reload({
            where:{
                condition:Number(machineData.onlineStatus) ,
                conditionTwo:Number(machineData.actionStatus) ,
                conditionThree:Number(machineData.permissions),
                conditionFour:Number(machineData.openStatus) ,
                conditionFive: Number(machineData.CreationTime),
                conditionSix:machineData.machineKeyText
            }
        })
    });
    // 设置tab切换
    $('.setNav li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        let that = $(this);
        console.log(that.offset().left)
        
        $('.tabLine').animate({
            left:that.index()!=0?(that.offset().left) + 'px':(that.offset().left-20) + 'px',
            width:(that).width()+'px'
          }, 500);
    });
    // 监听售货机列表操作
    var machineSetData=null
    table.on('tool(machineTable)', function (obj) {
        console.log(obj);
        machineSetData=obj.data;
        if(obj.event=='set'){
            $('.setUpCont').show();
            $('.setNav li').eq(0).addClass('active');
            $('.setCoreListOne').show().siblings().hide();
            console.log(form.val("setDataVal"));
            form.val("setDataVal", {
                'info':machineSetData.info,
                'appVersion':machineSetData.appVersion,
                'longitude':machineSetData.longitude,
                'latitude':machineSetData.latitude,
                'location':machineSetData.location
            })
        }
    });
    // 关闭设置
    $('.setUpCont .close').click(function(){
        $('.setUpCont').hide();
    });
    $.ajax({
        type:'post',
        url:'/api/machine/activeMachine',
        headers: {
            "Content-Type": "application/json",
            token,
        },
        data:JSON.stringify({
            machineId:'test',
            actionStatus:'1',
        }),
        success:function(res){
            console.log(res)
        }
    })

});
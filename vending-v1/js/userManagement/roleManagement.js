layui.use(['table', 'form', 'layer', 'tree', 'util'], function () {
    var form = layui.form;
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer,
        layer = layui.layer,
        util = layui.util,
        tree = layui.tree
    var token = sessionStorage.token;
    var tableIns = table.render({
        elem: '#tableTest',
        url: `/api/role/findRole`,
        method: 'post',
        contentType: "application/json",
        // , method: 'get',
        // ,contentType: "application/json",
        headers: {
            token,
        },
        cols: [[
            { field: 'name', width: 180, title: '用户名' },
            { field: 'addU', width: 150, title: '添加人' },
            { field: 'phone', width: 200, title: '添加时间' },
            { field: '1', width: 180, title: '最后修改人', },
            { field: 'addTime', width: 200, title: '最后修改时间', sort: true },
            { field: 'operation', position: 'absolute', right: 0, width: 200, title: '操作', toolbar: '#barDemo' },
        ]]
        , id: 'tableId'
        , page: true
        , loading: true
        // ,method:'post'
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
                window.history.go(-1)
            }
        }
    });
    var uuID = null;
    var indexFlag = null;
    //监听工具条
    table.on('tool(test)', function (obj) {
        var data = obj.data;
        console.log(data)  
        if (obj.event === 'operation') {

        } else if (obj.event === 'delete') {
            layer.confirm('确定删除？', function (index) {
                $.ajax({
                    type:'post',
                    url:'/api/role/deleteRole',
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    data:JSON.stringify({
                        id:data.id
                    }),
                    success:function(res){
                        layer.close(index);
                        console.log(res)
                        if(res.code==200){
                            layer.msg(res.message, { icon: 1 });
                            tableIns.reload({
                                where:{}
                            });
                        }else if(res.code==403){
                            window.history.go(-1)
                        }else{
                            layer.msg(res.message, { icon: 2 });
                        }
                    }
                })
            })
        }
    });

    $('.addBtn').click(function () {
        popupShow('MemberOperation', 'MemberContent');
    })
    $('.cancel_btn').click(function () {
        popupHide('MemberOperation', 'MemberContent');
    })
    // 添加角色
    $('.submitBtn').click(function () {
        if ($('.addInput input[name="userName"]').val()) {
            $.ajax({
                type: 'post',
                url:'/api/role/saveRole',
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                data:JSON.stringify({
                    name:$('.addInput input[name="userName"]').val()
                }),
                success:function(res){
                    popupHide('MemberOperation', 'MemberContent');
                    console.log(res)
                    if(res.code==200){
                        layer.msg(res.message, { icon: 1 });
                        tableIns.reload({
                            where:{}
                        });
                    }else if(res.code==403){
                        window.history.go(-1)
                    }else{
                        layer.msg(res.message, { icon: 2 });
                    }
                }
            })
        } else {
            layer.msg('带*为必填', { icon: 7 });
            return;
        }
    });



    // 监听终端权限
    //     form.on('checkbox(permissions)', function(data){
    //       console.log(data.elem.checked); //是否被选中，true或者false
    //       console.log(data.value); //复选框value值，也可以通过data.elem.value得到
    //   //     form.val("information", {
    //   //       "aaacc":true
    //   // });
    //   // var data1 = form.val("information");
    //   // console.log(data1)
    //       if(data.elem.checked){
    //         form.val("information",{
    //           "Goods":true,
    //           "Aisle":true,
    //           "Advertising":true,
    //           "Wifi":true
    //         });
    //         $('.checkCont .checkboxList').prop('disabled',true);
    //         form.render();
    //       }else{
    //         form.val("information",{
    //           "Goods":false,
    //           "Aisle":false,
    //           "Advertising":false,
    //           "Wifi":false
    //         });
    //         // $('.checkCont .checkboxList').attr('disabled')=false;
    //         $('.checkCont .checkboxList').prop("disabled",'');
    //         form.render();
    //       }
    //     }); 
    $.ajax({
        type:'post',
        url:'/api/role/findPermission',
        headers: {
            "Content-Type": "application/json",
            token,
          },
        data:JSON.stringify({
            pageNum:'1',
            pageSize:'10'
        }),
        success:function(res){
            console.log(res)
        }
    })

    function permissionsList(list,element){
        var ListData='';
        list.forEach((index,ele)=>{
            ListData+=`<div>
                            <input type="checkbox" lay-filter="permissions" name="${ele.id}" title="${ele.name}"
                                lay-skin="primary" value="${ele.id}">
                        </div>`
        });
        $(`.${element}`).empty();
        $(`.${element}`).html(ListData);
    }
});
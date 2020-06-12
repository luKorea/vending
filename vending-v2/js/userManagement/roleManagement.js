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
        headers: {
            token,
        },
        cols: [[
            { field: 'name', width: 180, title: '用户名' },
            { field: 'addUser', width: 150, title: '添加人' },
            { field: 'addTime', width: 200, title: '添加时间' },
            { field: 'lastUser', width: 180, title: '最后修改人', },
            { field: 'lastTime', width: 200, title: '最后修改时间', sort: true },
            { field: 'operation', position: 'absolute', right: 0, width: 200, title: '操作', toolbar: '#barDemo' },
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
                window.parent.location.href = "../login/login.html";
            }
        }
    });


     // 关闭弹窗
     $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    var uuID = null;
    var indexFlag = null;
    //权限列表
    var permissionsDataList = null;
    //监听工具条
    var objData=null;
    table.on('tool(test)', function (obj) {
         objData = obj.data;
        $('.editInput input[name="userName"]').val(objData.name)
        if (obj.event === 'operation') {
            popupShow('editRold', 'editBox');
            if(!permissionsDataList){
                $.ajax({
                    type: 'post',
                    url: '/api/role/findPermission',
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    async:false,
                    data: JSON.stringify({
                        pageNum: '1',
                        pageSize: '1000'
                    }),
                    success: function (res) {
                        if (res.code == 200) {
                            permissionsDataList = res.data.list;
                        }else{
                            return ;
                        }
                    }
                });
            };
            permissionsList(permissionsDataList,'permissionsData',objData);
           
        } else if (obj.event === 'delete') {
            layer.confirm('确定删除？', function (index) {
                $.ajax({
                    type: 'post',
                    url: '/api/role/deleteRole',
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    data: JSON.stringify({
                        id: objData.id
                    }),
                    success: function (res) {
                        layer.close(index);
                        console.log(res)
                        if (res.code == 200) {
                            layer.msg(res.message, { icon: 1 });
                            tableIns.reload({
                                where: {}
                            });
                        } else if (res.code == 403) {
                           window.parent.location.href = "../login/login.html";
                        } else {
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
                url: '/api/role/saveRole',
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                data: JSON.stringify({
                    name: $('.addInput input[name="userName"]').val()
                }),
                success: function (res) {
                    popupHide('MemberOperation', 'MemberContent');
                    console.log(res)
                    if (res.code == 200) {
                        layer.msg(res.message, { icon: 1 });
                        $('.addInput input[name="userName"]').val('')
                        tableIns.reload({
                            where: {}
                        });
                    } else if (res.code == 403) {
                        window.history.go(-1)
                    } else {
                        layer.msg(res.message, { icon: 2 });
                    }
                }
            })
        } else {
            layer.msg('带*为必填', { icon: 7 });
            return;
        }
    });


    // 修改角色
    $('.edittBtn').click(function(){
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon')
        var permissionsArray=[];
        if($('.editInput input[name="userName"]').val()){
            var datalll=form.val("editInformation");
            for(let i in datalll){
                permissionsDataList.forEach((item,index)=>{
                    if(item.id==datalll[i]){
                        permissionsArray.push(item)
                    }
                })
            };
            setTimeout(()=>{
                $.ajax({
                    type:'post',
                    url: '/api/role/updateRole',
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    data:JSON.stringify({
                        id:objData.id,
                        name:$('.editInput input[name="userName"]').val(),
                        permissions:permissionsArray
                    }),
                    success:function(res){
                        $('.mask').fadeOut();
                        $('.maskSpan').removeClass('maskIcon');
                        popupHide('editRold', 'editBox');
                        if(res.code==200){
                            layer.msg(res.message, { icon: 1 });
                            tableIns.reload({
                                where: {
                                }
                            }) 
                        }else if(res.code==403){
                            window.parent.location.href = "login.html";
                        }else{
                            layer.msg(res.message, { icon: 2 });
                        }
                    }
                })
            },2000)
            
        }else{
            layer.msg('带*为必填', { icon: 7 });
        }
    });
    // 角色取消
    $('.editCancelbtn').click(function(){
        popupHide('editRold', 'editBox');
    })

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
    // 角色权限函数
    function permissionsList(list, element,TrueData) {
        var ListData = '';
        list.forEach((ele, index) => {
            ListData += `<div>
                            <input type="checkbox" lay-filter="permissions" name="${ele.id}" title="${ele.name}"
                                lay-skin="primary" checkbox value="${ele.id}" >
                        </div>`
        });
        $(`.${element}`).empty();
        $(`.${element}`).html(ListData);
        TrueData.permissions.forEach((item,index)=>{
            for(var i=0;i<$(`.${element} input`).length;i++){
                if(item.id==list[i].id){
                    $(`.${element} input`).eq(i).prop('checked',true)  
                }
            }
        })
        form.render('checkbox');
    }

    
});
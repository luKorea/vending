import '../../MyCss/roleManagement/roleManagement.scss';
import {
    popupShow,
    popupHide,
    fixedFun,
    loadAjax
} from '../../common/common.js';

layui.use(['table', 'form', 'layer', 'tree', 'util'], function () {
    let form = layui.form,
        $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        token = sessionStorage.token,
        tableIns = table.render({
            elem: '#tableTest',
            url: `${Vapi}/role/findAll`,
            method: 'GET',
            headers: { token },
            height: '600',
            cols: [[
                { field: 'roleName', title: '角色名', fixed: 'left', align: 'center' },
                { field: 'remark', title: '备注', align: 'center' },
                {
                    field: 'addUser', title: '创建人', align: 'center', templet: function (e) {
                        return e.addUser ? e.addUser.username : ''
                    }
                },
                { field: 'addTime', title: '创建时间', align: 'center' },
                {
                    field: 'updateUser', width: 150, title: '最后修改人', align: 'center', templet: function (e) {
                        return e.updateUser ? e.updateUser.username : ''
                    }
                },
                { field: 'updateTime', width: 200, title: '最后修改时间', align: 'center' },
                {
                    field: 'operation',
                    position: 'absolute',
                    align: 'center',
                    right: 0,
                    width: 200,
                    title: '操作',
                    toolbar: '#barDemo'
                },
            ]]
            , id: 'tableId'
            , page: true
            , loading: true
            , limits: [10, 20, 50]
            , even: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {},
            parseData: function (res) {
                if (res.code === 200) {
                    return {
                        "code": res.code,
                        "msg": res.message,
                        "count": res.data.total,
                        "data": res.data.list
                    };
                } else {
                    return {
                        "code": res.code,
                        "msg": res.message
                    }
                }
            },
            response: { statusCode: 200 },
            done: function (res) {
                if (res.code === 403) {
                    layer.msg('登录过期,请重新登录', { icon: 2 })
                    setTimeout(__ => {
                        window.parent.location.href = "login.html";
                    }, 1500)
                }
                fixedFun();
            }
        });


    let roleData = JSON.parse(sessionStorage.roleData),
        permissionsObjFlag = permissionsVal1(permissionData, roleData);

    function permissions() {
        permissionsObjFlag[4] ? removeClass('.addBtn') : addClass('.addBtn');
        permissionsObjFlag[19] ? removeClass('.ListOperation .edit') : addClass('.ListOperation .edit');
        permissionsObjFlag[20] ? removeClass('.ListOperation .del') : addClass('.ListOperation .del');
        permissionsObjFlag[21] ? removeClass('.list-table') : (
            addClass('.list-table'), removeClass('.role-text')
        );
    }

    permissions();


    //　TODO　添加, 编辑节点
    let addRoleNode = $('.addInput input[name="roleName"]'),
        addRemarkNode = $('.addInput textarea[name="remark"]'),
        editRoleNode = $('.editInput input[name="roleName"]'),
        editRemarkNode = $('.editInput textarea[name="remark"]');
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    //权限列表
    let permissionsDataList = null,
        userGetRole = null, // 用户拥有的权限
        permissions1 = [],// 商品列表权限
        permissions2 = [], // 订单列表权限
        permissions3 = []; // 通用权限
    // permissions4 = [],//商品素材权限
    // permissions5 = [],//售货机权限
    // permissions6 = [],//广告权限
    // permissions10 = [],//通用模块
    // permissions11 = [],//订单与账目权限
    // permissions13 = [];//营销中心
    //监听工具条
    let objData = null,
        operationFlag = null;
    table.on('tool(test)', function (obj) {
        objData = obj.data;
        event.stopPropagation();
        editRoleNode.val(objData.roleName);
        editRemarkNode.val(objData.remark);
        if (obj.event === 'operation') {
            // if (operationFlag == obj.data.id) {
            //     $('.ListOperation').fadeOut();
            //     operationFlag = null;
            //     return;
            // }
            operationFlag = obj.data.id;
            $('.ListOperation').fadeIn();
            $('.ListOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        }
    });
    // 添加角色
    $('.submitBtn').click(function () {
        if (addRoleNode.val()) {
            $.ajax({
                type: 'post',
                url: `${Vapi}/role/addRole`,
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                data: JSON.stringify({
                    roleName: addRoleNode.val(),
                    remark: addRemarkNode.val()
                }),
                success: function (res) {
                    popupHide('.MemberOperation', '.MemberContent');
                    if (res.code === 200) {
                        layer.msg(res.message, { icon: 1 });
                        addRoleNode.val('');
                        addRemarkNode.val('');
                        tableIns.reload({
                            where: {}
                        });
                    } else if (res.code == 403) {
                        window.history.go(-1)
                    } else {
                        layer.msg(res.message, { icon: 2 });
                    }
                },
                error: function (err) {
                    layer.msg('服务器请求超时', { icon: 2 })
                }
            })
        } else {
            layer.msg('带*为必填', { icon: 7 });
            return;
        }
    });

    // 获取所有权限列表
    function getAllPermission() {
        if (!permissionsDataList) {
            $.ajax({
                type: 'GET',
                url: `${Vapi}/role/findControl`,
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                async: false,
                success: function (res) {
                    if (res.code === 200) {
                        permissionsDataList = res.data;
                        res.data.forEach(item => {
                            permissions3.push(item);
                        })
                    } else {
                        return;
                    }
                }
            });
        }
        ;
    }

    getAllPermission();

    // 获取用户用户的权限
    function socketQuery(id, type) {
        loadAjax(`/role/findByRId?id=${id}`, 'get', token).then(res => {
            userGetRole = res.data;
            permissionsList(permissions3, 'permissionsGeneral', userGetRole);
            if (type) {
                socketPush(userPushId);
            }
        }).catch(err => {
            console.log(err)
        })
    }

    // 角色权限函数
    function permissionsList(list, element, userGetPermission) {
        let ListData = `<div>
        <input type="checkbox" lay-filter="permissionsAll" name="${element}" title="全选"
            lay-skin="primary"  value="" >
         </div>`;
        list.forEach((ele, index) => {
            ListData += `<div>
                            <input type="checkbox" lay-filter="permissions" name="${ele.controlId}" 
                            title="${ele.controlName}"
                                lay-skin="primary"  value="${ele.controlId}" >
                        </div>`
        });
        let ele = $(`.${element}`);
        ele.empty();
        ele.html(ListData);
        userGetPermission.forEach((item, index) => {
            for (var i = 1; i < $(`.${element} input`).length; i++) {
                if (item.controlId == list[i - 1].controlId) {
                    $(`.${element} input`).eq(i).prop('checked', true)
                }
            }
            ;
        })
        form.render('checkbox');
    }

    // 用户点击编辑后获取权限列表
    $('.ListOperation .edit').click(function () {
        popupShow('.editRold', '.editBox');
        $('.permissionsContList').show();
        socketQuery(objData.roleId);
    });
    // 修改角色以及角色权限
    $('.edittBtn').click(function () {
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        // 存储用户选择的权限
        let permissionsArray = [];
        if (editRoleNode.val()) {
            let userSelectRole = form.val("editInformation");
            for (let i in userSelectRole) {
                permissionsDataList.forEach((item, index) => {
                    if (String(item.controlId) === userSelectRole[i]) {
                        permissionsArray.push(item.controlId);
                    }
                })
            }
            $.ajax({
                type: 'post',
                url: `${Vapi}/role/updateRole`,
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                data: JSON.stringify({
                    roleId: objData.roleId,
                    roleName: editRoleNode.val(),
                    remark: editRemarkNode.val(),
                    controlList: permissionsArray
                }),
                success: function (res) {
                    $('.mask').fadeOut();
                    $('.maskSpan').removeClass('maskIcon');
                    popupHide('.editRold', '.editBox');
                    if (res.code == 200) {
                        layer.msg(res.message, { icon: 1 });
                        //layer.close(index);
                        // layer.open({
                        //     content: "用户权限已更新，请重新登陆",
                        //     btn: ['确定'],
                        //     yes(index) {
                        //         layer.close(index);
                        //        // sessionStorage.clear();
                        //         window.parent.location.href = "login.html";
                        //     },
                        //     cancel() {
                        //         return false
                        //     }
                        // });
                        tableIns.reload({
                            where: {}
                        })
                    } else if (res.code === 403) {
                        window.parent.location.href = "login.html";
                    } else {
                        layer.msg(res.message, { icon: 2 });
                    }
                },
                error: function (err) {
                    layer.msg('服务器请求超时', { icon: 2 })
                }
            })


        } else {
            layer.msg('带*为必填', { icon: 7 });
        }
    });
    // 删除
    $('.ListOperation .del').click(function () {
        layer.confirm('确定删除？', function (index) {
            $.ajax({
                type: 'get',
                url: `${Vapi}/role/deRoleByUId?roleId=${objData.roleId}`,
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                success: function (res) {
                    layer.close(index);
                    if (res.code == 200) {
                        socketPush(userPushId)
                        layer.msg(res.message, { icon: 1 });
                        tableIns.reload({
                            where: {}
                        });

                    } else if (res.code == 403) {
                        window.parent.location.href = "login.html";
                    } else {
                        layer.msg(res.message, { icon: 2 });
                    }
                },
                error: function (err) {
                    layer.msg('服务器请求超时', { icon: 2 });
                }
            })
        })
    })

    $('.addBtn').click(function () {
        popupShow('.MemberOperation', '.MemberContent');
    })
    $('.cancel_btn').click(function () {
        popupHide('.MemberOperation', '.MemberContent');
    })
    // 角色取消
    $('.editCancelbtn').click(function () {
        popupHide('.editRold', '.editBox');
    })

    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });
    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode === 116) {
            f5Fun()
        }
    });
    var userPushId = [];

    function socketPush(userData) {
        userData.forEach((item, index) => {
            var socketQuery = JSON.stringify({
                uid: item,
                msg: '用户角色权限发生变更,请重新登录！',
                tag: 1
            })
            loadingAjax('/pushWebMsg', 'post', socketQuery, sessionStorage.token).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        })
    }

    // 查询
    $('.queryBtnClick').click(function () {
        tableIns.reload({
            where: {
                roleName: $('.KyeText').val()
            }
        })
    });
    // 全选
    form.on('checkbox(permissionsAll)', function (data) {
        var ele = $(data.elem).attr('name');
        if (!data.value) {
            if (data.elem.checked) {
                $(`.${ele} input`).prop('checked', true)
            } else {
                $(`.${ele} input`).prop('checked', false)
            }
            form.render('checkbox');
        }
    });
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
});

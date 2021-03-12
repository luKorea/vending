import '../../MyCss/roleManagement/roleManagement.scss';
import {
    ajaxFun,
    popupShow,
    popupHide,
    dataLoading,
    closeData,
    wholeNum,
    numFormat2,
    mulCaluter,
    fixedFun,
    timeStampM
} from '../../common/common.js';

layui.use(['table', 'form', 'layer', 'tree', 'util'], function () {
    let form = layui.form,
        $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        util = layui.util,
        tree = layui.tree,
        token = sessionStorage.token,
        tableIns = table.render({
            elem: '#tableTest',
            url: `${Vapi}/role/findAll`,
            method: 'GET',
            // contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {field: 'roleName', width: 180, title: '角色名', align: 'center'},
                {field: 'remark', width: 200, title: '备注', align: 'center'},
                {field: 'addUser', width: 150, title: '添加人', align: 'center'},
                {field: 'addTime', width: 200, title: '添加时间', align: 'center'},
                {field: 'updateUser', width: 180, title: '最后修改人', align: 'center',},
                {field: 'updateTime', width: 200, title: '最后修改时间', align: 'center'},
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
                if (res.code == 200) {
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
            response: {
                statusCode: 200 //规定成功的状态码，默认：0
            },
            done: function (res) {
                if (res.code == 403) {
                    layer.msg('登录过期,请重新登录', {icon: 2})
                    setTimeout(__ => {
                        window.parent.location.href = "login.html";
                    }, 1500)
                }
                fixedFun();
            }
        });
    //　TODO　添加, 编辑节点
    let addRoleNode = $('.addInput input[name="roleName"]'),
        addRemarkNode = $('.addInput input[name="remark"]'),
        editRoleNode = $('.editInput input[name="roleName"]'),
        editRemarkNode = $('.editInput input[name="remark"]');
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    //权限列表
    let permissionsDataList = null,
        permissions1 = [],//广告素材
        permissions2 = [],//商品分类素材
        permissions3 = [],//商品管理权限
        permissions4 = [],//商品素材权限
        permissions5 = [],//售货机权限
        permissions6 = [],//广告权限
        permissions10 = [],//通用模块
        permissions11 = [],//订单与账目权限
        permissions13 = [];//营销中心
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
                    console.log(res)
                    if (res.code === 200) {
                        layer.msg(res.message, {icon: 1});
                        addRoleNode.val('');
                        addRemarkNode.val('');
                        tableIns.reload({
                            where: {}
                        });
                    } else if (res.code == 403) {
                        window.history.go(-1)
                    } else {
                        layer.msg(res.message, {icon: 2});
                    }
                },
                error: function (err) {
                    layer.msg('服务器请求超时', {icon: 2})
                }
            })
        } else {
            layer.msg('带*为必填', {icon: 7});
            return;
        }
    });
    // 编辑
    $('.ListOperation .edit').click(function () {
        popupShow('.editRold', '.editBox');
        if (objData.id == '100001') {
            $('.permissionsContList').hide();
            return;
        } else {
            $('.permissionsContList').show();
        }
        if (!permissionsDataList) {
            $.ajax({
                type: 'post',
                url: `${Vapi}/role/findPermission`,
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                async: false,
                data: JSON.stringify({
                    pageNum: '1',
                    pageSize: '1000'
                }),
                success: function (res) {
                    if (res.code == 200) {
                        permissionsDataList = res.data.list.filter((item, index) => {
                            return (item.classify != 6) && (item.classify != 8) && (item.classify != 9) ? item : ''
                        });
                        res.data.list.forEach((item, index) => {
                            switch (item.classify) {
                                case 1:
                                    permissions1.push(item)
                                    break;
                                case 2:
                                    permissions2.push(item)
                                    break;
                                case 3:
                                    permissions3.push(item)
                                    break;
                                case 4:
                                    permissions4.push(item)
                                    break;
                                case 5:
                                    permissions5.push(item)
                                    break;
                                case 7:
                                    permissions6.push(item)
                                    break;
                                case 10:
                                    permissions10.push(item)
                                    break;
                                case 11:
                                    permissions11.push(item)
                                    break;
                                case 13:
                                    permissions13.push(item)
                                // default:
                                //     console.log(index)
                            }
                        })
                    } else {
                        return;
                    }
                }
            });
        }
        ;
        permissionsList(permissions1, 'permissionsASF', objData);
        permissionsList(permissions2, 'permissionsGClass', objData);
        permissionsList(permissions3, 'permissionsGoods', objData);
        permissionsList(permissions4, 'permissionsGAF', objData);
        permissionsList(permissions5, 'permissionsMachine', objData);
        permissionsList(permissions6, 'permissionsASR', objData);
        permissionsList(permissions10, 'permissionsGeneral', objData);
        permissionsList(permissions11, 'permissionsOrder', objData);
        permissionsList(permissions13, 'permissionsMarketing', objData);
        // permissionsList(permissionsDataList, 'permissionsAS', objData);
    });

    // 修改角色
    $('.edittBtn').click(function () {
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon')
        var permissionsArray = [];
        if (editRoleNode.val()) {
            var datalll = form.val("editInformation");
            console.log(datalll)
            for (let i in datalll) {
                permissionsDataList.forEach((item, index) => {
                    if (item.id == datalll[i]) {
                        permissionsArray.push(item)
                    }
                })
            }
            ;
            $.ajax({
                type: 'post',
                url: `${Vapi}/role/updateRole`,
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                data: JSON.stringify({
                    id: objData.id,
                    roleName: editRoleNode.val(),
                    remark: editRemarkNode.val(),
                    permissions: permissionsArray
                }),
                success: function (res) {
                    $('.mask').fadeOut();
                    $('.maskSpan').removeClass('maskIcon');
                    popupHide('.editRold', '.editBox');
                    if (res.code == 200) {
                        layer.msg(res.message, {icon: 1});
                        tableIns.reload({
                            where: {}
                        })
                        if (objData.id != '100001') {
                            socketQuery(objData.id, 'true');
                        }
                    } else if (res.code == 403) {
                        window.parent.location.href = "login.html";
                    } else {
                        layer.msg(res.message, {icon: 2});
                    }
                },
                error: function (err) {
                    layer.msg('服务器请求超时', {icon: 2})
                }
            })


        } else {
            layer.msg('带*为必填', {icon: 7});
        }
    });
    // 删除
    $('.ListOperation .del').click(function () {
        socketQuery(objData.id)
        layer.confirm('确定删除？', function (index) {
            $.ajax({
                type: 'post',
                url: `${Vapi}/role/deleteRole`,
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                data: JSON.stringify({
                    id: objData.id
                }),
                success: function (res) {
                    layer.close(index);
                    if (res.code == 200) {
                        socketPush(userPushId)
                        layer.msg(res.message, {icon: 1});
                        tableIns.reload({
                            where: {}
                        });

                    } else if (res.code == 403) {
                        window.parent.location.href = "login.html";
                    } else {
                        layer.msg(res.message, {icon: 2});
                    }
                },
                error: function (err) {
                    layer.msg('服务器请求超时', {icon: 2});
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

    // 角色权限函数
    function permissionsList(list, element, TrueData) {
        var ListData = `<div>
        <input type="checkbox" lay-filter="permissionsAll" name="${element}" title="全选"
            lay-skin="primary"  value="" >
         </div>`;
        // var ListData ='';
        list.forEach((ele, index) => {
            ListData += `<div>
                            <input type="checkbox" lay-filter="permissions" name="${ele.id}" title="${ele.name}"
                                lay-skin="primary"  value="${ele.id}" >
                        </div>`
        });
        $(`.${element}`).empty();
        $(`.${element}`).html(ListData);
        TrueData.permissions.forEach((item, index) => {
            // var elearr=[];
            for (var i = 1; i < $(`.${element} input`).length; i++) {
                if (item.id == list[i - 1].id) {
                    $(`.${element} input`).eq(i).prop('checked', true)
                }
            }
            ;
        })
        form.render('checkbox');
    }

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
    var userPushId = [];

    function socketQuery(roleId, type) {
        var dataVal = JSON.stringify({
            roleId: Number(roleId)
        })
        loadingAjax('/role/getRoleUser', 'post', dataVal, token).then(res => {
            // console.log(res)
            userPushId = res.data.map(Number);
            console.log(userPushId)
            if (type) {
                socketPush(userPushId);
            }
        }).catch(err => {
            console.log(err)
        })
    };

    function socketPush(userData) {
        userData.forEach((item, index) => {
            console.log(item)
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
        console.log(data.elem); //得到checkbox原始DOM对象
        console.log(data.elem.checked); //是否被选中，true或者false;
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

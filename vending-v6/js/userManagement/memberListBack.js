import '../../MyCss/userManagement/memberList.css'

layui.use(['table', 'form', 'layer', 'tree', 'util', 'transfer'], function () {
        // tooltip('.refreshBtnList', {transition: true, time: 200});
        var permissionsData0 = window.parent.permissionsData1(),
            permissionsObj = {
                389: false,
                390: false,
                397: false,
                451: false,
            },
            permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);

        function permissions() {
            permissionsObjFlag[389] ? $('.addBtn').removeClass('hide') : $('.addBtn').addClass('hide');
            permissionsObjFlag[390] ? $('.listEdit').removeClass('hide') : $('.listEdit').addClass('hide');
            permissionsObjFlag[397] ? $('.del-btn').removeClass('hides') : $('.del-btn').addClass('hides');
            permissionsObjFlag[451] ? $('.userMachine').removeClass('hides') : $('.userMachine').addClass('hides');
        };
        permissions();
        var table = layui.table;
        var layer = layui.layer,
            layer = layui.layer,
            util = layui.util,
            tree = layui.tree,
            transfer = layui.transfer;
        var token = sessionStorage.token,
            UserId = sessionStorage.UserId,
            tableIns = table.render({
                elem: '#tableTest',
                url: `${vApi}/user/findUser`,
                method: 'post',
                contentType: "application/json",
                headers: {
                    token,
                },
                height: 600,
                cols: [[
                    {field: 'userName', width: 180, title: '用户名', align: 'center'},
                    {field: 'name', width: 150, title: '姓名', align: 'center'},
                    {
                        field: 'open', width: 150, title: '状态', align: 'center', templet: function (d) {
                            return d.open == 0 ? '不启用' : '启用'
                        }
                    },
                    {
                        field: 'roleSign', width: 150, align: 'center', title: '售货机管理员', templet: function (d) {
                            return d.roleSign == 0 ? '否' : '是'
                        }
                    },
                    {field: 'alias', width: 250, title: '用户编号', align: 'center'},
                    {field: 'phone', width: 150, title: '手机号', align: 'center'},
                    {field: 'merchantName', width: 200, title: '所属商户', align: 'center'},
                    {field: 'addUser', width: 150, title: '创建人', align: 'center',},
                    {field: 'addTime', width: 180, title: '创建时间', align: 'center'},
                    {field: 'lastUser', width: 150, title: '最后修改人', align: 'center',},
                    {field: 'lastTime', width: 180, title: '最后修改时间', align: 'center'},

                    {
                        field: 'operation',
                        fixed: 'right',
                        align: 'center',
                        right: 0,
                        width: 150,
                        title: '操作',
                        toolbar: '#barDemo'
                    },
                ]]
                , id: 'tableId'
                , page: true
                , loading: true,
                request: {
                    'pageName': 'pageNum',
                    'limitName': 'pageSize'
                },
                where: {
                    condition: sessionStorage.machineID
                },
                parseData: function (res) {
                    // console.log(res)
                    //res 即为原始返回的数据
                    fixedFun();
                    if (res.code == 200) {
                        return {
                            "code": res.code, //解析接口状态
                            "msg": res.message, //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.list //解析数据列表
                        };
                    } else if (res.code == 403) {
                        window.parent.location.href = "login.html";
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
        var uuID = null;

        // 查询
        $('.queryBtnClick ').click(function () {
            tableIns.reload({
                where: {
                    conditionTwo: $('.mian input[name="keyMerchants"]').val(),
                    // condition:2
                }
            })
        });
        //监听工具条
        var data = null;
        var memData = null,
            operationFlag = null;
        table.on('tool(test)', function (obj) {
            event.stopPropagation();
            data = obj.data;
            memData = obj.data;
            // console.log(obj)
            uuID = data.uuid;
            data.userName == 'sysadmin' ? $('.ListOperation .Status').removeClass('hide') : $('.ListOperation .Status').addClass('hide');
            data.open == 1 ? $('.ListOperation .Status').html('禁用') : $('.ListOperation .Status').html('启用');
            if (obj.event === 'operation') {
                if (operationFlag == obj.data.uuid) {
                    $('.ListOperation').fadeOut();
                    operationFlag = null;
                    return;
                }
                operationFlag = obj.data.uuid;
                $('.ListOperation').fadeIn();
                $('.ListOperation').css({
                    left: $(this).offset().left - 35 + 'px',
                    top: $(this).offset().top + 35 + 'px'
                })
            }
        });

        // Status启用
        $('.ListOperation .Status').click(function () {
            layer.confirm(data.open == 1 ? '确定禁用？' : '确定启用？', function (index) {
                var status = data.open == 1 ? 0 : 1;
                layer.close(index);
                var statusData = JSON.stringify({
                    id: data.uuid,
                    status,
                })
                loadingAjax('/user/switchById', 'post', statusData, sessionStorage.token, '', '', '', layer).then((res) => {
                    layer.msg(res.message, {icon: 1});
                    tableIns.reload({
                        where: {}
                    })
                    if (status == 0) {
                        socketFun(data.uuid)
                    }
                }).catch((err) => {
                    layer.msg(err.message, {icon: 7})
                })
            });
        });
        // 编辑
        $('.ListOperation .edit').click(function () {
            if (addEditData.length == 0) {
                layer.msg('服务器请求超时', {icon: 7});
                return;
            }
            if (data.userName == 'sysadmin') {
                $('.switchListStatus').hide();
            } else {
                $('.switchListStatus').show();
            }
            $('.inputWidth input[name="userName"]').prop('disabled', true);
            $('.treeTest').show();
            // layer.msg('ID：' + data.uuid + ' 的查看操作');
            // 点击编辑事件
            $('.OperationHeader span').html('编辑用户')
            informationType = 2;
            // $('.MemberOperation').fadeIn();
            popupShow('MemberOperation', 'MemberContent');
            form.val("information", {
                "userName": data.userName,
                "name": data.name,
                "userPwd": '      ',
                "DuserPwd": '      ',
                "alonePwd": '      ',
                'DalonePwd': '      ',
                "phone": data.phone,
                "cardId": data.cardId,
                "startThe": data.open ? 'on' : '',
                "administrator": data.roleSign ? 'on' : '',
                "marchantsListname": data.merchantName
            });
            tree.reload('treelistEdit', {});
            $('.terminal input[name="topmachantsVal"]').val(data.merchantId);
            form.render('select');
            userRoles(roleList, 'checkCont', data, data.merchantId);
        });

        // role角色
        $('.ListOperation .role').click(function () {
            if (data.roles.length == 0) {
                layer.msg('该用户没有配置角色', {icon: 7});
                return;
            }
            var RoleListText = '';
            data.roles.forEach((item, index) => {
                RoleListText += `<p>${item.name}</p>`
            });
            $('.RoleListBody>div').empty();
            $('.RoleListBody>div').html(RoleListText)
            popupShow('roleContList', 'RoleListBox')
        });
        // 删除
        $('.delete').click(function () {
            layer.confirm('确定删除？', function (index) {
                $.ajax({
                    type: 'get',
                    url: `${vApi}/user/deleteById`,
                    headers: {
                        token,
                    },
                    data: {
                        id: Number(data.uuid),
                    },
                    success: function (res) {
                        if (res.code == 200) {
                            layer.msg(res.message, {icon: 1});
                            // obj.del();
                            layer.close(index);
                            tableIns.reload({
                                where: {}
                            })
                            socketFun(data.uuid);
                        } else if (res.code == 403) {
                            window.parent.location.href = "login.html";
                        } else {
                            layer.msg(res.message, {icon: 2});
                        }
                    }
                });
            });
        })
        var form = layui.form;

        var informationType = null;
        // type 'add' edit
        //点击添加成员事件
        $('.addBtn').click(function () {
            if (addEditData.length == 0) {
                layer.msg('服务器请求超时', {icon: 7});
                return;
            }
            tree.reload('treelistEdit', {});
            $('.inputWidth input[name="userName"]').prop('disabled', false);
            $('.treeTest').hide();
            // $('.mask').fadeIn();
            // $('.maskSpan').addClass('maskIcon')
            popupShow('MemberOperation', 'MemberContent')
            informationType = $(this).attr('typeID');
            uuID = null;
            $('.OperationHeader span').html('添加用户')
            form.val("information", {
                "userName": '',
                "name": '',
                "userPwd": '',
                "alonePwd": '',
                "phone": '',
                "cardId": '',
                // 'marchantsListname': '',
                'DalonePwd': '',
                "DuserPwd": '',
                // 'topmachantsVal': '',
            });
            // form.render('select');
            $('.checkCont').empty();
            $('.roleCont').hide();


        });
        // 取消事件
        $('.cancel_btn').click(function () {
            // $('.MemberOperation').fadeOut();
            popupHide('MemberOperation', 'MemberContent')
        });

        // 提交事件
        $('.submit_btn').click(function () {
            var informData = form.val("information");
            var urlApi = null;
            // if (informData.name.length > 10) {
            //   layer.msg('姓名过长', { icon: 7 });
            //   return;
            // }
            if (!(informData.userName && informData.name && informData.userPwd && informData.alonePwd && informData.phone && informData.marchantsListname)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
            if (!(informData.userName && informData.name && informData.phone && informData.marchantsListname)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
            if (!(informData.DuserPwd == informData.userPwd)) {
                layer.msg('登录密码不一致', {icon: 7});
                return;
            }
            if (!(informData.alonePwd == informData.DalonePwd)) {
                layer.msg('独立密码不一致', {icon: 7});
                return;
            }
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon')
            if (informationType == '1') {
                urlApi = `${vApi}/user/saveUser`
                // 修改
            } else {
                urlApi = `${vApi}/user/updateUser`;
                var roleLIstData = form.val("checkboxData");
                var roleListArray = [];
                for (let i in roleLIstData) {
                    roleListArray.push(Number(roleLIstData[i]))
                }
                // console.log(roleListArray);
            }
            var aliasText = null;
            merchantsListData.forEach((item, index) => {
                if (informData.topmachantsVal == item.id) {
                    aliasText = item.alias
                }
            })
            var openStart = informData.startThe ? 1 : 0;
            var roleSignStart = informData.administrator ? 1 : 0;
            console.log(informData)
            if (urlApi) {
                $.ajax({
                    type: 'post',
                    url: urlApi,
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    data: JSON.stringify({
                        uid: uuID,
                        username: informData.userName,
                        name: informData.name,
                        userPwd: informData.userPwd != '      ' ? hex_md5(informData.userPwd) : '',
                        alonePwd: informData.alonePwd != '      ' ? hex_md5(informData.alonePwd) : '',
                        phone: informData.phone,
                        cardId: informData.cardId,
                        open: openStart,
                        roleSign: roleSignStart,
                        roleId: informationType == 2 ? roleListArray : null,
                        merchantId: Number(informData.topmachantsVal),
                        alias: aliasText
                    }),
                    success: function (res) {
                        $('.mask').fadeOut();
                        $('.maskSpan').removeClass('maskIcon')
                        // console.log(res)
                        if (res.code == 200) {
                            if (informationType == 2) {
                                socketFun(uuID)
                                if (UserId == uuID) {
                                    sessionStorage.machineID = informData.marchantsListname
                                }

                            }
                            tableIns.reload({
                                where: {}
                            });
                            form.val("information", {
                                "userName": '',
                                "name": '',
                                "userPwd": '',
                                "alonePwd": '',
                                "phone": '',
                                "cardId": '',
                            })
                            $('.MemberOperation').fadeOut();
                            layer.msg(res.message, {icon: 1})
                        } else if (res.code == 403) {
                            window.parent.location.href = "login.html";
                        } else {
                            layer.msg(res.message, {icon: 2})
                        }
                    },
                    error: function (err) {
                        $('.mask').fadeOut();
                        $('.maskSpan').removeClass('maskIcon')
                        layer.msg('请求服务器超时', {icon: 2})
                    }
                })
            }

        })
        $('.listInput input[name="phone"]').blur(function () {
            var phone = $(this).val();
            if (phone) {
                if (!(/^1[3456789]\d{9}$/.test(phone))) {
                    // alert("手机号码有误，请重填");
                    layer.msg('请填写正确的手机号码', {icon: 7});
                    $(this).val('')
                    return false;
                }
            }
        });
        $('.listInput input[name="userPwd"]').blur(function () {
            passRegular1(this, layer)
        });
        $('.listInput input[name="alonePwd"]').blur(function () {
            passRegular1(this, layer)
        })

        function passRegular1(that, layer) {
            var reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,64}$/;
            var passwork = $(that).val();
            if (passwork) {
                if (!(reg.test(passwork))) {
                    layer.msg('密码必须包含英文和数字以及特殊字符且不少于6位数', {icon: 7});
                    $(that).val('')
                    return false;
                }
            }
        };
        // 角色列表
        var roleList = null;
        $.ajax({
            type: 'post',
            headers: {
                "Content-Type": "application/json",
                token,
            },
            url: `${vApi}/role/findRole`,
            data: JSON.stringify({
                pageNum: 1,
                pageSize: 1000
            }),
            success: function (res) {
                if (res.code == 200) {
                    roleList = res.data.list;
                }
            }, error: function (err) {
                layer.msg('服务器请求超时', {icon: 2})
            }
        })

        // 渲染用户角色
        function userRoles(list, elements, trueList, dIndex) {
            var userList = '';
            list.forEach((ele, index) => {
                userList += `<div>
                     <input type="checkbox" ${dIndex != 1 && index == 0 ? 'disabled' : ''}  name="${ele.id}" title="${ele.name}"lay-skin="primary" value="${ele.id}"></input>
                   </div>`
            });
            $(`.${elements}`).empty();
            $(`.${elements}`).html(userList);
            $('.roleCont').show();
            trueList.roles.forEach((item, index) => {
                for (var i = 0; i < list.length; i++) {
                    if (item.id == list[i].id) {
                        $(`.${elements} input`).eq(i).prop('checked', true)
                    }
                }
            })
            form.render('checkbox');
        }

        form.on('select(stateSelect)', function (data) {
            if (data.value == 0) {
                $('.checkCont input[name="100001"]').prop('disabled', false);
            } else {
                // form.val("information", {
                //   'marchantsListname':''
                // })
                $('.checkCont input[name="100001"]').prop('checked', false)
                $('.checkCont input[name="100001"]').prop('disabled', true);
            }
            form.render('checkbox');
        });
        // 获取商户列表
        var merchantsListData = merchantsListMian('');

        // 左边商户列表显示隐藏事件
        $('.sidebar i').click(function () {
            $('.left-mian').hide()
            $('.onLeft').show()
        });
        $('.onLeft').click(function () {
            $(this).hide();
            $('.left-mian').show()
        })


        //树状图
        var addEditData = null;
        var dataList = addEditData = treeList();
        // var addEditData=treeList();
        // treeFun(tree, 'test1', tableIns, dataList, 'condition');
        $('.terminal input[name="marchantsListname"]').val(dataList[0].title);
        $('.terminal input[name="topmachantsVal"]').val(dataList[0].id)
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
        $('.playHeader .close').click(function () {
            $(this).parent().parent().addClass('margin0')
            $(this).parents('.maskContnet').fadeOut();
        });
        $('.inputWidth input[name="userName"]').blur(function () {
            ChineseREgular(this, layer)
        });

        // 推送方法
        function socketFun(uid) {
            var funData = JSON.stringify({
                uid,
                msg: '用户信息发生变更，请重新登录！',
                tag: 2
            })
            loadingAjax('/pushWebMsg', 'post', funData, sessionStorage.token).then(res => {

            }).catch(err => {

            })
        };
        var inst1 = tree.render({
            elem: '#test1',
            id: 'treelistAdd',
            showLine: !0 //连接线
            ,
            onlyIconControl: true //左侧图标控制展开收缩
            ,
            isJump: !1 //弹出新窗口跳转
            ,
            edit: false //开启节点的操作
            ,
            data: addEditData,
            text: {
                defaultNodeName: '无数据',
                none: ''
            },
            click: function (obj) {
                // console.log(obj);
                $('.terminal input[name="marchantsListname"]').val(obj.data.title);
                $('.terminal input[name="topmachantsVal"]').val(obj.data.id);
                tableIns.reload({
                    where: {
                        condition: obj.data.id + '',
                    }
                })
                var nodesEdti = $(`#test1 .layui-tree-txt`);
                for (var i = 0; i < nodesEdti.length; i++) {
                    if (nodesEdti[i].innerHTML === obj.data.title)
                        nodesEdti[i].style.color = "#be954a";
                    else
                        nodesEdti[i].style.color = "#555";
                }
            },
        });
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
            data: addEditData,
            text: {
                defaultNodeName: '无数据',
                none: ''
            },
            click: function (obj) {
                // console.log(obj);
                $('.terminal input[name="marchantsListname"]').val(obj.data.title);
                $('.terminal input[name="topmachantsVal"]').val(obj.data.id)
                if (obj.data.id == 1) {
                    $('.checkCont input[name="100001"]').prop('disabled', false);
                } else {
                    $('.checkCont input[name="100001"]').prop('checked', false)
                    $('.checkCont input[name="100001"]').prop('disabled', true);
                }
                form.render('checkbox');
                var nodesEdti = $(`.terminal .layui-tree-txt`);
                for (var i = 0; i < nodesEdti.length; i++) {
                    if (nodesEdti[i].innerHTML === obj.data.title)
                        nodesEdti[i].style.color = "#be954a";
                    else
                        nodesEdti[i].style.color = "#555";
                }
            },
        });


        // 售货机数据
        $('.ListOperation .stores').click(function () {
            if (data.roleSign == 0) {
                layer.msg('该用户不是售货机管理员', {icon: 7});
                return;
            }
            popupShow('storesCont', 'storesBox')
            storesFun(data.uuid)
        });

        let allData = [], selectData = [];

        function storesFun(uid) {
            loadingAjax('/user/getUserMachine', 'post', JSON.stringify({UUId: uid}), sessionStorage.token).then(res => {
                let data = res.data;
                allData = data.all;
                selectData = data.userSelect;
                renderSelect(allData, selectData, 'demo-transfer')
            })
        }

        function renderSelect(data, selectData, element) {
            console.log(data);
//             let ListData = `<div>
//         <input type="checkbox" lay-filter="permissionsAll" name="${element}" title="全选"
//             lay-skin="primary"  value="" style="margin-bottom: 10px">
//          </div>
// `;
            let ListData = '',
                all = [];
            data.forEach((ele, index) => {
                ListData += `
<div style="font-weight: bold">${ele.merchantName}</div>
`;
                ele.machine.forEach((item, i) => {
                    all.push(item);
                    ListData += `<div class="item">
                            <input type="checkbox" 
                            lay-filter="permissions"
                            lay-skin="primary"
                            name="${item.machineId}" title="${item.machineName}" value="${item.machineId}">
</div>`
                })
            });
            let ele = $(`.${element}`);
            console.log(all, 'all');
            ele.empty();
            ele.html(ListData);
            selectData.forEach((ele, index) => {
                ele.machine.forEach((item) => {
                    console.log(item, 'select');
                    for (let i = 0; i < $(`.${element} input`).length; i++) {
                            if (item.machineId == all[i].machineId) {
                                $(`.${element} input`).eq(i).prop('checked', true)
                            }
                        };
                })
            });
            form.render('checkbox');
        }


        $('.storeSubmit').click(function () {
            let userSelectRole = form.val("editInformation"),
                machineId = [];
            for (let i in userSelectRole) {
                machineId.push(i);
            }
            layer.confirm('确定修改配置？', function (index) {
                layer.close(index);
                var editStores = JSON.stringify({
                    UUID: memData.uuid,
                    machineId
                });
                loadingAjax('/user/configUserMachine', 'post', editStores, sessionStorage.token,
                    'mask', '', '', layer).then(res => {
                    layer.msg(res.message, { icon: 1 });
                    popupHide('storesCont', 'storesBox')
                    storesFun(memData.uuid);
                }).catch(err => {
                    layer.msg(err.message, { icon: 2 });
                })
            })
        })

        // 刷新商户
        $('.refreshBtnList').click(function () {
            var dataList1 = treeList();
            if (JSON.stringify(dataList1) != JSON.stringify(dataList)) {
                addEditData = dataList1;
                tree.reload('treelistAdd', {
                    data: addEditData
                });
                tableIns.reload({
                    where: {
                        condition: sessionStorage.machineID
                    }
                });
                layer.msg('已刷新', {icon: 1})
            } else {
                layer.msg('已刷新', {icon: 1})
            }
        });
        $('body').click(function () {
            $('.ListOperation').fadeOut();
            operationFlag = null;
        });
    }
);


import '../../MyCss/memberList/memberList.scss';
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

layui.use(['table', 'form', 'layer', 'tree', 'util', 'transfer'], function () {
    var table = layui.table, layer = layui.layer, token = sessionStorage.token,
        tableIns = table.render({
            elem: '#tableTest',
            url: `${Vapi}/user/getUser`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            align: 'center',
            cols: [[
                {field: 'username', width: 180, title: '用户名', align: 'center'},
                {field: 'name', width: 150, title: '姓名', align: 'center'},
                {
                    field: 'company', width: 300, title: '公司名', align: 'center', templet: function (e) {
                        return e.company ? e.company.companyName : ''
                    }
                },
                {
                    field: 'lockCount', width: 150, title: '状态', align: 'center', templet: function (e) {
                        return (e.lockCount === 0 || e.lockCount === 2) ? '启用' : '禁用'
                    }
                },
                {
                    field: 'addUser', width: 150, title: '创建人', align: 'center', templet: function (e) {
                        return e.addUser ? e.addUser.username : ''
                    }
                },
                {field: 'addTime', width: 180, title: '创建时间', align: 'center'},
                {
                    field: 'updateUser', width: 150, title: '更改人', align: 'center', templet: function (e) {
                        return e.updateUser ? e.updateUser.username : ''
                    }
                },
                {field: 'updateTime', width: 180, title: '更改时间', align: 'center'},
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
                fixedFun();
                if (res.code == 200) {
                    return {
                        "code": res.code,//解析接口状态
                        "msg": res.message,//解析提示文本
                        "count": res.data.total,//解析数据长度
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
                statusCode: 200//规定成功的状态码，默认：0
            },
            done: function (res) {
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                } else if (res.code == 405) {
                    $('.hangContent').show();
                }
            }
        });
    // 查询
    $('.queryBtnClick ').click(function () {
        tableIns.reload({
            where: {
                conditionTwo: $('.mian input[name="keyMerchants"]').val()
            }
        })
    });
    //监听工具条
    var data = null,
        memData = null,
        operationFlag = null,
        form = layui.form,
        informationType = null;
    let selected = null;
    table.on('tool(test)', function (obj) {
        event.stopPropagation();
        data = obj.data;
        memData = obj.data;
        if (obj.event === 'operation') {
            $('.ListOperation').fadeIn();
            $('.ListOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        }
    });

    // 获取下拉列表
    function selectData() {
        $.ajax({
            url: `${Vapi}/company/getAll`,
            type: 'get',
            headers: {
                "Content-Type": "application/json",
                token,
            },
            success(res) {
                console.log(res);
                let optionList = ``;
                $('#companyType').empty();
                $.each(res.data, function (index, ele) {
                    optionList += `<option value="${ele.companyId}">${ele.companyName}</option>`
                });
                $('#companyType').append(optionList);
                form.render('select');
            },
            error(err) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('请求服务器超时', {icon: 2})
            }
        })
    }

    selectData();
    // 删除
    $('.delete').click(function () {
        selected = data.id;
        if (data.username === sessionStorage.username) {
            layer.msg('该用户为当前登陆用户，不可删除！！', {icon: 2});
            return;
        } else {
            layer.confirm('确定删除？', function (index) {
                console.log(index);
                $.ajax({
                    type: 'get',
                    url: `${Vapi}/user/deleteUserById`,
                    headers: {
                        token,
                    },
                    data: {
                        uId: selected,
                    },
                    success (res) {
                        if (res.code === 200) {
                            tableIns.reload({
                                where: {}
                            });
                            layer.msg(res.message, {icon: 1});
                            layer.close(index);
                        } else if (res.code === 403) {
                            window.parent.location.href = "login.html";
                        } else {
                            layer.msg(res.message, {icon: 2});
                        }
                    }
                });
            });
        }
    })

    //点击添加成员事件
    $('.addBtn').click(function () {
        $('.switchOpen').hide();
        popupShow('.MemberOperation', '.MemberContent')
        informationType = $(this).attr('typeID');
        $('.OperationHeader span').html('添加用户')
        form.val("information", {
            id: '',
            username: '',
            name: '',
            password: '',
            companyId: ''
        });
        $('.checkCont').empty();
        $('.roleCont').hide();


    });
    // 编辑
    $('.ListOperation .edit').click(function () {
        selected = data.id;
        $('.switchOpen').show();
        $('.switchOpen input[name="open"]').prop('checked', data.lockCount === 2 || data.lockCount === 0);
        // 点击编辑事件
        $('.OperationHeader span').html('编辑用户')
        informationType = 2;
        popupShow('.MemberOperation', '.MemberContent');
        form.val("information", {
            username: data.username,
            name: data.name,
            password: '      ',
            companyId: data.company.companyId,
            lockCount: data.lockCount
        });
        console.log(data, 'test');
        form.render('select');
    });

    // 提交事件
    $('.submit_btn').click(function () {
        let informData = form.val("information"),
            urlApi = null;
        console.log(informData);
        if (!(informData.username && informData.name && informData.password
            && informData.companyId)) {
            layer.msg('带*为必填', {icon: 7});
            return;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        let data = JSON.stringify({
            id: selected,
            username: informData.username,
            name: informData.name,
            password: informData.password !== '      ' ? hex_md5(informData.password) : '',
            companyId: informData.companyId,
            lockCount: $('.switchOpen input[name="open"]').prop('checked') ? 2 : 1
        });
        console.log(data);
        informationType === '1' ? urlApi = `${Vapi}/user/addUser` : urlApi = `${Vapi}/user/updateUser`;
        if (urlApi) {
            $.ajax({
                type: 'post',
                url: urlApi,
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                data: data,
                success: function (res) {
                    $('.mask').fadeOut();
                    $('.maskSpan').removeClass('maskIcon')
                    if (res.code == 200) {
                        tableIns.reload({
                            where: {}
                        });
                        form.val("information", {
                            username: '',
                            name: '',
                            password: '',
                            companyId: ''
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

    // 取消事件
    $('.cancel_btn').click(function () {
        popupHide('.MemberOperation', '.MemberContent')
    });
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
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    $('.inputWidth input[name="userName"]').blur(function () {
        ChineseREgular(this, layer)
    });
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
});


import '../../MyCss/notice/message.scss';
var massageTableIn = null;
layui.use(['table', 'form', 'layer', 'tree'], function () {
    var table = layui.table,
        form = layui.form,
        layer = layui.layer,
        tree = layui.tree,
        token = sessionStorage.token;
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    // f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });
    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });
    let tableCols = [[
        { field: 'title',title: '消息标题', align: 'center' },
        {
            field: 'name', title: '状态', align: 'center', templet: function (d) {
                return d.is_read == 0 ? '未读' : '已读'
            }
        },

        { field: 'create_user', title: '创建人', align: 'center' ,templet:function(d){
                return `<div>${d.usName}</div><div>(${d.um})</div>`
            }},
        {
            field: 'create_time', title: '创建时间', align: 'center', templet: function (d) {
                if (d.create_time) {
                    return timeStamp(d.create_time)
                } else {
                    return '-'
                }
            }
        },
        // { field: 'operation', width: 200, title: '操作', toolbar: '#barDemo' },
    ]];
    massageTableIn = table.render({
        elem: '#massageTable',
        method: 'post',
        url: `${vApi}/notices/getHistoryMsg`,
        contentType: "application/json",
        headers: {
            token: sessionStorage.token
        },
        cols: tableCols,
        id: 'messageId',
        page: true,
        loading: true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            type: 1
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
    // 编辑器部分

    var E = window.wangEditor;
    var addWangEditor = new E('#addWangEditor');
    addWangEditor.customConfig.customUploadImg = function (files, insert) {
        console.log(files)
        var upDetails = new FormData();
        upDetails.append('file', files[0]);
        $.ajax({
            type: 'post',
            url: `${vApi}/fileUpload`,
            processData: false,
            contentType: false,
            timeout: 10000,
            headers: {
                token,
            },
            data: upDetails,
            success: function (res) {
                if (res.code == 0) {
                    insert(res.data.src)
                } else {
                    layer.msg(res.message, { icon: 7 });
                }
            },
            error: function (err) {
                layer.msg('上传失败', { icon: 2 })
            }
        })
    }
    addWangEditor.create();

    // 点击选择用户
    $('.pushMessageCont .chooseUserBtn').click(function () {
        if (!Mtree) {
            treeFun();
            userListFun();
        }
        popupShow('userContent', 'userBox')
    })
    // 树部分
    var dataList = treeList();
    var sendMessageID = sessionStorage.machineID;//发送商户id
    var senMessageName = dataList[0]?dataList[0].title:'';
    // treeFun(tree, 'test1', tableIns, dataList, 'condition');
    var Mtree = null;
    function treeFun() {
        Mtree = tree.render({
            elem: `#test1`,
            id: 'treelist',
            showLine: !0 //连接线
            ,
            onlyIconControl: true, //左侧图标控制展开收缩
            data: dataList,
            spread: true,
            text: {
                defaultNodeName: '无数据',
                none: '您没有权限，请联系管理员授权!'
            },
            click: function (obj) {
                console.log(obj);
                userTableIn.reload({
                    where: {
                        condition: obj.data.id
                    }
                })
                sendMessageID = obj.data.id;
                senMessageName = obj.data.title
                var nodes = $(`#test1 .layui-tree-txt`)
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].innerHTML === obj.data.title)
                        nodes[i].style.color = "#be954a";
                    else
                        nodes[i].style.color = "#555";
                }
            },
        });
    }
    dataList.length==0?$('.addPushBtn').hide():$('.addPushBtn').show()
    // 用户列表
    var userTableIn = null;
    function userListFun() {
        userTableIn = table.render({
            elem: '#userList',
            url: `${vApi}/user/findUser`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { checkbox: true, width: 70, align: 'center' },
                { field: 'userName',  title: '用户名', align: 'center' },
                { field: 'name', title: '姓名', align: 'center' },
                {
                    field: 'open', title: '状态', align: 'center', templet: function (d) {
                        return d.open == 0 ? '不启用' : '启用'
                    }
                },
                {
                    field: 'roleSign',  align: 'center', title: '售货机管理员', templet: function (d) {
                        return d.roleSign == 0 ? '否' : '是'
                    }
                },
                { field: 'alias',  title: '用户编号', align: 'center' },
                { field: 'phone',  title: '手机号', align: 'center' },
                { field: 'merchantName',  title: '所属商户', align: 'center' },
            ]],
            id: 'userId',
            page: true,
            loading: true,
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
                console.log(userListArr)
                currentUserList = [];
                if (res.code == 200) {
                    res.data.forEach(item => {
                        currentUserList.push(item.uuid);
                        for (var i in userListArr) {
                            var ele = userListArr[i]
                            if (item.uuid == ele) {
                                $('.userContent tr[data-index=' + i + '] input[type="checkbox"]').prop('checked', true);
                                form.render();// 重新渲染一下
                            }
                        }
                    })
                }
            }
        });
    }
    // 用户列表部分
    var currentUserList = [];

    var userListArr = [];
    var confirmListArr = [];
    // 取消选择用户
    $('.userContent .cancelBtn').click(function () {
        popupHide('userContent', 'userBox')
    })
    // 监听选择用户
    table.on('checkbox(userList)', function (obj) {
        console.log(obj.data); //选中行的相关数据
        // 判断是单选还是全选
        if (obj.type == 'all') {
            console.log(userListArr)
            if (obj.checked) {
                currentUserList.forEach(item => {
                    if (!(userListArr.includes(item))) {
                        userListArr.push(item)
                    }
                })
                console.log(userListArr)
            } else {
                var arr = [];
                userListArr.forEach(item => {
                    if (!currentUserList.includes(item)) {
                        arr.push(item)
                    }
                });
                userListArr = arr;

            }
        } else {
            if (obj.checked) {
                userListArr.push(obj.data.uuid);
            } else {
                userListArr.splice(userListArr.indexOf(obj.data.uuid), 1);
            }
        }
        // userListArr.length>0?$('.chooseTitle').html('已选择'):$('.chooseTitle').html('未选择');
    });
    // 确定选择用户
    $('.userContent .confirmBtn').click(function () {
        confirmListArr = userListArr;
        popupHide('userContent', 'userBox')
        confirmListArr.length > 0 ? $('.chooseTitle').html('已选择') : $('.chooseTitle').html('未选择');
    });

    // 取消发送
    $('.pushMessageCont .cancelBtn').click(function () {
        popupHide('pushMessageCont', 'pushMessageBox')
    })
    // 发送消息
    $('.addPushBtn').click(function () {
        popupShow('pushMessageCont', 'pushMessageBox')
    })
    // 确定发送消息
    $('.pushMessageCont .confirmBtn').click(function () {
        if (!$('.pushMessageCont input[name="title"]').val()) {
            layer.msg('带*未必填', { icon: 7 })
            return;
        }
        if (!(addWangEditor.txt.html().length > 11)) {
            layer.msg('公告详情最少五个字', { icon: 7 });
            return;
        };
        if (userListArr.length == 0) {
            var messageObj = JSON.stringify({
                title: $('.pushMessageCont input[name="title"]').val(),
                content: addWangEditor.txt.html(),
                merchantId: userListArr.length == 0 ? Number(sendMessageID) : '',
                // UUId:userListArr,
            })
            layer.confirm(`您没有选择用户,消息将发送给${senMessageName}商户的所有用户`, function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                pushMessageFun(messageObj, 1)
            })
        } else {
            var messageObj = JSON.stringify({
                title: $('.pushMessageCont input[name="title"]').val(),
                content: addWangEditor.txt.html(),
                // merchantId:userListArr.length==0?Number(sendMessageID) :'',
                uuid: userListArr,
            })
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            pushMessageFun(messageObj, 2)
        }
    });
    // 发送信息方法
    function pushMessageFun(data, type) {
        loadingAjax('/notices/addMessage', 'post', data, sessionStorage.token, 'mask', 'pushMessageCont', 'pushMessageBox', layer).then(res => {
            layer.msg(res.message, { icon: 1 });
            popupHide('pushMessageCont', 'pushMessageBox');
            if (type == 1) {
                socketPush(currentUserList)
            } else if (type == 2) {
                socketPush(userListArr)
            }
            userListArr = [];
            $('.pushMessageCont input[name="title"]').val('');
            $('.chooseTitle').html('未选择');
            addWangEditor.txt.html('')
            if (pushMessageListTable) {
                pushMessageListTable.reload({
                    where: {}
                })
            }
        }).catch(err => {
            console.log(err)
            layer.msg(err.message, { icon: 2 })
        })
    }
    // 查询消息
    $('.queryBtn').click(function () {
        saveTableWidth(tableCols)
        massageTableIn.reload({
            where: {
                keyword: $('.KyeText').val()
            },
            cols: tableCols
        })
    })
    // 监听点击信息
    var messageTableData = null;//存储点击消息
    table.on('row(massageTable)', function (obj) {
        var messageTableData = obj.data;
        if (messageTableData.is_read == 0) {
            status(messageTableData.id)
        }
        $('.messageDetails .playHeader span').html(`${messageTableData.title}`)
        $('.messageDetails .detailsHtml ').html(messageTableData.content)
        popupShow('messageDetails', 'detailsBox');
    });
    //   改变消息状态方法
    function status(id) {
        var messageObj = JSON.stringify({
            message_id: id
        });
        loadingAjax('/notices/readMessage', 'post', messageObj, sessionStorage.token, '', '', '', layer).then(res => {
            massageTableIn.reload({
                where: {}
            });
            window.parent.messageFunList();
        }).catch(err => {
            console.log(err)
            layer.msg('阅读消息失败', { icon: 2 })
        })
    };

    //   发送socket通知父页面改变已读状态
    function socketPush(userId) {
        console.log(userId)
        userId.forEach(item => {
            var socketKey = JSON.stringify({
                uid: item,
                msg: '消息通知',
                tag: 3
            });
            loadingAjax('/pushWebMsg', 'post', socketKey, sessionStorage.token).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        })
    }

    // 已发送信息列表
    var pushMessageListTable = null;
    function pushMessageListFun() {
        pushMessageListTable = table.render({
            elem: '#massagePushList',
            method: 'post',
            url: `${vApi}/notices/getHistoryMsg`,
            contentType: "application/json",
            headers: {
                token: sessionStorage.token
            },
            cols: [[
                { field: 'title',  title: '消息标题', align: 'center' },
                { field: 'create_user', title: '创建人', align: 'center' },
                {
                    field: 'is_read',title: '接收人', align: 'center', templet: function (d) {
                        return `<div>${d.name}</div><div>(${d.username})</div>`
                    }
                },
                {
                    field: 'create_time', align: 'center', title: '创建时间', templet: function (d) {
                        if (d.create_time) {
                            return timeStamp(d.create_time)
                        } else {
                            return '-'
                        }
                    }
                },
                // { field: 'operation', width: 200, title: '操作', toolbar: '#barDemo' },
            ]],
            id: 'messageListID',
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                type: 0
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
    }
    $('.messageListBtn').click(function () {
        if (!pushMessageListTable) {
            pushMessageListFun();
        }
        popupShow('pushMessageList', 'pushMessageListBox')
    });

    table.on('row(massagePushList)', function (obj) {
        var messageTableData = obj.data;
        $('.messageDetails .playHeader span').html(`${messageTableData.title}`)
        $('.messageDetails .detailsHtml ').html(messageTableData.content)
        popupShow('messageDetails', 'detailsBox');
    })
})
// 父页面调用方法
function reloadFun() {
    massageTableIn.reload({
        where: {}
    });
}
window.reloadFun = reloadFun;

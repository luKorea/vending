//JavaScript代码区域
import '../../MyCss/indexCss/index.css'
import { navList } from '../../assets/public/navData.js'
if (!sessionStorage.token) {
    window.location.href = "login.html"
}

window.onload = function () {
    var userName = sessionStorage.username;
    $('#userLogin .userName').html(userName)
    var navStr = []; //判断tba选项卡有没有这个参数;
    layui.use(['layer', 'form', 'element', 'carousel', 'table'], function () {
        // 子页面
        var iframeChild = null;
        // 表单
        var layer = layui.layer,
            form = layui.form,
            table = layui.table;
        // 选项卡
        // var element = layui.element;


        var $ = layui.jquery
            , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

        //新增一个Tab项
        // console.log(table)
        function tabAdd(index, title) {
            element.tabAdd('demo', {
                title,
                // content: `<div class="content-tbas-iframe-html">
                //             <iframe class="iframe_show" src="homePage.html"></iframe>
                //         </div>`
                content: `<div class="content-tbas-iframe-html">
                             ${navList[index]}
                         </div>`
                , id: index
            });
            // for (var i = 0; i < $('.iframe_show').length; i++) {
            //     if ($('.iframe_show').eq(i).attr('src') == 'message.html') {
            //         iframeChild = $('.iframe_show').eq(i);
            //         console.log(iframeChild)

            //     }
            // }

        };

        //切换到指定Tab项
        function tabChange(index) {
            element.tabChange('demo', index);
        };

        // 导航切换事件
        $('.navClick').click(function () {

            if (navStr.indexOf($(this).attr('navId')) == -1) {
                tabAdd($(this).attr('navId'), $(this).html());
                tabChange($(this).attr('navId'));
                navStr.push($(this).attr('navId'));
            } else {

                tabChange($(this).attr('navId'))
            }
        })

        // 监听tabl删除事件
        $(".layui-tab").on("click", function (e) {
            if ($(e.target).is(".layui-tab-close")) {
                //判断是不是点击删除icon
                var delIndex = navStr.indexOf($(e.target).parent().attr("lay-id"));
                navStr.splice(delIndex, 1);
                // console.log($(e.target).parent().attr("lay-id"))// 输出哪个tab被点击，没有值时返回undefined
            }
        });

        // 监听tab切换事件
        var Indexs = null;
        element.on('tab(demo)', function (data) {
            var Len = $(".navClick").length;
            for (var i = 0; i < Len; i++) {
                if ($(this).attr('lay-id') == $(".navClick").eq(i).attr('navId')) {
                    Indexs = i;
                }
            };
            // 左侧菜单初始化
            $('.layui-nav-item').removeClass('layui-nav-itemed');
            $(".navClick").eq(Indexs).parent().parent().parent().addClass('layui-nav-itemed');
            $(".navClick").parent().removeClass('layui-this');
            $(".navClick").eq(Indexs).parent().addClass('layui-this')
            if ($(this).attr('lay-id') == 999) {
                $('.layui-nav-item').removeClass('layui-nav-itemed');
                $(".navClick").parent().removeClass('layui-this');
            }
        })


        // 点击导航分类，其他分类收起
        $('#nav .layui-nav-item>a').click(function () {
            $(this).parent().siblings().removeClass('layui-nav-itemed')
        });
        var socket;
        var socketFlag = true;
        // websocket
        function openSocket() {
            if (typeof (WebSocket) == "undefined") {
                console.log("您的浏览器不支持WebSocket");
            } else {
                // console.log("您的浏览器支持WebSocket");
                //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
                //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
                //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
                //  var socketUrl="http://172.16.71.142:8086/push?machine=8fc9d742bd0772c6&message=123456";
                // var socketUrl = `ws://119.29.104.217:8086/pushServer/${sessionStorage.UserId}`;
                var socketUrl = `http://192.168.3.19:8086/pushServer/${sessionStorage.UserId}`;
                socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
                // console.log(socketUrl);
                if (socket != null) {
                    socket.close();
                    socket = null;
                }
                socket = new WebSocket(socketUrl);
                //打开事件
                socket.onopen = function () {
                    console.log("websocket已打开");
                    socketFlag = true;
                    //socket.send("这是来自客户端的消息" + location.href + new Date());
                };
                //获得消息事件
                socket.onmessage = function (msg) {

                    var gainData = JSON.parse(msg.data)
                    // console.log(gainData);
                    //type 1角色编辑或者删除 2用户编辑
                    if (gainData.type == 1) {
                        // console.log(gainData);
                        // layer.msg(gainData.data,{icon:7})
                        $('.sockotTitle p').html(gainData.data)
                        popupShow('socketCont', 'sockotBox');
                        setTimeout(() => {
                            loginOut();
                        }, 3500)
                    } else if (gainData.type == 2) {
                        $('.sockotTitle p').html(gainData.data)
                        popupShow('socketCont', 'sockotBox');
                        setTimeout(() => {
                            loginOut();
                        }, 3500)
                    } else if (gainData.type == 3) {
                        messageFunList()
                    } else if (gainData.type == 'notice') {
                        // shuffling();
                        noticeFun();
                    }

                    // console.log(msg)
                    //发现消息进入    开始处理前端触发逻辑
                };
                //关闭事件
                socket.onclose = function () {
                    console.log("websocket已关闭");
                    socketFlag = false
                    //              websocket.close();
                };
                //发生了错误事件
                socket.onerror = function () {
                    console.log("websocket发生了错误");
                    socketFlag = false
                }
            }
        };
        if (sessionStorage.token) {
            openSocket();
        }
        setInterval(() => {
            if (sessionStorage.token) {
                if (!socketFlag) {
                    socketFlag = true;
                    openSocket()
                }
            }
        }, 10000)

        //退出登录
        function loginOut() {
            loadingAjax('/api/user/logout', 'post', '', sessionStorage.token, '', '', '', layer).then((res) => {
                console.log(res)
                // window.history.go(-1);
                sessionStorage.token = '';
                window.location.replace('login.html')
            }).catch((err) => {
                console.log(err)
                layer.msg(err.message)
            })
        }

        $('.exitLogin').click(function () {
            loginOut();
        });
        $('.determineBtn button').click(function () {
            popupHide('socketCont', 'sockotBox')
            loginOut();
        });


        // 权限控制
        permissionsFun('/api/role/findUserPermission', 'post', sessionStorage.token, layer).then(res => {
            // console.log(res.data)
            // 用户模块
            var userListFlag = false,
                roleListFlag = false,
                machineListFlag = false,
                goodsClassFlag = false,
                goodsListFlag = false,
                materialListFlag = false,
                merchantsListFlag = false,
                paySetFlag = false,
                accountsListFlag = false,
                orderListFlag = false,
                RMListFlag = false,
                ReListFlag = false,
                salesFlag = false,
                pickupFlag = false;
            res.data.forEach(item => {
                if (item.id == 408) {
                    userListFlag = true
                }
                if (item.id == 407) {
                    roleListFlag = true
                }
                if (item.id == 413) {
                    machineListFlag = true
                }
                if (item.id == 414) {
                    goodsClassFlag = true
                }
                if (item.id == 409) {
                    goodsListFlag = true
                }
                if (item.id == 410) {
                    materialListFlag = true
                }
                if (item.id == 400) {
                    merchantsListFlag = true
                }
                if (item.id == 431) {
                    paySetFlag = true
                }
                if (item.id == 423) {
                    accountsListFlag = true
                }
                if (item.id == 419) {
                    orderListFlag = true
                }
                if (item.id == 412) {
                    RMListFlag = true
                }
                if (item.id == 411) {
                    ReListFlag = true
                }
                if (item.id == 447) {
                    salesFlag = true
                }
                if (item.id == 448) {
                    pickupFlag = true
                }
            })
            // console.log(a) 
            // var userListFlag = res.data.some((item, index) => {
            //     return item.id == 408
            // })
            userListFlag ? $('.userListFlag').removeClass('hide') : $('.userListFlag').addClass('hide');
            // var roleListFlag = res.data.some((item, index) => {
            //     return item.id == 407
            // });
            // roleListFlag?$('.noticeCont').removeClass('hide'):$('.noticeCont').addClass('hide')
            roleListFlag ? $('.roleListFlag').removeClass('hide') : $('.roleListFlag').addClass('hide');
            (userListFlag || roleListFlag) ? $('.userCont').removeClass('hide') : $('.userCont').addClass('hide');
            //售货机模块
            // var machineListFlag = res.data.some((item, index) => {
            //     return item.id == 413
            // });
            machineListFlag ? $('.machineListFlag').removeClass('hide').parents('.machineCont').removeClass('hide') : $('.machineListFlag').addClass('hide').parents('.machineCont').addClass('hide');
            //商品管理模块
            // var goodsClassFlag = res.data.some((item, index) => {
            //     return item.id == 414
            // });
            goodsClassFlag ? $('.goodsClassFlag').removeClass('hide') : $('.goodsClassFlag').addClass('hide');

            // var goodsListFlag = res.data.some((item, index) => {
            //     return item.id == 409
            // });
            goodsListFlag ? $('.goodsListFlag').removeClass('hide') : $('.goodsListFlag').addClass('hide');

            // var materialListFlag = res.data.some((item, index) => {
            //     return item.id == 410
            // });
            materialListFlag ? $('.materialListFlag').removeClass('hide') : $('.materialListFlag').addClass('hide');
            (goodsClassFlag || goodsListFlag || materialListFlag) ? $('.goodsCont').removeClass('hide') : $('.goodsCont').addClass('hide');

            //   商户模块
            // var merchantsListFlag = res.data.some((item, index) => {
            //     return item.id == 400
            // });
            merchantsListFlag ? $('.merchantsListFlag').removeClass('hide').parents('.merchantsCont').removeClass('hide') : $('.merchantsListFlag').addClass('hide').parents('.merchantsCont').addClass('hide');
            // var paySetFlag=res.data.some((item,index)=>{
            //     return item.id == 431
            // })
            paySetFlag ? $('.merchantsPay').removeClass('hide') : $('.merchantsPay').addClass('hide');
            roleListFlag ? $('.merchantsPayType').removeClass('hide') : $('.merchantsPayType').addClass('hide');
            salesFlag ? $('.sales').removeClass('hide') : $('.sales').addClass('hide')
            //账目模块
            // var accountsListFlag = res.data.some((item, index) => {
            //     return item.id == 423
            // });
            accountsListFlag ? $('.accountsListFlag').removeClass('hide').parents('.accountsCont').removeClass('hide') : $('.accountsListFlag').addClass('hide').parents('.accountsCont').addClass('hide');

            //订单模块
            // var orderListFlag = res.data.some((item, index) => {
            //     return item.id == 419
            // });
            orderListFlag ? $('.orderListFlag').removeClass('hide').parents('.orderCont').removeClass('hide') : $('.orderListFlag').addClass('hide').parents('.orderCont').addClass('hide');
            //广告模块
            // var RMListFlag = res.data.some((item, index) => {
            //     return item.id == 412
            // });
            RMListFlag ? $('.RMListFlag').removeClass('hide') : $('.RMListFlag').addClass('hide');
            // var ReListFlag = res.data.some((item, index) => {
            //     return item.id == 411
            // });
            ReListFlag ? $('.ReListFlag').removeClass('hide') : $('.ReListFlag').addClass('hide');
            (RMListFlag || ReListFlag) ? $('.releaseCont').removeClass('hide') : $('.releaseCont').addClass('hide');
            // 营销模块
            pickupFlag ? $('.pickupCode').removeClass('hide').parents('.marketingCont').removeClass('hide') : $('.pickupCode').addClass('hide').parents('.marketingCont').addClass('hide');
        }).catch(err => {
            console.log(err)
            layer.msg(err.message, { icon: 2 })
        })


        // 获取公告列表
        var noticeObj = JSON.stringify({
            pageSize: 10,
            pageNum: 1,
            n_status: 1,
            is_show: 1
        })
        // 轮播图
        var carousel = layui.carousel;
        var noticeSwp = null;
        var noticeList = null;
        function shuffling() {
            loadingAjax('/api/notices/getNoticeList', 'post', noticeObj, sessionStorage.token).then(res => {
                noticeList = res.data.list;
                noticeDrawing(noticeList)
            }).catch(err => {
                layer.msg('获取公告失败', { icon: 2 })
            });
        }
        // shuffling();
        // 公告渲染
        function noticeDrawing(list) {
            var noticeStr = ''
            list.forEach((item, index) => {
                noticeStr += `<div class="swpier"  ArrList="${index}">${item.title}</div>`
            });
            $('.noticeTitleText').html(noticeStr);
            noticeSwp = carousel.render({
                elem: '#test1'
                , width: '480px' //设置容器宽度
                , height: '25px'
                , arrow: 'none' //始终显示箭头
                , anim: 'updown' //切换动画方式
                , indicator: 'none'
                , interval: '2000'
            });
            var options = {
                'interval': 2000
            }
            noticeSwp.reload(options);
        };
        // 点击公告
        $('.noticeTitleText').on('click', '.swpier', function () {
            var swpierVal = noticeList[$(this).attr('ArrList')];
            console.log(swpierVal);
            $('.previewContent .playHeader span').html(swpierVal.title);
            $('.previewContent .previewBody .previewHtml').html(swpierVal.content);
            $('.previeName span').html(swpierVal.create_user)
            var noticeTime = timeStamp(swpierVal.create_time)
            $('.previeTime span').html(noticeTime)
            if (swpierVal.attach_name) {
                $('.downloadBtn').show();
                $('.downloadBtn a').attr('src', swpierVal.attach_url)
                var dowArr = swpierVal.attach_url.split('.');
                var dowName = dowArr[dowArr.length - 1]
                $('.downloadBtn a').attr('download', swpierVal.attach_name + '.' + dowName);

            } else {
                $('.downloadBtn').hide();
            }
            popupShow('previewContent', 'previewBox')
        });
        // 关闭弹窗
        $('.playHeader .close').click(function () {
            $(this).parent().parent().addClass('margin0')
            $(this).parents('.maskContnet').fadeOut();
        });
        // 点击公告遮罩关闭弹窗
        $('.previewBox').click(function () {
            event.stopPropagation();
        });
        $('.previewContent').click(function () {
            popupHide('previewContent', 'previewBox')
        });


        // 未读消息部分
        var messageListArr = [];
        var unreadNum = 0;
        // 未读消息
        function messageFunList() {
            unreadNum = 0;
            var messageObj = JSON.stringify({
                pageSize: 25,
                pageNum: 1,
                is_read: 0
            });
            loadingAjax('/api/notices/getHistoryMsg', 'post', messageObj, sessionStorage.token).then(res => {
                messageListArr = res.data.list;
                var messageStr = '';
                messageListArr.forEach((item, index) => {
                    if (item.is_read == 0 && item.create_user != sessionStorage.username) {
                        unreadNum++;
                        messageStr += `<dd >
                                    <a class="messageDow" messageIndex="${index}" href="javascript:;"><span>${item.title}</span></a>
                                </dd>`
                    }
                })
                $('.unreadMessageBox').html(messageStr);
                $('.unreadMessage').html(unreadNum)
                if (unreadNum == 0) {
                    var emptyStr = `<dd>
                                <h5>暂无未读消息</h5>
                            </dd>`
                    $('.unreadMessageBox').html(emptyStr)
                }
            }).catch(err => {
                layer.msg('获取未读消息失败', { icon: 2 })
            })
        }
        messageFunList();
        window.messageFunList = messageFunList;
        // 点击展示消息
        $('.messageContentList').on('click', '.messageDow', function () {
            console.log(messageListArr[$(this).attr('messageIndex')]);
            var messageDetails = messageListArr[$(this).attr('messageIndex')]
            $('.messageCont .playHeader span').html(`${messageDetails.title}`);
            $('.messageBody .messageHtml').html(messageDetails.content);
            status(messageDetails.id);
            popupShow('messageCont', 'messageBox')
        })

        $('.messageBox').click(function () {
            event.stopPropagation();
        });
        $('.messageCont').click(function () {
            popupHide('messageCont', 'messageBox')
        });
        function status(id) {
            var messageObj = JSON.stringify({
                message_id: id
            });
            loadingAjax('/api/notices/readMessage', 'post', messageObj, sessionStorage.token, '', '', '', layer).then(res => {
                messageFunList();
                if (window.message) {
                    window.message.reloadFun();
                }

            }).catch(err => {
                console.log(err)
                layer.msg('阅读消息失败', { icon: 2 })
            })
        };

        // 公告列表部分
        var noticeTableIns = null;
        function noticeFun() {
            noticeTableIns = table.render({
                elem: '#noticeTable',
                method: 'post',
                url: '/api/notices/getNoticeList',
                contentType: "application/json",
                headers: {
                    token: sessionStorage.token
                },
                cols: [[
                    { field: 'title', width: 210, title: '标题', align: 'center' },
                    {
                        field: 'attach_name', width: 150, title: '附件名', align: 'center', templet: function (d) {
                            return d.attach_name ? d.attach_name : '-'
                        }
                    },
                    {
                        field: 'attach_url', width: 320, title: '附件地址', align: 'center', templet: function (d) {
                            return d.attach_url ? d.attach_url : '-'
                        }
                    },
                    { field: 'create_user', width: 130, title: '创建人', align: 'center', },
                    {
                        field: 'create_time', width: 180, title: '创建时间', align: 'center', templet: function (d) {
                            return timeStamp(d.create_time)
                        }
                    },
                ]],
                id: 'noticeTableId',
                page: true,
                loading: true,
                request: {
                    'pageName': 'pageNum',
                    'limitName': 'pageSize'
                },
                where: {
                    // merchantId:Number(sessionStorage.machineID) 
                    n_status: 1,
                    is_show: 1
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
                    console.log(res)
                    noticeList = [];
                    res.data.forEach(item => {
                        if ((item.is_show == 1) && (item.n_status == 1)) {
                            noticeList.push(item);
                            noticeDrawing(noticeList)
                        }
                    })
                }
            })
        }
        noticeFun();

        // 更多
        $('.more').click(function () {
            popupShow('noticeContent', 'noticeBox')
        });
        // 点击遮罩关闭
        $('.noticeBox').click(function () {
            event.stopPropagation();
        });
        $('.noticeContent').click(function () {
            popupHide('noticeContent', 'noticeBox')
        });
        // 监听点击公告列表
        table.on('row(noticeTable)', function (obj) {
            console.log(obj)
            $('.previewContent .playHeader span').html(obj.data.title);
            $('.previewContent .previewBody .previewHtml').html(obj.data.content);
            $('.previeName span').html(obj.data.create_user)
            var noticeTime = timeStamp(obj.data.create_time)
            $('.previeTime span').html(noticeTime);
            if (obj.data.attach_name) {
                $('.downloadBtn').show();
                $('.downloadBtn a').attr('src', obj.data.attach_url)
                var dowArr = obj.data.attach_url.split('.');
                var dowName = dowArr[dowArr.length - 1]
                $('.downloadBtn a').attr('download', obj.data.attach_name + '.' + dowName);

            } else {
                $('.downloadBtn').hide();
            }
            popupShow('previewContent', 'previewBox')
        })
    });


    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            event.preventDefault(); //阻止默认刷新
            //  $(".iframe_show").attr("src",window.frames["iframe_show"].src);

        }
    });

    javascript: window.history.forward(1);
}
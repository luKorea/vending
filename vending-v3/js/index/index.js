//JavaScript代码区域
import '../../MyCss/indexCss/index.css'
import {navList} from '../../assets/public/navData.js'
window.onload = function () {   
    var userName = sessionStorage.username;
    $('#userLogin .userName').html(userName)
    var navStr = []; //判断tba选项卡有没有这个参数;
    layui.use(['layer', 'form', 'element', 'carousel'], function () {
        // 表单
        var layer = layui.layer,
            form = layui.form;
        // 选项卡
        // var element = layui.element;
        // 轮播图
        var carousel = layui.carousel;
        carousel.render({
            elem: '#test1'
            , width: '480px' //设置容器宽度
            , height: '25px'
            , arrow: 'none' //始终显示箭头
            , anim: 'updown' //切换动画方式
            , indicator: 'none'
            , interval: '2000'
        });

        var $ = layui.jquery
            , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

        //新增一个Tab项
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
            })
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
        var Indexs=null;
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
        //Hash地址的定位
        //   var layid = location.hash.replace(/^#test=/, '');
        //   console.log(layid)
        //   element.tabChange('test', layid);

        // element.on('tab(demo)', function (elem) {
        // 	location.hash = 'test=' + $(this).attr('lay-id');
        // });

        // tab nav 关联
        // $("body").delegate(".layui-tab-title li","click",function() {
        //     //或者$(this).childNodes[0].data
        //     var Len = $(".navClick").length;
        //     var Index;
        //     for(var i = 0; i < Len; i++) {
        //         if($(this).context.childNodes[0].data == $(".navClick").eq(i).text()) {
        //             Index = i;            
        //         }

        //     }
        //     // 左侧菜单初始化
        //     $('.layui-nav-item').removeClass('layui-nav-itemed');
        //     $(".navClick").eq(Index).parent().parent().parent().addClass('layui-nav-itemed');
        //     $(".navClick").parent().removeClass('layui-this');
        //     $(".navClick").eq(Index).parent().addClass('layui-this')
        // });


        // 点击导航分类，其他分类收起
        $('#nav .layui-nav-item>a').click(function () {
            $(this).parent().siblings().removeClass('layui-nav-itemed')
        });
        var socket;
        var socketFlag = true;
        function openSocket() {
            if (typeof (WebSocket) == "undefined") {
                console.log("您的浏览器不支持WebSocket");
            } else {
                console.log("您的浏览器支持WebSocket");
                //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
                //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
                //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
                //          var socketUrl="http://172.16.71.142:8086/push?machine=8fc9d742bd0772c6&message=123456";
                var socketUrl = `ws://119.29.104.217:8086/pushServer/${sessionStorage.UserId}`;
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
                    // console.log(msg.data);
                    var gainData = JSON.parse(msg.data)
                    //type 1角色编辑或者删除 2用户编辑
                    if (gainData.type == 1) {
                        console.log(gainData);
                        // layer.msg(gainData.data,{icon:7})
                        $('.sockotTitle p').html(gainData.data)
                        popupShow('socketCont', 'sockotBox');
                        setTimeout(()=>{
                            loginOut();
                        },3500)
                    } else if (gainData.type == 2) {
                        $('.sockotTitle p').html(gainData.data)
                        popupShow('socketCont', 'sockotBox');
                        setTimeout(()=>{
                            loginOut();
                        },3500)
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
            console.log(999)
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
        $('.determineBtn button').click(function(){
            popupHide('socketCont','sockotBox')
            loginOut();
        });



        permissionsFun('/api/role/findUserPermission', 'post', sessionStorage.token,layer).then(res => {
            // console.log(res.data)
            // 用户模块
          var userListFlag = res.data.some((item, index) => {
              return item.id == 408
            })
            userListFlag?$('.userListFlag').removeClass('hide'):$('.userListFlag').addClass('hide');
            var roleListFlag = res.data.some((item, index) => {
                return item.id == 407
              });
              roleListFlag?$('.roleListFlag').removeClass('hide'):$('.roleListFlag').addClass('hide');  
              (userListFlag||roleListFlag)?$('.userCont').removeClass('hide'):$('.userCont').addClass('hide');  
              //售货机模块
              var machineListFlag = res.data.some((item, index) => {
                return item.id == 413
              });
              machineListFlag?$('.machineListFlag').removeClass('hide').parents('.machineCont').removeClass('hide'):$('.machineListFlag').addClass('hide').parents('.machineCont').addClass('hide');
              //商品管理模块
              var goodsClassFlag = res.data.some((item, index) => {
                return item.id == 414
              });
              goodsClassFlag?$('.goodsClassFlag').removeClass('hide'):$('.goodsClassFlag').addClass('hide');  

              var goodsListFlag = res.data.some((item, index) => {
                return item.id == 409
              });
              goodsListFlag?$('.goodsListFlag').removeClass('hide'):$('.goodsListFlag').addClass('hide');

              var materialListFlag = res.data.some((item, index) => {
                return item.id == 410
              });
              materialListFlag?$('.materialListFlag').removeClass('hide'):$('.materialListFlag').addClass('hide');
              (goodsClassFlag||goodsListFlag||materialListFlag)?$('.goodsCont').removeClass('hide'):$('.goodsCont').addClass('hide');

            //   商户模块
            var merchantsListFlag = res.data.some((item, index) => {
                return item.id == 400
              });
              merchantsListFlag?$('.merchantsListFlag').removeClass('hide').parents('.merchantsCont').removeClass('hide'):$('.merchantsListFlag').addClass('hide').parents('.merchantsCont').addClass('hide');

              //账目模块
              var accountsListFlag = res.data.some((item, index) => {
                return item.id == 423
              });
              accountsListFlag?$('.accountsListFlag').removeClass('hide').parents('.accountsCont').removeClass('hide'):$('.accountsListFlag').addClass('hide').parents('.accountsCont').addClass('hide');

              //订单模块
              var orderListFlag = res.data.some((item, index) => {
                return item.id == 419
              });
              orderListFlag?$('.orderListFlag').removeClass('hide').parents('.orderCont').removeClass('hide'):$('.orderListFlag').addClass('hide').parents('.orderCont').addClass('hide');
              //广告模块
              var RMListFlag = res.data.some((item, index) => {
                return item.id == 412
              });
              RMListFlag?$('.RMListFlag').removeClass('hide'):$('.RMListFlag').addClass('hide');
              var ReListFlag = res.data.some((item, index) => {
                return item.id == 411
              });
              ReListFlag?$('.ReListFlag').removeClass('hide'):$('.ReListFlag').addClass('hide');
              (RMListFlag||ReListFlag)?$('.releaseCont').removeClass('hide'):$('.releaseCont').addClass('hide');
          }).catch(err => {
              console.log(err)
            layer.msg(err.message, { icon: 2 })
          })

    });
    

    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            event.preventDefault(); //阻止默认刷新
            //  $(".iframe_show").attr("src",window.frames["iframe_show"].src);

        }
    });

    javascript:window.history.forward(1);
}
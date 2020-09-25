import '../../MyCss/notice/message.scss';
layui.use(['table', 'form', 'layer',], function () {
    var table = layui.table,
    form = layui.form,
    layer = layui.layer,
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
    var massageTableIn=table.render({
        elem: '#massageTable',
        method: 'post',
        url: '/api/notices/getHistoryMsg',
        contentType: "application/json",
        headers: {
            token: sessionStorage.token
        },
        cols: [[
            { field: 'title', width: 200, title: '消息标题' },
            { field: 'create_user', width: 230, title: '创建人' },
            { field: 'create_time', width: 150, title: '创建时间', templet:function(d){
                if(d.create_time){
                    return timeStamp(d.create_time)
                }else{
                    return '-'
                }
            }},
            { field: 'operation', width: 200, title: '操作', toolbar: '#barDemo' },
        ]],
        id: 'noticeId',
        page: true,
        loading: true,
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
    })
})
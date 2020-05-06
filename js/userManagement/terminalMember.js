layui.use(['table', 'form'], function () {
    var table = layui.table;
    table.render({
        elem: '#demo'
        , cols: [[
            { field: 'userName', width: 130, title: '用户名' },
            { field: 'phone', width: 200, title: '手机号', sort: true },
            { field: 'card', width: 200, title: '身份证' },
            { field: 'addTime', width: 180, title: '创建时间', sort: true },
            { field: 'editTime', width: 180, title: '修改时间', sort: true },
            { field: 'wachat', width: 200, title: '是否绑定微信', style:' overflow: hidden;text-overflow: ellipsis;white-space: normal;word-break: break-all;'},
            { field: 'alplay', width: 200, title: '是否绑定支付宝', style:' overflow: hidden;text-overflow: ellipsis;white-space: normal;word-break: break-all;margin-left:5px'},
            { field: 'permissions', width: 135, title: '权限' },
            { field: 'operation', width: 135, title: '操作', toolbar: '#barDemo' }
        ]],
        data: [
            {
                userName: '22222222',
                phone: 'cs45121',
                card: '441203',
                addTime: '2020-04-30',
                editTime: '2020-04-30',
                wachat: 'oSpXos2WPD5LCrnPFZisxiyWA5pE',
                alplay: 'oSpXos2WPD5LCrnPFZisxiyWA5pE',
                permissions: '管理员权限',
                id:'1'

            },
            {
                userName: '22222222',
                phone: 'cs45121',
                card: '441203',
                addTime: '2020-04-30',
                editTime: '2020-04-30',
                wachat: 'oSpXos2WPD5LCrnPFZisxiyWA5pE',
                alplay: '',
                permissions: '管理员权限',
                id:'2'
            },
            {
                userName: '22222222',
                phone: 'cs45121',
                card: '441203',
                addTime: '2020-04-30',
                editTime: '2020-04-30',
                wachat: 'oSpXos2WPD5LCrnPFZisxiyWA5pE',
                alplay: '',
                permissions: '管理员权限',
                id:'3'
            }
        ]
        , id: 'tableId'
        , page: true
        , loading: true

    });
    // 监听操作
    var ClickIndexFlag=null;
    var valData=null;
    table.on('tool(test)', function (obj) {
        console.log(999)
        valData=obj.data;
        $('.anUp').slideUp();
        if(ClickIndexFlag!=valData.id){
            ClickIndexFlag=valData.id;
            $(this).siblings('.anUp').slideDown();
            // 编辑
            $('.GoodsInformation').click(function(){
                $('.editCont').fadeIn();
                $('.editBox').removeClass('margin0')
                $('.anUp').slideUp();
                ClickIndexFlag=null;
            });
            // 机器归属
            $('.previewDetails').click(function(){
                $('.machineCont').fadeIn();
                $('.machineBox').removeClass('margin0');
                $('.anUp').slideUp();
                ClickIndexFlag=null;
            })
        }else{
            ClickIndexFlag=null;
        }      
    });

    // 取消编辑
    $('.cancel-btn').click(function(){
        $('.editBox').addClass('margin0')
        $('.editCont').fadeOut();
    });
    // 机器所属关闭
    $('.machineHeader button').click(function(){
        $('.machineBox').addClass('margin0')
        $('.machineCont').fadeOut();
    })
})
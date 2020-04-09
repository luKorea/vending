layui.use('table', function () {
    var $ = layui.jquery;
    // $.post('http://172.16.68.199:8086/goods/findAll', { map: 1 }, function (res) {
    //     console.log(res)
    // })

    var table = layui.table;
    table.render({
        elem: '#tableTest'
        , cols: [[
            { field: 'username', width: 120, title: '图片' },
            { field: 'phone', width: 120, title: '商品名称' },
            { field: 'CreationTime', width: 120, title: '商品类型' },
            { field: 'amendTime', width: 120, title: '商品条码', },
            { field: 'operation', width: 120, title: '规格说明 ' },
            { field: 'addtime', width: 120, title: '零售价 ', sort: true },
            { field: 'operation', width: 120, title: '成本价 ', sort: true },
            { field: 'operation', width: 120, title: '会员价 ', sort: true },
            { field: 'operation', width: 120, title: '优惠价策略 ' },
            { field: 'operation', width: 120, title: '其他活动 ' },
            { field: 'operation', width: 130, title: '所属人 ' },
            { field: 'operation', width: 120, title: '商品状态 ' },
            { field: 'operation', position: 'absolute', right: 0, width: 200, title: '操作', toolbar: '#barDemo' }
        ]],
        data: [
            {addtime:'哈哈',username:1},
            {addtime:'嘻嘻',username:2}
        ]
        ,id:'tableId'
        , page:true
        ,loading:true
        
    });

      //监听排序事件 
      table.on('sort(test)', function(obj){ //注：sort 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        // console.log(obj.field); //当前排序的字段名
        // console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
        // console.log(this); //当前排序的 th 对象

        //尽管我们的 table 自带排序功能，但并没有请求服务端。
        //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
        table.reload('tableId', {
          initSort: obj 
        });

        layer.msg('服务端排序。 '+ obj.field + ' ' + obj.type);
      });
   
})
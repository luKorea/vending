layui.use(['table','form','layer'], function () {
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
            {addtime:'哈哈',username:1,id:'11'},
            {addtime:'嘻嘻',username:2,id:'22'},
            {addtime:'哈哈',username:3,id:'33'},
            {addtime:'嘻嘻',username:4,id:'44'},
            {addtime:'哈哈',username:5,id:'55'},
            {addtime:'嘻嘻',username:6,id:'66'},
            {addtime:'哈哈',username:7,id:'77'},
            {addtime:'嘻嘻',username:8,id:'88'},
            {addtime:'哈哈',username:9,id:'88'},
            {addtime:'嘻嘻',username:10,id:'99'},
            {addtime:'哈哈',username:11,id:'00'},
            {addtime:'嘻嘻',username:12,id:'333'},
            {addtime:'哈哈',username:13,id:'00'},
            {addtime:'嘻嘻',username:14,id:'123'},
            {addtime:'哈哈',username:15,id:'456'},
            {addtime:'嘻嘻',username:16,id:'789'},
            {addtime:'哈哈',username:17,id:'987'},
            {addtime:'嘻嘻',username:18,id:'897'}
        ]
        ,id:'tableId'
        , page:true
        ,loading:true
        // ,method:'post'
        // ,limits: [10,20,50]
        
    });

      //监听排序事件 
      table.on('sort(test)', function(obj){ //注：sort 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        // console.log(obj.field); //当前排序的字段名
        // console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
        // console.log(this); //当前排序的 th 对象

        //尽管我们的 table 自带排序功能，但并没有请求服务端。
        //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
        table.reload('tableId', {
          page:{
            // curr:1
          }
        });

        layer.msg('服务端排序。 '+ obj.field + ' ' + obj.type);
      });

      // 监听操作删除
      var indexFlag = null;
      var operationId=null;
      table.on('tool(test)', function(obj){
        var data = obj.data;
        console.log(data)
        if(obj.event === 'add'){ 
          $('.anUp').slideUp();
          if(indexFlag!=data.id){
            indexFlag=data.id
            $(this).siblings('.anUp').slideDown()
          }else{
            indexFlag=null;
          }   
        } else if(obj.event === 'delete'){
          layer.confirm('真的删除行么', function(index){
            
            obj.del();
            layer.close(index);
          });
          
        }else{
          console.log(obj)
        }
      });

      // 点击优惠事件
      $('.preferentialClick').click(function(){
          $('.anUp').slideUp();
          $('.preferential').fadeIn()
      })
    //  取消优惠按钮
    $('.cancel-btn').on('click',function(){
      $('.preferential').fadeOut();
      indexFlag=null;
    })
      
})
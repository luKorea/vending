// 公共方法

// 删除商品数据列表数据
// 传id
function Goodsdel(id, indexs, obj, index) {
    // index 1为自定义商品 2为自定义类目 3为通用商品 
    if(indexs==1){
        $.get(`/api/goods/deleteById`,{goods_Id:id},function(res){
            console.log(res)
            if(res.code==200){
                obj.del();
                    layer.close(index);
            }
        })
    }
    
}

// 商品查询封装
function upPreferential(tableIns){
    tableIns.reload({
      where: { //设定异步数据接口的额外参数，任意设
        aaaaaa: 'xxx'
        ,bbb: 'yyy'
        //…
      }
    })
  }
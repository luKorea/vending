// 公共方法

// 删除商品数据列表数据
// 传id
function Goodsdel(id, indexs, obj, index) {
  // index 1为自定义商品 2为自定义类目 3为通用商品 
  if (indexs == 1) {
    $.get(`/api/goods/deleteById`, { goods_Id: id }, function (res) {
      console.log(res)
      if (res.code == 200) {
        obj.del();
        layer.close(index);
      }
    })
  } else if (indexs == 2) {
    $.get(`/api/classify/deleteById`, { id }, function (res) {
      console.log(res)
      if (res.code == 200) {
        obj.del();
        layer.close(index);
        layer.msg('删除成功');
      } else {
        layer.msg('操作失败');
      }
    })
  }

}

// 商品查询封装
// tableIns --数据表格实例对象
//                                  1关键字 2商品类型ID 3状态ID 4开始价格 5结束价格
function upPreferential(tableIns, keyGoodsName, GoodsTypeID, stateId, startingPrice, closingPrice) {

  tableIns.reload({
    where: { //设定异步数据接口的额外参数，任意设     
      goods_name: keyGoodsName, //关键字
      classify_id: GoodsTypeID, //分类
      goods_Status: stateId, //商品状态
      startingPrice,  //开始价格
      closingPrice,   //结束价格
      //…
    }
  })
}
// 公共方法

// 删除商品数据列表数据
// 传id
var token=sessionStorage.token;
function Goodsdel(id, indexs, obj, index) {
  // index 1为自定义商品 2为自定义类目 3为通用商品 
  if (indexs == 1) {
    $.ajax({
      url:`/api/goods/deleteById`,
      type:'get',
      headers: {
        "Content-Type": "application/json",
        token,
      },
      data:{
        goods_Id: id
      },success:function(res){
        if (res.code == 200) {
          obj.del();
          layer.close(index);
        }else if(res.code==403){
          window.history.go(-1)
        }else{
          layer.msg(res.message);
        }
      }
    })
  } else if (indexs == 2) {
    $.ajax({
      type:'get',
      url:`/api/classify/deleteById`,
      headers: {
        "Content-Type": "application/json",
        token,
      },
      data:{
        id,
      },success:function(res){
        if (res.code == 200) {
              obj.del();
              layer.close(index);
              layer.msg('删除成功');
            }else if(res.code==403){
              window.history.go(-1)
            }  else {
              layer.msg(res.message);
            }
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
};
  // 编辑器添加网络视频
  // 点击提交
  //输入框父元素class名   编辑器
function insert(className, editClass) {
  // return $(`.${className} input[name="videoInput"]`).val();  
  if (editClass.txt.html().length > 11) {
    // console.log(addWangEditor.txt.html())
    editClass.txt.append(`<p>${$(`.${className} input[name="videoInput"]`).val()}</p>`);
    $('.videoTab').fadeOut();
    $(`.${className} input[name="videoInput"]`).val('')
  } else {
    editClass.txt.html(`<p>${$(`.${className} input[name="videoInput"]`).val()}</p>`);
    $('.videoTab').fadeOut();
    $(`.${className} input[name="videoInput"]`).val('')
  }
};

// tab切换下一步事件
function nextStep(before,after){
  $(`.${before}`).animate({
      left:-100+'%'
  },500);
  $(`.${after}`).animate({
      left:0
  },500);
};

// tab切换上一步
function onStep(before,after){
  $(`.${before}`).animate({
    left:100+'%'
},500);
$(`.${after}`).animate({
    left:0
},500);
}

// 弹窗显示
function popupShow(contnet,contnetChild){
  $(`.${contnet}`).fadeIn();
  $(`.${contnetChild}`).removeClass('margin0')
};
// 取消关闭弹窗
function popupHide(contnet,contnetChild){
  $(`.${contnetChild}`).addClass('margin0')
  $(`.${contnet}`).fadeOut();
};
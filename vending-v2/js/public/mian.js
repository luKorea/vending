// 公共方法

// 删除商品数据列表数据
// 传id
var token = sessionStorage.token;
var machineId=sessionStorage.machineID;
function Goodsdel(id, indexs, obj, index) {
  // index 1为自定义商品 2为自定义类目 3为通用商品 
  if (indexs == 1) {
    $.ajax({
      url: `/api/goods/deleteById`,
      type: 'get',
      headers: {
        "Content-Type": "application/json",
        token,
      },
      data: {
        goods_Id: id
      }, success: function (res) {
        if (res.code == 200) {
          obj.del();
          layer.close(index);
        } else if (res.code == 403) {
          window.history.go(-1)
        } else {
          layer.msg(res.message);
        }
      }
    })
  } else if (indexs == 2) {
    $.ajax({
      type: 'get',
      url: `/api/classify/deleteById`,
      headers: {
        "Content-Type": "application/json",
        token,
      },
      data: {
        id,
      }, success: function (res) {
        if (res.code == 200) {
          obj.del();
          layer.close(index);
          layer.msg('删除成功');
        } else if (res.code == 403) {
          window.parent.location.href = "../login/login.html";
        } else {
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
// function insert(className, editClass) {
//   console.log($(`.${className} input[name="videoInput"]`).val())
//   // return $(`.${className} input[name="videoInput"]`).val();  
//   if (editClass.txt.html().length > 11) {
//     // console.log(addWangEditor.txt.html())
//     editClass.txt.append(`<p>${$(`.${className} input[name="videoInput"]`).val()}</p>`);
//     $('.videoTab').fadeOut();
//     $(`.${className} input[name="videoInput"]`).val('')
//   } else {
//     editClass.txt.html(`<p>${$(`.${className} input[name="videoInput"]`).val()}</p>`);
//     $('.videoTab').fadeOut();
//     $(`.${className} input[name="videoInput"]`).val('')
//   }
// };

// tab切换下一步事件
function nextStep(before, after) {
  $(`.${before}`).animate({
    left: -100 + '%'
  }, 500);
  $(`.${after}`).animate({
    left: 0
  }, 500);
};

// tab切换上一步
function onStep(before, after) {
  $(`.${before}`).animate({
    left: 100 + '%'
  }, 500);
  $(`.${after}`).animate({
    left: 0
  }, 500);
}

// 弹窗显示
function popupShow(contnet, contnetChild) {
  $(`.${contnet}`).fadeIn();
  $(`.${contnetChild}`).removeClass('margin0')
};
// 取消关闭弹窗
function popupHide(contnet, contnetChild) {
  $(`.${contnetChild}`).addClass('margin0')
  $(`.${contnet}`).fadeOut();
};

function base64(file, element) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = reader.result;
    $(`${element}`).attr('src', img)
  }
}


// base64转化为file
function dataURLtoFile(dataurl, filename) {//将base64转换为文件
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

function phoneRegular(that) {
  var phone = $(that).val()
  if (phone) {
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      // alert("手机号码有误，请重填");  
      layer.msg('请填写正确的手机号码',{icon:7});
      $(that).val('')
      return false;
    }
  }
}


// 获取商户列表

// function merchantsListMian() {
//   var marchantsList = []
//   $.ajax({
//     type: 'post',
//     url: '/api/merchant/getMerchantList',
//     headers: {
//       token,
//       "Content-Type": "application/json",
//     },
//     async: false,
//     data: JSON.stringify({
//       pageNum: 1,
//       pageSize: 1000000
//     }),
//     success: function (res) {
//       if (res.code == 200) {
//         if (res.data.list.length > 0) {
//           res.data.list.forEach((item, index) => {
//             var marchantsObj = {
//               name: item.name,
//               id: item.id,
//               topMerchant:item.topMerchant
//             }
//             marchantsList.push(marchantsObj)
//           });
//         }
//       }
//     }
//   })
//   console.log(marchantsList)
//   return marchantsList
// };

// / 获取商户列表

function merchantsListMian(id) {
  var marchantsList = []
  $.ajax({
    type: 'post',
    url: '/api/merchant/getTopMerchant',
    headers: {
      token,
      "Content-Type": "application/json",
    },
    async: false,
    data:JSON.stringify({
      id,
    }),
    success: function (res) {
      if (res.code == 200) {
        marchantsList=res.data;
        if (res.data.length > 0) {
          marchantsList.forEach((item, index) => {
            if(item.id==item.topMerchant){
              marchantsList.splice(index,1);
              marchantsList.unshift(item)
            }
          });
        }
      }
    }
  })
  // console.log(marchantsList)
  return marchantsList
};


//ajax方法的封装
// function ajax(url,type,data,userToken){
//   return $.ajax({
//     type,
//     url,
//     data,
//     headers: {
//       token:userToken,
//       "Content-Type": "application/json",
//     },
//   })
// };

// 树装列表
function treeList(){
  var dataList=[]
  $.ajax({
    type:'post',
    url:'/api/merchant/getMerchantGroup',
    headers: {
      token,
      "Content-Type": "application/json",
    },
    async:false,
    data:JSON.stringify({
      topId:machineId
    }),
    success:function(res){
      if(res.code==200){
        var tree=res.data[0]
        var treeObj={
          id:tree.id,
          title:tree.name,
          children:[],
          spread:true
        }
        dataList.push(treeObj)
        tree.childMerchant.forEach((item,index)=>{
          var chidernObj={
            id:item.id,
            title:item.name,
            index,
          }
          dataList[0].children.push(chidernObj)
        })
        // console.log(data)
      }
    }
  })
  return dataList;
}



// 商户下拉框渲染
function mercantsSelectList( list, element, form,) {
  var merchantOption = ``;
  list.forEach((item, indx) => {
    merchantOption += `<option value="${item.id}">${item.name}</option>`
  });
  $(`.${element}`).empty();
  $(`.${element}`).html(merchantOption);
  form.render('select');
}


// 左侧商户列表
function leftMerchantsList(list, element) {
  var merchantsNameList = `<p style="margin:20px;color:#be954a;">商户</p>
  <div class="fixedAccount" mid="">
                          <span> 全部商户</span>
                      </div>`;
  list.forEach((item, index) => {
    merchantsNameList += `<div class="fixedAccount ${index!=0?'marginLeft':''}" mid="${item.id}" ">
                          <span> ${item.name}</span>
                      </div>`
  });
  $(`.${element}`).empty();
  $(`.${element}`).html(merchantsNameList);
}
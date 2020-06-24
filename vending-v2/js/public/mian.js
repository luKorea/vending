// 公共方法

// 删除商品数据列表数据
// 传id
var token = sessionStorage.token;
var machineId = sessionStorage.machineID;
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

function phoneRegular(that,layer) {
  var phone = $(that).val()
  if (phone) {
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      // alert("手机号码有误，请重填");  
      layer.msg('请填写正确的手机号码', { icon: 7 });
      $(that).val('')
      return false;
    }
  }
}
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
    data: JSON.stringify({
      id,
    }),
    success: function (res) {
      if (res.code == 200) {
        marchantsList = res.data;
        if (res.data.length > 0) {
          marchantsList.forEach((item, index) => {
            if (item.id == item.topMerchant) {
              marchantsList.splice(index, 1);
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



// 树装列表数据
function treeList() {
  var dataList = []
  $.ajax({
    type: 'post',
    url: '/api/merchant/getMerchantGroup',
    headers: {
      token,
      "Content-Type": "application/json",
    },
    async: false,
    data: JSON.stringify({
      topId: machineId
    }),
    success: function (res) {
      if (res.code == 200) {
        var tree = res.data[0]
        var treeObj = {
          id: tree.id,
          title: tree.name,
          children: [],
          spread: true
        }
        dataList.push(treeObj)
        tree.childMerchant.forEach((item, index) => {
          var chidernObj = {
            id: item.id,
            title: item.name,
            index,
          }
          dataList[0].children.push(chidernObj)
        })
        // console.log(data)
      }
    },
    error: function (err) {
      layer.msg('服务器超时', { icon: 2 });
      return;
    }
  })
  return dataList;
}
//树方法实列
function treeFun(tree, element, tableID, data, key) {
  tree.render({
    elem: `#${element}`,
    id: 'treelist',
    showLine: !0 //连接线
    ,
    onlyIconControl: true, //左侧图标控制展开收缩 
    data,
    text: {
      defaultNodeName: '无数据',
      none: '加载数据失败！'
    },
    click: function (obj) {
      sessionStorage.merchantIdData=obj.data.id;
      varData=obj.data.id;
      console.log(obj);
      tableID.reload({
        where: {
          [key]: obj.data.id+''
        }
      })
      var nodes = document.getElementsByClassName("layui-tree-txt");
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].innerHTML === obj.data.title)
          nodes[i].style.color = "#be954a";
        else
          nodes[i].style.color = "#555";
      }
      if (!obj.data.children) {
        $.ajax({
          type: 'post',
          url: '/api/merchant/getMerchantGroup',
          headers: {
            token,
            "Content-Type": "application/json",
          },
          async: false,
          data: JSON.stringify({
            topId: obj.data.id
          }),
          success: function (res) {
            if (res.code == 200) {
              if (res.data[0].childMerchant.length > 0) {
                obj.data.spread = true;
                obj.data.children = [];
                res.data[0].childMerchant.forEach((item, index) => {

                  var childrenObj = {
                    id: item.id,
                    title: item.name
                  }
                  obj.data.children.push(childrenObj)
                });
                tree.reload('treelist', {
                });
              }
            }
          }
        })

      }

    },
  });
}

// 树复选方法
function treeFunCheck(tree, element, tableID, data, key){
  tree.render({
    elem: `#${element}`,
    id: 'treelistCheck',
    showCheckbox:true,
    single:true,
    ckall:true,
    onlyIconControl: true, //左侧图标控制展开收缩 
    data,
    text: {
      defaultNodeName: '无数据',
      none: '加载数据失败！'
    },
    click: function (obj) {
      console.log(obj)
      var nodes = document.getElementsByClassName("layui-tree-txt");
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].innerHTML === obj.data.title)
          nodes[i].style.color = "#be954a";
        else
          nodes[i].style.color = "#555";
      }
      if (!obj.data.children) {
        $.ajax({
          type: 'post',
          url: '/api/merchant/getMerchantGroup',
          headers: {
            token,
            "Content-Type": "application/json",
          },
          async: false,
          data: JSON.stringify({
            topId: obj.data.id
          }),
          success: function (res) {
            if (res.code == 200) {
              if (res.data[0].childMerchant.length > 0) {
                console.log(res)
                obj.data.spread = true;
                obj.data.children = [];
                res.data[0].childMerchant.forEach((item, index) => {

                  var childrenObj = {
                    id: item.id,
                    title: item.name
                  }
                  obj.data.children.push(childrenObj)
                });
                tree.reload('treelistCheck', {
                });
              }
            }
          }
        })

      }
    },
    oncheck:function(obj){
      console.log(obj);

    }
  });
};

// 获取树选中id
function getChildNodes(treeNode, result) {
  for (var i in treeNode) {
      result.push(treeNode[i].id);
      result = getChildNodes(treeNode[i].children, result);
  }
  return result;
}
// 商户下拉框渲染
function mercantsSelectList(list, element, form,) {
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
    merchantsNameList += `<div class="fixedAccount ${index != 0 ? 'marginLeft' : ''}" mid="${item.id}" ">
                          <span> ${item.name}</span>
                      </div>`
  });
  $(`.${element}`).empty();
  $(`.${element}`).html(merchantsNameList);
}


//ajax方法的封装 callback, reject
function ajaxFun(url, type, data, userToken) {
  return $.ajax({
    type,
    url,
    data,
    headers: {
      token: userToken,
      "Content-Type": "application/json",
    },
    // success:function(res){
    //   callback(res)
    // },
    // error:function(err){
    //   alert(1)
    //   reject(err)
    // }
  })
};
// ajax('/api/merchant/getTopMerchant','post',JSON.stringify({id:''}),token).done(function(res){
//   console.log(res)
// }).fail(function(err){
//   console.log(err)
// })
function loadingAjax(url, type, data, userToken, mask, element, elementChild, layer) {
  return new Promise(function (resolve, reject) {
    ajaxFun(url, type, data, userToken, resolve, reject).then(function (res) {
      console.log(res);
      if (res.code == 200) {
        if (mask) {
          $('.mask').fadeOut();
          $('.maskSpan').removeClass('maskIcon');
        }
        if (element) {
          popupHide(element, elementChild)
        }
        // callback
        resolve(res)
      } else if (res.code == 403) {
        // return ;
        window.parent.location.href = "../login/login.html";
      } else {
        // return $.Deferred().reject(res.message);
        reject(res)
      }
    }).catch(function (err) {
      if (mask) {
        $('.mask').fadeOut();
        $('.maskSpan').removeClass('maskIcon');
      }
      layer.msg('服务器请求超时', { icon: 2 })
      return;
    })
  })
  // return ajaxFun(url,type,data,userToken).then(function(res){
  //   console.log(res)
  //    if(res.code==200){
  //       if(mask){
  //         $('.mask').fadeOut();
  //        $('.maskSpan').removeClass('maskIcon');
  //       }
  //       if(element){
  //         popupHide(element,elementChild)
  //       }
  //       callback
  //       return res.data;
  //   }
  //   // else if(res.code==403){
  //   //   return ;
  //   //   window.parent.location.href = "../login/login.html";
  //   // }
  //   else{
  //     // return $.Deferred().reject(res.message);
  //   }
  // }),function(err){
  //   if(mask){
  //     $('.mask').fadeOut();
  //    $('.maskSpan').removeClass('maskIcon');
  //   }
  //   if(element){
  //     popupHide(element,elementChild)
  //   }
  //   layer.msg('服务器请求超时',{icon:7})
  // }
}
// loadingAjax('/api/merchant/a', 'post', JSON.stringify({ id: '' }), token).then(function (res) {
//   // console.log(done)
//   console.log(res)
// }).catch(function (err) {
//   console.log(err)
// })


//查询方法
function KeyQueryFun(tableList, data) {
  tableList.reload({
    where: data
  })
};

//数据表格选择判断

function dataJudgeLength(checkStatusID, table, data) {
  var checkStatusList = table.checkStatus('checkStatusID');
  if (checkStatusList.data.length > 0) {
    data = checkStatusList.data;
  } else return false;
  // {
  //   // layer.msg('请选择',{icon:7})

  // }
}
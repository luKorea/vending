// 公共方法
document.write("<script type='text/javascript' src='../assets/public/jquery.animateNumber.min.js'></script>");
// 删除商品数据列表数据
// 传id
var token = sessionStorage.token;
var machineId = sessionStorage.machineID;
function Goodsdel(id, indexs, obj, index, tableID, classTag) {
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
          layer.msg(res.message, { icon: 1 });
          loadingAjax('/api/refreshGoods', 'post', '', sessionStorage.token).then(res => { }).catch(err => { })
        } else if (res.code == 403) {
          window.parent.location.href = "login.html";
        } else {
          layer.msg(res.message, { icon: 2 });
        }
      }
    })
  } else if (indexs == 2) {
    $.ajax({
      type: 'post',
      url: `/api/classify/deleteById`,
      headers: {
        "Content-Type": "application/json",
        token,
      },
      data: JSON.stringify({
        id: id.classifyId,
        rank: id.rank,
        merchantId: classTag
      }),
      success: function (res) {
        if (res.code == 200) {
          obj.del();
          layer.close(index);
          layer.msg('删除成功', { icon: 1 });
          tableID.reload({
            where: {}
          });
          loadingAjax('/api/refreshGoods', 'post', '', sessionStorage.token).then(res => { }).catch(err => { })
        } else if (res.code == 403) {
          window.parent.location.href = "login.html";
        } else {
          layer.msg(res.message, { icon: 2 });
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
      conditionTwo: keyGoodsName, //关键字
      conditionThree: GoodsTypeID, //分类
      conditionFour: stateId, //商品状态
      conditionFive: startingPrice,  //开始价格
      conditionSix: closingPrice,   //结束价格
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

function phoneRegular(that, layer) {
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

// 密码正则
function passRegular(that, layer) {
  var reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,64}$/;
  var passwork = $(that).val();
  if (passwork) {
    if (!(reg.test(passwork))) {
      layer.msg('密码必须包含英文和数字以及特殊字符且不少于6位数', { icon: 7 });
      $(that).val('')
      return false;
    }
  }
};
// 检测中文正则
function ChineseREgular(that, layer) {
  var reg = /[\u4E00-\u9FA5]/g;
  if ($(that).val()) {
    if (reg.test($(that).val())) {
      layer.msg('用户名不能含中文', { icon: 7 });
      $(that).val('')
      return false;
    }
  }
};
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
function treeList(marchantName) {
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
        // var tree = res.data[0]
        // var treeObj = {
        //   id: tree.id,
        //   title: tree.name,
        //   children: [],
        //   spread: true
        // }
        // dataList.push(treeObj)
        // tree.childMerchant.forEach((item, index) => {
        //   var chidernObj = {
        //     id: item.id,
        //     title: item.name,
        //     index,
        //   }
        //   dataList[0].children.push(chidernObj)
        // })
        // console.log(data)
        dataList.push(res.data[0])
        if (marchantName) {
          sessionStorage.marchantName = res.data[0].title;
        }
      } else if (res.code == 403) {
        window.parent.location.href = "login.html";
      }
      // dataList=res.data[0]
    },
    error: function (err) {
      layer.msg('服务器请求超时', { icon: 2 });
      return;
    }
  })
  // console.log(JSON.stringify(dataList))
  return dataList;
}
//树方法实列
function treeFun(tree, element, tableID, data, key, goodsCLass, selectData, conditionThree, flag) {
  tree.render({
    elem: `#${element}`,
    id: 'treelist',
    showLine: !0 //连接线
    ,
    onlyIconControl: true, //左侧图标控制展开收缩 
    data,
    spread: true,
    text: {
      defaultNodeName: '无数据',
      none: '您没有权限，请联系管理员授权!'
    },
    click: function (obj) {
      if (goodsCLass) {
        selectData(obj.data.id + '');
      }
      if (flag) {
        sessionStorage.classTag = obj.data.id,
        sessionStorage.machineGoodsId=obj.data.id
      }
      // sessionStorage.merchantIdData = obj.data.id;
      varData = obj.data.id;
      console.log(obj);
      tableID.reload({
        where: {
          [key]: obj.data.id + '',
          [conditionThree ? conditionThree : ' ']: '0',
          [conditionThree ? 'condition' : ' ']: ''
        }
      })
      var nodes = $(`#${element} .layui-tree-txt`)
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].innerHTML === obj.data.title)
          nodes[i].style.color = "#be954a";
        else
          nodes[i].style.color = "#555";
      }
      // if (!obj.data.children) {
      //   $.ajax({
      //     type: 'post',
      //     url: '/api/merchant/getMerchantGroup',
      //     headers: {
      //       token,
      //       "Content-Type": "application/json",
      //     },
      //     async: false,
      //     data: JSON.stringify({
      //       topId: obj.data.id
      //     }),
      //     success: function (res) {
      //       if (res.code == 200) {
      //         if (res.data[0].childMerchant.length > 0) {
      //           obj.data.spread = true;
      //           obj.data.children = [];
      //           res.data[0].childMerchant.forEach((item, index) => {

      //             var childrenObj = {
      //               id: item.id,
      //               title: item.name
      //             }
      //             obj.data.children.push(childrenObj)
      //           });
      //           tree.reload('treelist', {
      //           });
      //         }
      //       }
      //     }
      //   })

      // }

    },
  });
}

// 树复选方法
function treeFunCheck(tree, element, tableID, data, key, layer) {
  tree.render({
    elem: `#${element}`,
    id: 'treelistCheck',
    showCheckbox: true,
    single: true,
    ckall: true,
    onlyIconControl: true, //左侧图标控制展开收缩 
    data,
    text: {
      defaultNodeName: '无数据',
      none: '您没有权限，请联系管理员授权!'
    },
    click: function (obj) {
      // console.log(obj)
      var nodes = $(`#${element} .layui-tree-txt`)
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
          }, error: function (err) {
            layer.msg('服务器请求超时', { icon: 2 })
          }
        })

      }
    },
    oncheck: function (obj) {
      console.log(obj.data); //得到当前点击的节点数据
      console.log(obj.checked); //得到当前节点的展开状态：open、close、normal
      console.log(obj.elem); //得到当前节点元素

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
function mercantsSelectList(list, element, form) {
  var merchantOption = ``;
  list.forEach((item, indx) => {
    merchantOption += `<option value="${item.id}" >${item.name}</option>`
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
    timeout: 10000,
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
    ajaxFun(url, type, data, userToken, resolve, reject).then((res) => {
      if (mask) {
        $('.mask').fadeOut();
        $('.maskSpan').removeClass('maskIcon');
      }
      if (res.code == 200) {
        if (element) {
          popupHide(element, elementChild)
        }
        // callback
        resolve(res)
      } else if (res.code == 403) {
        // return ;
        window.parent.location.href = "login.html";
      } else {
        // return $.Deferred().reject(res.message);
        reject(res);
      }
    }).catch((err) => {
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
  //   //   window.parent.location.href = "login.html";
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

// 监听f5刷新
function f5Fun() {
  event.preventDefault(); //阻止默认刷新
  //location.reload();
  //采用location.reload()在火狐下可能会有问题，火狐会保留上一次链接
  location = location;

}

function treeFunMaterial(tree, element, tableID, data, key, id, index) {
  tree.render({
    elem: `#${element}`,
    id,
    showLine: !0 //连接线
    ,
    onlyIconControl: true, //左侧图标控制展开收缩 
    data,
    text: {
      defaultNodeName: '无数据',
      none: '您没有权限，请联系管理员授权!'
    },
    click: function (obj) {
      if (index == 1) {
        // sessionStorage.merchantIdData = obj.data.id;
        sessionStorage.acconutsID = obj.data.id;
      }
      // else {
      //   //账目商户id

      // }


      varData = obj.data.id;
      console.log(obj);
      tableID.reload({
        where: {
          [key]: index != 1 ? obj.data.id + '' : obj.data.id,
        }
      })
      // var nodes = document.getElementsByClassName("layui-tree-txt");
      var nodes = $(`#${element} .layui-tree-txt`)
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].innerHTML === obj.data.title)
          nodes[i].style.color = "#be954a";
        else
          nodes[i].style.color = "#555";
      }
    },
  });
}

// 数字变化函数
function animateNumberFun(ele, num, type) {
  console.log(num)
  $(ele).animateNumber(
    {
      number: num,
      numberStep: function (now, tween) {
        var floored_number = Number(now.toFixed(2)),
          target = $(tween.elem);
        var c = (floored_number.toString().indexOf('.') !== -1) ? floored_number.toLocaleString() : floored_number.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        var str = c.split('.');
        if (type == 1) {
          if (str.length == 1) { c = c + '.00'; } else { if (str[1].length == 1) { c = c + '0'; } }
        }
        target.text(c);
      }
    },
    500
  )
}
function numFormat1(num) {
        var oldNum = num;
        num = Number(Number(num).toFixed(2));
        if (!isNaN(num)) {
            var c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            var str = c.split(".");
    // console.log(str)
            if (str.length == 1) { c = c + '.00'; } else { if (str[1].length == 1) { c = c + '0'; } }
            return c;
        } else {
            return oldNum;
        }

    }
//获取用户权限
function permissionsFun(url, type, userToken, layer) {
  return new Promise(function (resolve, reject) {
    ajaxFun(url, type, '', userToken, resolve, reject).then(res => {
      if (res.code == 200) {
        resolve(res)
      } else if (res.code == 403) {
        window.parent.location.href = "login.html";
      } else {
        reject(res)
      }
    }).catch((err) => {
      layer.msg('服务器请求超时', { icon: 2 })
      return;
    })
  })
}
//权限判断
async function permissionsVal(addIndex, editIndex, delIndex,four,five) {
  var dataFlag = {
    addFlag: false,
    editFlag: false,
    delFlag: false,
    fourFlag:false,
    fiveFlag:false,
  }
  await permissionsFun('/api/role/findUserPermission', 'post', sessionStorage.token,layer).then(res => {
    // console.log(res.data)
    dataFlag.addFlag = res.data.some((item, index) => {
      return item.id == addIndex
    });
    dataFlag.editFlag = res.data.some((item, index) => {
      return item.id == editIndex
    });
    dataFlag.delFlag = res.data.some((item, index) => {
      return item.id == delIndex
    })
    dataFlag.fourFlag = res.data.some((item, index) => {
      return item.id == four
    })
    dataFlag.fiveFlag = res.data.some((item, index) => {
      return item.id == five
    })
  }).catch(err => {
    // layer.msg(err.message, { icon: 2 })
  })
  return dataFlag
}


// 时间戳转时间问题
function timeStamp(time){
  // var myDate = new Date(time);
  // var y = myDate.getFullYear();
  // var m = myDate.getMonth() + 1;
  // var d = myDate.getDate();
  // var h = myDate.getHours();
  // var min = myDate.getMinutes();
  // var s = myDate.getSeconds();
  // return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
  var myDate = new Date(time);
  var y = myDate.getFullYear();
  var m = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
  var d = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
  var h = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
  var min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
  var s = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
  return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
}
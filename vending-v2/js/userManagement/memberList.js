layui.use(['table', 'form', 'layer', 'tree', 'util'], function () {
  var $ = layui.jquery;
  var table = layui.table;
  var layer = layui.layer,
    layer = layui.layer,
    util = layui.util,
    tree = layui.tree
  var token = sessionStorage.token;
  var d = JSON.stringify({
    'pageName': 'pageNum',
    'limitName': 'pageSize'
  })
  var tableIns = table.render({
    elem: '#tableTest',
    url: `/api/user/findUser`,
    method: 'post',
    contentType: "application/json",
    headers: {
      token,
    },
    cols: [[
      { field: 'userName', width: 180, title: '用户名' },
      { field: 'name', width: 150, title: '姓名' },
      { field: 'phone', width: 150, title: '手机号' },
      { field: 'merchantName', width: 150, title: '所属商户' },
      { field: '1', width: 150, title: '创建人', },
      { field: 'addTime', width: 180, title: '创建时间', sort: true },
      { field: '1', width: 150, title: '最后操作人', },
      { field: 'lastTime', width: 180, title: '最后操作时间', sort: true },
      {
        field: 'open', width: 150, title: '状态', templet: function (d) {
          return d.open == 0 ? '不启用' : '启用'
        }
      },
      {
        field: 'roleSign', width: 100, title: '终端管理员', templet: function (d) {
          return d.roleSign == 0 ? '否' : '是'
        }
      },
      { field: 'operation', fixed: 'right', right: 0, width: 230, title: '操作', toolbar: '#barDemo' },
    ]]
    , id: 'tableId'
    , page: true
    , loading: true
    // ,method:'post'
    , limits: [10, 20, 50]
    ,
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
        window.parent.location.href = "../login/login.html";
      }
      else {
        return {
          "code": res.code, //解析接口状态
          "msg": res.msg,   //解析提示文本
        }
      }

    },
    response: {
      statusCode: 200 //规定成功的状态码，默认：0
    },
    done: function (res) {
      if (res.code == 403) {

      }
    }
  });
  var uuID = null;

  // 查询
  $('.queryBtnClick ').click(function () {
    tableIns.reload({
      where: {
        conditionTwo: $('.mian input[name="keyMerchants"]').val(),
        // condition:2
      }
    })
  })
  //监听工具条
  table.on('tool(test)', function (obj) {
    var data = obj.data;
    uuID = data.uuid;
    console.log(data)
    if (obj.event === 'edit') {
      // layer.msg('ID：' + data.uuid + ' 的查看操作');
      // 点击编辑事件
      $('.OperationHeader span').html('编辑用户')
      informationType = $(this).attr('typeID');
      console.log(informationType)
      // $('.MemberOperation').fadeIn();
      popupShow('MemberOperation', 'MemberContent');
      mercantsSelectList(merchantsListData, 'marchantsList', form);
      form.val("information", {
        "userName": data.userName,
        "name": data.name,
        "userPwd": '      ',
        "DuserPwd": '      ',
        "alonePwd": '      ',
        'DalonePwd': '      ',
        "phone": data.phone,
        "cardId": data.cardId,
        "startThe": data.open ? 'on' : '',
        "administrator": data.roleSign ? 'on' : '',
        "marchantsListname": data.merchantId
      })
      form.render('select');
      userRoles(roleList, 'checkCont', data);
    } else if (obj.event === 'delete') {

      layer.confirm('确定删除？', function (index) {
        $.ajax({
          type: 'get',
          url: `/api/user/deleteById`,
          headers: {
            token,
          },
          data: {
            id: data.uuid + ''
          },
          success: function (res) {
            if (res.code == 200) {
              layer.msg(res.message);
              obj.del();
              layer.close(index);
            } else if (res.code == 403) {
              window.parent.location.href = "../login/login.html";
            } else {
              layer.msg(res.message);
            }
          }
        });
      });
    }
  });

  var form = layui.form;

  var informationType = null;
  // type 'add' edit 
  //点击添加成员事件
  $('.addBtn').click(function () {
    // $('.mask').fadeIn();
    // $('.maskSpan').addClass('maskIcon')
    popupShow('MemberOperation', 'MemberContent')
    informationType = $(this).attr('typeID');
    uuID = null;
    $('.OperationHeader span').html('添加用户')
    mercantsSelectList(merchantsListData, 'marchantsList', form);
    form.val("information", {
      "userName": '',
      "name": '',
      "userPwd": '',
      "alonePwd": '',
      "phone": '',
      "cardId": '',
      'marchantsListname': ''
    });
    form.render('select');
    $('.checkCont').empty();
    $('.roleCont').hide();



  });
  // 取消事件
  $('.cancel_btn').click(function () {
    // $('.MemberOperation').fadeOut();
    popupHide('MemberOperation', 'MemberContent')
  });

  // 提交事件
  $('.submit_btn').click(function () {
    var informData = form.val("information");
    var urlApi = null;
    // 添加
    // console.log(form.val("checkboxData"));

    if (!(informData.userName && informData.name && informData.userPwd && informData.alonePwd && informData.phone && informData.marchantsListname)) {
      layer.msg('带*为必填', { icon: 7 });
      return;
    }
    if (!(informData.userName && informData.name && informData.phone && informData.marchantsListname)) {
      layer.msg('带*为必填', { icon: 7 });
      return;
    }
    if (!(informData.DuserPwd == informData.userPwd)) {
      layer.msg('登录密码不一致', { icon: 7 });
      return;
    }
    if (!(informData.alonePwd == informData.DalonePwd)) {
      layer.msg('独立密码不一致', { icon: 7 });
      return;
    }
    $('.mask').fadeIn();
    $('.maskSpan').addClass('maskIcon')
    if (informationType == '1') {
      urlApi = '/api/user/saveUser'
      // 修改
    } else {
      urlApi = '/api/user/updateUser';
      var roleLIstData = form.val("checkboxData");
      var roleListArray = [];
      for (let i in roleLIstData) {
        roleListArray.push(Number(roleLIstData[i]))
      }
      console.log(roleListArray);
    }

    var openStart = informData.startThe ? 1 : 0;
    var roleSignStart = informData.administrator ? 1 : 0;
    console.log(informData)
    setTimeout(() => {
      if (urlApi) {
        $.ajax({
          type: 'post',
          url: urlApi,
          headers: {
            "Content-Type": "application/json",
            token,
          },
          data: JSON.stringify({
            uid: uuID,
            username: informData.userName,
            name: informData.name,
            userPwd: informData.userPwd != '      ' ? informData.userPwd : '',
            alonePwd: informData.alonePwd != '      ' ? informData.alonePwd : '',
            phone: informData.phone,
            cardId: informData.cardId,
            open: openStart,
            roleSign: roleSignStart,
            roleId: informationType == 2 ? roleListArray : null,
            merchantId: Number(informData.marchantsListname)
          }),
          success: function (res) {
            $('.mask').fadeOut();
            $('.maskSpan').removeClass('maskIcon')
            console.log(res)
            if (res.code == 200) {
              tableIns.reload({
                where: {

                }
              });
              form.val("information", {
                "userName": '',
                "name": '',
                "userPwd": '',
                "alonePwd": '',
                "phone": '',
                "cardId": '',
              })
              $('.MemberOperation').fadeOut();
              layer.msg(res.message, { icon: 1 })
            } else if (res.code == 403) {
              window.parent.location.href = "../login/login.html";
            } else {
              layer.msg(res.message, { icon: 2 })
            }
          }
        })
      }
    }, 1000)

  })
  $('.listInput input[name="phone"]').blur(function () {
    var phone = $(this).val();
    if (phone) {
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        // alert("手机号码有误，请重填");  
        layer.msg('请填写正确的手机号码');
        $(this).val('')
        return false;
      }
    }

  });

  // 监听终端权限
  //   form.on('checkbox(permissions)', function(data){
  //     console.log(data.elem.checked); //是否被选中，true或者false
  //     console.log(data.value); //复选框value值，也可以通过data.elem.value得到
  // //     form.val("information", {
  // //       "aaacc":true
  // // });
  // // var data1 = form.val("information");
  // // console.log(data1)
  //     if(data.elem.checked){
  //       form.val("information",{
  //         "Goods":true,
  //         "Aisle":true,
  //         "Advertising":true,
  //         "Wifi":true
  //       });
  //       $('.checkCont .checkboxList').prop('disabled',true);
  //       form.render();
  //     }else{
  //       form.val("information",{
  //         "Goods":false,
  //         "Aisle":false,
  //         "Advertising":false,
  //         "Wifi":false
  //       });
  //       // $('.checkCont .checkboxList').attr('disabled')=false;
  //       $('.checkCont .checkboxList').prop("disabled",'');
  //       form.render();
  //     }
  //   }); 
  // 角色列表
  var roleList = null;
  $.ajax({
    type: 'post',
    headers: {
      "Content-Type": "application/json",
      token,
    },
    url: '/api/role/findRole',
    data: JSON.stringify({
      pageNum: 1,
      pageSize: 1000
    }),
    success: function (res) {
      console.log(res)
      if (res.code == 200) {
        roleList = res.data.list;
      }
    }
  })
  // 渲染用户角色
  function userRoles(list, elements, trueList) {
    var userList = '';
    list.forEach((ele, index) => {
      userList += `<div>
                     <input type="checkbox"  name="${ele.id}" title="${ele.name}"lay-skin="primary" value="${ele.id}"></input>
                   </div>`
    });
    $(`.${elements}`).empty();
    $(`.${elements}`).html(userList);
    $('.roleCont').show();
    trueList.roles.forEach((item, index) => {
      for (var i = 0; i < list.length; i++) {
        if (item.id == list[i].id) {
          $(`.${elements} input`).eq(i).prop('checked', true)
        }
      }
    })
    form.render('checkbox');
  }

  // 获取商户列表
  var merchantsListData = merchantsListMian('');
  // 左侧商户列表
  // leftMerchantsList(merchantsListData,'accountContnet');
  // $('.fixedAccount').click(function(){
  //   // alert($(this).attr('mid'))
  //   $('.fixedAccount').removeClass('active');
  //   $(this).addClass('active')
  //   tableIns.reload({
  //     where:{
  //       condition:$(this).attr('mid')?Number($(this).attr('mid')):''
  //     }
  //   })
  // })

  // 左边商户列表显示隐藏事件
  $('.sidebar i').click(function () {
    $('.left-mian').hide()
    $('.onLeft').show()
  });
  $('.onLeft').click(function () {
    $(this).hide();
    $('.left-mian').show()
  })





  //树状图
  var dataList = treeList();
  var inst1 = tree.render({
    elem: '#test1',
    id: 'treelist',
    showLine: !0 //连接线
    ,
    onlyIconControl: true //左侧图标控制展开收缩
    ,
    isJump: !1 //弹出新窗口跳转
    ,
    edit: false //开启节点的操作
    ,
    data: dataList,
    text: {
      defaultNodeName: '无数据',
      none: '加载数据失败！'
    },
    click: function (obj) {
      console.log(obj);
      tableIns.reload({
        where: {
          condition: obj.data.id
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
                tree.reload('treelist', {

                });
              }
            }
          }
        })

      }

    },
  });
  // 刷新页面
  $('.refreshBtn').click(function () {
    location.reload();
  })
});
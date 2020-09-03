import '../../MyCss/userManagement/memberList.css'
layui.use(['table', 'form', 'layer', 'tree', 'util'], function () {
  var table = layui.table;
  var layer = layui.layer,
    layer = layui.layer,
    util = layui.util,
    tree = layui.tree
  var token = sessionStorage.token,
    UserId = sessionStorage.UserId,
    tableIns = table.render({
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
        {
          field: 'open', width: 150, title: '状态', templet: function (d) {
            return d.open == 0 ? '不启用' : '启用'
          }
        },
        {
          field: 'roleSign', width: 150, title: '终端管理员', templet: function (d) {
            return d.roleSign == 0 ? '否' : '是'
          }
        },
        { field: 'alias', width: 200, title: '用户编号' },
        { field: 'phone', width: 150, title: '手机号' },
        { field: 'merchantName', width: 150, title: '所属商户' },
       
        { field: 'addUser', width: 150, title: '创建人', },
        { field: 'addTime', width: 180, title: '创建时间' },
        { field: 'lastUser', width: 150, title: '最后修改人', },
        { field: 'lastTime', width: 180, title: '最后修改时间'},

        { field: 'operation', fixed: 'right', right: 0, width: 250, title: '操作', toolbar: '#barDemo' },
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
      where: {
        condition: sessionStorage.machineID
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
          window.parent.location.href = "login.html";
        }
        else {
          return {
            "code": res.code, //解析接口状态
            "msg": res.message,   //解析提示文本
          }
        }

      },
      response: {
        statusCode: 200 //规定成功的状态码，默认：0
      },
      done: function (res) {
        permissions();
        if (res.code == 405) {
          $('.hangContent').show();
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
  });
  //监听工具条
  var memData=null;
  table.on('tool(test)', function (obj) {
    var data = obj.data;
    memData=obj.data;
    console.log(obj)
    uuID = data.uuid;
    if (obj.event === 'edit') {
      if (addEditData.length == 0) {
        layer.msg('服务器请求超时', { icon: 7 });
        return;
      }
      if (data.userName == 'sysadmin') {
        $('.switchListStatus').hide();
      } else {
        $('.switchListStatus').show();
      }
      $('.inputWidth input[name="userName"]').prop('disabled', true);
      $('.treeTest').show();
      // layer.msg('ID：' + data.uuid + ' 的查看操作');
      // 点击编辑事件
      $('.OperationHeader span').html('编辑用户')
      informationType = $(this).attr('typeID');
      // $('.MemberOperation').fadeIn();
      popupShow('MemberOperation', 'MemberContent');
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
        "marchantsListname": data.merchantName
      });
      tree.reload('treelistEdit', {
      });
      $('.terminal input[name="topmachantsVal"]').val(data.merchantId);
      form.render('select');
      userRoles(roleList, 'checkCont', data, data.merchantId);
    } else if (obj.event === 'delete') {
      layer.confirm('确定删除？', function (index) {
        $.ajax({
          type: 'get',
          url: `/api/user/deleteById`,
          headers: {
            token,
          },
          data: {
            id: Number(data.uuid),
          },
          success: function (res) {
            if (res.code == 200) {
              layer.msg(res.message, { icon: 1 });
              obj.del();
              layer.close(index);
              socketFun(data.uuid)
            } else if (res.code == 403) {
              window.parent.location.href = "login.html";
            } else {
              layer.msg(res.message, { icon: 2 });
            }
          }
        });
      });
    } else if (obj.event === 'role') {
      if (data.roles.length == 0) {
        layer.msg('该用户没有配置角色', { icon: 7 });
        return;
      }
      var RoleListText = '';
      data.roles.forEach((item, index) => {
        RoleListText += `<p>${item.name}</p>`
      });
      $('.RoleListBody>div').empty();
      $('.RoleListBody>div').html(RoleListText)
      popupShow('roleContList', 'RoleListBox')
    } else if (obj.event == 'Status') {
      layer.confirm(data.open == 1 ? '确定禁用？' : '确定启用？', function (index) {
        var status = data.open == 1 ? 0 : 1;
        layer.close(index);
        var statusData = JSON.stringify({
          id: data.uuid,
          status,
        })
        loadingAjax('/api/user/switchById', 'post', statusData, sessionStorage.token, '', '', '', layer).then((res) => {
          layer.msg(res.message, { icon: 1 });
          tableIns.reload({
            where: {}
          })
          if (status == 0) {
            socketFun(data.uuid)
          }
        }).catch((err) => {
          layer.msg(err.message, { icon: 7 })
        })
      });

    }
  });

  var form = layui.form;

  var informationType = null;
  // type 'add' edit 
  //点击添加成员事件
  $('.addBtn').click(function () {
    if (addEditData.length == 0) {
      layer.msg('服务器请求超时', { icon: 7 });
      return;
    }
    tree.reload('treelistEdit', {
    });
    $('.inputWidth input[name="userName"]').prop('disabled', false);
    $('.treeTest').hide();
    // $('.mask').fadeIn();
    // $('.maskSpan').addClass('maskIcon')
    popupShow('MemberOperation', 'MemberContent')
    informationType = $(this).attr('typeID');
    uuID = null;
    $('.OperationHeader span').html('添加用户')
    form.val("information", {
      "userName": '',
      "name": '',
      "userPwd": '',
      "alonePwd": '',
      "phone": '',
      "cardId": '',
      // 'marchantsListname': '',
      'DalonePwd': '',
      "DuserPwd": '',
      // 'topmachantsVal': '',
    });
    // form.render('select');
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
    var aliasText = null;
    merchantsListData.forEach((item, index) => {
      if (informData.topmachantsVal == item.id) {
        aliasText = item.alias
      }
    })
    var openStart = informData.startThe ? 1 : 0;
    var roleSignStart = informData.administrator ? 1 : 0;
    console.log(informData)
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
          userPwd: informData.userPwd != '      ' ? hex_md5(informData.userPwd) : '',
          alonePwd: informData.alonePwd != '      ' ? hex_md5(informData.alonePwd) : '',
          phone: informData.phone,
          cardId: informData.cardId,
          open: openStart,
          roleSign: roleSignStart,
          roleId: informationType == 2 ? roleListArray : null,
          merchantId: Number(informData.topmachantsVal),
          alias: aliasText
        }),
        success: function (res) {
          $('.mask').fadeOut();
          $('.maskSpan').removeClass('maskIcon')
          console.log(res)
          if (res.code == 200) {
            if (informationType == 2) {
              socketFun(uuID)
              if (UserId == uuID) {
                sessionStorage.machineID = informData.marchantsListname
              }

            }
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
            window.parent.location.href = "login.html";
          } else {
            layer.msg(res.message, { icon: 2 })
          }
        },
        error: function (err) {
          $('.mask').fadeOut();
          $('.maskSpan').removeClass('maskIcon')
          layer.msg('请求服务器超时', { icon: 2 })
        }
      })
    }

  })
  $('.listInput input[name="phone"]').blur(function () {
    var phone = $(this).val();
    if (phone) {
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        // alert("手机号码有误，请重填");  
        layer.msg('请填写正确的手机号码', { icon: 7 });
        $(this).val('')
        return false;
      }
    }
  });
  $('.listInput input[name="userPwd"]').blur(function () {
    passRegular(this, layer)
  });
  $('.listInput input[name="alonePwd"]').blur(function () {
    passRegular(this, layer)
  })
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
      if (res.code == 200) {
        roleList = res.data.list;
      }
    }, error: function (err) {
      layer.msg('服务器请求超时', { icon: 2 })
    }
  })
  // 渲染用户角色
  function userRoles(list, elements, trueList, dIndex) {
    var userList = '';
    list.forEach((ele, index) => {
      userList += `<div>
                     <input type="checkbox" ${dIndex !=1 && index == 0 ? 'disabled' : ''}  name="${ele.id}" title="${ele.name}"lay-skin="primary" value="${ele.id}"></input>
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
  form.on('select(stateSelect)', function (data) {

    // marchantsListname
    console.log(data.value); //得到被选中的值
    if (data.value == 0) {

      $('.checkCont input[name="100001"]').prop('disabled', false);
    } else {
      // form.val("information", {
      //   'marchantsListname':''
      // })
      $('.checkCont input[name="100001"]').prop('checked', false)
      $('.checkCont input[name="100001"]').prop('disabled', true);
    }
    form.render('checkbox');
  });
  // 获取商户列表
  var merchantsListData = merchantsListMian('');

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
  var addEditData = null;
  var dataList = addEditData = treeList();
  // var addEditData=treeList();
  // treeFun(tree, 'test1', tableIns, dataList, 'condition');
  $('.terminal input[name="marchantsListname"]').val(dataList[0].title);
      $('.terminal input[name="topmachantsVal"]').val(dataList[0].id)
  // 刷新页面
  $('.refreshBtn').click(function () {
    location.reload();
  });

  // 监听f5刷新
  $("body").bind("keydown", function (event) {
    if (event.keyCode == 116) {
      f5Fun()
    }
  });
  $('.playHeader .close').click(function () {
    $(this).parent().parent().addClass('margin0')
    $(this).parents('.maskContnet').fadeOut();
  });
  $('.inputWidth input[name="userName"]').blur(function () {
    ChineseREgular(this, layer)
  });

  // 推送方法
  function socketFun(uid) {
    var funData = JSON.stringify({
      uid,
      msg: '用户信息发生变更，请重新登录！',
      tag: 2
    })
    loadingAjax('/api/pushWebMsg', 'post', funData, sessionStorage.token).then(res => {

    }).catch(err => {

    })
  };
  var inst1 = tree.render({
    elem: '#test1',
    id: 'treelistAdd',
    showLine: !0 //连接线
    ,
    onlyIconControl: true //左侧图标控制展开收缩
    ,
    isJump: !1 //弹出新窗口跳转
    ,
    edit: false //开启节点的操作
    ,
    data: addEditData,
    text: {
      defaultNodeName: '无数据',
      none: ''
    },
    click: function (obj) {
      console.log(obj);
      $('.terminal input[name="marchantsListname"]').val(obj.data.title);
      $('.terminal input[name="topmachantsVal"]').val(obj.data.id);
      tableIns.reload({
        where:{
          condition:obj.data.id + '',
        }
      })
      var nodesEdti = $(`#test1 .layui-tree-txt`);
      for (var i = 0; i < nodesEdti.length; i++) {
        if (nodesEdti[i].innerHTML === obj.data.title)
          nodesEdti[i].style.color = "#be954a";
        else
          nodesEdti[i].style.color = "#555";
      }
    },
  });
  var inst2 = tree.render({
    elem: '#test2',
    id: 'treelistEdit',
    showLine: !0 //连接线
    ,
    onlyIconControl: true //左侧图标控制展开收缩
    ,
    isJump: !1 //弹出新窗口跳转
    ,
    edit: false //开启节点的操作
    ,
    data: addEditData,
    text: {
      defaultNodeName: '无数据',
      none: ''
    },
    click: function (obj) {
      console.log(obj);
      $('.terminal input[name="marchantsListname"]').val(obj.data.title);
      $('.terminal input[name="topmachantsVal"]').val(obj.data.id)
      if (obj.data.id == 1) {
        $('.checkCont input[name="100001"]').prop('disabled', false);
      } else {
        $('.checkCont input[name="100001"]').prop('checked', false)
        $('.checkCont input[name="100001"]').prop('disabled', true);
      }
      form.render('checkbox');
      var nodesEdti = $(`.terminal .layui-tree-txt`);
      for (var i = 0; i < nodesEdti.length; i++) {
        if (nodesEdti[i].innerHTML === obj.data.title)
          nodesEdti[i].style.color = "#be954a";
        else
          nodesEdti[i].style.color = "#555";
      }
    },
  });

  var addFlag=true,
  editFlag=true,
  delFlag=true;
  permissionsVal(389, 390, 397).then(res => {
    addFlag= res.addFlag ;
    editFlag= res.editFlag ;
    delFlag=  res.delFlag;
    permissions();
  }).catch(err => {
    layer.msg('服务器请求超时', { icon: 7 })
  });
  function permissions(){
    addFlag ? $('.addBtn').removeClass('hide') : $('.addBtn').addClass('hide');
    editFlag ? $('.listEdit').removeClass('hide') : $('.listEdit').addClass('hide');
    delFlag ? $('.del-btn').removeClass('hides') : $('.del-btn').addClass('hides');
  };
});


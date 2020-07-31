import '../../MyCss/merchants/merchantsList.css'
layui.use(['table', 'form', 'layer', 'tree', 'util'], function () {
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        layer = layui.layer,
        util = layui.util,
        tree = layui.tree,
        form = layui.form;
        token = sessionStorage.token;
    var   tableIns = table.render({
            elem: '#tableTest',
            url: `/api/merchant/getMerchantList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'title', width: 180, title: '商户名' },
                { field: 'merchantName', width: 150, title: '上级商户',templet:function(d){
                  return  d.id==0?'':d.merchantName
                } },
                { field: 'alias', width: 160, title: '商户编号' },
                { field: 'addUser', width: 150, title: '创建人', },
                { field: 'addTime', width: 180, title: '创建时间', sort: true },
                { field: 'lastUser', width: 150, title: '最后操作人', },
                { field: 'lastTime', width: 180, title: '最后操作时间', sort: true },
                { field: 'operation',  width: 150, title: '操作', toolbar: '#barDemo' },
            ]]
            , id: 'tableId'
            , page: true
            , loading: true
            , limits: [10, 20, 50]
            ,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where:{
                conditionTwo:sessionStorage.machineID,
                conditionThree:'0'
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
                } else {
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
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }else if(res.code==405){
                   
                    $('.hangContent').show();
                }
            }
        });
        // 左边商户列表显示隐藏事件
  $('.sidebar i').click(function () {
    $('.left-mian').hide()
    $('.onLeft').show()
  });
  $('.onLeft').click(function () {
    $(this).hide();
    $('.left-mian').show()
  })
    // 商户列表
    // var marchantsList = merchantsListMian('');
    //监听工具条
    var data = null;
    table.on('tool(test)', function (obj) {
        data = obj.data;
        console.log(data)
        if (obj.event === 'edit') {
            if(!editFlag){
                layer.msg('您没有编辑商户的权限',{icon:7});
                return ;
            }
            if(addEditData.length==0){
                layer.msg('服务器请求超时',{icon:7});
                return ;
            }
            $('.editMerchants input[name="merchantsName"]').val(data.title)
            popupShow('MemberOperation', 'MemberContent');
            if(data.id==0){
                $('.listInput input[name="marchantsText"]').val('');
            }else{
                $('.listInput input[name="marchantsText"]').val(data.merchantName);
            }
            $('.marchantsList').val(data.topMerchant);
            
            
        } else if (obj.event === 'delete') {
            if(!delFlag){
                layer.msg('您没有删除商户的权限',{icon:7});
                return ;
            }
            if(data.id==1){
                layer.msg(data.title+'不能进行删除操作',{icon:7});
                return ;
            }
            layer.confirm('确定删除？', function (index) {
                $.ajax({
                    type: 'post',
                    url: '/api/merchant/deleteMerchant',
                    headers: {
                        token,
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify({
                        id: data.id,
                        topMerchant:data.topMerchant
                    }),
                    success: function (res) {
                        console.log(res)
                        layer.close(index);
                        if (res.code == 200) {
                            layer.msg('删除成功', { icon: 1 })
                            dataList = treeList();
                            treeFun(tree,'test1',tableIns,dataList,'conditionTwo','','','conditionThree');
                            tableIns.reload({
                                where: {}
                            })
                        } else if (res.code == 403) {
                            window.parent.location.href = "login.html";
                        } else if (res.code == 405) {
                            layer.msg(res.msg, { icon: 7 })
                        } else {
                            layer.msg('删除失败', { icon: 2 })
                        }
                    }
                })
            });
        }
    });
    // 查询
    $('.queryBtnClick').click(function () {
        tableIns.reload({
            where: {
                condition: $('.addMember input[name="keyMerchants"]').val(),
                conditionThree:'1'
            }
        })
    })
    //点击添加成员事件
    $('.addBtn').click(function () {
        if(!addFlag){
            layer.msg('您没有添加商户的权限',{icon:7});
            return ;
        }
        if(addEditData.length==0){
            layer.msg('服务器请求超时',{icon:7});
            return ;
        }
        // marchantsList = merchantsListMian('');
        // mercantsSelectList(marchantsList, 'addMarchantsList', form);
        // form.render('select');
        tree.reload('treelistEdit', {
                      });
        $('.addBox input[name="marchantsListname"]').val('');
        $('.addBox input[name="addmarchantsVal"]').val('')
        popupShow('addMerchants', 'addBox')

    });
    // 取消事件
    $('.cancel_btn').click(function () {
        popupHide('MemberOperation', 'MemberContent')
    });
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
        indexFlag = null;
    });
    //   关闭添加
    $('.addBox .addCancelBtn').click(function () {
        popupHide('addMerchants', 'addBox')
    })
    // 添加商户事件
    $('.addBody .addSubmiBtn').click(function () {
        var topVal=$('.addBox input[name="addmarchantsVal"]').val().split(' ');
        var aliasText = null;
        // marchantsList.forEach((item, index) => {
        //     if (item.id == $('.addMarchantsList').val()) {
        //         aliasText = item.alias
        //     }
        // })
        if ($('.addBox input[name="merchantsName"]').val()&&$('.addBox input[name="addmarchantsVal"]').val()) {
            var addMerchantsData = JSON.stringify({
                name: $('.addBox input[name="merchantsName"]').val(),
                topMerchant: Number(topVal[0]),
                alias:topVal[1]
            })
            loadingAjax('/api/merchant/newMerchant', 'post', addMerchantsData, sessionStorage.token, '', 'addMerchants', 'addBox', layer).then((res) => {
                $('.addBox input[name="merchantsName"]').val('');
                layer.msg(res.message, { icon: 1 });
                dataList = treeList();
                treeFun(tree,'test1',tableIns,dataList,'conditionTwo','','','conditionThree');
                tableIns.reload({
                    where: {}
                })
            }).catch((err) => {
                layer.msg(err.message, { icon: 2 })
            })
        } else {
            layer.msg('带*号为必填', { icon: 7 })
        }
    })
    // 编辑商户事件
    $('.Medit .submit_btn').click(function () {
        if ($('.editMerchants input[name="merchantsName"]').val()) {
            var editdMerchantsData = JSON.stringify({
                id: data.id,
                name: $('.editMerchants input[name="merchantsName"]').val(),
                topMerchant: Number($('.marchantsList').val()),
            });
            loadingAjax('/api/merchant/updateMerchant', 'post', editdMerchantsData, sessionStorage.token, '', 'MemberOperation', 'MemberContent', layer).then((res) => {
                dataList = treeList();
                treeFun(tree,'test1',tableIns,dataList,'conditionTwo','','','conditionThree');
                layer.msg(res.message, { icon: 1 })
                tableIns.reload({
                    where: {}
                })
            }).catch((err) => {
                layer.msg(err.message, { icon: 2 })
            })
        } 
        else {
            console.log()
            layer.msg('带*未填写', { icon: 7 })
        }
    });
    //树状图 
    var addEditData=null;
  var dataList = addEditData=treeList();
  treeFun(tree,'test1',tableIns,dataList,'conditionTwo','','','conditionThree');

   // 监听f5刷新
   $("body").bind("keydown", function (event) {
    if (event.keyCode == 116) {
      f5Fun()
    }
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
        $('.addBox input[name="marchantsListname"]').val(obj.data.title);
        $('.addBox input[name="addmarchantsVal"]').val(obj.data.id +' '+obj.data.alias)
      var  nodesEdti = $(`#listInputTree .layui-tree-txt`);
        for (var i = 0; i < nodesEdti.length; i++) {
            if (nodesEdti[i].innerHTML === obj.data.title)
                nodesEdti[i].style.color = "#be954a";
            else
                nodesEdti[i].style.color = "#555";
        }
    },
});
var addFlag=false,
    editFlag=false,
    delFlag=false;
permissionsFun('/api/role/findUserPermission','post',sessionStorage.token,layer).then(res=>{
    console.log(res.data)
    addFlag=res.data.some((item,index)=>{
        return item.id=='393'
    });
    editFlag=res.data.some((item,index)=>{
        return item.id=='394'
    });
    delFlag=res.data.some((item,index)=>{
        return item.id=='395'
    })
}).catch(err=>{
    layer.msg(err.message,{icon:2})
})
});
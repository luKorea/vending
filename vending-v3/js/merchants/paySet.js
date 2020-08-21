import '../../MyCss/merchants/paySet.css'
layui.use(['table', 'form', 'layer', 'tree'], function () {
    var table = layui.table,
        layer = layui.layer,
        layer = layui.layer,
        util = layui.util,
        tree = layui.tree,
        form=layui.form,
        tableIns = table.render({
            elem: '#payList',
            url: `/api/merchant/getPayType`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token: sessionStorage.token,
            },
            cols: [[
                { field: 'payType', width: 160, title: '支付类型' },
                { field: 'app_id', width: 300, title: '微信公众号id/支付宝商户id', },
                { field: 'merchantName', width: 220, title: '所属商户' },
                { field: 'operation', width: 150, title: '操作', toolbar: '#barDemo' },
            ]],
            id: 'tablePayId',
            // page:true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                merchantId: Number(sessionStorage.machineID),
                pageSize:150
            },
            parseData: function (res) {
                // console.log(res)
                //res 即为原始返回的数据
                if (res.code == 200) {
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "count": res.data.total, //解析数据长度
                        "data": res.data //解析数据列表
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
                }
            }
        })
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
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    var payData=null;
    table.on('tool(payList)', function (obj) {
        payData=obj.data;
        if(payData.payType=='微信支付'){
           $('.WeChat').show();
           $('.Alipay').hide();
        }else{
            $('.WeChat').hide();
           $('.Alipay').show();
        }
        form.val("SetPay", {
            'typeIndex':payData.payType,
            'officialId':payData.payType=='微信支付'?payData.app_id:'',
            'MerchantsId':payData.payType=='微信支付'?payData.mchId:'',
            'app_key':payData.payType=='微信支付'?payData.app_key:'',
            'aliPayId':payData.payType=='阿里支付'?payData.app_id:'',
            'alipay_public_key':payData.payType=='阿里支付'?payData.alipay_public_key:'',
            'app_private_key':payData.payType=='阿里支付'?payData.app_private_key:'',
        })
        popupShow('changePay','changeBox')
    });
    form.on('select(mySelect)', function(data){
        if(data.value==1){
            $('.WeChat').show();
            $('.Alipay').hide();
        }else{
            $('.WeChat').hide();
            $('.Alipay').show();
        };
        form.val("SetPay", {
            'officialId':payData.payType=='微信支付'?payData.app_id:'',
            'MerchantsId':payData.payType=='微信支付'?payData.mchId:'',
            'app_key':payData.payType=='微信支付'?payData.app_key:'',
            'aliPayId':payData.payType=='阿里支付'?payData.app_id:'',
            'alipay_public_key':payData.payType=='阿里支付'?payData.alipay_public_key:'',
            'app_private_key':payData.payType=='阿里支付'?payData.app_private_key:'',
        })
    });
    $('.changeBody .cancel_btn').click(function(){
        popupHide('changePay','changeBox')
    })
    $('.changeBody .submit_btn').click(function(){
         var payFormData = form.val("SetPay");
         if(payFormData.typeIndex=='微信支付'){
            if(!(payFormData.officialId&&payFormData.MerchantsId&&payFormData.app_key)){
                layer.msg('带*为必填',{icon:7});
                return ;
            }
         }else{
            if(!(payFormData.aliPayId&&payFormData.alipay_public_key&&payFormData.app_private_key)){
                layer.msg('带*为必填',{icon:7});
                return ;
            }
         };
         $('.mask').fadeIn();
         $('.maskSpan').addClass('maskIcon')
         var editPay=JSON.stringify({
            merchantId:merchantsPay,
            id:payData.id,
            app_id:payFormData.typeIndex=='微信支付'?payFormData.officialId:payFormData.aliPayId,
            app_key:payFormData.typeIndex=='微信支付'?payFormData.app_key:'',
            mchId:payFormData.typeIndex=='微信支付'?payFormData.MerchantsId:'',
            alipay_public_key:payFormData.typeIndex=='阿里支付'?payFormData.alipay_public_key:'',
            app_private_key:payFormData.typeIndex=='阿里支付'?payFormData.app_private_key:''
         })
         loadingAjax('/api/merchant/updatePayParam','post',editPay,sessionStorage.token,'mask','changePay','changeBox',layer).then(res=>{
             layer.msg(res.message,{icon:1});
             tableIns.reload({
                where: {}
              })
         }).catch(err=>{
             layer.msg(err.message,{icon:2})
         })
    })
    var merchantsPay=sessionStorage.machineID;
    // 树
    var dataList  = treeList();
    tree.render({
        elem: `#test1`,
        id: 'treelist',
        showLine: !0 //连接线
        ,
        onlyIconControl: true, //左侧图标控制展开收缩 
        data:dataList,
        spread: true,
        text: {
          defaultNodeName: '无数据',
          none: '您没有权限，请联系管理员授权!'
        },
        click: function (obj) {
          console.log(obj);
          tableIns.reload({
            where: {
                merchantId:obj.data.id
            }
          })
          merchantsPay=obj.data.id;
          var nodes = $(`#test1 .layui-tree-txt`)
          for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].innerHTML === obj.data.title)
              nodes[i].style.color = "#be954a";
            else
              nodes[i].style.color = "#555";
          }
        },
      });
       // 收起
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.onLeft').show()
    });
    $('.onLeft').click(function () {
        $('.left-mian').show();
        $('.onLeft').hide()
    })
})
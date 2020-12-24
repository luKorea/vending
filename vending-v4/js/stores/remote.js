import '../../MyCss/stores/remote.css';
layui.use(['table', 'form', 'layer','tree'], function () {
    var table = layui.table,
        form = layui.form,
        layer = layui.layer,
        tree =layui.tree ,
        pushAppMerchantId=sessionStorage.machineID,
        tableIns = table.render({
            elem: '#appList',
            url: `${vApi}/app/getAppVersionList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token: sessionStorage.token
            },
            cols: [[
                { field: 'version_code', width: 180, title: '版本号',align:'center' },
                { field: 'version_name', width: 180, title: '版本名', align: 'center' },
                { field: 'apk_url', width: 350, title: '下载地址' , align: 'center'},
                { field: 'content', width: 350, title: '描述' , align: 'center'},
                { field: 'upload_user', width: 150, title: '创建人' , align: 'center'},
                { field: 'upload_time', width: 180, title: '创建时间', align: 'center',templet:function(d){
                    if (d.upload_time) {
                        var myDate = new Date(d.upload_time);
                        var y = myDate.getFullYear();
                        var m = myDate.getMonth() + 1;
                        var d = myDate.getDate();
                        var h = myDate.getHours();
                        var min = myDate.getMinutes();
                        var s = myDate.getSeconds();
                        return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
                      } else {
                        return '';
                      }
                }},
                { field: 'operation', fixed: 'right', right: 0, width: 180, title: '操作', toolbar: '#barDemo', align: 'center' },
            ]]
            , id: 'tableId'
            , loading: true,
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

            }
        });
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
    //   添加app
    $('.addAppBtn').click(function () {
        popupShow('addAppCOnt', 'addAppBox')
    });
    // 取消添加
    $('.addAppCOnt .addCancelBtn').click(function () {
        popupHide('addAppCOnt', 'addAppBox')
    })
    var AppMD5 = null;
    // 上传apk文件
    $('.relative input[name="uploadImg"]').change(function (ue) {
        var that = this;
        var flag=$(this).attr('indexFlag');
        if(!$(this).val()){
            return ;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
            file = this.files[0],
            chunkSize = 2097152, // 每次读取2MB
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0,
            spark = new SparkMD5.ArrayBuffer(),
            frOnload = function (e) {
                spark.append(e.target.result);
                currentChunk++;
                if (currentChunk < chunks) {
                    loadNext();
                } else {
                    AppMD5 = spark.end();
                    console.log(100)
                    console.log(currentChunk);
                    console.log(chunks)
                    $('input[name="AppMD"]').val(AppMD5);
                    console.log(AppMD5)
                    // $('.mask').fadeOut();
                    // $('.maskSpan').removeClass('maskIcon');
                    // $(that).val('');
                    var uploadAPK = new FormData();
                    uploadAPK.append('file', ue.target.files[0]);
                    $.ajax({
                        type: 'post',
                        url: `${vApi}/fileUpload`,
                        processData: false,
                        contentType: false,
                        headers: {
                          token,
                        },
                        data: uploadAPK,
                        success: function (res) {
                          console.log(res)
                          $('.mask').fadeOut();
                          $('.maskSpan').removeClass('maskIcon')
                          if(res.code==0){
                              if(flag=='add'){
                                $('.addAppCOnt input[name="apk_url"]').val(res.data.src)
                              }else if(flag='edit'){
                                $('.editAppCont input[name="apk_url"]').val(res.data.src)
                              }                           
                            layer.msg('上传成功',{icon:1});
                            $('.uploadTitle label').html('已上传')
                          }else{
                              layer.msg('上传失败',{icon:2});
                              $(that).val('');
                          }            
                        },error:function(err){
                          $('.mask').fadeOut();
                          $('.maskSpan').removeClass('maskIcon')
                          layer.msg('上传失败',{icon:2});
                          $(that).val('');
                        }
                      })
                    
                }

            },
            frOnerror = function () {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('上传文件失败');
                $(that).val('');
                return ;
            };
        function loadNext() {
            var fileReader = new FileReader();
            fileReader.onload = frOnload;
            fileReader.onerror = frOnerror;
            var start = currentChunk * chunkSize,
                end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        };
        loadNext();
    })
    // 确认添加
    $('.footerBtn .RdetermineBtn').click(function () {
        var addApp = form.val("addAppVal");
        console.log(1)
        if (!(addApp.version_code && addApp.version_name && addApp.apk_url)) {
            layer.msg('带*为必填', { icon: 7 });
            return;
        };
        if (!addApp.AppMD) {
            layer.msg('请上传App文件', { icon: 7 });
            return
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var addAppJson = JSON.stringify({
            version_code: addApp.version_code,
            version_name: addApp.version_name,
            apk_url: addApp.apk_url,
            verify: addApp.AppMD,
            content: addApp.content
        });
        loadingAjax('/app/uploadApp', 'post', addAppJson, sessionStorage.token, 'mask', 'addAppCOnt', 'addAppBox', layer).then(res => {
            console.log(res)
            layer.msg(res.message, { icon: 1 });
            tableIns.reload({
                where: {}
            });
            form.val("addAppVal", {
                "version_code": ""
                , "version_name": ""
                , "apk_url": ''
                , "AppMD": ''
                , "content": ""
            });
            $('.uploadTitle label').html('未上传')
        }).catch(err => {
            console.log(err)
            layer.msg(err.message, { icon: 2 })
        })
    });
    // 监听列表操作事件
    var appObj = null
    table.on('tool(appList)', function (obj) {
        console.log(obj)
        appObj = obj.data;
        if (obj.event == 'edit') {
            form.val("editAppVal", {
                "version_code": appObj.version_code,
                "version_name": appObj.version_name,
                "apk_url": appObj.apk_url,
                "AppMD": appObj.verify,
                "content": appObj.content,
            });
            popupShow('editAppCont', 'editAppBox')
        }else if(obj.event=='upload'){
            if(!machineIn){
                machineListFun(); 
            }
            popupShow('machineListCOnt', 'machineBox')
        }
    });
    $('.editAppCont .editCancelBtn').click(function(){
        popupHide('editAppCont','editAppBox')
    });
    // 确认修改
    $('.editAppCont .rdetermineBtn').click(function(){
        var editApp = form.val("editAppVal");
        if(!(editApp.version_code && editApp.version_name && editApp.apk_url)){
            layer.msg('带*为必填', { icon: 7 });
            return;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var editAppJson = JSON.stringify({
            version_code: editApp.version_code,
            version_name: editApp.version_name,
            apk_url: editApp.apk_url,
            verify: editApp.AppMD,
            content: editApp.content,
            id:appObj.id
        });
        loadingAjax('/app/updateAppInfo','post',editAppJson,sessionStorage.token,'mask','editAppCont','editAppBox',layer).then(res=>{
            layer.msg(res.message,{icon:1});
            tableIns.reload({
                where: {}
            });
        }).catch(err=>{
            layer.msg(err.message,{icon:2})
        })
    });


    // 树部分
    var dataList = treeList();
      // treeFun(tree, 'test1', tableIns, dataList, 'condition');
      tree.render({
        elem: `#test1`,
        id: 'treelist',
        showLine: !0 //连接线
        ,
        onlyIconControl: true, //左侧图标控制展开收缩 
        data: dataList,
        spread: true,
        text: {
            defaultNodeName: '无数据',
            none: '您没有权限，请联系管理员授权!'
        },
        click: function (obj) {
            console.log(obj);
            machineIn.reload({
                where: {
                    merchantId: obj.data.id
                }
            })
            pushAppMerchantId = obj.data.id;
            var nodes = $(`#test1 .layui-tree-txt`)
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].innerHTML === obj.data.title)
                    nodes[i].style.color = "#be954a";
                else
                    nodes[i].style.color = "#555";
            }
        },
    });

    // 售货机列表
    var  machineIn =null;
    function machineListFun(){
            machineIn = table.render({
            elem: '#machineList',
            url: `${vApi}/machine/getMachineList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token: sessionStorage.token
            },
            cols: [[
                { checkbox: true },
                { field: 'number', width: 180, title: '售货机编号', align: 'center',templet:function(d){
                    return d.number?d.number:'-'
                } },
                { field: '售货机信息', width: 180, title: '售货机信息', align: 'center',templet:function(d){
                    return d.info ? `<div>${d.info}</div>` : `<div><span style="color:red;">*</span>(售货机为新上线机器，请编辑售货机信息！)</div>`
                } },
                { field: 'location', width: 180, title: '地址', align: 'center' ,templet:function(d){
                    return d.location ? d.location : ' - '
                }},
                { field: 'appVersion', width: 180, align: 'center', title: '软件版本' },
                { field: 'merchantName', width: 150, align: 'center', title: '所属商户' }
               ]],
             id: 'mId',
             loading: true,
             page: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                merchantId: sessionStorage.machineID
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
    
            }
        });
    }
    // 取消
    $('.machineListCOnt .cancelBtn').click(function(){
        popupHide('machineListCOnt','machineBox')
    })
    // 更新设备版本
    var pushList=null,
        machineIdArr=[];
    $('.machineListCOnt .pushBtn').click(function(){
        console.log(table.checkStatus('mId'))
        machineIdArr=[];
        pushList=table.checkStatus('mId');
        if(!(pushList.data.length>0)){
            layer.msg('请选择需要修改app版本的售货机',{icon:7});
            return ;
        }
        layer.confirm('确定编辑售货机App版本？', function (index) {
            layer.close(index);
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
               var socketMachineStr='';
               pushList.data.forEach((item,index)=>{
                   socketMachineStr+=`${item.machineId},`
                   machineIdArr.push(item.machineId);
               })
            var updataObj=JSON.stringify({
                version_code:appObj.version_code,
                machineId:machineIdArr,
                merchantId:Number(pushAppMerchantId) 
            });
            loadingAjax('/app/updateMachineApp','post',updataObj,sessionStorage.token,'mask','machineListCOnt','machineBox',layer).then(res=>{
                console.log(res);
                layer.msg(res.message,{icon:1})
                var machineStr='';
                machineIdArr.forEach(item=>{
                    machineStr+=item+','
                })
                var appWebSocketsObj=JSON.stringify({
                    machine:machineStr
                });
                loadingAjax('/updateApp','post',appWebSocketsObj,sessionStorage.token,'','','',layer).then(res=>{

                }).catch(err=>{})
            }).catch(err=>{
                layer.msg(err.message,{icon:2})
            })
        })
    })
})
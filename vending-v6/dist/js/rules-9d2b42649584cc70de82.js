/*! 版权所有，翻版必究 */!function(e){function t(t){for(var a,c,s=t[0],l=t[1],r=t[2],p=0,u=[];p<s.length;p++)c=s[p],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&u.push(n[c][0]),n[c]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(d&&d(t);u.length;)u.shift()();return i.push.apply(i,r||[]),o()}function o(){for(var e,t=0;t<i.length;t++){for(var o=i[t],a=!0,s=1;s<o.length;s++){var l=o[s];0!==n[l]&&(a=!1)}a&&(i.splice(t--,1),e=c(c.s=o[0]))}return e}var a={},n={38:0},i=[];function c(t){if(a[t])return a[t].exports;var o=a[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.m=e,c.c=a,c.d=function(e,t,o){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(o,a,function(t){return e[t]}.bind(null,a));return o},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var r=0;r<s.length;r++)t(s[r]);var d=l;i.push([265,0]),o()}({265:function(e,t,o){"use strict";o.r(t);o(640),o(650);layui.use(["table","form","layer","laydate","tree"],function(){var e=window.parent.permissionsData1(),t=+sessionStorage.machineID,o=permissionsVal1({436:!1,437:!1,446:!1},e);function a(){o[436]?$(".addSalesBtn").removeClass("hide"):$(".addSalesBtn").addClass("hide"),o[437]?$(".pushImportBtn").removeClass("hide"):$(".pushImportBtn").addClass("hide"),o[446]?$(".delBtn").removeClass("hide"):$(".delBtn").addClass("hide")}a();var n=layui.table,i=layui.layer,c=layui.form,s=layui.tree,l=sessionStorage.token;$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()}),$(".playHeader .close").click(function(){g(),$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()}),$(".refreshBtn").click(function(){location.reload()});var r=n.render({elem:"#salesTable",method:"post",url:"".concat(vApi,"/accSplit/getAccRule"),contentType:"application/json",headers:{token:l},height:600,cols:[[{field:"accsplitRuleName",title:"规则名",align:"center"},{field:"payee",title:"收款账户",align:"center"},{field:"defaultRule",title:"默认规则标识",align:"center",templet:function(e){return 0==+e.defaultRule?"非默认":"默认"}},{field:"accsplitMode",title:"接收方分账模式",align:"center",templet:function(e){return 0==+e.accsplitMode?"指定金额":"指定比例"}},{field:"accsplitRule",title:"分账金额计算模式",align:"center",templet:function(e){return 0==+e.accsplitRule?"固定金额":"按订单金额比例"}},{field:"effectiveDate",title:"生效时间",align:"center"},{field:"expiryDate",title:"失效时间",align:"center"},{field:"status",title:"状态",align:"center",templet:function(e){return"1"===e.status?"启用":"禁用"}},{field:"operation",align:"center",title:"操作",toolbar:"#barDemo"}]],id:"salesId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:t},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show(),a()}}),d=null,p=1;function u(e){return new Promise(function(t,o){loadingAjax("/accSplit/getAccRec","post",JSON.stringify({pageNum:1,pageSize:200,merchantId:e}),l).then(function(e){var o="";$.each(e.data,function(e,t){o+='<option value="'.concat(t.id,'">').concat(t.payee,"</option>")}),$("#payId").html(o),$("#payIdTwo").html(o),c.render("select"),t(e)}).catch(function(e){o(e)})}).catch(function(e){return Promise.reject(e)})}n.on("tool(salesTable)",function(e){d=e.data,console.log(d),event.stopPropagation(),"operation"===e.event&&(e.data.id,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"}))}),c.on("radio(merType)",function(e){"01"===e.value?($(".personal").show(),$(".enterprise").hide()):($(".personal").hide(),$(".enterprise").show())}),c.on("radio(accountType)",function(e){"02"===e.value?$(".accountType").show():$(".accountType").hide()}),$(".queryBtn").click(function(){r.reload({where:{keyword:$(".KyeText").val().trim()}})});$(".addSalesBtn").click(function(){$('input[name="accsplitRuleName"]').prop("disabled",!1),$('select[name="payId"]').prop("disabled",!1),$('input[name="accsplitMode"]').prop("disabled",!1),$('input[name="effectiveDate"]').prop("disabled",!1),$('input[name="expiryDate"]').prop("disabled",!1),$(".machineChoose").show(),$(".J-datepicker-range").datePicker({hasShortcut:!0,min:function(){var e=new Date;return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())}(),max:"",isRange:!0,hide:function(e){this.$input.eq(0).val(),this.$input.eq(1).val()}}),p=1,$(".text").html("新增分账规则"),u(t).then(function(e){popupHide("chooseGoods","chooseGoodsBox"),popupShow("addSalesCont","addSalesBox")}).catch(function(e){var t=e.flag;console.log(t),i.msg("该商户不具备新增分账规则的功能，请先配置对应的杉德支付方式",{icon:7})})});c.on("radio(accsplitRule)",function(e){0==+e.value?($(".money").show(),$(".proportion").hide()):($(".proportion").show(),$(".money").hide())}),$('input[name="accsplitTotalRate"]').on("change",function(e){+e.currentTarget.value>100&&(i.msg("输入的比例不能大于100",{icon:7}),$(this).val(0))});var f=[];function h(e){var t="";e.forEach(function(e,o){t+=' <li class="setMateraialList">\n                            <div class="SetName">\n                                <div>'.concat(e.accsplitMerName,'</div>\n                            </div>\n                            <div class="SetName">\n                                <div>').concat(e.accsplitMerNo,'</div>\n                            </div>\n                            <div class="SetName">\n                                <div>').concat(e.expiryDate?e.expiryDate:e.expiryDateMer,'</div>\n                            </div>\n                            <div class="duration">\n                                <div><input type="number" min="0"  name=\'fixedAmt\' inputIndex="').concat(o,'" value="').concat(e.fixedAmt,'"></div>\n                            </div>\n                            <div class="duration">\n                                <div><input type="number" min="0" name=\'accsplitAmt\' inputIndex="').concat(o,'" value="').concat(e.accsplitAmt,'"></div>\n                            </div>\n                            <div class="duration">\n                                <div><input type="number" min="0" max="100" name=\'accsplitRate\' inputIndex="').concat(o,'" value="').concat(e.accsplitRate,'"></div>\n                            </div>\n                        </li>')}),$(".SetContList").html(t)}n.on("checkbox(goodsTable)",function(e){var t=e.data;"all"==e.type||(e.checked?f.push({accsplitMerName:t.accsplitMerName,expiryDateMer:t.expiryDateMer,accsplitMerNo:t.accsplitMerNo,expiryDate:t.expiryDate,fixedAmt:0,accsplitAmt:0,accsplitRate:0}):f.forEach(function(t,o){t.accsplitMerNo===e.data.accsplitMerNo&&f.splice(o,1)})),f.length>0?$(".goodsFlag").text("已选择"):$(".goodsFlag").text("未选择")}),$(".goodsCont .determineBtn").click(function(){console.log(f),0!==f.length?(h(f),$(".chooseFooter").show(),$(".chooseGoods input").prop("disabled",!1),popupShow("chooseGoods","chooseGoodsBox")):i.msg("请选择接收方",{icon:7})});var m=1;function g(){c.val("formData",{accsplitMode:"",accsplitRuleName:"",defaultRule:"",effectiveDate:"",expiryDate:"",payId:"",status:"",accsplitTotalAmt:"",accsplitTotalRate:""}),f=[]}function v(e,t){loadingAjax(e,"post",t,l).then(function(e){i.msg(e.message,{icon:1}),r.reload({where:{}}),g(),popupHide("addSalesCont","addSalesBox")}).catch(function(e){i.msg(e.message,{icon:2})})}$(".SetContList").on("change",".setMateraialList input",function(e){var t=$(this).val();switch(e.currentTarget.name){case"fixedAmt":sessionStorage.fixedAmt=+e.currentTarget.value;break;case"accsplitAmt":sessionStorage.accsplitAmt=+e.currentTarget.value;break;case"accsplitRate":if(+e.currentTarget.value>100)return i.msg("输入的比例不能大于100",{icon:7}),void $(this).val(0);sessionStorage.accsplitRate=+e.currentTarget.value}/^\d*$/.test(t)?(m=$(this).val(),f[$(this).attr("inputIndex")].fixedAmt=sessionStorage.fixedAmt,f[$(this).attr("inputIndex")].accsplitAmt=sessionStorage.accsplitAmt,f[$(this).attr("inputIndex")].accsplitRate=sessionStorage.accsplitRate):(i.msg("只能输入正整数",{icon:7}),m?($(this).val(m),f[$(this).attr("inputIndex")].fixedAmt=sessionStorage.fixedAmt,f[$(this).attr("inputIndex")].accsplitAmt=sessionStorage.accsplitAmt,f[$(this).attr("inputIndex")].accsplitRate=sessionStorage.accsplitRate):($(this).val(1),f[$(this).attr("inputIndex")].fixedAmt=sessionStorage.fixedAmt,f[$(this).attr("inputIndex")].accsplitAmt=sessionStorage.accsplitAmt,f[$(this).attr("inputIndex")].accsplitRate=sessionStorage.accsplitRate))}),$(".chooseGoods .determineBtn").click(function(){popupHide("goodsCont","goodsBox"),popupHide("chooseGoods","chooseGoodsBox")}),$(".goodsChooseBtn").click(function(){0==f.length?(n.render({elem:"#goodsTable",url:"".concat(vApi,"/accSplit/getReceiverList"),method:"post",contentType:"application/json",headers:{token:l},cols:[[{type:"checkbox"},{field:"accsplitMerName",title:"接收方名称",align:"center"},{field:"accsplitMerNo",title:"接收方编号",align:"center"},{field:"expiryDate",title:"失效日期",align:"center"}]],id:"goodsID",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:t},parseData:function(e){if(200==e.code){var t=[];return e.data.list.forEach(function(e){0==e.mail&&t.push(e)}),{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}}return{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){for(var t in 403==e.code&&(window.parent.location.href="login.html"),console.log(e),console.log(f),f)e.data.forEach(function(e,o){e.accsplitMerNo===f[t].accsplitMerNo&&($(".goodsChooseList tr[data-index="+o+'] input[type="checkbox"]').prop("checked",!0),c.render())});$('.list-table .layui-table-header input[type="checkbox"]').prop("disabled",!0),$(".list-table .layui-table-header .laytable-cell-checkbox>div").hide(),c.render("checkbox")}}),popupShow("goodsCont","goodsBox")):(h(f),$(".chooseFooter").show(),$(".chooseGoods input").prop("disabled",!1),popupShow("chooseGoods","chooseGoodsBox"))}),$(".moreChoose").click(function(){popupHide("chooseGoods","chooseGoodsBox"),popupShow("goodsCont","goodsBox")}),$(".ListOperation .edit").click(function(){p=2,$(".text").html("编辑分账规则"),u(t).then(function(e){$('input[name="accsplitRuleName"]').prop("disabled",!0),$('select[name="payId"]').prop("disabled",!0),$('input[name="accsplitMode"]').prop("disabled",!0),$('input[name="effectiveDate"]').prop("disabled",!0),$('input[name="expiryDate"]').prop("disabled",!0),$(".machineChoose").hide(),0==+d.accsplitRule?($(".money").show(),$(".proportion").hide()):($(".money").hide(),$(".proportion").show()),c.val("formData",{accsplitRuleName:d.accsplitRuleName,defaultRule:d.defaultRule,effectiveDate:d.effectiveDate,expiryDate:d.expiryDate,payId:d.payId,status:d.status,accsplitRule:d.accsplitRule,accsplitTotalAmt:d.accsplitTotalAmt,accsplitTotalRate:d.accsplitTotalRate}),popupHide("chooseGoods","chooseGoodsBox"),popupShow("addSalesCont","addSalesBox")})}),$(".ListOperation .receiverList").click(function(){h(d.accMerList),$(".chooseFooter").hide(),$(".chooseGoods input").prop("disabled",!0),popupShow("chooseGoods","chooseGoodsBox")}),$(".ListOperation .del").click(function(){i.confirm("确定删除？",function(e){i.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/accSplit/deleteAccRule","post",JSON.stringify({accsplitRuleNo:d.accsplitRuleNo}),l,"mask","","",i).then(function(e){i.msg(e.message,{icon:1}),r.reload({where:{}})}).catch(function(e){i.msg(e.message,{icon:2})})})}),$(".addSalesCont .confirmBtn").click(function(){var e=c.val("formData");e.accMerList=f,e.merchantId=t,1===p?v("/accSplit/insertAccRule",JSON.stringify(e)):(e.accsplitRuleNo=d.accsplitRuleNo,v("/accSplit/updateAccRule",JSON.stringify(e)))}),$(".addSalesCont .cancelBtn").click(function(){g(),popupHide("addSalesCont","addSalesBox")});var y=treeList();function x(e,o,a,n){e.render({elem:"#".concat(o),id:"treelist",showLine:!0,onlyIconControl:!0,data:n,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){console.log(e),t=e.data.id,a.reload({where:{merchantId:e.data.id}});for(var n=$("#".concat(o," .layui-tree-txt")),i=0;i<n.length;i++)n[i].innerHTML===e.data.title?n[i].style.color="#be954a":n[i].style.color="#555"}})}$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(y)?(x(s,"testGoods",r,y=e),r.reload({where:{merchantId:t}}),i.msg("已刷新",{icon:1})):i.msg("已刷新",{icon:1})}),x(s,"testGoods",r,y),$("body").click(function(){$(".ListOperation").fadeOut(),null}),$(".cancel-btn").click(function(){popupHide("goodsCont","goodsBox")})})},650:function(e,t){}});
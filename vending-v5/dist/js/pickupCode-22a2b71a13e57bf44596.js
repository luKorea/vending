/*! 版权所有，翻版必究 */!function(e){function t(t){for(var i,c,s=t[0],d=t[1],l=t[2],u=0,p=[];u<s.length;u++)c=s[u],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&p.push(n[c][0]),n[c]=0;for(i in d)Object.prototype.hasOwnProperty.call(d,i)&&(e[i]=d[i]);for(r&&r(t);p.length;)p.shift()();return a.push.apply(a,l||[]),o()}function o(){for(var e,t=0;t<a.length;t++){for(var o=a[t],i=!0,s=1;s<o.length;s++){var d=o[s];0!==n[d]&&(i=!1)}i&&(a.splice(t--,1),e=c(c.s=o[0]))}return e}var i={},n={32:0},a=[];function c(t){if(i[t])return i[t].exports;var o=i[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.m=e,c.c=i,c.d=function(e,t,o){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)c.d(o,i,function(t){return e[t]}.bind(null,i));return o},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var s=window.webpackJsonp=window.webpackJsonp||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var r=d;a.push([271,0]),o()}({271:function(e,t,o){"use strict";o.r(t);o(667);layui.use(["form","layer","table","transfer","tree"],function(){var e=sessionStorage.machineID,t=window.parent.permissionsData1(),o=permissionsVal1({436:!1,437:!1,465:!1},t);function i(){o[436]?$(".addBtn").removeClass("hide"):$(".addBtn").addClass("hide"),o[437]?$(".ListOperation .listEdit").removeClass("hide"):$(".ListOperation .listEdit").addClass("hide"),o[465]?$(".pushBtn").removeClass("hide"):$(".pushBtn").addClass("hide")}i(),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()});var n=layui.form,a=layui.layer,c=layui.table,s=layui.transfer,d=layui.tree,l=c.render({elem:"#tableactivity",method:"post",url:"".concat(vApi,"/activity/getActivityList"),contentType:"application/json",headers:{token:sessionStorage.token},cols:[[{field:"activity_name",title:"活动名",event:"pickup",align:"center"},{field:"code_count",title:"取货码数量",event:"pickup",align:"center"},{field:"roleSign",title:"开始时间",event:"pickup",align:"center",templet:function(e){return e.start_time?timeStamp(e.start_time):"-"}},{field:"alias",title:"结束时间",event:"pickup",align:"center",templet:function(e){return e.start_time?timeStamp(e.end_time):"-"}},{field:"phone",title:"活动状态",event:"pickup",align:"center",templet:function(e){var t=(new Date).getTime();return 1==e.activity_status?"已暂停":2==e.activity_status?"已取消":t>e.end_time?"已过期":"活动正常"}},{field:"create_user",title:"创建人",event:"pickup",align:"center"},{field:"addUser",title:"创建时间",event:"pickup",align:"center",templet:function(e){return e.start_time?timeStamp(e.create_time):"-"}},{field:"operation",title:"操作",toolbar:"#barDemo",align:"center"}]],id:"activityId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchant_id:sessionStorage.machineID},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){i()}});$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),$(".addActivity .cancel_btn").click(function(){popupHide("addActivity","addActivityBox")}),$(".goodsCont .cancel_btn").click(function(){popupHide("goodsCont","goodsBox")}),$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});var r=null,u=null;$(".addBtn").click(function(){var e=new Date,t=e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds());$(".J-datepicker-range").datePicker({hasShortcut:!0,min:t,max:"",isRange:!0,hide:function(e){console.info(this.$input.eq(0).val(),this.$input.eq(1).val()),r=this.$input.eq(0).val(),u=this.$input.eq(1).val()}}),popupShow("addActivity","addActivityBox")}),$(".goodsChooseBtn").click(function(){0==f.length?(g=c.render({elem:"#goodsTable",url:"".concat(vApi,"/goods/findAll"),method:"post",contentType:"application/json",headers:{token:sessionStorage.token},cols:[[{type:"checkbox"},{field:"goods_images",title:"图片",templet:"#imgtmp",align:"center"},{field:"goods_Name",title:"商品名",color:"#409eff",align:"center",templet:function(e){return 1==e.mail?"(邮寄)"+e.goods_Name:e.goods_Name}},{field:"classifyName",title:"商品类目",align:"center"},{field:"goods_Core",title:"商品编号",align:"center"}]],id:"goodsID",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{condition:e,conditionSeven:0},parseData:function(e){if(200==e.code){var t=[];return e.data.list.forEach(function(e){0==e.mail&&t.push(e)}),{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}}return{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){for(var t in 403==e.code&&(window.parent.location.href="login.html"),console.log(e),console.log(f),f)e.data.forEach(function(e,o){e.goods_Id==f[t].goodsId&&($(".goodsChooseList tr[data-index="+o+'] input[type="checkbox"]').prop("checked",!0),n.render())});$('.list-table .layui-table-header input[type="checkbox"]').prop("disabled",!0),$(".list-table .layui-table-header .laytable-cell-checkbox>div").hide(),n.render("checkbox")}}),popupShow("goodsCont","goodsBox")):(v(f),$(".chooseFooter").show(),$(".chooseGoods input").prop("disabled",!1),popupShow("chooseGoods","chooseGoodsBox"))}),$(".moreChoose").click(function(){popupHide("chooseGoods","chooseGoodsBox"),popupShow("goodsCont","goodsBox")}),$(".machineChooseBtn").click(function(){L=[],function(e){loadingAjax("/machine/getMachine?merchantId=".concat(e),"GET",{},sessionStorage.token).then(function(e){var t=e.data.unSelect;t.forEach(function(e){var t={value:e.machineId,title:e.info?e.info:"(此为未命名的新售货机)"};L.push(t)}),O(L,N)}).catch(function(e){a.msg(e.message,{icon:2})})}(e),popupShow("machineDetailsCont","machineDetailsBox")});var p=null,h=[],m=[];c.on("checkbox(machineDetailsList)",function(e){if("all"==e.type){var t=[];e.checked?m.forEach(function(e){h.includes(e)||h.push(e)}):(h.forEach(function(e,o){m.includes(e)||t.push(e)}),h=t)}else e.checked?h.push(e.data.machineId):h.splice(h.indexOf(e.data.machineId),1);h.length>0?$(".machineFlag").text("已选择"):$(".machineFlag").text("未选择")}),$(".machineDetailsCont .determineBtn").click(function(){0!=N?popupHide("machineDetailsCont","machineDetailsBox"):a.msg("请选择售货机",{icon:7})});var g=null;var f=[];function v(e){console.log(9009);var t="";e.forEach(function(e,o){t+=' <li class="setMateraialList">\n                            <div class="abbreviateImg">\n                                <img src="'.concat(e.goods_images,'" alt="">\n                            </div>\n                            <div class="SetName">\n                                <div>').concat(e.goods_Name,'</div>\n                            </div>\n                            <div class="SetName">\n                                <div>').concat(e.goods_Core,'</div>\n                            </div>\n                            <div class="duration">\n                                <div>\n                                    <input type="number" inputIndex="').concat(o,'" value="').concat(e.count,'">\n                                </div>\n                            </div>\n                          \n                        </li>')}),$(".SetContList").html(t)}c.on("checkbox(goodsTable)",function(e){"all"==e.type||(e.checked?f.push({goods_Name:e.data.goods_Name,goodsId:e.data.goods_Id,count:1,goods_images:e.data.goods_images,goods_Core:e.data.goods_Core}):(f.forEach(function(t,o){t.goodsId==e.data.goods_Id&&f.splice(o,1)}),console.log(f))),f.length>0?$(".goodsFlag").text("已选择"):$(".goodsFlag").text("未选择")}),$(".goodsCont .determineBtn").click(function(){0!=f.length?(v(f),$(".chooseFooter").show(),$(".chooseGoods input").prop("disabled",!1),popupShow("chooseGoods","chooseGoodsBox")):a.msg("请选择商品",{icon:7})});var y=1;$(".SetContList").on("change",".setMateraialList input",function(){var e=$(this).val();console.log(e),/^\d*$/.test(e)&&0!=e?(y=$(this).val(),console.log($(this).attr("inputIndex")),f[$(this).attr("inputIndex")].count=$(this).val()):(a.msg("只能输入正整数",{icon:7}),y?($(this).val(y),f[$(this).attr("inputIndex")].count=$(this).val()):($(this).val(1),f[$(this).attr("inputIndex")].count=$(this).val()))}),$(".chooseGoods .determineBtn").click(function(){popupHide("goodsCont","goodsBox"),popupHide("chooseGoods","chooseGoodsBox")});var k=!1;$(".moreList").click(function(){$(".seniorSet").slideToggle(),(k=!k)?$(".moreList img").addClass("actives"):$(".moreList img").removeClass("actives")});var _=null;$(".J-datepicker").datePicker({hasShortcut:!0,min:"",max:"",hide:function(){console.info(this.$input.eq(0).val()),_=this.$input.eq(0).val()}}),$(".cleanBtn").click(function(){_?a.confirm("确定清除".concat(_,"前无效的取货码？"),function(e){a.close(e);var t=JSON.stringify({time:_});loadingAjax("/activity/resetGoodCode","post",t,sessionStorage.token,"mask","","",a).then(function(e){a.msg(e.message,{icon:1})}).catch(function(e){a.msg(e.message,{icon:2})})}):a.msg("请选择需要清除无效取货码的时间节点",{icon:7})});var x=1;$('.addActivityBody input[name="codeConst"]').keyup(function(){var e=$(this).val();/^\d*$/.test(e)?x=$(this).val():(a.msg("只能输入正整数",{icon:7}),x?$(this).val(x):$(this).val(1))});var S=12;$('.addActivityBody input[name="codeLen"]').keyup(function(){var e=$(this).val();/^\d*$/.test(e)?S=$(this).val():(a.msg("只能输入正整数",{icon:7}),S?$(this).val(S):$(this).val(12))});var w=!1;$('.addActivityBody input[name="codeLen"]').blur(function(){if(!($(this).val()>=8&&$(this).val()<=30))return a.msg("取货码长度范围为8位到30位",{icon:7}),$(this).val(12),void(w=!0);w=!1}),$(".addFooter .submitBtn").click(function(){if(r&&u)if($('.addActivityBody input[name="activityName"]').val()&&$('.addActivityBody input[name="codeConst"]').val()>0)if(0!=N.length)if(0!=f.length)if(w)w=!1;else{$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var t=[];f.forEach(function(e){t.push({good_count:Number(e.count),good_id:e.goodsId})});var o=JSON.stringify({activity_name:$('.addActivityBody input[name="activityName"]').val(),start_time:r,end_time:u,code_count:$('.addActivityBody input[name="codeConst"]').val(),merchantId:e,machines:N,goods:t,type:Number($('.complex input[name="complexNum"]:checked').val()),len:$('.seniorSet input[name="codeLen"]').val()});console.log(o),loadingAjax("/activity/newActivity","post",o,sessionStorage.token,"mask","addActivity","addActivityBox").then(function(e){a.msg(e.message,{icon:1}),$('.addActivityBody input[name="activityName"]').val(""),$('.addActivityBody input[name="codeConst"]').val(""),$(".c-datepicker-data-input").val(""),$(".machineFlag").html("未选择"),$(".goodsFlag").html("未选择"),r=null,u=null,N=[],f=[],$('.seniorSet input[name="codeLen"]').val(12),l.reload({where:{}}),g.reload({where:{}}),O(L,N)}).catch(function(e){a.msg(e.message,{icon:2})})}else a.msg("请选择商品",{icon:7});else a.msg("请选择售货机",{icon:7});else a.msg("活动名不能为空且取货码数量必须大于0",{icon:7});else a.msg("请选择开始时间与结束时间",{icon:7})});var b=null,C=null;c.on("tool(tableactivity)",function(e){if(event.stopPropagation(),b=e.data,"operation"===e.event){if(C==e.data.id)return $(".ListOperation").fadeOut(),void(C=null);C=e.data.id,0==b.activity_status?$(".ListOperation .stop").html("暂停"):$(".ListOperation .stop").html("开始"),$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}else"pickup"==e.event&&(console.log(e.data.id),t=e.data.id,I=c.render({elem:"#pickCodeIn",method:"get",url:"".concat(vApi,"/activity/getCode"),headers:{token:sessionStorage.token},cols:[[{field:"good_code",title:"取货码",align:"center"},{field:"code_status",title:"使用情况",align:"center",templet:function(e){return 0==e.code_status?"待使用":"已使用"}},{field:"info",title:"使用的售货机",align:"center",templet:function(e){return e.info?e.info:"-"}},{field:"excelShipInfos",title:"出货情况",align:"center",templet:function(e){if(0==e.excelShipInfos.length)return"-";var t="";return e.excelShipInfos.forEach(function(e){t+="<div>".concat(e.goods_Name,"(").concat(e.ship_statusStr,")</div><div></div>")}),t}},{field:"operate_time",title:"使用时间",align:"center",templet:function(e){return e.operate_time?timeStamp(e.operate_time):"-"}},{field:"refund",title:"退货状态",align:"center",templet:function(e){return 1==e.refund?"已退货":"未退货"}}]],data:[],id:"pickIn",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{id:t},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){i()}}),$(".pickCode .playHeader span").html(e.data.activity_name+"取货码列表"),popupShow("pickCode","pickCodeBox"));var t}),$(".ListOperation .machineIn").click(function(){B||(B=c.render({elem:"#activityMachine",cols:[[{field:"number",title:"售货机编号",align:"center"},{field:"info",title:"售货机信息",align:"center"},{field:"location",title:"地址",align:"center"}]],data:[],id:"chooseMachineIn",loading:!0})),B.reload({data:b.activity_machine}),$(".activityMachine .playHeader span").html(b.activity_name+"活动售货机"),popupShow("activityMachine","activityMachineBox")}),$(".ListOperation .goodsIn").click(function(){v(b.goods_list),$(".chooseFooter").hide(),$(".chooseGoods input").prop("disabled",!0),$(".activityMachine .playHeader span").html(b.activity_name+"活动商品"),popupShow("chooseGoods","chooseGoodsBox")}),$(".ListOperation .stop").click(function(){(new Date).getTime()>b.end_time?a.msg("该活动已过期，不可进行操作",{icon:7}):a.confirm(0==b.activity_status?"确定暂停？":"确定开始？",function(e){a.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var t=JSON.stringify({activity_id:b.id,activity_status:0==b.activity_status?1:0});loadingAjax("/activity/operateActivity","post",t,sessionStorage.token,"mask","","",a).then(function(e){a.msg(e.message,{icon:1}),l.reload({where:{}})}).catch(function(e){a.msg(e.message,{icon:2})})})}),$(".ListOperation .cancel0").click(function(){(new Date).getTime()>b.end_time?a.msg("该活动已过期，不可进行取消操作",{icon:7}):2!=b.activity_status?a.confirm("确定取活动(取消后活动将停止并且取货码失效)",function(e){a.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var t=JSON.stringify({activity_id:b.id,activity_status:2});loadingAjax("/activity/operateActivity","post",t,sessionStorage.token,"mask","","",a).then(function(e){a.msg(e.message,{icon:1}),l.reload({where:{}})}).catch(function(e){a.msg(e.message,{icon:2})})}):a.msg("该活动已取消",{icon:7})});var B=null;var I=null;function O(e,t){s.render({elem:"#test6",data:e,title:["未选择售货机","已选择售货机"],width:380,height:500,value:t,onchange:function(e,t){console.log(t),0==t?e.forEach(function(e){N.push(e.value)}):1==t&&e.forEach(function(e){N.splice(N.indexOf(e.value),1)}),0==N.length?$(".machineFlag").text("未选择"):$(".machineFlag").text("已选择")}})}$(".queryBtnClick").click(function(){l.reload({where:{condition:$(".activityListKey .KyeText").val()}})}),$(".keyCodeBtn").click(function(){I.reload({where:{good_code:$('.newKeyContent input[name="keyGoodsCode"]').val()}})}),$(".machineKeyBtn").click(function(){p.reload({where:{keyword:$('.machineDetailsBody input[name="machineKey"]').val()}})}),$(".goodsKeyBtn").click(function(){g.reload({where:{conditionTwo:$('.goodsCont input[name="GoodsKyeText"]').val()}})});var N=[],L=[];$(".pushBtn").click(function(){$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var e="".concat(vApi,"/exportCodes?id=").concat(b.id,"&good_code=").concat($('.newKeyContent input[name="keyGoodsCode"]').val()),t="".concat(b.activity_name,"取货码.xls");exportExcel(e,t)});var A=!0;$(".data-list-contnet").on("mouseenter",".pic102",function(e){$("#pic101").attr("src",$(this).attr("src"));var t=new Image;t.onload=function(){$("#pic101").css({width:this.width>=this.height?"350px":"auto",height:this.height>this.width?"450px":"auto"}).fadeIn("fast"),this.onload=null},t.src=$(this).attr("src")}),$(".data-list-contnet").on("click",".pic102",function(){event.stopPropagation(),A=!1}),$(".data-list-contnet").on("mouseleave",".pic102",function(){A&&$("#pic101").hide()}),$("#pic101").click(function(){event.stopPropagation()}),$("body").click(function(){A=!0,$("#pic101").hide()}),$("#pic101").mouseenter(function(){$("#pic101").show()}),$("#pic101").mouseleave(function(){A&&$("#pic101").hide()});var D=treeList();function G(t,o,i,n){t.render({elem:"#".concat(o),id:"treelist",showLine:!0,onlyIconControl:!0,data:n,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(t){e=t.data.id,i.reload({where:{merchant_id:t.data.id}});for(var n=$("#".concat(o," .layui-tree-txt")),a=0;a<n.length;a++)n[a].innerHTML===t.data.title?n[a].style.color="#be954a":n[a].style.color="#555"}})}$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(D)?(G(d,"testGoods",l,D=e),l.reload({where:{merchantId:sessionStorage.machineID}}),a.msg("已刷新",{icon:1})):a.msg("已刷新",{icon:1})}),G(d,"testGoods",l,D),$("body").click(function(){$(".ListOperation").fadeOut(),C=null})})},667:function(e,t){}});
/*! 版权所有，翻版必究 */!function(d){function o(o){for(var t,e,n=o[0],i=o[1],a=o[2],c=0,s=[];c<n.length;c++)e=n[c],Object.prototype.hasOwnProperty.call(r,e)&&r[e]&&s.push(r[e][0]),r[e]=0;for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(d[t]=i[t]);for(p&&p(o);s.length;)s.shift()();return u.push.apply(u,a||[]),l()}function l(){for(var o,t=0;t<u.length;t++){for(var e=u[t],n=!0,i=1;i<e.length;i++){var a=e[i];0!==r[a]&&(n=!1)}n&&(u.splice(t--,1),o=c(c.s=e[0]))}return o}var e={},r={4:0},u=[];function c(o){if(e[o])return e[o].exports;var t=e[o]={i:o,l:!1,exports:{}};return d[o].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.m=d,c.c=e,c.d=function(o,t,e){c.o(o,t)||Object.defineProperty(o,t,{enumerable:!0,get:e})},c.r=function(o){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},c.t=function(t,o){if(1&o&&(t=c(t)),8&o)return t;if(4&o&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(c.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var n in t)c.d(e,n,function(o){return t[o]}.bind(null,n));return e},c.n=function(o){var t=o&&o.__esModule?function(){return o.default}:function(){return o};return c.d(t,"a",t),t},c.o=function(o,t){return Object.prototype.hasOwnProperty.call(o,t)},c.p="";var t=window.webpackJsonp=window.webpackJsonp||[],n=t.push.bind(t);t.push=o,t=t.slice();for(var i=0;i<t.length;i++)o(t[i]);var p=n;u.push([364,0]),l()}({364:function(o,t,i){"use strict";i.r(t);var t=i(434),e=i(0),n=!1;var a=window.parent;$(".topHeader .back").click(function(){a.hideChild()});var c=a.machindID(),s=a.merchantsID();function d(o){Object(e.d)("加载中...");o=JSON.stringify({machineId:o});Object(e.c)("/api/machine/getGoodWay","post",sessionStorage.token,o,"mask").then(function(o){console.log(o),r(o)}).catch(function(o){console.log(o)})}d(c);var l=null;function r(o){var n;console.log(o),l=[[],[],[],[],[],[]],o.data.forEach(function(o){o.row&&l[o.row-1].push(o)}),console.log(l),n="",l.forEach(function(o,e){n+='<ul class="aisleList flex">\n                        <li class="listIndex">\n                            <span>'.concat(e+1,"</span>\n                        </li>"),o.forEach(function(o,t){n+=' <li class="aisleNumderGoods" fireIndex="'.concat(e+","+t,'" >\n                            <div class="delCheckbox">\n                            <div>\n                                <input type="checkbox" class="delChoose" value="').concat(o.id,'" style="width: 20px;height: 20px;">\n                                <span class="hui-icons hui-icons-toast "></span>\n                            </div>\n                            \n                        </div>\n                            <div class="numberTop">\n                                <img src="').concat(o.goods_images||i(67),'" alt="">\n                                <span>').concat(t+1,'</span>\n                            </div>\n                            <div class="numderBottom flex">\n                                <div class="').concat(1==o.open?"status1":"status2",' ">\n                                    \n                                    ').concat(1==o.open?"正常":"禁用","\n                                </div>\n                                <div >\n                                    数量:").concat(o.count,"\n                                </div>\n                            </div>\n                            <p>\n                            ").concat(1==o.mail?"(邮寄)":"").concat(o.goods_Name||"-","\n                            </p>\n                        </li>")}),n+="</ul>"}),$(".aisleCont").html(n),$(".aisleCont input").attr("checked",!1)}Object(e.g)("/api/role/findUserPermission","post",sessionStorage.token).then(function(o){o.data.forEach(function(o){"424"==o.id&&(n=!0)})}).catch(function(o){console.log(o)}),$(".validationContent .close").click(function(){Object(e.a)(this,"top50")}),$(".validationContent .confirmBtn").click(function(){var o,t=this;$('.validationBody input[name="oldPass"]').val()?(Object(e.d)("正在验证，请稍后"),o=JSON.stringify({alonePwd:hex_md5($('.validationBody input[name="oldPass"]').val())}),Object(e.c)("/api/user/verifyAlonePwd","post",sessionStorage.token,o,"mask").then(function(o){console.log(o),Object(e.a)(t,"top50"),sessionStorage.independentPass="true",b?Object(e.i)(".addNumContent",".addNumBox","top50"):h?(g=[],Object(e.d)("正在删除，请稍后！"),o=$('.aisleCont input[type="checkbox"]'),$.each(o,function(o,t){console.log(t.checked),t.checked&&g.push(Number(t.value))}),v(JSON.stringify({machineId:c,ways:g}))):p&&(y(),Object(e.i)(".editAisleContent",".editAisleBox","top50"))}).catch(function(o){Object(e.k)(o.message,"error")})):Object(e.k)("请输入独立密码！","warn")}),$(".validationBox").click(function(){event.stopPropagation()}),$(".validationContent").click(function(){Object(e.b)(this,"top50")}),$("input").attr("autocomplete","off");var u=null,p=null;$(".aisleCont").on("click",".aisleNumderGoods",function(){n?(u=$(this).attr("fireIndex").split(","),p=1,h=b=null,sessionStorage.independentPass?(y(),Object(e.i)(".editAisleContent",".editAisleBox","top50")):Object(e.i)(".validationContent",".validationBox","top50")):Object(e.k)("您没有修改货道的权限","warn")});var f=0;function m(){f=0,$(".numberTop span").show(),$(".delCheckbox").hide(),$(".delFooter").removeClass("height"),$(".addAisle").fadeIn(),$(".delCheckbox span").removeClass("delCheckboxTrue"),$(".delCheckbox .delChoose").prop("checked",!1)}$(".cancelBtn").click(function(){m()});var g=[],h=null;function v(o){Object(e.c)("api/machine/deleteGoodWay","post",sessionStorage.token,o,"mask").then(function(o){m(),Object(e.k)(o.message,"success"),r(o)}).catch(function(o){Object(e.k)(o.message,"error")})}$(".delFooter .delBtn").click(function(){0==f?hui.alert("请选择需要删除的货道！","好的",function(){}):(g=[],hui.confirm("确定删除？",["取消","确定"],function(){var o;h=1,p=b=null,sessionStorage.independentPass?(Object(e.d)("正在删除，请稍后！"),o=$('.aisleCont input[type="checkbox"]'),$.each(o,function(o,t){console.log(t.checked),t.checked&&g.push(Number(t.value))}),v(JSON.stringify({machineId:c,ways:g}))):Object(e.i)(".validationContent",".validationBox","top50")},function(){}))});var b=null;$(".aisleCont").on("click",".addAisle",function(){b=1,p=h=null,$(this).attr("indexVal"),sessionStorage.independentPass?Object(e.i)(".addNumContent",".addNumBox","top50"):Object(e.i)(".validationContent",".validationBox","top50")}),$(".addNumContent .close").click(function(){Object(e.a)(this,"top50")}),$('.addNumBody input[name="addNumber"]').keyup(function(){Object(e.m)(this)}),$(".addNumBox").click(function(){event.stopPropagation()}),$(".addNumContent").click(function(){Object(e.b)(this,"top50")}),$(".editAisleContent .close").click(function(){Object(e.a)(this,"top50")}),$(".editAisleBox").click(function(){event.stopPropagation()}),$(".editAisleContent").click(function(){Object(e.b)(this,"top50")});var k=null;function y(){k=l[u[0]][u[1]],console.log(k),$('.editiAsleBody input[name="goodsName"]').val(k.goods_Name),$('.editiAsleBody input[name="goodsName"]').attr("IVal",k.goods_Id),$('.editiAsleBody input[name="price"]').val(k.goods_Price),$('.editiAsleBody input[name="count"]').val(k.count),$('.editiAsleBody input[name="total"]').val(k.total),$('.editiAsleBody input[name="openText"]').val(1==k.open?"是":"否"),$('.editiAsleBody input[name="openVal"]').val(k.open)}var O=new huiPicker(".pickerChoose",function(){var o=O.getVal(0),t=O.getText(0);console.log(o,t),$('.pickerChoose input[name="openVal"]').val(o),$('.pickerChoose input[name="openText"]').val(t)});O.bindData(0,[{value:1,text:"是"},{value:0,text:"否"}]),$(".editAisleContent .goodsChoose").click(function(){B=!1,j=1,$(".goodsWrap").html('<div class="goodsList flexThree" id="goodsList"></div>'),$(".goodsList").empty(),Object(e.i)(".goodsContnet",".goodsBox","top50"),A()}),$(".goodsContnet .close").click(function(){Object(e.a)(this,"top50")}),$(".goodsBox").click(function(){event.stopPropagation()}),$(".goodsContnet").click(function(){Object(e.b)(this,"top50")});var j=1,N=10,C="";function x(t){var o=JSON.stringify({pageNum:j,pageSize:N,condition:s,conditionFour:"1",conditionTwo:C});j++,Object(e.c)("/api/goods/findAll","post",sessionStorage.token,o,"mask").then(function(o){var e;10!=o.data.list.length&&(B=!0),0<o.data.list.length&&(o=o.data.list,e="",o.forEach(function(o,t){e+='<div class="chooseList myScale3d" gID="'.concat(o.goods_Id,'" gName="').concat(o.goods_Name,'" gPrice="').concat(o.goods_Price,'" >\n                        <div class="goodsImg">\n                            <img src="').concat(o.goods_images,'"\n                                alt="">\n                        </div>\n                        <div class="goodsInformation">\n                            <p>').concat(o.goods_Name,"</p>\n                            <p>").concat(o.classifyName,'</p>\n                            <div class="flexThree">\n                                <p>编号</p>\n                                <span>').concat(o.goods_Core,"</span>\n                            </div>\n                        </div>\n                    </div>")}),$(".goodsList").append(e))}).catch(function(o){t(),B=!0})}var B=!1;function A(){$(".goodsWrap").dropload({scrollArea:$(".goodsWrap"),domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-refresh">上拉加载更多</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>',domNoData:'<div class="dropload-noData">已加载全部数据</div>'},loadDownFn:function(o){setTimeout(function(){return B?(o.resetload(),o.lock(),o.noData()):x(o.resetload),void o.resetload()},500)}})}$(".goodsWrap").on("click",".chooseList",function(){console.log($(this).attr("gName")),$('.editiAsleBody input[name="goodsName"]').val($(this).attr("gName")),$('.editiAsleBody input[name="goodsName"]').attr("IVal",$(this).attr("gID")),$('.editiAsleBody input[name="price"]').val($(this).attr("gPrice")),Object(e.a)(this,"top50")}),$(".editAisleContent .confirmBtn").click(function(){var o;$('.editiAsleBody input[name="goodsName"]').attr("IVal")?$('.editiAsleBody input[name="count"]').val()&&$('.editiAsleBody input[name="total"]').val()?Number($('.editiAsleBody input[name="total"]').val())>=Number($('.editiAsleBody input[name="count"]').val())?(Object(e.d)("正在修改，请稍后！"),o=JSON.stringify({machineId:c,way:k.way,goodId:Number(k.goods_Id||$('.editiAsleBody input[name="goodsName"]').attr("IVal")),newGoodId:Number($('.editiAsleBody input[name="goodsName"]').attr("IVal")),replenish:k.goods_Id?k.count:0,count:Number($('.editiAsleBody input[name="count"]').val()),total:Number(k.goods_Id?k.total:0),newTotal:Number($('.editiAsleBody input[name="total"]').val()),status:k.open,newStatus:Number($('.editiAsleBody input[name="openVal"]').val())}),Object(e.c)("/api/machine/updateGoodWay","post",sessionStorage.token,o,"mask",".editAisleContent","top50").then(function(o){d(c),Object(e.k)(o.message,"success")}).catch(function(o){Object(e.k)(o.message,"error")})):Object(e.k)("货道容量不能小于当前数量","warn"):Object(e.k)("数量和容量为为必填","warn"):Object(e.k)("请选择商品","warn")}),$(".goodsContnet .confirmBtn").click(function(){Object(e.d)("正在加载，请稍后！"),C=$('.goodsContnet input[name="editName"]').val(),B=!1,j=1,$(".goodsWrap").html('<div class="goodsList flexThree" id="goodsList"></div>'),$(".goodsList").empty(),A()}),$("#footer").load("M_footerNav.html")},434:function(o,t){}});
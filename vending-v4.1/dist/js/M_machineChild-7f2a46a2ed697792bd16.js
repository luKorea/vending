/*! 版权所有，翻版必究 */!function(e){function o(o){for(var n,s,c=o[0],d=o[1],l=o[2],u=0,p=[];u<c.length;u++)s=c[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&p.push(i[s][0]),i[s]=0;for(n in d)Object.prototype.hasOwnProperty.call(d,n)&&(e[n]=d[n]);for(r&&r(o);p.length;)p.shift()();return a.push.apply(a,l||[]),t()}function t(){for(var e,o=0;o<a.length;o++){for(var t=a[o],n=!0,c=1;c<t.length;c++){var d=t[c];0!==i[d]&&(n=!1)}n&&(a.splice(o--,1),e=s(s.s=t[0]))}return e}var n={},i={5:0},a=[];function s(o){if(n[o])return n[o].exports;var t=n[o]={i:o,l:!1,exports:{}};return e[o].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=e,s.c=n,s.d=function(e,o,t){s.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,o){if(1&o&&(e=s(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var n in e)s.d(t,n,function(o){return e[o]}.bind(null,n));return t},s.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(o,"a",o),o},s.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},s.p="";var c=window.webpackJsonp=window.webpackJsonp||[],d=c.push.bind(c);c.push=o,c=c.slice();for(var l=0;l<c.length;l++)o(c[l]);var r=d;a.push([609,0]),t()}({609:function(e,o,t){"use strict";t.r(o);t(687);var n=t(0),i=!1;var a=window.parent;$(".topHeader .back").click(function(){a.hideChild()});var s=a.machindID(),c=a.merchantsID();function d(e){Object(n.e)("加载中...");var o=JSON.stringify({machineId:e});Object(n.d)("/machine/getGoodWay","post",sessionStorage.token,o,"mask").then(function(e){console.log(e),r(e)}).catch(function(e){console.log(e)})}d(s);var l=[];function r(e){var o;e.data.forEach(function(e){e.row&&(l[e.row-1]?l[e.row-1].push(e):(l[e.row-1]=[],l[e.row-1].push(e)))}),o="",l.forEach(function(e,n){o+='<ul class="aisleList flex">\n                        <li class="listIndex">\n                            <span>'.concat(n+1,"</span>\n                        </li>"),e.forEach(function(e,i){o+=' <li class="aisleNumderGoods" fireIndex="'.concat(n+","+i,'" >\n                            <div class="delCheckbox">\n                            <div>\n                                <input type="checkbox" class="delChoose" value="').concat(e.id,'" style="width: 20px;height: 20px;">\n                                <span class="hui-icons hui-icons-toast "></span>\n                            </div>\n                        </div>\n                            <div class="numberTop">\n                                <img src="').concat(e.goods_images?e.goods_images:t(105),'" alt="">\n                                <span>').concat(e.way,'</span>\n                            </div>\n                            <div class="numderBottom flex">\n                                <div class="').concat(1==e.open?"status1":"status2",' ">\n                                    \n                                    ').concat(1==e.open?"正常":"禁用","\n                                </div>\n                                <div >\n                                    数量:").concat(e.count,"\n                                </div>\n                            </div>\n                            <p>\n                            ").concat(1==e.mail?"(邮寄)":"").concat(e.goods_Name?e.goods_Name:"-","\n                            </p>\n                        </li>")}),o+="</ul>"}),document.getElementById("aisleCont").innerHTML=o,$("#aisleCont input").attr("checked",!1)}Object(n.h)("/role/findUserPermission","post",sessionStorage.token).then(function(e){e.data.forEach(function(e){"424"==e.id&&(i=!0)})}).catch(function(e){console.log(e)}),$(".validationContent .close").click(function(){Object(n.a)(this,"top50")}),$(".validationContent .confirmBtn").click(function(){var e=this;if($('.validationBody input[name="oldPass"]').val()){Object(n.e)("正在验证，请稍后");var o=JSON.stringify({alonePwd:hex_md5($('.validationBody input[name="oldPass"]').val())});Object(n.d)("/user/verifyAlonePwd","post",sessionStorage.token,o,"mask").then(function(o){if(console.log(o),Object(n.a)(e,"top50"),sessionStorage.independentPass="true",b)Object(n.j)(".addNumContent",".addNumBox","top50");else if(v){g=[],Object(n.e)("正在删除，请稍后！");var t=$('.aisleCont input[type="checkbox"]');$.each(t,function(e,o){console.log(o.checked),o.checked&&g.push(Number(o.value))}),h(JSON.stringify({machineId:s,ways:g}))}else p&&(j(),Object(n.j)(".editAisleContent",".editAisleBox","top50"))}).catch(function(e){Object(n.m)(e.message,"error")})}else Object(n.m)("请输入独立密码！","warn")}),$(".validationBox").click(function(){event.stopPropagation()}),$(".validationContent").click(function(){Object(n.b)(this,"top50")}),$("input").attr("autocomplete","off");var u=null,p=null;$(".aisleCont").on("click",".aisleNumderGoods",function(){i?(u=$(this).attr("fireIndex").split(","),p=1,b=null,v=null,sessionStorage.independentPass?(j(),Object(n.j)(".editAisleContent",".editAisleBox","top50")):Object(n.j)(".validationContent",".validationBox","top50")):Object(n.m)("您没有修改货道的权限","warn")});var m=0;function f(){1,m=0,$(".numberTop span").show(),$(".delCheckbox").hide(),$(".delFooter").removeClass("height"),$(".addAisle").fadeIn(),$(".delCheckbox span").removeClass("delCheckboxTrue"),$(".delCheckbox .delChoose").prop("checked",!1)}$(".cancelBtn").click(function(){f()});var g=[],v=null;function h(e){Object(n.d)("api/machine/deleteGoodWay","post",sessionStorage.token,e,"mask").then(function(e){f(),Object(n.m)(e.message,"success"),r(e)}).catch(function(e){Object(n.m)(e.message,"error")})}$(".delFooter .delBtn").click(function(){0==m?hui.alert("请选择需要删除的货道！","好的",function(){}):(g=[],hui.confirm("确定删除？",["取消","确定"],function(){if(v=1,b=null,p=null,sessionStorage.independentPass){Object(n.e)("正在删除，请稍后！");var e=$('.aisleCont input[type="checkbox"]');$.each(e,function(e,o){console.log(o.checked),o.checked&&g.push(Number(o.value))}),h(JSON.stringify({machineId:s,ways:g}))}else Object(n.j)(".validationContent",".validationBox","top50")},function(){}))});var b=null;$(".aisleCont").on("click",".addAisle",function(){b=1,v=null,p=null,$(this).attr("indexVal"),sessionStorage.independentPass?Object(n.j)(".addNumContent",".addNumBox","top50"):Object(n.j)(".validationContent",".validationBox","top50")}),$(".addNumContent .close").click(function(){Object(n.a)(this,"top50")}),$('.addNumBody input[name="addNumber"]').keyup(function(){Object(n.o)(this)}),$(".addNumBox").click(function(){event.stopPropagation()}),$(".addNumContent").click(function(){Object(n.b)(this,"top50")}),$(".editAisleContent .close").click(function(){Object(n.a)(this,"top50")}),$(".editAisleBox").click(function(){event.stopPropagation()}),$(".editAisleContent").click(function(){Object(n.b)(this,"top50")});var y=null;function j(){y=l[u[0]][u[1]],console.log(y),$('.editiAsleBody input[name="goodsName"]').val(1==y.mail?"(邮寄)"+y.goods_Name:y.goods_Name),$('.editiAsleBody input[name="goodsName"]').attr("IVal",y.goods_Id),$('.editiAsleBody input[name="price"]').val(y.price),$('.editiAsleBody input[name="count"]').val(y.count),$('.editiAsleBody input[name="total"]').val(y.total),$('.editiAsleBody input[name="openText"]').val(1==y.open?"是":"否"),$('.editiAsleBody input[name="openVal"]').val(y.open)}var O=new huiPicker(".pickerChoose",function(){var e=O.getVal(0),o=O.getText(0);console.log(e,o),$('.pickerChoose input[name="openVal"]').val(e),$('.pickerChoose input[name="openText"]').val(o)});O.bindData(0,[{value:1,text:"是"},{value:0,text:"否"}]),$(".editAisleContent .goodsChoose").click(function(){B=!1,k=1,$(".goodsWrap").html('<div class="goodsList flexThree" id="goodsList"></div>'),$(".goodsList").empty(),Object(n.j)(".goodsContnet",".goodsBox","top50"),w()}),$(".goodsContnet .close").click(function(){Object(n.a)(this,"top50")}),$(".goodsBox").click(function(){event.stopPropagation()}),$(".goodsContnet").click(function(){Object(n.b)(this,"top50")});var k=1,N=10,C="";function x(e){var o=JSON.stringify({pageNum:k,pageSize:N,condition:c,conditionFour:"1",conditionTwo:C});k++,Object(n.d)("/goods/findAll","post",sessionStorage.token,o,"mask").then(function(e){var o,t;10!=e.data.list.length&&(B=!0),e.data.list.length>0&&(o=e.data.list,t="",o.forEach(function(e,o){t+='<div class="chooseList myScale3d" mail="'.concat(e.mail,'" gID="').concat(e.goods_Id,'" gName="').concat(e.goods_Name,'" gPrice="').concat(e.goods_Price,'" >\n                        <div class="goodsImg">\n                            <img src="').concat(e.goods_images,'"\n                                alt="">\n                        </div>\n                        <div class="goodsInformation">\n                            <p>').concat(1==e.mail?"(邮寄)"+e.goods_Name:e.goods_Name,"</p>\n                            <p>").concat(e.classifyName,'</p>\n                            <div class="flexThree">\n                                <p>编号</p>\n                                <span>').concat(e.goods_Core,'</span>\n                            </div>\n                            <div class="flexThree">\n                                <p>销售价</p>\n                                <span>￥').concat(e.goods_Price,"</span>\n                            </div>\n                        </div>\n                    </div>")}),$(".goodsList").append(t))}).catch(function(o){e(),B=!0})}var B=!1;function w(){$(".goodsWrap").dropload({scrollArea:$(".goodsWrap"),domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-refresh">上拉加载更多</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>',domNoData:'<div class="dropload-noData">已加载全部数据</div>'},loadDownFn:function(e){setTimeout(function(){if(B)return e.resetload(),e.lock(),e.noData(),void e.resetload();x(e.resetload),e.resetload()},500)}})}$(".goodsWrap").on("click",".chooseList",function(){console.log($(this).attr("gName")),$('.editiAsleBody input[name="goodsName"]').val(1==$(this).attr("mail")?"(邮寄)"+$(this).attr("gName"):$(this).attr("gName")),$('.editiAsleBody input[name="goodsName"]').attr("IVal",$(this).attr("gID")),$('.editiAsleBody input[name="price"]').val($(this).attr("gPrice")),Object(n.a)(this,"top50")}),$(".editAisleContent .confirmBtn").click(function(){if($('.editiAsleBody input[name="goodsName"]').attr("IVal"))if($('.editiAsleBody input[name="count"]').val()&&$('.editiAsleBody input[name="total"]').val())if(Number($('.editiAsleBody input[name="total"]').val())>=Number($('.editiAsleBody input[name="count"]').val())){Object(n.e)("正在修改，请稍后！");var e=JSON.stringify({machineId:s,way:y.way,goodId:Number(y.goods_Id?y.goods_Id:$('.editiAsleBody input[name="goodsName"]').attr("IVal")),newGoodId:Number($('.editiAsleBody input[name="goodsName"]').attr("IVal")),replenish:y.goods_Id?y.count:0,count:Number($('.editiAsleBody input[name="count"]').val()),total:Number(y.goods_Id?y.total:0),newTotal:Number($('.editiAsleBody input[name="total"]').val()),status:y.open,newStatus:Number($('.editiAsleBody input[name="openVal"]').val()),newPrice:$('.editAisleContent input[name="price"]').val(),price:y.goods_Id?y.price+"":"0"});Object(n.d)("/machine/updateGoodWay","post",sessionStorage.token,e,"mask",".editAisleContent","top50").then(function(e){d(s),Object(n.m)(e.message,"success")}).catch(function(e){Object(n.m)(e.message,"error")})}else Object(n.m)("货道容量不能小于当前数量","warn");else Object(n.m)("数量和容量为为必填","warn");else Object(n.m)("请选择商品","warn")}),$(".goodsContnet .confirmBtn").click(function(){Object(n.e)("正在加载，请稍后！"),C=$('.goodsContnet input[name="editName"]').val(),B=!1,k=1,$(".goodsWrap").html('<div class="goodsList flexThree" id="goodsList"></div>'),$(".goodsList").empty(),w()}),$("#footer").load("M_footerNav.html")},687:function(e,o){}});
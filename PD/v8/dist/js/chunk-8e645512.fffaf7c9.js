(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8e645512"],{"0258":function(t,e,s){t.exports=s.p+"img/icon.9f7840e0.png"},"1f1c":function(t,e,s){},2017:function(t,e,s){"use strict";s("70ad")},"50e2":function(t,e,s){t.exports=s.p+"img/2.fc34c344.jpg"},"512f":function(t,e,s){t.exports=s.p+"img/5.69ee3015.jpg"},"677c":function(t,e,s){t.exports=s.p+"img/4.d8722a4a.jpg"},"70ad":function(t,e,s){},"7dd3":function(t,e,s){t.exports=s.p+"img/1.191f0042.jpg"},"8cc1":function(t,e,s){t.exports=s.p+"img/3.a493955d.jpg"},9458:function(t,e,s){t.exports=s.p+"img/account.70b88384.png"},"9ed6":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login-container"},[t._m(0),a("div",{staticClass:"wrap"},[t._m(1),a("div",{staticClass:"login-container"},[a("el-form",{ref:"loginForm",staticClass:"layui-form",staticStyle:{width:"100%"},attrs:{model:t.loginForm,rules:t.loginRules,"auto-complete":"on","label-position":"left"}},[a("div",{staticClass:"wrap-left"},[a("img",{staticStyle:{"border-radius":"50%"},attrs:{src:s("0258"),alt:""}}),a("div",{staticStyle:{"font-size":"26px"}},[t._v("物流-质检费控系统")])]),a("div",{staticClass:"login-inp list"},[a("img",{attrs:{src:s("9458"),alt:""}}),a("el-input",{ref:"username",attrs:{placeholder:"请输入账号",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}})],1),a("div",{staticClass:"login-inp list"},[a("img",{attrs:{src:s("dca0"),alt:""}}),a("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"请输入您的密码",name:"password",tabindex:"2","auto-complete":"new-password"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleLogin(e)}},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),a("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[a("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1),a("div",{staticClass:"login-blur"},[a("div",{staticClass:"icon-radio"},[a("el-checkbox",{model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[t._v("记住密码")])],1)]),a("el-button",{staticClass:"login-inp2 login-btn",staticStyle:{width:"80%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("登录")])],1),a("div",{staticClass:"login-tip"},[t._v("建议使用Google Chrome或者360浏览器极速模式，使用其它浏览器可能无法正常使用本系统。")])],1)])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bg"},[a("div",{staticClass:"swiper-container"},[a("div",{staticClass:"swiper-wrapper "},[a("img",{staticClass:"swiper-slide ",attrs:{src:s("7dd3"),alt:""}}),a("img",{staticClass:"swiper-slide ",attrs:{src:s("50e2"),alt:""}}),a("img",{staticClass:"swiper-slide ",attrs:{src:s("8cc1"),alt:""}}),a("img",{staticClass:"swiper-slide ",attrs:{src:s("677c"),alt:""}}),a("img",{staticClass:"swiper-slide ",attrs:{src:s("512f"),alt:""}})]),a("div",{staticClass:"swiper-pagination"})])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"tabBox"},[s("div",{staticClass:"word"},[t._v("请"),s("br"),t._v("登"),s("br"),t._v("录")]),s("div",{staticClass:"line"})])}],o=s("83d6"),n=s.n(o),r={name:"Login",data:function(){var t=function(t,e,s){e?s():s(new Error("用户名不为空"))},e=function(t,e,s){e?s():s(new Error("密码不为空"))};return{loginForm:{username:"",password:""},loginRules:{username:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:e}]},loading:!1,passwordType:"password",redirect:void 0,checked:!0,defaultSettingsTitle:n.a.title}},watch:{$route:{handler:function(t){this.redirect=t.query&&t.query.redirect},immediate:!0}},created:function(){this.loginForm.username=window.localStorage.getItem("account_"+n.a.KEY)||"",this.loginForm.password=window.localStorage.getItem("password_"+n.a.KEY)||""},mounted:function(){this.$nextTick((function(t){new Swiper(".swiper-container",{loop:!0,autoplay:{delay:3e3,disableOnInteraction:!1},pagination:{el:".swiper-pagination",clickable:!0}})}))},methods:{showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleLogin:function(){var t=this;t.$refs.loginForm.validate((function(e){if(!e)return console.log("错误提交"),!1;t.loading=!0;var s={username:t.loginForm.username,password:t.loginForm.password};s.password!=window.localStorage.getItem("password_"+n.a.KEY)&&(s.password=hex_md5(s.password)),t.$store.dispatch("user/login",s).then((function(){t.checked?(console.log("记住密码"),window.localStorage.setItem("account_"+n.a.KEY,s.username),window.localStorage.setItem("password_"+n.a.KEY,s.password)):(console.log("没记住密码"),window.localStorage.removeItem("account_"+n.a.KEY),window.localStorage.removeItem("password_"+n.a.KEY)),t.$store.dispatch("user/getControl",{}).then((function(){t.$router.push({path:"/"})})).catch((function(){t.loading=!1})),t.$store.dispatch("tagsView/delAllViews",null,{root:!0}),t.loading=!1})).catch((function(){t.loading=!1}))}))}}},l=r,c=(s("2017"),s("ff92"),s("5d22")),d=Object(c["a"])(l,a,i,!1,null,"73775f22",null);e["default"]=d.exports},dca0:function(t,e,s){t.exports=s.p+"img/flag1.8c8df590.png"},ff92:function(t,e,s){"use strict";s("1f1c")}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f608897c"],{2017:function(t,s,e){"use strict";e("70ad")},"5faa":function(t,s,e){},"70ad":function(t,s,e){},"9ed6":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"login-container"},[t._m(0),e("div",{staticClass:"wrap"},[t._m(1),e("div",{staticClass:"login-container"},[e("el-form",{ref:"loginForm",staticClass:"layui-form",staticStyle:{width:"100%"},attrs:{model:t.loginForm,rules:t.loginRules,"auto-complete":"on","label-position":"left"}},[e("div",{staticClass:"wrap-left"},[e("img",{staticStyle:{"border-radius":"50%"},attrs:{src:"/img/icon.png",alt:""}}),e("div",{staticStyle:{"font-size":"26px"}},[t._v("物流-质检费控系统")])]),e("div",{staticClass:"login-inp list"},[e("img",{attrs:{src:"/img/account.png",alt:""}}),e("el-input",{ref:"username",attrs:{placeholder:"请输入账号",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:t.loginForm.username,callback:function(s){t.$set(t.loginForm,"username",s)},expression:"loginForm.username"}})],1),e("div",{staticClass:"login-inp list"},[e("img",{attrs:{src:"/img/flag1.png",alt:""}}),e("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"请输入您的密码",name:"password",tabindex:"2","auto-complete":"new-password"},nativeOn:{keyup:function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.handleLogin(s)}},model:{value:t.loginForm.password,callback:function(s){t.$set(t.loginForm,"password",s)},expression:"loginForm.password"}}),e("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[e("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1),e("div",{staticClass:"login-blur"},[e("div",{staticClass:"icon-radio"},[e("el-checkbox",{model:{value:t.checked,callback:function(s){t.checked=s},expression:"checked"}},[t._v("记住密码")])],1)]),e("el-button",{staticClass:"login-inp2 login-btn",staticStyle:{width:"80%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(s){return s.preventDefault(),t.handleLogin(s)}}},[t._v("登录")])],1),e("div",{staticClass:"login-tip"},[t._v("建议使用Google Chrome或者360浏览器极速模式，使用其它浏览器可能无法正常使用本系统。")])],1)])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"bg"},[e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper "},[e("img",{staticClass:"swiper-slide ",attrs:{src:"/img/1.jpg",alt:""}}),e("img",{staticClass:"swiper-slide ",attrs:{src:"/img/2.jpg",alt:""}}),e("img",{staticClass:"swiper-slide ",attrs:{src:"/img/3.jpg",alt:""}}),e("img",{staticClass:"swiper-slide ",attrs:{src:"/img/4.jpg",alt:""}}),e("img",{staticClass:"swiper-slide ",attrs:{src:"/img/5.jpg",alt:""}})]),e("div",{staticClass:"swiper-pagination"})])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"tabBox"},[e("div",{staticClass:"word"},[t._v("请"),e("br"),t._v("登"),e("br"),t._v("录")]),e("div",{staticClass:"line"})])}],o=e("83d6"),n=e.n(o),r={name:"Login",data:function(){var t=function(t,s,e){s?e():e(new Error("用户名不为空"))},s=function(t,s,e){s?e():e(new Error("密码不为空"))};return{loginForm:{username:"",password:""},loginRules:{username:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:s}]},loading:!1,passwordType:"password",redirect:void 0,checked:!0,defaultSettingsTitle:n.a.title}},watch:{$route:{handler:function(t){this.redirect=t.query&&t.query.redirect},immediate:!0}},created:function(){this.loginForm.username=window.localStorage.getItem("account_"+n.a.KEY)||"",this.loginForm.password=window.localStorage.getItem("password_"+n.a.KEY)||""},mounted:function(){this.$nextTick((function(t){new Swiper(".swiper-container",{loop:!0,autoplay:{delay:3e3,disableOnInteraction:!1},pagination:{el:".swiper-pagination",clickable:!0}})}))},methods:{showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleLogin:function(){var t=this;t.$refs.loginForm.validate((function(s){if(!s)return console.log("错误提交"),!1;t.loading=!0;var e={username:t.loginForm.username,password:t.loginForm.password};e.password!=window.localStorage.getItem("password_"+n.a.KEY)&&(e.password=hex_md5(e.password)),t.$store.dispatch("user/login",e).then((function(){t.checked?(console.log("记住密码"),window.localStorage.setItem("account_"+n.a.KEY,e.username),window.localStorage.setItem("password_"+n.a.KEY,e.password)):(console.log("没记住密码"),window.localStorage.removeItem("account_"+n.a.KEY),window.localStorage.removeItem("password_"+n.a.KEY)),t.$store.dispatch("user/getControl",{}).then((function(){t.$router.push({path:"/"})})).catch((function(){t.loading=!1})),t.$store.dispatch("tagsView/delAllViews",null,{root:!0}),t.loading=!1})).catch((function(){t.loading=!1}))}))}}},l=r,c=(e("2017"),e("fb43"),e("5d22")),d=Object(c["a"])(l,a,i,!1,null,"21d7ac6c",null);s["default"]=d.exports},fb43:function(t,s,e){"use strict";e("5faa")}}]);
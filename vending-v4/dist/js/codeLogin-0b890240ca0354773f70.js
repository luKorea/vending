/*! 版权所有，翻版必究 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([247,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyCss_codeLogin_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(258);
/* harmony import */ var _MyCss_codeLogin_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_MyCss_codeLogin_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


var machineId = Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* getQueryString */ "b"])('machineId');

if (sessionStorage.accountPass) {
  var passFlag = keepPass(sessionStorage.old, new Date().getTime());

  if (passFlag) {
    var accountPass = JSON.parse(sessionStorage.accountPass);
    $('.formCont input[name="name"]').val(accountPass.username);
    $('.formCont input[name="pass"]').val(accountPass.password);
  }
}

var passIndex = 1,
    passType = 1;
$('.list input[name="pass"]').focus(function () {
  if (passIndex == 1) {
    $(this).val('');
    passIndex = 2;
  } else {
    return;
  }
});
$('.list input[name="pass"]').keyup(function () {
  passType = 2;
}); // 点击登录事件

$('.searchCont .btn').click(function () {
  if (!$('.formCont input[name="name"]').val()) {
    Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "f"])('请输入账号');
    return;
  }

  if (!$('.formCont input[name="pass"]').val()) {
    Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "f"])('请输入密码');
    return;
  }

  ;
  $('.mask').show();
  var loginObj = JSON.stringify({
    username: $('.formCont input[name="name"]').val(),
    password: passType == 1 ? accountPass.password : hex_md5($('.formCont input[name="pass"]').val()),
    machineId: machineId
  });
  Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* loadAjax */ "c"])('/api/user/login', 'post', loginObj).then(function (res) {
    sessionStorage.token = res.data.token;
    $.ajax({
      type: 'post',
      url: '/api/scanLogin',
      timeout: 10000,
      data: JSON.stringify({
        action: sessionStorage.token,
        machine: Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* decrypt1 */ "a"])(machineId)
      }),
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.token
      },
      success: function success(res) {
        $('.mask').hide();

        if (res == 'true') {
          if ($('.r1').prop('checked')) {
            sessionStorage.old = new Date().getTime();
            sessionStorage.accountPass = JSON.stringify({
              username: $('.formCont input[name="name"]').val(),
              password: passType == 1 ? accountPass.password : hex_md5($('.formCont input[name="pass"]').val())
            });
          } else {
            sessionStorage.accountPass = '';
          }

          window.location.href = "operation.html?machineId=".concat(Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* getQueryString */ "b"])('machineId'));
        } else {
          Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "f"])('售货机离线,登录失败');
        }
      },
      error: function error(err) {
        $('.mask').hide();
        Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "f"])('服务器请求超时');
      }
    });
  })["catch"](function (err) {
    $.ajax({
      type: 'post',
      url: '/api/scanLogin',
      timeout: 10000,
      data: JSON.stringify({
        action: 'false',
        machine: Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* decrypt1 */ "a"])(machineId)
      }),
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.token
      },
      success: function success(res) {},
      error: function error(err) {
        $('.mask').hide();
        Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "f"])('服务器请求超时');
      }
    });
    $('.mask').hide();
    Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "f"])(err.message);
  }); // window.location.href=`operation.html?machineId=${getQueryString('machineId')}`
});

/***/ }),

/***/ 258:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
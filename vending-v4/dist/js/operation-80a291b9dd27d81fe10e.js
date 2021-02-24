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
/******/ 		2: 0
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
/******/ 	deferredModules.push([248,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyCss_operation_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(260);
/* harmony import */ var _MyCss_operation_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_MyCss_operation_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


var machineId = Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* decrypt1 */ "a"])(Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* getQueryString */ "b"])('machineId')),
    machineInformtion = null; // $.ajax({
//     type: 'post',
//     url: '/api/machine/getStatus',
//     timeout: 10000,
//     async: false,
//     data: JSON.stringify({
//         machineId,
//     }),
//     headers: {
//         "Content-Type": "application/json",
//         token: sessionStorage.token
//     },
//     success: function (res) {
//         if (res.code == 200) {
//             machineInformtion = res.data;
//         } else {
//             prompt(res.message)
//         }
//     }, error: function (err) {
//         prompt('服务器请求超时')
//     }
// });
// 灯光与音量状态
// var lamFlag = machineInformtion.is_light,
//     soundFlag = machineInformtion.is_volume;
// lamFlag == 1 ? $('.lamp p').html('售货机关灯') : $('.lamp p').html('售货机开灯');
// soundFlag == 1 ? $('.sound p').html('售货机静音') : $('.sound p').html('售货机开启声音');
// 开门部分

$('.openTheDoor').click(function () {
  $('.aloneContent').fadeIn(100).children('.aloneBox').addClass('top30');
});
$('.aloneBox').click(function () {
  event.stopPropagation();
});
$('.aloneContent').click(function () {
  $('.aloneContent').fadeOut(100).children('.aloneBox').removeClass('top30');
});
$('.aloneContent .confirmBtn').click(function () {
  if (!$('.aloneContent input[name="alonePass"]').val()) {
    Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "g"])('请输入独立密码');
    return;
  }

  var alonePassObj = JSON.stringify({
    alonePsd: hex_md5($('.aloneContent input[name="alonePass"]').val()),
    machineId: machineId
  });
  Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* loadAjax1 */ "e"])('/api/machine/openDoor', 'post', sessionStorage.token, alonePassObj).then(function (res) {
    $('.aloneContent').fadeOut(100).children('.aloneBox').removeClass('top30');
    Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "g"])('开门成功');
  })["catch"](function (err) {
    Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "g"])(err.message);
  }); // loadAjax1('/api/user/verifyAlonePwd','post',sessionStorage.token,alonePassObj).then(res=>{
  //     $('.aloneContent').fadeOut(100).children('.aloneBox').removeClass('top30')
  //     loadAjax1('/api/openTheDoor','post',sessionStorage.token,JSON.stringify({machine:machineId}),'mask').then(res=>{
  //     }).catch(err=>{
  //         if(err=='false'){
  //             prompt('开门失败')
  //         }else{
  //             prompt('开门成功')
  //         }
  //     })
  // }).catch(err=>{
  //     prompt(err.message)
  // })
}); //indexFlag  1开灯 2声音

$('.lamp').click(function () {
  $('.inquiryBox .confirm').attr('indexFlag', 1);
  $('.inquiryBox .confirm').attr('openFlag', 1);
  $('.inquiry h2').html('确定开灯？');
  $('.inquiry').show();
});
$('.lamp1').click(function () {
  $('.inquiryBox .confirm').attr('indexFlag', 1);
  $('.inquiryBox .confirm').attr('openFlag', 2);
  $('.inquiry h2').html('确定关灯？');
  $('.inquiry').show();
});
$('.sound').click(function () {
  $('.inquiryBox .confirm').attr('indexFlag', 2);
  $('.inquiryBox .confirm').attr('openFlag', 1);
  $('.inquiry h2').html('确定开启声音？');
  $('.inquiry').show();
});
$('.sound1').click(function () {
  $('.inquiryBox .confirm').attr('indexFlag', 2);
  $('.inquiryBox .confirm').attr('openFlag', 2);
  $('.inquiry h2').html('确定静音？');
  $('.inquiry').show();
}); // 取消

$('.cancel').click(function () {
  $('.inquiry').hide();
  $('.inquiryBox .confirm').attr('indexFlag', '');
  $('.inquiryBox .confirm').attr('openFlag', '');
});
$('.inquiryBox .confirm').click(function () {
  $('.inquiry').hide();
  $('.mask').show();

  if ($(this).attr('indexFlag') == 1) {
    var lamObj = JSON.stringify({
      action: $(this).attr('openFlag') == 1 ? 'true' : 'false',
      machine: machineId
    });
    Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* loadAjax1 */ "e"])('/api/switchLight', 'post', sessionStorage.token, lamObj, 'mask').then(function (res) {
      $('.mask').hide();
    })["catch"](function (err) {
      $('.mask').hide();

      if (err == 'true') {
        Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "g"])('操作成功');
      } else {
        Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "g"])('操作失败');
      }
    });
  } else {
    var soundObj = JSON.stringify({
      action: $(this).attr('openFlag') == 1 ? 'true' : 'false',
      machine: machineId
    });
    Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* loadAjax1 */ "e"])('/api/switchVolume', 'post', sessionStorage.token, soundObj, 'mask').then(function (res) {
      $('.mask').hide();
    })["catch"](function (err) {
      $('.mask').hide();

      if (err == 'true') {
        Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "g"])('操作成功');
      } else {
        Object(_common_common_js__WEBPACK_IMPORTED_MODULE_1__[/* prompt */ "g"])('操作失败');
      }
    });
  }
});

/***/ }),

/***/ 260:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });